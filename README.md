# airgate-epay

AirGate 支付插件 — 单插件内集成 **易支付 / 支付宝官方 / 微信支付官方** 三个渠道。

## 能做什么

- 用户在 core 前端有独立的「充值」「充值记录」页面
- 管理员配置好渠道凭证后，用户可发起充值订单 → 跳转到对应平台 → 支付完成 → 自动给 `users.balance` 加余额并写 `balance_logs` 流水
- 后台对账任务每 5 分钟扫描 pending 订单，过期自动清理

## 仓库结构

```
airgate-epay/
├── backend/
│   ├── main.go                              # sdkgrpc.Serve(payment.New())
│   ├── cmd/genmanifest/                     # go run ./cmd/genmanifest 生成 plugin.yaml
│   └── internal/payment/
│       ├── plugin.go         # ExtensionPlugin 实现：生命周期 + 路由 + 后台任务
│       ├── metadata.go       # PluginInfo + ConfigSchema + FrontendPages 声明
│       ├── service.go        # 订单业务 + 「锁订单 + 加余额 + 写流水」事务
│       ├── routes.go         # HTTP handler，按 X-Airgate-Entry 分流 user/admin/callback
│       ├── db.go             # core DB 连接 + 自有表 DDL
│       ├── assets.go         # WebAssetsProvider，embed web/dist
│       ├── webdist/          # build 时由 web/dist 同步过来
│       └── channel/
│           ├── channel.go    # Channel interface
│           ├── epay.go       # 易支付（MD5 签名，已实现）
│           ├── alipay.go     # 支付宝官方（接口 + 配置，待接 SDK）
│           └── wechat.go     # 微信支付官方（接口 + 配置，待接 SDK）
├── web/
│   ├── src/
│   │   ├── index.tsx          # PluginFrontendModule export，挂三条路由
│   │   ├── RechargePage.tsx   # /recharge 充值主页（用户级）
│   │   ├── OrdersPage.tsx     # /orders 充值记录（用户级）
│   │   ├── AdminPage.tsx      # /admin 管理员说明页
│   │   └── api.ts             # 调 /api/v1/ext-user/payment-epay/* 的薄封装
│   ├── package.json
│   └── vite.config.ts
├── plugin.yaml                # genmanifest 自动生成
└── Makefile
```

## 构建

```bash
make install   # 一次性装 web 依赖
make build     # web/dist → backend/webdist → bin/payment-epay
make manifest  # 重生 plugin.yaml
make release   # 编译 linux/amd64 用于上传 marketplace
```

## 在 core 里 dev 加载

在 `airgate-core/backend/config.yaml` 的 `plugins.dev` 节追加：

```yaml
plugins:
  dev:
    - name: payment-epay
      path: /mnt/e/code/airgate/airgate-epay/backend
```

然后 `cd airgate-core/backend && go run ./cmd/server`，core 会通过 `go run .` 启动本插件，握手 gRPC，调 `Init → Migrate → Start → RegisterRoutes`。

## 配置（在 core 后台填）

| key | 必填 | 说明 |
|---|---|---|
| `db_dsn` | ✅ | core 数据库 DSN（postgres://...），插件直接连过来更新 `users.balance` |
| `callback_base_url` | ✅ | 外网可达的 core 根 URL，作为支付平台异步通知地址前缀 |
| `min_amount` / `max_amount` / `daily_limit` | | 业务限额 |
| `order_expire_minutes` | | 订单过期分钟数（默认 30） |
| `epay_enabled` + `epay_pid` / `epay_key` / `epay_gateway` | | 易支付（已实现） |
| `alipay_enabled` + `alipay_*` | | 支付宝官方（接口骨架，待补 SDK） |
| `wechat_enabled` + `wechat_*` | | 微信支付官方（接口骨架，待补 SDK） |

## 路由说明

| 路径 | 入口 | 说明 |
|---|---|---|
| `POST /user/orders` | ext-user | 创建订单 |
| `GET  /user/orders` | ext-user | 列出我的订单 |
| `GET  /user/orders/{out_trade_no}` | ext-user | 查询单订单 |
| `GET  /user/channels` | ext-user | 当前启用渠道 |
| `GET  /admin/orders` | ext | 全量订单（管理员） |
| `POST /admin/reconcile` | ext | 手动触发对账（管理员） |
| `POST/GET /notify/{channel}` | payment-callback | 异步回调（无认证） |

入口由 core 的 `extension_proxy` 通过 `X-Airgate-Entry` 头注入（admin / user / callback），插件用中间件强校验，避免越权。

## 加余额事务

`service.go::markPaid` 在单个 SQL 事务里完成：

1. `SELECT ... FOR UPDATE` 锁住订单行；如果已 `paid` 直接 return（**幂等**）
2. 校验回调金额与订单金额一致（防伪回调）
3. `SELECT balance FOR UPDATE` 锁住用户行
4. `UPDATE users SET balance = balance + amount`
5. `INSERT balance_logs` 一条 `action=add` 流水，remark = `recharge:<channel>:<out_trade_no>`
6. `UPDATE payment_orders SET status = 'paid', paid_at, notify_payload`

任意一步失败整体回滚。

## 测试

```bash
cd backend && go test ./...
```

`channel/epay_test.go` 覆盖签名生成、双向验签、篡改检测、下单 URL 构造、未启用拒绝。

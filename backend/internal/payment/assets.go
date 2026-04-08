package payment

import (
	"embed"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
)

// webdist 是插件 web 构建产物，由 Makefile 在 build 前从 web/dist 复制过来。
// 用 all: 前缀保证同时 embed 隐藏文件（包括占位的 placeholder）。
//
//go:embed all:webdist
var webDistFS embed.FS

// GetWebAssets 实现 sdk.WebAssetsProvider。
//
// 开发模式：优先读 ../web/dist 或 web/dist 真实目录，方便改前端后无需重新 embed。
// 生产模式：使用 //go:embed 嵌入的 webdist 内容。
//
// core 启动插件后会调用此方法，把所有文件写到 data/plugins/payment-epay/assets/
// 然后通过 r.Static("/plugins", pluginDir) 把它们暴露成 /plugins/payment-epay/assets/index.js
// 等静态资源，供浏览器 plugin-loader 抓取。
func (p *Plugin) GetWebAssets() map[string][]byte {
	if assets := loadDevAssets(); len(assets) > 0 {
		return assets
	}
	assets := make(map[string][]byte)
	_ = fs.WalkDir(webDistFS, "webdist", func(path string, d fs.DirEntry, err error) error {
		if err != nil || d.IsDir() {
			return nil
		}
		content, err := webDistFS.ReadFile(path)
		if err != nil {
			return nil
		}
		rel := strings.TrimPrefix(path, "webdist/")
		// 跳过 .gitkeep
		if rel == ".gitkeep" || rel == "" {
			return nil
		}
		assets[rel] = content
		return nil
	})
	return assets
}

func loadDevAssets() map[string][]byte {
	candidates := []string{
		filepath.Join("..", "web", "dist"),
		filepath.Join("web", "dist"),
	}
	for _, dir := range candidates {
		if a := loadAssetsFromDir(dir); len(a) > 0 {
			return a
		}
	}
	return nil
}

func loadAssetsFromDir(root string) map[string][]byte {
	info, err := os.Stat(root)
	if err != nil || !info.IsDir() {
		return nil
	}
	out := make(map[string][]byte)
	_ = filepath.Walk(root, func(path string, info os.FileInfo, err error) error {
		if err != nil || info == nil || info.IsDir() {
			return nil
		}
		content, readErr := os.ReadFile(path)
		if readErr != nil {
			return nil
		}
		rel, relErr := filepath.Rel(root, path)
		if relErr != nil {
			return nil
		}
		out[filepath.ToSlash(rel)] = content
		return nil
	})
	if len(out) == 0 {
		return nil
	}
	return out
}

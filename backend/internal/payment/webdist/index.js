import { jsx as d, jsxs as b, Fragment as Qt } from "react/jsx-runtime";
import { useState as L, useRef as _t, useEffect as H, useCallback as Z, useMemo as Xt } from "react";
function Zt(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var Y = {}, fe, Ge;
function en() {
  return Ge || (Ge = 1, fe = function() {
    return typeof Promise == "function" && Promise.prototype && Promise.prototype.then;
  }), fe;
}
var ge = {}, W = {}, Ye;
function K() {
  if (Ye) return W;
  Ye = 1;
  let e;
  const o = [
    0,
    // Not used
    26,
    44,
    70,
    100,
    134,
    172,
    196,
    242,
    292,
    346,
    404,
    466,
    532,
    581,
    655,
    733,
    815,
    901,
    991,
    1085,
    1156,
    1258,
    1364,
    1474,
    1588,
    1706,
    1828,
    1921,
    2051,
    2185,
    2323,
    2465,
    2611,
    2761,
    2876,
    3034,
    3196,
    3362,
    3532,
    3706
  ];
  return W.getSymbolSize = function(r) {
    if (!r) throw new Error('"version" cannot be null or undefined');
    if (r < 1 || r > 40) throw new Error('"version" should be in range from 1 to 40');
    return r * 4 + 17;
  }, W.getSymbolTotalCodewords = function(r) {
    return o[r];
  }, W.getBCHDigit = function(a) {
    let r = 0;
    for (; a !== 0; )
      r++, a >>>= 1;
    return r;
  }, W.setToSJISFunction = function(r) {
    if (typeof r != "function")
      throw new Error('"toSJISFunc" is not a valid function.');
    e = r;
  }, W.isKanjiModeEnabled = function() {
    return typeof e < "u";
  }, W.toSJIS = function(r) {
    return e(r);
  }, W;
}
var he = {}, $e;
function je() {
  return $e || ($e = 1, (function(e) {
    e.L = { bit: 1 }, e.M = { bit: 0 }, e.Q = { bit: 3 }, e.H = { bit: 2 };
    function o(a) {
      if (typeof a != "string")
        throw new Error("Param is not a string");
      switch (a.toLowerCase()) {
        case "l":
        case "low":
          return e.L;
        case "m":
        case "medium":
          return e.M;
        case "q":
        case "quartile":
          return e.Q;
        case "h":
        case "high":
          return e.H;
        default:
          throw new Error("Unknown EC Level: " + a);
      }
    }
    e.isValid = function(r) {
      return r && typeof r.bit < "u" && r.bit >= 0 && r.bit < 4;
    }, e.from = function(r, n) {
      if (e.isValid(r))
        return r;
      try {
        return o(r);
      } catch {
        return n;
      }
    };
  })(he)), he;
}
var pe, Qe;
function tn() {
  if (Qe) return pe;
  Qe = 1;
  function e() {
    this.buffer = [], this.length = 0;
  }
  return e.prototype = {
    get: function(o) {
      const a = Math.floor(o / 8);
      return (this.buffer[a] >>> 7 - o % 8 & 1) === 1;
    },
    put: function(o, a) {
      for (let r = 0; r < a; r++)
        this.putBit((o >>> a - r - 1 & 1) === 1);
    },
    getLengthInBits: function() {
      return this.length;
    },
    putBit: function(o) {
      const a = Math.floor(this.length / 8);
      this.buffer.length <= a && this.buffer.push(0), o && (this.buffer[a] |= 128 >>> this.length % 8), this.length++;
    }
  }, pe = e, pe;
}
var ye, Xe;
function nn() {
  if (Xe) return ye;
  Xe = 1;
  function e(o) {
    if (!o || o < 1)
      throw new Error("BitMatrix size must be defined and greater than 0");
    this.size = o, this.data = new Uint8Array(o * o), this.reservedBit = new Uint8Array(o * o);
  }
  return e.prototype.set = function(o, a, r, n) {
    const t = o * this.size + a;
    this.data[t] = r, n && (this.reservedBit[t] = !0);
  }, e.prototype.get = function(o, a) {
    return this.data[o * this.size + a];
  }, e.prototype.xor = function(o, a, r) {
    this.data[o * this.size + a] ^= r;
  }, e.prototype.isReserved = function(o, a) {
    return this.reservedBit[o * this.size + a];
  }, ye = e, ye;
}
var me = {}, Ze;
function rn() {
  return Ze || (Ze = 1, (function(e) {
    const o = K().getSymbolSize;
    e.getRowColCoords = function(r) {
      if (r === 1) return [];
      const n = Math.floor(r / 7) + 2, t = o(r), l = t === 145 ? 26 : Math.ceil((t - 13) / (2 * n - 2)) * 2, s = [t - 7];
      for (let c = 1; c < n - 1; c++)
        s[c] = s[c - 1] - l;
      return s.push(6), s.reverse();
    }, e.getPositions = function(r) {
      const n = [], t = e.getRowColCoords(r), l = t.length;
      for (let s = 0; s < l; s++)
        for (let c = 0; c < l; c++)
          s === 0 && c === 0 || // top-left
          s === 0 && c === l - 1 || // bottom-left
          s === l - 1 && c === 0 || n.push([t[s], t[c]]);
      return n;
    };
  })(me)), me;
}
var be = {}, et;
function on() {
  if (et) return be;
  et = 1;
  const e = K().getSymbolSize, o = 7;
  return be.getPositions = function(r) {
    const n = e(r);
    return [
      // top-left
      [0, 0],
      // top-right
      [n - o, 0],
      // bottom-left
      [0, n - o]
    ];
  }, be;
}
var Se = {}, tt;
function an() {
  return tt || (tt = 1, (function(e) {
    e.Patterns = {
      PATTERN000: 0,
      PATTERN001: 1,
      PATTERN010: 2,
      PATTERN011: 3,
      PATTERN100: 4,
      PATTERN101: 5,
      PATTERN110: 6,
      PATTERN111: 7
    };
    const o = {
      N1: 3,
      N2: 3,
      N3: 40,
      N4: 10
    };
    e.isValid = function(n) {
      return n != null && n !== "" && !isNaN(n) && n >= 0 && n <= 7;
    }, e.from = function(n) {
      return e.isValid(n) ? parseInt(n, 10) : void 0;
    }, e.getPenaltyN1 = function(n) {
      const t = n.size;
      let l = 0, s = 0, c = 0, f = null, h = null;
      for (let g = 0; g < t; g++) {
        s = c = 0, f = h = null;
        for (let p = 0; p < t; p++) {
          let S = n.get(g, p);
          S === f ? s++ : (s >= 5 && (l += o.N1 + (s - 5)), f = S, s = 1), S = n.get(p, g), S === h ? c++ : (c >= 5 && (l += o.N1 + (c - 5)), h = S, c = 1);
        }
        s >= 5 && (l += o.N1 + (s - 5)), c >= 5 && (l += o.N1 + (c - 5));
      }
      return l;
    }, e.getPenaltyN2 = function(n) {
      const t = n.size;
      let l = 0;
      for (let s = 0; s < t - 1; s++)
        for (let c = 0; c < t - 1; c++) {
          const f = n.get(s, c) + n.get(s, c + 1) + n.get(s + 1, c) + n.get(s + 1, c + 1);
          (f === 4 || f === 0) && l++;
        }
      return l * o.N2;
    }, e.getPenaltyN3 = function(n) {
      const t = n.size;
      let l = 0, s = 0, c = 0;
      for (let f = 0; f < t; f++) {
        s = c = 0;
        for (let h = 0; h < t; h++)
          s = s << 1 & 2047 | n.get(f, h), h >= 10 && (s === 1488 || s === 93) && l++, c = c << 1 & 2047 | n.get(h, f), h >= 10 && (c === 1488 || c === 93) && l++;
      }
      return l * o.N3;
    }, e.getPenaltyN4 = function(n) {
      let t = 0;
      const l = n.data.length;
      for (let c = 0; c < l; c++) t += n.data[c];
      return Math.abs(Math.ceil(t * 100 / l / 5) - 10) * o.N4;
    };
    function a(r, n, t) {
      switch (r) {
        case e.Patterns.PATTERN000:
          return (n + t) % 2 === 0;
        case e.Patterns.PATTERN001:
          return n % 2 === 0;
        case e.Patterns.PATTERN010:
          return t % 3 === 0;
        case e.Patterns.PATTERN011:
          return (n + t) % 3 === 0;
        case e.Patterns.PATTERN100:
          return (Math.floor(n / 2) + Math.floor(t / 3)) % 2 === 0;
        case e.Patterns.PATTERN101:
          return n * t % 2 + n * t % 3 === 0;
        case e.Patterns.PATTERN110:
          return (n * t % 2 + n * t % 3) % 2 === 0;
        case e.Patterns.PATTERN111:
          return (n * t % 3 + (n + t) % 2) % 2 === 0;
        default:
          throw new Error("bad maskPattern:" + r);
      }
    }
    e.applyMask = function(n, t) {
      const l = t.size;
      for (let s = 0; s < l; s++)
        for (let c = 0; c < l; c++)
          t.isReserved(c, s) || t.xor(c, s, a(n, c, s));
    }, e.getBestMask = function(n, t) {
      const l = Object.keys(e.Patterns).length;
      let s = 0, c = 1 / 0;
      for (let f = 0; f < l; f++) {
        t(f), e.applyMask(f, n);
        const h = e.getPenaltyN1(n) + e.getPenaltyN2(n) + e.getPenaltyN3(n) + e.getPenaltyN4(n);
        e.applyMask(f, n), h < c && (c = h, s = f);
      }
      return s;
    };
  })(Se)), Se;
}
var ie = {}, nt;
function Lt() {
  if (nt) return ie;
  nt = 1;
  const e = je(), o = [
    // L  M  Q  H
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    1,
    2,
    2,
    1,
    2,
    2,
    4,
    1,
    2,
    4,
    4,
    2,
    4,
    4,
    4,
    2,
    4,
    6,
    5,
    2,
    4,
    6,
    6,
    2,
    5,
    8,
    8,
    4,
    5,
    8,
    8,
    4,
    5,
    8,
    11,
    4,
    8,
    10,
    11,
    4,
    9,
    12,
    16,
    4,
    9,
    16,
    16,
    6,
    10,
    12,
    18,
    6,
    10,
    17,
    16,
    6,
    11,
    16,
    19,
    6,
    13,
    18,
    21,
    7,
    14,
    21,
    25,
    8,
    16,
    20,
    25,
    8,
    17,
    23,
    25,
    9,
    17,
    23,
    34,
    9,
    18,
    25,
    30,
    10,
    20,
    27,
    32,
    12,
    21,
    29,
    35,
    12,
    23,
    34,
    37,
    12,
    25,
    34,
    40,
    13,
    26,
    35,
    42,
    14,
    28,
    38,
    45,
    15,
    29,
    40,
    48,
    16,
    31,
    43,
    51,
    17,
    33,
    45,
    54,
    18,
    35,
    48,
    57,
    19,
    37,
    51,
    60,
    19,
    38,
    53,
    63,
    20,
    40,
    56,
    66,
    21,
    43,
    59,
    70,
    22,
    45,
    62,
    74,
    24,
    47,
    65,
    77,
    25,
    49,
    68,
    81
  ], a = [
    // L  M  Q  H
    7,
    10,
    13,
    17,
    10,
    16,
    22,
    28,
    15,
    26,
    36,
    44,
    20,
    36,
    52,
    64,
    26,
    48,
    72,
    88,
    36,
    64,
    96,
    112,
    40,
    72,
    108,
    130,
    48,
    88,
    132,
    156,
    60,
    110,
    160,
    192,
    72,
    130,
    192,
    224,
    80,
    150,
    224,
    264,
    96,
    176,
    260,
    308,
    104,
    198,
    288,
    352,
    120,
    216,
    320,
    384,
    132,
    240,
    360,
    432,
    144,
    280,
    408,
    480,
    168,
    308,
    448,
    532,
    180,
    338,
    504,
    588,
    196,
    364,
    546,
    650,
    224,
    416,
    600,
    700,
    224,
    442,
    644,
    750,
    252,
    476,
    690,
    816,
    270,
    504,
    750,
    900,
    300,
    560,
    810,
    960,
    312,
    588,
    870,
    1050,
    336,
    644,
    952,
    1110,
    360,
    700,
    1020,
    1200,
    390,
    728,
    1050,
    1260,
    420,
    784,
    1140,
    1350,
    450,
    812,
    1200,
    1440,
    480,
    868,
    1290,
    1530,
    510,
    924,
    1350,
    1620,
    540,
    980,
    1440,
    1710,
    570,
    1036,
    1530,
    1800,
    570,
    1064,
    1590,
    1890,
    600,
    1120,
    1680,
    1980,
    630,
    1204,
    1770,
    2100,
    660,
    1260,
    1860,
    2220,
    720,
    1316,
    1950,
    2310,
    750,
    1372,
    2040,
    2430
  ];
  return ie.getBlocksCount = function(n, t) {
    switch (t) {
      case e.L:
        return o[(n - 1) * 4 + 0];
      case e.M:
        return o[(n - 1) * 4 + 1];
      case e.Q:
        return o[(n - 1) * 4 + 2];
      case e.H:
        return o[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, ie.getTotalCodewordsCount = function(n, t) {
    switch (t) {
      case e.L:
        return a[(n - 1) * 4 + 0];
      case e.M:
        return a[(n - 1) * 4 + 1];
      case e.Q:
        return a[(n - 1) * 4 + 2];
      case e.H:
        return a[(n - 1) * 4 + 3];
      default:
        return;
    }
  }, ie;
}
var xe = {}, te = {}, rt;
function sn() {
  if (rt) return te;
  rt = 1;
  const e = new Uint8Array(512), o = new Uint8Array(256);
  return (function() {
    let r = 1;
    for (let n = 0; n < 255; n++)
      e[n] = r, o[r] = n, r <<= 1, r & 256 && (r ^= 285);
    for (let n = 255; n < 512; n++)
      e[n] = e[n - 255];
  })(), te.log = function(r) {
    if (r < 1) throw new Error("log(" + r + ")");
    return o[r];
  }, te.exp = function(r) {
    return e[r];
  }, te.mul = function(r, n) {
    return r === 0 || n === 0 ? 0 : e[o[r] + o[n]];
  }, te;
}
var ot;
function ln() {
  return ot || (ot = 1, (function(e) {
    const o = sn();
    e.mul = function(r, n) {
      const t = new Uint8Array(r.length + n.length - 1);
      for (let l = 0; l < r.length; l++)
        for (let s = 0; s < n.length; s++)
          t[l + s] ^= o.mul(r[l], n[s]);
      return t;
    }, e.mod = function(r, n) {
      let t = new Uint8Array(r);
      for (; t.length - n.length >= 0; ) {
        const l = t[0];
        for (let c = 0; c < n.length; c++)
          t[c] ^= o.mul(n[c], l);
        let s = 0;
        for (; s < t.length && t[s] === 0; ) s++;
        t = t.slice(s);
      }
      return t;
    }, e.generateECPolynomial = function(r) {
      let n = new Uint8Array([1]);
      for (let t = 0; t < r; t++)
        n = e.mul(n, new Uint8Array([1, o.exp(t)]));
      return n;
    };
  })(xe)), xe;
}
var we, it;
function dn() {
  if (it) return we;
  it = 1;
  const e = ln();
  function o(a) {
    this.genPoly = void 0, this.degree = a, this.degree && this.initialize(this.degree);
  }
  return o.prototype.initialize = function(r) {
    this.degree = r, this.genPoly = e.generateECPolynomial(this.degree);
  }, o.prototype.encode = function(r) {
    if (!this.genPoly)
      throw new Error("Encoder not initialized");
    const n = new Uint8Array(r.length + this.degree);
    n.set(r);
    const t = e.mod(n, this.genPoly), l = this.degree - t.length;
    if (l > 0) {
      const s = new Uint8Array(this.degree);
      return s.set(t, l), s;
    }
    return t;
  }, we = o, we;
}
var Ce = {}, ve = {}, Be = {}, at;
function Nt() {
  return at || (at = 1, Be.isValid = function(o) {
    return !isNaN(o) && o >= 1 && o <= 40;
  }), Be;
}
var N = {}, st;
function zt() {
  if (st) return N;
  st = 1;
  const e = "[0-9]+", o = "[A-Z $%*+\\-./:]+";
  let a = "(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";
  a = a.replace(/u/g, "\\u");
  const r = "(?:(?![A-Z0-9 $%*+\\-./:]|" + a + `)(?:.|[\r
]))+`;
  N.KANJI = new RegExp(a, "g"), N.BYTE_KANJI = new RegExp("[^A-Z0-9 $%*+\\-./:]+", "g"), N.BYTE = new RegExp(r, "g"), N.NUMERIC = new RegExp(e, "g"), N.ALPHANUMERIC = new RegExp(o, "g");
  const n = new RegExp("^" + a + "$"), t = new RegExp("^" + e + "$"), l = new RegExp("^[A-Z0-9 $%*+\\-./:]+$");
  return N.testKanji = function(c) {
    return n.test(c);
  }, N.testNumeric = function(c) {
    return t.test(c);
  }, N.testAlphanumeric = function(c) {
    return l.test(c);
  }, N;
}
var lt;
function J() {
  return lt || (lt = 1, (function(e) {
    const o = Nt(), a = zt();
    e.NUMERIC = {
      id: "Numeric",
      bit: 1,
      ccBits: [10, 12, 14]
    }, e.ALPHANUMERIC = {
      id: "Alphanumeric",
      bit: 2,
      ccBits: [9, 11, 13]
    }, e.BYTE = {
      id: "Byte",
      bit: 4,
      ccBits: [8, 16, 16]
    }, e.KANJI = {
      id: "Kanji",
      bit: 8,
      ccBits: [8, 10, 12]
    }, e.MIXED = {
      bit: -1
    }, e.getCharCountIndicator = function(t, l) {
      if (!t.ccBits) throw new Error("Invalid mode: " + t);
      if (!o.isValid(l))
        throw new Error("Invalid version: " + l);
      return l >= 1 && l < 10 ? t.ccBits[0] : l < 27 ? t.ccBits[1] : t.ccBits[2];
    }, e.getBestModeForData = function(t) {
      return a.testNumeric(t) ? e.NUMERIC : a.testAlphanumeric(t) ? e.ALPHANUMERIC : a.testKanji(t) ? e.KANJI : e.BYTE;
    }, e.toString = function(t) {
      if (t && t.id) return t.id;
      throw new Error("Invalid mode");
    }, e.isValid = function(t) {
      return t && t.bit && t.ccBits;
    };
    function r(n) {
      if (typeof n != "string")
        throw new Error("Param is not a string");
      switch (n.toLowerCase()) {
        case "numeric":
          return e.NUMERIC;
        case "alphanumeric":
          return e.ALPHANUMERIC;
        case "kanji":
          return e.KANJI;
        case "byte":
          return e.BYTE;
        default:
          throw new Error("Unknown mode: " + n);
      }
    }
    e.from = function(t, l) {
      if (e.isValid(t))
        return t;
      try {
        return r(t);
      } catch {
        return l;
      }
    };
  })(ve)), ve;
}
var dt;
function cn() {
  return dt || (dt = 1, (function(e) {
    const o = K(), a = Lt(), r = je(), n = J(), t = Nt(), l = 7973, s = o.getBCHDigit(l);
    function c(p, S, y) {
      for (let I = 1; I <= 40; I++)
        if (S <= e.getCapacity(I, y, p))
          return I;
    }
    function f(p, S) {
      return n.getCharCountIndicator(p, S) + 4;
    }
    function h(p, S) {
      let y = 0;
      return p.forEach(function(I) {
        const _ = f(I.mode, S);
        y += _ + I.getBitsLength();
      }), y;
    }
    function g(p, S) {
      for (let y = 1; y <= 40; y++)
        if (h(p, y) <= e.getCapacity(y, S, n.MIXED))
          return y;
    }
    e.from = function(S, y) {
      return t.isValid(S) ? parseInt(S, 10) : y;
    }, e.getCapacity = function(S, y, I) {
      if (!t.isValid(S))
        throw new Error("Invalid QR Code version");
      typeof I > "u" && (I = n.BYTE);
      const _ = o.getSymbolTotalCodewords(S), u = a.getTotalCodewordsCount(S, y), v = (_ - u) * 8;
      if (I === n.MIXED) return v;
      const R = v - f(I, S);
      switch (I) {
        case n.NUMERIC:
          return Math.floor(R / 10 * 3);
        case n.ALPHANUMERIC:
          return Math.floor(R / 11 * 2);
        case n.KANJI:
          return Math.floor(R / 13);
        case n.BYTE:
        default:
          return Math.floor(R / 8);
      }
    }, e.getBestVersionForData = function(S, y) {
      let I;
      const _ = r.from(y, r.M);
      if (Array.isArray(S)) {
        if (S.length > 1)
          return g(S, _);
        if (S.length === 0)
          return 1;
        I = S[0];
      } else
        I = S;
      return c(I.mode, I.getLength(), _);
    }, e.getEncodedBits = function(S) {
      if (!t.isValid(S) || S < 7)
        throw new Error("Invalid QR Code version");
      let y = S << 12;
      for (; o.getBCHDigit(y) - s >= 0; )
        y ^= l << o.getBCHDigit(y) - s;
      return S << 12 | y;
    };
  })(Ce)), Ce;
}
var Ee = {}, ct;
function un() {
  if (ct) return Ee;
  ct = 1;
  const e = K(), o = 1335, a = 21522, r = e.getBCHDigit(o);
  return Ee.getEncodedBits = function(t, l) {
    const s = t.bit << 3 | l;
    let c = s << 10;
    for (; e.getBCHDigit(c) - r >= 0; )
      c ^= o << e.getBCHDigit(c) - r;
    return (s << 10 | c) ^ a;
  }, Ee;
}
var Te = {}, ke, ut;
function fn() {
  if (ut) return ke;
  ut = 1;
  const e = J();
  function o(a) {
    this.mode = e.NUMERIC, this.data = a.toString();
  }
  return o.getBitsLength = function(r) {
    return 10 * Math.floor(r / 3) + (r % 3 ? r % 3 * 3 + 1 : 0);
  }, o.prototype.getLength = function() {
    return this.data.length;
  }, o.prototype.getBitsLength = function() {
    return o.getBitsLength(this.data.length);
  }, o.prototype.write = function(r) {
    let n, t, l;
    for (n = 0; n + 3 <= this.data.length; n += 3)
      t = this.data.substr(n, 3), l = parseInt(t, 10), r.put(l, 10);
    const s = this.data.length - n;
    s > 0 && (t = this.data.substr(n), l = parseInt(t, 10), r.put(l, s * 3 + 1));
  }, ke = o, ke;
}
var Me, ft;
function gn() {
  if (ft) return Me;
  ft = 1;
  const e = J(), o = [
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    "$",
    "%",
    "*",
    "+",
    "-",
    ".",
    "/",
    ":"
  ];
  function a(r) {
    this.mode = e.ALPHANUMERIC, this.data = r;
  }
  return a.getBitsLength = function(n) {
    return 11 * Math.floor(n / 2) + 6 * (n % 2);
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(n) {
    let t;
    for (t = 0; t + 2 <= this.data.length; t += 2) {
      let l = o.indexOf(this.data[t]) * 45;
      l += o.indexOf(this.data[t + 1]), n.put(l, 11);
    }
    this.data.length % 2 && n.put(o.indexOf(this.data[t]), 6);
  }, Me = a, Me;
}
var Ie, gt;
function hn() {
  if (gt) return Ie;
  gt = 1;
  const e = J();
  function o(a) {
    this.mode = e.BYTE, typeof a == "string" ? this.data = new TextEncoder().encode(a) : this.data = new Uint8Array(a);
  }
  return o.getBitsLength = function(r) {
    return r * 8;
  }, o.prototype.getLength = function() {
    return this.data.length;
  }, o.prototype.getBitsLength = function() {
    return o.getBitsLength(this.data.length);
  }, o.prototype.write = function(a) {
    for (let r = 0, n = this.data.length; r < n; r++)
      a.put(this.data[r], 8);
  }, Ie = o, Ie;
}
var Re, ht;
function pn() {
  if (ht) return Re;
  ht = 1;
  const e = J(), o = K();
  function a(r) {
    this.mode = e.KANJI, this.data = r;
  }
  return a.getBitsLength = function(n) {
    return n * 13;
  }, a.prototype.getLength = function() {
    return this.data.length;
  }, a.prototype.getBitsLength = function() {
    return a.getBitsLength(this.data.length);
  }, a.prototype.write = function(r) {
    let n;
    for (n = 0; n < this.data.length; n++) {
      let t = o.toSJIS(this.data[n]);
      if (t >= 33088 && t <= 40956)
        t -= 33088;
      else if (t >= 57408 && t <= 60351)
        t -= 49472;
      else
        throw new Error(
          "Invalid SJIS character: " + this.data[n] + `
Make sure your charset is UTF-8`
        );
      t = (t >>> 8 & 255) * 192 + (t & 255), r.put(t, 13);
    }
  }, Re = a, Re;
}
var Ae = { exports: {} }, pt;
function yn() {
  return pt || (pt = 1, (function(e) {
    var o = {
      single_source_shortest_paths: function(a, r, n) {
        var t = {}, l = {};
        l[r] = 0;
        var s = o.PriorityQueue.make();
        s.push(r, 0);
        for (var c, f, h, g, p, S, y, I, _; !s.empty(); ) {
          c = s.pop(), f = c.value, g = c.cost, p = a[f] || {};
          for (h in p)
            p.hasOwnProperty(h) && (S = p[h], y = g + S, I = l[h], _ = typeof l[h] > "u", (_ || I > y) && (l[h] = y, s.push(h, y), t[h] = f));
        }
        if (typeof n < "u" && typeof l[n] > "u") {
          var u = ["Could not find a path from ", r, " to ", n, "."].join("");
          throw new Error(u);
        }
        return t;
      },
      extract_shortest_path_from_predecessor_list: function(a, r) {
        for (var n = [], t = r; t; )
          n.push(t), a[t], t = a[t];
        return n.reverse(), n;
      },
      find_path: function(a, r, n) {
        var t = o.single_source_shortest_paths(a, r, n);
        return o.extract_shortest_path_from_predecessor_list(
          t,
          n
        );
      },
      /**
       * A very naive priority queue implementation.
       */
      PriorityQueue: {
        make: function(a) {
          var r = o.PriorityQueue, n = {}, t;
          a = a || {};
          for (t in r)
            r.hasOwnProperty(t) && (n[t] = r[t]);
          return n.queue = [], n.sorter = a.sorter || r.default_sorter, n;
        },
        default_sorter: function(a, r) {
          return a.cost - r.cost;
        },
        /**
         * Add a new item to the queue and ensure the highest priority element
         * is at the front of the queue.
         */
        push: function(a, r) {
          var n = { value: a, cost: r };
          this.queue.push(n), this.queue.sort(this.sorter);
        },
        /**
         * Return the highest priority element in the queue.
         */
        pop: function() {
          return this.queue.shift();
        },
        empty: function() {
          return this.queue.length === 0;
        }
      }
    };
    e.exports = o;
  })(Ae)), Ae.exports;
}
var yt;
function mn() {
  return yt || (yt = 1, (function(e) {
    const o = J(), a = fn(), r = gn(), n = hn(), t = pn(), l = zt(), s = K(), c = yn();
    function f(u) {
      return unescape(encodeURIComponent(u)).length;
    }
    function h(u, v, R) {
      const m = [];
      let C;
      for (; (C = u.exec(R)) !== null; )
        m.push({
          data: C[0],
          index: C.index,
          mode: v,
          length: C[0].length
        });
      return m;
    }
    function g(u) {
      const v = h(l.NUMERIC, o.NUMERIC, u), R = h(l.ALPHANUMERIC, o.ALPHANUMERIC, u);
      let m, C;
      return s.isKanjiModeEnabled() ? (m = h(l.BYTE, o.BYTE, u), C = h(l.KANJI, o.KANJI, u)) : (m = h(l.BYTE_KANJI, o.BYTE, u), C = []), v.concat(R, m, C).sort(function(B, k) {
        return B.index - k.index;
      }).map(function(B) {
        return {
          data: B.data,
          mode: B.mode,
          length: B.length
        };
      });
    }
    function p(u, v) {
      switch (v) {
        case o.NUMERIC:
          return a.getBitsLength(u);
        case o.ALPHANUMERIC:
          return r.getBitsLength(u);
        case o.KANJI:
          return t.getBitsLength(u);
        case o.BYTE:
          return n.getBitsLength(u);
      }
    }
    function S(u) {
      return u.reduce(function(v, R) {
        const m = v.length - 1 >= 0 ? v[v.length - 1] : null;
        return m && m.mode === R.mode ? (v[v.length - 1].data += R.data, v) : (v.push(R), v);
      }, []);
    }
    function y(u) {
      const v = [];
      for (let R = 0; R < u.length; R++) {
        const m = u[R];
        switch (m.mode) {
          case o.NUMERIC:
            v.push([
              m,
              { data: m.data, mode: o.ALPHANUMERIC, length: m.length },
              { data: m.data, mode: o.BYTE, length: m.length }
            ]);
            break;
          case o.ALPHANUMERIC:
            v.push([
              m,
              { data: m.data, mode: o.BYTE, length: m.length }
            ]);
            break;
          case o.KANJI:
            v.push([
              m,
              { data: m.data, mode: o.BYTE, length: f(m.data) }
            ]);
            break;
          case o.BYTE:
            v.push([
              { data: m.data, mode: o.BYTE, length: f(m.data) }
            ]);
        }
      }
      return v;
    }
    function I(u, v) {
      const R = {}, m = { start: {} };
      let C = ["start"];
      for (let x = 0; x < u.length; x++) {
        const B = u[x], k = [];
        for (let w = 0; w < B.length; w++) {
          const A = B[w], E = "" + x + w;
          k.push(E), R[E] = { node: A, lastCount: 0 }, m[E] = {};
          for (let M = 0; M < C.length; M++) {
            const T = C[M];
            R[T] && R[T].node.mode === A.mode ? (m[T][E] = p(R[T].lastCount + A.length, A.mode) - p(R[T].lastCount, A.mode), R[T].lastCount += A.length) : (R[T] && (R[T].lastCount = A.length), m[T][E] = p(A.length, A.mode) + 4 + o.getCharCountIndicator(A.mode, v));
          }
        }
        C = k;
      }
      for (let x = 0; x < C.length; x++)
        m[C[x]].end = 0;
      return { map: m, table: R };
    }
    function _(u, v) {
      let R;
      const m = o.getBestModeForData(u);
      if (R = o.from(v, m), R !== o.BYTE && R.bit < m.bit)
        throw new Error('"' + u + '" cannot be encoded with mode ' + o.toString(R) + `.
 Suggested mode is: ` + o.toString(m));
      switch (R === o.KANJI && !s.isKanjiModeEnabled() && (R = o.BYTE), R) {
        case o.NUMERIC:
          return new a(u);
        case o.ALPHANUMERIC:
          return new r(u);
        case o.KANJI:
          return new t(u);
        case o.BYTE:
          return new n(u);
      }
    }
    e.fromArray = function(v) {
      return v.reduce(function(R, m) {
        return typeof m == "string" ? R.push(_(m, null)) : m.data && R.push(_(m.data, m.mode)), R;
      }, []);
    }, e.fromString = function(v, R) {
      const m = g(v, s.isKanjiModeEnabled()), C = y(m), x = I(C, R), B = c.find_path(x.map, "start", "end"), k = [];
      for (let w = 1; w < B.length - 1; w++)
        k.push(x.table[B[w]].node);
      return e.fromArray(S(k));
    }, e.rawSplit = function(v) {
      return e.fromArray(
        g(v, s.isKanjiModeEnabled())
      );
    };
  })(Te)), Te;
}
var mt;
function bn() {
  if (mt) return ge;
  mt = 1;
  const e = K(), o = je(), a = tn(), r = nn(), n = rn(), t = on(), l = an(), s = Lt(), c = dn(), f = cn(), h = un(), g = J(), p = mn();
  function S(x, B) {
    const k = x.size, w = t.getPositions(B);
    for (let A = 0; A < w.length; A++) {
      const E = w[A][0], M = w[A][1];
      for (let T = -1; T <= 7; T++)
        if (!(E + T <= -1 || k <= E + T))
          for (let P = -1; P <= 7; P++)
            M + P <= -1 || k <= M + P || (T >= 0 && T <= 6 && (P === 0 || P === 6) || P >= 0 && P <= 6 && (T === 0 || T === 6) || T >= 2 && T <= 4 && P >= 2 && P <= 4 ? x.set(E + T, M + P, !0, !0) : x.set(E + T, M + P, !1, !0));
    }
  }
  function y(x) {
    const B = x.size;
    for (let k = 8; k < B - 8; k++) {
      const w = k % 2 === 0;
      x.set(k, 6, w, !0), x.set(6, k, w, !0);
    }
  }
  function I(x, B) {
    const k = n.getPositions(B);
    for (let w = 0; w < k.length; w++) {
      const A = k[w][0], E = k[w][1];
      for (let M = -2; M <= 2; M++)
        for (let T = -2; T <= 2; T++)
          M === -2 || M === 2 || T === -2 || T === 2 || M === 0 && T === 0 ? x.set(A + M, E + T, !0, !0) : x.set(A + M, E + T, !1, !0);
    }
  }
  function _(x, B) {
    const k = x.size, w = f.getEncodedBits(B);
    let A, E, M;
    for (let T = 0; T < 18; T++)
      A = Math.floor(T / 3), E = T % 3 + k - 8 - 3, M = (w >> T & 1) === 1, x.set(A, E, M, !0), x.set(E, A, M, !0);
  }
  function u(x, B, k) {
    const w = x.size, A = h.getEncodedBits(B, k);
    let E, M;
    for (E = 0; E < 15; E++)
      M = (A >> E & 1) === 1, E < 6 ? x.set(E, 8, M, !0) : E < 8 ? x.set(E + 1, 8, M, !0) : x.set(w - 15 + E, 8, M, !0), E < 8 ? x.set(8, w - E - 1, M, !0) : E < 9 ? x.set(8, 15 - E - 1 + 1, M, !0) : x.set(8, 15 - E - 1, M, !0);
    x.set(w - 8, 8, 1, !0);
  }
  function v(x, B) {
    const k = x.size;
    let w = -1, A = k - 1, E = 7, M = 0;
    for (let T = k - 1; T > 0; T -= 2)
      for (T === 6 && T--; ; ) {
        for (let P = 0; P < 2; P++)
          if (!x.isReserved(A, T - P)) {
            let U = !1;
            M < B.length && (U = (B[M] >>> E & 1) === 1), x.set(A, T - P, U), E--, E === -1 && (M++, E = 7);
          }
        if (A += w, A < 0 || k <= A) {
          A -= w, w = -w;
          break;
        }
      }
  }
  function R(x, B, k) {
    const w = new a();
    k.forEach(function(P) {
      w.put(P.mode.bit, 4), w.put(P.getLength(), g.getCharCountIndicator(P.mode, x)), P.write(w);
    });
    const A = e.getSymbolTotalCodewords(x), E = s.getTotalCodewordsCount(x, B), M = (A - E) * 8;
    for (w.getLengthInBits() + 4 <= M && w.put(0, 4); w.getLengthInBits() % 8 !== 0; )
      w.putBit(0);
    const T = (M - w.getLengthInBits()) / 8;
    for (let P = 0; P < T; P++)
      w.put(P % 2 ? 17 : 236, 8);
    return m(w, x, B);
  }
  function m(x, B, k) {
    const w = e.getSymbolTotalCodewords(B), A = s.getTotalCodewordsCount(B, k), E = w - A, M = s.getBlocksCount(B, k), T = w % M, P = M - T, U = Math.floor(w / M), ee = Math.floor(E / M), Gt = ee + 1, Ve = U - ee, Yt = new c(Ve);
    let le = 0;
    const oe = new Array(M), Ke = new Array(M);
    let de = 0;
    const $t = new Uint8Array(x.buffer);
    for (let G = 0; G < M; G++) {
      const ue = G < P ? ee : Gt;
      oe[G] = $t.slice(le, le + ue), Ke[G] = Yt.encode(oe[G]), le += ue, de = Math.max(de, ue);
    }
    const ce = new Uint8Array(w);
    let Je = 0, z, D;
    for (z = 0; z < de; z++)
      for (D = 0; D < M; D++)
        z < oe[D].length && (ce[Je++] = oe[D][z]);
    for (z = 0; z < Ve; z++)
      for (D = 0; D < M; D++)
        ce[Je++] = Ke[D][z];
    return ce;
  }
  function C(x, B, k, w) {
    let A;
    if (Array.isArray(x))
      A = p.fromArray(x);
    else if (typeof x == "string") {
      let U = B;
      if (!U) {
        const ee = p.rawSplit(x);
        U = f.getBestVersionForData(ee, k);
      }
      A = p.fromString(x, U || 40);
    } else
      throw new Error("Invalid data");
    const E = f.getBestVersionForData(A, k);
    if (!E)
      throw new Error("The amount of data is too big to be stored in a QR Code");
    if (!B)
      B = E;
    else if (B < E)
      throw new Error(
        `
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: ` + E + `.
`
      );
    const M = R(B, k, A), T = e.getSymbolSize(B), P = new r(T);
    return S(P, B), y(P), I(P, B), u(P, k, 0), B >= 7 && _(P, B), v(P, M), isNaN(w) && (w = l.getBestMask(
      P,
      u.bind(null, P, k)
    )), l.applyMask(w, P), u(P, k, w), {
      modules: P,
      version: B,
      errorCorrectionLevel: k,
      maskPattern: w,
      segments: A
    };
  }
  return ge.create = function(B, k) {
    if (typeof B > "u" || B === "")
      throw new Error("No input text");
    let w = o.M, A, E;
    return typeof k < "u" && (w = o.from(k.errorCorrectionLevel, o.M), A = f.from(k.version), E = l.from(k.maskPattern), k.toSJISFunc && e.setToSJISFunction(k.toSJISFunc)), C(B, A, w, E);
  }, ge;
}
var Pe = {}, _e = {}, bt;
function Dt() {
  return bt || (bt = 1, (function(e) {
    function o(a) {
      if (typeof a == "number" && (a = a.toString()), typeof a != "string")
        throw new Error("Color should be defined as hex string");
      let r = a.slice().replace("#", "").split("");
      if (r.length < 3 || r.length === 5 || r.length > 8)
        throw new Error("Invalid hex color: " + a);
      (r.length === 3 || r.length === 4) && (r = Array.prototype.concat.apply([], r.map(function(t) {
        return [t, t];
      }))), r.length === 6 && r.push("F", "F");
      const n = parseInt(r.join(""), 16);
      return {
        r: n >> 24 & 255,
        g: n >> 16 & 255,
        b: n >> 8 & 255,
        a: n & 255,
        hex: "#" + r.slice(0, 6).join("")
      };
    }
    e.getOptions = function(r) {
      r || (r = {}), r.color || (r.color = {});
      const n = typeof r.margin > "u" || r.margin === null || r.margin < 0 ? 4 : r.margin, t = r.width && r.width >= 21 ? r.width : void 0, l = r.scale || 4;
      return {
        width: t,
        scale: t ? 4 : l,
        margin: n,
        color: {
          dark: o(r.color.dark || "#000000ff"),
          light: o(r.color.light || "#ffffffff")
        },
        type: r.type,
        rendererOpts: r.rendererOpts || {}
      };
    }, e.getScale = function(r, n) {
      return n.width && n.width >= r + n.margin * 2 ? n.width / (r + n.margin * 2) : n.scale;
    }, e.getImageWidth = function(r, n) {
      const t = e.getScale(r, n);
      return Math.floor((r + n.margin * 2) * t);
    }, e.qrToImageData = function(r, n, t) {
      const l = n.modules.size, s = n.modules.data, c = e.getScale(l, t), f = Math.floor((l + t.margin * 2) * c), h = t.margin * c, g = [t.color.light, t.color.dark];
      for (let p = 0; p < f; p++)
        for (let S = 0; S < f; S++) {
          let y = (p * f + S) * 4, I = t.color.light;
          if (p >= h && S >= h && p < f - h && S < f - h) {
            const _ = Math.floor((p - h) / c), u = Math.floor((S - h) / c);
            I = g[s[_ * l + u] ? 1 : 0];
          }
          r[y++] = I.r, r[y++] = I.g, r[y++] = I.b, r[y] = I.a;
        }
    };
  })(_e)), _e;
}
var St;
function Sn() {
  return St || (St = 1, (function(e) {
    const o = Dt();
    function a(n, t, l) {
      n.clearRect(0, 0, t.width, t.height), t.style || (t.style = {}), t.height = l, t.width = l, t.style.height = l + "px", t.style.width = l + "px";
    }
    function r() {
      try {
        return document.createElement("canvas");
      } catch {
        throw new Error("You need to specify a canvas element");
      }
    }
    e.render = function(t, l, s) {
      let c = s, f = l;
      typeof c > "u" && (!l || !l.getContext) && (c = l, l = void 0), l || (f = r()), c = o.getOptions(c);
      const h = o.getImageWidth(t.modules.size, c), g = f.getContext("2d"), p = g.createImageData(h, h);
      return o.qrToImageData(p.data, t, c), a(g, f, h), g.putImageData(p, 0, 0), f;
    }, e.renderToDataURL = function(t, l, s) {
      let c = s;
      typeof c > "u" && (!l || !l.getContext) && (c = l, l = void 0), c || (c = {});
      const f = e.render(t, l, c), h = c.type || "image/png", g = c.rendererOpts || {};
      return f.toDataURL(h, g.quality);
    };
  })(Pe)), Pe;
}
var Le = {}, xt;
function xn() {
  if (xt) return Le;
  xt = 1;
  const e = Dt();
  function o(n, t) {
    const l = n.a / 255, s = t + '="' + n.hex + '"';
    return l < 1 ? s + " " + t + '-opacity="' + l.toFixed(2).slice(1) + '"' : s;
  }
  function a(n, t, l) {
    let s = n + t;
    return typeof l < "u" && (s += " " + l), s;
  }
  function r(n, t, l) {
    let s = "", c = 0, f = !1, h = 0;
    for (let g = 0; g < n.length; g++) {
      const p = Math.floor(g % t), S = Math.floor(g / t);
      !p && !f && (f = !0), n[g] ? (h++, g > 0 && p > 0 && n[g - 1] || (s += f ? a("M", p + l, 0.5 + S + l) : a("m", c, 0), c = 0, f = !1), p + 1 < t && n[g + 1] || (s += a("h", h), h = 0)) : c++;
    }
    return s;
  }
  return Le.render = function(t, l, s) {
    const c = e.getOptions(l), f = t.modules.size, h = t.modules.data, g = f + c.margin * 2, p = c.color.light.a ? "<path " + o(c.color.light, "fill") + ' d="M0 0h' + g + "v" + g + 'H0z"/>' : "", S = "<path " + o(c.color.dark, "stroke") + ' d="' + r(h, f, c.margin) + '"/>', y = 'viewBox="0 0 ' + g + " " + g + '"', _ = '<svg xmlns="http://www.w3.org/2000/svg" ' + (c.width ? 'width="' + c.width + '" height="' + c.width + '" ' : "") + y + ' shape-rendering="crispEdges">' + p + S + `</svg>
`;
    return typeof s == "function" && s(null, _), _;
  }, Le;
}
var wt;
function wn() {
  if (wt) return Y;
  wt = 1;
  const e = en(), o = bn(), a = Sn(), r = xn();
  function n(t, l, s, c, f) {
    const h = [].slice.call(arguments, 1), g = h.length, p = typeof h[g - 1] == "function";
    if (!p && !e())
      throw new Error("Callback required as last argument");
    if (p) {
      if (g < 2)
        throw new Error("Too few arguments provided");
      g === 2 ? (f = s, s = l, l = c = void 0) : g === 3 && (l.getContext && typeof f > "u" ? (f = c, c = void 0) : (f = c, c = s, s = l, l = void 0));
    } else {
      if (g < 1)
        throw new Error("Too few arguments provided");
      return g === 1 ? (s = l, l = c = void 0) : g === 2 && !l.getContext && (c = s, s = l, l = void 0), new Promise(function(S, y) {
        try {
          const I = o.create(s, c);
          S(t(I, l, c));
        } catch (I) {
          y(I);
        }
      });
    }
    try {
      const S = o.create(s, c);
      f(null, t(S, l, c));
    } catch (S) {
      f(S);
    }
  }
  return Y.create = o.create, Y.toCanvas = n.bind(null, a.render), Y.toDataURL = n.bind(null, a.renderToDataURL), Y.toString = n.bind(null, function(t, l, s) {
    return r.render(t, s);
  }), Y;
}
var Cn = wn();
const vn = /* @__PURE__ */ Zt(Cn), Ft = {
  primary: "#3ecfb4",
  primaryHover: "#62dcc4",
  primarySubtle: "rgba(62, 207, 180, 0.08)",
  primaryGlow: "rgba(62, 207, 180, 0.14)",
  success: "#34d399",
  successSubtle: "rgba(52, 211, 153, 0.12)",
  warning: "#fbbf24",
  warningSubtle: "rgba(251, 191, 36, 0.12)",
  danger: "#fb7185",
  dangerSubtle: "rgba(251, 113, 133, 0.12)",
  info: "#7dd3fc",
  infoSubtle: "rgba(125, 211, 252, 0.12)",
  // 背景：深蓝黑，带微蓝底调增加深度感
  bgDeep: "#06080e",
  bg: "#0c0f17",
  bgElevated: "#131722",
  bgSurface: "#1a1e2a",
  bgHover: "#232836",
  bgActive: "#2c3240",
  // 边框：蓝调透明
  border: "rgba(148, 175, 225, 0.08)",
  borderSubtle: "rgba(148, 175, 225, 0.05)",
  borderFocus: "rgba(62, 207, 180, 0.40)",
  // 文字：微蓝白，长时间阅读更舒适
  text: "#e2e6f0",
  textSecondary: "#8d93a8",
  textTertiary: "#565d73",
  textInverse: "#06080e",
  glass: "rgba(148, 175, 225, 0.03)",
  glassBorder: "rgba(148, 175, 225, 0.06)",
  shadowSm: "0 2px 8px rgba(0, 0, 0, 0.36)",
  shadowMd: "0 8px 24px rgba(0, 0, 0, 0.48)",
  shadowLg: "0 20px 48px rgba(0, 0, 0, 0.60)",
  shadowGlow: "0 0 0 1px rgba(62, 207, 180, 0.08), 0 8px 32px rgba(62, 207, 180, 0.10)"
}, Bn = {
  radiusSm: "12px",
  radiusMd: "18px",
  radiusLg: "22px",
  radiusXl: "28px",
  fontSans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  fontMono: "'JetBrains Mono', 'SF Mono', 'Cascadia Code', monospace",
  transition: "200ms cubic-bezier(0.4, 0, 0.2, 1)",
  transitionSlow: "400ms cubic-bezier(0.4, 0, 0.2, 1)"
}, En = {
  sidebarWidth: "260px",
  sidebarCollapsed: "72px",
  topbarHeight: "64px"
}, He = {
  ...Bn,
  ...En
}, qt = {
  dark: Ft
};
function Tn(e) {
  return e.replace(/[A-Z]/g, (o) => "-" + o.toLowerCase());
}
function Ut(e = "ag") {
  return e.trim() || "ag";
}
function se(e, o) {
  return `--${e}-${Tn(o)}`;
}
Object.keys(qt.dark).reduce((e, o) => (e[o] = se("ag", o), e), {});
Object.keys(He).reduce((e, o) => (e[o] = se("ag", o), e), {});
function Wt(e = {}) {
  const o = Ut(e.prefix);
  return Object.keys(qt.dark).reduce((a, r) => (a[r] = se(o, r), a), {});
}
function Ot(e = {}) {
  const o = Ut(e.prefix);
  return Object.keys(He).reduce((a, r) => (a[r] = se(o, r), a), {});
}
const kn = Wt(), Mn = Ot();
function i(e, o = {}) {
  const a = o.prefix ? Wt(o) : kn, r = o.prefix ? Ot(o) : Mn;
  if (e in a) {
    const t = e;
    return `var(${a[t]}, ${Ft[t]})`;
  }
  const n = e;
  return `var(${r[n]}, ${He[n]})`;
}
const In = "/api/v1/ext-user/payment-epay", Rn = "/api/v1/ext/payment-epay";
async function F(e, o, a, r) {
  const n = {};
  a !== void 0 && (n["Content-Type"] = "application/json");
  const t = localStorage.getItem("token");
  t && (n.Authorization = `Bearer ${t}`);
  const l = r != null && r.admin ? Rn : In, s = await fetch(l + o, {
    method: e,
    headers: n,
    body: a ? JSON.stringify(a) : void 0
  }), c = await s.text();
  let f = null;
  try {
    f = c ? JSON.parse(c) : null;
  } catch {
  }
  if (!s.ok) {
    const g = f, p = (g == null ? void 0 : g.message) || (f == null ? void 0 : f.error) || `HTTP ${s.status}`;
    throw s.status === 401 && (localStorage.removeItem("token"), window.location.href = "/login"), new Error(p);
  }
  const h = f;
  if (h && typeof h == "object" && "code" in h && "data" in h) {
    if (h.code !== 0)
      throw new Error(h.message || "请求失败");
    return h.data;
  }
  return f;
}
const q = {
  // ============ User ============
  /** 列出当前可用的支付方式（PayMethod，不是 Provider） */
  methods: () => F(
    "GET",
    "/user/methods"
  ),
  createOrder: (e) => F("POST", "/user/orders", e),
  listOrders: (e = 50) => F("GET", `/user/orders?limit=${e}`),
  getOrder: (e) => F("GET", `/user/orders/${encodeURIComponent(e)}`),
  // ============ Admin: 订单 ============
  // email 为子串过滤（后端走 ILIKE %x%）；status='all' 或留空表示不过滤
  adminListOrders: (e = {}) => {
    const o = new URLSearchParams();
    return o.set("page", String(e.page ?? 1)), o.set("page_size", String(e.pageSize ?? 20)), e.email && e.email.trim() && o.set("email", e.email.trim()), e.status && e.status !== "all" && o.set("status", e.status), F("GET", `/admin/orders?${o.toString()}`, void 0, { admin: !0 });
  },
  // ============ Admin: Provider 配置 ============
  adminListProviders: () => F("GET", "/admin/providers", void 0, { admin: !0 }),
  adminUpsertProvider: (e) => F("POST", "/admin/providers", e, { admin: !0 }),
  adminDeleteProvider: (e) => F("DELETE", `/admin/providers/${encodeURIComponent(e)}`, void 0, { admin: !0 }),
  adminReloadProviders: () => F("POST", "/admin/providers/reload", {}, { admin: !0 })
};
function An() {
  const [e, o] = L([]), [a, r] = L(!0), [n, t] = L(null), [l, s] = L(30), [c, f] = L(""), [h, g] = L(!1), [p, S] = L(null), [y, I] = L(null), [_, u] = L(null), v = _t(null);
  H(() => {
    q.methods().then((C) => {
      var x;
      o(C.methods || []), (x = C.methods) != null && x.length && f(C.methods[0].key);
    }).catch((C) => t(String((C == null ? void 0 : C.message) || C))).finally(() => r(!1));
  }, []), H(() => {
    if (!y || y.status !== "pending") {
      v.current && (window.clearInterval(v.current), v.current = null);
      return;
    }
    const C = async () => {
      try {
        const x = await q.getOrder(y.out_trade_no);
        I(x);
      } catch {
      }
    };
    return v.current = window.setInterval(C, 3e3), () => {
      v.current && (window.clearInterval(v.current), v.current = null);
    };
  }, [y == null ? void 0 : y.out_trade_no, y == null ? void 0 : y.status]), H(() => {
    if (!y) {
      u(null);
      return;
    }
    const C = y.qr_code_content || y.payment_url;
    if (!C) {
      u(null);
      return;
    }
    let x = !1;
    return vn.toDataURL(C, { width: 240, margin: 2, errorCorrectionLevel: "M" }).then((B) => {
      x || u(B);
    }).catch(() => {
      x || u(null);
    }), () => {
      x = !0;
    };
  }, [y == null ? void 0 : y.payment_url, y == null ? void 0 : y.qr_code_content]);
  const R = async () => {
    if (S(null), !c) {
      S("请选择支付方式");
      return;
    }
    if (!l || l <= 0) {
      S("请输入有效金额");
      return;
    }
    g(!0);
    try {
      const C = await q.createOrder({ amount: l, method: c, subject: "AirGate 余额充值" });
      I(C);
    } catch (C) {
      S(String(C.message || C));
    } finally {
      g(!1);
    }
  }, m = () => {
    I(null), S(null);
  };
  return a ? /* @__PURE__ */ d("div", { style: V, children: /* @__PURE__ */ d("div", { style: Ct, children: "加载中..." }) }) : n ? /* @__PURE__ */ d("div", { style: V, children: /* @__PURE__ */ b("div", { style: { ...Ct, color: i("danger") }, children: [
    "加载支付方式失败: ",
    n
  ] }) }) : e.length === 0 ? /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ d("h2", { style: ne, children: "充值" }),
    /* @__PURE__ */ d("div", { style: ae, children: /* @__PURE__ */ d("p", { style: { color: i("textSecondary"), margin: 0 }, children: "当前没有可用的支付方式，请联系管理员在「插件管理 → 支付服务商」中启用至少一个服务商。" }) })
  ] }) : y ? y.status === "paid" ? /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ d("h2", { style: ne, children: "充值成功" }),
    /* @__PURE__ */ b("div", { style: ae, children: [
      /* @__PURE__ */ b("p", { style: { margin: 0, color: i("text") }, children: [
        "订单 ",
        /* @__PURE__ */ d("code", { style: ze, children: y.out_trade_no }),
        " 已支付，金额",
        " ",
        /* @__PURE__ */ b("strong", { style: { color: i("success") }, children: [
          "¥",
          y.amount.toFixed(2)
        ] }),
        " 已入账。"
      ] }),
      /* @__PURE__ */ d("button", { style: { ...Ne, marginTop: 20 }, onClick: m, children: "再次充值" })
    ] })
  ] }) : y.status === "pending" ? /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ d("h2", { style: ne, children: "扫码付款" }),
    /* @__PURE__ */ b("div", { style: qn, children: [
      _ ? /* @__PURE__ */ d("img", { src: _, alt: "付款二维码", style: Bt }) : /* @__PURE__ */ d("div", { style: { ...Bt, display: "flex", alignItems: "center", justifyContent: "center", color: i("textTertiary") }, children: "生成二维码中..." }),
      /* @__PURE__ */ b("div", { style: Un, children: [
        "¥ ",
        y.amount.toFixed(2)
      ] }),
      /* @__PURE__ */ b("div", { style: { color: i("textSecondary"), fontSize: 13 }, children: [
        "请使用 ",
        Pn(y.method),
        " 扫码完成付款"
      ] }),
      /* @__PURE__ */ b("div", { style: { marginTop: 8, color: i("textTertiary"), fontSize: 12 }, children: [
        "订单号：",
        /* @__PURE__ */ d("code", { style: ze, children: y.out_trade_no })
      ] }),
      /* @__PURE__ */ d("p", { style: { textAlign: "center", color: i("textTertiary"), fontSize: 13, marginTop: 20, marginBottom: 0 }, children: "支付完成后本页将自动跳转到结果页（每 3 秒检查一次）" }),
      y.payment_url && /* @__PURE__ */ b("p", { style: { textAlign: "center", fontSize: 12, marginTop: 8, marginBottom: 0 }, children: [
        "扫码不便？",
        " ",
        /* @__PURE__ */ d("a", { href: y.payment_url, target: "_blank", rel: "noreferrer", style: { color: i("primary"), textDecoration: "none" }, children: "点此在新窗口打开付款页 →" })
      ] }),
      /* @__PURE__ */ d("button", { style: { ...Fn, marginTop: 20 }, onClick: m, children: "取消" })
    ] })
  ] }) : /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ b("h2", { style: ne, children: [
      "订单已",
      _n(y.status)
    ] }),
    /* @__PURE__ */ b("div", { style: ae, children: [
      /* @__PURE__ */ b("p", { style: { margin: 0, color: i("textSecondary") }, children: [
        "订单号：",
        /* @__PURE__ */ d("code", { style: ze, children: y.out_trade_no })
      ] }),
      /* @__PURE__ */ d("button", { style: { ...Ne, marginTop: 20 }, onClick: m, children: "重新发起" })
    ] })
  ] }) : /* @__PURE__ */ b("div", { style: V, children: [
    /* @__PURE__ */ d("h2", { style: ne, children: "账户充值" }),
    /* @__PURE__ */ b("div", { style: ae, children: [
      /* @__PURE__ */ b("section", { children: [
        /* @__PURE__ */ d("h3", { style: vt, children: "选择金额" }),
        /* @__PURE__ */ d("div", { style: { display: "flex", flexWrap: "wrap", gap: 10 }, children: [10, 30, 50, 100, 200, 500].map((C) => /* @__PURE__ */ b(
          "button",
          {
            type: "button",
            onClick: () => s(C),
            style: l === C ? Nn : jt,
            children: [
              "¥",
              C
            ]
          },
          C
        )) }),
        /* @__PURE__ */ b("div", { style: { marginTop: 16, display: "flex", alignItems: "center", gap: 8, color: i("textSecondary"), fontSize: 13 }, children: [
          /* @__PURE__ */ d("span", { children: "自定义金额" }),
          /* @__PURE__ */ d(
            "input",
            {
              type: "number",
              min: 1,
              max: 1e4,
              step: 1,
              value: l,
              onChange: (C) => s(Number(C.target.value)),
              style: Dn
            }
          ),
          /* @__PURE__ */ d("span", { children: "元" })
        ] })
      ] }),
      /* @__PURE__ */ b("section", { style: Ln, children: [
        /* @__PURE__ */ d("h3", { style: vt, children: "选择支付方式" }),
        /* @__PURE__ */ d("div", { style: { display: "flex", gap: 12, flexWrap: "wrap" }, children: e.map((C) => /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            onClick: () => f(C.key),
            style: c === C.key ? zn : Ht,
            title: C.description,
            children: C.label
          },
          C.key
        )) })
      ] }),
      p && /* @__PURE__ */ d("p", { style: { color: i("danger"), marginTop: 16, fontSize: 13 }, children: p }),
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          onClick: R,
          disabled: h,
          style: { ...Ne, marginTop: 24, width: "100%", opacity: h ? 0.6 : 1 },
          children: h ? "处理中..." : "立即支付"
        }
      )
    ] })
  ] });
}
function Pn(e) {
  switch (e) {
    case "alipay":
      return "支付宝";
    case "wxpay":
      return "微信支付";
    default:
      return e;
  }
}
function _n(e) {
  switch (e) {
    case "expired":
      return "过期";
    case "failed":
      return "失败";
    case "cancelled":
      return "取消";
    case "refunded":
      return "退款";
    default:
      return e;
  }
}
const V = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: i("text")
}, ne = {
  margin: "0 0 20px",
  fontSize: 22,
  fontWeight: 600,
  color: i("text"),
  letterSpacing: "-0.01em"
}, Ct = {
  padding: "40px 0",
  textAlign: "center",
  color: i("textSecondary")
}, ae = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  background: i("bgSurface"),
  padding: "24px"
}, Ln = {
  marginTop: 28
}, vt = {
  margin: "0 0 12px",
  fontSize: 13,
  fontWeight: 600,
  color: i("textSecondary"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, jt = {
  minWidth: 88,
  padding: "12px 18px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  cursor: "pointer",
  fontSize: 15,
  fontWeight: 500,
  transition: i("transition")
}, Nn = {
  ...jt,
  borderColor: i("primary"),
  background: i("primarySubtle"),
  color: i("primary"),
  fontWeight: 600
}, Ht = {
  minWidth: 140,
  padding: "16px 24px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  cursor: "pointer",
  fontSize: 14,
  fontWeight: 500,
  transition: i("transition")
}, zn = {
  ...Ht,
  borderColor: i("primary"),
  background: i("primarySubtle"),
  color: i("primary"),
  fontWeight: 600
}, Dn = {
  padding: "8px 12px",
  width: 140,
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  fontSize: 14,
  outline: "none"
}, Ne = {
  padding: "12px 28px",
  border: "none",
  borderRadius: i("radiusMd"),
  background: i("primary"),
  color: i("textInverse"),
  fontSize: 14,
  fontWeight: 600,
  cursor: "pointer",
  transition: i("transition")
}, Fn = {
  padding: "10px 24px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: i("transition")
}, qn = {
  padding: "28px 24px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  background: i("bgSurface")
}, Bt = {
  width: 240,
  height: 240,
  background: "#fff",
  padding: 8,
  borderRadius: i("radiusMd")
}, Un = {
  marginTop: 20,
  fontSize: 32,
  fontWeight: 700,
  color: i("text"),
  fontFamily: i("fontMono"),
  letterSpacing: "-0.02em"
}, ze = {
  fontFamily: i("fontMono"),
  fontSize: "0.9em",
  padding: "1px 6px",
  borderRadius: 4,
  background: i("bg"),
  color: i("textSecondary")
};
function Wn() {
  const [e, o] = L([]), [a, r] = L(!0), [n, t] = L(null), l = () => {
    r(!0), q.listOrders(100).then((s) => o(s.list || [])).catch((s) => t(String((s == null ? void 0 : s.message) || s))).finally(() => r(!1));
  };
  return H(l, []), a ? /* @__PURE__ */ d("div", { style: De, children: /* @__PURE__ */ d("div", { style: Tt, children: "加载中..." }) }) : n ? /* @__PURE__ */ d("div", { style: De, children: /* @__PURE__ */ b("div", { style: { ...Tt, color: i("danger") }, children: [
    "加载失败: ",
    n
  ] }) }) : /* @__PURE__ */ b("div", { style: De, children: [
    /* @__PURE__ */ b("div", { style: Vn, children: [
      /* @__PURE__ */ d("h2", { style: Kn, children: "充值记录" }),
      /* @__PURE__ */ d("button", { onClick: l, style: Jn, children: "刷新" })
    ] }),
    /* @__PURE__ */ d("div", { style: Gn, children: e.length === 0 ? /* @__PURE__ */ d("p", { style: Yn, children: "暂无充值记录" }) : /* @__PURE__ */ d("div", { style: $n, children: /* @__PURE__ */ b("table", { style: Qn, children: [
      /* @__PURE__ */ d("thead", { children: /* @__PURE__ */ b("tr", { children: [
        /* @__PURE__ */ d("th", { style: $, children: "订单号" }),
        /* @__PURE__ */ d("th", { style: $, children: "金额" }),
        /* @__PURE__ */ d("th", { style: $, children: "支付方式" }),
        /* @__PURE__ */ d("th", { style: $, children: "状态" }),
        /* @__PURE__ */ d("th", { style: $, children: "创建时间" }),
        /* @__PURE__ */ d("th", { style: $, children: "支付时间" })
      ] }) }),
      /* @__PURE__ */ d("tbody", { children: e.map((s) => /* @__PURE__ */ b("tr", { children: [
        /* @__PURE__ */ d("td", { style: Q, children: /* @__PURE__ */ d("code", { style: Xn, children: s.out_trade_no }) }),
        /* @__PURE__ */ b("td", { style: { ...Q, fontWeight: 600 }, children: [
          "¥",
          s.amount.toFixed(2)
        ] }),
        /* @__PURE__ */ d("td", { style: Q, children: On(s.method) }),
        /* @__PURE__ */ d("td", { style: { ...Q, color: Hn(s.status), fontWeight: 600 }, children: jn(s.status) }),
        /* @__PURE__ */ d("td", { style: { ...Q, color: i("textSecondary") }, children: Et(s.created_at) }),
        /* @__PURE__ */ d("td", { style: { ...Q, color: i("textSecondary") }, children: s.paid_at ? Et(s.paid_at) : "-" })
      ] }, s.id)) })
    ] }) }) })
  ] });
}
function On(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function jn(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function Hn(e) {
  return {
    pending: i("warning"),
    paid: i("success"),
    expired: i("textTertiary"),
    failed: i("danger"),
    cancelled: i("textTertiary"),
    refunded: i("textTertiary")
  }[e] || "inherit";
}
function Et(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
const De = {
  maxWidth: 960,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: i("text")
}, Vn = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 20
}, Kn = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  color: i("text"),
  letterSpacing: "-0.01em"
}, Tt = {
  padding: "40px 0",
  textAlign: "center",
  color: i("textSecondary")
}, Jn = {
  padding: "8px 16px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bgSurface"),
  color: i("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500,
  transition: i("transition")
}, Gn = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  background: i("bgSurface"),
  padding: "8px 0",
  overflow: "hidden"
}, Yn = {
  color: i("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, $n = {
  overflowX: "auto"
}, Qn = {
  width: "100%",
  borderCollapse: "collapse"
}, $ = {
  textAlign: "left",
  padding: "10px 16px",
  borderBottom: `1px solid ${i("glassBorder")}`,
  background: i("bg"),
  color: i("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, Q = {
  padding: "12px 16px",
  borderBottom: `1px solid ${i("glassBorder")}`,
  fontSize: 13,
  color: i("text"),
  whiteSpace: "nowrap"
}, Xn = {
  fontSize: 12,
  fontFamily: i("fontMono"),
  color: i("textSecondary")
}, kt = {
  total: 0,
  paid: 0,
  pending: 0,
  expired: 0,
  failed: 0,
  cancelled: 0,
  refunded: 0,
  total_amount_paid: 0,
  today_amount_paid: 0
}, Zn = [10, 20, 50, 100];
function er() {
  const [e, o] = L([]), [a, r] = L(0), [n, t] = L(kt), [l, s] = L(!0), [c, f] = L(null), [h, g] = L("all"), [p, S] = L(""), [y, I] = L(1), [_, u] = L(20), v = Z(() => {
    s(!0), f(null), q.adminListOrders({ page: y, pageSize: _, email: p, status: h }).then((m) => {
      o(m.list || []), r(m.total || 0), t(m.stats || kt);
    }).catch((m) => f(String((m == null ? void 0 : m.message) || m))).finally(() => s(!1));
  }, [y, _, p, h]);
  H(() => {
    const C = setTimeout(v, p ? 300 : 0);
    return () => clearTimeout(C);
  }, [v, p]), H(() => {
    I(1);
  }, [h, p, _]);
  const R = Math.max(1, Math.ceil(a / _));
  return /* @__PURE__ */ b("div", { style: sr, children: [
    /* @__PURE__ */ b("div", { style: lr, children: [
      /* @__PURE__ */ d(X, { label: "总订单数", value: n.total }),
      /* @__PURE__ */ d(X, { label: "已支付", value: n.paid, accent: i("success") }),
      /* @__PURE__ */ d(X, { label: "待支付", value: n.pending, accent: i("warning") }),
      /* @__PURE__ */ d(X, { label: "已过期", value: n.expired }),
      /* @__PURE__ */ d(X, { label: "累计收款", value: `¥${n.total_amount_paid.toFixed(2)}`, accent: i("success") }),
      /* @__PURE__ */ d(X, { label: "今日收款", value: `¥${n.today_amount_paid.toFixed(2)}`, accent: i("success") })
    ] }),
    /* @__PURE__ */ b("div", { style: fr, children: [
      /* @__PURE__ */ b("div", { style: gr, children: [
        /* @__PURE__ */ b(
          "select",
          {
            value: h,
            onChange: (m) => g(m.target.value),
            style: hr,
            children: [
              /* @__PURE__ */ d("option", { value: "all", children: "全部状态" }),
              /* @__PURE__ */ d("option", { value: "pending", children: "待支付" }),
              /* @__PURE__ */ d("option", { value: "paid", children: "已支付" }),
              /* @__PURE__ */ d("option", { value: "expired", children: "已过期" }),
              /* @__PURE__ */ d("option", { value: "failed", children: "失败" }),
              /* @__PURE__ */ d("option", { value: "cancelled", children: "已取消" }),
              /* @__PURE__ */ d("option", { value: "refunded", children: "已退款" })
            ]
          }
        ),
        /* @__PURE__ */ d(
          "input",
          {
            type: "text",
            value: p,
            onChange: (m) => S(m.target.value),
            placeholder: "搜索用户邮箱",
            style: { ...pr, width: 240 }
          }
        ),
        /* @__PURE__ */ d(or, { onClick: v, loading: l })
      ] }),
      c ? /* @__PURE__ */ b("p", { style: { ...Fe, color: i("danger") }, children: [
        "加载失败: ",
        c
      ] }) : l && e.length === 0 ? /* @__PURE__ */ d("p", { style: Fe, children: "加载中..." }) : e.length === 0 ? /* @__PURE__ */ d("p", { style: Fe, children: "暂无订单" }) : /* @__PURE__ */ d("div", { style: yr, children: /* @__PURE__ */ b("table", { style: mr, children: [
        /* @__PURE__ */ d("thead", { children: /* @__PURE__ */ b("tr", { children: [
          /* @__PURE__ */ d("th", { style: O, children: "订单号" }),
          /* @__PURE__ */ d("th", { style: O, children: "用户邮箱" }),
          /* @__PURE__ */ d("th", { style: O, children: "金额" }),
          /* @__PURE__ */ d("th", { style: O, children: "支付方式" }),
          /* @__PURE__ */ d("th", { style: O, children: "服务商" }),
          /* @__PURE__ */ d("th", { style: O, children: "状态" }),
          /* @__PURE__ */ d("th", { style: O, children: "创建时间" }),
          /* @__PURE__ */ d("th", { style: O, children: "支付时间" })
        ] }) }),
        /* @__PURE__ */ d("tbody", { children: e.map((m) => /* @__PURE__ */ b("tr", { children: [
          /* @__PURE__ */ d("td", { style: j, children: /* @__PURE__ */ d("code", { style: br, children: m.out_trade_no }) }),
          /* @__PURE__ */ d("td", { style: j, children: m.user_email ? /* @__PURE__ */ d("span", { style: { color: i("text") }, children: m.user_email }) : /* @__PURE__ */ b("span", { style: { color: i("textTertiary") }, children: [
            "#",
            m.user_id
          ] }) }),
          /* @__PURE__ */ b("td", { style: { ...j, fontWeight: 600 }, children: [
            "¥",
            m.amount.toFixed(2)
          ] }),
          /* @__PURE__ */ d("td", { style: j, children: tr(m.method) }),
          /* @__PURE__ */ d("td", { style: { ...j, color: i("textSecondary") }, children: m.provider_id || "-" }),
          /* @__PURE__ */ d("td", { style: { ...j, color: rr(m.status), fontWeight: 600 }, children: nr(m.status) }),
          /* @__PURE__ */ d("td", { style: { ...j, color: i("textSecondary") }, children: Mt(m.created_at) }),
          /* @__PURE__ */ d("td", { style: { ...j, color: i("textSecondary") }, children: m.paid_at ? Mt(m.paid_at) : "-" })
        ] }, m.id)) })
      ] }) }),
      /* @__PURE__ */ d(
        ir,
        {
          page: y,
          pageSize: _,
          total: a,
          totalPages: R,
          onPageChange: I,
          onPageSizeChange: u
        }
      )
    ] })
  ] });
}
function X({ label: e, value: o, accent: a }) {
  return /* @__PURE__ */ b("div", { style: dr, children: [
    /* @__PURE__ */ d("div", { style: cr, children: e }),
    /* @__PURE__ */ d("div", { style: { ...ur, color: a || i("text") }, children: o })
  ] });
}
function tr(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e || "-";
}
function nr(e) {
  return {
    pending: "待支付",
    paid: "已支付",
    expired: "已过期",
    failed: "失败",
    cancelled: "已取消",
    refunded: "已退款"
  }[e] || e;
}
function rr(e) {
  return {
    pending: i("warning"),
    paid: i("success"),
    expired: i("textTertiary"),
    failed: i("danger"),
    cancelled: i("textTertiary"),
    refunded: i("textTertiary")
  }[e] || "inherit";
}
function Mt(e) {
  try {
    return new Date(e).toLocaleString();
  } catch {
    return e;
  }
}
function or({ onClick: e, loading: o }) {
  const [a, r] = L(!1);
  return /* @__PURE__ */ b(Qt, { children: [
    /* @__PURE__ */ d("style", { children: "@keyframes ag-epay-spin { to { transform: rotate(360deg); } }" }),
    /* @__PURE__ */ d(
      "button",
      {
        type: "button",
        "aria-label": "刷新",
        onClick: e,
        disabled: o,
        onMouseEnter: () => r(!0),
        onMouseLeave: () => r(!1),
        style: {
          marginLeft: "auto",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: 36,
          height: 36,
          border: `1px solid ${i("glassBorder")}`,
          borderRadius: 10,
          background: a ? i("bgHover") : "transparent",
          color: i(a ? "textSecondary" : "textTertiary"),
          cursor: o ? "not-allowed" : "pointer",
          opacity: o ? 0.6 : 1,
          transition: i("transition"),
          padding: 0
        },
        children: /* @__PURE__ */ b(
          "svg",
          {
            width: "16",
            height: "16",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            style: {
              animation: o ? "ag-epay-spin 1s linear infinite" : void 0
            },
            children: [
              /* @__PURE__ */ d("path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" }),
              /* @__PURE__ */ d("path", { d: "M21 3v5h-5" }),
              /* @__PURE__ */ d("path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" }),
              /* @__PURE__ */ d("path", { d: "M8 16H3v5" })
            ]
          }
        )
      }
    )
  ] });
}
function ir({ page: e, pageSize: o, total: a, totalPages: r, onPageChange: n, onPageSizeChange: t }) {
  const l = ar(e, r);
  return /* @__PURE__ */ b("div", { style: Sr, children: [
    /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: 10 }, children: [
      /* @__PURE__ */ b("span", { style: xr, children: [
        "共 ",
        a,
        " 条 · 第 ",
        e,
        "/",
        r,
        " 页"
      ] }),
      /* @__PURE__ */ d(
        "select",
        {
          value: o,
          onChange: (s) => t(Number(s.target.value)),
          style: wr,
          children: Zn.map((s) => /* @__PURE__ */ b("option", { value: s, children: [
            s,
            " 条/页"
          ] }, s))
        }
      )
    ] }),
    /* @__PURE__ */ b("div", { style: { display: "flex", alignItems: "center", gap: 4 }, children: [
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          "aria-label": "上一页",
          style: It(e <= 1),
          disabled: e <= 1,
          onClick: () => n(e - 1),
          children: "‹"
        }
      ),
      l.map(
        (s, c) => s === "..." ? /* @__PURE__ */ d("span", { style: vr, children: "···" }, `e-${c}`) : /* @__PURE__ */ d(
          "button",
          {
            type: "button",
            style: s === e ? Cr : Vt,
            onClick: () => n(s),
            children: s
          },
          s
        )
      ),
      /* @__PURE__ */ d(
        "button",
        {
          type: "button",
          "aria-label": "下一页",
          style: It(e >= r),
          disabled: e >= r,
          onClick: () => n(e + 1),
          children: "›"
        }
      )
    ] })
  ] });
}
function ar(e, o) {
  if (o <= 7) return Array.from({ length: o }, (r, n) => n + 1);
  const a = [1];
  e > 3 && a.push("...");
  for (let r = Math.max(2, e - 1); r <= Math.min(o - 1, e + 1); r++)
    a.push(r);
  return e < o - 2 && a.push("..."), a.push(o), a;
}
const sr = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: i("text")
}, lr = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  gap: 12,
  marginBottom: 20
}, dr = {
  padding: "18px 20px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  background: i("bgSurface")
}, cr = {
  fontSize: 12,
  color: i("textSecondary"),
  fontWeight: 500,
  letterSpacing: "0.02em"
}, ur = {
  fontSize: 26,
  fontWeight: 700,
  marginTop: 8,
  letterSpacing: "-0.02em"
}, fr = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  background: i("bgSurface"),
  padding: "20px 20px 8px"
}, gr = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  marginBottom: 16,
  flexWrap: "wrap"
}, hr = {
  padding: "8px 12px",
  minWidth: 140,
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  fontSize: 13,
  outline: "none"
}, pr = {
  padding: "8px 12px",
  width: 200,
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  fontSize: 13,
  outline: "none"
}, Fe = {
  color: i("textTertiary"),
  textAlign: "center",
  padding: "40px 0",
  fontSize: 14
}, yr = {
  overflowX: "auto",
  margin: "0 -20px"
}, mr = {
  width: "100%",
  borderCollapse: "collapse"
}, O = {
  textAlign: "left",
  padding: "10px 16px",
  borderTop: `1px solid ${i("glassBorder")}`,
  borderBottom: `1px solid ${i("glassBorder")}`,
  background: i("bg"),
  color: i("textSecondary"),
  fontWeight: 600,
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.04em",
  whiteSpace: "nowrap"
}, j = {
  padding: "12px 16px",
  borderBottom: `1px solid ${i("glassBorder")}`,
  fontSize: 13,
  color: i("text"),
  whiteSpace: "nowrap"
}, br = {
  fontSize: 12,
  fontFamily: i("fontMono"),
  color: i("textSecondary")
}, Sr = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "14px 4px 6px",
  flexWrap: "wrap",
  gap: 12
}, xr = {
  fontSize: 12,
  color: i("textTertiary"),
  fontFamily: i("fontMono")
}, wr = {
  fontSize: 12,
  color: i("textSecondary"),
  background: "transparent",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: 6,
  padding: "2px 8px",
  cursor: "pointer",
  outline: "none"
}, Vt = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 32,
  height: 32,
  borderRadius: 6,
  border: "none",
  background: "transparent",
  color: i("textSecondary"),
  fontSize: 12,
  fontWeight: 500,
  cursor: "pointer",
  transition: i("transition")
}, Cr = {
  ...Vt,
  background: i("primary"),
  color: i("textInverse"),
  fontWeight: 600
};
function It(e) {
  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 32,
    height: 32,
    borderRadius: 6,
    border: "none",
    background: "transparent",
    color: i("textSecondary"),
    fontSize: 18,
    lineHeight: 1,
    cursor: e ? "not-allowed" : "pointer",
    opacity: e ? 0.3 : 1,
    transition: i("transition")
  };
}
const vr = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  width: 28,
  color: i("textTertiary"),
  fontSize: 12
};
let Br = 0;
function Er() {
  const [e, o] = L([]), a = _t(o);
  a.current = o;
  const r = Z((s) => {
    a.current((c) => c.filter((f) => f.id !== s));
  }, []), n = Z((s, c) => {
    const f = Br++;
    a.current((h) => [...h, { id: f, type: s, text: c }]), setTimeout(() => r(f), 4e3);
  }, [r]), t = Z((s) => n("success", s), [n]), l = Z((s) => n("error", s), [n]);
  return {
    toast: { success: t, error: l },
    Toaster: /* @__PURE__ */ d(Tr, { messages: e, onClose: r })
  };
}
function Tr({
  messages: e,
  onClose: o
}) {
  return H(() => {
    const a = "airgate-epay-toast-keyframes";
    if (document.getElementById(a)) return;
    const r = document.createElement("style");
    r.id = a, r.textContent = `
@keyframes airgate-epay-toast-in {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
}`, document.head.appendChild(r);
  }, []), e.length === 0 ? null : /* @__PURE__ */ d("div", { style: Mr, children: e.map((a) => /* @__PURE__ */ d(kr, { message: a, onClose: () => o(a.id) }, a.id)) });
}
function kr({
  message: e,
  onClose: o
}) {
  const a = e.type === "success", r = i(a ? "success" : "danger"), n = i(a ? "success" : "danger");
  return /* @__PURE__ */ b(
    "div",
    {
      style: {
        ...Ir,
        borderColor: n
      },
      children: [
        /* @__PURE__ */ d("span", { style: { ...Rr, color: r }, children: a ? "✓" : "✕" }),
        /* @__PURE__ */ d("span", { style: { ...Ar, color: i("text") }, children: e.text }),
        /* @__PURE__ */ d("button", { onClick: o, style: Pr, "aria-label": "关闭", children: "×" })
      ]
    }
  );
}
const Mr = {
  position: "fixed",
  top: 20,
  right: 20,
  zIndex: 1e4,
  display: "flex",
  flexDirection: "column",
  gap: 10,
  pointerEvents: "none"
}, Ir = {
  pointerEvents: "auto",
  display: "flex",
  alignItems: "center",
  gap: 12,
  minWidth: 260,
  maxWidth: 400,
  padding: "12px 14px",
  borderRadius: i("radiusLg"),
  border: "1px solid",
  background: i("bgElevated"),
  boxShadow: "0 8px 24px rgba(0,0,0,0.18)",
  animation: "airgate-epay-toast-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)"
}, Rr = {
  fontSize: 16,
  fontWeight: 700,
  width: 18,
  textAlign: "center",
  flexShrink: 0
}, Ar = {
  flex: 1,
  fontSize: 13,
  lineHeight: 1.4
}, Pr = {
  flexShrink: 0,
  background: "transparent",
  border: "none",
  color: i("textTertiary"),
  fontSize: 18,
  lineHeight: 1,
  cursor: "pointer",
  padding: 0,
  width: 18,
  height: 18
};
function _r() {
  const [e, o] = L([]), [a, r] = L([]), [n, t] = L(!0), [l, s] = L(null), [c, f] = L(null), { toast: h, Toaster: g } = Er(), p = Z(() => {
    t(!0), s(null), q.adminListProviders().then((u) => {
      o(u.providers || []), r(u.kinds || []);
    }).catch((u) => s(String((u == null ? void 0 : u.message) || u))).finally(() => t(!1));
  }, []);
  H(p, [p]);
  const S = (u) => {
    f({
      mode: "create",
      id: "",
      kind: u.kind,
      enabled: !0,
      config: zr(u)
    });
  }, y = (u) => {
    f({
      mode: "edit",
      id: u.id,
      originalId: u.id,
      kind: u.kind,
      enabled: u.enabled,
      config: { ...u.config }
    });
  }, I = async (u) => {
    if (window.confirm(`确认删除服务商 ${u}？此操作无法撤销。`))
      try {
        await q.adminDeleteProvider(u), h.success(`已删除 ${u}`), p();
      } catch (v) {
        h.error("删除失败: " + v.message);
      }
  }, _ = async (u) => {
    try {
      await q.adminUpsertProvider({
        id: u.id,
        kind: u.kind,
        enabled: !u.enabled,
        config: u.config
      }), h.success(`${u.id} 已${u.enabled ? "禁用" : "启用"}`), p();
    } catch (v) {
      h.error("操作失败: " + v.message);
    }
  };
  return n ? /* @__PURE__ */ d("div", { style: Ue, children: /* @__PURE__ */ d("div", { style: Rt, children: "加载中..." }) }) : l ? /* @__PURE__ */ d("div", { style: Ue, children: /* @__PURE__ */ b("div", { style: { ...Rt, color: i("danger") }, children: [
    "加载失败: ",
    l
  ] }) }) : /* @__PURE__ */ b("div", { style: Ue, children: [
    g,
    /* @__PURE__ */ b("div", { style: Dr, children: [
      /* @__PURE__ */ d("h2", { style: Fr, children: "支付服务商" }),
      /* @__PURE__ */ d("button", { style: re, onClick: p, children: "刷新" })
    ] }),
    /* @__PURE__ */ b("div", { style: Pt, children: [
      /* @__PURE__ */ d("h3", { style: At, children: "添加服务商" }),
      /* @__PURE__ */ d("p", { style: qr, children: "每种类型的服务商可以创建多个实例（例如 xunhu_main / xunhu_backup），便于多商户号或主备切换。" }),
      /* @__PURE__ */ d("div", { style: Ur, children: a.map((u) => /* @__PURE__ */ b("div", { style: Wr, children: [
        /* @__PURE__ */ d("div", { style: { fontWeight: 600, color: i("text"), fontSize: 15 }, children: u.name }),
        /* @__PURE__ */ d("div", { style: { fontSize: 12, color: i("textSecondary"), marginTop: 6 }, children: u.description }),
        /* @__PURE__ */ b("div", { style: { fontSize: 12, color: i("textTertiary"), marginTop: 8 }, children: [
          "支持: ",
          u.supported_methods.map(Oe).join(" / ")
        ] }),
        /* @__PURE__ */ d("button", { style: { ...Jt, marginTop: 12, width: "100%" }, onClick: () => S(u), children: "+ 添加" })
      ] }, u.kind)) })
    ] }),
    /* @__PURE__ */ b("div", { style: Pt, children: [
      /* @__PURE__ */ d("h3", { style: At, children: "已配置的服务商实例" }),
      e.length === 0 ? /* @__PURE__ */ d("p", { style: Hr, children: "暂未配置任何服务商。请在上方点「+ 添加」选择类型。" }) : /* @__PURE__ */ d("div", { style: Or, children: e.map((u) => /* @__PURE__ */ b("div", { style: jr, children: [
        /* @__PURE__ */ b("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "flex-start" }, children: [
          /* @__PURE__ */ b("div", { children: [
            /* @__PURE__ */ d("div", { style: { fontWeight: 600, color: i("text"), fontSize: 15 }, children: u.name || u.id }),
            /* @__PURE__ */ b("div", { style: { fontSize: 12, color: i("textTertiary"), marginTop: 4, fontFamily: i("fontMono") }, children: [
              u.id,
              " · ",
              u.kind
            ] })
          ] }),
          /* @__PURE__ */ d("span", { style: u.is_running ? Kt : Vr, children: u.is_running ? "运行中" : u.enabled ? "已启用未就绪" : "已禁用" })
        ] }),
        /* @__PURE__ */ b("div", { style: { fontSize: 12, color: i("textSecondary"), marginTop: 12 }, children: [
          "支持: ",
          u.supported_methods.map(Oe).join(" / ")
        ] }),
        /* @__PURE__ */ b("div", { style: { display: "flex", gap: 8, marginTop: 16 }, children: [
          /* @__PURE__ */ d("button", { style: re, onClick: () => y(u), children: "编辑" }),
          /* @__PURE__ */ d("button", { style: re, onClick: () => _(u), children: u.enabled ? "禁用" : "启用" }),
          /* @__PURE__ */ d("button", { style: { ...re, color: i("danger") }, onClick: () => I(u.id), children: "删除" })
        ] })
      ] }, u.id)) })
    ] }),
    c && /* @__PURE__ */ d(
      Lr,
      {
        editing: c,
        kinds: a,
        onCancel: () => f(null),
        onSaved: (u) => {
          f(null), h.success(u), p();
        },
        onError: (u) => h.error(u)
      }
    )
  ] });
}
function Lr({
  editing: e,
  kinds: o,
  onCancel: a,
  onSaved: r,
  onError: n
}) {
  const [t, l] = L(e), [s, c] = L(!1), f = Xt(() => o.find((g) => g.kind === t.kind), [o, t.kind]), h = async () => {
    if (!f) {
      n("未知的服务商类型");
      return;
    }
    for (const g of f.field_descriptors)
      if (g.required && !t.config[g.key]) {
        n(`「${g.label}」必填`);
        return;
      }
    if (!(t.mode === "edit" && t.originalId && t.id.trim() !== t.originalId && !window.confirm(
      `确认将实例 ID 从「${t.originalId}」重命名为「${t.id.trim()}」？

所有历史订单的 provider_id 引用会在事务里同步更新；如果该商户号在第三方支付平台已经下过单，
已发出去的回调地址（含原 ID）会失效——平台未来回调请求会路由不到本服务。`
    ))) {
      c(!0);
      try {
        const p = (await q.adminUpsertProvider({
          id: t.id.trim(),
          original_id: t.originalId,
          kind: t.kind,
          enabled: t.enabled,
          config: t.config
        })).id || t.id.trim();
        r(t.mode === "create" ? `已创建 ${p}` : `已更新 ${p}`);
      } catch (g) {
        n("保存失败: " + g.message);
      } finally {
        c(!1);
      }
    }
  };
  return /* @__PURE__ */ d("div", { style: Gr, onClick: a, children: /* @__PURE__ */ b("div", { style: Yr, onClick: (g) => g.stopPropagation(), children: [
    /* @__PURE__ */ b("div", { style: $r, children: [
      /* @__PURE__ */ b("h3", { style: { margin: 0, fontSize: 16, fontWeight: 600 }, children: [
        t.mode === "create" ? "添加" : "编辑",
        "服务商 - ",
        (f == null ? void 0 : f.name) || t.kind
      ] }),
      /* @__PURE__ */ d("button", { style: Qr, onClick: a, children: "×" })
    ] }),
    /* @__PURE__ */ b("div", { style: Xr, children: [
      /* @__PURE__ */ d(
        qe,
        {
          label: "实例 ID",
          description: t.mode === "edit" ? "可修改。改名时后端会在事务里同步更新所有历史订单的 provider_id 引用，回调路径也会立即指向新名字。" : "可选。留空则自动生成 epay_xunhu_1 之类的序号；也可以填一个有意义的名字如 xunhu_main / xunhu_backup 便于多商户号区分。",
          children: /* @__PURE__ */ d(
            "input",
            {
              type: "text",
              value: t.id,
              onChange: (g) => l({ ...t, id: g.target.value }),
              placeholder: t.mode === "create" ? "留空自动生成" : "",
              style: { ...We, fontFamily: i("fontMono"), fontSize: 12 }
            }
          )
        }
      ),
      /* @__PURE__ */ d(qe, { label: "启用", children: /* @__PURE__ */ b("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: [
        /* @__PURE__ */ d(
          "input",
          {
            type: "checkbox",
            checked: t.enabled,
            onChange: (g) => l({ ...t, enabled: g.target.checked })
          }
        ),
        /* @__PURE__ */ d("span", { style: { fontSize: 13, color: i("textSecondary") }, children: "勾选后该服务商参与支付路由" })
      ] }) }),
      f == null ? void 0 : f.field_descriptors.map((g) => /* @__PURE__ */ d(qe, { label: g.label, description: g.description, required: g.required, children: g.type === "textarea" ? /* @__PURE__ */ d(
        "textarea",
        {
          value: t.config[g.key] || "",
          onChange: (p) => l({ ...t, config: { ...t.config, [g.key]: p.target.value } }),
          placeholder: g.placeholder,
          style: { ...We, minHeight: 120, fontFamily: i("fontMono"), fontSize: 12 }
        }
      ) : g.type === "bool" ? /* @__PURE__ */ d("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, children: /* @__PURE__ */ d(
        "input",
        {
          type: "checkbox",
          checked: t.config[g.key] === "true",
          onChange: (p) => l({ ...t, config: { ...t.config, [g.key]: p.target.checked ? "true" : "false" } })
        }
      ) }) : g.type === "method-multi" ? /* @__PURE__ */ d(
        Nr,
        {
          candidates: f.supported_methods,
          value: t.config[g.key] || "",
          onChange: (p) => l({ ...t, config: { ...t.config, [g.key]: p } })
        }
      ) : /* @__PURE__ */ d(
        "input",
        {
          type: g.type === "password" ? "password" : g.type === "number" ? "number" : "text",
          value: t.config[g.key] || "",
          onChange: (p) => l({ ...t, config: { ...t.config, [g.key]: p.target.value } }),
          placeholder: g.placeholder,
          style: We
        }
      ) }, g.key))
    ] }),
    /* @__PURE__ */ b("div", { style: Zr, children: [
      /* @__PURE__ */ d("button", { style: re, onClick: a, disabled: s, children: "取消" }),
      /* @__PURE__ */ d("button", { style: Jt, onClick: h, disabled: s, children: s ? "保存中..." : "保存" })
    ] })
  ] }) });
}
function Nr({
  candidates: e,
  value: o,
  onChange: a
}) {
  const r = new Set(o.split(",").map((t) => t.trim()).filter(Boolean)), n = (t) => {
    r.has(t) ? r.delete(t) : r.add(t);
    const l = e.filter((s) => r.has(s)).join(",");
    a(l);
  };
  return /* @__PURE__ */ b("div", { style: { display: "flex", flexWrap: "wrap", gap: 12 }, children: [
    e.map((t) => {
      const l = r.has(t);
      return /* @__PURE__ */ b(
        "label",
        {
          style: {
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            border: `1px solid ${i(l ? "primary" : "glassBorder")}`,
            borderRadius: i("radiusMd"),
            background: i(l ? "primarySubtle" : "bg"),
            color: i(l ? "primary" : "text"),
            cursor: "pointer",
            fontSize: 13,
            fontWeight: l ? 600 : 400,
            transition: "all 0.15s"
          },
          children: [
            /* @__PURE__ */ d(
              "input",
              {
                type: "checkbox",
                checked: l,
                onChange: () => n(t),
                style: { margin: 0 }
              }
            ),
            Oe(t)
          ]
        },
        t
      );
    }),
    e.length === 0 && /* @__PURE__ */ d("span", { style: { fontSize: 12, color: i("textTertiary") }, children: "该协议没有可选的支付方式" })
  ] });
}
function qe({
  label: e,
  description: o,
  required: a,
  children: r
}) {
  return /* @__PURE__ */ b("div", { style: { marginBottom: 16 }, children: [
    /* @__PURE__ */ b("label", { style: Kr, children: [
      e,
      a && /* @__PURE__ */ d("span", { style: { color: i("danger"), marginLeft: 4 }, children: "*" })
    ] }),
    r,
    o && /* @__PURE__ */ d("div", { style: Jr, children: o })
  ] });
}
function Oe(e) {
  return { alipay: "支付宝", wxpay: "微信支付" }[e] || e;
}
function zr(e) {
  const o = {};
  for (const a of e.field_descriptors)
    a.type === "bool" ? o[a.key] = "false" : o[a.key] = "";
  return o;
}
const Ue = {
  maxWidth: 1280,
  margin: "0 auto",
  padding: "24px 24px 48px",
  color: i("text")
}, Dr = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 20
}, Fr = {
  margin: 0,
  fontSize: 22,
  fontWeight: 600,
  letterSpacing: "-0.01em"
}, Rt = {
  padding: "40px 0",
  textAlign: "center",
  color: i("textSecondary")
}, qr = {
  margin: "4px 0 16px",
  fontSize: 13,
  color: i("textSecondary")
}, At = {
  margin: "0 0 12px",
  fontSize: 14,
  fontWeight: 600,
  color: i("text"),
  textTransform: "uppercase",
  letterSpacing: "0.04em"
}, Pt = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  background: i("bgSurface"),
  padding: 20,
  marginBottom: 20
}, Ur = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
  gap: 12
}, Wr = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  padding: 16,
  background: i("bg")
}, Or = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: 12
}, jr = {
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  padding: 16,
  background: i("bg")
}, Hr = {
  color: i("textTertiary"),
  textAlign: "center",
  padding: "24px 0",
  fontSize: 14
}, Kt = {
  padding: "2px 8px",
  borderRadius: 4,
  background: i("successSubtle"),
  color: i("success"),
  fontSize: 11,
  fontWeight: 600
}, Vr = {
  ...Kt,
  background: i("warningSubtle"),
  color: i("warning")
}, re = {
  padding: "6px 14px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: "transparent",
  color: i("text"),
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 500
}, Jt = {
  padding: "8px 16px",
  border: "none",
  borderRadius: i("radiusMd"),
  background: i("primary"),
  color: "#fff",
  cursor: "pointer",
  fontSize: 13,
  fontWeight: 600
}, We = {
  width: "100%",
  padding: "8px 12px",
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusMd"),
  background: i("bg"),
  color: i("text"),
  fontSize: 13,
  boxSizing: "border-box"
}, Kr = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  color: i("textSecondary"),
  marginBottom: 6,
  textTransform: "uppercase",
  letterSpacing: "0.03em"
}, Jr = {
  marginTop: 6,
  fontSize: 11,
  color: i("textTertiary")
}, Gr = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: "rgba(0, 0, 0, 0.5)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1e3
}, Yr = {
  width: 600,
  maxWidth: "92vw",
  maxHeight: "90vh",
  display: "flex",
  flexDirection: "column",
  background: i("bgSurface"),
  border: `1px solid ${i("glassBorder")}`,
  borderRadius: i("radiusLg"),
  overflow: "hidden"
}, $r = {
  padding: "16px 20px",
  borderBottom: `1px solid ${i("glassBorder")}`,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between"
}, Qr = {
  background: "transparent",
  border: "none",
  color: i("textSecondary"),
  fontSize: 24,
  cursor: "pointer",
  lineHeight: 1
}, Xr = {
  padding: 20,
  overflowY: "auto",
  flex: 1
}, Zr = {
  padding: "12px 20px",
  borderTop: `1px solid ${i("glassBorder")}`,
  display: "flex",
  justifyContent: "flex-end",
  gap: 8
}, no = {
  routes: [
    { path: "/recharge", component: An },
    { path: "/orders", component: Wn },
    { path: "/admin/orders", component: er },
    { path: "/admin/providers", component: _r }
  ]
};
export {
  no as default
};

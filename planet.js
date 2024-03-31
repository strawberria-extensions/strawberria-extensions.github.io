(function() {
    /*

 Copyright The Closure Library Authors.
 SPDX-License-Identifier: Apache-2.0
*/
    var k, r;
    function aa(a) {
        var b = 0;
        return function() {
            return b < a.length ? {
                done: !1,
                value: a[b++]
            } : {
                done: !0
            }
        }
    }
    var ba = "function" == typeof Object.defineProperties ? Object.defineProperty : function(a, b, c) {
        if (a == Array.prototype || a == Object.prototype)
            return a;
        a[b] = c.value;
        return a
    }
    ;
    function ca(a) {
        a = ["object" == typeof globalThis && globalThis, a, "object" == typeof window && window, "object" == typeof self && self, "object" == typeof global && global];
        for (var b = 0; b < a.length; ++b) {
            var c = a[b];
            if (c && c.Math == Math)
                return c
        }
        throw Error("Cannot find global object");
    }
    var da = ca(this)
      , ea = "function" === typeof Symbol && "symbol" === typeof Symbol("x")
      , t = {}
      , fa = {};
    function v(a, b, c) {
        if (!c || null != a) {
            c = fa[b];
            if (null == c)
                return a[b];
            c = a[c];
            return void 0 !== c ? c : a[b]
        }
    }
    function w(a, b, c) {
        if (b)
            a: {
                var d = a.split(".");
                a = 1 === d.length;
                var e = d[0], f;
                !a && e in t ? f = t : f = da;
                for (e = 0; e < d.length - 1; e++) {
                    var g = d[e];
                    if (!(g in f))
                        break a;
                    f = f[g]
                }
                d = d[d.length - 1];
                c = ea && "es6" === c ? f[d] : null;
                b = b(c);
                null != b && (a ? ba(t, d, {
                    configurable: !0,
                    writable: !0,
                    value: b
                }) : b !== c && (void 0 === fa[d] && (a = 1E9 * Math.random() >>> 0,
                fa[d] = ea ? da.Symbol(d) : "$jscp$" + a + "$" + d),
                ba(f, fa[d], {
                    configurable: !0,
                    writable: !0,
                    value: b
                })))
            }
    }
    w("Symbol", function(a) {
        function b(f) {
            if (this instanceof b)
                throw new TypeError("Symbol is not a constructor");
            return new c(d + (f || "") + "_" + e++,f)
        }
        function c(f, g) {
            this.g = f;
            ba(this, "description", {
                configurable: !0,
                writable: !0,
                value: g
            })
        }
        if (a)
            return a;
        c.prototype.toString = function() {
            return this.g
        }
        ;
        var d = "jscomp_symbol_" + (1E9 * Math.random() >>> 0) + "_"
          , e = 0;
        return b
    }, "es6");
    w("Symbol.iterator", function(a) {
        if (a)
            return a;
        a = (0,
        t.Symbol)("Symbol.iterator");
        for (var b = "Array Int8Array Uint8Array Uint8ClampedArray Int16Array Uint16Array Int32Array Uint32Array Float32Array Float64Array".split(" "), c = 0; c < b.length; c++) {
            var d = da[b[c]];
            "function" === typeof d && "function" != typeof d.prototype[a] && ba(d.prototype, a, {
                configurable: !0,
                writable: !0,
                value: function() {
                    return ha(aa(this))
                }
            })
        }
        return a
    }, "es6");
    function ha(a) {
        a = {
            next: a
        };
        a[v(t.Symbol, "iterator")] = function() {
            return this
        }
        ;
        return a
    }
    function y(a) {
        var b = "undefined" != typeof t.Symbol && v(t.Symbol, "iterator") && a[v(t.Symbol, "iterator")];
        if (b)
            return b.call(a);
        if ("number" == typeof a.length)
            return {
                next: aa(a)
            };
        throw Error(String(a) + " is not an iterable or ArrayLike");
    }
    var ka = "function" == typeof Object.create ? Object.create : function(a) {
        function b() {}
        b.prototype = a;
        return new b
    }
    , la;
    if (ea && "function" == typeof Object.setPrototypeOf)
        la = Object.setPrototypeOf;
    else {
        var ma;
        a: {
            var na = {
                a: !0
            }
              , oa = {};
            try {
                oa.__proto__ = na;
                ma = oa.a;
                break a
            } catch (a) {}
            ma = !1
        }
        la = ma ? function(a, b) {
            a.__proto__ = b;
            if (a.__proto__ !== b)
                throw new TypeError(a + " is not extensible");
            return a
        }
        : null
    }
    var pa = la;
    function z(a, b) {
        a.prototype = ka(b.prototype);
        a.prototype.constructor = a;
        if (pa)
            pa(a, b);
        else
            for (var c in b)
                if ("prototype" != c)
                    if (Object.defineProperties) {
                        var d = Object.getOwnPropertyDescriptor(b, c);
                        d && Object.defineProperty(a, c, d)
                    } else
                        a[c] = b[c];
        a.M = b.prototype
    }
    function qa() {
        for (var a = Number(this), b = [], c = a; c < arguments.length; c++)
            b[c - a] = arguments[c];
        return b
    }
    w("Promise", function(a) {
        function b(g) {
            this.g = 0;
            this.i = void 0;
            this.h = [];
            this.u = !1;
            var h = this.j();
            try {
                g(h.resolve, h.reject)
            } catch (l) {
                h.reject(l)
            }
        }
        function c() {
            this.g = null
        }
        function d(g) {
            return g instanceof b ? g : new b(function(h) {
                h(g)
            }
            )
        }
        if (a)
            return a;
        c.prototype.h = function(g) {
            if (null == this.g) {
                this.g = [];
                var h = this;
                this.i(function() {
                    h.l()
                })
            }
            this.g.push(g)
        }
        ;
        var e = da.setTimeout;
        c.prototype.i = function(g) {
            e(g, 0)
        }
        ;
        c.prototype.l = function() {
            for (; this.g && this.g.length; ) {
                var g = this.g;
                this.g = [];
                for (var h = 0; h < g.length; ++h) {
                    var l = g[h];
                    g[h] = null;
                    try {
                        l()
                    } catch (m) {
                        this.j(m)
                    }
                }
            }
            this.g = null
        }
        ;
        c.prototype.j = function(g) {
            this.i(function() {
                throw g;
            })
        }
        ;
        b.prototype.j = function() {
            function g(m) {
                return function(n) {
                    l || (l = !0,
                    m.call(h, n))
                }
            }
            var h = this
              , l = !1;
            return {
                resolve: g(this.N),
                reject: g(this.l)
            }
        }
        ;
        b.prototype.N = function(g) {
            if (g === this)
                this.l(new TypeError("A Promise cannot resolve to itself"));
            else if (g instanceof b)
                this.ga(g);
            else {
                a: switch (typeof g) {
                case "object":
                    var h = null != g;
                    break a;
                case "function":
                    h = !0;
                    break a;
                default:
                    h = !1
                }
                h ? this.V(g) : this.m(g)
            }
        }
        ;
        b.prototype.V = function(g) {
            var h = void 0;
            try {
                h = g.then
            } catch (l) {
                this.l(l);
                return
            }
            "function" == typeof h ? this.ha(h, g) : this.m(g)
        }
        ;
        b.prototype.l = function(g) {
            this.v(2, g)
        }
        ;
        b.prototype.m = function(g) {
            this.v(1, g)
        }
        ;
        b.prototype.v = function(g, h) {
            if (0 != this.g)
                throw Error("Cannot settle(" + g + ", " + h + "): Promise already settled in state" + this.g);
            this.g = g;
            this.i = h;
            2 === this.g && this.T();
            this.F()
        }
        ;
        b.prototype.T = function() {
            var g = this;
            e(function() {
                if (g.K()) {
                    var h = da.console;
                    "undefined" !== typeof h && h.error(g.i)
                }
            }, 1)
        }
        ;
        b.prototype.K = function() {
            if (this.u)
                return !1;
            var g = da.CustomEvent
              , h = da.Event
              , l = da.dispatchEvent;
            if ("undefined" === typeof l)
                return !0;
            "function" === typeof g ? g = new g("unhandledrejection",{
                cancelable: !0
            }) : "function" === typeof h ? g = new h("unhandledrejection",{
                cancelable: !0
            }) : (g = da.document.createEvent("CustomEvent"),
            g.initCustomEvent("unhandledrejection", !1, !0, g));
            g.promise = this;
            g.reason = this.i;
            return l(g)
        }
        ;
        b.prototype.F = function() {
            if (null != this.h) {
                for (var g = 0; g < this.h.length; ++g)
                    f.h(this.h[g]);
                this.h = null
            }
        }
        ;
        var f = new c;
        b.prototype.ga = function(g) {
            var h = this.j();
            g.ue(h.resolve, h.reject)
        }
        ;
        b.prototype.ha = function(g, h) {
            var l = this.j();
            try {
                g.call(h, l.resolve, l.reject)
            } catch (m) {
                l.reject(m)
            }
        }
        ;
        b.prototype.then = function(g, h) {
            function l(p, u) {
                return "function" == typeof p ? function(x) {
                    try {
                        m(p(x))
                    } catch (B) {
                        n(B)
                    }
                }
                : u
            }
            var m, n, q = new b(function(p, u) {
                m = p;
                n = u
            }
            );
            this.ue(l(g, m), l(h, n));
            return q
        }
        ;
        b.prototype.catch = function(g) {
            return this.then(void 0, g)
        }
        ;
        b.prototype.ue = function(g, h) {
            function l() {
                switch (m.g) {
                case 1:
                    g(m.i);
                    break;
                case 2:
                    h(m.i);
                    break;
                default:
                    throw Error("Unexpected state: " + m.g);
                }
            }
            var m = this;
            null == this.h ? f.h(l) : this.h.push(l);
            this.u = !0
        }
        ;
        b.resolve = d;
        b.reject = function(g) {
            return new b(function(h, l) {
                l(g)
            }
            )
        }
        ;
        b.race = function(g) {
            return new b(function(h, l) {
                for (var m = y(g), n = m.next(); !n.done; n = m.next())
                    d(n.value).ue(h, l)
            }
            )
        }
        ;
        b.all = function(g) {
            var h = y(g)
              , l = h.next();
            return l.done ? d([]) : new b(function(m, n) {
                function q(x) {
                    return function(B) {
                        p[x] = B;
                        u--;
                        0 == u && m(p)
                    }
                }
                var p = []
                  , u = 0;
                do
                    p.push(void 0),
                    u++,
                    d(l.value).ue(q(p.length - 1), n),
                    l = h.next();
                while (!l.done)
            }
            )
        }
        ;
        return b
    }, "es6");
    function ta(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b)
    }
    w("WeakMap", function(a) {
        function b(g) {
            this.g = (f += Math.random() + 1).toString();
            if (g) {
                g = y(g);
                for (var h; !(h = g.next()).done; )
                    h = h.value,
                    this.set(h[0], h[1])
            }
        }
        function c() {}
        function d(g) {
            var h = typeof g;
            return "object" === h && null !== g || "function" === h
        }
        if (function() {
            if (!a || !Object.seal)
                return !1;
            try {
                var g = Object.seal({})
                  , h = Object.seal({})
                  , l = new a([[g, 2], [h, 3]]);
                if (2 != l.get(g) || 3 != l.get(h))
                    return !1;
                l.delete(g);
                l.set(h, 4);
                return !l.has(g) && 4 == l.get(h)
            } catch (m) {
                return !1
            }
        }())
            return a;
        var e = "$jscomp_hidden_" + Math.random()
          , f = 0;
        b.prototype.set = function(g, h) {
            if (!d(g))
                throw Error("Invalid WeakMap key");
            if (!ta(g, e)) {
                var l = new c;
                ba(g, e, {
                    value: l
                })
            }
            if (!ta(g, e))
                throw Error("WeakMap key fail: " + g);
            g[e][this.g] = h;
            return this
        }
        ;
        b.prototype.get = function(g) {
            return d(g) && ta(g, e) ? g[e][this.g] : void 0
        }
        ;
        b.prototype.has = function(g) {
            return d(g) && ta(g, e) && ta(g[e], this.g)
        }
        ;
        b.prototype.delete = function(g) {
            return d(g) && ta(g, e) && ta(g[e], this.g) ? delete g[e][this.g] : !1
        }
        ;
        return b
    }, "es6");
    w("Map", function(a) {
        function b() {
            var h = {};
            return h.bc = h.next = h.head = h
        }
        function c(h, l) {
            var m = h[1];
            return ha(function() {
                if (m) {
                    for (; m.head != h[1]; )
                        m = m.bc;
                    for (; m.next != m.head; )
                        return m = m.next,
                        {
                            done: !1,
                            value: l(m)
                        };
                    m = null
                }
                return {
                    done: !0,
                    value: void 0
                }
            })
        }
        function d(h, l) {
            var m = l && typeof l;
            "object" == m || "function" == m ? f.has(l) ? m = f.get(l) : (m = "" + ++g,
            f.set(l, m)) : m = "p_" + l;
            var n = h[0][m];
            if (n && ta(h[0], m))
                for (h = 0; h < n.length; h++) {
                    var q = n[h];
                    if (l !== l && q.key !== q.key || l === q.key)
                        return {
                            id: m,
                            list: n,
                            index: h,
                            Ua: q
                        }
                }
            return {
                id: m,
                list: n,
                index: -1,
                Ua: void 0
            }
        }
        function e(h) {
            this[0] = {};
            this[1] = b();
            this.size = 0;
            if (h) {
                h = y(h);
                for (var l; !(l = h.next()).done; )
                    l = l.value,
                    this.set(l[0], l[1])
            }
        }
        if (function() {
            if (!a || "function" != typeof a || !v(a.prototype, "entries") || "function" != typeof Object.seal)
                return !1;
            try {
                var h = Object.seal({
                    x: 4
                })
                  , l = new a(y([[h, "s"]]));
                if ("s" != l.get(h) || 1 != l.size || l.get({
                    x: 4
                }) || l.set({
                    x: 4
                }, "t") != l || 2 != l.size)
                    return !1;
                var m = v(l, "entries").call(l)
                  , n = m.next();
                if (n.done || n.value[0] != h || "s" != n.value[1])
                    return !1;
                n = m.next();
                return n.done || 4 != n.value[0].x || "t" != n.value[1] || !m.next().done ? !1 : !0
            } catch (q) {
                return !1
            }
        }())
            return a;
        var f = new t.WeakMap;
        e.prototype.set = function(h, l) {
            h = 0 === h ? 0 : h;
            var m = d(this, h);
            m.list || (m.list = this[0][m.id] = []);
            m.Ua ? m.Ua.value = l : (m.Ua = {
                next: this[1],
                bc: this[1].bc,
                head: this[1],
                key: h,
                value: l
            },
            m.list.push(m.Ua),
            this[1].bc.next = m.Ua,
            this[1].bc = m.Ua,
            this.size++);
            return this
        }
        ;
        e.prototype.delete = function(h) {
            h = d(this, h);
            return h.Ua && h.list ? (h.list.splice(h.index, 1),
            h.list.length || delete this[0][h.id],
            h.Ua.bc.next = h.Ua.next,
            h.Ua.next.bc = h.Ua.bc,
            h.Ua.head = null,
            this.size--,
            !0) : !1
        }
        ;
        e.prototype.clear = function() {
            this[0] = {};
            this[1] = this[1].bc = b();
            this.size = 0
        }
        ;
        e.prototype.has = function(h) {
            return !!d(this, h).Ua
        }
        ;
        e.prototype.get = function(h) {
            return (h = d(this, h).Ua) && h.value
        }
        ;
        e.prototype.entries = function() {
            return c(this, function(h) {
                return [h.key, h.value]
            })
        }
        ;
        e.prototype.keys = function() {
            return c(this, function(h) {
                return h.key
            })
        }
        ;
        e.prototype.values = function() {
            return c(this, function(h) {
                return h.value
            })
        }
        ;
        e.prototype.forEach = function(h, l) {
            for (var m = v(this, "entries").call(this), n; !(n = m.next()).done; )
                n = n.value,
                h.call(l, n[1], n[0], this)
        }
        ;
        e.prototype[v(t.Symbol, "iterator")] = v(e.prototype, "entries");
        var g = 0;
        return e
    }, "es6");
    w("Array.prototype.find", function(a) {
        return a ? a : function(b, c) {
            a: {
                var d = this;
                d instanceof String && (d = String(d));
                for (var e = d.length, f = 0; f < e; f++) {
                    var g = d[f];
                    if (b.call(c, g, f, d)) {
                        b = g;
                        break a
                    }
                }
                b = void 0
            }
            return b
        }
    }, "es6");
    function ua(a, b, c) {
        if (null == a)
            throw new TypeError("The 'this' value for String.prototype." + c + " must not be null or undefined");
        if (b instanceof RegExp)
            throw new TypeError("First argument to String.prototype." + c + " must not be a regular expression");
        return a + ""
    }
    w("String.prototype.endsWith", function(a) {
        return a ? a : function(b, c) {
            var d = ua(this, b, "endsWith");
            void 0 === c && (c = d.length);
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var e = b.length; 0 < e && 0 < c; )
                if (d[--c] != b[--e])
                    return !1;
            return 0 >= e
        }
    }, "es6");
    w("String.prototype.startsWith", function(a) {
        return a ? a : function(b, c) {
            var d = ua(this, b, "startsWith")
              , e = d.length
              , f = b.length;
            c = Math.max(0, Math.min(c | 0, d.length));
            for (var g = 0; g < f && c < e; )
                if (d[c++] != b[g++])
                    return !1;
            return g >= f
        }
    }, "es6");
    w("String.prototype.repeat", function(a) {
        return a ? a : function(b) {
            var c = ua(this, null, "repeat");
            if (0 > b || 1342177279 < b)
                throw new RangeError("Invalid count value");
            b |= 0;
            for (var d = ""; b; )
                if (b & 1 && (d += c),
                b >>>= 1)
                    c += c;
            return d
        }
    }, "es6");
    w("Number.MAX_SAFE_INTEGER", function() {
        return 9007199254740991
    }, "es6");
    w("String.prototype.padStart", function(a) {
        return a ? a : function(b, c) {
            var d = ua(this, null, "padStart");
            b -= d.length;
            c = void 0 !== c ? String(c) : " ";
            return (0 < b && c ? v(c, "repeat").call(c, Math.ceil(b / c.length)).substring(0, b) : "") + d
        }
    }, "es8");
    function va(a, b) {
        a instanceof String && (a += "");
        var c = 0
          , d = !1
          , e = {
            next: function() {
                if (!d && c < a.length) {
                    var f = c++;
                    return {
                        value: b(f, a[f]),
                        done: !1
                    }
                }
                d = !0;
                return {
                    done: !0,
                    value: void 0
                }
            }
        };
        e[v(t.Symbol, "iterator")] = function() {
            return e
        }
        ;
        return e
    }
    w("Array.prototype.values", function(a) {
        return a ? a : function() {
            return va(this, function(b, c) {
                return c
            })
        }
    }, "es8");
    w("Array.prototype.keys", function(a) {
        return a ? a : function() {
            return va(this, function(b) {
                return b
            })
        }
    }, "es6");
    w("Array.prototype.entries", function(a) {
        return a ? a : function() {
            return va(this, function(b, c) {
                return [b, c]
            })
        }
    }, "es6");
    w("Array.from", function(a) {
        return a ? a : function(b, c, d) {
            c = null != c ? c : function(h) {
                return h
            }
            ;
            var e = []
              , f = "undefined" != typeof t.Symbol && v(t.Symbol, "iterator") && b[v(t.Symbol, "iterator")];
            if ("function" == typeof f) {
                b = f.call(b);
                for (var g = 0; !(f = b.next()).done; )
                    e.push(c.call(d, f.value, g++))
            } else
                for (f = b.length,
                g = 0; g < f; g++)
                    e.push(c.call(d, b[g], g));
            return e
        }
    }, "es6");
    w("Object.is", function(a) {
        return a ? a : function(b, c) {
            return b === c ? 0 !== b || 1 / b === 1 / c : b !== b && c !== c
        }
    }, "es6");
    w("Array.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            var d = this;
            d instanceof String && (d = String(d));
            var e = d.length;
            c = c || 0;
            for (0 > c && (c = Math.max(c + e, 0)); c < e; c++) {
                var f = d[c];
                if (f === b || v(Object, "is").call(Object, f, b))
                    return !0
            }
            return !1
        }
    }, "es7");
    w("String.prototype.includes", function(a) {
        return a ? a : function(b, c) {
            return -1 !== ua(this, b, "includes").indexOf(b, c || 0)
        }
    }, "es6");
    var wa = ea && "function" == typeof v(Object, "assign") ? v(Object, "assign") : function(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (d)
                for (var e in d)
                    ta(d, e) && (a[e] = d[e])
        }
        return a
    }
    ;
    w("Object.assign", function(a) {
        return a || wa
    }, "es6");
    w("Object.entries", function(a) {
        return a ? a : function(b) {
            var c = [], d;
            for (d in b)
                ta(b, d) && c.push([d, b[d]]);
            return c
        }
    }, "es8");
    w("Set", function(a) {
        function b(c) {
            this.g = new t.Map;
            if (c) {
                c = y(c);
                for (var d; !(d = c.next()).done; )
                    this.add(d.value)
            }
            this.size = this.g.size
        }
        if (function() {
            if (!a || "function" != typeof a || !v(a.prototype, "entries") || "function" != typeof Object.seal)
                return !1;
            try {
                var c = Object.seal({
                    x: 4
                })
                  , d = new a(y([c]));
                if (!d.has(c) || 1 != d.size || d.add(c) != d || 1 != d.size || d.add({
                    x: 4
                }) != d || 2 != d.size)
                    return !1;
                var e = v(d, "entries").call(d)
                  , f = e.next();
                if (f.done || f.value[0] != c || f.value[1] != c)
                    return !1;
                f = e.next();
                return f.done || f.value[0] == c || 4 != f.value[0].x || f.value[1] != f.value[0] ? !1 : e.next().done
            } catch (g) {
                return !1
            }
        }())
            return a;
        b.prototype.add = function(c) {
            c = 0 === c ? 0 : c;
            this.g.set(c, c);
            this.size = this.g.size;
            return this
        }
        ;
        b.prototype.delete = function(c) {
            c = this.g.delete(c);
            this.size = this.g.size;
            return c
        }
        ;
        b.prototype.clear = function() {
            this.g.clear();
            this.size = 0
        }
        ;
        b.prototype.has = function(c) {
            return this.g.has(c)
        }
        ;
        b.prototype.entries = function() {
            return v(this.g, "entries").call(this.g)
        }
        ;
        b.prototype.values = function() {
            return v(this.g, "values").call(this.g)
        }
        ;
        b.prototype.keys = v(b.prototype, "values");
        b.prototype[v(t.Symbol, "iterator")] = v(b.prototype, "values");
        b.prototype.forEach = function(c, d) {
            var e = this;
            this.g.forEach(function(f) {
                return c.call(d, f, f, e)
            })
        }
        ;
        return b
    }, "es6");
    w("Promise.allSettled", function(a) {
        function b(d) {
            return {
                status: "fulfilled",
                value: d
            }
        }
        function c(d) {
            return {
                status: "rejected",
                reason: d
            }
        }
        return a ? a : function(d) {
            var e = this;
            d = v(Array, "from").call(Array, d, function(f) {
                return e.resolve(f).then(b, c)
            });
            return e.all(d)
        }
    }, "es_2020");
    w("Promise.prototype.finally", function(a) {
        return a ? a : function(b) {
            return this.then(function(c) {
                return t.Promise.resolve(b()).then(function() {
                    return c
                })
            }, function(c) {
                return t.Promise.resolve(b()).then(function() {
                    throw c;
                })
            })
        }
    }, "es9");
    w("Array.prototype.fill", function(a) {
        return a ? a : function(b, c, d) {
            var e = this.length || 0;
            0 > c && (c = Math.max(0, e + c));
            if (null == d || d > e)
                d = e;
            d = Number(d);
            0 > d && (d = Math.max(0, e + d));
            for (c = Number(c || 0); c < d; c++)
                this[c] = b;
            return this
        }
    }, "es6");
    function xa(a) {
        return a ? a : v(Array.prototype, "fill")
    }
    w("Int8Array.prototype.fill", xa, "es6");
    w("Uint8Array.prototype.fill", xa, "es6");
    w("Uint8ClampedArray.prototype.fill", xa, "es6");
    w("Int16Array.prototype.fill", xa, "es6");
    w("Uint16Array.prototype.fill", xa, "es6");
    w("Int32Array.prototype.fill", xa, "es6");
    w("Uint32Array.prototype.fill", xa, "es6");
    w("Float32Array.prototype.fill", xa, "es6");
    w("Float64Array.prototype.fill", xa, "es6");
    w("Number.isNaN", function(a) {
        return a ? a : function(b) {
            return "number" === typeof b && isNaN(b)
        }
    }, "es6");
    var ya = ya || {}
      , A = this || self;
    function za(a, b) {
        a = a.split(".");
        b = b || A;
        for (var c = 0; c < a.length; c++)
            if (b = b[a[c]],
            null == b)
                return null;
        return b
    }
    function Aa(a) {
        a.Jf = void 0;
        a.Ra = function() {
            return a.Jf ? a.Jf : a.Jf = new a
        }
    }
    function Ba(a) {
        var b = typeof a;
        return "object" != b ? b : a ? Array.isArray(a) ? "array" : b : "null"
    }
    function Ca(a) {
        var b = Ba(a);
        return "array" == b || "object" == b && "number" == typeof a.length
    }
    function Da(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b
    }
    function Ea(a) {
        return Object.prototype.hasOwnProperty.call(a, Fa) && a[Fa] || (a[Fa] = ++Ga)
    }
    var Fa = "closure_uid_" + (1E9 * Math.random() >>> 0)
      , Ga = 0;
    function Ha(a, b, c) {
        return a.call.apply(a.bind, arguments)
    }
    function Ia(a, b, c) {
        if (!a)
            throw Error();
        if (2 < arguments.length) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                var e = Array.prototype.slice.call(arguments);
                Array.prototype.unshift.apply(e, d);
                return a.apply(b, e)
            }
        }
        return function() {
            return a.apply(b, arguments)
        }
    }
    function Ja(a, b, c) {
        Ja = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? Ha : Ia;
        return Ja.apply(null, arguments)
    }
    function Ka(a, b) {
        var c = Array.prototype.slice.call(arguments, 1);
        return function() {
            var d = c.slice();
            d.push.apply(d, arguments);
            return a.apply(this, d)
        }
    }
    function La() {
        return Date.now()
    }
    function C(a, b) {
        a = a.split(".");
        var c = A;
        a[0]in c || "undefined" == typeof c.execScript || c.execScript("var " + a[0]);
        for (var d; a.length && (d = a.shift()); )
            a.length || void 0 === b ? c[d] && c[d] !== Object.prototype[d] ? c = c[d] : c = c[d] = {} : c[d] = b
    }
    function D(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.M = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.Ak = function(d, e, f) {
            for (var g = Array(arguments.length - 2), h = 2; h < arguments.length; h++)
                g[h - 2] = arguments[h];
            return b.prototype[e].apply(d, g)
        }
    }
    function Ma(a) {
        return a
    }
    ;function Na(a, b) {
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, Na);
        else {
            var c = Error().stack;
            c && (this.stack = c)
        }
        a && (this.message = String(a));
        void 0 !== b && (this.cause = b)
    }
    D(Na, Error);
    Na.prototype.name = "CustomError";
    var Oa;
    function Pa(a, b) {
        a = a.split("%s");
        for (var c = "", d = a.length - 1, e = 0; e < d; e++)
            c += a[e] + (e < b.length ? b[e] : "%s");
        Na.call(this, c + a[d])
    }
    D(Pa, Na);
    Pa.prototype.name = "AssertionError";
    var Qa = Array.prototype.indexOf ? function(a, b, c) {
        return Array.prototype.indexOf.call(a, b, c)
    }
    : function(a, b, c) {
        c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
        if ("string" === typeof a)
            return "string" !== typeof b || 1 != b.length ? -1 : a.indexOf(b, c);
        for (; c < a.length; c++)
            if (c in a && a[c] === b)
                return c;
        return -1
    }
      , Ra = Array.prototype.forEach ? function(a, b, c) {
        Array.prototype.forEach.call(a, b, c)
    }
    : function(a, b, c) {
        for (var d = a.length, e = "string" === typeof a ? a.split("") : a, f = 0; f < d; f++)
            f in e && b.call(c, e[f], f, a)
    }
      , Sa = Array.prototype.filter ? function(a, b) {
        return Array.prototype.filter.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = [], e = 0, f = "string" === typeof a ? a.split("") : a, g = 0; g < c; g++)
            if (g in f) {
                var h = f[g];
                b.call(void 0, h, g, a) && (d[e++] = h)
            }
        return d
    }
      , Ta = Array.prototype.map ? function(a, b) {
        return Array.prototype.map.call(a, b, void 0)
    }
    : function(a, b) {
        for (var c = a.length, d = Array(c), e = "string" === typeof a ? a.split("") : a, f = 0; f < c; f++)
            f in e && (d[f] = b.call(void 0, e[f], f, a));
        return d
    }
    ;
    function Ua(a, b) {
        a: {
            for (var c = a.length, d = "string" === typeof a ? a.split("") : a, e = 0; e < c; e++)
                if (e in d && b.call(void 0, d[e], e, a)) {
                    b = e;
                    break a
                }
            b = -1
        }
        return 0 > b ? null : "string" === typeof a ? a.charAt(b) : a[b]
    }
    function Va(a, b) {
        return 0 <= Qa(a, b)
    }
    function Wa(a, b) {
        b = Qa(a, b);
        var c;
        (c = 0 <= b) && Array.prototype.splice.call(a, b, 1);
        return c
    }
    function Xa(a) {
        return Array.prototype.concat.apply([], arguments)
    }
    function Ya(a) {
        var b = a.length;
        if (0 < b) {
            for (var c = Array(b), d = 0; d < b; d++)
                c[d] = a[d];
            return c
        }
        return []
    }
    function Za(a, b) {
        for (var c = 1; c < arguments.length; c++) {
            var d = arguments[c];
            if (Ca(d)) {
                var e = a.length || 0
                  , f = d.length || 0;
                a.length = e + f;
                for (var g = 0; g < f; g++)
                    a[e + g] = d[g]
            } else
                a.push(d)
        }
    }
    function $a(a, b, c, d) {
        Array.prototype.splice.apply(a, ab(arguments, 1))
    }
    function ab(a, b, c) {
        return 2 >= arguments.length ? Array.prototype.slice.call(a, b) : Array.prototype.slice.call(a, b, c)
    }
    function bb(a, b) {
        if (!Ca(a) || !Ca(b) || a.length != b.length)
            return !1;
        for (var c = a.length, d = cb, e = 0; e < c; e++)
            if (!d(a[e], b[e]))
                return !1;
        return !0
    }
    function cb(a, b) {
        return a === b
    }
    function db(a) {
        for (var b = Math.random, c = a.length - 1; 0 < c; c--) {
            var d = Math.floor(b() * (c + 1))
              , e = a[c];
            a[c] = a[d];
            a[d] = e
        }
    }
    function eb(a, b) {
        return Xa.apply([], Ta(a, b))
    }
    ;function fb(a, b) {
        return 0 == a.lastIndexOf(b, 0)
    }
    var gb = String.prototype.trim ? function(a) {
        return a.trim()
    }
    : function(a) {
        return /^[\s\xa0]*([\s\S]*?)[\s\xa0]*$/.exec(a)[1]
    }
    ;
    function hb(a, b) {
        a = String(a).toLowerCase();
        b = String(b).toLowerCase();
        return a < b ? -1 : a == b ? 0 : 1
    }
    var ib = /&/g
      , jb = /</g
      , kb = />/g
      , lb = /"/g
      , mb = /'/g
      , nb = /\x00/g;
    function ob(a, b) {
        var c = 0;
        a = gb(String(a)).split(".");
        b = gb(String(b)).split(".");
        for (var d = Math.max(a.length, b.length), e = 0; 0 == c && e < d; e++) {
            var f = a[e] || ""
              , g = b[e] || "";
            do {
                f = /(\d*)(\D*)(.*)/.exec(f) || ["", "", "", ""];
                g = /(\d*)(\D*)(.*)/.exec(g) || ["", "", "", ""];
                if (0 == f[0].length && 0 == g[0].length)
                    break;
                c = pb(0 == f[1].length ? 0 : parseInt(f[1], 10), 0 == g[1].length ? 0 : parseInt(g[1], 10)) || pb(0 == f[2].length, 0 == g[2].length) || pb(f[2], g[2]);
                f = f[3];
                g = g[3]
            } while (0 == c)
        }
        return c
    }
    function pb(a, b) {
        return a < b ? -1 : a > b ? 1 : 0
    }
    ;function qb() {
        var a = A.navigator;
        return a && (a = a.userAgent) ? a : ""
    }
    function F(a) {
        return -1 != qb().indexOf(a)
    }
    ;function rb() {
        return F("Opera")
    }
    function sb() {
        return F("Trident") || F("MSIE")
    }
    function tb() {
        return F("Firefox") || F("FxiOS")
    }
    function ub() {
        return F("Safari") && !(vb() || F("Coast") || rb() || F("Edge") || F("Edg/") || F("OPR") || tb() || F("Silk") || F("Android"))
    }
    function vb() {
        return (F("Chrome") || F("CriOS")) && !F("Edge") || F("Silk")
    }
    function wb() {
        return F("Android") && !(vb() || tb() || rb() || F("Silk"))
    }
    function xb(a) {
        var b = {};
        a.forEach(function(c) {
            b[c[0]] = c[1]
        });
        return function(c) {
            return b[v(c, "find").call(c, function(d) {
                return d in b
            })] || ""
        }
    }
    function yb() {
        var a = qb();
        if (sb()) {
            var b = /rv: *([\d\.]*)/.exec(a);
            if (b && b[1])
                a = b[1];
            else {
                b = "";
                var c = /MSIE +([\d\.]+)/.exec(a);
                if (c && c[1])
                    if (a = /Trident\/(\d.\d)/.exec(a),
                    "7.0" == c[1])
                        if (a && a[1])
                            switch (a[1]) {
                            case "4.0":
                                b = "8.0";
                                break;
                            case "5.0":
                                b = "9.0";
                                break;
                            case "6.0":
                                b = "10.0";
                                break;
                            case "7.0":
                                b = "11.0"
                            }
                        else
                            b = "7.0";
                    else
                        b = c[1];
                a = b
            }
            return a
        }
        c = RegExp("([A-Z][\\w ]+)/([^\\s]+)\\s*(?:\\((.*?)\\))?", "g");
        b = [];
        for (var d; d = c.exec(a); )
            b.push([d[1], d[2], d[3] || void 0]);
        a = xb(b);
        return rb() ? a(["Version", "Opera"]) : F("Edge") ? a(["Edge"]) : F("Edg/") ? a(["Edg"]) : F("Silk") ? a(["Silk"]) : vb() ? a(["Chrome", "CriOS", "HeadlessChrome"]) : (a = b[2]) && a[1] || ""
    }
    ;function zb() {
        return F("iPhone") && !F("iPod") && !F("iPad")
    }
    function Ab() {
        return zb() || F("iPad") || F("iPod")
    }
    ;function Bb(a) {
        Bb[" "](a);
        return a
    }
    Bb[" "] = function() {}
    ;
    function Cb(a, b) {
        try {
            return Bb(a[b]),
            !0
        } catch (c) {}
        return !1
    }
    function Db(a) {
        var b = Eb;
        return Object.prototype.hasOwnProperty.call(b, 58) ? b[58] : b[58] = a(58)
    }
    ;var Fb = rb()
      , H = sb()
      , Gb = F("Edge")
      , Hb = Gb || H
      , Ib = F("Gecko") && !(-1 != qb().toLowerCase().indexOf("webkit") && !F("Edge")) && !(F("Trident") || F("MSIE")) && !F("Edge")
      , Jb = -1 != qb().toLowerCase().indexOf("webkit") && !F("Edge")
      , Kb = F("Macintosh")
      , Lb = F("Windows")
      , Mb = F("Linux") || F("CrOS")
      , Nb = F("Android")
      , Ob = zb()
      , Pb = F("iPad")
      , Qb = F("iPod")
      , Rb = Ab();
    function Sb() {
        var a = A.document;
        return a ? a.documentMode : void 0
    }
    var Tb;
    a: {
        var Ub = ""
          , Vb = function() {
            var a = qb();
            if (Ib)
                return /rv:([^\);]+)(\)|;)/.exec(a);
            if (Gb)
                return /Edge\/([\d\.]+)/.exec(a);
            if (H)
                return /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(a);
            if (Jb)
                return /WebKit\/(\S+)/.exec(a);
            if (Fb)
                return /(?:Version)[ \/]?(\S+)/.exec(a)
        }();
        Vb && (Ub = Vb ? Vb[1] : "");
        if (H) {
            var Wb = Sb();
            if (null != Wb && Wb > parseFloat(Ub)) {
                Tb = String(Wb);
                break a
            }
        }
        Tb = Ub
    }
    var Eb = {};
    function Xb() {
        return Db(function() {
            return 0 <= ob(Tb, 58)
        })
    }
    function Yb(a) {
        return Number(Zb) >= a
    }
    var $b;
    if (A.document && H) {
        var ac = Sb();
        $b = ac ? ac : parseInt(Tb, 10) || void 0
    } else
        $b = void 0;
    var Zb = $b;
    var bc = H || Jb;
    function cc() {
        return !1
    }
    function dc() {
        return null
    }
    function ec() {}
    function fc(a) {
        var b = !1, c;
        return function() {
            b || (c = a(),
            b = !0);
            return c
        }
    }
    function gc(a) {
        return "function" === typeof a
    }
    ;function hc(a, b) {
        this.g = a === ic && b || "";
        this.h = jc
    }
    hc.prototype.sc = !0;
    hc.prototype.Zb = function() {
        return this.g
    }
    ;
    function kc(a) {
        return a instanceof hc && a.constructor === hc && a.h === jc ? a.g : "type_error:Const"
    }
    var jc = {}
      , ic = {};
    var lc;
    function mc() {
        if (void 0 === lc) {
            var a = null
              , b = A.trustedTypes;
            if (b && b.createPolicy) {
                try {
                    a = b.createPolicy("goog#html", {
                        createHTML: Ma,
                        createScript: Ma,
                        createScriptURL: Ma
                    })
                } catch (c) {
                    A.console && A.console.error(c.message)
                }
                lc = a
            } else
                lc = a
        }
        return lc
    }
    ;function nc(a, b) {
        this.g = b === oc ? a : ""
    }
    nc.prototype.toString = function() {
        return this.g + ""
    }
    ;
    nc.prototype.sc = !0;
    nc.prototype.Zb = function() {
        return this.g.toString()
    }
    ;
    var oc = {};
    function pc(a) {
        var b = mc();
        a = b ? b.createScriptURL(a) : a;
        return new nc(a,oc)
    }
    ;function qc(a, b) {
        this.g = b === rc ? a : ""
    }
    qc.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    qc.prototype.sc = !0;
    qc.prototype.Zb = function() {
        return this.g.toString()
    }
    ;
    function sc(a) {
        return a instanceof qc && a.constructor === qc ? a.g : "type_error:SafeUrl"
    }
    var tc = /^data:(.*);base64,[a-z0-9+\/]+=*$/i
      , uc = /^(?:(?:https?|mailto|ftp):|[^:/?#]*(?:[/?#]|$))/i;
    function vc(a) {
        a instanceof qc || (a = "object" == typeof a && a.sc ? a.Zb() : String(a),
        uc.test(a) ? a = new qc(a,rc) : (a = String(a),
        a = a.replace(/(%0A|%0D)/g, ""),
        a = a.match(tc) ? new qc(a,rc) : null));
        return a || wc
    }
    function xc(a) {
        if (a instanceof qc)
            return a;
        a = "object" == typeof a && a.sc ? a.Zb() : String(a);
        a: {
            try {
                var b = new URL(a)
            } catch (c) {
                b = "https:";
                break a
            }
            b = b.protocol
        }
        "javascript:" === b && (a = "about:invalid#zClosurez");
        return new qc(a,rc)
    }
    var rc = {}
      , wc = new qc("about:invalid#zClosurez",rc);
    var yc = {};
    function zc(a, b) {
        this.g = b === yc ? a : "";
        this.sc = !0
    }
    zc.prototype.Zb = function() {
        return this.g
    }
    ;
    zc.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    var Ac = new zc("",yc);
    function Bc(a) {
        if (a instanceof qc)
            return 'url("' + sc(a).replace(/</g, "%3c").replace(/[\\"]/g, "\\$&") + '")';
        if (a instanceof hc)
            a = kc(a);
        else {
            a = String(a);
            var b = a.replace(Cc, "$1").replace(Cc, "$1").replace(Dc, "url");
            if (Ec.test(b)) {
                if (b = !Fc.test(a)) {
                    for (var c = b = !0, d = 0; d < a.length; d++) {
                        var e = a.charAt(d);
                        "'" == e && c ? b = !b : '"' == e && b && (c = !c)
                    }
                    b = b && c && Gc(a)
                }
                a = b ? Hc(a) : "zClosurez"
            } else
                a = "zClosurez"
        }
        if (/[{;}]/.test(a))
            throw new Pa("Value does not allow [{;}], got: %s.",[a]);
        return a
    }
    function Gc(a) {
        for (var b = !0, c = /^[-_a-zA-Z0-9]$/, d = 0; d < a.length; d++) {
            var e = a.charAt(d);
            if ("]" == e) {
                if (b)
                    return !1;
                b = !0
            } else if ("[" == e) {
                if (!b)
                    return !1;
                b = !1
            } else if (!b && !c.test(e))
                return !1
        }
        return b
    }
    var Ec = RegExp("^[-+,.\"'%_!#/ a-zA-Z0-9\\[\\]]+$")
      , Dc = RegExp("\\b(url\\([ \t\n]*)('[ -&(-\\[\\]-~]*'|\"[ !#-\\[\\]-~]*\"|[!#-&*-\\[\\]-~]*)([ \t\n]*\\))", "g")
      , Cc = RegExp("\\b(calc|cubic-bezier|fit-content|hsl|hsla|linear-gradient|matrix|minmax|radial-gradient|repeat|rgb|rgba|(rotate|scale|translate)(X|Y|Z|3d)?|steps|var)\\([-+*/0-9a-zA-Z.%#\\[\\], ]+\\)", "g")
      , Fc = /\/\*/;
    function Hc(a) {
        return a.replace(Dc, function(b, c, d, e) {
            var f = "";
            d = d.replace(/^(['"])(.*)\1$/, function(g, h, l) {
                f = h;
                return l
            });
            b = vc(d).Zb();
            return c + f + b + f + e
        })
    }
    ;function Ic(a, b, c) {
        for (var d in a)
            b.call(c, a[d], d, a)
    }
    function Jc(a) {
        var b = [], c = 0, d;
        for (d in a)
            b[c++] = d;
        return b
    }
    function Kc(a) {
        for (var b in a)
            return !1;
        return !0
    }
    function Lc(a, b, c) {
        if (null !== a && b in a)
            throw Error('The object already contains the key "' + b + '"');
        a[b] = c
    }
    function Mc(a) {
        var b = {}, c;
        for (c in a)
            b[c] = a[c];
        return b
    }
    function Nc(a) {
        var b = {}, c;
        for (c in a)
            b[a[c]] = c;
        return b
    }
    var Oc = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
    function Pc(a, b) {
        for (var c, d, e = 1; e < arguments.length; e++) {
            d = arguments[e];
            for (c in d)
                a[c] = d[c];
            for (var f = 0; f < Oc.length; f++)
                c = Oc[f],
                Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
        }
    }
    function Qc(a) {
        var b = arguments.length;
        if (1 == b && Array.isArray(arguments[0]))
            return Qc.apply(null, arguments[0]);
        if (b % 2)
            throw Error("Uneven number of arguments");
        for (var c = {}, d = 0; d < b; d += 2)
            c[arguments[d]] = arguments[d + 1];
        return c
    }
    ;var Rc = {};
    function Sc(a, b) {
        this.g = b === Rc ? a : "";
        this.sc = !0
    }
    Sc.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    function Tc(a) {
        function b(d) {
            Array.isArray(d) ? d.forEach(b) : c += Uc(d)
        }
        var c = "";
        Array.prototype.forEach.call(arguments, b);
        return new Sc(c,Rc)
    }
    Sc.prototype.Zb = function() {
        return this.g
    }
    ;
    function Uc(a) {
        return a instanceof Sc && a.constructor === Sc ? a.g : "type_error:SafeStyleSheet"
    }
    var Vc = new Sc("",Rc);
    var Wc = {};
    function Xc(a, b) {
        this.g = b === Wc ? a : "";
        this.sc = !0
    }
    Xc.prototype.Zb = function() {
        return this.g.toString()
    }
    ;
    Xc.prototype.toString = function() {
        return this.g.toString()
    }
    ;
    function Yc(a) {
        return a instanceof Xc && a.constructor === Xc ? a.g : "type_error:SafeHtml"
    }
    function Zc(a) {
        var b = mc();
        a = b ? b.createHTML(a) : a;
        return new Xc(a,Wc)
    }
    var $c = new Xc(A.trustedTypes && A.trustedTypes.emptyHTML || "",Wc);
    /*

 Copyright Tibo Software.
*/
    var ad = fc(function() {
        var a = document.createElement("div")
          , b = document.createElement("div");
        b.appendChild(document.createElement("div"));
        a.appendChild(b);
        b = a.firstChild.firstChild;
        a.innerHTML = Yc($c);
        return !b.parentElement
    });
    function bd(a, b) {
        if (ad())
            for (; a.lastChild; )
                a.removeChild(a.lastChild);
        a.innerHTML = Yc(b)
    }
    function cd(a, b) {
        b = b instanceof qc ? b : xc(b);
        a.href = sc(b)
    }
    function dd(a) {
        var b = A.location;
        a = a instanceof qc ? a : xc(a);
        b.href = sc(a)
    }
    var ed = /^[\w+/_-]+[=]{0,2}$/;
    function fd(a, b, c) {
        return Math.min(Math.max(a, b), c)
    }
    ;function gd(a, b) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0
    }
    k = gd.prototype;
    k.ef = function() {
        return new gd(this.x,this.y)
    }
    ;
    function hd(a, b) {
        return new gd(a.x - b.x,a.y - b.y)
    }
    k.ceil = function() {
        this.x = Math.ceil(this.x);
        this.y = Math.ceil(this.y);
        return this
    }
    ;
    k.floor = function() {
        this.x = Math.floor(this.x);
        this.y = Math.floor(this.y);
        return this
    }
    ;
    k.round = function() {
        this.x = Math.round(this.x);
        this.y = Math.round(this.y);
        return this
    }
    ;
    k.translate = function(a, b) {
        a instanceof gd ? (this.x += a.x,
        this.y += a.y) : (this.x += Number(a),
        "number" === typeof b && (this.y += b));
        return this
    }
    ;
    function J(a, b) {
        this.width = a;
        this.height = b
    }
    function id(a) {
        return a.width * a.height
    }
    J.prototype.aspectRatio = function() {
        return this.width / this.height
    }
    ;
    J.prototype.ceil = function() {
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    J.prototype.floor = function() {
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    J.prototype.round = function() {
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    function jd(a) {
        return a.replace(/[\s\xa0]+$/, "")
    }
    function kd(a) {
        a = a.replace(ib, "&amp;").replace(jb, "&lt;").replace(kb, "&gt;").replace(lb, "&quot;").replace(mb, "&#39;").replace(nb, "&#0;");
        return a
    }
    function ld(a) {
        return String(a).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
    }
    var md = v(String.prototype, "repeat") ? function(a, b) {
        return v(a, "repeat").call(a, b)
    }
    : function(a, b) {
        return Array(b + 1).join(a)
    }
    ;
    function nd(a) {
        return String(a).replace(/\-([a-z])/g, function(b, c) {
            return c.toUpperCase()
        })
    }
    function od(a) {
        return String(a).replace(/([A-Z])/g, "-$1").toLowerCase()
    }
    function pd(a) {
        return a.replace(RegExp("(^|[\\s]+)([a-z])", "g"), function(b, c, d) {
            return c + d.toUpperCase()
        })
    }
    function qd(a) {
        isFinite(a) && (a = String(a));
        return "string" === typeof a ? /^\s*-?0x/i.test(a) ? parseInt(a, 16) : parseInt(a, 10) : NaN
    }
    ;function rd(a) {
        return a ? new sd(td(a)) : Oa || (Oa = new sd)
    }
    function ud(a) {
        return vd(document, a)
    }
    function vd(a, b) {
        return "string" === typeof b ? a.getElementById(b) : b
    }
    function wd(a, b, c) {
        return xd(document, a, b, c)
    }
    function yd(a, b) {
        var c = b || document;
        return c.querySelectorAll && c.querySelector ? c.querySelectorAll("." + a) : xd(document, "*", a, b)
    }
    function zd(a, b) {
        var c = b || document
          , d = null;
        c.getElementsByClassName ? d = c.getElementsByClassName(a)[0] : d = Ad("*", a, b);
        return d || null
    }
    function xd(a, b, c, d) {
        a = d || a;
        b = b && "*" != b ? String(b).toUpperCase() : "";
        if (a.querySelectorAll && a.querySelector && (b || c))
            return a.querySelectorAll(b + (c ? "." + c : ""));
        if (c && a.getElementsByClassName) {
            a = a.getElementsByClassName(c);
            if (b) {
                d = {};
                for (var e = 0, f = 0, g; g = a[f]; f++)
                    b == g.nodeName && (d[e++] = g);
                d.length = e;
                return d
            }
            return a
        }
        a = a.getElementsByTagName(b || "*");
        if (c) {
            d = {};
            for (f = e = 0; g = a[f]; f++)
                b = g.className,
                "function" == typeof b.split && Va(b.split(/\s+/), c) && (d[e++] = g);
            d.length = e;
            return d
        }
        return a
    }
    function Ad(a, b, c) {
        var d = document
          , e = c || d
          , f = a && "*" != a ? String(a).toUpperCase() : "";
        return e.querySelectorAll && e.querySelector && (f || b) ? e.querySelector(f + (b ? "." + b : "")) : xd(d, a, b, c)[0] || null
    }
    function Bd(a, b) {
        Ic(b, function(c, d) {
            c && "object" == typeof c && c.sc && (c = c.Zb());
            "style" == d ? a.style.cssText = c : "class" == d ? a.className = c : "for" == d ? a.htmlFor = c : Cd.hasOwnProperty(d) ? a.setAttribute(Cd[d], c) : fb(d, "aria-") || fb(d, "data-") ? a.setAttribute(d, c) : a[d] = c
        })
    }
    var Cd = {
        cellpadding: "cellPadding",
        cellspacing: "cellSpacing",
        colspan: "colSpan",
        frameborder: "frameBorder",
        height: "height",
        maxlength: "maxLength",
        nonce: "nonce",
        role: "role",
        rowspan: "rowSpan",
        type: "type",
        usemap: "useMap",
        valign: "vAlign",
        width: "width"
    };
    function Dd(a) {
        a = (a || window).document;
        a = Ed(a) ? a.documentElement : a.body;
        return new J(a.clientWidth,a.clientHeight)
    }
    function Fd(a) {
        var b = Gd(a);
        a = Hd(a);
        return H && a.pageYOffset != b.scrollTop ? new gd(b.scrollLeft,b.scrollTop) : new gd(a.pageXOffset || b.scrollLeft,a.pageYOffset || b.scrollTop)
    }
    function Gd(a) {
        return a.scrollingElement ? a.scrollingElement : !Jb && Ed(a) ? a.documentElement : a.body || a.documentElement
    }
    function Id(a) {
        return a ? Hd(a) : window
    }
    function Hd(a) {
        return a.parentWindow || a.defaultView
    }
    function K(a, b, c) {
        return Jd(document, arguments)
    }
    function Jd(a, b) {
        var c = b[1]
          , d = Kd(a, String(b[0]));
        c && ("string" === typeof c ? d.className = c : Array.isArray(c) ? d.className = c.join(" ") : Bd(d, c));
        2 < b.length && Ld(a, d, b, 2);
        return d
    }
    function Ld(a, b, c, d) {
        function e(h) {
            h && b.appendChild("string" === typeof h ? a.createTextNode(h) : h)
        }
        for (; d < c.length; d++) {
            var f = c[d];
            if (!Ca(f) || Da(f) && 0 < f.nodeType)
                e(f);
            else {
                a: {
                    if (f && "number" == typeof f.length) {
                        if (Da(f)) {
                            var g = "function" == typeof f.item || "string" == typeof f.item;
                            break a
                        }
                        if ("function" === typeof f) {
                            g = "function" == typeof f.item;
                            break a
                        }
                    }
                    g = !1
                }
                Ra(g ? Ya(f) : f, e)
            }
        }
    }
    function L(a) {
        return Kd(document, a)
    }
    function Kd(a, b) {
        b = String(b);
        "application/xhtml+xml" === a.contentType && (b = b.toLowerCase());
        return a.createElement(b)
    }
    function Ed(a) {
        return "CSS1Compat" == a.compatMode
    }
    function Md(a, b) {
        a.appendChild(b)
    }
    function Nd(a, b) {
        Ld(td(a), a, arguments, 1)
    }
    function Od(a) {
        for (var b; b = a.firstChild; )
            a.removeChild(b)
    }
    function Pd(a, b) {
        b.parentNode && b.parentNode.insertBefore(a, b)
    }
    function Qd(a) {
        return a && a.parentNode ? a.parentNode.removeChild(a) : null
    }
    function Rd(a, b) {
        var c = b.parentNode;
        c && c.replaceChild(a, b)
    }
    function Sd(a) {
        return Da(a) && 1 == a.nodeType
    }
    function Td(a) {
        var b;
        if (bc && (b = a.parentElement))
            return b;
        b = a.parentNode;
        return Sd(b) ? b : null
    }
    function Ud(a, b) {
        if (!a || !b)
            return !1;
        if (a.contains && 1 == b.nodeType)
            return a == b || a.contains(b);
        if ("undefined" != typeof a.compareDocumentPosition)
            return a == b || !!(a.compareDocumentPosition(b) & 16);
        for (; b && a != b; )
            b = b.parentNode;
        return b == a
    }
    function td(a) {
        return 9 == a.nodeType ? a : a.ownerDocument || a.document
    }
    function Vd(a, b) {
        if ("textContent"in a)
            a.textContent = b;
        else if (3 == a.nodeType)
            a.data = String(b);
        else if (a.firstChild && 3 == a.firstChild.nodeType) {
            for (; a.lastChild != a.firstChild; )
                a.removeChild(a.lastChild);
            a.firstChild.data = String(b)
        } else
            Od(a),
            a.appendChild(td(a).createTextNode(String(b)))
    }
    var Wd = {
        SCRIPT: 1,
        STYLE: 1,
        HEAD: 1,
        IFRAME: 1,
        OBJECT: 1
    }
      , Xd = {
        IMG: " ",
        BR: "\n"
    };
    function Yd(a, b) {
        b ? a.tabIndex = 0 : (a.tabIndex = -1,
        a.removeAttribute("tabIndex"))
    }
    function Zd(a) {
        return a.hasAttribute("tabindex")
    }
    function $d(a) {
        a = a.tabIndex;
        return "number" === typeof a && 0 <= a && 32768 > a
    }
    function ae(a) {
        var b = [];
        be(a, b, !0);
        a = b.join("");
        a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
        a = a.replace(/\u200B/g, "");
        a = a.replace(/ +/g, " ");
        " " != a && (a = a.replace(/^\s*/, ""));
        return a
    }
    function ce(a) {
        var b = [];
        be(a, b, !1);
        return b.join("")
    }
    function be(a, b, c) {
        if (!(a.nodeName in Wd))
            if (3 == a.nodeType)
                c ? b.push(String(a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue);
            else if (a.nodeName in Xd)
                b.push(Xd[a.nodeName]);
            else
                for (a = a.firstChild; a; )
                    be(a, b, c),
                    a = a.nextSibling
    }
    function de(a) {
        return ee(a, function(b) {
            return "string" === typeof b.className && Va(b.className.split(/\s+/), "ts-colorpicker")
        })
    }
    function ee(a, b) {
        for (var c = 0; a; ) {
            if (b(a))
                return a;
            a = a.parentNode;
            c++
        }
        return null
    }
    function fe() {
        var a = Id();
        return void 0 !== a.devicePixelRatio ? a.devicePixelRatio : a.matchMedia ? ge(3) || ge(2) || ge(1.5) || ge(1) || .75 : 1
    }
    function ge(a) {
        return Id().matchMedia("(min-resolution: " + a + "dppx),(min--moz-device-pixel-ratio: " + a + "),(min-resolution: " + 96 * a + "dpi)").matches ? a : 0
    }
    function sd(a) {
        this.g = a || A.document || document
    }
    k = sd.prototype;
    k.o = function(a) {
        return vd(this.g, a)
    }
    ;
    k.Ca = function(a, b, c) {
        return Jd(this.g, arguments)
    }
    ;
    k.appendChild = Md;
    k.ii = Od;
    k.ff = Qd;
    function he(a) {
        return void 0 != a.children ? a.children : Array.prototype.filter.call(a.childNodes, function(b) {
            return 1 == b.nodeType
        })
    }
    k.contains = Ud;
    function ie() {
        var a = rd()
          , b = a.g
          , c = Kd(a.g, "STYLE");
        a: {
            var d = (Id(b) || A).document;
            if (d.querySelector && (d = d.querySelector('style[nonce],link[rel="stylesheet"][nonce]')) && (d = d.nonce || d.getAttribute("nonce")) && ed.test(d))
                break a;
            d = ""
        }
        d && c.setAttribute("nonce", d);
        c.type = "text/css";
        a = a.g.getElementsByTagName("HEAD")[0];
        (d = sb()) && a.appendChild(c);
        c.styleSheet ? c.styleSheet.cssText = "#ts-totem{width:208px;}.ts-item{display:inline-block;}.ts-item.ts-Puzzle .ts-cnt-wrap,.ts-item.ts-Album .ts-cnt-wrap{width:208px;height:156px;}.ts-item.ts-User .ts-cnt-wrap{width:48px;height:48px;}" : c.appendChild(b.createTextNode("#ts-totem{width:208px;}.ts-item{display:inline-block;}.ts-item.ts-Puzzle .ts-cnt-wrap,.ts-item.ts-Album .ts-cnt-wrap{width:208px;height:156px;}.ts-item.ts-User .ts-cnt-wrap{width:48px;height:48px;}"));
        d || a.appendChild(c)
    }
    ;function je(a) {
        a && "function" == typeof a.G && a.G()
    }
    ;function ke(a) {
        for (var b = 0, c = arguments.length; b < c; ++b) {
            var d = arguments[b];
            Ca(d) ? ke.apply(null, d) : je(d)
        }
    }
    ;function M() {
        0 != le && (me[Ea(this)] = this);
        this.fd = this.fd;
        this.Tb = this.Tb
    }
    var le = 0
      , me = {};
    M.prototype.fd = !1;
    M.prototype.W = function() {
        return this.fd
    }
    ;
    M.prototype.G = function() {
        if (!this.fd && (this.fd = !0,
        this.D(),
        0 != le)) {
            var a = Ea(this);
            if (0 != le && this.Tb && 0 < this.Tb.length)
                throw Error(this + " did not empty its onDisposeCallbacks queue. This probably means it overrode dispose() or disposeInternal() without calling the superclass' method.");
            delete me[a]
        }
    }
    ;
    function N(a, b) {
        ne(a, Ka(je, b))
    }
    function ne(a, b, c) {
        a.fd ? void 0 !== c ? b.call(c) : b() : (a.Tb || (a.Tb = []),
        a.Tb.push(void 0 !== c ? Ja(b, c) : b))
    }
    M.prototype.D = function() {
        if (this.Tb)
            for (; this.Tb.length; )
                this.Tb.shift()()
    }
    ;
    function oe(a) {
        return a && "function" == typeof a.W ? a.W() : !1
    }
    ;function pe(a) {
        return "string" == typeof a.className ? a.className : a.getAttribute && a.getAttribute("class") || ""
    }
    function qe(a) {
        return a.classList ? a.classList : pe(a).match(/\S+/g) || []
    }
    function re(a, b) {
        "string" == typeof a.className ? a.className = b : a.setAttribute && a.setAttribute("class", b)
    }
    function se(a, b) {
        return a.classList ? a.classList.contains(b) : Va(qe(a), b)
    }
    function O(a, b) {
        if (a.classList)
            a.classList.add(b);
        else if (!se(a, b)) {
            var c = pe(a);
            re(a, c + (0 < c.length ? " " + b : b))
        }
    }
    function te(a, b) {
        if (a.classList)
            Array.prototype.forEach.call(b, function(e) {
                O(a, e)
            });
        else {
            var c = {};
            Array.prototype.forEach.call(qe(a), function(e) {
                c[e] = !0
            });
            Array.prototype.forEach.call(b, function(e) {
                c[e] = !0
            });
            b = "";
            for (var d in c)
                b += 0 < b.length ? " " + d : d;
            re(a, b)
        }
    }
    function ue(a, b) {
        a.classList ? a.classList.remove(b) : se(a, b) && re(a, Array.prototype.filter.call(qe(a), function(c) {
            return c != b
        }).join(" "))
    }
    function ve(a, b) {
        a.classList ? Array.prototype.forEach.call(b, function(c) {
            ue(a, c)
        }) : re(a, Array.prototype.filter.call(qe(a), function(c) {
            return !Va(b, c)
        }).join(" "))
    }
    function we(a, b, c) {
        c ? O(a, b) : ue(a, b)
    }
    ;function xe(a) {
        if ("undefined" == typeof a)
            return "undefined";
        if (null == a)
            return "NULL";
        var b = [], c;
        for (c in a)
            if ("function" !== typeof a[c]) {
                var d = c + " = ";
                try {
                    d += a[c]
                } catch (e) {
                    d += "*** " + e + " ***"
                }
                b.push(d)
            }
        return b.join("\n")
    }
    function ye(a) {
        for (var b = [], c = 0; c < a.length; c++)
            Array.isArray(a[c]) ? b.push(ye(a[c])) : b.push(a[c]);
        return "[ " + b.join(", ") + " ]"
    }
    function ze(a) {
        var b = za("window.location.href");
        null == a && (a = 'Unknown Error of type "null/undefined"');
        if ("string" === typeof a)
            return {
                message: a,
                name: "Unknown error",
                lineNumber: "Not available",
                fileName: b,
                stack: "Not available"
            };
        var c = !1;
        try {
            var d = a.lineNumber || a.line || "Not available"
        } catch (f) {
            d = "Not available",
            c = !0
        }
        try {
            var e = a.fileName || a.filename || a.sourceURL || A.$googDebugFname || b
        } catch (f) {
            e = "Not available",
            c = !0
        }
        b = Ae(a);
        if (!(!c && a.lineNumber && a.fileName && a.stack && a.message && a.name))
            return c = a.message,
            null == c && (c = a.constructor && a.constructor instanceof Function ? 'Unknown Error of type "' + (a.constructor.name ? a.constructor.name : Be(a.constructor)) + '"' : "Unknown Error of unknown type",
            "function" === typeof a.toString && Object.prototype.toString !== a.toString && (c += ": " + a.toString())),
            {
                message: c,
                name: a.name || "UnknownError",
                lineNumber: d,
                fileName: e,
                stack: b || "Not available"
            };
        a.stack = b;
        return {
            message: a.message,
            name: a.name,
            lineNumber: a.lineNumber,
            fileName: a.fileName,
            stack: a.stack
        }
    }
    function Ae(a, b) {
        b || (b = {});
        b[Ce(a)] = !0;
        var c = a.stack || "";
        (a = a.cause) && !b[Ce(a)] && (c += "\nCaused by: ",
        a.stack && 0 == a.stack.indexOf(a.toString()) || (c += "string" === typeof a ? a : a.message + "\n"),
        c += Ae(a, b));
        return c
    }
    function Ce(a) {
        var b = "";
        "function" === typeof a.toString && (b = "" + a);
        return b + a.stack
    }
    function De(a) {
        var b = Error();
        if (Error.captureStackTrace)
            Error.captureStackTrace(b, a || De),
            b = String(b.stack);
        else {
            try {
                throw b;
            } catch (c) {
                b = c
            }
            b = (b = b.stack) ? String(b) : null
        }
        b || (b = Ee(a || arguments.callee.caller, []));
        return b
    }
    function Ee(a, b) {
        var c = [];
        if (Va(b, a))
            c.push("[...circular reference...]");
        else if (a && 50 > b.length) {
            c.push(Be(a) + "(");
            for (var d = a.arguments, e = 0; d && e < d.length; e++) {
                0 < e && c.push(", ");
                var f = d[e];
                switch (typeof f) {
                case "object":
                    f = f ? "object" : "null";
                    break;
                case "string":
                    break;
                case "number":
                    f = String(f);
                    break;
                case "boolean":
                    f = f ? "true" : "false";
                    break;
                case "function":
                    f = (f = Be(f)) ? f : "[fn]";
                    break;
                default:
                    f = typeof f
                }
                40 < f.length && (f = f.slice(0, 40) + "...");
                c.push(f)
            }
            b.push(a);
            c.push(")\n");
            try {
                c.push(Ee(a.caller, b))
            } catch (g) {
                c.push("[exception trying to get caller]\n")
            }
        } else
            a ? c.push("[...long stack...]") : c.push("[end]");
        return c.join("")
    }
    function Be(a) {
        if (Fe[a])
            return Fe[a];
        a = String(a);
        if (!Fe[a]) {
            var b = /function\s+([^\(]+)/m.exec(a);
            Fe[a] = b ? b[1] : "[Anonymous]"
        }
        return Fe[a]
    }
    var Fe = {};
    function Ge() {
        this.id = "j"
    }
    Ge.prototype.toString = function() {
        return this.id
    }
    ;
    function He(a, b) {
        this.type = a instanceof Ge ? String(a) : a;
        this.currentTarget = this.target = b;
        this.defaultPrevented = this.g = !1
    }
    He.prototype.stopPropagation = function() {
        this.g = !0
    }
    ;
    He.prototype.preventDefault = function() {
        this.defaultPrevented = !0
    }
    ;
    function Ie(a) {
        a.stopPropagation()
    }
    function Je(a) {
        a.preventDefault()
    }
    ;var Ke = function() {
        if (!A.addEventListener || !Object.defineProperty)
            return !1;
        var a = !1
          , b = Object.defineProperty({}, "passive", {
            get: function() {
                a = !0
            }
        });
        try {
            A.addEventListener("test", function() {}, b),
            A.removeEventListener("test", function() {}, b)
        } catch (c) {}
        return a
    }();
    var Le;
    Le = Jb ? "webkitAnimationEnd" : "animationend";
    function Me(a, b) {
        He.call(this, a ? a.type : "");
        this.relatedTarget = this.currentTarget = this.target = null;
        this.button = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.key = "";
        this.h = this.keyCode = 0;
        this.metaKey = this.shiftKey = this.altKey = this.ctrlKey = !1;
        this.state = null;
        this.i = !1;
        this.pointerId = 0;
        this.pointerType = "";
        this.ja = null;
        if (a) {
            var c = this.type = a.type
              , d = a.changedTouches && a.changedTouches.length ? a.changedTouches[0] : null;
            this.target = a.target || a.srcElement;
            this.currentTarget = b;
            (b = a.relatedTarget) ? Ib && (Cb(b, "nodeName") || (b = null)) : "mouseover" == c ? b = a.fromElement : "mouseout" == c && (b = a.toElement);
            this.relatedTarget = b;
            d ? (this.clientX = void 0 !== d.clientX ? d.clientX : d.pageX,
            this.clientY = void 0 !== d.clientY ? d.clientY : d.pageY,
            this.screenX = d.screenX || 0,
            this.screenY = d.screenY || 0) : (this.clientX = void 0 !== a.clientX ? a.clientX : a.pageX,
            this.clientY = void 0 !== a.clientY ? a.clientY : a.pageY,
            this.screenX = a.screenX || 0,
            this.screenY = a.screenY || 0);
            this.button = a.button;
            this.keyCode = a.keyCode || 0;
            this.key = a.key || "";
            this.h = a.charCode || ("keypress" == c ? a.keyCode : 0);
            this.ctrlKey = a.ctrlKey;
            this.altKey = a.altKey;
            this.shiftKey = a.shiftKey;
            this.metaKey = a.metaKey;
            this.i = Kb ? a.metaKey : a.ctrlKey;
            this.pointerId = a.pointerId || 0;
            this.pointerType = "string" === typeof a.pointerType ? a.pointerType : Ne[a.pointerType] || "";
            this.state = a.state;
            this.ja = a;
            a.defaultPrevented && Me.M.preventDefault.call(this)
        }
    }
    D(Me, He);
    var Ne = {
        2: "touch",
        3: "pen",
        4: "mouse"
    };
    Me.prototype.stopPropagation = function() {
        Me.M.stopPropagation.call(this);
        this.ja.stopPropagation ? this.ja.stopPropagation() : this.ja.cancelBubble = !0
    }
    ;
    Me.prototype.preventDefault = function() {
        Me.M.preventDefault.call(this);
        var a = this.ja;
        a.preventDefault ? a.preventDefault() : a.returnValue = !1
    }
    ;
    var Oe = "closure_listenable_" + (1E6 * Math.random() | 0);
    function Pe(a) {
        return !(!a || !a[Oe])
    }
    ;var Qe = 0;
    function Re(a, b, c, d, e) {
        this.listener = a;
        this.proxy = null;
        this.src = b;
        this.type = c;
        this.capture = !!d;
        this.ia = e;
        this.key = ++Qe;
        this.zd = this.te = !1
    }
    function Se(a) {
        a.zd = !0;
        a.listener = null;
        a.proxy = null;
        a.src = null;
        a.ia = null
    }
    ;function Te(a) {
        this.src = a;
        this.Ea = {};
        this.g = 0
    }
    Te.prototype.add = function(a, b, c, d, e) {
        var f = a.toString();
        a = this.Ea[f];
        a || (a = this.Ea[f] = [],
        this.g++);
        var g = Ue(a, b, d, e);
        -1 < g ? (b = a[g],
        c || (b.te = !1)) : (b = new Re(b,this.src,f,!!d,e),
        b.te = c,
        a.push(b));
        return b
    }
    ;
    function Ve(a, b) {
        var c = b.type;
        c in a.Ea && Wa(a.Ea[c], b) && (Se(b),
        0 == a.Ea[c].length && (delete a.Ea[c],
        a.g--))
    }
    Te.prototype.Rd = function(a, b, c, d) {
        a = this.Ea[a.toString()];
        var e = -1;
        a && (e = Ue(a, b, c, d));
        return -1 < e ? a[e] : null
    }
    ;
    function Ue(a, b, c, d) {
        for (var e = 0; e < a.length; ++e) {
            var f = a[e];
            if (!f.zd && f.listener == b && f.capture == !!c && f.ia == d)
                return e
        }
        return -1
    }
    ;var We = "closure_lm_" + (1E6 * Math.random() | 0)
      , Xe = {}
      , Ye = 0;
    function Q(a, b, c, d, e) {
        if (d && d.once)
            return Ze(a, b, c, d, e);
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Q(a, b[f], c, d, e);
            return null
        }
        c = $e(c);
        return Pe(a) ? a.C(b, c, Da(d) ? !!d.capture : !!d, e) : af(a, b, c, !1, d, e)
    }
    function af(a, b, c, d, e, f) {
        if (!b)
            throw Error("Invalid event type");
        var g = Da(e) ? !!e.capture : !!e
          , h = bf(a);
        h || (a[We] = h = new Te(a));
        c = h.add(b, c, d, g, f);
        if (c.proxy)
            return c;
        d = cf();
        c.proxy = d;
        d.src = a;
        d.listener = c;
        if (a.addEventListener)
            Ke || (e = g),
            void 0 === e && (e = !1),
            a.addEventListener(b.toString(), d, e);
        else if (a.attachEvent)
            a.attachEvent(df(b.toString()), d);
        else if (a.addListener && a.removeListener)
            a.addListener(d);
        else
            throw Error("addEventListener and attachEvent are unavailable.");
        Ye++;
        return c
    }
    function cf() {
        function a(c) {
            return b.call(a.src, a.listener, c)
        }
        var b = ef;
        return a
    }
    function Ze(a, b, c, d, e) {
        if (Array.isArray(b)) {
            for (var f = 0; f < b.length; f++)
                Ze(a, b[f], c, d, e);
            return null
        }
        c = $e(c);
        return Pe(a) ? a.tc(b, c, Da(d) ? !!d.capture : !!d, e) : af(a, b, c, !0, d, e)
    }
    function ff(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                ff(a, b[f], c, d, e);
        else
            d = Da(d) ? !!d.capture : !!d,
            c = $e(c),
            Pe(a) ? a.ma(b, c, d, e) : a && (a = bf(a)) && (b = a.Rd(b, c, d, e)) && gf(b)
    }
    function gf(a) {
        if ("number" !== typeof a && a && !a.zd) {
            var b = a.src;
            if (Pe(b))
                Ve(b.Nb, a);
            else {
                var c = a.type
                  , d = a.proxy;
                b.removeEventListener ? b.removeEventListener(c, d, a.capture) : b.detachEvent ? b.detachEvent(df(c), d) : b.addListener && b.removeListener && b.removeListener(d);
                Ye--;
                (c = bf(b)) ? (Ve(c, a),
                0 == c.g && (c.src = null,
                b[We] = null)) : Se(a)
            }
        }
    }
    function df(a) {
        return a in Xe ? Xe[a] : Xe[a] = "on" + a
    }
    function hf(a, b) {
        var c = a.listener
          , d = a.ia || a.src;
        a.te && gf(a);
        return c.call(d, b)
    }
    function ef(a, b) {
        return a.zd ? !0 : hf(a, new Me(b,this))
    }
    function bf(a) {
        a = a[We];
        return a instanceof Te ? a : null
    }
    var jf = "__closure_events_fn_" + (1E9 * Math.random() >>> 0);
    function $e(a) {
        if ("function" === typeof a)
            return a;
        a[jf] || (a[jf] = function(b) {
            return a.handleEvent(b)
        }
        );
        return a[jf]
    }
    ;function kf(a, b, c, d, e, f) {
        if (Kb && e)
            return lf(a);
        if (e && !d)
            return !1;
        if (!Ib) {
            "number" === typeof b && (b = mf(b));
            var g = 17 == b || 18 == b || Kb && 91 == b;
            if ((!c || Kb) && g || Kb && 16 == b && (d || f))
                return !1
        }
        if ((Jb || Gb) && d && c)
            switch (a) {
            case 220:
            case 219:
            case 221:
            case 192:
            case 186:
            case 189:
            case 187:
            case 188:
            case 190:
            case 191:
            case 192:
            case 222:
                return !1
            }
        if (H && d && b == a)
            return !1;
        switch (a) {
        case 13:
            return Ib ? f || e ? !1 : !(c && d) : !0;
        case 27:
            return !(Jb || Gb || Ib)
        }
        return Ib && (d || e || f) ? !1 : lf(a)
    }
    function lf(a) {
        if (48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || (Jb || Gb) && 0 == a)
            return !0;
        switch (a) {
        case 32:
        case 43:
        case 63:
        case 64:
        case 107:
        case 109:
        case 110:
        case 111:
        case 186:
        case 59:
        case 189:
        case 187:
        case 61:
        case 188:
        case 190:
        case 191:
        case 192:
        case 222:
        case 219:
        case 220:
        case 221:
        case 163:
        case 58:
            return !0;
        case 173:
            return Ib;
        default:
            return !1
        }
    }
    function mf(a) {
        if (Ib)
            a = nf(a);
        else if (Kb && Jb)
            switch (a) {
            case 93:
                a = 91
            }
        return a
    }
    function nf(a) {
        switch (a) {
        case 61:
            return 187;
        case 59:
            return 186;
        case 173:
            return 189;
        case 224:
            return 91;
        case 0:
            return 224;
        default:
            return a
        }
    }
    ;function of(a, b, c, d) {
        Me.call(this, d);
        this.type = pf;
        this.keyCode = a;
        this.h = b;
        this.repeat = c
    }
    D(of, Me);
    var pf = "key";
    function qf() {
        M.call(this);
        this.Nb = new Te(this);
        this.Hi = this;
        this.Se = null
    }
    D(qf, M);
    qf.prototype[Oe] = !0;
    k = qf.prototype;
    k.gg = function(a) {
        this.Se = a
    }
    ;
    k.addEventListener = function(a, b, c, d) {
        Q(this, a, b, c, d)
    }
    ;
    k.removeEventListener = function(a, b, c, d) {
        ff(this, a, b, c, d)
    }
    ;
    k.dispatchEvent = function(a) {
        var b, c = this.Se;
        if (c)
            for (b = []; c; c = c.Se)
                b.push(c);
        c = this.Hi;
        var d = a.type || a;
        if ("string" === typeof a)
            a = new He(a,c);
        else if (a instanceof He)
            a.target = a.target || c;
        else {
            var e = a;
            a = new He(d,c);
            Pc(a, e)
        }
        e = !0;
        if (b)
            for (var f = b.length - 1; !a.g && 0 <= f; f--) {
                var g = a.currentTarget = b[f];
                e = rf(g, d, !0, a) && e
            }
        a.g || (g = a.currentTarget = c,
        e = rf(g, d, !0, a) && e,
        a.g || (e = rf(g, d, !1, a) && e));
        if (b)
            for (f = 0; !a.g && f < b.length; f++)
                g = a.currentTarget = b[f],
                e = rf(g, d, !1, a) && e;
        return e
    }
    ;
    k.D = function() {
        qf.M.D.call(this);
        if (this.Nb) {
            var a = this.Nb, b = 0, c;
            for (c in a.Ea) {
                for (var d = a.Ea[c], e = 0; e < d.length; e++)
                    ++b,
                    Se(d[e]);
                delete a.Ea[c];
                a.g--
            }
        }
        this.Se = null
    }
    ;
    k.C = function(a, b, c, d) {
        return this.Nb.add(String(a), b, !1, c, d)
    }
    ;
    k.tc = function(a, b, c, d) {
        return this.Nb.add(String(a), b, !0, c, d)
    }
    ;
    k.ma = function(a, b, c, d) {
        var e = this.Nb;
        a = String(a).toString();
        if (a in e.Ea) {
            var f = e.Ea[a];
            b = Ue(f, b, c, d);
            -1 < b ? (Se(f[b]),
            Array.prototype.splice.call(f, b, 1),
            0 == f.length && (delete e.Ea[a],
            e.g--),
            e = !0) : e = !1
        } else
            e = !1;
        return e
    }
    ;
    function rf(a, b, c, d) {
        b = a.Nb.Ea[String(b)];
        if (!b)
            return !0;
        b = b.concat();
        for (var e = !0, f = 0; f < b.length; ++f) {
            var g = b[f];
            if (g && !g.zd && g.capture == c) {
                var h = g.listener
                  , l = g.ia || g.src;
                g.te && Ve(a.Nb, g);
                e = !1 !== h.call(l, d) && e
            }
        }
        return e && !d.defaultPrevented
    }
    k.Rd = function(a, b, c, d) {
        return this.Nb.Rd(String(a), b, c, d)
    }
    ;
    function sf(a, b) {
        qf.call(this);
        a && tf(this, a, b)
    }
    D(sf, qf);
    k = sf.prototype;
    k.s = null;
    k.Ke = null;
    k.Of = null;
    k.Le = null;
    k.cb = -1;
    k.$b = -1;
    k.lf = !1;
    var uf = {
        3: 13,
        12: 144,
        63232: 38,
        63233: 40,
        63234: 37,
        63235: 39,
        63236: 112,
        63237: 113,
        63238: 114,
        63239: 115,
        63240: 116,
        63241: 117,
        63242: 118,
        63243: 119,
        63244: 120,
        63245: 121,
        63246: 122,
        63247: 123,
        63248: 44,
        63272: 46,
        63273: 36,
        63275: 35,
        63276: 33,
        63277: 34,
        63289: 144,
        63302: 45
    }
      , vf = {
        Up: 38,
        Down: 40,
        Left: 37,
        Right: 39,
        Enter: 13,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        "U+007F": 46,
        Home: 36,
        End: 35,
        PageUp: 33,
        PageDown: 34,
        Insert: 45
    }
      , wf = Kb && Ib;
    k = sf.prototype;
    k.ji = function(a) {
        if (Jb || Gb)
            if (17 == this.cb && !a.ctrlKey || 18 == this.cb && !a.altKey || Kb && 91 == this.cb && !a.metaKey)
                this.$b = this.cb = -1;
        -1 == this.cb && (a.ctrlKey && 17 != a.keyCode ? this.cb = 17 : a.altKey && 18 != a.keyCode ? this.cb = 18 : a.metaKey && 91 != a.keyCode && (this.cb = 91));
        kf(a.keyCode, this.cb, a.shiftKey, a.ctrlKey, a.altKey, a.metaKey) ? (this.$b = mf(a.keyCode),
        wf && (this.lf = a.altKey)) : this.handleEvent(a)
    }
    ;
    k.ej = function(a) {
        this.$b = this.cb = -1;
        this.lf = a.altKey
    }
    ;
    k.handleEvent = function(a) {
        var b = a.ja
          , c = b.altKey;
        if (H && "keypress" == a.type) {
            var d = this.$b;
            var e = 13 != d && 27 != d ? b.keyCode : 0
        } else
            (Jb || Gb) && "keypress" == a.type ? (d = this.$b,
            e = 0 <= b.charCode && 63232 > b.charCode && lf(d) ? b.charCode : 0) : ("keypress" == a.type ? (wf && (c = this.lf),
            b.keyCode == b.charCode ? 32 > b.keyCode ? (d = b.keyCode,
            e = 0) : (d = this.$b,
            e = b.charCode) : (d = b.keyCode || this.$b,
            e = b.charCode || 0)) : (d = b.keyCode || this.$b,
            e = b.charCode || 0),
            Kb && 63 == e && 224 == d && (d = 191));
        var f = d = mf(d);
        d ? 63232 <= d && d in uf ? f = uf[d] : 25 == d && a.shiftKey && (f = 9) : b.keyIdentifier && b.keyIdentifier in vf && (f = vf[b.keyIdentifier]);
        if (!Ib || "keypress" != a.type || kf(f, this.cb, a.shiftKey, a.ctrlKey, c, a.metaKey))
            a = f == this.cb,
            this.cb = f,
            b = new of(f,e,a,b),
            b.altKey = c,
            this.dispatchEvent(b)
    }
    ;
    k.o = function() {
        return this.s
    }
    ;
    function tf(a, b, c) {
        a.Le && xf(a);
        a.s = b;
        a.Ke = Q(a.s, "keypress", a, c);
        a.Of = Q(a.s, "keydown", a.ji, c, a);
        a.Le = Q(a.s, "keyup", a.ej, c, a)
    }
    function xf(a) {
        a.Ke && (gf(a.Ke),
        gf(a.Of),
        gf(a.Le),
        a.Ke = null,
        a.Of = null,
        a.Le = null);
        a.s = null;
        a.cb = -1;
        a.$b = -1
    }
    k.D = function() {
        sf.M.D.call(this);
        xf(this)
    }
    ;
    function yf(a, b, c, d) {
        this.top = a;
        this.right = b;
        this.bottom = c;
        this.left = d
    }
    k = yf.prototype;
    k.$ = function() {
        return this.right - this.left
    }
    ;
    k.Z = function() {
        return this.bottom - this.top
    }
    ;
    k.contains = function(a) {
        return this && a ? a instanceof yf ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom : !1
    }
    ;
    k.ceil = function() {
        this.top = Math.ceil(this.top);
        this.right = Math.ceil(this.right);
        this.bottom = Math.ceil(this.bottom);
        this.left = Math.ceil(this.left);
        return this
    }
    ;
    k.floor = function() {
        this.top = Math.floor(this.top);
        this.right = Math.floor(this.right);
        this.bottom = Math.floor(this.bottom);
        this.left = Math.floor(this.left);
        return this
    }
    ;
    k.round = function() {
        this.top = Math.round(this.top);
        this.right = Math.round(this.right);
        this.bottom = Math.round(this.bottom);
        this.left = Math.round(this.left);
        return this
    }
    ;
    k.translate = function(a, b) {
        a instanceof gd ? (this.left += a.x,
        this.right += a.x,
        this.top += a.y,
        this.bottom += a.y) : (this.left += a,
        this.right += a,
        "number" === typeof b && (this.top += b,
        this.bottom += b));
        return this
    }
    ;
    function zf(a, b, c, d) {
        this.left = a;
        this.top = b;
        this.width = c;
        this.height = d
    }
    k = zf.prototype;
    k.sd = function(a) {
        var b = Math.max(this.left, a.left)
          , c = Math.min(this.left + this.width, a.left + a.width);
        if (b <= c) {
            var d = Math.max(this.top, a.top);
            a = Math.min(this.top + this.height, a.top + a.height);
            if (d <= a)
                return this.left = b,
                this.top = d,
                this.width = c - b,
                this.height = a - d,
                !0
        }
        return !1
    }
    ;
    k.contains = function(a) {
        return a instanceof gd ? a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height : this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height
    }
    ;
    k.getSize = function() {
        return new J(this.width,this.height)
    }
    ;
    k.ceil = function() {
        this.left = Math.ceil(this.left);
        this.top = Math.ceil(this.top);
        this.width = Math.ceil(this.width);
        this.height = Math.ceil(this.height);
        return this
    }
    ;
    k.floor = function() {
        this.left = Math.floor(this.left);
        this.top = Math.floor(this.top);
        this.width = Math.floor(this.width);
        this.height = Math.floor(this.height);
        return this
    }
    ;
    k.round = function() {
        this.left = Math.round(this.left);
        this.top = Math.round(this.top);
        this.width = Math.round(this.width);
        this.height = Math.round(this.height);
        return this
    }
    ;
    k.translate = function(a, b) {
        a instanceof gd ? (this.left += a.x,
        this.top += a.y) : (this.left += a,
        "number" === typeof b && (this.top += b));
        return this
    }
    ;
    function R(a, b, c) {
        if ("string" === typeof b)
            (b = Af(a, b)) && (a.style[b] = c);
        else
            for (var d in b) {
                c = a;
                var e = b[d]
                  , f = Af(c, d);
                f && (c.style[f] = e)
            }
    }
    var Bf = {};
    function Af(a, b) {
        var c = Bf[b];
        if (!c) {
            var d = nd(b);
            c = d;
            void 0 === a.style[d] && (d = (Jb ? "Webkit" : Ib ? "Moz" : H ? "ms" : null) + pd(d),
            void 0 !== a.style[d] && (c = d));
            Bf[b] = c
        }
        return c
    }
    function Cf(a, b) {
        var c = td(a);
        return c.defaultView && c.defaultView.getComputedStyle && (a = c.defaultView.getComputedStyle(a, null)) ? a[b] || a.getPropertyValue(b) || "" : ""
    }
    function Df(a, b) {
        return Cf(a, b) || (a.currentStyle ? a.currentStyle[b] : null) || a.style && a.style[b]
    }
    function Ef(a) {
        return Df(a, "position")
    }
    function Ff(a, b, c) {
        if (b instanceof gd) {
            var d = b.x;
            b = b.y
        } else
            d = b,
            b = c;
        a.style.left = Gf(d, !1);
        a.style.top = Gf(b, !1)
    }
    function Hf(a) {
        a = a ? td(a) : document;
        return !H || Yb(9) || Ed(rd(a).g) ? a.documentElement : a.body
    }
    function If(a) {
        var b = a.body;
        a = a.documentElement;
        return new gd(b.scrollLeft || a.scrollLeft,b.scrollTop || a.scrollTop)
    }
    function Jf(a) {
        try {
            return a.getBoundingClientRect()
        } catch (b) {
            return {
                left: 0,
                top: 0,
                right: 0,
                bottom: 0
            }
        }
    }
    function Kf(a) {
        if (H && !Yb(8))
            return a.offsetParent;
        var b = td(a)
          , c = Df(a, "position")
          , d = "fixed" == c || "absolute" == c;
        for (a = a.parentNode; a && a != b; a = a.parentNode)
            if (11 == a.nodeType && a.host && (a = a.host),
            c = Df(a, "position"),
            d = d && "static" == c && a != b.documentElement && a != b.body,
            !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c))
                return a;
        return null
    }
    function Lf(a) {
        for (var b = new yf(0,Infinity,Infinity,0), c = rd(a), d = c.g.body, e = c.g.documentElement, f = Gd(c.g); a = Kf(a); )
            if (!(H && 0 == a.clientWidth || Jb && 0 == a.clientHeight && a == d) && a != d && a != e && "visible" != Df(a, "overflow")) {
                var g = Mf(a)
                  , h = new gd(a.clientLeft,a.clientTop);
                g.x += h.x;
                g.y += h.y;
                b.top = Math.max(b.top, g.y);
                b.right = Math.min(b.right, g.x + a.clientWidth);
                b.bottom = Math.min(b.bottom, g.y + a.clientHeight);
                b.left = Math.max(b.left, g.x)
            }
        d = f.scrollLeft;
        f = f.scrollTop;
        b.left = Math.max(b.left, d);
        b.top = Math.max(b.top, f);
        c = Dd(Hd(c.g));
        b.right = Math.min(b.right, d + c.width);
        b.bottom = Math.min(b.bottom, f + c.height);
        return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : null
    }
    function Mf(a) {
        var b = td(a)
          , c = new gd(0,0)
          , d = Hf(b);
        if (a == d)
            return c;
        a = Jf(a);
        b = Fd(rd(b).g);
        c.x = a.left + b.x;
        c.y = a.top + b.y;
        return c
    }
    function Nf(a, b) {
        a = Of(a);
        b = Of(b);
        return new gd(a.x - b.x,a.y - b.y)
    }
    function Pf(a) {
        a = Jf(a);
        return new gd(a.left,a.top)
    }
    function Of(a) {
        if (1 == a.nodeType)
            return Pf(a);
        a = a.changedTouches ? a.changedTouches[0] : a;
        return new gd(a.clientX,a.clientY)
    }
    function Qf(a, b, c) {
        if (b instanceof J)
            c = b.height,
            b = b.width;
        else if (void 0 == c)
            throw Error("missing height argument");
        a.style.width = Gf(b, !0);
        a.style.height = Gf(c, !0)
    }
    function Gf(a, b) {
        "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
        return a
    }
    function Rf(a) {
        var b = Sf;
        if ("none" != Df(a, "display"))
            return b(a);
        var c = a.style
          , d = c.display
          , e = c.visibility
          , f = c.position;
        c.visibility = "hidden";
        c.position = "absolute";
        c.display = "inline";
        a = b(a);
        c.display = d;
        c.position = f;
        c.visibility = e;
        return a
    }
    function Sf(a) {
        var b = a.offsetWidth
          , c = a.offsetHeight
          , d = Jb && !b && !c;
        return (void 0 === b || d) && a.getBoundingClientRect ? (a = Jf(a),
        new J(a.right - a.left,a.bottom - a.top)) : new J(b,c)
    }
    function Tf(a, b) {
        a = a.style;
        "opacity"in a ? a.opacity = b : "MozOpacity"in a ? a.MozOpacity = b : "filter"in a && (a.filter = "" === b ? "" : "alpha(opacity=" + 100 * Number(b) + ")")
    }
    function T(a, b) {
        a.style.display = b ? "" : "none"
    }
    function Uf(a) {
        return "rtl" == Df(a, "direction")
    }
    var Vf = Ib ? "MozUserSelect" : Jb || Gb ? "WebkitUserSelect" : null;
    function Wf(a, b, c) {
        c = c ? null : a.getElementsByTagName("*");
        if (Vf) {
            if (b = b ? "none" : "",
            a.style && (a.style[Vf] = b),
            c) {
                a = 0;
                for (var d; d = c[a]; a++)
                    d.style && (d.style[Vf] = b)
            }
        } else if (H && (b = b ? "on" : "",
        a.setAttribute("unselectable", b),
        c))
            for (a = 0; d = c[a]; a++)
                d.setAttribute("unselectable", b)
    }
    function Xf(a, b) {
        if (/^\d+px?$/.test(b))
            return parseInt(b, 10);
        var c = a.style.left
          , d = a.runtimeStyle.left;
        a.runtimeStyle.left = a.currentStyle.left;
        a.style.left = b;
        b = a.style.pixelLeft;
        a.style.left = c;
        a.runtimeStyle.left = d;
        return +b
    }
    function Yf(a, b) {
        return (b = a.currentStyle ? a.currentStyle[b] : null) ? Xf(a, b) : 0
    }
    function Zf(a) {
        if (H) {
            var b = Yf(a, "paddingLeft")
              , c = Yf(a, "paddingRight")
              , d = Yf(a, "paddingTop");
            a = Yf(a, "paddingBottom");
            return new yf(d,c,a,b)
        }
        b = Cf(a, "paddingLeft");
        c = Cf(a, "paddingRight");
        d = Cf(a, "paddingTop");
        a = Cf(a, "paddingBottom");
        return new yf(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
    }
    var ag = {
        thin: 2,
        medium: 4,
        thick: 6
    };
    function bg(a, b) {
        if ("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : null))
            return 0;
        b = a.currentStyle ? a.currentStyle[b + "Width"] : null;
        return b in ag ? ag[b] : Xf(a, b)
    }
    function cg(a) {
        if (H && !Yb(9)) {
            var b = bg(a, "borderLeft")
              , c = bg(a, "borderRight")
              , d = bg(a, "borderTop");
            a = bg(a, "borderBottom");
            return new yf(d,c,a,b)
        }
        b = Cf(a, "borderLeftWidth");
        c = Cf(a, "borderRightWidth");
        d = Cf(a, "borderTopWidth");
        a = Cf(a, "borderBottomWidth");
        return new yf(parseFloat(d),parseFloat(c),parseFloat(a),parseFloat(b))
    }
    var dg = /[^\d]+$/
      , eg = {
        cm: 1,
        "in": 1,
        mm: 1,
        pc: 1,
        pt: 1
    }
      , fg = {
        em: 1,
        ex: 1
    };
    function gg() {
        var a = document.body
          , b = Df(a, "fontSize");
        var c = (c = b.match(dg)) && c[0] || null;
        if (b && "px" == c)
            return parseInt(b, 10);
        if (H) {
            if (String(c)in eg)
                return Xf(a, b);
            if (a.parentNode && 1 == a.parentNode.nodeType && String(c)in fg)
                return a = a.parentNode,
                c = Df(a, "fontSize"),
                Xf(a, b == c ? "1em" : b)
        }
        c = K("SPAN", {
            style: "visibility:hidden;position:absolute;line-height:0;padding:0;margin:0;border:0;height:1em;"
        });
        a.appendChild(c);
        b = c.offsetHeight;
        Qd(c);
        return b
    }
    ;var hg = function() {
        if (Lb) {
            var a = /Windows NT ([0-9.]+)/;
            return (a = a.exec(qb())) ? a[1] : "0"
        }
        return Kb ? (a = /1[0|1][_.][0-9_.]+/,
        (a = a.exec(qb())) ? a[0].replace(/_/g, ".") : "10") : Nb ? (a = /Android\s+([^\);]+)(\)|;)/,
        (a = a.exec(qb())) ? a[1] : "") : Ob || Pb || Qb ? (a = /(?:iPhone|CPU)\s+OS\s+(\S+)/,
        (a = a.exec(qb())) ? a[1].replace(/_/g, ".") : "") : ""
    }();
    var ig = tb()
      , jg = zb() || F("iPod")
      , kg = F("iPad")
      , lg = wb()
      , mg = vb()
      , ng = ub() && !Ab();
    function og(a) {
        return (a = a.exec(qb())) ? a[1] : ""
    }
    var pg = function() {
        if (ig)
            return og(/Firefox\/([0-9.]+)/);
        if (H || Gb || Fb)
            return Tb;
        if (mg) {
            if (Ab() || F("Macintosh")) {
                var a = og(/CriOS\/([0-9.]+)/);
                if (a)
                    return a
            }
            return og(/Chrome\/([0-9.]+)/)
        }
        if (ng && !Ab())
            return og(/Version\/([0-9.]+)/);
        if (jg || kg) {
            if (a = /Version\/(\S+).*Mobile\/(\S+)/.exec(qb()))
                return a[1] + "." + a[2]
        } else if (lg)
            return (a = og(/Android\s+([0-9.]+)/)) ? a : og(/Version\/([0-9.]+)/);
        return ""
    }();
    function qg(a) {
        return 0 <= ob(pg, a)
    }
    ;function rg(a) {
        var b = a.offsetLeft
          , c = a.offsetParent;
        c || "fixed" != Ef(a) || (c = td(a).documentElement);
        if (!c)
            return b;
        if (Ib && !Xb()) {
            var d = cg(c);
            b += d.left
        } else
            Yb(8) && !Yb(9) && (d = cg(c),
            b -= d.left);
        return Uf(c) ? c.clientWidth - (b + a.offsetWidth) : b
    }
    ;function sg(a, b, c, d, e, f, g, h, l) {
        var m = tg(c);
        var n = Mf(a);
        var q = Rf(a);
        n = new zf(n.x,n.y,q.width,q.height);
        (q = Lf(a)) && n.sd(new zf(q.left,q.top,q.right - q.left,q.bottom - q.top));
        q = rd(a);
        var p = rd(c);
        if (q.g != p.g) {
            var u = q.g.body;
            p = Hd(p.g);
            var x = new gd(0,0)
              , B = Id(td(u));
            if (Cb(B, "parent")) {
                var E = u;
                do {
                    var I = B == p ? Mf(E) : Pf(E);
                    x.x += I.x;
                    x.y += I.y
                } while (B && B != p && B != B.parent && (E = B.frameElement) && (B = B.parent))
            }
            u = hd(x, Mf(u));
            !H || Yb(9) || Ed(q.g) || (u = hd(u, Fd(q.g)));
            n.left += u.x;
            n.top += u.y
        }
        a = ug(a, b);
        b = n.left;
        a & 4 ? b += n.width : a & 2 && (b += n.width / 2);
        b = new gd(b,n.top + (a & 1 ? n.height : 0));
        b = hd(b, m);
        e && (b.x += (a & 4 ? -1 : 1) * e.x,
        b.y += (a & 1 ? -1 : 1) * e.y);
        if (g)
            if (l)
                var G = l;
            else if (G = Lf(c))
                G.top -= m.y,
                G.right -= m.x,
                G.bottom -= m.y,
                G.left -= m.x;
        return vg(b, c, d, f, G, g, h)
    }
    function tg(a) {
        if (a = a.offsetParent) {
            var b = "HTML" == a.tagName || "BODY" == a.tagName;
            if (!b || "static" != Ef(a)) {
                var c = Mf(a);
                if (!b) {
                    b = Uf(a);
                    var d;
                    if (d = b) {
                        d = ng && qg(10);
                        var e = Rb && 0 <= ob(hg, 10)
                          , f = mg && qg(85);
                        d = Ib || d || e || f
                    }
                    b = d ? -a.scrollLeft : b && !Hb && "visible" != Df(a, "overflowX") ? a.scrollWidth - a.clientWidth - a.scrollLeft : a.scrollLeft;
                    c = hd(c, new gd(b,a.scrollTop))
                }
            }
        }
        return c || new gd
    }
    function vg(a, b, c, d, e, f, g) {
        a = a.ef();
        var h = ug(b, c);
        c = Rf(b);
        g = g ? new J(g.width,g.height) : new J(c.width,c.height);
        a = a.ef();
        g = new J(g.width,g.height);
        var l = 0;
        if (d || 0 != h)
            h & 4 ? a.x -= g.width + (d ? d.right : 0) : h & 2 ? a.x -= g.width / 2 : d && (a.x += d.left),
            h & 1 ? a.y -= g.height + (d ? d.bottom : 0) : d && (a.y += d.top);
        if (f) {
            if (e) {
                d = a;
                h = g;
                l = 0;
                65 == (f & 65) && (d.x < e.left || d.x >= e.right) && (f &= -2);
                132 == (f & 132) && (d.y < e.top || d.y >= e.bottom) && (f &= -5);
                d.x < e.left && f & 1 && (d.x = e.left,
                l |= 1);
                if (f & 16) {
                    var m = d.x;
                    d.x < e.left && (d.x = e.left,
                    l |= 4);
                    d.x + h.width > e.right && (h.width = Math.min(e.right - d.x, m + h.width - e.left),
                    h.width = Math.max(h.width, 0),
                    l |= 4)
                }
                d.x + h.width > e.right && f & 1 && (d.x = Math.max(e.right - h.width, e.left),
                l |= 1);
                f & 2 && (l |= (d.x < e.left ? 16 : 0) | (d.x + h.width > e.right ? 32 : 0));
                d.y < e.top && f & 4 && (d.y = e.top,
                l |= 2);
                f & 32 && (m = d.y,
                d.y < e.top && (d.y = e.top,
                l |= 8),
                d.y + h.height > e.bottom && (h.height = Math.min(e.bottom - d.y, m + h.height - e.top),
                h.height = Math.max(h.height, 0),
                l |= 8));
                d.y + h.height > e.bottom && f & 4 && (d.y = Math.max(e.bottom - h.height, e.top),
                l |= 2);
                f & 8 && (l |= (d.y < e.top ? 64 : 0) | (d.y + h.height > e.bottom ? 128 : 0));
                e = l
            } else
                e = 256;
            l = e
        }
        f = new zf(0,0,0,0);
        f.left = a.x;
        f.top = a.y;
        f.width = g.width;
        f.height = g.height;
        e = l;
        if (e & 496)
            return e;
        Ff(b, new gd(f.left,f.top));
        g = f.getSize();
        c == g || c && g && c.width == g.width && c.height == g.height || (c = g,
        b = b.style,
        Ib ? b.MozBoxSizing = "border-box" : Jb ? b.WebkitBoxSizing = "border-box" : b.boxSizing = "border-box",
        b.width = Math.max(c.width, 0) + "px",
        b.height = Math.max(c.height, 0) + "px");
        return e
    }
    function ug(a, b) {
        return (b & 8 && Uf(a) ? b ^ 4 : b) & -9
    }
    ;function wg(a, b) {
        this.i = a;
        this.j = b;
        this.h = 0;
        this.g = null
    }
    wg.prototype.get = function() {
        if (0 < this.h) {
            this.h--;
            var a = this.g;
            this.g = a.next;
            a.next = null
        } else
            a = this.i();
        return a
    }
    ;
    function xg(a, b) {
        a.j(b);
        100 > a.h && (a.h++,
        b.next = a.g,
        a.g = b)
    }
    ;function yg() {
        this.h = this.g = null
    }
    yg.prototype.add = function(a, b) {
        var c = zg.get();
        c.set(a, b);
        this.h ? this.h.next = c : this.g = c;
        this.h = c
    }
    ;
    function Ag() {
        var a = Bg
          , b = null;
        a.g && (b = a.g,
        a.g = a.g.next,
        a.g || (a.h = null),
        b.next = null);
        return b
    }
    var zg = new wg(function() {
        return new Cg
    }
    ,function(a) {
        return a.reset()
    }
    );
    function Cg() {
        this.next = this.g = this.Yb = null
    }
    Cg.prototype.set = function(a, b) {
        this.Yb = a;
        this.g = b;
        this.next = null
    }
    ;
    Cg.prototype.reset = function() {
        this.next = this.g = this.Yb = null
    }
    ;
    var Dg;
    function Eg() {
        var a = A.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && !F("Presto") && (a = function() {
            var e = L("IFRAME");
            e.style.display = "none";
            document.documentElement.appendChild(e);
            var f = e.contentWindow;
            e = f.document;
            e.open();
            e.close();
            var g = "callImmediate" + Math.random()
              , h = "file:" == f.location.protocol ? "*" : f.location.protocol + "//" + f.location.host;
            e = Ja(function(l) {
                if (("*" == h || l.origin == h) && l.data == g)
                    this.port1.onmessage()
            }, this);
            f.addEventListener("message", e, !1);
            this.port1 = {};
            this.port2 = {
                postMessage: function() {
                    f.postMessage(g, h)
                }
            }
        }
        );
        if ("undefined" !== typeof a && !sb()) {
            var b = new a
              , c = {}
              , d = c;
            b.port1.onmessage = function() {
                if (void 0 !== c.next) {
                    c = c.next;
                    var e = c.gh;
                    c.gh = null;
                    e()
                }
            }
            ;
            return function(e) {
                d.next = {
                    gh: e
                };
                d = d.next;
                b.port2.postMessage(0)
            }
        }
        return function(e) {
            A.setTimeout(e, 0)
        }
    }
    ;function Fg(a) {
        A.setTimeout(function() {
            throw a;
        }, 0)
    }
    ;var Gg, Hg = !1, Bg = new yg;
    function Ig(a, b) {
        Gg || Jg();
        Hg || (Gg(),
        Hg = !0);
        Bg.add(a, b)
    }
    function Jg() {
        if (t.Promise && t.Promise.resolve) {
            var a = t.Promise.resolve(void 0);
            Gg = function() {
                a.then(Kg)
            }
        } else
            Gg = function() {
                var b = Kg;
                "function" !== typeof A.setImmediate || A.Window && A.Window.prototype && !F("Edge") && A.Window.prototype.setImmediate == A.setImmediate ? (Dg || (Dg = Eg()),
                Dg(b)) : A.setImmediate(b)
            }
    }
    function Kg() {
        for (var a; a = Ag(); ) {
            try {
                a.Yb.call(a.g)
            } catch (b) {
                Fg(b)
            }
            xg(zg, a)
        }
        Hg = !1
    }
    ;function Lg(a, b) {
        this.g = Mg;
        this.m = void 0;
        this.i = this.h = this.oa = null;
        this.j = this.l = !1;
        if (a != ec)
            try {
                var c = this;
                a.call(b, function(d) {
                    Ng(c, Og, d)
                }, function(d) {
                    Ng(c, Pg, d)
                })
            } catch (d) {
                Ng(this, Pg, d)
            }
    }
    var Mg = 0
      , Og = 2
      , Pg = 3;
    function Qg() {
        this.next = this.context = this.h = this.j = this.g = null;
        this.i = !1
    }
    Qg.prototype.reset = function() {
        this.context = this.h = this.j = this.g = null;
        this.i = !1
    }
    ;
    var Rg = new wg(function() {
        return new Qg
    }
    ,function(a) {
        a.reset()
    }
    );
    function Sg(a, b, c) {
        var d = Rg.get();
        d.j = a;
        d.h = b;
        d.context = c;
        return d
    }
    function Tg(a) {
        if (a instanceof Lg)
            return a;
        var b = new Lg(ec);
        Ng(b, Og, a);
        return b
    }
    function Ug() {
        var a = new Vg(Wg);
        return new Lg(function(b, c) {
            c(a)
        }
        )
    }
    function Xg(a, b, c) {
        Yg(a, b, c, null) || Ig(Ka(b, a))
    }
    function Zg(a) {
        return new Lg(function(b, c) {
            a.length || b(void 0);
            for (var d = 0, e; d < a.length; d++)
                e = a[d],
                Xg(e, b, c)
        }
        )
    }
    function $g(a) {
        return new Lg(function(b, c) {
            var d = a.length
              , e = [];
            if (d)
                for (var f = function(m, n) {
                    d--;
                    e[m] = n;
                    0 == d && b(e)
                }, g = function(m) {
                    c(m)
                }, h = 0, l; h < a.length; h++)
                    l = a[h],
                    Xg(l, Ka(f, h), g);
            else
                b(e)
        }
        )
    }
    Lg.prototype.then = function(a, b, c) {
        return ah(this, "function" === typeof a ? a : null, "function" === typeof b ? b : null, c)
    }
    ;
    Lg.prototype.$goog_Thenable = !0;
    function bh(a, b, c) {
        b = Sg(b, b, c);
        b.i = !0;
        ch(a, b);
        return a
    }
    k = Lg.prototype;
    k.vb = function(a, b) {
        return ah(this, null, a, b)
    }
    ;
    k.ki = Lg.prototype.vb;
    k.cancel = function(a) {
        if (this.g == Mg) {
            var b = new dh(a);
            Ig(function() {
                eh(this, b)
            }, this)
        }
    }
    ;
    function eh(a, b) {
        if (a.g == Mg)
            if (a.oa) {
                var c = a.oa;
                if (c.h) {
                    for (var d = 0, e = null, f = null, g = c.h; g && (g.i || (d++,
                    g.g == a && (e = g),
                    !(e && 1 < d))); g = g.next)
                        e || (f = g);
                    e && (c.g == Mg && 1 == d ? eh(c, b) : (f ? (d = f,
                    d.next == c.i && (c.i = d),
                    d.next = d.next.next) : fh(c),
                    gh(c, e, Pg, b)))
                }
                a.oa = null
            } else
                Ng(a, Pg, b)
    }
    function ch(a, b) {
        a.h || a.g != Og && a.g != Pg || hh(a);
        a.i ? a.i.next = b : a.h = b;
        a.i = b
    }
    function ah(a, b, c, d) {
        var e = Sg(null, null, null);
        e.g = new Lg(function(f, g) {
            e.j = b ? function(h) {
                try {
                    var l = b.call(d, h);
                    f(l)
                } catch (m) {
                    g(m)
                }
            }
            : f;
            e.h = c ? function(h) {
                try {
                    var l = c.call(d, h);
                    void 0 === l && h instanceof dh ? g(h) : f(l)
                } catch (m) {
                    g(m)
                }
            }
            : g
        }
        );
        e.g.oa = a;
        ch(a, e);
        return e.g
    }
    k.Sj = function(a) {
        this.g = Mg;
        Ng(this, Og, a)
    }
    ;
    k.Tj = function(a) {
        this.g = Mg;
        Ng(this, Pg, a)
    }
    ;
    function Ng(a, b, c) {
        a.g == Mg && (a === c && (b = Pg,
        c = new TypeError("Promise cannot resolve to itself")),
        a.g = 1,
        Yg(c, a.Sj, a.Tj, a) || (a.m = c,
        a.g = b,
        a.oa = null,
        hh(a),
        b != Pg || c instanceof dh || ih(a, c)))
    }
    function Yg(a, b, c, d) {
        if (a instanceof Lg)
            return ch(a, Sg(b || ec, c || null, d)),
            !0;
        if (a)
            try {
                var e = !!a.$goog_Thenable
            } catch (g) {
                e = !1
            }
        else
            e = !1;
        if (e)
            return a.then(b, c, d),
            !0;
        if (Da(a))
            try {
                var f = a.then;
                if ("function" === typeof f)
                    return jh(a, f, b, c, d),
                    !0
            } catch (g) {
                return c.call(d, g),
                !0
            }
        return !1
    }
    function jh(a, b, c, d, e) {
        function f(l) {
            h || (h = !0,
            d.call(e, l))
        }
        function g(l) {
            h || (h = !0,
            c.call(e, l))
        }
        var h = !1;
        try {
            b.call(a, g, f)
        } catch (l) {
            f(l)
        }
    }
    function hh(a) {
        a.l || (a.l = !0,
        Ig(a.Vi, a))
    }
    function fh(a) {
        var b = null;
        a.h && (b = a.h,
        a.h = b.next,
        b.next = null);
        a.h || (a.i = null);
        return b
    }
    k.Vi = function() {
        for (var a; a = fh(this); )
            gh(this, a, this.g, this.m);
        this.l = !1
    }
    ;
    function gh(a, b, c, d) {
        if (c == Pg && b.h && !b.i)
            for (; a && a.j; a = a.oa)
                a.j = !1;
        if (b.g)
            b.g.oa = null,
            kh(b, c, d);
        else
            try {
                b.i ? b.j.call(b.context) : kh(b, c, d)
            } catch (e) {
                lh.call(null, e)
            }
        xg(Rg, b)
    }
    function kh(a, b, c) {
        b == Og ? a.j.call(a.context, c) : a.h && a.h.call(a.context, c)
    }
    function ih(a, b) {
        a.j = !0;
        Ig(function() {
            a.j && lh.call(null, b)
        })
    }
    var lh = Fg;
    function dh(a) {
        Na.call(this, a)
    }
    D(dh, Na);
    dh.prototype.name = "cancel";
    var mh, nh, oh;
    function ph(a, b, c) {
        "string" === typeof a && (a = za(a));
        return a.apply(b || {}, c)
    }
    function qh(a) {
        return kd(a)
    }
    function rh() {
        if (void 0 === mh) {
            var a = {};
            try {
                for (var b = A.location.search.substring(1).split("&"), c = 0; c < b.length; c++) {
                    var d = b[c].indexOf("=");
                    0 <= d && (a[b[c].substring(0, d)] = decodeURIComponent(b[c].substring(d + 1)))
                }
            } catch (e) {}
            mh = a
        }
        return mh
    }
    function sh(a) {
        void 0 === nh && (nh = Mc(rh()),
        delete nh.rc,
        delete nh.ac,
        delete nh.am);
        return th(a) ? nh[a] : Mc(nh)
    }
    function uh() {
        var a = rh().rc;
        return a ? a.toLowerCase() : null
    }
    function vh() {
        return "tsj-" + (wh++).toString(36)
    }
    function xh() {
        return vh() + "-" + yh().toString(36) + "-" + Math.floor(Math.random() * v(Number, "MAX_SAFE_INTEGER")).toString(36)
    }
    function zh(a, b) {
        if (null !== a) {
            var c, d, e = function(f, g) {
                if ("object" !== typeof f)
                    if (Array.isArray(f))
                        for (c = 0,
                        d = f.length; c < d; c++)
                            e(f[c], f);
                    else
                        f = b(f, c, g),
                        void 0 !== f && (g[c] = f);
                else
                    for (c in f)
                        e(f[c], f)
            };
            e(a, a)
        }
    }
    function Ah(a, b, c) {
        a = A.open(a, b, c);
        null == a || "close"in a || (a = null);
        null != a && a.focus();
        return a
    }
    function Bh() {
        return !!("ontouchstart"in A || A.TouchEvent)
    }
    function Ch() {
        var a = A.navigator;
        return a.maxTouchPoints || a.msMaxTouchPoints || Ab() ? !0 : A.matchMedia && A.matchMedia("(any-pointer)").matches ? A.matchMedia("(any-pointer:coarse)").matches : Bh()
    }
    function Dh(a, b) {
        return parseInt(a, b || 10)
    }
    function th(a) {
        return void 0 !== a
    }
    function Eh(a) {
        return "string" === typeof a
    }
    function Fh(a) {
        return "number" === typeof a
    }
    var Gh = atob("bm93")
      , yh = A[atob("RGF0ZQ==")][Gh]
      , Hh = A[atob("cGVyZm9ybWFuY2U=")]
      , Ih = Hh && Hh[Gh] ? Hh[Gh].bind(Hh) : void 0;
    function Jh() {
        return Ih()
    }
    var Kh = A[atob("c2V0SW50ZXJ2YWw=")];
    function Lh(a) {
        return Kh.apply(A, arguments)
    }
    var Mh = A[atob("Y2xlYXJJbnRlcnZhbA==")];
    function Nh(a) {
        Mh.call(A, a)
    }
    function Oh() {
        return ["SamsungBrowser/5", "SamsungBrowser/6"]
    }
    var Ph = fc(function() {
        return !!Ua(Oh(), F)
    });
    function Qh(a) {
        return t.Promise.reject(a)
    }
    function Rh(a) {
        return new t.Promise(function(b, c) {
            a.then(b, c)
        }
        )
    }
    function Sh(a) {
        return new Lg(function(b, c) {
            a.then(b, c)
        }
        )
    }
    var Th = fc(function() {
        if ("postMessage"in A)
            try {
                return A.postMessage("t", A.location.href),
                !0
            } catch (a) {}
        return !1
    })
      , wh = 0;
    var Uh = /#(.)(.)(.)/;
    function Vh(a) {
        if (!Wh.test(a))
            throw Error("'" + a + "' is not a valid hex color");
        4 == a.length && (a = a.replace(Uh, "#$1$1$2$2$3$3"));
        a = a.toLowerCase();
        a = parseInt(a.slice(1), 16);
        return [a >> 16, a >> 8 & 255, a & 255]
    }
    function Xh(a) {
        var b = a[0]
          , c = a[1];
        a = a[2];
        b = Number(b);
        c = Number(c);
        a = Number(a);
        if (b != (b & 255) || c != (c & 255) || a != (a & 255))
            throw Error('"(' + b + "," + c + "," + a + '") is not a valid RGB color');
        c = b << 16 | c << 8 | a;
        return 16 > b ? "#" + (16777216 | c).toString(16).slice(1) : "#" + c.toString(16)
    }
    var Wh = /^#(?:[0-9a-f]{3}){1,2}$/i;
    var Yh = !H && !ub();
    function Zh(a, b, c) {
        if (Yh && a.dataset)
            a.dataset[b] = c;
        else {
            if (/-[a-z]/.test(b))
                throw Error("");
            a.setAttribute("data-" + od(b), c)
        }
    }
    function $h(a, b) {
        if (/-[a-z]/.test(b))
            return null;
        if (Yh && a.dataset) {
            if (wb() && !(b in a.dataset))
                return null;
            a = a.dataset[b];
            return void 0 === a ? null : a
        }
        return a.getAttribute("data-" + od(b))
    }
    function ai(a) {
        var b = bi;
        !/-[a-z]/.test(b) && (Yh && a.dataset ? ci(a, b) && delete a.dataset[b] : a.removeAttribute("data-" + od(b)))
    }
    function ci(a, b) {
        return /-[a-z]/.test(b) ? !1 : Yh && a.dataset ? b in a.dataset : a.hasAttribute ? a.hasAttribute("data-" + od(b)) : !!a.getAttribute("data-" + od(b))
    }
    ;function U(a) {
        M.call(this);
        this.h = a;
        this.g = {}
    }
    D(U, M);
    var di = [];
    k = U.prototype;
    k.C = function(a, b, c, d) {
        return ei(this, a, b, c, d)
    }
    ;
    function ei(a, b, c, d, e, f) {
        Array.isArray(c) || (c && (di[0] = c.toString()),
        c = di);
        for (var g = 0; g < c.length; g++) {
            var h = Q(b, c[g], d || a.handleEvent, e || !1, f || a.h || a);
            if (!h)
                break;
            a.g[h.key] = h
        }
        return a
    }
    k.tc = function(a, b, c, d) {
        return fi(this, a, b, c, d)
    }
    ;
    function fi(a, b, c, d, e, f) {
        if (Array.isArray(c))
            for (var g = 0; g < c.length; g++)
                fi(a, b, c[g], d, e, f);
        else {
            b = Ze(b, c, d || a.handleEvent, e, f || a.h || a);
            if (!b)
                return a;
            a.g[b.key] = b
        }
        return a
    }
    k.ma = function(a, b, c, d, e) {
        if (Array.isArray(b))
            for (var f = 0; f < b.length; f++)
                this.ma(a, b[f], c, d, e);
        else
            c = c || this.handleEvent,
            d = Da(d) ? !!d.capture : !!d,
            e = e || this.h || this,
            c = $e(c),
            d = !!d,
            b = Pe(a) ? a.Rd(b, c, d, e) : a ? (a = bf(a)) ? a.Rd(b, c, d, e) : null : null,
            b && (gf(b),
            delete this.g[b.key]);
        return this
    }
    ;
    function gi(a) {
        Ic(a.g, function(b, c) {
            this.g.hasOwnProperty(c) && gf(b)
        }, a);
        a.g = {}
    }
    k.D = function() {
        U.M.D.call(this);
        gi(this)
    }
    ;
    k.handleEvent = function() {
        throw Error("EventHandler.handleEvent not implemented");
    }
    ;
    function hi(a) {
        ii().then(function() {
            a()
        })
    }
    var ji = {
        $g: 1,
        hi: 2
    }
      , ki = new t.Map;
    (function() {
        function a() {
            e.G();
            b.get(ji.hi)();
            b.get(ji.$g)()
        }
        var b = new t.Map, c = {}, d;
        for (d in ji)
            c = {
                priority: c.priority
            },
            c.priority = ji[d],
            ki.set(c.priority, new t.Promise(function(f) {
                return function(g) {
                    b.set(f.priority, g)
                }
            }(c)));
        var e = (new U).C(document, "DOMContentLoaded", a).C(A, "load", a)
    }
    )();
    function ii() {
        var a = void 0 === a ? ji.$g : a;
        return ki.get(a)
    }
    new t.Promise(function(a) {
        Ze(A, "load", function() {
            a()
        })
    }
    );
    function li(a) {
        var b = 0;
        (function() {
            Q(a, "touchstart", function(c) {
                var d = c.ja;
                1 === d.touches.length && (d = d.timeStamp,
                500 > d - b && c.preventDefault(),
                b = d)
            })
        }
        )()
    }
    var mi = Ke ? {
        passive: !1
    } : !1
      , ni = Ke ? {
        passive: !0
    } : !1;
    var oi, pi, qi;
    function V(a) {
        var b = ri(a);
        if (b && "string" === typeof b)
            return b;
        b = a.indexOf("\u0004");
        return 0 <= b ? a.substring(b + 1) : a
    }
    var si = {
        notation: "compact",
        compactDisplay: "short"
    };
    function ti(a) {
        return a ? qi || (qi = new Intl.NumberFormat(oi || "en",si)) : pi || (pi = new Intl.NumberFormat(oi || "en"))
    }
    var ui = fc(function() {
        try {
            return Intl && Intl.NumberFormat && ti(!0).format(1E6) !== ti().format(1E6)
        } catch (a) {
            return !1
        }
    });
    function vi(a, b) {
        if (ui())
            return ti(b).format(a);
        if (b) {
            b = ["K", "M", "G", "T"];
            a = Math.round(a);
            var c = Math.min(Math.floor((Math.abs(a).toString().length - 1) / 3), b.length)
              , d = Math.pow(1E3, c);
            return (a / d).toFixed(a % d ? 1 : 0) + (c ? b[c - 1] : "")
        }
        return a.toString()
    }
    function ri(a) {
        var b = A.tibol10n;
        return b ? b[a] : void 0
    }
    function wi(a, b, c) {
        try {
            var d = ri(a);
            if (d) {
                var e = ri("_plural_forms_func")(c);
                "boolean" === typeof e && (e = e ? 1 : 0);
                return d[e] || b
            }
        } catch (f) {}
        return 1 === c ? a : b
    }
    ;function xi(a, b) {
        var c = /%(?:([1-9]\d*)\$)?([0])?(\d+)?(?:\.(\d+))?([sdf%])/g, d = [], e, f;
        if (f = c.exec(a)) {
            b = b || [];
            var g = 1;
            for (e = 0; ; ) {
                var h = a.substring(e, f ? f.index : a.length);
                h.length && (d.length && Eh(d[d.length - 1]) ? d[d.length - 1] += h : d.push(h));
                if (f) {
                    e = f.index + f[0].length;
                    var l = f[1] || void 0
                      , m = f[2] || void 0
                      , n = f[3] || void 0;
                    h = f[4] || void 0;
                    var q = f[5];
                    f = " ";
                    if ("%" === q)
                        h = "%";
                    else {
                        l = (l ? Dh(l) : g++) - 1;
                        void 0 !== n && (void 0 !== m && (f = "0"),
                        n = Dh(n));
                        m = b[l];
                        switch (q) {
                        case "d":
                            h = "" + m;
                            break;
                        case "s":
                            h = m;
                            break;
                        case "f":
                            h = void 0 !== h ? m.toFixed(h) : "" + m;
                            break;
                        default:
                            h = ""
                        }
                        void 0 !== n && (h = v(h, "padStart").call(h, n, f))
                    }
                } else
                    break;
                if ("string" !== typeof h || h.length)
                    Eh(h) && d.length && Eh(d[d.length - 1]) ? d[d.length - 1] += h : d.push(h);
                f = c.exec(a)
            }
        } else
            d.push(a);
        return d
    }
    function yi(a, b) {
        var c = xi(a, Array.prototype.slice.call(arguments, 1)), d = "", e;
        for (e = 0; e < c.length; e++)
            d += c[e];
        return d
    }
    ;function zi(a, b) {
        qf.call(this);
        this.g = a || 1;
        this.h = b || A;
        this.i = Ja(this.Rj, this);
        this.j = La()
    }
    D(zi, qf);
    k = zi.prototype;
    k.Xc = !1;
    k.wb = null;
    function Ai(a, b) {
        a.g = b;
        a.wb && a.Xc ? (a.stop(),
        a.start()) : a.wb && a.stop()
    }
    k.Rj = function() {
        if (this.Xc) {
            var a = La() - this.j;
            0 < a && a < .8 * this.g ? this.wb = this.h.setTimeout(this.i, this.g - a) : (this.wb && (this.h.clearTimeout(this.wb),
            this.wb = null),
            this.dispatchEvent("tick"),
            this.Xc && (this.stop(),
            this.start()))
        }
    }
    ;
    k.start = function() {
        this.Xc = !0;
        this.wb || (this.wb = this.h.setTimeout(this.i, this.g),
        this.j = La())
    }
    ;
    k.stop = function() {
        this.Xc = !1;
        this.wb && (this.h.clearTimeout(this.wb),
        this.wb = null)
    }
    ;
    k.D = function() {
        zi.M.D.call(this);
        this.stop();
        delete this.h
    }
    ;
    function Bi(a, b, c) {
        if ("function" === typeof a)
            c && (a = Ja(a, c));
        else if (a && "function" == typeof a.handleEvent)
            a = Ja(a.handleEvent, a);
        else
            throw Error("Invalid listener argument");
        return 2147483647 < Number(b) ? -1 : A.setTimeout(a, b || 0)
    }
    function Ci(a) {
        A.clearTimeout(a)
    }
    function Di(a, b) {
        var c = null;
        return (new Lg(function(d, e) {
            c = Bi(function() {
                d(b)
            }, a);
            -1 == c && e(Error("Failed to schedule timer."))
        }
        )).vb(function(d) {
            Ci(c);
            throw d;
        })
    }
    ;function Ei(a, b, c) {
        M.call(this);
        c = c || {};
        this.V = c.he || 6E4;
        this.F = c.pg;
        this.u = c.pj || 1;
        this.K = c.qj || 6E4;
        this.i = c.Ck;
        this.N = a;
        this.l = b
    }
    z(Ei, M);
    k = Ei.prototype;
    k.start = function() {
        this.h = this.V;
        var a = 0;
        void 0 !== this.i && this.h >= this.i ? this.stop() : (this.g || (this.g = new zi,
        N(this, this.g),
        Q(this.g, "tick", function() {
            if (this.m || !document.hidden)
                void 0 !== this.F && a >= this.F ? this.stop() : (this.update(),
                a++);
            1 !== this.u && (this.h = Math.min(this.u * this.h, Math.max(this.K, this.i || 0)),
            void 0 !== this.i && this.h >= this.i ? this.stop() : (this.h = Math.round(this.h),
            this.h !== this.g.g && Ai(this.g, this.h)))
        }, !1, this)),
        Ai(this.g, this.h),
        this.j || (this.j = Q(document, "visibilitychange", this.Uj, !1, this)),
        this.v = yh(),
        this.g.start())
    }
    ;
    k.stop = function() {
        gf(this.j);
        this.j = null;
        this.g && this.g.stop()
    }
    ;
    k.update = function() {
        this.v = yh();
        this.N.call(this.l || void 0)
    }
    ;
    k.D = function() {
        this.stop();
        this.l = void 0;
        M.prototype.D.call(this)
    }
    ;
    k.Uj = function(a) {
        this.g && !a.target.hidden && yh() - this.v > this.h && this.g.Xc && (this.g.stop(),
        this.update(),
        this.g.start())
    }
    ;
    var Fi, Gi, Hi;
    function Ii(a, b, c) {
        switch (c) {
        case 0:
            b = b ? wi("in %d minute", "in %d minutes", a) : wi("%d minute ago", "%d minutes ago", a);
            break;
        case 1:
            b = b ? wi("in %d hour", "in %d hours", a) : wi("%d hour ago", "%d hours ago", a);
            break;
        case 2:
            b = b ? wi("in %d day", "in %d days", a) : b = wi("%d day ago", "%d days ago", a);
            break;
        default:
            b = ""
        }
        return yi(b, a)
    }
    function Ji(a) {
        if (!th(Fi))
            try {
                var b = [oi || "en"]
                  , c = window.navigator.language;
                c && b[0] != c && b.push(c);
                Fi = new A.Intl.DateTimeFormat(b,{
                    year: "numeric",
                    month: "short",
                    day: "numeric"
                })
            } catch (f) {
                Fi = null
            }
        try {
            var d = new Date(a);
            var e = Fi ? Fi.format(d) : d.toLocaleDateString(oi || "en", {
                year: "numeric",
                month: "short",
                day: "numeric"
            });
            18 < e.length && "en" === (oi || "en") && (e = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear())
        } catch (f) {
            e = "long ago"
        }
        return e
    }
    function Ki(a) {
        function b(c) {
            return 10 > c ? "0" + c : c
        }
        a = new Date(1E3 * a);
        return "toISOString"in a ? a.toISOString() : a.getUTCFullYear() + "-" + b(a.getUTCMonth() + 1) + "-" + b(a.getUTCDate()) + "T" + b(a.getUTCHours()) + ":" + b(a.getUTCMinutes()) + ":" + b(a.getUTCSeconds()) + "Z"
    }
    function Li(a, b) {
        b *= 1E3;
        var c = Mi()
          , d = Math.round((c - b) / 6E4);
        var e = !1;
        0 > d && (e = !0,
        d *= -1);
        60 > d ? e = Ii(d, e, 0) : (d = Math.round(d / 60),
        24 > d ? e = Ii(d, e, 1) : (c = new Date(c),
        c.setHours(0),
        c.setMinutes(0),
        c.setSeconds(0),
        c.setMilliseconds(0),
        d = Math.ceil((c.getTime() - b) / 864E5),
        e && (d *= -1),
        e = 14 > d ? Ii(d, e, 2) : ""));
        Vd(a, e || Ji(b))
    }
    function Ni(a, b) {
        try {
            Bd(a, {
                title: (new Date(1E3 * b)).toString()
            })
        } catch (c) {}
    }
    function Oi(a, b) {
        Ni(a, b);
        Li(a, b);
        Gi || (Gi = new Ei(function() {
            Pi("ts-reltime", document.body, Li)
        }
        ),
        Gi.start())
    }
    function Qi(a, b) {
        Ni(a, b);
        Vd(a, Ji(1E3 * b))
    }
    function Ri(a, b) {
        b = K("TIME", b);
        Bd(b, {
            datetime: Ki(a)
        });
        Zh(b, "timestamp", "" + Math.round(a));
        O(b, "ts-reltime");
        Oi(b, a);
        return b
    }
    function Pi(a, b, c) {
        a = wd("TIME", a, b);
        b = a.length;
        for (var d = 0; d < b; d++) {
            var e = a[d]
              , f = parseInt($h(e, "timestamp"), 10);
            c(e, f)
        }
    }
    function Si(a) {
        Pi("ts-reltime", a, Oi);
        Pi("ts-abstime", a, Qi);
        return new M
    }
    function Mi() {
        return yh() + (Hi || 0)
    }
    ;var Ti;
    function Ui(a, b, c) {
        if (Ti) {
            c = c || (b ? Vi : Wi);
            b instanceof Error || (b = void 0);
            for (var d = y(Ti), e = d.next(); !e.done; e = d.next())
                e.value.log(a, b, c)
        }
    }
    function W(a, b) {
        Ui(a, b, Vi)
    }
    function Xi(a, b) {
        Ui(a, b, Yi)
    }
    function Zi(a) {
        Ui(a, void 0, Wi)
    }
    function $i(a) {
        Ti || (Ti = []);
        Ti.push(a)
    }
    var Vi = "error"
      , Yi = "warning"
      , Wi = "info";
    function aj() {}
    var bj;
    aj.prototype.log = function(a, b, c) {
        try {
            switch (c) {
            case Vi:
                void 0 === b ? console.error(a) : console.error(a, b);
                break;
            case Yi:
                void 0 === b ? console.warn(a) : console.warn(a, b);
                break;
            default:
                this.g && (void 0 === b ? console.log(a) : console.log(a, b))
            }
        } catch (d) {}
    }
    ;
    function cj(a) {
        this.h = Mi();
        this.g = "log start time: " + this.h / 1E3 + "\n\n";
        this.i = a
    }
    cj.prototype.log = function(a, b, c) {
        var d = this.g;
        "string" !== typeof a && (a = Array.isArray(a) ? ye(a) : Da(a) ? xe(a) : String(a));
        this.g = d + (a + "; time: +" + (Mi() - this.h) / 1E3 + "\n\n");
        b && (this.g += xe(ze(b)) + "\n\n");
        if (c === Vi) {
            if (c = b)
                c = b.message,
                c = v(c, "startsWith").call(c, "out of memory") || v(c, "startsWith").call(c, "There is not enough space on the disk") || v(c, "startsWith").call(c, "There is insufficient disk space to complete operation") || "NS_ERROR_OUT_OF_MEMORY" === c || "uncaught exception: out of memory" === c;
            if (c)
                this.g += "An marginal error was not reported.\n\n",
                console.info("An marginal error was not reported.");
            else {
                try {
                    var e = Dd()
                      , f = wd("SCRIPT");
                    this.g += "URL: " + A.location.href + "\nwindow.screen: " + A.screen.width + "x" + A.screen.height + "\nViewport: " + e.width + "x" + e.height + "\nNum. of scripts: " + f.length + "\n\n";
                    b || (this.g += "Browser stack:\n" + De() + "\n\n");
                    for (b = 0; b < f.length; b++) {
                        var g = f[b].src;
                        if (g)
                            this.g += "\t" + g + "\n";
                        else {
                            var h = f[b].innerHTML
                              , l = h.length;
                            128 < l && (h = h.substring(0, 128) + "... (" + l + " chars)");
                            this.g += "<script>\n" + h + "\n\x3c/script>\n\n"
                        }
                    }
                } catch (m) {
                    this.g += "Cannot expose details."
                }
                this.i && (this.j || (this.j = Mi() + "_" + ~~(1E6 * Math.random()),
                this.l = 1),
                1 === this.l && (this.i("---- report #" + this.j + " / " + this.l++ + "\n\n" + this.g),
                this.g = ""))
            }
        }
    }
    ;
    var dj = A.JSON.stringify;
    var ej = A.JSON.parse;
    function fj() {}
    fj.prototype.g = null;
    function gj(a) {
        var b;
        (b = a.g) || (b = {},
        hj(a) && (b[0] = !0,
        b[1] = !0),
        b = a.g = b);
        return b
    }
    ;var ij;
    function jj() {}
    D(jj, fj);
    function kj(a) {
        return (a = hj(a)) ? new ActiveXObject(a) : new XMLHttpRequest
    }
    function hj(a) {
        if (!a.h && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
            for (var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0; c < b.length; c++) {
                var d = b[c];
                try {
                    return new ActiveXObject(d),
                    a.h = d
                } catch (e) {}
            }
            throw Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed");
        }
        return a.h
    }
    ij = new jj;
    var lj = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");
    function mj(a) {
        return a ? decodeURI(a) : a
    }
    function nj(a, b) {
        if (a) {
            a = a.split("&");
            for (var c = 0; c < a.length; c++) {
                var d = a[c].indexOf("=")
                  , e = null;
                if (0 <= d) {
                    var f = a[c].substring(0, d);
                    e = a[c].substring(d + 1)
                } else
                    f = a[c];
                b(f, e ? decodeURIComponent(e.replace(/\+/g, " ")) : "")
            }
        }
    }
    ;function oj(a) {
        qf.call(this);
        this.headers = new t.Map;
        this.v = a || null;
        this.g = !1;
        this.u = this.ba = null;
        this.Oc = this.V = "";
        this.h = this.K = this.i = this.F = !1;
        this.m = 0;
        this.l = null;
        this.j = pj;
        this.N = this.T = !1
    }
    D(oj, qf);
    var pj = ""
      , qj = /^https?$/i
      , rj = ["POST", "PUT"]
      , sj = [];
    function tj(a, b, c, d, e) {
        var f = new oj;
        sj.push(f);
        b && f.C("complete", b);
        f.tc("ready", f.Mi);
        uj(f, a, c, d, e);
        return f
    }
    k = oj.prototype;
    k.Mi = function() {
        this.G();
        Wa(sj, this)
    }
    ;
    function uj(a, b, c, d, e) {
        if (a.ba)
            throw Error("[goog.net.XhrIo] Object is active with another request=" + a.V + "; newUri=" + b);
        c = c ? c.toUpperCase() : "GET";
        a.V = b;
        a.Oc = "";
        a.F = !1;
        a.g = !0;
        a.ba = a.v ? kj(a.v) : kj(ij);
        a.u = a.v ? gj(a.v) : gj(ij);
        a.ba.onreadystatechange = Ja(a.Lh, a);
        try {
            a.K = !0,
            a.ba.open(c, String(b), !0),
            a.K = !1
        } catch (h) {
            vj(a, h);
            return
        }
        b = d || "";
        d = new t.Map(a.headers);
        if (e)
            if (Object.getPrototypeOf(e) === Object.prototype)
                for (var f in e)
                    d.set(f, e[f]);
            else if ("function" === typeof v(e, "keys") && "function" === typeof e.get) {
                f = y(v(e, "keys").call(e));
                for (var g = f.next(); !g.done; g = f.next())
                    g = g.value,
                    d.set(g, e.get(g))
            } else
                throw Error("Unknown input type for opt_headers: " + String(e));
        e = (r = v(Array, "from").call(Array, v(d, "keys").call(d)),
        v(r, "find")).call(r, function(h) {
            return "content-type" == h.toLowerCase()
        });
        f = A.FormData && b instanceof A.FormData;
        !Va(rj, c) || e || f || d.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        c = y(d);
        for (e = c.next(); !e.done; e = c.next())
            d = y(e.value),
            e = d.next().value,
            d = d.next().value,
            a.ba.setRequestHeader(e, d);
        a.j && (a.ba.responseType = a.j);
        "withCredentials"in a.ba && a.ba.withCredentials !== a.T && (a.ba.withCredentials = a.T);
        try {
            wj(a),
            0 < a.m && (a.N = xj(a.ba),
            a.N ? (a.ba.timeout = a.m,
            a.ba.ontimeout = Ja(a.di, a)) : a.l = Bi(a.di, a.m, a)),
            a.i = !0,
            a.ba.send(b),
            a.i = !1
        } catch (h) {
            vj(a, h)
        }
    }
    function xj(a) {
        return H && "number" === typeof a.timeout && void 0 !== a.ontimeout
    }
    k.di = function() {
        "undefined" != typeof ya && this.ba && (this.Oc = "Timed out after " + this.m + "ms, aborting",
        this.dispatchEvent("timeout"),
        this.abort(8))
    }
    ;
    function vj(a, b) {
        a.g = !1;
        a.ba && (a.h = !0,
        a.ba.abort(),
        a.h = !1);
        a.Oc = b;
        yj(a);
        zj(a)
    }
    function yj(a) {
        a.F || (a.F = !0,
        a.dispatchEvent("complete"),
        a.dispatchEvent("error"))
    }
    k.abort = function() {
        this.ba && this.g && (this.g = !1,
        this.h = !0,
        this.ba.abort(),
        this.h = !1,
        this.dispatchEvent("complete"),
        this.dispatchEvent("abort"),
        zj(this))
    }
    ;
    k.D = function() {
        this.ba && (this.g && (this.g = !1,
        this.h = !0,
        this.ba.abort(),
        this.h = !1),
        zj(this, !0));
        oj.M.D.call(this)
    }
    ;
    k.Lh = function() {
        this.W() || (this.K || this.i || this.h ? Aj(this) : this.Gj())
    }
    ;
    k.Gj = function() {
        Aj(this)
    }
    ;
    function Aj(a) {
        if (a.g && "undefined" != typeof ya && (!a.u[1] || 4 != Bj(a) || 2 != Cj(a)))
            if (a.i && 4 == Bj(a))
                Bi(a.Lh, 0, a);
            else if (a.dispatchEvent("readystatechange"),
            4 == Bj(a)) {
                a.g = !1;
                try {
                    if (Dj(a))
                        a.dispatchEvent("complete"),
                        a.dispatchEvent("success");
                    else {
                        try {
                            var b = 2 < Bj(a) ? a.ba.statusText : ""
                        } catch (c) {
                            b = ""
                        }
                        a.Oc = b + " [" + Cj(a) + "]";
                        yj(a)
                    }
                } finally {
                    zj(a)
                }
            }
    }
    function zj(a, b) {
        if (a.ba) {
            wj(a);
            var c = a.ba
              , d = a.u[0] ? function() {}
            : null;
            a.ba = null;
            a.u = null;
            b || a.dispatchEvent("ready");
            try {
                c.onreadystatechange = d
            } catch (e) {}
        }
    }
    function wj(a) {
        a.ba && a.N && (a.ba.ontimeout = null);
        a.l && (Ci(a.l),
        a.l = null)
    }
    k.isActive = function() {
        return !!this.ba
    }
    ;
    function Dj(a) {
        var b = Cj(a);
        a: switch (b) {
        case 200:
        case 201:
        case 202:
        case 204:
        case 206:
        case 304:
        case 1223:
            var c = !0;
            break a;
        default:
            c = !1
        }
        if (!c) {
            if (b = 0 === b)
                a = String(a.V).match(lj)[1] || null,
                !a && A.self && A.self.location && (a = A.self.location.protocol.slice(0, -1)),
                b = !qj.test(a ? a.toLowerCase() : "");
            c = b
        }
        return c
    }
    function Bj(a) {
        return a.ba ? a.ba.readyState : 0
    }
    function Cj(a) {
        try {
            return 2 < Bj(a) ? a.ba.status : -1
        } catch (b) {
            return -1
        }
    }
    function Ej(a) {
        try {
            return a.ba ? a.ba.responseText : ""
        } catch (b) {
            return ""
        }
    }
    function Fj(a) {
        try {
            if (!a.ba)
                return null;
            if ("response"in a.ba)
                return a.ba.response;
            switch (a.j) {
            case pj:
            case "text":
                return a.ba.responseText;
            case "arraybuffer":
                if ("mozResponseArrayBuffer"in a.ba)
                    return a.ba.mozResponseArrayBuffer
            }
            return null
        } catch (b) {
            return null
        }
    }
    ;function Gj(a, b) {
        this.g = a[v(t.Symbol, "iterator")]();
        this.h = b
    }
    Gj.prototype[v(t.Symbol, "iterator")] = function() {
        return this
    }
    ;
    Gj.prototype.next = function() {
        var a = this.g.next();
        return {
            value: a.done ? void 0 : this.h.call(void 0, a.value),
            done: a.done
        }
    }
    ;
    function Hj(a, b) {
        return new Gj(a,b)
    }
    ;function Ij() {}
    Ij.prototype.next = function() {
        return Jj
    }
    ;
    var Jj = {
        done: !0,
        value: void 0
    };
    Ij.prototype.dd = function() {
        return this
    }
    ;
    function Kj(a) {
        if (a instanceof Lj || a instanceof Mj || a instanceof Nj)
            return a;
        if ("function" == typeof a.next)
            return new Lj(function() {
                return a
            }
            );
        if ("function" == typeof a[v(t.Symbol, "iterator")])
            return new Lj(function() {
                return a[v(t.Symbol, "iterator")]()
            }
            );
        if ("function" == typeof a.dd)
            return new Lj(function() {
                return a.dd()
            }
            );
        throw Error("Not an iterator or iterable.");
    }
    function Lj(a) {
        this.g = a
    }
    Lj.prototype.dd = function() {
        return new Mj(this.g())
    }
    ;
    Lj.prototype[v(t.Symbol, "iterator")] = function() {
        return new Nj(this.g())
    }
    ;
    Lj.prototype.h = function() {
        return new Nj(this.g())
    }
    ;
    function Mj(a) {
        this.g = a
    }
    z(Mj, Ij);
    Mj.prototype.next = function() {
        return this.g.next()
    }
    ;
    Mj.prototype[v(t.Symbol, "iterator")] = function() {
        return new Nj(this.g)
    }
    ;
    Mj.prototype.h = function() {
        return new Nj(this.g)
    }
    ;
    function Nj(a) {
        Lj.call(this, function() {
            return a
        });
        this.i = a
    }
    z(Nj, Lj);
    Nj.prototype.next = function() {
        return this.i.next()
    }
    ;
    function Oj(a, b) {
        this.h = {};
        this.g = [];
        this.i = this.size = 0;
        var c = arguments.length;
        if (1 < c) {
            if (c % 2)
                throw Error("Uneven number of arguments");
            for (var d = 0; d < c; d += 2)
                this.set(arguments[d], arguments[d + 1])
        } else if (a)
            if (a instanceof Oj)
                for (c = a.qc(),
                d = 0; d < c.length; d++)
                    this.set(c[d], a.get(c[d]));
            else
                for (d in a)
                    this.set(d, a[d])
    }
    k = Oj.prototype;
    k.Pb = function() {
        Pj(this);
        for (var a = [], b = 0; b < this.g.length; b++)
            a.push(this.h[this.g[b]]);
        return a
    }
    ;
    k.qc = function() {
        Pj(this);
        return this.g.concat()
    }
    ;
    k.has = function(a) {
        return Object.prototype.hasOwnProperty.call(this.h, a)
    }
    ;
    function Pj(a) {
        if (a.size != a.g.length) {
            for (var b = 0, c = 0; b < a.g.length; ) {
                var d = a.g[b];
                Object.prototype.hasOwnProperty.call(a.h, d) && (a.g[c++] = d);
                b++
            }
            a.g.length = c
        }
        if (a.size != a.g.length) {
            var e = {};
            for (c = b = 0; b < a.g.length; )
                d = a.g[b],
                Object.prototype.hasOwnProperty.call(e, d) || (a.g[c++] = d,
                e[d] = 1),
                b++;
            a.g.length = c
        }
    }
    k.get = function(a, b) {
        return Object.prototype.hasOwnProperty.call(this.h, a) ? this.h[a] : b
    }
    ;
    k.set = function(a, b) {
        Object.prototype.hasOwnProperty.call(this.h, a) || (this.size += 1,
        this.g.push(a),
        this.i++);
        this.h[a] = b
    }
    ;
    k.forEach = function(a, b) {
        for (var c = this.qc(), d = 0; d < c.length; d++) {
            var e = c[d]
              , f = this.get(e);
            a.call(b, f, e, this)
        }
    }
    ;
    k.keys = function() {
        return Kj(this.dd(!0)).h()
    }
    ;
    k.values = function() {
        return Kj(this.dd(!1)).h()
    }
    ;
    k.entries = function() {
        var a = this;
        return Hj(v(this, "keys").call(this), function(b) {
            return [b, a.get(b)]
        })
    }
    ;
    k.dd = function(a) {
        Pj(this);
        var b = 0
          , c = this.i
          , d = this
          , e = new Ij;
        e.next = function() {
            if (c != d.i)
                throw Error("The map has changed since the iterator was created");
            if (b >= d.g.length)
                return Jj;
            var f = d.g[b++];
            return {
                value: a ? f : d.h[f],
                done: !1
            }
        }
        ;
        return e
    }
    ;
    function Qj() {}
    Aa(Qj);
    Qj.prototype.g = 0;
    function X(a) {
        qf.call(this);
        this.g = a || rd();
        this.rg = Rj;
        this.lc = null;
        this.aa = !1;
        this.s = null;
        this.ib = void 0;
        this.V = this.l = this.oa = null;
        this.vg = !1
    }
    D(X, qf);
    X.prototype.Bi = Qj.Ra();
    var Rj = null
      , Sj = {
        rk: "Method not supported",
        Zj: "Invalid element to decorate",
        Vj: "Component already rendered",
        sk: "Unable to set parent component",
        Yj: "Child component index out of bounds",
        qk: "Child is not in parent component",
        pk: "Operation not supported while component is not in document",
        yk: "Invalid component state"
    };
    function Tj(a, b) {
        switch (a) {
        case 1:
            return b ? "disable" : "enable";
        case 2:
            return b ? "highlight" : "unhighlight";
        case 4:
            return b ? "activate" : "deactivate";
        case 8:
            return b ? "select" : "unselect";
        case 16:
            return b ? "check" : "uncheck";
        case 32:
            return b ? "focus" : "blur";
        case 64:
            return b ? "open" : "close"
        }
        throw Error("Invalid component state");
    }
    k = X.prototype;
    k.Jb = function() {
        return this.lc || (this.lc = ":" + (this.Bi.g++).toString(36))
    }
    ;
    function Uj(a, b) {
        if (a.oa && a.oa.V) {
            var c = a.oa.V
              , d = a.lc;
            d in c && delete c[d];
            Lc(a.oa.V, b, a)
        }
        a.lc = b
    }
    k.o = function() {
        return this.s
    }
    ;
    k.ka = function() {
        this.ib || (this.ib = new U(this));
        return this.ib
    }
    ;
    k.Bd = function(a) {
        if (this == a)
            throw Error("Unable to set parent component");
        if (a && this.oa && this.lc && Vj(this.oa, this.lc) && this.oa != a)
            throw Error("Unable to set parent component");
        this.oa = a;
        X.M.gg.call(this, a)
    }
    ;
    k.getParent = function() {
        return this.oa
    }
    ;
    k.gg = function(a) {
        if (this.oa && this.oa != a)
            throw Error("Method not supported");
        X.M.gg.call(this, a)
    }
    ;
    k.J = function() {
        this.s = Kd(this.g.g, "DIV")
    }
    ;
    k.La = function(a) {
        Wj(this, a)
    }
    ;
    function Wj(a, b, c) {
        if (a.aa)
            throw Error("Component already rendered");
        a.s || a.J();
        b ? b.insertBefore(a.s, c || null) : a.g.g.body.appendChild(a.s);
        a.oa && !a.oa.aa || a.O()
    }
    k.ya = function(a) {
        if (this.aa)
            throw Error("Component already rendered");
        if (a && this.Yc(a)) {
            this.vg = !0;
            var b = td(a);
            this.g && this.g.g == b || (this.g = rd(a));
            this.Ha(a);
            this.O()
        } else
            throw Error("Invalid element to decorate");
    }
    ;
    k.Yc = function() {
        return !0
    }
    ;
    k.Ha = function(a) {
        this.s = a
    }
    ;
    k.O = function() {
        this.aa = !0;
        Xj(this, function(a) {
            !a.aa && a.o() && a.O()
        })
    }
    ;
    k.fa = function() {
        Xj(this, function(a) {
            a.aa && a.fa()
        });
        this.ib && gi(this.ib);
        this.aa = !1
    }
    ;
    k.D = function() {
        this.aa && this.fa();
        this.ib && (this.ib.G(),
        delete this.ib);
        Xj(this, function(a) {
            a.G()
        });
        !this.vg && this.s && Qd(this.s);
        this.oa = this.s = this.V = this.l = null;
        X.M.D.call(this)
    }
    ;
    k.H = function(a, b) {
        this.Aa(a, Yj(this), b)
    }
    ;
    k.Aa = function(a, b, c) {
        if (a.aa && (c || !this.aa))
            throw Error("Component already rendered");
        if (0 > b || b > Yj(this))
            throw Error("Child component index out of bounds");
        this.V && this.l || (this.V = {},
        this.l = []);
        if (a.getParent() == this) {
            var d = a.Jb();
            this.V[d] = a;
            Wa(this.l, a)
        } else
            Lc(this.V, a.Jb(), a);
        a.Bd(this);
        $a(this.l, b, 0, a);
        a.aa && this.aa && a.getParent() == this ? (c = this.Oa(),
        (c.childNodes[b] || null) != a.o() && (a.o().parentElement == c && c.removeChild(a.o()),
        b = c.childNodes[b] || null,
        c.insertBefore(a.o(), b))) : c ? (this.s || this.J(),
        b = Zj(this, b + 1),
        Wj(a, this.Oa(), b ? b.s : null)) : this.aa && !a.aa && a.s && a.s.parentNode && 1 == a.s.parentNode.nodeType && a.O()
    }
    ;
    k.Oa = function() {
        return this.s
    }
    ;
    function ak(a) {
        null == a.rg && (a.rg = Uf(a.aa ? a.s : a.g.g.body));
        return a.rg
    }
    function Yj(a) {
        return a.l ? a.l.length : 0
    }
    function Vj(a, b) {
        a.V && b ? (a = a.V,
        b = (null !== a && b in a ? a[b] : void 0) || null) : b = null;
        return b
    }
    function Zj(a, b) {
        return a.l ? a.l[b] || null : null
    }
    function Xj(a, b, c) {
        a.l && a.l.forEach(b, c)
    }
    function bk(a, b) {
        return a.l && b ? a.l.indexOf(b) : -1
    }
    k.Ib = function(a, b) {
        if (a) {
            var c = "string" === typeof a ? a : a.Jb();
            a = Vj(this, c);
            if (c && a) {
                var d = this.V;
                c in d && delete d[c];
                Wa(this.l, a);
                b && (a.fa(),
                a.s && Qd(a.s));
                a.Bd(null)
            }
        }
        if (!a)
            throw Error("Child is not in parent component");
        return a
    }
    ;
    k.$f = function(a, b) {
        return this.Ib(Zj(this, a), b)
    }
    ;
    function ck(a, b) {
        for (var c = []; a.l && 0 != a.l.length; )
            c.push(a.$f(0, b));
        return c
    }
    ;function dk(a) {
        if (a.Pb && "function" == typeof a.Pb)
            return a.Pb();
        if ("undefined" !== typeof t.Map && a instanceof t.Map || "undefined" !== typeof t.Set && a instanceof t.Set)
            return v(Array, "from").call(Array, v(a, "values").call(a));
        if ("string" === typeof a)
            return a.split("");
        if (Ca(a)) {
            for (var b = [], c = a.length, d = 0; d < c; d++)
                b.push(a[d]);
            return b
        }
        b = [];
        c = 0;
        for (d in a)
            b[c++] = a[d];
        return b
    }
    function ek(a) {
        if (a.qc && "function" == typeof a.qc)
            return a.qc();
        if (!a.Pb || "function" != typeof a.Pb) {
            if ("undefined" !== typeof t.Map && a instanceof t.Map)
                return v(Array, "from").call(Array, v(a, "keys").call(a));
            if (!("undefined" !== typeof t.Set && a instanceof t.Set)) {
                if (Ca(a) || "string" === typeof a) {
                    var b = [];
                    a = a.length;
                    for (var c = 0; c < a; c++)
                        b.push(c);
                    return b
                }
                return Jc(a)
            }
        }
    }
    ;function fk(a) {
        this.i = this.u = this.l = "";
        this.v = null;
        this.j = this.g = "";
        this.m = !1;
        var b;
        a instanceof fk ? (this.m = a.m,
        gk(this, a.l),
        this.u = a.u,
        hk(this, a.i),
        ik(this, a.v),
        this.g = a.g,
        jk(this, kk(a.h)),
        this.j = a.j) : a && (b = String(a).match(lj)) ? (this.m = !1,
        gk(this, b[1] || "", !0),
        this.u = lk(b[2] || ""),
        hk(this, b[3] || "", !0),
        ik(this, b[4]),
        this.g = lk(b[5] || "", !0),
        jk(this, b[6] || "", !0),
        this.j = lk(b[7] || "")) : (this.m = !1,
        this.h = new mk(null,this.m))
    }
    fk.prototype.toString = function() {
        var a = []
          , b = this.l;
        b && a.push(nk(b, ok, !0), ":");
        var c = this.i;
        if (c || "file" == b)
            a.push("//"),
            (b = this.u) && a.push(nk(b, ok, !0), "@"),
            a.push(encodeURIComponent(String(c)).replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
            c = this.v,
            null != c && a.push(":", String(c));
        if (c = this.g)
            this.i && "/" != c.charAt(0) && a.push("/"),
            a.push(nk(c, "/" == c.charAt(0) ? pk : qk, !0));
        (c = this.h.toString()) && a.push("?", c);
        (c = this.j) && a.push("#", nk(c, rk));
        return a.join("")
    }
    ;
    fk.prototype.resolve = function(a) {
        var b = new fk(this)
          , c = !!a.l;
        c ? gk(b, a.l) : c = !!a.u;
        c ? b.u = a.u : c = !!a.i;
        c ? hk(b, a.i) : c = null != a.v;
        var d = a.g;
        if (c)
            ik(b, a.v);
        else if (c = !!a.g) {
            if ("/" != d.charAt(0))
                if (this.i && !this.g)
                    d = "/" + d;
                else {
                    var e = b.g.lastIndexOf("/");
                    -1 != e && (d = b.g.slice(0, e + 1) + d)
                }
            e = d;
            if (".." == e || "." == e)
                d = "";
            else if (-1 != e.indexOf("./") || -1 != e.indexOf("/.")) {
                d = fb(e, "/");
                e = e.split("/");
                for (var f = [], g = 0; g < e.length; ) {
                    var h = e[g++];
                    "." == h ? d && g == e.length && f.push("") : ".." == h ? ((1 < f.length || 1 == f.length && "" != f[0]) && f.pop(),
                    d && g == e.length && f.push("")) : (f.push(h),
                    d = !0)
                }
                d = f.join("/")
            } else
                d = e
        }
        c ? b.g = d : c = "" !== a.h.toString();
        c ? jk(b, kk(a.h)) : c = !!a.j;
        c && (b.j = a.j);
        return b
    }
    ;
    function gk(a, b, c) {
        a.l = c ? lk(b, !0) : b;
        a.l && (a.l = a.l.replace(/:$/, ""))
    }
    function hk(a, b, c) {
        a.i = c ? lk(b, !0) : b
    }
    function ik(a, b) {
        if (b) {
            b = Number(b);
            if (isNaN(b) || 0 > b)
                throw Error("Bad port number " + b);
            a.v = b
        } else
            a.v = null
    }
    function jk(a, b, c) {
        b instanceof mk ? (a.h = b,
        sk(a.h, a.m)) : (c || (b = nk(b, tk)),
        a.h = new mk(b,a.m))
    }
    function uk(a) {
        a.m = !0;
        a.h && sk(a.h, !0)
    }
    function lk(a, b) {
        return a ? b ? decodeURI(a.replace(/%25/g, "%2525")) : decodeURIComponent(a) : ""
    }
    function nk(a, b, c) {
        return "string" === typeof a ? (a = encodeURI(a).replace(b, vk),
        c && (a = a.replace(/%25([0-9a-fA-F]{2})/g, "%$1")),
        a) : null
    }
    function vk(a) {
        a = a.charCodeAt(0);
        return "%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
    }
    var ok = /[#\/\?@]/g
      , qk = /[#\?:]/g
      , pk = /[#\?]/g
      , tk = /[#\?@]/g
      , rk = /#/g;
    function mk(a, b) {
        this.h = this.g = null;
        this.i = a || null;
        this.j = !!b
    }
    function wk(a) {
        a.g || (a.g = new t.Map,
        a.h = 0,
        a.i && nj(a.i, function(b, c) {
            a.add(decodeURIComponent(b.replace(/\+/g, " ")), c)
        }))
    }
    k = mk.prototype;
    k.add = function(a, b) {
        wk(this);
        this.i = null;
        a = xk(this, a);
        var c = this.g.get(a);
        c || this.g.set(a, c = []);
        c.push(b);
        this.h += 1;
        return this
    }
    ;
    function yk(a, b) {
        wk(a);
        b = xk(a, b);
        a.g.has(b) && (a.i = null,
        a.h -= a.g.get(b).length,
        a.g.delete(b))
    }
    function zk(a, b) {
        wk(a);
        b = xk(a, b);
        return a.g.has(b)
    }
    k.forEach = function(a, b) {
        wk(this);
        this.g.forEach(function(c, d) {
            c.forEach(function(e) {
                a.call(b, e, d, this)
            }, this)
        }, this)
    }
    ;
    k.qc = function() {
        wk(this);
        for (var a = v(Array, "from").call(Array, v(this.g, "values").call(this.g)), b = v(Array, "from").call(Array, v(this.g, "keys").call(this.g)), c = [], d = 0; d < b.length; d++)
            for (var e = a[d], f = 0; f < e.length; f++)
                c.push(b[d]);
        return c
    }
    ;
    k.Pb = function(a) {
        wk(this);
        var b = [];
        if ("string" === typeof a)
            zk(this, a) && (b = b.concat(this.g.get(xk(this, a))));
        else {
            a = v(Array, "from").call(Array, v(this.g, "values").call(this.g));
            for (var c = 0; c < a.length; c++)
                b = b.concat(a[c])
        }
        return b
    }
    ;
    k.set = function(a, b) {
        wk(this);
        this.i = null;
        a = xk(this, a);
        zk(this, a) && (this.h -= this.g.get(a).length);
        this.g.set(a, [b]);
        this.h += 1;
        return this
    }
    ;
    k.get = function(a, b) {
        if (!a)
            return b;
        a = this.Pb(a);
        return 0 < a.length ? String(a[0]) : b
    }
    ;
    function Ak(a, b, c) {
        yk(a, b);
        0 < c.length && (a.i = null,
        a.g.set(xk(a, b), Ya(c)),
        a.h += c.length)
    }
    k.toString = function() {
        if (this.i)
            return this.i;
        if (!this.g)
            return "";
        for (var a = [], b = v(Array, "from").call(Array, v(this.g, "keys").call(this.g)), c = 0; c < b.length; c++) {
            var d = b[c]
              , e = encodeURIComponent(String(d));
            d = this.Pb(d);
            for (var f = 0; f < d.length; f++) {
                var g = e;
                "" !== d[f] && (g += "=" + encodeURIComponent(String(d[f])));
                a.push(g)
            }
        }
        return this.i = a.join("&")
    }
    ;
    function kk(a) {
        var b = new mk;
        b.i = a.i;
        a.g && (b.g = new t.Map(a.g),
        b.h = a.h);
        return b
    }
    function xk(a, b) {
        b = String(b);
        a.j && (b = b.toLowerCase());
        return b
    }
    function sk(a, b) {
        b && !a.j && (wk(a),
        a.i = null,
        a.g.forEach(function(c, d) {
            var e = d.toLowerCase();
            d != e && (yk(this, d),
            Ak(this, e, c))
        }, a));
        a.j = b
    }
    ;function Bk() {
        this.g = ("undefined" == typeof document ? null : document) || {
            cookie: ""
        }
    }
    k = Bk.prototype;
    k.isEnabled = function() {
        if (!A.navigator.cookieEnabled)
            return !1;
        if (this.g.cookie)
            return !0;
        this.set("TESTCOOKIESENABLED", "1", {
            Tf: 60
        });
        if ("1" !== this.get("TESTCOOKIESENABLED"))
            return !1;
        this.get("TESTCOOKIESENABLED");
        this.set("TESTCOOKIESENABLED", "", {
            Tf: 0,
            path: void 0,
            domain: void 0
        });
        return !0
    }
    ;
    k.set = function(a, b, c) {
        var d = !1;
        if ("object" === typeof c) {
            var e = c.Mj;
            d = c.Nj || !1;
            var f = c.domain || void 0;
            var g = c.path || void 0;
            var h = c.Tf
        }
        if (/[;=\s]/.test(a))
            throw Error('Invalid cookie name "' + a + '"');
        if (/[;\r\n]/.test(b))
            throw Error('Invalid cookie value "' + b + '"');
        void 0 === h && (h = -1);
        this.g.cookie = a + "=" + b + (f ? ";domain=" + f : "") + (g ? ";path=" + g : "") + (0 > h ? "" : 0 == h ? ";expires=" + (new Date(1970,1,1)).toUTCString() : ";expires=" + (new Date(Date.now() + 1E3 * h)).toUTCString()) + (d ? ";secure" : "") + (null != e ? ";samesite=" + e : "")
    }
    ;
    k.get = function(a, b) {
        for (var c = a + "=", d = (this.g.cookie || "").split(";"), e = 0, f; e < d.length; e++) {
            f = gb(d[e]);
            if (0 == f.lastIndexOf(c, 0))
                return f.slice(c.length);
            if (f == a)
                return ""
        }
        return b
    }
    ;
    k.qc = function() {
        return v(Ck(this), "keys")
    }
    ;
    k.Pb = function() {
        return v(Ck(this), "values")
    }
    ;
    function Ck(a) {
        a = (a.g.cookie || "").split(";");
        for (var b = [], c = [], d, e, f = 0; f < a.length; f++)
            e = gb(a[f]),
            d = e.indexOf("="),
            -1 == d ? (b.push(""),
            c.push(e)) : (b.push(e.substring(0, d)),
            c.push(e.substring(d + 1)));
        return {
            keys: b,
            values: c
        }
    }
    var Dk = new Bk;
    function Ek() {
        try {
            var a = Dk.get("sv");
            return void 0 === a ? 0 : parseInt(a, 10)
        } catch (b) {}
        return 0
    }
    ;var Fk, Gk = rd().g.documentElement;
    Fk = Gk.requestFullscreen ? "fullscreenchange" : Gk.webkitRequestFullscreen ? "webkitfullscreenchange" : Gk.mozRequestFullScreen ? "mozfullscreenchange" : Gk.msRequestFullscreen ? "MSFullscreenChange" : "fullscreenchange";
    function Hk() {
        var a = rd().g
          , b = a.body;
        return !!(b.webkitRequestFullscreen && a.webkitFullscreenEnabled || b.mozRequestFullScreen && a.mozFullScreenEnabled || b.msRequestFullscreen && a.msFullscreenEnabled || b.requestFullscreen && a.fullscreenEnabled)
    }
    function Ik() {
        var a = document.body
          , b = {
            navigationUI: "hide"
        };
        a.mozRequestFullScreenWithKeys ? a.mozRequestFullScreenWithKeys() : a.requestFullscreen ? a.requestFullscreen(b) : a.webkitRequestFullscreen ? a.webkitRequestFullscreen() : a.mozRequestFullScreen ? a.mozRequestFullScreen() : a.msRequestFullscreen && a.msRequestFullscreen()
    }
    function Jk() {
        var a = rd().g;
        return !!(a.webkitIsFullScreen || a.mozFullScreen || a.msFullscreenElement || a.fullscreenElement)
    }
    ;var Kk;
    function Lk(a, b) {
        b ? a.setAttribute("role", b) : a.removeAttribute("role")
    }
    function Mk(a, b, c) {
        Array.isArray(c) && (c = c.join(" "));
        var d = "aria-" + b;
        "" === c || void 0 == c ? (Kk || (c = {},
        Kk = (c.atomic = !1,
        c.autocomplete = "none",
        c.dropeffect = "none",
        c.haspopup = !1,
        c.live = "off",
        c.multiline = !1,
        c.multiselectable = !1,
        c.orientation = "vertical",
        c.readonly = !1,
        c.relevant = "additions text",
        c.required = !1,
        c.sort = "none",
        c.busy = !1,
        c.disabled = !1,
        c.hidden = !1,
        c.invalid = "false",
        c)),
        c = Kk,
        b in c ? a.setAttribute(d, c[b]) : a.removeAttribute(d)) : a.setAttribute(d, c)
    }
    function Nk(a, b) {
        var c = "";
        b && (c = b.id);
        Mk(a, "activedescendant", c)
    }
    ;function Ok(a, b, c) {
        M.call(this);
        this.g = a;
        this.j = b || 0;
        this.h = c;
        this.i = Ja(this.li, this)
    }
    D(Ok, M);
    k = Ok.prototype;
    k.Gd = 0;
    k.D = function() {
        Ok.M.D.call(this);
        this.stop();
        delete this.g;
        delete this.h
    }
    ;
    k.start = function(a) {
        this.stop();
        this.Gd = Bi(this.i, void 0 !== a ? a : this.j)
    }
    ;
    k.stop = function() {
        this.isActive() && Ci(this.Gd);
        this.Gd = 0
    }
    ;
    k.isActive = function() {
        return 0 != this.Gd
    }
    ;
    k.li = function() {
        this.Gd = 0;
        this.g && this.g.call(this.h)
    }
    ;
    var Pk = RegExp("^[\\w-]+(\\.[\\w-]+)*\\@([\\w-]+\\.)+(\\d+|\\w\\w+)$", "i");
    var Qk;
    function Rk(a) {
        return encodeURIComponent(a).replace(/[!'()*]/g, function(b) {
            b = b.charCodeAt(0).toString(16);
            2 > b.length && (b = "0" + b);
            return "%" + b
        })
    }
    function Sk(a) {
        try {
            a: {
                var b = decodeURIComponent(a);
                a = "";
                for (var c = b.length, d = 11111, e = 0; e < c; e++) {
                    var f = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-%".indexOf(b.charAt(e));
                    if (-1 == f) {
                        var g = void 0;
                        break a
                    }
                    f ^= d = 1005 * d + 13 & 255;
                    a += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-%".charAt(f & 63)
                }
                g = a
            }
            if (g)
                return decodeURIComponent(g)
        } catch (h) {}
    }
    function Tk(a) {
        var b = [], c;
        for (c in a) {
            var d = a[c];
            if (Array.isArray(d))
                for (var e = 0, f = encodeURIComponent(String(c + "[]")); e < d.length; e++)
                    b.push(f + "=" + encodeURIComponent(String(d[e])));
            else
                e = encodeURIComponent(String(c)),
                b.push(e + "=" + encodeURIComponent(String(d)))
        }
        return b.join("&")
    }
    function Uk() {
        var a = new fk(A.location.href)
          , b = new fk;
        b.g = a.g;
        jk(b, kk(a.h));
        b.j = a.j;
        return b
    }
    function Vk(a) {
        a = a.split(".");
        var b = a.length;
        return 2 <= b ? a[b - 2] + "." + a[b - 1] : null
    }
    function Wk(a) {
        var b;
        void 0 === Qk && (Qk = Vk(A.location.hostname));
        var c = Qk;
        return !(!(b = Vk(a)) || b !== c)
    }
    ;var Xk;
    function Yk(a) {
        a.href = "javascript:void(0)"
    }
    function Zk(a) {
        for (var b = document.createDocumentFragment(), c = 0; c < arguments.length; c++)
            Nd(b, arguments[c]);
        return b
    }
    function $k(a) {
        for (var b = L("TBODY"), c = K("TABLE", null, b), d = 0, e = a[0].length; d < a.length; d++) {
            var f = L("TR");
            b.appendChild(f);
            for (var g = 0; g < e; g++) {
                var h = a[d][g];
                h = K("TD", null, "number" === typeof h ? h + "" : h);
                f.appendChild(h)
            }
        }
        return c
    }
    function al() {
        return new J(A.innerWidth,A.innerHeight)
    }
    function bl(a, b) {
        b = b || document;
        return b.querySelector(a)
    }
    function cl(a, b) {
        b = b || document;
        return b.querySelectorAll(a)
    }
    function dl(a) {
        a = "i" + Ea(a);
        Xk = Xk || {};
        a in Xk || (Xk[a] = {});
        return Xk[a]
    }
    function el(a, b, c) {
        var d = xi(b, Array.prototype.slice.call(arguments, 2)), e = Zk(), f;
        for (f = 0; f < d.length; f++) {
            var g = d[f];
            a && Eh(g) && (g = K("SPAN", a, g));
            Nd(e, g)
        }
        return e
    }
    var fl = RegExp("^(https?|ftp|mailto):", "i")
      , gl = RegExp("^(www|ftp)(\\.[a-z\\d\\-]+)+?(\\.[a-z]{2,3})$", "i")
      , hl = RegExp("^(?:(?:https?|ftp)://)(?:\\S+(?::\\S*)?@)?(?:(?!(?:10|127)(?:\\.\\d{1,3}){3})(?!(?:169\\.254|192\\.168)(?:\\.\\d{1,3}){2})(?!172\\.(?:1[6-9]|2\\d|3[0-1])(?:\\.\\d{1,3}){2})(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[1-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))(?::\\d{2,5})?(?:/\\S*)?$", "i");
    function il(a) {
        var b;
        if (-1 != a.indexOf(".")) {
            var c;
            fl.test(a) ? v(a.toLowerCase(), "startsWith").call(a.toLowerCase(), "mailto") ? Pk.test(a.substring(7)) && (b = a) : c = a : Pk.test(a) ? b = "mailto:" + a : gl.test(a) && (c = (v(a.toLowerCase(), "startsWith").call(a.toLowerCase(), "ftp") ? "ftp" : "http") + "://" + a);
            c && hl.test(c) && (b = c)
        }
        return b
    }
    function jl(a, b) {
        function c() {
            f && (e.appendChild(document.createTextNode(String(f))),
            f = "")
        }
        for (var d = /(\s*)(.+?)(\s*(?:\s|,|;|\.\s|\.$|\(|\)|$))/gm, e = Zk(), f = "", g; g = d.exec(a); ) {
            var h = g[2]
              , l = il(h);
            f += g[1];
            l ? (b ? h = b.call(void 0, new fk(l), h) : (h = K("a", null, h),
            cd(h, l)),
            "string" === typeof h ? f += h : (c(),
            e.appendChild(h))) : f += h;
            f += g[3]
        }
        c();
        return e
    }
    function kl(a) {
        return K("INPUT", a)
    }
    function ll(a) {
        return a.children ? a.children : Array.prototype.filter.call(a.childNodes, function(b) {
            return 1 == b.nodeType
        })
    }
    function ml(a, b) {
        if (a.hasChildNodes()) {
            var c = [];
            a = y(a.childNodes);
            for (var d = a.next(); !d.done; d = a.next())
                if (d = d.value,
                !v(c, "includes").call(c, d))
                    if (3 === d.nodeType) {
                        var e = b(d);
                        if (e) {
                            e = y(e);
                            for (var f = e.next(); !f.done; f = e.next())
                                f = f.value,
                                Pd(f, d),
                                c.push(f);
                            Qd(d)
                        }
                    } else
                        ml(d, b)
        }
    }
    ;function nl(a) {
        var b = new M;
        try {
            for (var c = y(ol), d = c.next(); !d.done; d = c.next()) {
                var e = d.value;
                N(b, e(a))
            }
        } catch (f) {
            W("iui", f)
        }
        return b
    }
    var ol = [];
    function Vg() {
        var a = Error.apply(this, arguments);
        this.message = a.message;
        "stack"in a && (this.stack = a.stack)
    }
    z(Vg, Error);
    function pl() {
        X.apply(this, arguments)
    }
    z(pl, X);
    function ql(a) {
        for (var b = a.Oa(), c = 0, d; d = Zj(a, c); c++)
            d.o() || d.J(),
            d = d.o(),
            b.appendChild(d)
    }
    k = pl.prototype;
    k.J = function() {
        X.prototype.J.call(this);
        ql(this)
    }
    ;
    k.Ha = function(a) {
        X.prototype.Ha.call(this, a);
        ql(this)
    }
    ;
    k.D = function() {
        var a = this.o();
        X.prototype.D.call(this);
        Qd(a)
    }
    ;
    k.Aa = function(a, b, c) {
        X.prototype.Aa.call(this, a, b, c)
    }
    ;
    k.H = function(a, b) {
        X.prototype.H.call(this, a, b)
    }
    ;
    function rl(a, b, c) {
        b = y(b);
        for (var d = b.next(); !d.done; d = b.next())
            a.H(d.value, c)
    }
    k.$f = function(a, b) {
        return X.prototype.$f.call(this, a, b)
    }
    ;
    function sl(a) {
        function b() {
            pl.apply(this, arguments)
        }
        z(b, pl);
        b.Error = Sj;
        b.prototype.J = function() {
            this.s = a
        }
        ;
        return new b
    }
    ;function Y(a, b, c) {
        pl.call(this);
        this.oj = a;
        this.yi = b;
        for (var d = 2; d < arguments.length; d++) {
            var e = arguments[d];
            e && (e instanceof X ? this.H(e) : Array.isArray(c) ? rl(this, e) : this.H(sl(e)))
        }
    }
    z(Y, pl);
    Y.prototype.J = function() {
        this.s = this.g.Ca(this.oj || "DIV", this.yi);
        ql(this)
    }
    ;
    Y.prototype.Ha = function(a) {
        pl.prototype.Ha.call(this, a)
    }
    ;
    function tl(a) {
        for (var b = new Y(null,"ts-flxdspl"), c = 0; c < arguments.length; c++)
            b.H(arguments[c]);
        return b
    }
    function ul(a, b, c) {
        function d() {
            Y.apply(this, arguments)
        }
        z(d, Y);
        d.Error = Sj;
        d.prototype.J = function() {
            Y.prototype.J.call(this);
            this.s.appendChild(document.createTextNode(String(a)))
        }
        ;
        d.prototype.Aa = function(e, f, g) {
            Y.prototype.Aa.call(this, e, f, g)
        }
        ;
        return new d(b || "SPAN",c)
    }
    function vl(a) {
        function b() {
            Y.call(this, "DIV")
        }
        z(b, Y);
        b.Error = Sj;
        b.prototype.J = function() {
            Y.prototype.J.call(this);
            bd(this.s, a)
        }
        ;
        b.prototype.Aa = function(c, d, e) {
            Y.prototype.Aa.call(this, c, d, e)
        }
        ;
        b.prototype.O = function() {
            Y.prototype.O.call(this);
            this.Wi || (nl(this.s),
            this.Wi = !0)
        }
        ;
        return new b
    }
    ;function wl(a) {
        var b = A.location;
        if (a) {
            a = Ek();
            try {
                var c = A.location.hostname.split(".");
                c = c.slice(c.length - 2);
                c = "." + c.join(".")
            } catch (d) {
                c = void 0
            }
            try {
                Dk.set("sv", "" + (a + 1), {
                    Tf: 15552E3,
                    path: "/",
                    Nj: !0,
                    domain: c,
                    Mj: "none"
                })
            } catch (d) {}
        }
        b.hash ? b.reload(!1) : b.replace(b.href)
    }
    function xl(a, b, c) {
        tj(a, function(d) {
            var e = Cj(this);
            0 >= e || 1E3 < e ? Bi(function() {
                tj(a, function(f) {
                    b && b.call(this, f)
                }, "POST", c)
            }, 2E3) : b && b.call(this, d)
        }, "POST", c)
    }
    function yl(a) {
        var b;
        return bh(new Lg(function(c, d) {
            b = tj(a, function() {
                if (Dj(this)) {
                    var e = L("DIV");
                    e.innerHTML = Ej(this);
                    (e = Ad("FORM", void 0, e)) ? c(e) : d("Element not found")
                } else
                    d("string" === typeof this.Oc ? this.Oc : String(this.Oc))
            })
        }
        ), function() {
            b.G()
        })
    }
    function zl(a) {
        return yl(a).then(function(b) {
            function c() {
                Y.call(this)
            }
            z(c, Y);
            c.Error = Sj;
            c.prototype.J = function() {
                this.s = b
            }
            ;
            c.prototype.O = function() {
                Y.prototype.O.call(this);
                this.Di || (N(this, nl(this.s)),
                this.Di = !0)
            }
            ;
            return new c
        })
    }
    function Al(a) {
        RegExp("^(\\/|\\?|https?:|mailto:)", "i").test(a) ? dd(a) : W("Incorrect url: " + a);
        return t.Promise.resolve()
    }
    function Bl(a) {
        a = "" + a;
        128 < a.length && (a = a.substring(0, 125) + "...");
        return new Vg("Cannot load an image (" + a + "), try it again.")
    }
    function Cl(a, b, c) {
        var d = new U;
        return bh(new Lg(function(e, f) {
            var g;
            b ? "function" === typeof b ? g = b() : g = b : g = new Image;
            if (c && c.wf)
                try {
                    b.fetchPriority = c.wf
                } catch (h) {}
            d.tc(g, ["load", "abort", "error"], function(h) {
                "load" === h.type && g.naturalWidth && g.naturalHeight ? e(g) : f(Bl(a))
            });
            g.src = "" + a
        }
        ), function() {
            d.G()
        })
    }
    function Dl() {
        Q(A, "pageshow", function(a) {
            a.ja.persisted && wl()
        })
    }
    function El(a) {
        return a === Fl || a === Gl || a === Hl
    }
    var Fl = "GET"
      , Gl = "HEAD"
      , Hl = "OPTIONS";
    var Il, Jl;
    function Kl() {
        if (void 0 === Il)
            try {
                var a = Ll(1, 1), b;
                Il = !!(a.getContext && (b = Ml(a)) && b.getImageData(0, 0, 1, 1))
            } catch (c) {
                Il = !1
            }
        return Il
    }
    function Ml(a, b) {
        var c = {
            willReadFrequently: !0
        };
        b && (void 0 !== b.alpha && (c.alpha = b.alpha),
        void 0 !== b.desynchronized && (c.desynchronized = b.desynchronized),
        void 0 !== b.willReadFrequently && (c.willReadFrequently = b.willReadFrequently));
        try {
            return a.getContext("2d", c)
        } catch (d) {
            return Xi("gc2D failed", d),
            null
        }
    }
    var Nl = fc(function() {
        if (Kl())
            try {
                var a = Ll(1, 1);
                return fb(a.toDataURL("image/png"), "data:")
            } catch (b) {}
        return !1
    });
    function Ll(a, b) {
        return K("CANVAS", {
            width: a,
            height: b
        })
    }
    function Ol(a) {
        return Sd(a) && gc(a.getContext)
    }
    function Pl(a, b, c) {
        var d = Ll(b, c)
          , e = Ml(d);
        e.save();
        e.imageSmoothingEnabled = !0;
        e.imageSmoothingQuality && (e.imageSmoothingQuality = "high");
        e.globalCompositeOperation = "copy";
        e.drawImage(a, 0, 0, b, c);
        e.restore();
        return d
    }
    function Ql(a) {
        return Cl(a.toDataURL("image/png")).then(function(b) {
            b.style.width = a.style.width;
            b.style.height = a.style.height;
            return b
        }, function(b) {
            Xi("Cannot create an image, reason: " + b);
            throw b;
        })
    }
    function Rl(a, b) {
        var c = Ml(a, {
            willReadFrequently: !0
        })
          , d = a.width;
        a = a.height;
        var e = ~~(65536 / (4 * d)) || 1, f;
        for (f = 0; f < a; ) {
            for (var g = a - f > e ? e : a - f, h = c.getImageData(0, f, d, g), l = h.data, m = !1, n = 0, q = l.length; n < q; n += 4)
                b(l, n) && (m = !0);
            m && c.putImageData(h, 0, f);
            f += g
        }
    }
    function Sl(a) {
        var b = {}
          , c = new Float64Array(256)
          , d = new Float64Array(256)
          , e = new Float64Array(256)
          , f = [c, d, e];
        Rl(a, function(n, q) {
            c[n[q]]++;
            d[n[q + 1]]++;
            e[n[q + 2]]++
        });
        a = 0;
        var g, h, l = y(f);
        for (g = l.next(); !g.done; g = l.next()) {
            g = g.value;
            var m = 0;
            for (h = g.length; m < h; m++)
                g[m] > a && (a = g[m])
        }
        l = y(f);
        for (g = l.next(); !g.done; g = l.next())
            for (g = g.value,
            h = g.length,
            m = 0; m < h; m++)
                g[m] /= a;
        b.xh = f;
        return b
    }
    function Tl(a) {
        var b, c, d;
        var e = b = c = d = 0;
        Rl(a, function(f, g) {
            255 == f[g + 3] && (e += f[g],
            b += f[g + 1],
            c += f[g + 2],
            d++)
        });
        d = d || 1;
        return [Math.round(e / d), Math.round(b / d), Math.round(c / d)]
    }
    function Ul(a, b) {
        if (void 0 === Jl)
            try {
                var c = Ml(Ll(1, 2));
                c.shadowOffsetY = 1;
                c.shadowBlur = 1;
                c.shadowColor = "black";
                c.fillRect(0, 0, 1, 1);
                Jl = 0 == c.getImageData(0, 1, 1, 1).data[3]
            } catch (d) {
                Jl = !1
            }
        return {
            shadowOffsetX: a,
            shadowOffsetY: Jl ? -b : b
        }
    }
    ;var Vl, Wl;
    function Xl(a) {
        Vl || (Vl = new Yl);
        return Zl(Vl, a).then(function(b) {
            return $l(function() {
                return b
            })
        })
    }
    function $l(a) {
        Wl || (Wl = new Yl);
        return Zl(Wl, a)
    }
    function am() {}
    function Zl(a, b) {
        if (!a.g) {
            var c = function() {
                this.g = void 0
            }
            .bind(a);
            a.g = bm().then(c, c)
        }
        return a.g.then(b)
    }
    function Yl() {}
    z(Yl, am);
    function bm() {
        return new t.Promise(function(a) {
            A.setTimeout(a, 0)
        }
        )
    }
    ;function cm(a, b, c) {
        b = b || "solid";
        c = K("I", c);
        O(c, "fa-" + b);
        O(c, "fa-" + a);
        O(c, "ts-ico");
        return c
    }
    function dm(a, b, c) {
        a = cm(a, b, c);
        O(a, "ts-hoveraltop");
        O(a, "ts-ico-btn");
        O(a, "ts-ico-color");
        return a
    }
    function em(a) {
        var b = dm("xmark");
        null !== a && Bd(b, {
            title: a || V("Close")
        });
        return b
    }
    ;function fm(a) {
        for (var b = new Oj, c = gm, d = a.elements, e, f = 0; e = d.item(f); f++)
            if (e.form == a && !e.disabled && "FIELDSET" != e.tagName) {
                var g = e.name;
                switch (e.type.toLowerCase()) {
                case "file":
                case "submit":
                case "reset":
                case "button":
                    break;
                case "select-multiple":
                    e = hm(e);
                    if (null != e)
                        for (var h, l = 0; h = e[l]; l++)
                            c(b, g, h);
                    break;
                default:
                    h = hm(e),
                    null != h && c(b, g, h)
                }
            }
        d = a.getElementsByTagName("INPUT");
        for (f = 0; e = d[f]; f++)
            e.form == a && "image" == e.type.toLowerCase() && (g = e.name,
            c(b, g, e.value),
            c(b, g + ".x", "0"),
            c(b, g + ".y", "0"));
        return b
    }
    function gm(a, b, c) {
        var d = a.get(b);
        d || (d = [],
        a.set(b, d));
        d.push(c)
    }
    function im(a, b) {
        if ("FORM" == a.tagName)
            for (var c = a.elements, d = 0; a = c.item(d); d++)
                im(a, b);
        else
            1 == b && a.blur(),
            a.disabled = b
    }
    function hm(a) {
        var b = a.type;
        if ("string" === typeof b)
            switch (b.toLowerCase()) {
            case "checkbox":
            case "radio":
                return a.checked ? a.value : null;
            case "select-one":
                return b = a.selectedIndex,
                0 <= b ? a.options[b].value : null;
            case "select-multiple":
                b = [];
                for (var c, d = 0; c = a.options[d]; d++)
                    c.selected && b.push(c.value);
                return b.length ? b : null
            }
        return null != a.value ? a.value : null
    }
    function jm(a, b) {
        var c = a.type;
        switch ("string" === typeof c && c.toLowerCase()) {
        case "checkbox":
        case "radio":
            a.checked = b;
            break;
        case "select-one":
            a.selectedIndex = -1;
            if ("string" === typeof b)
                for (var d = 0; c = a.options[d]; d++)
                    if (c.value == b) {
                        c.selected = !0;
                        break
                    }
            break;
        case "select-multiple":
            "string" === typeof b && (b = [b]);
            for (d = 0; c = a.options[d]; d++)
                if (c.selected = !1,
                b)
                    for (var e, f = 0; e = b[f]; f++)
                        c.value == e && (c.selected = !0);
            break;
        default:
            a.value = null != b ? b : ""
        }
    }
    ;function km(a) {
        if (Fh(a))
            return a + "px";
        var b = a.charCodeAt(a.length - 1);
        return 96 < b && 123 > b || 37 == b ? a : a + "px"
    }
    function lm(a, b, c, d) {
        return {
            borderRadius: Ta(arguments, km).join(" ")
        }
    }
    function mm(a, b, c, d) {
        var e = {};
        e.boxShadow = arguments.length ? km(a) + " " + km(b) + " " + km(c) + " " + d : "none";
        return e
    }
    function nm(a) {
        R(a, "vertical-align", "middle")
    }
    function om(a) {
        try {
            Ze(a, Le, function() {
                R(this, "animation", "")
            }),
            R(a, "animation", "ts-anim-pulse .3s 2 ease-in-out alternate")
        } catch (b) {}
    }
    var pm = fc(function() {
        return Jb ? "-webkit" : Ib ? "-moz" : H ? "-ms" : null
    });
    function qm(a, b) {
        var c = {}
          , d = pm();
        d && (c[d + "-" + a] = b);
        c[a] = b;
        return c
    }
    function rm(a, b, c) {
        Ra(wd(a, b, c), function(d) {
            R(d, "display", "none" === Cf(d, "display") ? "block" : "none")
        })
    }
    function sm(a, b) {
        R(a, "visibility", "string" === typeof b ? b : b ? "visible" : "hidden")
    }
    function tm(a) {
        var b = a.style;
        qa.apply(1, arguments).forEach(b.removeProperty.bind(b))
    }
    ;function um(a, b) {
        qf.call(this);
        this.s = a;
        a = Sd(this.s) ? this.s : this.s ? this.s.body : null;
        this.j = !!a && Uf(a);
        this.g = Q(this.s, Ib ? "DOMMouseScroll" : "mousewheel", this, b)
    }
    D(um, qf);
    um.prototype.handleEvent = function(a) {
        var b = 0
          , c = 0
          , d = a.ja;
        "mousewheel" == d.type ? (a = vm(-d.wheelDelta),
        void 0 !== d.wheelDeltaX ? (b = vm(-d.wheelDeltaX),
        c = vm(-d.wheelDeltaY)) : c = a) : (a = d.detail,
        100 < a ? a = 3 : -100 > a && (a = -3),
        void 0 !== d.axis && d.axis === d.HORIZONTAL_AXIS ? b = a : c = a);
        "number" === typeof this.h && (b = fd(b, -this.h, this.h));
        "number" === typeof this.i && (c = fd(c, -this.i, this.i));
        this.j && (b = -b);
        b = new wm(a,d,b,c);
        this.dispatchEvent(b)
    }
    ;
    function vm(a) {
        return Jb && (Kb || Mb) && 0 != a % 40 ? a : a / 40
    }
    um.prototype.D = function() {
        um.M.D.call(this);
        gf(this.g);
        this.g = null
    }
    ;
    function wm(a, b, c, d) {
        Me.call(this, b);
        this.type = "mousewheel";
        this.detail = a;
        this.deltaX = c;
        this.deltaY = d
    }
    D(wm, Me);
    function xm() {
        qf.call(this);
        this.g = ym;
        this.endTime = this.startTime = null
    }
    D(xm, qf);
    var ym = 0;
    xm.prototype.h = function() {
        this.mb("begin")
    }
    ;
    xm.prototype.i = function() {
        this.mb("end")
    }
    ;
    xm.prototype.mb = function(a) {
        this.dispatchEvent(a)
    }
    ;
    var zm = {}
      , Am = null;
    function Bm(a) {
        a = Ea(a);
        delete zm[a];
        Kc(zm) && Am && Am.stop()
    }
    function Cm() {
        Am || (Am = new Ok(function() {
            Dm()
        }
        ,20));
        var a = Am;
        a.isActive() || a.start()
    }
    function Dm() {
        var a = La();
        Ic(zm, function(b) {
            Em(b, a)
        });
        Kc(zm) || Cm()
    }
    ;function Fm(a, b, c, d) {
        xm.call(this);
        if (!Array.isArray(a) || !Array.isArray(b))
            throw Error("Start and end parameters must be arrays");
        if (a.length != b.length)
            throw Error("Start and end points must be the same length");
        this.m = a;
        this.K = b;
        this.duration = c;
        this.F = d;
        this.coords = [];
        this.u = !1;
        this.progress = 0
    }
    D(Fm, xm);
    k = Fm.prototype;
    k.play = function(a) {
        if (a || this.g == ym)
            this.progress = 0,
            this.coords = this.m;
        else if (1 == this.g)
            return !1;
        Bm(this);
        this.startTime = a = La();
        -1 == this.g && (this.startTime -= this.duration * this.progress);
        this.endTime = this.startTime + this.duration;
        this.progress || this.h();
        this.mb("play");
        -1 == this.g && this.mb("resume");
        this.g = 1;
        var b = Ea(this);
        b in zm || (zm[b] = this);
        Cm();
        Em(this, a);
        return !0
    }
    ;
    k.stop = function(a) {
        Bm(this);
        this.g = ym;
        a && (this.progress = 1);
        Gm(this, this.progress);
        this.mb("stop");
        this.i()
    }
    ;
    k.D = function() {
        this.g == ym || this.stop(!1);
        this.mb("destroy");
        Fm.M.D.call(this)
    }
    ;
    function Em(a, b) {
        b < a.startTime && (a.endTime = b + a.endTime - a.startTime,
        a.startTime = b);
        a.progress = (b - a.startTime) / (a.endTime - a.startTime);
        1 < a.progress && (a.progress = 1);
        Gm(a, a.progress);
        1 == a.progress ? (a.g = ym,
        Bm(a),
        a.mb("finish"),
        a.i()) : 1 == a.g && a.Xf()
    }
    function Gm(a, b) {
        "function" === typeof a.F && (b = a.F(b));
        a.coords = Array(a.m.length);
        for (var c = 0; c < a.m.length; c++)
            a.coords[c] = (a.K[c] - a.m[c]) * b + a.m[c]
    }
    k.Xf = function() {
        this.mb("animate")
    }
    ;
    k.mb = function(a) {
        this.dispatchEvent(new Hm(a,this))
    }
    ;
    function Hm(a, b) {
        He.call(this, a);
        this.coords = b.coords;
        this.x = b.coords[0];
        this.y = b.coords[1];
        this.z = b.coords[2];
        this.duration = b.duration;
        this.progress = b.progress;
        this.state = b.g
    }
    D(Hm, He);
    function Im() {
        xm.call(this);
        this.j = []
    }
    D(Im, xm);
    Im.prototype.add = function(a) {
        Va(this.j, a) || (this.j.push(a),
        Q(a, "finish", this.m, !1, this))
    }
    ;
    Im.prototype.D = function() {
        this.j.forEach(function(a) {
            a.G()
        });
        this.j.length = 0;
        Im.M.D.call(this)
    }
    ;
    function Jm() {
        Im.call(this);
        this.l = 0
    }
    D(Jm, Im);
    Jm.prototype.play = function(a) {
        if (0 == this.j.length)
            return !1;
        if (a || this.g == ym)
            this.l = 0,
            this.h();
        else if (1 == this.g)
            return !1;
        this.mb("play");
        -1 == this.g && this.mb("resume");
        var b = -1 == this.g && !a;
        this.startTime = La();
        this.endTime = null;
        this.g = 1;
        this.j.forEach(function(c) {
            b && -1 != c.g || c.play(a)
        });
        return !0
    }
    ;
    Jm.prototype.stop = function(a) {
        this.j.forEach(function(b) {
            b.g == ym || b.stop(a)
        });
        this.g = ym;
        this.endTime = La();
        this.mb("stop");
        this.i()
    }
    ;
    Jm.prototype.m = function() {
        this.l++;
        this.l == this.j.length && (this.endTime = La(),
        this.g = ym,
        this.mb("finish"),
        this.i())
    }
    ;
    function Km(a, b, c) {
        qf.call(this);
        this.target = a;
        this.handle = b || a;
        this.j = c || new zf(NaN,NaN,NaN,NaN);
        this.h = td(a);
        this.Va = new U(this);
        N(this, this.Va);
        this.deltaY = this.deltaX = this.K = this.F = this.screenY = this.screenX = this.clientY = this.clientX = 0;
        this.m = !0;
        this.i = this.g = !1;
        Q(this.handle, ["touchstart", "mousedown"], this.ci, !1, this);
        this.l = Lm
    }
    D(Km, qf);
    var Lm = A.document && A.document.documentElement && !!A.document.documentElement.setCapture && !!A.document.releaseCapture;
    k = Km.prototype;
    k.ka = function() {
        return this.Va
    }
    ;
    k.qa = function(a) {
        this.m = a
    }
    ;
    k.D = function() {
        Km.M.D.call(this);
        ff(this.handle, ["touchstart", "mousedown"], this.ci, !1, this);
        gi(this.Va);
        this.l && this.h.releaseCapture();
        this.handle = this.target = null
    }
    ;
    function Mm(a) {
        void 0 === a.v && (a.v = Uf(a.target));
        return a.v
    }
    k.ci = function(a) {
        var b = "mousedown" == a.type;
        if (!this.m || this.g || b && (0 != a.ja.button || Kb && a.ctrlKey))
            this.dispatchEvent("earlycancel");
        else if (this.dispatchEvent(new Nm("start",this,a.clientX,a.clientY,a))) {
            this.g = !0;
            b && a.preventDefault();
            b = this.h;
            var c = b.documentElement
              , d = !this.l;
            this.Va.C(b, ["touchmove", "mousemove"], this.fj, {
                capture: d,
                passive: !1
            });
            this.Va.C(b, ["touchend", "mouseup"], this.ze, d);
            this.l ? (c.setCapture(!1),
            this.Va.C(c, "losecapture", this.ze)) : this.Va.C(Id(b), "blur", this.ze);
            this.V && this.Va.C(this.V, "scroll", this.Hj, d);
            this.clientX = this.F = a.clientX;
            this.clientY = this.K = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            this.deltaX = this.i ? rg(this.target) : this.target.offsetLeft;
            this.deltaY = this.target.offsetTop;
            this.u = Fd(rd(this.h).g)
        }
    }
    ;
    k.ze = function(a, b) {
        gi(this.Va);
        this.l && this.h.releaseCapture();
        this.g ? (this.g = !1,
        this.dispatchEvent(new Nm("end",this,a.clientX,a.clientY,a,Om(this, this.deltaX),Pm(this, this.deltaY),b || "touchcancel" == a.type))) : this.dispatchEvent("earlycancel")
    }
    ;
    k.fj = function(a) {
        if (this.m) {
            var b = (this.i && Mm(this) ? -1 : 1) * (a.clientX - this.clientX)
              , c = a.clientY - this.clientY;
            this.clientX = a.clientX;
            this.clientY = a.clientY;
            this.screenX = a.screenX;
            this.screenY = a.screenY;
            if (!this.g) {
                var d = this.F - this.clientX
                  , e = this.K - this.clientY;
                if (0 < d * d + e * e)
                    if (this.dispatchEvent(new Nm("start",this,a.clientX,a.clientY,a)))
                        this.g = !0;
                    else {
                        this.W() || this.ze(a);
                        return
                    }
            }
            c = Qm(this, b, c);
            b = c.x;
            c = c.y;
            this.g && this.dispatchEvent(new Nm("beforedrag",this,a.clientX,a.clientY,a,b,c)) && (Rm(this, a, b, c),
            a.preventDefault())
        }
    }
    ;
    function Qm(a, b, c) {
        var d = Fd(rd(a.h).g);
        b += d.x - a.u.x;
        c += d.y - a.u.y;
        a.u = d;
        a.deltaX += b;
        a.deltaY += c;
        return new gd(Om(a, a.deltaX),Pm(a, a.deltaY))
    }
    k.Hj = function(a) {
        var b = Qm(this, 0, 0);
        a.clientX = this.clientX;
        a.clientY = this.clientY;
        Rm(this, a, b.x, b.y)
    }
    ;
    function Rm(a, b, c, d) {
        a.sf(c, d);
        a.dispatchEvent(new Nm("drag",a,b.clientX,b.clientY,b,c,d))
    }
    function Om(a, b) {
        var c = a.j;
        a = isNaN(c.left) ? null : c.left;
        c = isNaN(c.width) ? 0 : c.width;
        return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    }
    function Pm(a, b) {
        var c = a.j;
        a = isNaN(c.top) ? null : c.top;
        c = isNaN(c.height) ? 0 : c.height;
        return Math.min(null != a ? a + c : Infinity, Math.max(null != a ? a : -Infinity, b))
    }
    k.sf = function(a, b) {
        this.i && Mm(this) ? this.target.style.right = a + "px" : this.target.style.left = a + "px";
        this.target.style.top = b + "px"
    }
    ;
    function Nm(a, b, c, d, e, f, g) {
        He.call(this, a);
        this.clientX = c;
        this.clientY = d;
        this.left = void 0 !== f ? f : b.deltaX;
        this.top = void 0 !== g ? g : b.deltaY;
        this.h = b
    }
    D(Nm, He);
    function Sm(a, b, c, d, e) {
        Fm.call(this, b, c, d, e);
        this.j = a
    }
    D(Sm, Fm);
    Sm.prototype.l = function() {}
    ;
    Sm.prototype.Xf = function() {
        this.l();
        Sm.M.Xf.call(this)
    }
    ;
    Sm.prototype.i = function() {
        this.l();
        Sm.M.i.call(this)
    }
    ;
    Sm.prototype.h = function() {
        this.l();
        Sm.M.h.call(this)
    }
    ;
    function Tm(a, b, c, d, e) {
        if (2 != b.length || 2 != c.length)
            throw Error("Start and end points must be 2D");
        Sm.call(this, a, b, c, d, e)
    }
    D(Tm, Sm);
    Tm.prototype.l = function() {
        var a;
        if (a = this.u)
            void 0 === this.v && (this.v = Uf(this.j)),
            a = this.v;
        this.j.style[a ? "right" : "left"] = Math.round(this.coords[0]) + "px";
        this.j.style.top = Math.round(this.coords[1]) + "px"
    }
    ;
    function Um(a, b, c, d, e) {
        Sm.call(this, a, [b], [c], d, e)
    }
    D(Um, Sm);
    Um.prototype.l = function() {
        this.j.style.width = Math.round(this.coords[0]) + "px"
    }
    ;
    function Vm(a, b, c, d, e) {
        "number" === typeof b && (b = [b]);
        "number" === typeof c && (c = [c]);
        Sm.call(this, a, b, c, d, e);
        if (1 != b.length || 1 != c.length)
            throw Error("Start and end points must be 1D");
        this.v = Wm
    }
    D(Vm, Sm);
    var Xm = 1 / 1024
      , Wm = -1;
    Vm.prototype.l = function() {
        var a = this.coords[0];
        Math.abs(a - this.v) >= Xm && (Tf(this.j, a),
        this.v = a)
    }
    ;
    Vm.prototype.h = function() {
        this.v = Wm;
        Vm.M.h.call(this)
    }
    ;
    Vm.prototype.i = function() {
        this.v = Wm;
        Vm.M.i.call(this)
    }
    ;
    function Ym(a, b, c) {
        Vm.call(this, a, 1, 0, b, c)
    }
    D(Ym, Vm);
    function Zm(a, b, c) {
        Vm.call(this, a, 0, 1, b, c)
    }
    D(Zm, Vm);
    function $m(a, b, c) {
        Vm.call(this, a, 0, 1, b, c)
    }
    D($m, Vm);
    $m.prototype.h = function() {
        this.j.style.display = "";
        $m.M.h.call(this)
    }
    ;
    function an() {
        qf.call(this)
    }
    D(an, qf);
    k = an.prototype;
    k.Ac = 0;
    k.Eb = 0;
    k.tb = 100;
    k.Ka = 0;
    k.Qb = !1;
    k.yd = !1;
    function bn(a, b) {
        b = cn(a, b);
        a.Ac != b && (a.Ac = b + a.Ka > a.tb ? a.tb - a.Ka : b < a.Eb ? a.Eb : b,
        a.Qb || a.yd || a.dispatchEvent("change"))
    }
    function dn(a) {
        return cn(a, a.Ac)
    }
    function en(a, b) {
        b = cn(a, b);
        a.Ka != b && (a.Ka = 0 > b ? 0 : a.Ac + b > a.tb ? a.tb - a.Ac : b,
        a.Qb || a.yd || a.dispatchEvent("change"))
    }
    function fn(a, b) {
        if (a.Eb != b) {
            var c = a.Qb;
            a.Qb = !0;
            a.Eb = b;
            b + a.Ka > a.tb && (a.Ka = a.tb - a.Eb);
            b > a.Ac && bn(a, b);
            b > a.tb && (a.Ka = 0,
            gn(a, b),
            bn(a, b));
            a.Qb = c;
            a.Qb || a.yd || a.dispatchEvent("change")
        }
    }
    function gn(a, b) {
        b = cn(a, b);
        if (a.tb != b) {
            var c = a.Qb;
            a.Qb = !0;
            a.tb = b;
            b < a.Ac + a.Ka && bn(a, b - a.Ka);
            b < a.Eb && (a.Ka = 0,
            fn(a, b),
            bn(a, a.tb));
            b < a.Eb + a.Ka && (a.Ka = a.tb - a.Eb);
            a.Qb = c;
            a.Qb || a.yd || a.dispatchEvent("change")
        }
    }
    function cn(a, b) {
        return a.Eb + Math.round(b - a.Eb)
    }
    ;function hn(a, b) {
        X.call(this, a);
        this.h = new an;
        this.gi = b || dc;
        Q(this.h, "change", this.uh, !1, this)
    }
    D(hn, X);
    k = hn.prototype;
    k.Ge = !1;
    k.Wf = !1;
    k.Dh = 0;
    k.Bc = !0;
    k.sb = !1;
    k.J = function() {
        hn.M.J.call(this);
        var a = this.g.Ca("DIV", this.fc("horizontal"));
        this.Ha(a)
    }
    ;
    k.Ha = function(a) {
        hn.M.Ha.call(this, a);
        O(a, this.fc("horizontal"));
        a = this.o();
        var b = wd(null, "goog-slider-thumb", a)[0];
        b || (b = this.g.Ca("DIV", "goog-slider-thumb"),
        Lk(b, "button"),
        a.appendChild(b));
        this.i = this.T = b;
        a = this.o();
        Lk(a, "slider");
        jn(this)
    }
    ;
    k.O = function() {
        hn.M.O.call(this);
        this.v = new Km(this.i);
        this.N = new Km(this.T);
        this.v.i = this.sb;
        this.N.i = this.sb;
        this.v.sf = this.N.sf = function() {}
        ;
        this.u = new sf(this.o());
        kn(this, !0);
        this.o().tabIndex = 0;
        ln(this)
    }
    ;
    function kn(a, b) {
        b ? (a.ka().C(a.v, "beforedrag", a.Be).C(a.N, "beforedrag", a.Be).C(a.v, ["start", "end"], a.Ee).C(a.N, ["start", "end"], a.Ee).C(a.u, pf, a.Hg).C(a.o(), "click", a.Ce).C(a.o(), "mousedown", a.Ce),
        mn(a, !0)) : (a.ka().ma(a.v, "beforedrag", a.Be).ma(a.N, "beforedrag", a.Be).ma(a.v, ["start", "end"], a.Ee).ma(a.N, ["start", "end"], a.Ee).ma(a.u, pf, a.Hg).ma(a.o(), "click", a.Ce).ma(a.o(), "mousedown", a.Ce),
        mn(a, !1))
    }
    k.fa = function() {
        hn.M.fa.call(this);
        ke(this.v, this.N, this.u, this.qb)
    }
    ;
    k.Be = function(a) {
        var b = a.h == this.v ? this.i : this.T;
        var c = this.o().clientWidth - b.offsetWidth;
        c = a.left / c * (nn(this) - on(this)) + on(this);
        c = a.h == this.v ? Math.min(Math.max(c, on(this)), this.nb() + Math.round(this.h.Ka)) : Math.min(Math.max(c, this.nb()), nn(this));
        pn(this, b, c)
    }
    ;
    k.Ee = function(a) {
        var b = "start" == a.type;
        we(this.o(), "goog-slider-dragging", b);
        we(a.target.handle, "goog-slider-thumb-dragging", b);
        a = a.h == this.v;
        b ? (this.dispatchEvent("e"),
        this.dispatchEvent(a ? "a" : "c")) : (this.dispatchEvent("f"),
        this.dispatchEvent(a ? "b" : "d"))
    }
    ;
    k.Hg = function(a) {
        var b = !0;
        switch (a.keyCode) {
        case 36:
            qn(this, on(this));
            break;
        case 35:
            qn(this, nn(this));
            break;
        case 33:
            rn(this, 10);
            break;
        case 34:
            rn(this, -10);
            break;
        case 37:
            var c = this.sb && ak(this) ? 1 : -1;
            rn(this, a.shiftKey ? 10 * c : c);
            break;
        case 40:
            rn(this, a.shiftKey ? -10 : -1);
            break;
        case 39:
            c = this.sb && ak(this) ? -1 : 1;
            rn(this, a.shiftKey ? 10 * c : c);
            break;
        case 38:
            rn(this, a.shiftKey ? 10 : 1);
            break;
        default:
            b = !1
        }
        b && a.preventDefault()
    }
    ;
    k.Ce = function(a) {
        this.o().focus && this.o().focus();
        var b = a.target;
        Ud(this.i, b) || Ud(this.T, b) || (b = "click" == a.type,
        b && Date.now() < this.Dh + 1E3 || (b || (this.Dh = Date.now()),
        this.Wf ? qn(this, sn(this, a)) : (this.mg(a),
        this.Lb = tn(this, sn(this, a)),
        a = this.Dg,
        b = this.Lb,
        b = this.sb ? rg(b) : b.offsetLeft,
        this.Ci = a > b + this.Lb.offsetWidth,
        a = td(this.o()),
        this.ka().C(a, "mouseup", this.lg, !0).C(this.o(), "mousemove", this.mg),
        this.Ta || (this.Ta = new zi(200),
        this.ka().C(this.Ta, "tick", this.vh)),
        this.vh(),
        this.Ta.start())))
    }
    ;
    k.th = function(a) {
        rn(this, 0 < a.detail ? -1 : 1);
        a.preventDefault()
    }
    ;
    k.vh = function() {
        var a, b = this.Dg;
        var c = this.Lb;
        c = this.sb ? rg(c) : c.offsetLeft;
        this.Ci ? b > c + this.Lb.offsetWidth && (a = un(this, this.Lb) + 10) : b < c && (a = un(this, this.Lb) - 10);
        void 0 !== a && pn(this, this.Lb, a)
    }
    ;
    k.lg = function() {
        this.Ta && this.Ta.stop();
        var a = td(this.o());
        this.ka().ma(a, "mouseup", this.lg, !0).ma(this.o(), "mousemove", this.mg)
    }
    ;
    function vn(a, b) {
        b = Nf(b, a.o());
        return a.sb && ak(a) ? a.o().clientWidth - b.x : b.x
    }
    k.mg = function(a) {
        this.Dg = vn(this, a)
    }
    ;
    function sn(a, b) {
        var c = on(a)
          , d = nn(a)
          , e = a.i.offsetWidth
          , f = a.o().clientWidth - e;
        a = vn(a, b) - e / 2;
        return (d - c) * a / f + c
    }
    function un(a, b) {
        if (b == a.i)
            return dn(a.h);
        if (b == a.T)
            return dn(a.h) + Math.round(a.h.Ka);
        throw Error("Illegal thumb element. Neither minThumb nor maxThumb");
    }
    function rn(a, b) {
        1 > Math.abs(b) && (b = 1 * (0 < b ? 1 : 0 > b ? -1 : b));
        var c = un(a, a.i) + b;
        b = un(a, a.T) + b;
        c = fd(c, on(a), nn(a));
        b = fd(b, on(a), nn(a));
        wn(a, c, b - c)
    }
    function pn(a, b, c) {
        var d = cn(a.h, c);
        c = b == a.i ? d : dn(a.h);
        b = b == a.T ? d : dn(a.h) + Math.round(a.h.Ka);
        c >= on(a) && b >= c && nn(a) >= b && wn(a, c, b - c)
    }
    function wn(a, b, c) {
        on(a) <= b && b <= nn(a) - c && 0 <= c && c <= nn(a) - b && (b != a.nb() || c != Math.round(a.h.Ka)) && (a.h.yd = !0,
        en(a.h, 0),
        bn(a.h, b),
        en(a.h, c),
        a.h.yd = !1,
        a.uh(null))
    }
    function on(a) {
        a = a.h;
        return cn(a, a.Eb)
    }
    function nn(a) {
        a = a.h;
        return cn(a, a.tb)
    }
    function tn(a, b) {
        return b <= dn(a.h) + Math.round(a.h.Ka) / 2 ? a.i : a.T
    }
    k.uh = function() {
        ln(this);
        jn(this);
        this.dispatchEvent("change")
    }
    ;
    function ln(a) {
        if (a.i && !a.Ge) {
            var b = xn(a, un(a, a.i));
            var c = xn(a, un(a, a.T))
              , d = a.sb && ak(a) ? "right" : "left";
            a.i.style[d] = b.x + "px";
            a.T.style[d] = c.x + "px";
            a.za && (b = yn(b.x, c.x, a.i.offsetWidth),
            a.za.style[d] = b.offset + "px",
            a.za.style.width = b.size + "px")
        }
    }
    function yn(a, b, c) {
        var d = Math.ceil(c / 2);
        return {
            offset: a + d,
            size: Math.max(b - a + c - 2 * d, 0)
        }
    }
    function xn(a, b) {
        var c = new gd;
        if (a.i) {
            var d = on(a)
              , e = nn(a);
            b = b == d && d == e ? 0 : (b - d) / (e - d);
            d = a.o().clientWidth - a.i.offsetWidth;
            c.x = Math.round(b * d);
            c.y = a.Wf ? 0 : a.i.offsetTop
        }
        return c
    }
    function qn(a, b) {
        b = fd(b, on(a), nn(a));
        a.Ge && (a.Yd.stop(!0),
        a.Yd.G());
        var c = new Jm
          , d = tn(a, b)
          , e = a.nb()
          , f = Math.round(a.h.Ka)
          , g = un(a, d)
          , h = xn(a, g);
        1 > Math.abs(b - g) && (b = g + (b > g ? 1 : -1),
        b = fd(b, on(a), nn(a)));
        pn(a, d, b);
        b = xn(a, un(a, d));
        h = new Tm(d,[h.x, h.y],[b.x, d.offsetTop],100);
        h.u = a.sb;
        c.add(h);
        a.za && (h = xn(a, e),
        g = xn(a, e + f),
        e = h,
        f = g,
        d == a.i ? e = b : f = b,
        d = yn(h.x, g.x, a.i.offsetWidth),
        e = yn(e.x, f.x, a.i.offsetWidth),
        b = new Tm(a.za,[d.offset, a.za.offsetTop],[e.offset, a.za.offsetTop],100),
        d = new Um(a.za,d.size,e.size,100),
        b.u = a.sb,
        d.u = a.sb,
        c.add(b),
        c.add(d));
        a.Yd = c;
        a.ka().C(c, "end", a.Ui);
        a.Ge = !0;
        c.play(!1)
    }
    k.Ui = function() {
        this.Ge = !1;
        this.dispatchEvent("g")
    }
    ;
    k.D = function() {
        hn.M.D.call(this);
        this.Ta && this.Ta.G();
        delete this.Ta;
        this.Yd && this.Yd.G();
        delete this.Yd;
        delete this.i;
        delete this.T;
        this.za && delete this.za;
        this.h.G();
        delete this.h;
        this.u && (this.u.G(),
        delete this.u);
        this.qb && (this.qb.G(),
        delete this.qb);
        this.v && (this.v.G(),
        delete this.v);
        this.N && (this.N.G(),
        delete this.N)
    }
    ;
    k.nb = function() {
        return dn(this.h)
    }
    ;
    k.ec = function(a) {
        pn(this, this.i, a)
    }
    ;
    k.L = function(a) {
        T(this.o(), a);
        a && ln(this)
    }
    ;
    function jn(a) {
        var b = a.o();
        b && (Mk(b, "valuemin", on(a)),
        Mk(b, "valuemax", nn(a)),
        Mk(b, "valuenow", a.nb()),
        Mk(b, "valuetext", a.gi(a.nb()) || ""))
    }
    function mn(a, b) {
        b ? (a.qb || (a.qb = new um(a.o())),
        a.ka().C(a.qb, "mousewheel", a.th, {
            passive: !1
        })) : a.ka().ma(a.qb, "mousewheel", a.th, {
            passive: !1
        })
    }
    k.qa = function(a) {
        this.Bc != a && this.dispatchEvent(a ? "enable" : "disable") && (this.Bc = a,
        kn(this, a),
        a || this.lg(),
        we(this.o(), "goog-slider-disabled", !a))
    }
    ;
    k.isEnabled = function() {
        return this.Bc
    }
    ;
    function zn(a, b) {
        hn.call(this, a, b);
        en(this.h, 0)
    }
    D(zn, hn);
    zn.prototype.fc = function(a) {
        return "vertical" == a ? "goog-slider-vertical" : "goog-slider-horizontal"
    }
    ;
    function An(a) {
        this.Ig = a || []
    }
    ;function Bn(a, b, c) {
        qf.call(this);
        this.wd = a;
        this.v = c;
        this.g = b;
        Q(b, [Cn, Dn, En, Fn], this.handleEvent, !1, this);
        this.l = null;
        this.h = [];
        this.j = -1;
        this.i = 0;
        this.m = this.u = null;
        this.F = {}
    }
    D(Bn, qf);
    Bn.prototype.K = 10;
    var Cn = "hilite"
      , Dn = "select"
      , Fn = "dismiss"
      , En = "canceldismiss";
    k = Bn.prototype;
    k.handleEvent = function(a) {
        var b = this.wd;
        if (a.target == this.g)
            switch (a.type) {
            case Cn:
                this.Lc(a.Tc);
                break;
            case Dn:
                var c = !1;
                if ("number" === typeof a.Tc) {
                    a = a.Tc;
                    var d = this.h[Gn(this, a)];
                    c = !!d && b.Mf && b.Mf(d);
                    d && !c && this.j != a && this.Lc(a)
                }
                c || Hn(this);
                break;
            case En:
                In(this);
                break;
            case Fn:
                Jn(this)
            }
    }
    ;
    function Kn(a) {
        for (var b = a.i + a.h.length - 1, c = a.j, d = 0; d < a.h.length; d++) {
            if (c >= a.i && c < b)
                c++;
            else if (-1 == c)
                c = a.i;
            else
                break;
            if (a.Lc(c))
                break
        }
    }
    k.Lc = function(a) {
        var b = Gn(this, a)
          , c = this.h[b];
        return c && this.wd.Mf && this.wd.Mf(c) ? !1 : (this.j = a,
        this.g.Lc(a),
        -1 != b)
    }
    ;
    function Hn(a) {
        var b = Gn(a, a.j);
        if (-1 != b) {
            var c = a.h[b]
              , d = a.v;
            if (d.na) {
                var e = c.toString();
                if (d.j) {
                    var f = Ln(d, d.na.value, Mn(d.na)[0])
                      , g = Nn(d, d.na.value);
                    d.K && !d.K.test(e) && (e = jd(e) + d.N);
                    d.fi && (0 == f || /^[\s\xa0]*$/.test(g[f - 1]) || (e = " " + e),
                    f == g.length - 1 && (e += " "));
                    if (e != g[f]) {
                        g[f] = e;
                        e = d.na;
                        (Ib || H) && e.blur();
                        e.value = g.join("");
                        for (var h = 0, l = 0; l <= f; l++)
                            h += g[l].length;
                        e.focus();
                        f = h;
                        g = d.na;
                        On(g) && (g.selectionStart = f);
                        g = d.na;
                        On(g) && (g.selectionEnd = f)
                    }
                } else
                    d.na.value = e;
                d.bg = !0
            }
            a.Wb();
            a.dispatchEvent({
                type: "update",
                Tc: c,
                index: b
            });
            return !0
        }
        a.Wb();
        a.dispatchEvent({
            type: "update",
            Tc: null,
            index: null
        });
        return !1
    }
    k.Wb = function() {
        this.j = -1;
        this.l = null;
        this.i += this.h.length;
        this.h = [];
        window.clearTimeout(this.m);
        this.m = null;
        this.g.Wb();
        this.dispatchEvent("suggestionsupdate");
        this.dispatchEvent(Fn)
    }
    ;
    function Jn(a) {
        a.m || (a.m = window.setTimeout(Ja(a.Wb, a), 100))
    }
    k.yh = function() {
        return this.m ? (window.clearTimeout(this.m),
        this.m = null,
        !0) : !1
    }
    ;
    function In(a) {
        a.yh() || window.setTimeout(Ja(a.yh, a), 10)
    }
    k.D = function() {
        Bn.M.D.call(this);
        delete this.F;
        this.g.G();
        this.v.G();
        this.wd = null
    }
    ;
    k.vj = function(a, b, c) {
        this.l == a && this.ag(b, c)
    }
    ;
    k.ag = function(a, b) {
        var c = "object" == Ba(b) && b;
        b = (c ? c.h() : b) ? Gn(this, this.j) : -1;
        this.i += this.h.length;
        this.h = a;
        for (var d = [], e = 0; e < a.length; ++e)
            d.push({
                id: this.i + e,
                data: a[e]
            });
        a = null;
        this.u && (a = this.F[Ea(this.u)] || this.u);
        this.g.oi = a;
        this.g.ag(d, this.l, this.u);
        a = !0;
        c && void 0 !== c.g() && (a = c.g());
        this.j = -1;
        (a || 0 <= b) && 0 != d.length && this.l && (0 <= b ? this.Lc(this.i + b) : Kn(this));
        this.dispatchEvent("suggestionsupdate")
    }
    ;
    function Gn(a, b) {
        b -= a.i;
        return 0 > b || b >= a.h.length ? -1 : b
    }
    k.update = function(a) {
        this.v.update(a)
    }
    ;
    function Mn(a) {
        var b = 0
          , c = 0;
        On(a) && (b = a.selectionStart,
        c = -1);
        return [b, c]
    }
    function On(a) {
        try {
            return "number" == typeof a.selectionStart
        } catch (b) {
            return !1
        }
    }
    ;function Pn(a, b, c, d) {
        M.call(this);
        d = d || 150;
        this.j = null != c ? c : !0;
        this.m = a || ",;";
        this.N = this.m.charAt(0);
        a = this.j ? "[\\s" + this.m + "]+" : "[\\s]+";
        this.V = new RegExp("^" + a + "|" + a + "$","g");
        this.K = new RegExp("\\s*[" + this.m + "]$");
        this.F = b || "";
        this.T = this.j;
        this.i = 0 < d ? new zi(d) : null;
        this.h = new U(this);
        this.u = new U(this);
        this.l = new sf;
        this.v = -1
    }
    D(Pn, M);
    k = Pn.prototype;
    k.fi = !0;
    k.Vh = !0;
    k.Uh = !0;
    k.na = null;
    k.Rf = "";
    k.zc = !1;
    k.bg = !1;
    function Qn(a, b) {
        Sd(b) && (Lk(b, "combobox"),
        Mk(b, "autocomplete", "list"));
        a.h.C(b, "focus", a.Jg);
        a.h.C(b, "blur", a.mi);
        if (!a.na && (a.u.C(b, "keydown", a.Fj),
        Sd(b))) {
            var c = td(b);
            try {
                var d = c && c.activeElement;
                var e = d && d.nodeName ? d : null
            } catch (f) {
                e = null
            }
            e == b && Rn(a, b)
        }
    }
    k.D = function() {
        Pn.M.D.call(this);
        this.h.G();
        delete this.h;
        this.u.G();
        this.l.G();
        je(this.i)
    }
    ;
    function Sn(a) {
        a.Vh = !1;
        a.Uh = !1
    }
    function Tn(a, b) {
        switch (b.keyCode) {
        case 40:
            if (a.g.g.isVisible()) {
                Kn(a.g);
                b.preventDefault();
                return
            }
            if (!a.j) {
                a.update(!0);
                b.preventDefault();
                return
            }
            break;
        case 38:
            if (a.g.g.isVisible()) {
                a: {
                    a = a.g;
                    for (var c = a.j, d = 0; d < a.h.length; d++) {
                        if (c > a.i)
                            c--;
                        else
                            break;
                        if (a.Lc(c))
                            break a
                    }
                }
                b.preventDefault();
                return
            }
            break;
        case 9:
            if (!a.g.g.isVisible() || b.shiftKey)
                a.g.Wb();
            else if (a.update(),
            Hn(a.g) && a.T) {
                b.preventDefault();
                return
            }
            break;
        case 13:
            if (a.g.g.isVisible()) {
                if (a.update(),
                Hn(a.g)) {
                    b.preventDefault();
                    b.stopPropagation();
                    return
                }
            } else
                a.g.Wb();
            break;
        case 27:
            if (a.g.g.isVisible()) {
                a.g.Wb();
                b.preventDefault();
                b.stopPropagation();
                return
            }
            break;
        case 229:
            if (!a.zc) {
                a.zc || (a.h.C(a.na, "keyup", a.Ih),
                a.h.C(a.na, "keypress", a.Hh),
                a.zc = !0);
                return
            }
        }
        Un(a, b)
    }
    function Un(a, b) {
        var c = a.j && b.h && -1 != a.m.indexOf(String.fromCharCode(b.h));
        a.Vh && c && a.update();
        a.Uh && c && Hn(a.g) && b.preventDefault()
    }
    k.ni = function() {
        return !1
    }
    ;
    k.Jg = function(a) {
        Rn(this, a.target || null)
    }
    ;
    function Rn(a, b) {
        gi(a.u);
        a.g && In(a.g);
        b != a.na && (a.na = b,
        a.i && (a.i.start(),
        a.h.C(a.i, "tick", a.Mh)),
        a.Rf = a.na.value,
        tf(a.l, a.na),
        a.h.C(a.l, pf, a.Kg),
        a.h.C(a.na, "mousedown", a.Jh),
        H && a.h.C(a.na, "keypress", a.Gh))
    }
    k.mi = function() {
        this.na && (this.h.ma(this.l, pf, this.Kg),
        xf(this.l),
        this.h.ma(this.na, "keyup", this.ni),
        this.h.ma(this.na, "mousedown", this.Jh),
        H && this.h.ma(this.na, "keypress", this.Gh),
        this.zc && Vn(this),
        this.na = null,
        this.i && (this.i.stop(),
        this.h.ma(this.i, "tick", this.Mh)),
        this.g && Jn(this.g))
    }
    ;
    k.Mh = function() {
        this.update()
    }
    ;
    k.Fj = function(a) {
        this.Jg(a)
    }
    ;
    k.Kg = function(a) {
        this.v = a.keyCode;
        this.g && Tn(this, a)
    }
    ;
    k.Hh = function() {
        this.zc && 229 != this.v && Vn(this)
    }
    ;
    k.Ih = function(a) {
        this.zc && (13 == a.keyCode || 77 == a.keyCode && a.ctrlKey) && Vn(this)
    }
    ;
    k.Jh = function() {}
    ;
    function Vn(a) {
        a.zc && (a.zc = !1,
        a.h.ma(a.na, "keypress", a.Hh),
        a.h.ma(a.na, "keyup", a.Ih))
    }
    k.Gh = function(a) {
        Un(this, a)
    }
    ;
    k.update = function(a) {
        if (this.na && (a || this.na.value != this.Rf)) {
            if (a || !this.bg) {
                a = Mn(this.na)[0];
                var b = this.na.value;
                a = Nn(this, b)[Ln(this, b, a)];
                b = this.V ? String(a).replace(this.V, "") : a;
                if (this.g && (this.g.u = this.na,
                a = this.g,
                a.l != b)) {
                    a.l = b;
                    var c = a.wd;
                    b = a.l;
                    var d = a.K
                      , e = Ja(a.vj, a);
                    c = c.Ig;
                    var f = [];
                    if ("" != b)
                        for (var g = new RegExp("(^|\\W+)" + ld(b),"i"), h = 0; h < c.length && f.length < d; h++) {
                            var l = c[h];
                            String(l).match(g) && f.push(l)
                        }
                    e(b, f);
                    In(a)
                }
            }
            this.Rf = this.na.value
        }
        this.bg = !1
    }
    ;
    function Ln(a, b, c) {
        a = Nn(a, b);
        if (c == b.length)
            return a.length - 1;
        for (var d = b = 0, e = 0; d < a.length && e <= c; d++)
            e += a[d].length,
            b = d;
        return b
    }
    function Nn(a, b) {
        if (!a.j)
            return [b];
        b = String(b).split("");
        for (var c = [], d = [], e = 0, f = !1; e < b.length; e++)
            a.F && -1 != a.F.indexOf(b[e]) ? (f || (c.push(d.join("")),
            d.length = 0),
            d.push(b[e]),
            f = !f) : f || -1 == a.m.indexOf(b[e]) ? d.push(b[e]) : (d.push(b[e]),
            c.push(d.join("")),
            d.length = 0);
        c.push(d.join(""));
        return c
    }
    ;function Wn(a, b, c, d) {
        qf.call(this);
        this.oa = a || document.body;
        this.g = rd(this.oa);
        this.T = !a;
        this.s = null;
        this.v = "";
        this.h = [];
        this.j = [];
        this.F = this.u = -1;
        this.l = !1;
        this.className = "ac-renderer";
        this.V = "ac-highlighted";
        this.m = b || null;
        this.ha = null != d ? d : !0;
        this.ga = !!c
    }
    D(Wn, qf);
    k = Wn.prototype;
    k.o = function() {
        return this.s
    }
    ;
    k.ag = function(a, b, c) {
        this.v = b;
        this.h = a;
        this.u = -1;
        this.F = La();
        this.i = c;
        this.j = [];
        Xn(this)
    }
    ;
    k.Wb = function() {
        this.l && (this.l = !1,
        Yn(this, !1),
        T(this.s, !1))
    }
    ;
    function Zn(a) {
        a.l || (a.l = !0,
        Yn(a, !0),
        T(a.s, !0))
    }
    function Yn(a, b) {
        a.i && (Mk(a.i, "haspopup", b),
        Mk(a.s, "expanded", b),
        Mk(a.i, "expanded", b),
        b ? Mk(a.i, "owns", a.s.id) : (a.i.removeAttribute("aria-owns"),
        Nk(a.i, null)))
    }
    k.isVisible = function() {
        return this.l
    }
    ;
    function $n(a, b) {
        var c = 0 <= b && b < a.h.length ? a.h[b] : void 0
          , d = 0 <= b && b < a.j.length ? a.j[b] : void 0;
        if (a.dispatchEvent({
            type: "rowhilite",
            j: d,
            Tc: c ? c.data : null
        }) && (0 <= a.u && ve(a.j[a.u], ["ac-active", "active"]),
        a.u = b,
        d)) {
            te(d, ["ac-active", "active"]);
            a.i && Nk(a.i, d);
            b = (a = a.s || Gd(document)) || Gd(document);
            var e = Mf(d)
              , f = Mf(b)
              , g = cg(b);
            b == Gd(document) ? (c = e.x - b.scrollLeft,
            e = e.y - b.scrollTop,
            H && !Yb(10) && (c += g.left,
            e += g.top)) : (c = e.x - f.x - g.left,
            e = e.y - f.y - g.top);
            d = Sf(d);
            g = b.clientHeight - d.height;
            f = b.scrollLeft;
            var h = b.scrollTop;
            f += Math.min(c, Math.max(c - (b.clientWidth - d.width), 0));
            h += Math.min(e, Math.max(e - g, 0));
            b = new gd(f,h);
            a.scrollLeft = b.x;
            a.scrollTop = b.y
        }
    }
    k.Lc = function(a) {
        if (-1 == a)
            $n(this, -1);
        else
            for (var b = 0; b < this.h.length; b++)
                if (this.h[b].id == a) {
                    $n(this, b);
                    break
                }
    }
    ;
    function ao(a) {
        if (!a.s) {
            var b = a.g.Ca("DIV", {
                style: "display:none"
            });
            a.s = b;
            te(b, gb(a.className).split(" "));
            Lk(b, "listbox");
            b.id = ":" + (Qj.Ra().g++).toString(36);
            a.g.appendChild(a.oa, b);
            Q(b, "click", a.Lg, !1, a);
            Q(b, "mousedown", a.Mg, !1, a);
            Q(b, "mouseover", a.sh, !1, a)
        }
    }
    function Xn(a) {
        ao(a);
        a.ua && (a.s.style.minWidth = a.ua.clientWidth - 0 + "px");
        a.N && (a.s.style.maxWidth = a.N.clientWidth - 0 + "px");
        a.j.length = 0;
        a.g.ii(a.s);
        a.m && a.m.La ? a.m.La(a, a.s, a.h, a.v) : a.h.forEach(function(b) {
            var c = this.v
              , d = this.g.Ca("DIV", {
                className: "ac-row",
                id: ":" + (Qj.Ra().g++).toString(36)
            });
            Lk(d, "option");
            this.m && this.m.Lj ? this.m.Lj(b, c, d) : Vd(d, b.data.toString());
            c && this.ha && (this.K = !1,
            bo(this, d, c));
            O(d, "ac-row");
            this.j.push(d);
            b = d;
            this.g.appendChild(this.s, b)
        }, a);
        0 == a.h.length ? a.Wb() : (Zn(a),
        a.la(),
        Wf(a.s, !0))
    }
    k.la = function() {
        if (this.i && this.T) {
            var a = this.oi || this.i;
            var b = this.ga ? 5 : 1;
            sg(a, b, this.s, b ^ 1, null, null, 65)
        }
    }
    ;
    k.D = function() {
        this.s && (ff(this.s, "click", this.Lg, !1, this),
        ff(this.s, "mousedown", this.Mg, !1, this),
        ff(this.s, "mouseover", this.sh, !1, this),
        this.g.ff(this.s),
        this.s = null,
        this.l = !1);
        je(this.za);
        this.oa = null;
        Wn.M.D.call(this)
    }
    ;
    function bo(a, b, c) {
        if (!a.K)
            if (3 == b.nodeType) {
                var d = null;
                Array.isArray(c) && 1 < c.length && (d = c.slice(1));
                c = co(c);
                if (0 != c.length) {
                    var e = b.nodeValue
                      , f = new RegExp("\\b(?:" + c + ")","gi");
                    c = [];
                    for (var g = 0, h = f.exec(e), l = 0; h; )
                        l++,
                        c.push(e.substring(g, h.index)),
                        c.push(e.substring(h.index, f.lastIndex)),
                        g = f.lastIndex,
                        h = f.exec(e);
                    c.push(e.substring(g));
                    if (1 < c.length) {
                        for (d = 0; 1 > d; d++)
                            e = 2 * d,
                            b.nodeValue = c[e],
                            f = Kd(a.g.g, "B"),
                            f.className = a.V,
                            a.g.appendChild(f, a.g.g.createTextNode(String(c[e + 1]))),
                            f = b.parentNode.insertBefore(f, b.nextSibling),
                            b.parentNode.insertBefore(a.g.g.createTextNode(""), f.nextSibling),
                            b = f.nextSibling;
                        b.nodeValue = c.slice(2).join("");
                        a.K = !0
                    } else
                        d && bo(a, b, d)
                }
            } else
                for (b = b.firstChild; b; )
                    d = b.nextSibling,
                    bo(a, b, c),
                    b = d
    }
    function co(a) {
        var b = "";
        if (!a)
            return b;
        Array.isArray(a) && (a = a.filter(function(c) {
            return !/^[\s\xa0]*$/.test(null == c ? "" : String(c))
        }));
        Array.isArray(a) ? b = 0 < a.length ? ld(a[0]) : "" : /^\W/.test(a) || (b = ld(a));
        return b
    }
    function eo(a, b) {
        for (; b && b != a.s && !se(b, "ac-row"); )
            b = b.parentNode;
        return b ? a.j.indexOf(b) : -1
    }
    k.Lg = function(a) {
        var b = eo(this, a.target);
        0 <= b && this.dispatchEvent({
            type: Dn,
            Tc: this.h[b].id
        });
        a.stopPropagation()
    }
    ;
    k.Mg = function(a) {
        a.stopPropagation();
        a.preventDefault()
    }
    ;
    k.sh = function(a) {
        a = eo(this, a.target);
        0 <= a && !(300 > La() - this.F) && this.dispatchEvent({
            type: Cn,
            Tc: this.h[a].id
        })
    }
    ;
    function fo(a, b) {
        for (var c = -1, d, e = 0, f = a.length, g = Number.MAX_VALUE; e < f; e++)
            d = Math.abs(a[e] - b),
            d < g && (g = d,
            c = e);
        return c
    }
    function go(a, b, c, d, e) {
        for (var f = 0; f < e; f++)
            c[d + f] = a[b + f]
    }
    ;function ho(a, b, c) {
        a = a[b];
        var d = Ba(a);
        if (d in io && io[d] & c)
            return a;
        throw Error("Invalid type '" + d + "' of '" + b + "'");
    }
    function jo(a) {
        return ko(A.JSON.stringify(a))
    }
    function ko(a) {
        return A.JSON.parse(a, function(b, c) {
            if (null !== c && "object" === typeof c && "__c"in c) {
                var d, e;
                if ((d = c.__c) && (e = lo[d]))
                    b = e(c);
                else
                    throw Error(void 0);
            } else
                b = c;
            return b
        })
    }
    var io = {
        undefined: 1,
        "null": 2,
        number: 4,
        "boolean": 8,
        string: 16,
        array: 32,
        object: 64
    }
      , lo = {};
    function mo(a) {
        return A.JSON.stringify(a)
    }
    ;var no = v(Object, "assign");
    function oo(a) {
        for (var b in a)
            th(a[b]) || delete a[b]
    }
    ;function po(a) {
        a = ko(a);
        if (!fb(a[0], "ts.") && !fb(a[0], "tibo."))
            throw Error("Bad NS." + mo(a));
        var b = za(a[0]);
        if (!gc(b))
            throw Error("Bad gen." + mo(a));
        if (1 < a.length) {
            a.shift();
            var c = a
        }
        return b.apply(null, c)
    }
    function qo(a) {
        try {
            var b = document.createEvent("Event");
            b.initEvent("elresized", !0, !1)
        } catch (c) {
            b = null
        }
        b && a.dispatchEvent(b)
    }
    ;function ro(a) {
        X.call(this);
        this.T = {};
        this.za = so;
        this.F = 5E3;
        this.ha = 0;
        this.v = a;
        to.push(this)
    }
    z(ro, X);
    k = ro.prototype;
    k.Ha = function(a) {
        this.s = a;
        a = $h(a, "solo");
        try {
            this.v = ko(a)
        } catch (b) {
            W("sc error", b)
        }
        uo(this, this.v)
    }
    ;
    k.O = function() {
        X.prototype.O.call(this);
        this.ha || this.update();
        this.za === vo && (this.m = new Ei(function() {
            this.update()
        }
        ,this,{
            he: this.F
        }),
        this.m.start())
    }
    ;
    k.fa = function() {
        X.prototype.fa.call(this);
        this.m && (this.m.G(),
        this.m = void 0)
    }
    ;
    k.J = function() {
        X.prototype.J.call(this);
        uo(this, this.v)
    }
    ;
    k.D = function() {
        this.j && this.j.G();
        this.i = null;
        Wa(to, this);
        X.prototype.D.call(this)
    }
    ;
    function wo(a) {
        var b = new M;
        Ra(yd("solo", a), function(c) {
            var d = new ro;
            d.ya(c);
            N(b, d)
        });
        return b
    }
    k.update = function(a) {
        if (!this.W() && !this.ua) {
            this.ua = !0;
            this.ha++;
            var b = this.s
              , c = this
              , d = function(f) {
                function g() {
                    c.i && (Qd(c.i),
                    c.i = null);
                    c.ua = !1
                }
                if (null !== f) {
                    var h = function(l) {
                        t.Promise.resolve().then(function() {
                            c.W() || (c.j && c.j.G(),
                            c.j = new M,
                            Od(b),
                            l.La(b),
                            N(c.j, l),
                            N(c.j, xo(c)),
                            qo(b))
                        }).then(g, g)
                    };
                    if (c.ga) {
                        f = ph(c.ga, c, [f]);
                        if (f instanceof Lg) {
                            f.then(h);
                            return
                        }
                        if (f instanceof t.Promise) {
                            f.then(h);
                            return
                        }
                    }
                    h(f)
                } else
                    g()
            };
            this.u = no({}, this.rb, a);
            if (!this.$a) {
                var e = $h(this.s, "soloData");
                if (null !== e)
                    try {
                        e = ko(e)
                    } catch (f) {
                        W("sfd error", f),
                        e = null
                    }
                this.$a = !0
            }
            e ? d(e) : (this.i = L("IMG"),
            R(this.i, {
                position: "absolute"
            }),
            T(this.i, !1),
            b.insertBefore(this.i, b.childNodes[0] || null),
            Bi(function() {
                this.i && (Qf(this.i, 16, 16),
                Bd(this.i, {
                    src: "/img/look1/loading16x16.gif"
                }),
                T(this.i, !0))
            }, 1E3, this),
            a = ph(this.Ta, this, [this.T, this.u, d]),
            th(a) && a.then(d))
        }
    }
    ;
    function yo(a, b) {
        var c = {}, d;
        b = (d = dl(b).solo) ? d.clicked : zo(b)[0];
        (d = b.name) && (c[d] = hm(b));
        a.update(c)
    }
    function xo(a) {
        var b = wd("FORM", null, a.s)
          , c = new U;
        Ra(b, function(d) {
            c.C(d, "submit", function(f) {
                yo(a, f.currentTarget);
                f.preventDefault();
                f.stopPropagation()
            });
            var e = zo(d);
            Ra(e, function(f) {
                c.C(f, ["focus", "click"], function(g) {
                    g = {
                        clicked: g.currentTarget
                    };
                    dl(d).solo = g
                })
            })
        });
        return c
    }
    function uo(a, b) {
        for (var c in b) {
            var d = b[c];
            switch (c) {
            case "method":
                a.Ta = d || dc;
                break;
            case "parms":
                a.T = d;
                break;
            case "when":
                a.za = d;
                break;
            case "refresh":
                a.F = d;
                break;
            case "query":
                a.rb = d;
                break;
            case "transformer":
                a.ga = d;
                break;
            case "properties":
                a.pb = d
            }
        }
    }
    function zo(a) {
        return Sa(a.elements, function(b) {
            var c = b.tagName;
            return ("INPUT" == c || "BUTTON" == c) && "submit" == b.type && !b.disabled
        })
    }
    function Ao(a) {
        for (var b = 0; b < to.length; b++) {
            var c = to[b].o();
            if (c && Ud(c, a))
                return to[b]
        }
        return null
    }
    var so = "onshow"
      , vo = "periodically"
      , to = [];
    var Bo;
    function Co(a) {
        var b = new M;
        try {
            var c = $h(a, Bo || (Bo = nd("ts-slider")));
            if (c && (c = ko(c))) {
                var d = c.values
                  , e = 2 < d.length
                  , f = zd("ts-slider-bar", a)
                  , g = Ad("INPUT", null, a)
                  , h = yd("ts-slider-btn", a)
                  , l = qd(hm(g))
                  , m = e ? fo(d, l) : l;
                a = function() {
                    zn.call(this)
                }
                ;
                z(a, zn);
                a.prototype.O = function() {
                    zn.prototype.O.call(this);
                    A.ResizeObserver && (this.wc = new ResizeObserver(function() {
                        var p = n.nb()
                          , u = p + 1;
                        u > nn(n) && (u = on(n));
                        n.ec(u);
                        n.ec(p)
                    }
                    ),
                    this.wc.observe(this.s))
                }
                ;
                a.prototype.fa = function() {
                    zn.prototype.fa.call(this);
                    this.wc && this.wc.disconnect()
                }
                ;
                var n = new a;
                n.sb = !0;
                fn(n.h, e ? 0 : d[0]);
                gn(n.h, e ? d.length - 1 : d[1]);
                n.Wf = !0;
                O(f, "goog-slider");
                Nd(f, K("DIV", "ts-slider-cut"), K("DIV", "goog-slider-thumb"));
                n.ya(f);
                N(b, n);
                n.C("change", function() {
                    var p = n.nb();
                    e && (p = d[p]);
                    jm(g, p)
                });
                n.ec(m);
                var q = new U;
                N(b, q);
                for (m = 0; m < h.length; m++)
                    q.C(h[m], "click", function(p) {
                        rn(n, p)
                    }
                    .bind(null, 2 * m - 1));
                q.C(g, "change", function() {
                    n.ec(qd(hm(g)))
                });
                O(g, "ts-onchangeable");
                q.C(new sf(f), pf, function(p) {
                    if (!(p.ctrlKey || p.shiftKey || p.altKey || p.metaKey) && 13 == p.keyCode) {
                        p = g.form;
                        var u = Ao(p);
                        u ? yo(u, p) : gc(p.submit) && p.submit()
                    }
                });
                c.autofocus && f.focus()
            }
        } catch (p) {}
        return b
    }
    function Do(a) {
        var b = new M;
        Ra(yd("ts-slider", a), function(c) {
            N(b, Co(c))
        });
        return b
    }
    function Eo(a, b) {
        function c() {
            X.call(this)
        }
        var d = V("Easy")
          , e = V("Hard");
        z(c, X);
        c.Error = Sj;
        c.prototype.J = function() {
            var f = K("DIV", "ts-slider unselectable", K("DIV", "ts-slider-ctrl", d ? K("DIV", "ts-slider-btn", d) : null, K("DIV", {
                "class": "ts-slider-bar"
            }), e ? K("DIV", "ts-slider-btn", e) : null), K("INPUT", {
                type: "number",
                name: "pieces",
                value: a,
                readOnly: !0,
                tabIndex: -1,
                autocomplete: "off",
                min: b[0],
                max: b[b.length - 1]
            }));
            Zh(f, nd("ts-slider"), mo({
                autofocus: !0,
                values: b
            }));
            this.s = f
        }
        ;
        c.prototype.O = function() {
            X.prototype.O.call(this);
            this.ti || (N(this, Co(this.s)),
            this.ti = !0)
        }
        ;
        return new c
    }
    function Fo(a) {
        var b = new M
          , c = yd("ts-colorpicker", a);
        if (c.length)
            for (var d = nd("ts-colorpicker"), e = 0; e < c.length; e++)
                try {
                    var f = c[e]
                      , g = yd("ts-colorpicker-cell", a)
                      , h = Ad("INPUT", null, f)
                      , l = new U;
                    N(b, l);
                    l.C(h, "change", function() {
                        var u = de(this);
                        Go(u)
                    }
                    .bind(h));
                    O(h, "ts-onchangeable");
                    for (var m = 0, n = g.length; m < n; m++) {
                        var q = $h(g[m], d)
                          , p = g[m];
                        R(p, {
                            cursor: "pointer",
                            "background-color": q
                        });
                        l.C(p, "click", function() {
                            var u = de(this);
                            jm(Ad("INPUT", null, u), $h(this, d));
                            Go(u)
                        }
                        .bind(p))
                    }
                    Go(f)
                } catch (u) {
                    W("cnicp")
                }
        return b
    }
    function Go(a) {
        var b = hm(Ad("INPUT", null, a));
        b && (a = zd("ts-colorpicker-preview", a),
        R(a, {
            "background-color": b
        }),
        a.title = b)
    }
    function Ho(a, b) {
        var c = 0;
        for (a = a.elements; c < a.length && (!ci(a[c], "tsDefaultvalue") || !b(a[c])); c++)
            ;
    }
    function Io(a) {
        Ho(a, function(b) {
            var c = ko($h(b, "tsDefaultvalue"));
            Fh(c) && (c = "" + c);
            jm(b, c);
            if (se(b, "ts-onchangeable"))
                if (Pe(b))
                    rf(b, "change", !1, null);
                else if (b = bf(b))
                    if (b = b.Ea["change".toString()])
                        for (b = b.concat(),
                        c = 0; c < b.length; c++) {
                            var d = b[c];
                            d && 0 == d.capture && !d.zd && hf(d, null)
                        }
        })
    }
    function Jo(a) {
        var b = !1;
        Ho(a, function() {
            return b = !0
        });
        return b
    }
    function Ko(a) {
        a = wd("FORM", null, a);
        for (var b = new U, c = 0; c < a.length; c++) {
            var d = a[c]
              , e = zd("btngrp", d);
            if (e && Jo(d)) {
                var f = kl({
                    type: "button",
                    value: V("Default Values")
                });
                e.appendChild(f);
                b.C(f, "click", function() {
                    Io(this)
                }
                .bind(d))
            }
        }
        return b
    }
    function Lo(a, b) {
        for (var c = [], d = "", e = 0; e < a.length; e++) {
            var f = a.charAt(e);
            -1 != b.indexOf(f) ? d && (c.push(d),
            d = "") : d += f
        }
        c.push(d);
        return c
    }
    function Mo(a, b, c, d) {
        var e = ud(a);
        if (d)
            for (a = 0,
            d = b.length; a < d; a++)
                -1 != b[a].indexOf(" ") && (b[a] = '"' + b[a] + '"');
        d = new An(b);
        var f = new Wn;
        a = new Pn(c);
        Sn(a);
        " " == c.charAt(0) && (a.fi = !1);
        d = new Bn(d,f,a);
        d.K = 15;
        a.g = d;
        Qn(a, e);
        Q(d, ["suggestionsupdate", "update"], function() {
            try {
                var g = hm(e)
                  , h = Lo(g, c);
                for (g = 0; g < h.length; g++)
                    h[g] = h[g].toLowerCase();
                var l = Sa(b, function(m) {
                    return -1 == Qa(h, m.toLowerCase())
                });
                this.wd.Ig = l || []
            } catch (m) {}
        })
    }
    function No(a, b) {
        function c() {
            0 < b ? jm(a, d + " " + b) : (this.G(),
            jm(a, d),
            im(a, !1));
            b--
        }
        var d = hm(a)
          , e = new zi(1E3);
        Q(e, "tick", c);
        c.call(e);
        e.start()
    }
    function Oo(a, b) {
        ii().then(function() {
            var c = ud(a)
              , d = ud(b);
            if (c && d) {
                var e = navigator.permissions;
                (e ? e.query({
                    name: "clipboard-write"
                }).then(function(f) {
                    f = f.state;
                    return "granted" === f || "prompt" === f
                }, function() {
                    return !1
                }) : t.Promise.resolve(!1)).then(function(f) {
                    if (f) {
                        var g = "Copy to clipboard";
                        f = "copy";
                        var h = function() {
                            var m = hm(c);
                            "string" === typeof m && navigator.clipboard.writeText(m).then(function() {
                                om(l)
                            })
                        }
                    } else
                        g = "Select the code",
                        f = "i-cursor",
                        h = function() {
                            c.select()
                        }
                        ;
                    var l = K("BUTTON", ["btn", "ts-smaller"]);
                    Md(l, cm(f));
                    l.title = g;
                    Q(l, "click", h);
                    d.appendChild(l)
                })
            }
        })
    }
    function Po(a) {
        var b = new U;
        Ra(yd("ts-vispswd", a), function(c) {
            var d = Ad("INPUT", null, c);
            if (d) {
                var e = K("SPAN", "ts-ico-color ts-hoveraltop unselectable", cm("eye", "regular"));
                Bd(e, {
                    title: V("Show/hide password")
                });
                b.C(e, "click", function() {
                    var f = "password" === d.type;
                    d.type = f ? "text" : "password";
                    Od(this);
                    f = cm(f ? "eye-slash" : "eye", "regular");
                    this.appendChild(f)
                }
                .bind(e));
                Nd(c, "\u00a0", e)
            }
        });
        return b
    }
    ;function Qo() {
        C("ts.getElement", bl);
        C("ts.getElements", cl);
        C("ts.createDom", K);
        C("ts.removeChildren", Od);
        C("ts.setTextContent", Vd);
        C("ts.indexOf", Qa);
        C("ts.forEach", Ra);
        C("ts.getData", $h);
        C("ts.listen", function(a, b, c, d, e) {
            Q(a, b, function(f) {
                c && c.call(e || this, f.ja)
            }, d)
        });
        C("ts.listenDomReady", hi);
        C("ts.getValue", hm);
        C("ts.setValue", jm);
        C("ts.setDisabled", im);
        C("ts.hsch", qh);
        C("ts.refreshPage", wl);
        C("ts.disableBFCache", Dl);
        C("ts.toggleVisibility", rm);
        C("tibo.forms.createAc", Mo);
        C("tibo.forms.delayedSubmitEnable", No);
        C("tibo.forms.initTABtns", Oo)
    }
    ;function Ro(a) {
        this.xb = new t.Map;
        var b = arguments.length;
        if (1 < b) {
            if (b % 2)
                throw Error("Uneven number of arguments");
            for (var c = 0; c < b; c += 2)
                this.set(arguments[c], arguments[c + 1])
        } else if (a)
            if (a instanceof Ro)
                for (b = y(a.xb),
                c = b.next(); !c.done; c = b.next()) {
                    var d = y(c.value);
                    c = d.next().value;
                    d = d.next().value;
                    this.xb.set(c, d)
                }
            else if (a)
                for (b = y(v(Object, "entries").call(Object, a)),
                c = b.next(); !c.done; c = b.next())
                    d = y(c.value),
                    c = d.next().value,
                    d = d.next().value,
                    this.xb.set(c, d)
    }
    k = Ro.prototype;
    k.Pb = function() {
        return v(Array, "from").call(Array, v(this.xb, "values").call(this.xb))
    }
    ;
    k.qc = function() {
        return v(Array, "from").call(Array, v(this.xb, "keys").call(this.xb))
    }
    ;
    k.get = function(a, b) {
        return this.xb.has(a) ? this.xb.get(a) : b
    }
    ;
    k.set = function(a, b) {
        this.xb.set(a, b);
        return this
    }
    ;
    k.forEach = function(a, b) {
        var c = this;
        b = void 0 === b ? this : b;
        this.xb.forEach(function(d, e) {
            return a.call(b, d, e, c)
        })
    }
    ;
    (function() {
        for (var a = ["ms", "moz", "webkit", "o"], b, c = 0; b = a[c] && !A.requestAnimationFrame; ++c)
            A.requestAnimationFrame = A[b + "RequestAnimationFrame"],
            A.cancelAnimationFrame = A[b + "CancelAnimationFrame"] || A[b + "CancelRequestAnimationFrame"];
        if (!A.requestAnimationFrame) {
            var d = 0;
            A.requestAnimationFrame = function(e) {
                var f = (new Date).getTime()
                  , g = Math.max(0, 16 - (f - d));
                d = f + g;
                return A.setTimeout(function() {
                    e(f + g)
                }, g)
            }
            ;
            A.cancelAnimationFrame || (A.cancelAnimationFrame = function(e) {
                clearTimeout(e)
            }
            )
        }
    }
    )();
    var So = [[], []]
      , To = 0
      , Uo = !1
      , Vo = 0;
    function Wo(a, b) {
        var c = Vo++
          , d = {
            yj: {
                id: c,
                Yb: a.measure,
                context: b
            },
            Bj: {
                id: c,
                Yb: a.Aj,
                context: b
            },
            state: {},
            jb: void 0,
            Je: !1
        };
        return function() {
            0 < arguments.length ? (d.jb || (d.jb = []),
            d.jb.length = 0,
            d.jb.push.apply(d.jb, arguments),
            d.jb.push(d.state)) : d.jb && 0 != d.jb.length ? (d.jb[0] = d.state,
            d.jb.length = 1) : d.jb = [d.state];
            d.Je || (d.Je = !0,
            So[To].push(d));
            Uo || (Uo = !0,
            window.requestAnimationFrame(Xo))
        }
    }
    function Xo() {
        Uo = !1;
        var a = So[To]
          , b = a.length;
        To = (To + 1) % 2;
        for (var c, d = 0; d < b; ++d) {
            c = a[d];
            var e = c.yj;
            c.Je = !1;
            e.Yb && e.Yb.apply(e.context, c.jb)
        }
        for (d = 0; d < b; ++d)
            c = a[d],
            e = c.Bj,
            c.Je = !1,
            e.Yb && e.Yb.apply(e.context, c.jb),
            c.state = {};
        a.length = 0
    }
    ;var Yo = H ? pc(kc(new hc(ic,'javascript:""'))) : pc(kc(new hc(ic,"about:blank")));
    H ? pc(kc(new hc(ic,'javascript:""'))) : pc(kc(new hc(ic,"javascript:undefined")));
    function Zo(a) {
        qf.call(this);
        this.s = a;
        a = H ? "focusout" : "blur";
        this.g = Q(this.s, H ? "focusin" : "focus", this, !H);
        this.h = Q(this.s, a, this, !H)
    }
    D(Zo, qf);
    Zo.prototype.handleEvent = function(a) {
        var b = new Me(a.ja);
        b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
        this.dispatchEvent(b)
    }
    ;
    Zo.prototype.D = function() {
        Zo.M.D.call(this);
        gf(this.g);
        gf(this.h);
        delete this.s
    }
    ;
    function $o(a, b) {
        this.s = a;
        this.h = b
    }
    ;function ap(a, b) {
        X.call(this, b);
        this.tj = !!a;
        this.kd = null;
        this.Wg = Wo({
            Aj: this.We
        }, this)
    }
    D(ap, X);
    k = ap.prototype;
    k.xf = null;
    k.Rb = !1;
    k.kb = null;
    k.Pa = null;
    k.ub = null;
    k.mf = !1;
    k.fc = function() {
        return "goog-modalpopup"
    }
    ;
    k.Od = function() {
        return this.kb
    }
    ;
    k.J = function() {
        ap.M.J.call(this);
        var a = this.o();
        te(a, gb(this.fc()).split(" "));
        Yd(a, !0);
        T(a, !1);
        bp(this);
        cp(this)
    }
    ;
    function bp(a) {
        if (a.tj && !a.Pa) {
            var b = a.g.Ca("IFRAME", {
                frameborder: 0,
                style: "border:0;vertical-align:bottom;"
            });
            b.src = (Yo instanceof nc && Yo.constructor === nc ? Yo.g : "type_error:TrustedResourceUrl").toString();
            a.Pa = b;
            a.Pa.className = a.fc() + "-bg";
            T(a.Pa, !1);
            Tf(a.Pa, 0)
        }
        a.kb || (a.kb = a.g.Ca("DIV", a.fc() + "-bg"),
        T(a.kb, !1))
    }
    function cp(a) {
        a.ub || (a.ub = Kd(a.g.g, "SPAN"),
        T(a.ub, !1),
        Yd(a.ub, !0),
        a.ub.style.position = "absolute")
    }
    k.Th = function() {
        this.mf = !1
    }
    ;
    k.Yc = function(a) {
        return !!a && "DIV" == a.tagName
    }
    ;
    k.Ha = function(a) {
        ap.M.Ha.call(this, a);
        a = gb(this.fc()).split(" ");
        te(this.o(), a);
        bp(this);
        cp(this);
        Yd(this.o(), !0);
        T(this.o(), !1)
    }
    ;
    k.O = function() {
        this.Pa && Pd(this.Pa, this.o());
        Pd(this.kb, this.o());
        ap.M.O.call(this);
        var a = this.o();
        a.parentNode && a.parentNode.insertBefore(this.ub, a.nextSibling);
        this.xf = new Zo(this.g.g);
        this.ka().C(this.xf, "focusin", this.Ej);
        dp(this, !1)
    }
    ;
    k.fa = function() {
        this.isVisible() && this.L(!1);
        je(this.xf);
        ap.M.fa.call(this);
        Qd(this.Pa);
        Qd(this.kb);
        Qd(this.ub)
    }
    ;
    k.L = function(a) {
        if (a != this.Rb)
            if (this.pd && this.pd.stop(),
            this.Vd && this.Vd.stop(),
            this.nd && this.nd.stop(),
            this.Td && this.Td.stop(),
            this.aa && dp(this, a),
            a) {
                if (this.dispatchEvent("beforeshow")) {
                    try {
                        this.kd = this.g.g.activeElement
                    } catch (e) {}
                    this.We();
                    this.la();
                    this.ka().C(Hd(this.g.g), "resize", this.We).C(Hd(this.g.g), "orientationchange", this.Wg);
                    ep(this, !0);
                    this.ph();
                    this.Rb = !0;
                    this.pd && this.Vd ? (Ze(this.pd, "end", this.le, !1, this),
                    this.Vd.play(),
                    this.pd.play()) : this.le()
                }
            } else if (this.dispatchEvent("beforehide")) {
                this.ka().ma(Hd(this.g.g), "resize", this.We).ma(Hd(this.g.g), "orientationchange", this.Wg);
                this.Rb = !1;
                this.nd && this.Td ? (Ze(this.nd, "end", this.ke, !1, this),
                this.Td.play(),
                this.nd.play()) : this.ke();
                a: {
                    try {
                        var b = this.g
                          , c = b.g.body
                          , d = b.g.activeElement || c;
                        if (!this.kd || this.kd == c) {
                            this.kd = null;
                            break a
                        }
                        (d == c || b.contains(this.o(), d)) && this.kd.focus()
                    } catch (e) {}
                    this.kd = null
                }
            }
    }
    ;
    function dp(a, b) {
        a.Eg || (a.Eg = new $o(a.s,a.g));
        a = a.Eg;
        if (b) {
            a.g || (a.g = []);
            b = he(a.h.g.body);
            for (var c = 0; c < b.length; c++) {
                var d = b[c], e;
                if (e = d != a.s)
                    e = d.getAttribute("aria-hidden"),
                    e = !(null == e || void 0 == e ? 0 : String(e));
                e && (Mk(d, "hidden", !0),
                a.g.push(d))
            }
        } else if (a.g) {
            for (c = 0; c < a.g.length; c++)
                a.g[c].removeAttribute("aria-hidden");
            a.g = null
        }
    }
    function ep(a, b) {
        a.Pa && T(a.Pa, b);
        a.kb && T(a.kb, b);
        T(a.o(), b);
        T(a.ub, b)
    }
    k.le = function() {
        this.dispatchEvent("show")
    }
    ;
    k.ke = function() {
        ep(this, !1);
        this.dispatchEvent("hide")
    }
    ;
    k.isVisible = function() {
        return this.Rb
    }
    ;
    k.We = function() {
        this.Pa && T(this.Pa, !1);
        this.kb && T(this.kb, !1);
        var a = this.g.g
          , b = Dd(Id(a) || window)
          , c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth));
        a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
        this.Pa && (T(this.Pa, !0),
        Qf(this.Pa, c, a));
        this.kb && (T(this.kb, !0),
        Qf(this.kb, c, a))
    }
    ;
    k.la = function() {
        var a = Id(this.g.g) || window;
        if ("fixed" == Ef(this.o()))
            var b = 0
              , c = 0;
        else
            c = Fd(this.g.g),
            b = c.x,
            c = c.y;
        var d = Rf(this.o());
        a = Dd(a);
        b = Math.max(b + a.width / 2 - d.width / 2, 0);
        c = Math.max(c + a.height / 2 - d.height / 2, 0);
        Ff(this.o(), b, c);
        Ff(this.ub, b, c)
    }
    ;
    k.Ej = function(a) {
        this.mf ? this.Th() : a.target == this.ub && Bi(this.ph, 0, this)
    }
    ;
    k.ph = function() {
        try {
            H && this.g.g.body.focus(),
            this.o().focus()
        } catch (a) {}
    }
    ;
    k.D = function() {
        je(this.pd);
        this.pd = null;
        je(this.nd);
        this.nd = null;
        je(this.Vd);
        this.Vd = null;
        je(this.Td);
        this.Td = null;
        ap.M.D.call(this)
    }
    ;
    function fp(a, b, c) {
        ap.call(this, b, c);
        this.F = a || "modal-dialog";
        this.m = gp(gp(new hp, ip, !0), jp, !1, !0)
    }
    D(fp, ap);
    k = fp.prototype;
    k.oh = !0;
    k.Ch = !0;
    k.nh = !0;
    k.se = .5;
    k.gf = "";
    k.bb = null;
    k.Xb = null;
    k.mh = !1;
    k.gb = null;
    k.hb = null;
    k.ie = null;
    k.Ya = null;
    k.Vb = null;
    k.Ma = null;
    k.Zf = "dialog";
    k.fc = function() {
        return this.F
    }
    ;
    k.zf = function() {
        return null != this.bb ? Yc(this.bb).toString() : ""
    }
    ;
    k.Sd = function() {
        return this.Zf
    }
    ;
    function kp(a) {
        a.o() || a.La()
    }
    k.Oa = function() {
        kp(this);
        return this.Vb
    }
    ;
    k.Od = function() {
        kp(this);
        return fp.M.Od.call(this)
    }
    ;
    function lp(a, b) {
        a.se = b;
        a.o() && (b = a.Od()) && Tf(b, a.se)
    }
    k.bj = function() {}
    ;
    function mp(a, b) {
        var c = gb(a.F + "-title-draggable").split(" ");
        a.o() && (b ? te(a.gb, c) : ve(a.gb, c));
        b && !a.Xb ? (b = new Km(a.o(),a.gb),
        a.Xb = b,
        te(a.gb, c),
        Q(a.Xb, "start", a.Oj, !1, a),
        Q(a.Xb, "drag", a.bj, !1, a)) : !b && a.Xb && (a.Xb.G(),
        a.Xb = null)
    }
    k.J = function() {
        fp.M.J.call(this);
        var a = this.o()
          , b = this.g;
        this.ie = this.Jb();
        var c = this.Jb() + ".contentEl";
        this.gb = b.Ca("DIV", this.F + "-title", this.hb = b.Ca("SPAN", {
            className: this.F + "-title-text",
            id: this.ie
        }, this.gf), this.Ya = b.Ca("SPAN", this.F + "-title-close"));
        Nd(a, this.gb, this.Vb = b.Ca("DIV", {
            className: this.F + "-content",
            id: c
        }), this.Ma = b.Ca("DIV", this.F + "-buttons"));
        Lk(this.hb, "heading");
        Lk(this.Ya, "button");
        Yd(this.Ya, !0);
        Mk(this.Ya, "label", "Close");
        Lk(a, this.Sd());
        Mk(a, "labelledby", this.ie || "");
        this.bb && bd(this.Vb, this.bb);
        T(this.Ya, !0);
        this.m && (a = this.m,
        a.s = this.Ma,
        a.La());
        T(this.Ma, !!this.m);
        lp(this, this.se)
    }
    ;
    k.Ha = function(a) {
        fp.M.Ha.call(this, a);
        a = this.o();
        var b = this.F + "-content";
        this.Vb = wd(null, b, a)[0];
        this.Vb || (this.Vb = this.g.Ca("DIV", b),
        this.bb && bd(this.Vb, this.bb),
        a.appendChild(this.Vb));
        b = this.F + "-title";
        var c = this.F + "-title-text"
          , d = this.F + "-title-close";
        (this.gb = wd(null, b, a)[0]) ? (this.hb = wd(null, c, this.gb)[0],
        this.Ya = wd(null, d, this.gb)[0]) : (this.gb = this.g.Ca("DIV", b),
        a.insertBefore(this.gb, this.Vb));
        this.hb ? (this.gf = ae(this.hb),
        this.hb.id || (this.hb.id = this.Jb())) : (this.hb = K("SPAN", {
            className: c,
            id: this.Jb()
        }),
        this.gb.appendChild(this.hb));
        this.ie = this.hb.id;
        Mk(a, "labelledby", this.ie || "");
        this.Ya || (this.Ya = this.g.Ca("SPAN", d),
        this.gb.appendChild(this.Ya));
        T(this.Ya, !0);
        b = this.F + "-buttons";
        if (this.Ma = wd(null, b, a)[0]) {
            if (a = this.m = new hp(this.g),
            (b = this.Ma) && 1 == b.nodeType) {
                a.s = b;
                b = (a.s || document).getElementsByTagName("BUTTON");
                c = 0;
                for (var e, f; d = b[c]; c++)
                    if (e = d.name || d.id,
                    f = ae(d) || d.value,
                    e) {
                        var g = 0 == c;
                        a.set(e, f, g, d.name == np);
                        g && O(d, "goog-buttonset-default")
                    }
            }
        } else
            this.Ma = this.g.Ca("DIV", b),
            a.appendChild(this.Ma),
            this.m && (a = this.m,
            a.s = this.Ma,
            a.La()),
            T(this.Ma, !!this.m);
        lp(this, this.se)
    }
    ;
    k.O = function() {
        fp.M.O.call(this);
        this.ka().C(this.o(), "keydown", this.Ng).C(this.o(), "keypress", this.Ng);
        this.ka().C(this.Ma, "click", this.Dj);
        mp(this, this.nh);
        this.ka().C(this.Ya, "click", this.Ij);
        var a = this.o();
        Lk(a, this.Sd());
        "" !== this.hb.id && Mk(a, "labelledby", this.hb.id);
        if (!this.Ch) {
            this.Ch = !1;
            if (this.aa) {
                a = this.g;
                var b = this.Od();
                a.ff(this.Pa);
                a.ff(b)
            }
            this.isVisible() && dp(this, !1)
        }
    }
    ;
    k.fa = function() {
        this.isVisible() && this.L(!1);
        mp(this, !1);
        fp.M.fa.call(this)
    }
    ;
    k.L = function(a) {
        a != this.isVisible() && (this.aa || this.La(),
        fp.M.L.call(this, a))
    }
    ;
    k.le = function() {
        fp.M.le.call(this);
        this.dispatchEvent(op)
    }
    ;
    k.ke = function() {
        fp.M.ke.call(this);
        this.dispatchEvent(pp);
        this.mh && this.G()
    }
    ;
    k.Oj = function() {
        var a = this.g.g
          , b = Dd(Id(a) || window)
          , c = Math.max(a.body.scrollWidth, b.width);
        a = Math.max(a.body.scrollHeight, b.height);
        var d = Rf(this.o());
        "fixed" == Ef(this.o()) ? this.Xb.j = new zf(0,0,Math.max(0, b.width - d.width),Math.max(0, b.height - d.height)) : this.Xb.j = new zf(0,0,c - d.width,a - d.height)
    }
    ;
    k.Ij = function() {
        qp(this)
    }
    ;
    function qp(a) {
        var b = a.m
          , c = b && b.g;
        c ? (b = b.get(c),
        a.dispatchEvent(new rp(c,b)) && a.L(!1)) : a.L(!1)
    }
    k.D = function() {
        this.Ma = this.Ya = null;
        fp.M.D.call(this)
    }
    ;
    function sp(a, b) {
        a.m = b;
        a.Ma && (a.m ? (b = a.m,
        b.s = a.Ma,
        b.La()) : bd(a.Ma, $c),
        T(a.Ma, !!a.m))
    }
    k.Dj = function(a) {
        a: {
            for (a = a.target; null != a && a != this.Ma; ) {
                if ("BUTTON" == a.tagName)
                    break a;
                a = a.parentNode
            }
            a = null
        }
        if (a && !a.disabled) {
            a = a.name;
            var b = this.m.get(a);
            this.dispatchEvent(new rp(a,b)) && this.L(!1)
        }
    }
    ;
    k.Ng = function(a) {
        var b = !1
          , c = !1
          , d = this.m
          , e = a.target;
        if ("keydown" == a.type)
            if (this.oh && 27 == a.keyCode) {
                var f = d && d.g;
                e = "SELECT" == e.tagName && !e.disabled;
                f && !e ? (c = !0,
                b = d.get(f),
                b = this.dispatchEvent(new rp(f,b))) : e || (b = !0)
            } else {
                if (9 == a.keyCode && a.shiftKey && e == this.o()) {
                    this.mf = !0;
                    try {
                        this.ub.focus()
                    } catch (n) {}
                    Bi(this.Th, 0, this)
                }
            }
        else if (13 == a.keyCode) {
            if ("BUTTON" == e.tagName && !e.disabled)
                f = e.name;
            else if (e == this.Ya)
                qp(this);
            else if (d) {
                var g = d.h, h;
                if (h = g)
                    a: {
                        h = (d.s || document).getElementsByTagName("BUTTON");
                        for (var l = 0, m; m = h[l]; l++)
                            if (m.name == g || m.id == g) {
                                h = m;
                                break a
                            }
                        h = null
                    }
                e = ("TEXTAREA" == e.tagName || "SELECT" == e.tagName || "A" == e.tagName) && !e.disabled;
                !h || h.disabled || e || (f = g)
            }
            f && d && (c = !0,
            b = this.dispatchEvent(new rp(f,String(d.get(f)))))
        } else
            e != this.Ya || 32 != a.keyCode && " " != a.key || qp(this);
        if (b || c)
            a.stopPropagation(),
            a.preventDefault();
        b && this.L(!1)
    }
    ;
    function rp(a, b) {
        this.type = tp;
        this.key = a;
        this.caption = b
    }
    D(rp, He);
    var tp = "dialogselect"
      , pp = "afterhide"
      , op = "aftershow";
    function hp(a) {
        Ro.call(this);
        a || rd();
        this.g = this.s = this.h = null
    }
    D(hp, Ro);
    hp.prototype.set = function(a, b, c, d) {
        Ro.prototype.set.call(this, a, b);
        c && (this.h = a);
        d && (this.g = a);
        return this
    }
    ;
    function gp(a, b, c, d) {
        return a.set(b.key, b.caption, c, d)
    }
    hp.prototype.La = function() {
        if (this.s) {
            bd(this.s, $c);
            var a = rd(this.s);
            this.forEach(function(b, c) {
                b = a.Ca("BUTTON", {
                    name: c
                }, b);
                c == this.h && (b.className = "goog-buttonset-default");
                this.s.appendChild(b)
            }, this)
        }
    }
    ;
    hp.prototype.o = function() {
        return this.s
    }
    ;
    var np = "cancel"
      , ip = {
        key: "ok",
        caption: "OK"
    }
      , jp = {
        key: np,
        caption: "Cancel"
    }
      , up = {
        key: "yes",
        caption: "Yes"
    }
      , vp = {
        key: "no",
        caption: "No"
    }
      , wp = {
        key: "save",
        caption: "Save"
    }
      , xp = {
        key: "continue",
        caption: "Continue"
    };
    "undefined" != typeof document && (gp(new hp, ip, !0, !0),
    gp(gp(new hp, ip, !0), jp, !1, !0),
    gp(gp(new hp, up, !0), vp, !1, !0),
    gp(gp(gp(new hp, up), vp, !0), jp, !1, !0),
    gp(gp(gp(new hp, xp), wp), jp, !0, !0));
    function yp(a) {
        fp.call(this);
        this.Fa = null;
        this.xg = !1;
        zp && zp.G();
        zp = this;
        lp(this, .6);
        this.nh = !1;
        mp(this, !1);
        this.oh = this.mh = !0;
        sp(this, null);
        this.Fa = Ap;
        Bp(this, !0);
        a && (this.gf = a,
        this.hb && Vd(this.hb, a))
    }
    var zp, Cp, Dp;
    z(yp, fp);
    k = yp.prototype;
    k.J = function() {
        fp.prototype.J.call(this);
        ql(this);
        kp(this);
        var a = this.Ya;
        var b = em();
        a.appendChild(b);
        O(a, "ts-end-zero");
        kp(this);
        a = this.o();
        te(a, ["dlgfrm", "rad"]);
        Bp(this, this.xg);
        if (this.Fa) {
            a = this.o();
            var c, d, e, f;
            void 0 !== this.Fa.maxWidth && void 0 !== this.Fa.Qc ? c = "min(" + this.Fa.maxWidth + "vw," + km(this.Fa.Qc) + ")" : void 0 !== this.Fa.maxWidth ? c = this.Fa.maxWidth + "vw" : void 0 !== this.Fa.Qc && (c = km(this.Fa.Qc));
            void 0 !== this.Fa.maxHeight && (d = this.Fa.maxHeight + "vh");
            void 0 !== this.Fa.width && (e = this.Fa.width + "vw");
            void 0 !== this.Fa.height && (f = this.Fa.height + "vh");
            R(a, {
                "max-width": c || "",
                "max-height": d || "",
                width: e || "",
                height: f || ""
            })
        }
    }
    ;
    k.Yc = function() {
        return !1
    }
    ;
    k.O = function() {
        fp.prototype.O.call(this);
        this.ka().C(this.Od(), "click", function(a) {
            this.isVisible() && 0 === a.button && qp(this)
        }).C(Hd(this.g.g), "resize", function() {
            this.isVisible() && this.la()
        }).C(this.Oa(), "elresized", function() {
            this.isVisible() && this.la()
        })
    }
    ;
    k.la = function() {
        var a, b = this.o();
        if (this.Kj === Ep)
            var c = a = 0;
        else {
            c = Ab() || ng ? al() : Dd();
            a = .5 * c.height;
            Ff(b, 0, 0);
            var d = Rf(b)
              , e = Math.min(d.height, c.height);
            a = Math.round(c.height - c.height / (e <= a ? 1.618 : (2 - 1.618) / (c.height - a) * (e - a) + 1.618) - d.height / 2);
            c = Math.round((c.width - d.width) / 2)
        }
        Ff(b, c, a);
        Ff(this.ub, c, a)
    }
    ;
    function Bp(a, b) {
        a.xg = b;
        a.o() && (a = a.Oa()) && (R(a, "overflow", b ? "auto" : ""),
        b && R(a, "padding", "0.1em"))
    }
    k.D = function() {
        zp = null;
        fp.prototype.D.call(this)
    }
    ;
    function Fp() {
        return Cp || (Cp = {
            key: "ok",
            caption: V("OK")
        })
    }
    function Gp() {
        return Dp || (Dp = {
            key: np,
            caption: V("Cancel")
        })
    }
    function Hp(a, b) {
        function c() {
            yp.apply(this, arguments)
        }
        z(c, yp);
        c.prototype.J = function() {
            yp.prototype.J.call(this);
            if ("function" === typeof b) {
                var d = Di(1E3, !0), e = b(), f, g = bh(Zg([e, d]).then(function(l) {
                    !0 === l ? (l = cm("spinner", null, "fa-spin"),
                    f = K("DIV", null, l),
                    R(f, {
                        "min-width": "4em",
                        "min-height": "2em",
                        margin: "0 auto",
                        display: "flex",
                        "align-items": "center",
                        "justify-content": "center",
                        "font-size": "x-large"
                    }),
                    l = this.Oa(),
                    Nd(l, f),
                    this.la()) : d.cancel();
                    return e
                }, null, this), function() {
                    Qd(f)
                }).ki(function(l) {
                    if (l instanceof dh)
                        throw l;
                    return K("DIV", "errorColor", "Cannot obtain the dialog content, try it later.")
                }).then(function(l) {
                    var m = this.Oa();
                    Nd(m, l);
                    this.la()
                }, null, this);
                ne(this, function() {
                    g.cancel()
                })
            } else {
                var h = this.Oa();
                Nd(h, b)
            }
        }
        ;
        c.prototype.Aa = function(d, e, f) {
            yp.prototype.Aa.call(this, d, e, f)
        }
        ;
        return new c(a)
    }
    function Ip(a) {
        var b;
        return (new Lg(function(c) {
            b = Hp(null, a);
            sp(b, gp(gp(new hp, Fp(), !0), Gp(), !1, !0));
            b.C(tp, function(d) {
                c("ok" === d.key)
            });
            b.L(!0)
        }
        )).vb(function() {
            b.G()
        })
    }
    function Jp(a, b) {
        var c;
        return (new Lg(function(d) {
            c = Hp(b || null, a);
            sp(c, gp(new hp, Fp(), !0));
            ne(c, function() {
                d()
            });
            c.L(!0)
        }
        )).vb(function() {
            c.G()
        })
    }
    var Ap = {
        maxWidth: 90,
        maxHeight: 85,
        Qc: 1280
    }
      , Ep = 1;
    function Kp(a, b, c) {
        var d = new U;
        d.C(a, "click", function(e) {
            function f() {
                if ("string" === typeof c)
                    try {
                        po(c)
                    } catch (g) {
                        W("coc", g)
                    }
                else
                    c()
            }
            b ? Ip(K("DIV", {
                style: "white-space:pre-line"
            }, b)).then(function(g) {
                g && (c ? f() : A.location.href = a.href)
            }) : f();
            e.preventDefault()
        });
        return d
    }
    function Lp(a) {
        function b(d) {
            var e = $h(d, "confirm")
              , f = $h(d, "onclick");
            (e || f) && N(c, Kp(d, e, f))
        }
        var c = new M;
        Ra(wd("A", null, a), b);
        Ra(wd("INPUT", null, a), b);
        return c
    }
    ;function Mp() {
        Y.call(this, "LI");
        this.N = this.K = !1
    }
    z(Mp, Y);
    Mp.prototype.J = function() {
        Y.prototype.J.call(this);
        we(this.s, "ts-disabled", this.K)
    }
    ;
    function Np(a, b) {
        a.K = b;
        (a = a.o()) && we(a, "ts-disabled", b)
    }
    ;function Op() {}
    Op.prototype.la = function() {}
    ;
    function Pp() {
        Y.call(this);
        this.i = [];
        this.m = this.ae = null;
        this.F = 8;
        this.u = !1;
        this.Ni = this.v = !0;
        Qp.push(this)
    }
    var Rp;
    z(Pp, Y);
    k = Pp.prototype;
    k.J = function() {
        Y.prototype.J.call(this);
        R(this.s, "position", "absolute")
    }
    ;
    k.O = function() {
        Y.prototype.O.call(this);
        this.h = new U(this);
        var a = this.s;
        this.h.C(a, "elresized", function() {
            for (var b = 0; 2 > b; b++)
                this.la()
        });
        this.h.C(a, "mouseenter", function() {
            this.dispatchEvent("enter")
        });
        this.h.C(a, "mouseleave", function() {
            this.dispatchEvent("leave")
        })
    }
    ;
    k.fa = function() {
        Y.prototype.fa.call(this);
        this.h && (this.h.G(),
        this.h = void 0)
    }
    ;
    k.La = function(a) {
        Y.prototype.La.call(this, a)
    }
    ;
    function Sp(a) {
        a.o() || a.J();
        var b = a.s;
        sm(b, !1);
        a.aa || a.La();
        th(Rp) || (Rp = Q(A, ["resize", "scroll"], function() {
            for (var c = 0, d = Qp.length; c < d; c++) {
                var e = Qp[c];
                e.isVisible() && e.la()
            }
        }));
        Tp || (Tp = !0,
        Q(document.documentElement, "click", function(c) {
            c.target && Up(Vp(c.target), !0)
        }),
        Q(A, "touchstart", function(c) {
            c = c.ja.changedTouches;
            for (var d = [], e = 0; e < c.length; e++) {
                var f = c[e].target;
                Da(f) && 0 < f.nodeType && (f = Vp(c[e].target)) && d.push(f)
            }
            Up(d, !0)
        }, ni));
        Wp || (Wp = !0,
        Q(new sf(document), pf, function(c) {
            27 === c.keyCode && Xp(function() {
                return !0
            })
        }));
        a.la();
        sm(b, !0);
        a.dispatchEvent("show")
    }
    k.L = function(a) {
        a !== this.isVisible() && ((this.u = a) ? Sp(this) : (sm(this.s, !1),
        this.fa(),
        this.dispatchEvent("hide"),
        this.v && this.G()))
    }
    ;
    k.isVisible = function() {
        return this.u
    }
    ;
    k.Yc = function() {
        return !1
    }
    ;
    function Yp(a, b) {
        a.F = b;
        a.isVisible() && a.la()
    }
    function Zp(a, b) {
        a.m = b;
        a.isVisible() && a.la()
    }
    k.D = function() {
        for (this.isVisible() && this.L(!1); this.i.length; )
            this.i[0].G();
        var a = this.ae;
        a && (Wa(a.i, this),
        this.ae = null);
        Wa(Qp, this);
        Y.prototype.D.call(this)
    }
    ;
    function $p(a, b) {
        a.K = b;
        a.isVisible() && a.la()
    }
    function Vp(a) {
        for (var b = 0; b < Qp.length; b++) {
            var c = Qp[b].o();
            if (c && Ud(c, a))
                return Qp[b]
        }
        return null
    }
    function Xp(a) {
        var b = [], c;
        var d = 0;
        for (c = Qp.length; d < c; d++) {
            var e = Qp[d];
            (!a || a && a(e)) && b.push(e)
        }
        d = 0;
        for (c = b.length; d < c; d++)
            b[d].W() || b[d].L(!1)
    }
    function Up(a, b) {
        a instanceof Pp && (a = [a]);
        a = a || [];
        var c = [];
        Ra(a, function(d) {
            do
                c.push(d),
                d = d.ae;
            while (d)
        });
        Xp(function(d) {
            return -1 === Qa(c, d) && (!b || d.Ni)
        })
    }
    k.la = function() {
        var a = this.s;
        this.m && this.m.la(a, this.F, this.K)
    }
    ;
    k.Sf = function(a) {
        this.i.push(a);
        a.ae = this
    }
    ;
    var Qp = []
      , Tp = !1
      , Wp = !1;
    function aq() {
        Pp.call(this)
    }
    z(aq, Pp);
    k = aq.prototype;
    k.J = function() {
        Pp.prototype.J.call(this);
        O(this.s, "pt")
    }
    ;
    k.O = function() {
        Pp.prototype.O.call(this);
        this.j = new U(this);
        this.j.C(this, ["enter", "leave"], function(a) {
            var b = this.ae;
            b instanceof aq && b.dispatchEvent(a.type)
        })
    }
    ;
    k.fa = function() {
        Pp.prototype.fa.call(this);
        this.j && (this.j.G(),
        this.j = void 0)
    }
    ;
    k.L = function(a) {
        Pp.prototype.L.call(this, a);
        a && Up(this)
    }
    ;
    k.Sf = function(a) {
        Pp.prototype.Sf.call(this, a)
    }
    ;
    function bq() {
        Xp(function(a) {
            return a instanceof aq
        })
    }
    ;function cq(a, b, c) {
        this.g = a;
        this.h = b;
        this.l = c
    }
    D(cq, Op);
    cq.prototype.la = function(a, b, c) {
        sg(this.g, this.h, a, b, void 0, c, this.l)
    }
    ;
    function dq(a, b, c, d) {
        cq.call(this, a, b);
        this.j = c ? 5 : 0;
        this.i = d || void 0
    }
    D(dq, cq);
    dq.prototype.la = function(a, b, c, d) {
        var e = sg(this.g, this.h, a, b, null, c, 10, d, this.i);
        if (e & 496) {
            var f = eq(e, this.h);
            b = eq(e, b);
            e = sg(this.g, f, a, b, null, c, 10, d, this.i);
            e & 496 && (f = eq(e, f),
            b = eq(e, b),
            sg(this.g, f, a, b, null, c, this.j, d, this.i))
        }
    }
    ;
    function eq(a, b) {
        a & 48 && (b ^= 4);
        a & 192 && (b ^= 1);
        return b
    }
    ;function fq(a, b, c, d) {
        dq.call(this, a, b, c || d);
        if (c || d)
            this.j = 65 | (d ? 32 : 132)
    }
    D(fq, dq);
    function gq(a) {
        X.call(this);
        this.j = a;
        this.v = hq | iq | jq;
        this.ha = 200
    }
    z(gq, X);
    function kq(a) {
        var b = $h(a, "pt")
          , c = ko(b);
        b = new gq(function() {
            return Tg(lq(bl(c.popup)))
        }
        );
        var d = c.popupAnchor
          , e = c.triggerAnchor;
        void 0 !== d && (b.K = d);
        void 0 !== e && mq(b, e);
        b.ya(a);
        return b
    }
    function nq(a) {
        var b = new M;
        Ra(yd("pt", a), function(c) {
            N(b, kq(c))
        });
        return b
    }
    k = gq.prototype;
    k.D = function() {
        this.i && this.i.cancel();
        this.j instanceof M && this.j.G();
        this.h && this.h.G();
        oq(this);
        pq(this);
        X.prototype.D.call(this)
    }
    ;
    k.O = function() {
        X.prototype.O.call(this);
        var a = this.s;
        this.m = new U(this);
        this.v & hq && this.m.C(a, "mouseenter", function(b) {
            this.ua = b.clientX;
            this.za = b.clientY;
            this.Eh()
        }).C(a, "mouseleave", this.Fh);
        this.v & iq && this.m.C(a, "click", function(b) {
            b.ctrlKey || b.shiftKey || b.altKey || b.metaKey || (pq(this),
            this.h || qq(this, b.clientX, b.clientY, b.type),
            b.stopPropagation())
        });
        this.v & jq && this.m.C(a, "touchstart", function(b) {
            if (b.ctrlKey || b.shiftKey || b.altKey || b.metaKey)
                b.preventDefault();
            else {
                pq(this);
                var c = b.ja.targetTouches;
                c.length && (this.h || qq(this, c[0].clientX, c[0].clientY, b.type));
                b.stopPropagation()
            }
        }, ni)
    }
    ;
    k.fa = function() {
        X.prototype.fa.call(this);
        this.m.G()
    }
    ;
    function pq(a) {
        var b;
        if (b = void 0 !== a.F)
            Ci(a.F),
            a.F = void 0;
        return b
    }
    function oq(a) {
        var b;
        if (b = void 0 !== a.u)
            Ci(a.u),
            a.u = void 0;
        return b
    }
    function qq(a, b, c, d) {
        var e = new M, f;
        a.T = "mouseenter" === d;
        a.h = new aq;
        a.h.v = !1;
        a.T && (a.h.C("enter", a.Eh, !1, a),
        a.h.C("leave", a.Fh, !1, a));
        a.ga && $p(a.h, a.ga);
        d = a.s;
        void 0 !== a.K && Yp(a.h, a.K);
        var g = rq(a);
        Zp(a.h, g instanceof Op ? g : g.call(a, b, c));
        (b = Vp(d)) && b instanceof aq && b.Sf(a.h);
        ne(a.h, function() {
            oq(this);
            pq(this);
            this.h = void 0;
            e.G();
            this.i && this.i.cancel()
        }, a);
        b = new U(a);
        N(e, b);
        b.C(a.h, ["show", "hide"], function(n) {
            we(this.s, "ts-pt-opnd", "show" === n.type);
            "hide" === n.type && (f && this.h.Ib(f, !0),
            Ig(this.h.G, this.h))
        });
        a.h.L(!0);
        if ("function" === typeof a.j) {
            var h = a.j;
            a.i = (new Lg(function(n) {
                var q = h.call(this);
                n(q)
            }
            ,a)).then(function(n) {
                return this.j = n
            }, null, a)
        } else
            a.i = Tg(a.j);
        var l = Di(1E3, 1)
          , m = a.i;
        a.i = bh(Zg([m, l]).then(function(n) {
            if (1 === n) {
                var q = new Y(null,null,cm("spinner", null, "fa-spin"))
                  , p = this.h;
                p.H(q, this.h.aa);
                p.la();
                m = bh(m, function() {
                    p.W() || p.Ib(q, p.aa)
                }, this)
            } else
                l.cancel();
            return m
        }, null, a).then(function(n) {
            !this.W() && this.h && (n instanceof X || (n = sl(n)),
            this.h.H(n, this.h.aa),
            f = n)
        }, function(n) {
            if (n instanceof dh)
                throw n;
            W("Cannot obtain a popup.", n instanceof Error ? n : void 0)
        }, a), function() {
            this.h && this.h.la();
            this.i = void 0
        }, a)
    }
    function mq(a, b) {
        "function" === typeof b || b instanceof Op ? a.N = b : a.N = function() {
            return new fq(this.s,b,!0)
        }
    }
    function rq(a) {
        return void 0 === a.N ? function() {
            return new fq(this.s,9,!0)
        }
        : a.N
    }
    function sq(a) {
        var b = tq;
        a.ga = b;
        a.h && $p(a.h, b)
    }
    k.Eh = function() {
        oq(this) || this.h || (this.F = Bi(function() {
            this.F = void 0;
            this.h || qq(this, this.ua, this.za, "mouseenter")
        }, this.ha, this))
    }
    ;
    k.Fh = function() {
        !pq(this) && th(650) && this.h && this.T && (this.u = Bi(function() {
            this.u = void 0;
            this.h && this.h.L(!1)
        }, 650, this))
    }
    ;
    var iq = 1
      , hq = 2
      , jq = 4;
    function uq(a, b, c, d) {
        Mp.call(this);
        this.T = a;
        this.j = null != c ? c : void 0;
        this.v = d;
        "string" === typeof b ? this.ga = b : b && (this.m = b,
        this.h = new gq(this.m))
    }
    z(uq, Mp);
    function vq(a, b) {
        a.i = b
    }
    k = uq.prototype;
    k.D = function() {
        this.h && this.h.G();
        this.m instanceof M && this.m.G();
        Mp.prototype.D.call(this)
    }
    ;
    function wq(a) {
        var b = $h(a, "generator");
        if (b) {
            try {
                var c = po(b)
            } catch (e) {
                W("gen", e),
                c = null
            }
            c && (Wj(c, a.parentNode, a),
            Qd(a))
        } else {
            var d;
            b = se(a, "ts-disabled");
            se(a, "hasSubmenu") && !b && (d = function() {
                return Tg(lq(zd("popupMenu", a)))
            }
            );
            c = new uq("",d);
            c.N = !0;
            Np(c, b);
            c.ya(a)
        }
        return c
    }
    k.J = function() {
        Mp.prototype.J.call(this);
        var a = this.s
          , b = this.ga;
        this.v && !b && (b = "javascript:void(0)");
        var c = K(b ? "A" : "SPAN", "ts-mnitm");
        a.appendChild(c);
        if (void 0 !== this.j) {
            var d = "string" === typeof this.j ? cm(this.j) : cm(this.j.name, this.j.type);
            c.appendChild(d)
        }
        if (d = b)
            d = b,
            d instanceof fk && (d = d.toString()),
            d = gb(d.toLowerCase()),
            d = "javascript:void(0)" === d || 0 !== d.toLowerCase().indexOf("javascript:");
        d && (c.href = b);
        (this.i || this.v) && N(this, Kp(c, this.i, this.v));
        this.F && (c.target = this.F);
        Nd(c, K("SPAN", "label", this.T));
        this.m && O(a, "hasSubmenu")
    }
    ;
    k.O = function() {
        Mp.prototype.O.call(this);
        this.u = new M;
        var a = zd("ts-mnitm", this.s);
        if (a)
            if (this.m)
                this.h.vg || this.h.ya(a);
            else {
                var b = new U;
                b.C(a, "mouseenter", function(c) {
                    c = Vp(c.target);
                    (!c || c instanceof aq) && Up(c)
                }).C(a, "click", function() {
                    bq()
                });
                N(this.u, b)
            }
        else
            Xi("A trigger is missing")
    }
    ;
    k.fa = function() {
        Mp.prototype.fa.call(this);
        this.u.G();
        this.u = void 0
    }
    ;
    k.Aa = function(a, b, c) {
        Mp.prototype.Aa.call(this, a, b, c)
    }
    ;
    function xq() {
        Mp.apply(this, arguments)
    }
    z(xq, Mp);
    xq.prototype.J = function() {
        Mp.prototype.J.call(this);
        var a = this.s;
        O(a, "separator");
        a.appendChild(L("SPAN"))
    }
    ;
    function yq() {
        Y.call(this, "UL")
    }
    z(yq, Y);
    yq.prototype.Aa = function(a, b, c) {
        Y.prototype.Aa.call(this, a, b, c)
    }
    ;
    yq.prototype.ya = function(a) {
        Y.prototype.ya.call(this, a)
    }
    ;
    yq.prototype.Ha = function(a) {
        this.s = a
    }
    ;
    yq.prototype.J = function() {
        Y.prototype.J.call(this);
        te(this.s, ["unselectable", "ts-menu"])
    }
    ;
    function zq(a) {
        var b = Ya(ll(a.s));
        Ra(b, function(c) {
            if (se(c, "separator")) {
                var d = new xq;
                d.N = !0;
                d.ya(c)
            } else
                d = wq(c);
            d ? a.H(d, !1) : Qd(c)
        })
    }
    ;function Aq() {
        yq.apply(this, arguments)
    }
    z(Aq, yq);
    Aq.prototype.J = function() {
        yq.prototype.J.call(this)
    }
    ;
    function Bq(a) {
        var b = new Aq;
        b.ya(a);
        zq(b);
        return b
    }
    function Cq(a) {
        var b = new M;
        Ra(wd("UL", "menuBar", a), function(c) {
            se(c, "ts-no-init") || N(b, Bq(c))
        });
        return b
    }
    ;function Dq(a, b) {
        this.g = a instanceof gd ? a : new gd(a,b)
    }
    D(Dq, Op);
    Dq.prototype.la = function(a, b, c, d) {
        var e = If(td(a))
          , f = this.g.x + e.x;
        e = this.g.y + e.y;
        var g = tg(a);
        f -= g.x;
        e -= g.y;
        vg(new gd(f,e), a, b, c, null, null, d)
    }
    ;
    function Eq(a, b) {
        Dq.call(this, a, b)
    }
    D(Eq, Dq);
    Eq.prototype.la = function(a, b, c, d) {
        var e = Hf(a);
        e = Lf(e);
        var f = Gd(rd(a).g);
        f = new gd(this.g.x + f.scrollLeft,this.g.y + f.scrollTop);
        var g = b
          , h = vg(f, a, g, c, e, 10, d);
        if (0 != (h & 496)) {
            if (h & 16 || h & 32)
                g ^= 4;
            if (h & 64 || h & 128)
                g ^= 1;
            h = vg(f, a, g, c, e, 10, d);
            0 != (h & 496) && vg(f, a, b, c, e, 0, d)
        }
    }
    ;
    function Fq(a) {
        cq.call(this, a, 5)
    }
    D(Fq, cq);
    Fq.prototype.la = function(a, b, c) {
        var d = new gd(10,0);
        sg(this.g, this.h, a, b, d, c, 9) & 496 && sg(this.g, 4, a, 1, d, c, 5)
    }
    ;
    var bi;
    function Gq(a, b, c) {
        var d = new gq(function() {
            "function" === typeof b && (b = b.call(this));
            var e = "string" === typeof b ? ul(b) : b;
            return Tg(new Y("DIV","ts-tltp dlgfrm rad",e))
        }
        );
        c && (d.v = hq);
        mq(d, function(e, f) {
            return new Eq(e,f)
        });
        sq(d);
        d.ya(a);
        return d
    }
    function Hq(a, b) {
        var c = new aq;
        c.H(new Y(null,"ts-tltp dlgfrm rad",b));
        Zp(c, new Fq(a));
        $p(c, tq);
        c.L(!0)
    }
    function Iq(a) {
        var b = new M;
        bi = bi || nd("ts-tooltip");
        a = yd("ts-tooltip", a);
        for (var c = {}, d = 0; d < a.length; c = {
            Dd: c.Dd
        },
        d++) {
            var e = a[d]
              , f = void 0;
            c.Dd = void 0;
            try {
                if ((f = $h(e, bi)) && (c.Dd = ko(f)))
                    N(b, Gq(e, function(h) {
                        return function() {
                            return h.Dd instanceof Xc ? vl(h.Dd) : h.Dd
                        }
                    }(c)));
                else
                    throw Error();
            } catch (h) {
                var g = void 0;
                W("Ttip incrt:" + (null != (g = f) ? g : "unknown"))
            } finally {
                ai(e)
            }
        }
        return b
    }
    var tq = new yf(10,10,10,10);
    function Jq(a) {
        var b = Lp(a);
        N(b, Cq(a));
        N(b, nq(a));
        var c = Do(a);
        N(c, Fo(a));
        N(c, Ko(a));
        N(c, Po(a));
        N(b, c);
        N(b, wo(a));
        N(b, Iq(a));
        return b
    }
    ;function Kq() {
        var a = document.body;
        if (a) {
            var b = void 0 !== oh ? oh : oh = Ch();
            $l(function() {
                O(a, b ? "ts-touchdev" : "ts-nontouchdev")
            });
            nl(a)
        }
    }
    function Lq(a) {
        function b() {
            try {
                e.style.setProperty("--hundredvh", km(A.innerHeight))
            } catch (h) {}
        }
        var c = 1E3 * A.tsEnv.serverTime
          , d = A.tsEnv.locale
          , e = document.documentElement;
        try {
            e.style.setProperty("--scrollbar-width", km(A.innerWidth - e.clientWidth))
        } catch (h) {}
        b();
        Q(A, "resize", b);
        Qo();
        Hi = c - yh();
        oi = d;
        ol.push(Jq);
        ol.push(Si);
        $i(bj || (bj = new aj));
        $i(new cj(a));
        var f = 0
          , g = yh();
        Q(A, "error", function(h) {
            var l = ["PetalBot", "AhrefsBot", "Google-Read-Aloud", "YandexMobileBot"]
              , m = qb();
            h = h.ja;
            f || -1 == h.filename.indexOf("/js/jp.js") || Ua(l, function(n) {
                return -1 != m.indexOf(n)
            }) || (l = {
                message: h.message,
                file: h.filename + ":" + h.lineno + ":" + h.colno,
                url: A.location.toString(),
                time: (yh() - g) / 1E3
            },
            h = h.error,
            W(mo({
                uncaught_error: l
            }), h instanceof Error ? h : void 0),
            f++)
        });
        hi(Kq)
    }
    ;var Mq = {};
    function Nq(a) {
        var b = Mq.hasOwnProperty(a) ? Mq[a] : null;
        if (b)
            return b;
        65536 < v(Object, "keys").call(Object, Mq).length && (Mq = {});
        var c = [0, 0, 0, 0]
          , d = RegExp("\\\\[0-9A-Fa-f]{1,5}\\s", "g");
        b = Oq(a, RegExp("\\\\[0-9A-Fa-f]{6}\\s?", "g"));
        b = Oq(b, d);
        b = Oq(b, /\\./g);
        b = b.replace(RegExp(":not\\(([^\\)]*)\\)", "g"), "     $1 ");
        b = b.replace(RegExp("{[^]*", "gm"), "");
        b = Pq(b, c, RegExp("(\\[[^\\]]+\\])", "g"), 2);
        b = Pq(b, c, RegExp("(#[^\\#\\s\\+>~\\.\\[:]+)", "g"), 1);
        b = Pq(b, c, RegExp("(\\.[^\\s\\+>~\\.\\[:]+)", "g"), 2);
        b = Pq(b, c, /(::[^\s\+>~\.\[:]+|:first-line|:first-letter|:before|:after)/gi, 3);
        b = Pq(b, c, /(:[\w-]+\([^\)]*\))/gi, 2);
        b = Pq(b, c, /(:[^\s\+>~\.\[:]+)/g, 2);
        b = b.replace(/[\*\s\+>~]/g, " ");
        b = b.replace(/[#\.]/g, " ");
        Pq(b, c, /([^\s\+>~\.\[:]+)/g, 3);
        b = c;
        return Mq[a] = b
    }
    function Pq(a, b, c, d) {
        return a.replace(c, function(e) {
            b[d] += 1;
            return Array(e.length + 1).join(" ")
        })
    }
    function Oq(a, b) {
        return a.replace(b, function(c) {
            return Array(c.length + 1).join("A")
        })
    }
    ;var Qq = {
        rgb: !0,
        rgba: !0,
        alpha: !0,
        rect: !0,
        image: !0,
        "linear-gradient": !0,
        "radial-gradient": !0,
        "repeating-linear-gradient": !0,
        "repeating-radial-gradient": !0,
        "cubic-bezier": !0,
        matrix: !0,
        perspective: !0,
        rotate: !0,
        rotate3d: !0,
        rotatex: !0,
        rotatey: !0,
        steps: !0,
        rotatez: !0,
        scale: !0,
        scale3d: !0,
        scalex: !0,
        scaley: !0,
        scalez: !0,
        skew: !0,
        skewx: !0,
        skewy: !0,
        translate: !0,
        translate3d: !0,
        translatex: !0,
        translatey: !0,
        translatez: !0
    }
      , Rq = /[\n\f\r"'()*<>]/g
      , Sq = {
        "\n": "%0a",
        "\f": "%0c",
        "\r": "%0d",
        '"': "%22",
        "'": "%27",
        "(": "%28",
        ")": "%29",
        "*": "%2a",
        "<": "%3c",
        ">": "%3e"
    };
    function Tq(a) {
        return Sq[a]
    }
    function Uq(a, b, c) {
        b = gb(b);
        if ("" == b)
            return null;
        if (0 == hb("url(", b.slice(0, 4))) {
            if (!v(b, "endsWith").call(b, ")") || 1 < (b ? b.split("(").length - 1 : 0) || 1 < (b ? b.split(")").length - 1 : 0) || !c)
                a = null;
            else {
                a: {
                    b = b.substring(4, b.length - 1);
                    for (var d = 0; 2 > d; d++) {
                        var e = "\"'".charAt(d);
                        if (b.charAt(0) == e && b.charAt(b.length - 1) == e) {
                            b = b.substring(1, b.length - 1);
                            break a
                        }
                    }
                }
                a = c ? (a = c(b, a)) && "about:invalid#zClosurez" != sc(a) ? 'url("' + sc(a).replace(Rq, Tq) + '")' : null : null
            }
            return a
        }
        if (0 < b.indexOf("(")) {
            if (/"|'/.test(b))
                return null;
            for (a = /([\-\w]+)\(/g; c = a.exec(b); )
                if (!(c[1].toLowerCase()in Qq))
                    return null
        }
        return b
    }
    ;function Vq(a, b) {
        a = A[a];
        return a && a.prototype ? (b = Object.getOwnPropertyDescriptor(a.prototype, b)) && b.get || null : null
    }
    function Wq(a, b) {
        return (a = A[a]) && a.prototype && a.prototype[b] || null
    }
    var Xq = Vq("Element", "attributes") || Vq("Node", "attributes")
      , Yq = Wq("Element", "hasAttribute")
      , Zq = Wq("Element", "getAttribute")
      , $q = Wq("Element", "setAttribute")
      , ar = Wq("Element", "removeAttribute");
    Vq("Element", "innerHTML") || Vq("HTMLElement", "innerHTML");
    var br = Wq("Element", "getElementsByTagName")
      , cr = Wq("Element", "matches") || Wq("Element", "msMatchesSelector")
      , dr = Vq("Node", "nodeName")
      , er = Vq("Node", "nodeType")
      , fr = Vq("Node", "parentNode");
    Vq("Node", "childNodes");
    var gr = Vq("HTMLElement", "style") || Vq("Element", "style")
      , hr = Vq("HTMLStyleElement", "sheet")
      , ir = Wq("CSSStyleDeclaration", "getPropertyValue")
      , jr = Wq("CSSStyleDeclaration", "setProperty")
      , kr = Vq("Element", "namespaceURI") || Vq("Node", "namespaceURI");
    function lr(a, b, c, d) {
        if (a)
            return a.apply(b);
        a = b[c];
        if (!d(a))
            throw Error("Clobbering detected");
        return a
    }
    function mr(a, b, c, d) {
        if (a)
            return a.apply(b, d);
        if (H && 10 > document.documentMode) {
            if (!b[c].call)
                throw Error("IE Clobbering detected");
        } else if ("function" != typeof b[c])
            throw Error("Clobbering detected");
        return b[c].apply(b, d)
    }
    function nr(a) {
        return lr(Xq, a, "attributes", function(b) {
            return b instanceof NamedNodeMap
        })
    }
    function or(a, b, c) {
        try {
            mr($q, a, "setAttribute", [b, c])
        } catch (d) {
            if (-1 == d.message.indexOf("A security problem occurred"))
                throw d;
        }
    }
    function pr(a) {
        return lr(gr, a, "style", function(b) {
            return b instanceof CSSStyleDeclaration
        })
    }
    function qr(a) {
        return lr(hr, a, "sheet", function(b) {
            return b instanceof CSSStyleSheet
        })
    }
    function rr(a) {
        return lr(dr, a, "nodeName", function(b) {
            return "string" == typeof b
        })
    }
    function sr(a) {
        return lr(er, a, "nodeType", function(b) {
            return "number" == typeof b
        })
    }
    function tr(a) {
        return lr(fr, a, "parentNode", function(b) {
            return !(b && "string" == typeof b.name && b.name && "parentnode" == b.name.toLowerCase())
        })
    }
    function ur(a, b) {
        return mr(ir, a, a.getPropertyValue ? "getPropertyValue" : "getAttribute", [b]) || ""
    }
    function vr(a, b, c) {
        mr(jr, a, a.setProperty ? "setProperty" : "setAttribute", [b, c])
    }
    function wr(a) {
        return lr(kr, a, "namespaceURI", function(b) {
            return "string" == typeof b
        })
    }
    ;var xr = H && 10 > document.documentMode ? null : RegExp("\\s*([^\\s'\",]+[^'\",]*(('([^'\\r\\n\\f\\\\]|\\\\[^])*')|(\"([^\"\\r\\n\\f\\\\]|\\\\[^])*\")|[^'\",])*)", "g")
      , yr = {
        "-webkit-border-horizontal-spacing": !0,
        "-webkit-border-vertical-spacing": !0
    };
    function zr(a, b, c) {
        var d = [];
        Ar(Ya(a.cssRules)).forEach(function(e) {
            if (b && !/[a-zA-Z][\w-:\.]*/.test(b))
                throw Error("Invalid container id");
            if (!(b && H && 10 == document.documentMode && /\\['"]/.test(e.selectorText))) {
                var f = b ? e.selectorText.replace(xr, "#" + b + " $1") : e.selectorText
                  , g = d.push;
                e = Br(e.style, c);
                if (-1 != f.indexOf("<"))
                    throw Error("Selector does not allow '<', got: " + f);
                var h = f.replace(/('|")((?!\1)[^\r\n\f\\]|\\[\s\S])*\1/g, "");
                if (!/^[-_a-zA-Z0-9#.:* ,>+~[\]()=^$|]+$/.test(h))
                    throw Error("Selector allows only [-_a-zA-Z0-9#.:* ,>+~[\\]()=^$|] and strings, got: " + f);
                a: {
                    for (var l = {
                        "(": ")",
                        "[": "]"
                    }, m = [], n = 0; n < h.length; n++) {
                        var q = h[n];
                        if (l[q])
                            m.push(l[q]);
                        else {
                            b: {
                                var p = void 0;
                                for (p in l)
                                    if (l[p] == q) {
                                        p = !0;
                                        break b
                                    }
                                p = !1
                            }
                            if (p && m.pop() != q) {
                                h = !1;
                                break a
                            }
                        }
                    }
                    h = 0 == m.length
                }
                if (!h)
                    throw Error("() and [] in selector must be balanced, got: " + f);
                if (!(e instanceof zc)) {
                    h = "";
                    for (var u in e)
                        if (Object.prototype.hasOwnProperty.call(e, u)) {
                            if (!/^[-_a-zA-Z0-9]+$/.test(u))
                                throw Error("Name allows only [-_a-zA-Z0-9], got: " + u);
                            l = e[u];
                            null != l && (l = Array.isArray(l) ? l.map(Bc).join(" ") : Bc(l),
                            h += u + ":" + l + ";")
                        }
                    e = h ? new zc(h,yc) : Ac
                }
                g.call(d, new Sc(f + "{" + (e instanceof zc && e.constructor === zc ? e.g : "type_error:SafeStyle").replace(/</g, "\\3C ") + "}",Rc))
            }
        });
        return Tc(d)
    }
    function Ar(a) {
        return a.filter(function(b) {
            return b instanceof CSSStyleRule || b.type == CSSRule.STYLE_RULE
        })
    }
    function Cr(a, b, c) {
        a = Dr("<style>" + a + "</style>");
        return null == a || null == a.sheet ? Vc : zr(a.sheet, void 0 != b ? b : null, c)
    }
    function Dr(a) {
        a = Zc("<html><head></head><body>" + a + "</body></html>");
        return (new DOMParser).parseFromString(Yc(a), "text/html").body.children[0]
    }
    function Br(a, b) {
        if (!a)
            return Ac;
        var c = document.createElement("div").style;
        Er(a).forEach(function(d) {
            var e = Jb && d in yr ? d : d.replace(/^-(?:apple|css|epub|khtml|moz|mso?|o|rim|wap|webkit|xv)-(?=[a-z])/i, "");
            fb(e, "--") || fb(e, "var") || (d = ur(a, d),
            d = Uq(e, d, b),
            null != d && vr(c, e, d))
        });
        return new zc(c.cssText || "",yc)
    }
    function Fr(a) {
        var b = v(Array, "from").call(Array, mr(br, a, "getElementsByTagName", ["STYLE"]))
          , c = eb(b, function(g) {
            return Ya(qr(g).cssRules)
        });
        c = Ar(c);
        for (var d = [], e = 0; e < c.length; e++)
            d[e] = {
                index: e,
                cg: c[e]
            };
        d.sort(function(g, h) {
            var l = Nq(g.cg.selectorText)
              , m = Nq(h.cg.selectorText);
            a: {
                for (var n = Math.min(l.length, m.length), q = 0; q < n; q++) {
                    var p = l[q]
                      , u = m[q];
                    p = p > u ? 1 : p < u ? -1 : 0;
                    if (0 != p) {
                        m = p;
                        break a
                    }
                }
                l = l.length;
                m = m.length;
                m = l > m ? 1 : l < m ? -1 : 0
            }
            return m || g.index - h.index
        });
        for (e = 0; e < d.length; e++)
            c[e] = d[e].cg;
        c.reverse();
        a = document.createTreeWalker(a, NodeFilter.SHOW_ELEMENT, null, !1);
        for (var f; f = a.nextNode(); )
            c.forEach(function(g) {
                mr(cr, f, f.matches ? "matches" : "msMatchesSelector", [g.selectorText]) && g.style && Gr(f, g.style)
            });
        b.forEach(Qd)
    }
    function Gr(a, b) {
        var c = Er(a.style);
        Er(b).forEach(function(d) {
            if (!(0 <= c.indexOf(d))) {
                var e = ur(b, d);
                vr(a.style, d, e)
            }
        })
    }
    function Er(a) {
        Ca(a) ? a = Ya(a) : (a = Jc(a),
        Wa(a, "cssText"));
        return a
    }
    ;var Hr = "undefined" != typeof t.WeakMap && -1 != t.WeakMap.toString().indexOf("[native code]")
      , Ir = 0;
    function Jr() {
        this.i = [];
        this.h = [];
        this.g = "data-elementweakmap-index-" + Ir++
    }
    Jr.prototype.set = function(a, b) {
        if (mr(Yq, a, "hasAttribute", [this.g])) {
            var c = parseInt(mr(Zq, a, "getAttribute", [this.g]) || null, 10);
            this.h[c] = b
        } else
            c = this.h.push(b) - 1,
            or(a, this.g, c.toString()),
            this.i.push(a);
        return this
    }
    ;
    Jr.prototype.get = function(a) {
        if (mr(Yq, a, "hasAttribute", [this.g]))
            return a = parseInt(mr(Zq, a, "getAttribute", [this.g]) || null, 10),
            this.h[a]
    }
    ;
    Jr.prototype.clear = function() {
        this.i.forEach(function(a) {
            mr(ar, a, "removeAttribute", [this.g])
        }, this);
        this.i = [];
        this.h = []
    }
    ;
    var Kr = !H || Yb(10)
      , Lr = !H || null == document.documentMode;
    function Mr() {}
    ;var Nr = {
        APPLET: !0,
        AUDIO: !0,
        BASE: !0,
        BGSOUND: !0,
        EMBED: !0,
        FORM: !0,
        IFRAME: !0,
        ISINDEX: !0,
        KEYGEN: !0,
        LAYER: !0,
        LINK: !0,
        META: !0,
        OBJECT: !0,
        SCRIPT: !0,
        SVG: !0,
        STYLE: !0,
        TEMPLATE: !0,
        VIDEO: !0
    };
    var Or = {
        A: !0,
        ABBR: !0,
        ACRONYM: !0,
        ADDRESS: !0,
        AREA: !0,
        ARTICLE: !0,
        ASIDE: !0,
        B: !0,
        BDI: !0,
        BDO: !0,
        BIG: !0,
        BLOCKQUOTE: !0,
        BR: !0,
        BUTTON: !0,
        CAPTION: !0,
        CENTER: !0,
        CITE: !0,
        CODE: !0,
        COL: !0,
        COLGROUP: !0,
        DATA: !0,
        DATALIST: !0,
        DD: !0,
        DEL: !0,
        DETAILS: !0,
        DFN: !0,
        DIALOG: !0,
        DIR: !0,
        DIV: !0,
        DL: !0,
        DT: !0,
        EM: !0,
        FIELDSET: !0,
        FIGCAPTION: !0,
        FIGURE: !0,
        FONT: !0,
        FOOTER: !0,
        FORM: !0,
        H1: !0,
        H2: !0,
        H3: !0,
        H4: !0,
        H5: !0,
        H6: !0,
        HEADER: !0,
        HGROUP: !0,
        HR: !0,
        I: !0,
        IMG: !0,
        INPUT: !0,
        INS: !0,
        KBD: !0,
        LABEL: !0,
        LEGEND: !0,
        LI: !0,
        MAIN: !0,
        MAP: !0,
        MARK: !0,
        MENU: !0,
        METER: !0,
        NAV: !0,
        NOSCRIPT: !0,
        OL: !0,
        OPTGROUP: !0,
        OPTION: !0,
        OUTPUT: !0,
        P: !0,
        PRE: !0,
        PROGRESS: !0,
        Q: !0,
        S: !0,
        SAMP: !0,
        SECTION: !0,
        SELECT: !0,
        SMALL: !0,
        SOURCE: !0,
        SPAN: !0,
        STRIKE: !0,
        STRONG: !0,
        STYLE: !0,
        SUB: !0,
        SUMMARY: !0,
        SUP: !0,
        TABLE: !0,
        TBODY: !0,
        TD: !0,
        TEXTAREA: !0,
        TFOOT: !0,
        TH: !0,
        THEAD: !0,
        TIME: !0,
        TR: !0,
        TT: !0,
        U: !0,
        UL: !0,
        VAR: !0,
        WBR: !0
    };
    var Pr = {
        "* ARIA-CHECKED": !0,
        "* ARIA-COLCOUNT": !0,
        "* ARIA-COLINDEX": !0,
        "* ARIA-CONTROLS": !0,
        "* ARIA-DESCRIBEDBY": !0,
        "* ARIA-DISABLED": !0,
        "* ARIA-EXPANDED": !0,
        "* ARIA-GOOG-EDITABLE": !0,
        "* ARIA-HASPOPUP": !0,
        "* ARIA-HIDDEN": !0,
        "* ARIA-LABEL": !0,
        "* ARIA-LABELLEDBY": !0,
        "* ARIA-MULTILINE": !0,
        "* ARIA-MULTISELECTABLE": !0,
        "* ARIA-ORIENTATION": !0,
        "* ARIA-PLACEHOLDER": !0,
        "* ARIA-READONLY": !0,
        "* ARIA-REQUIRED": !0,
        "* ARIA-ROLEDESCRIPTION": !0,
        "* ARIA-ROWCOUNT": !0,
        "* ARIA-ROWINDEX": !0,
        "* ARIA-SELECTED": !0,
        "* ABBR": !0,
        "* ACCEPT": !0,
        "* ACCESSKEY": !0,
        "* ALIGN": !0,
        "* ALT": !0,
        "* AUTOCOMPLETE": !0,
        "* AXIS": !0,
        "* BGCOLOR": !0,
        "* BORDER": !0,
        "* CELLPADDING": !0,
        "* CELLSPACING": !0,
        "* CHAROFF": !0,
        "* CHAR": !0,
        "* CHECKED": !0,
        "* CLEAR": !0,
        "* COLOR": !0,
        "* COLSPAN": !0,
        "* COLS": !0,
        "* COMPACT": !0,
        "* COORDS": !0,
        "* DATETIME": !0,
        "* DIR": !0,
        "* DISABLED": !0,
        "* ENCTYPE": !0,
        "* FACE": !0,
        "* FRAME": !0,
        "* HEIGHT": !0,
        "* HREFLANG": !0,
        "* HSPACE": !0,
        "* ISMAP": !0,
        "* LABEL": !0,
        "* LANG": !0,
        "* MAX": !0,
        "* MAXLENGTH": !0,
        "* METHOD": !0,
        "* MULTIPLE": !0,
        "* NOHREF": !0,
        "* NOSHADE": !0,
        "* NOWRAP": !0,
        "* OPEN": !0,
        "* READONLY": !0,
        "* REQUIRED": !0,
        "* REL": !0,
        "* REV": !0,
        "* ROLE": !0,
        "* ROWSPAN": !0,
        "* ROWS": !0,
        "* RULES": !0,
        "* SCOPE": !0,
        "* SELECTED": !0,
        "* SHAPE": !0,
        "* SIZE": !0,
        "* SPAN": !0,
        "* START": !0,
        "* SUMMARY": !0,
        "* TABINDEX": !0,
        "* TITLE": !0,
        "* TYPE": !0,
        "* VALIGN": !0,
        "* VALUE": !0,
        "* VSPACE": !0,
        "* WIDTH": !0
    }
      , Qr = {
        "* USEMAP": !0,
        "* ACTION": !0,
        "* CITE": !0,
        "* HREF": !0,
        "* LONGDESC": !0,
        "* SRC": !0,
        "LINK HREF": !0,
        "* FOR": !0,
        "* HEADERS": !0,
        "* NAME": !0,
        "A TARGET": !0,
        "* CLASS": !0,
        "* ID": !0,
        "* STYLE": !0
    };
    var Rr = {
        "ANNOTATION-XML": !0,
        "COLOR-PROFILE": !0,
        "FONT-FACE": !0,
        "FONT-FACE-SRC": !0,
        "FONT-FACE-URI": !0,
        "FONT-FACE-FORMAT": !0,
        "FONT-FACE-NAME": !0,
        "MISSING-GLYPH": !0
    };
    function Sr(a) {
        a = a || new Tr;
        Ur(a);
        this.g = Mc(a.g);
        this.l = Mc(a.V);
        this.h = Mc(a.i);
        this.v = a.F;
        a.m.forEach(function(b) {
            if (!fb(b, "data-"))
                throw new Pa('Only "data-" attributes allowed, got: %s.',[b]);
            if (fb(b, "data-sanitizer-"))
                throw new Pa('Attributes with "%s" prefix are not allowed, got: %s.',["data-sanitizer-", b]);
            this.g["* " + b.toUpperCase()] = Xr
        }, this);
        a.N.forEach(function(b) {
            b = b.toUpperCase();
            if (-1 == b.indexOf("-") || Rr[b])
                throw new Pa("Only valid custom element tag names allowed, got: %s.",[b]);
            this.h[b] = !0
        }, this);
        this.u = a.l;
        this.j = a.K;
        this.i = null;
        this.m = a.v
    }
    D(Sr, Mr);
    function Yr(a) {
        return function(b, c) {
            return (b = a(gb(b), c)) && "about:invalid#zClosurez" != sc(b) ? sc(b) : null
        }
    }
    function Tr() {
        this.g = {};
        Ra([Pr, Qr], function(a) {
            Jc(a).forEach(function(b) {
                this.g[b] = Xr
            }, this)
        }, this);
        this.h = {};
        this.m = [];
        this.N = [];
        this.V = Mc(Nr);
        this.i = Mc(Or);
        this.F = !1;
        this.ha = vc;
        this.ga = this.j = this.T = this.l = dc;
        this.K = null;
        this.u = this.v = !1
    }
    function Zr() {
        var a = new Tr;
        a.i = {
            SPAN: !0
        };
        "a b div h1 i li p span strong time ul".split(" ").forEach(function(b) {
            b = b.toUpperCase();
            if (Or[b])
                this.i[b] = !0;
            else
                throw Error("Only whitelisted tags can be allowed. See goog.html.sanitizer.TagWhitelist.");
        }, a);
        return a
    }
    function $r() {
        var a = Zr()
          , b = a.g;
        a.g = {};
        ["class", "datetime", "dir", "href", "rel", {
            tagName: "a",
            attributeName: "target"
        }].forEach(function(c) {
            "string" === typeof c && (c = {
                tagName: "*",
                attributeName: c.toUpperCase(),
                Ph: null
            });
            var d = as(c.tagName, c.attributeName);
            if (!b[d])
                throw Error("Only whitelisted attributes can be allowed.");
            this.g[d] = c.Ph ? c.Ph : Xr
        }, a);
        return a
    }
    function bs(a) {
        var b = $r();
        Za(b.m, ["data-timestamp"]);
        b.j = a;
        return b
    }
    function cs(a, b) {
        return function(c, d, e, f) {
            c = a(c, d, e, f);
            return null == c ? null : b(c, d, e, f)
        }
    }
    function ds(a, b, c, d) {
        a[c] && !b[c] && (a[c] = cs(a[c], d))
    }
    function Ur(a) {
        if (a.u)
            throw Error("HtmlSanitizer.Builder.build() can only be used once.");
        ds(a.g, a.h, "* USEMAP", es);
        var b = Yr(a.ha);
        ["* ACTION", "* CITE", "* HREF"].forEach(function(d) {
            ds(this.g, this.h, d, b)
        }, a);
        var c = Yr(a.l);
        ["* LONGDESC", "* SRC", "LINK HREF"].forEach(function(d) {
            ds(this.g, this.h, d, c)
        }, a);
        ["* FOR", "* HEADERS", "* NAME"].forEach(function(d) {
            ds(this.g, this.h, d, Ka(fs, this.T))
        }, a);
        ds(a.g, a.h, "A TARGET", Ka(gs, ["_blank", "_self"]));
        ds(a.g, a.h, "* CLASS", Ka(hs, a.j));
        ds(a.g, a.h, "* ID", Ka(is, a.j));
        ds(a.g, a.h, "* STYLE", Ka(a.ga, c));
        a.u = !0
    }
    function as(a, b) {
        a || (a = "*");
        return (a + " " + b).toUpperCase()
    }
    function Xr(a) {
        return gb(a)
    }
    function gs(a, b) {
        b = gb(b);
        return Va(a, b.toLowerCase()) ? b : null
    }
    function es(a) {
        return (a = gb(a)) && "#" == a.charAt(0) ? a : null
    }
    function fs(a, b, c) {
        return a(gb(b), c)
    }
    function hs(a, b, c) {
        b = b.split(/(?:\s+)/);
        for (var d = [], e = 0; e < b.length; e++) {
            var f = a(b[e], c);
            f && d.push(f)
        }
        return 0 == d.length ? null : d.join(" ")
    }
    function is(a, b, c) {
        return a(gb(b), c)
    }
    function js(a, b) {
        var c = b.data;
        (b = tr(b)) && "style" == rr(b).toLowerCase() && !("STYLE"in a.l) && "STYLE"in a.h && (c = Uc(Cr(c, a.i, Ja(function(d, e) {
            return this.u(d, {
                Bk: e
            })
        }, a))));
        return document.createTextNode(c)
    }
    ;var ks;
    function ls() {
        return ks || (ks = new Sr(bs(function(a, b) {
            return b && "class" === b.attributeName && fb(a, "ts-") ? a : null
        })))
    }
    function ms(a) {
        var b = ls();
        var c = !("STYLE"in b.l) && "STYLE"in b.h;
        c = "*" == b.j && c ? "sanitizer-" + (Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ La()).toString(36)) : b.j;
        b.i = c;
        if (Kr) {
            c = a;
            if (Kr) {
                a = L("SPAN");
                b.i && "*" == b.j && (a.id = b.i);
                b.m && (c = Dr("<div>" + c + "</div>"),
                Fr(c),
                c = c.innerHTML);
                c = Zc(c);
                var d = document.createElement("template");
                if (Lr && "content"in d)
                    bd(d, c),
                    d = d.content;
                else {
                    var e = document.implementation.createHTMLDocument("x");
                    d = e.body;
                    bd(e.body, c)
                }
                c = document.createTreeWalker(d, NodeFilter.SHOW_ELEMENT | NodeFilter.SHOW_TEXT, null, !1);
                for (d = Hr ? new t.WeakMap : new Jr; e = c.nextNode(); ) {
                    c: {
                        var f = b;
                        var g = e;
                        switch (sr(g)) {
                        case 3:
                            f = js(f, g);
                            break c;
                        case 1:
                            if ("TEMPLATE" == rr(g).toUpperCase())
                                f = null;
                            else {
                                var h = rr(g).toUpperCase();
                                if (h in f.l || "http://www.w3.org/1999/xhtml" != wr(g))
                                    var l = null;
                                else
                                    f.h[h] ? l = document.createElement(h) : (l = L("SPAN"),
                                    f.v && or(l, "data-sanitizer-original-tag", h.toLowerCase()));
                                if (l) {
                                    var m = l
                                      , n = nr(g);
                                    if (null != n)
                                        for (var q = 0; h = n[q]; q++)
                                            if (h.specified) {
                                                var p = f;
                                                var u = g
                                                  , x = h
                                                  , B = x.name;
                                                if (fb(B, "data-sanitizer-"))
                                                    p = null;
                                                else {
                                                    var E = rr(u);
                                                    x = x.value;
                                                    var I = {
                                                        tagName: gb(E).toLowerCase(),
                                                        attributeName: gb(B).toLowerCase()
                                                    }
                                                      , G = {
                                                        Qi: void 0
                                                    };
                                                    "style" == I.attributeName && (G.Qi = pr(u));
                                                    u = as(E, B);
                                                    u in p.g ? (p = p.g[u],
                                                    p = p(x, I, G)) : (B = as(null, B),
                                                    B in p.g ? (p = p.g[B],
                                                    p = p(x, I, G)) : p = null)
                                                }
                                                null !== p && or(m, h.name, p)
                                            }
                                    f = l
                                } else
                                    f = null
                            }
                            break c;
                        default:
                            f = null
                        }
                    }
                    if (f) {
                        if (1 == sr(f) && d.set(e, f),
                        e = tr(e),
                        g = !1,
                        e)
                            h = sr(e),
                            l = rr(e).toLowerCase(),
                            m = tr(e),
                            11 != h || m ? "body" == l && m && (h = tr(m)) && !tr(h) && (g = !0) : g = !0,
                            h = null,
                            g || !e ? h = a : 1 == sr(e) && (h = d.get(e)),
                            h.content && (h = h.content),
                            h.appendChild(f)
                    } else
                        Od(e)
                }
                d.clear && d.clear();
                b = a
            } else
                b = L("SPAN");
            0 < nr(b).length && (a = L("SPAN"),
            a.appendChild(b),
            b = a);
            b = (new XMLSerializer).serializeToString(b);
            b = b.slice(b.indexOf(">") + 1, b.lastIndexOf("</"))
        } else
            b = "";
        return Zc(b)
    }
    function ns(a) {
        var b = L("SPAN");
        a = ms(a);
        bd(b, a);
        return b
    }
    ;function os() {
        yq.apply(this, arguments)
    }
    z(os, yq);
    os.prototype.Aa = function(a, b, c) {
        yq.prototype.Aa.call(this, a, b, c);
        a instanceof uq && (a.h && mq(a.h, 12),
        a.h && (a.h.ha = 0))
    }
    ;
    os.prototype.J = function() {
        yq.prototype.J.call(this);
        O(this.s, "popupMenu")
    }
    ;
    function lq(a) {
        var b = new os;
        b.ya(a);
        zq(b);
        b.fa();
        (a = b.o()) && Qd(a);
        T(b.s, !0);
        return b
    }
    ;function ps(a) {
        M.call(this);
        this.h = a;
        this.j = []
    }
    z(ps, M);
    function qs(a, b) {
        Ig(function() {
            rs(this, b)
        }, a)
    }
    function rs(a, b) {
        a = y(a.j);
        for (var c = a.next(); !c.done; c = a.next())
            c.value.g(b)
    }
    ps.prototype.C = function(a) {
        this.m || (this.m = !0,
        this.l());
        a = new ss(a);
        this.j.push(a);
        return a
    }
    ;
    ps.prototype.ma = function(a) {
        Wa(this.j, a)
    }
    ;
    function ss(a) {
        this.g = a
    }
    ;function us(a) {
        ps.call(this, a)
    }
    z(us, ps);
    us.prototype.D = function() {
        th(this.g) && this.g.close();
        ps.prototype.D.call(this)
    }
    ;
    us.prototype.i = function(a) {
        (this.g || (this.g = new BroadcastChannel(this.h))).postMessage(a)
    }
    ;
    us.prototype.l = function() {
        (this.g || (this.g = new BroadcastChannel(this.h))).onmessage = function(a) {
            rs(this, a.data)
        }
        .bind(this)
    }
    ;
    function vs(a, b) {
        void 0 === b && a === ws && (b = "Storage is disabled. Cause: a higher level of the Tracking protection, the private mode, cookies blocking...");
        b = Error.call(this, b);
        this.message = b.message;
        "stack"in b && (this.stack = b.stack);
        this.name = a
    }
    z(vs, Error);
    var ws = "Disabled";
    function xs() {}
    function ys(a) {
        try {
            var b = a.g();
            if (void 0 === b)
                throw new vs("NotSupported");
            if (null === b)
                throw new vs(ws);
        } catch (c) {
            if (c instanceof Error && ("SecurityError" === c.name || sb()))
                throw new vs(ws);
            throw c;
        }
        return b
    }
    xs.prototype.He = function() {
        try {
            if (this.get("___support_test") && (zs(this, "___support_test"),
            null !== this.get("___support_test")))
                return !1;
            this.set("___support_test", "test");
            if ("test" === this.get("___support_test") && (zs(this, "___support_test"),
            null === this.get("___support_test")))
                return !0
        } catch (a) {}
        return !1
    }
    ;
    function As(a, b) {
        if (Da(a)) {
            var c = a.name;
            a = a.message;
            if (Eh(c) && fb(c, "NS_ERROR_") || Eh(a) && (v(a, "includes").call(a, "There is insufficient disk space") || v(a, "includes").call(a, "out of memory") || v(a, "includes").call(a, "not enough space")))
                throw new vs("NotSupported",b + ", reason: " + c + (a ? ":" + a : ""));
        }
    }
    xs.prototype.set = function(a, b) {
        var c = ys(this);
        try {
            c.setItem(a, b)
        } catch (d) {
            if (Da(d)) {
                if ("QuotaExceededError" === d.name)
                    throw new vs(c.length ? "QuotaExceeded" : ws);
                As(d, "Cannot write to " + this.Db())
            }
            throw d;
        }
    }
    ;
    xs.prototype.get = function(a) {
        var b = ys(this);
        try {
            var c = b.getItem(a)
        } catch (d) {
            throw As(d, "Cannot read from " + this.Db()),
            d;
        }
        if ("string" !== typeof c && null !== c)
            throw new vs("InvalidValue");
        return c
    }
    ;
    function zs(a, b) {
        var c = ys(a);
        try {
            c.removeItem(b)
        } catch (d) {
            throw As(d, "Cannot remove from " + a.Db()),
            d;
        }
    }
    function Bs(a) {
        var b = ys(a);
        try {
            return b.length
        } catch (c) {
            throw As(c, "Cannot read from " + a.Db()),
            c;
        }
    }
    xs.prototype.key = function(a) {
        var b = ys(this);
        try {
            return b.key(a)
        } catch (c) {
            throw As(c, "Cannot read from " + this.Db()),
            c;
        }
    }
    ;
    function Cs() {}
    var Ds;
    z(Cs, xs);
    Cs.prototype.g = function() {
        return A.localStorage
    }
    ;
    Cs.prototype.Db = function() {
        return "LocalStorage"
    }
    ;
    function Es() {
        return Ds || (Ds = new Cs)
    }
    ;function Fs(a) {
        ps.call(this, a)
    }
    z(Fs, ps);
    Fs.prototype.D = function() {
        th(this.g) && gf(this.g);
        ps.prototype.D.call(this)
    }
    ;
    Fs.prototype.i = function(a) {
        var b = Es();
        try {
            var c = this.h
              , d = {};
            d.uid = xh();
            d.data = a;
            b.set(c, mo(d));
            zs(b, c)
        } catch (e) {
            e instanceof vs ? Xi("Cannot write/remove to localStorage", e) : W("Cannot write/remove to localStorage", e)
        }
    }
    ;
    Fs.prototype.l = function() {
        this.g = Q(A, "storage", function(a) {
            a = a.ja;
            a.key === this.h && (a = a.newValue) && (a = ko(a),
            rs(this, a.data))
        }, !1, this)
    }
    ;
    var Gs;
    function Hs(a, b) {
        He.call(this, a);
        this.data = b
    }
    z(Hs, He);
    function Is(a) {
        return a.type + ":" + (void 0 === a.data ? "" : mo(a.data))
    }
    function Js() {
        if (!Gs) {
            Gs = "BroadcastChannel"in A ? new us("ts-wbevnt__") : new Fs("ts-wbevnt__");
            var a = A.navigator;
            "serviceWorker"in a && Q(a.serviceWorker, "message", function(b) {
                b = new Hs(b.ja.data);
                qs(Js(), Is(b))
            })
        }
        return Gs
    }
    function Ks(a, b) {
        Js().C(function(c) {
            var d = c.indexOf(":");
            if (c.substring(0, d) === a) {
                c = c.substring(d + 1);
                var e = new Hs(a,c.length ? ko(c) : void 0)
            }
            (c = e || null) && b(c)
        })
    }
    function Ls(a) {
        var b = Js();
        a = Is(a);
        b.i(a);
        qs(b, a)
    }
    ;var Ms, Ns, Os = ["reklama", "ligatus"], Ps = ["info-circle", "exclamation-triangle", "lightbulb"];
    function Qs(a, b) {
        Rs[a] = b
    }
    function Ss(a, b) {
        Hp(a, b).L(!0);
        return !1
    }
    function Ts(a, b, c) {
        void 0 === c && (c = Dd(),
        c = "resizable=yes,scrollbars=yes,width=" + Math.min(c.width, 1E3) + ",height=" + Math.min(c.height, 600));
        Ah(a, b, c)
    }
    function Us(a, b) {
        var c = Dd();
        if (1152 > c.width || 1088 > c.height) {
            var d = new U, e;
            bh(new Lg(function(m) {
                function n() {
                    var p = new Image;
                    R(p, {
                        "max-width": "100%",
                        "max-height": "100%",
                        "object-fit": b ? "scale-down" : "contain"
                    });
                    Vs(a, p);
                    e.appendChild(p)
                }
                var q = K("DIV", {
                    style: "position:absolute;z-index:-1"
                });
                e = K("DIV", {
                    style: "position:fixed;z-index:2;cursor:pointer;display:flex;justify-content:center",
                    title: "Click to close"
                }, q);
                O(e, "ts-zero-box-offs");
                Tf(q, .6);
                te(q, ["ts-modal-bg-color", "ts-zero-box-offs"]);
                d.C(e, ["wheel"], function(p) {
                    p.preventDefault()
                });
                d.tc(e, "click", function() {
                    m()
                });
                document.body.appendChild(e);
                d.C(new sf(document), pf, function(p) {
                    27 === p.keyCode && m()
                });
                q = null;
                q instanceof t.Promise || (q = t.Promise.resolve());
                q.then(n, n)
            }
            ), function() {
                d.G();
                Qd(e)
            })
        } else {
            c = K("IMG", {
                title: "Click to close",
                style: "cursor:pointer;display:block;max-width:calc(90vw - 2 * var(--dialog-padding));max-height:calc(85vh - 2 * var(--dialog-padding))"
            });
            O(c, "unselectable");
            var f = Hp(null, c);
            f.Fa = null;
            Bp(f, !1);
            b && (f.Kj = Ep);
            var g = new U(f);
            if (A.ResizeObserver) {
                var h = new ResizeObserver(function() {
                    f.la()
                }
                );
                h.observe(c)
            }
            f.L(!0);
            g.tc(f.s, "click", f.G);
            var l = Vs(a, c).then(f.la, null, f);
            N(f, g);
            ne(f, function() {
                l.cancel();
                h.disconnect()
            })
        }
    }
    function Ws(a, b, c) {
        return Xs(a, null, b, c).toString()
    }
    function Xs(a, b, c, d) {
        var e = {};
        c = c ? Mc(c) : {};
        var f;
        a && (f = a.toLowerCase());
        if (f && v(f, "startsWith").call(f, "api")) {
            var g = "/api/" + f.substring(3) + "/" + b;
            b = null
        } else
            f && (e.rc = f),
            "uname"in c && (g = "/" + c.uname,
            delete c.uname);
        b && (e.am = b.toLowerCase());
        no(e, c);
        g || Kc(e) && !d || (g = "/");
        a = new fk;
        b = A.location;
        gk(a, b.protocol);
        hk(a, b.hostname);
        ik(a, b.port);
        g && (a.g = g);
        d && (a.j = d);
        d = ek(e);
        if ("undefined" == typeof d)
            throw Error("Keys are undefined");
        g = new mk(null);
        e = dk(e);
        for (b = 0; b < d.length; b++)
            c = d[b],
            f = e[b],
            Array.isArray(f) ? Ak(g, c, f) : g.add(c, f);
        jk(a, g);
        return a
    }
    var Rs = {};
    function Ys() {
        var a = ns(V("You need to <a>sign in</a> first."));
        Bd(Ad("A", null, a), {
            href: Ws("signin", {
                ret: Uk().toString()
            })
        });
        return a
    }
    function Zs(a) {
        var b = L("SPAN");
        $s(b, a);
        return b
    }
    function $s(a, b) {
        b /= 1E3;
        var c = Math.floor(b)
          , d = Math.floor(c / 60);
        c = yi(V("%d:%06.3f [minutes:seconds]"), d, b % 60);
        Bd(a, {
            title: c,
            dir: "ltr"
        });
        c = Math.round(b);
        d = Math.floor(c / 60);
        Vd(a, yi("%d:%02d", d, c % 60))
    }
    var at = RegExp("(/i/[a-f\\d]+/)(\\d{2,4})(/.+)");
    function bt(a, b) {
        "string" === typeof b && (b = b.replace(/\$/g, "$$$$"));
        return a.replace(at, "$1" + b + "$3")
    }
    function ct(a, b) {
        var c = sh();
        a && (delete c.pieces,
        delete c.shape,
        delete c.rotation);
        b && (delete c.iframe,
        delete c.view,
        delete c.pview);
        return c
    }
    function dt(a) {
        return K("SPAN", {
            "class": "ts-new-label ts-small",
            style: "transform:rotate(5deg);display:inline-block;margin:0 0.4em"
        }, a || V("New"))
    }
    function et(a) {
        var b = a.href, c;
        "/" !== b.charAt(0) && (c = mj(b.match(lj)[3] || null)) && !Wk(c) && Xl(function() {
            for (var d = new t.Set, e = y(a.childNodes), f = e.next(); !f.done; f = e.next()) {
                f = f.value;
                var g = void 0;
                if (f.nodeType === Node.TEXT_NODE || f.nodeType === Node.DOCUMENT_NODE || f.nodeType === Node.ELEMENT_NODE && (g = A.getComputedStyle(f)) && fb(g.display, "inline"))
                    d.add(f);
                else {
                    d = null;
                    break
                }
            }
            return d
        }).then(function(d) {
            if (d && d.size) {
                var e = L("SPAN");
                a.appendChild(e);
                d = y(d);
                for (var f = d.next(); !f.done; f = d.next())
                    e.appendChild(f.value);
                e = K("SPAN", null, document.createTextNode("\u00a0"));
                R(e, "display", "inline-block");
                a.appendChild(e);
                e = cm("arrow-up-right-from-square");
                R(e, {
                    "font-size": "max(10px, 60%)",
                    position: "relative",
                    top: "-0.15em"
                });
                a.appendChild(e)
            }
        })
    }
    function ft(a, b, c) {
        try {
            var d = a.l;
            if ("mailto" === d || "http" === d || "https" === d) {
                var e = K("a", {
                    target: "_blank",
                    rel: "noopener",
                    dir: "ltr"
                })
                  , f = a.i;
                if (f && Wk(f)) {
                    uk(a);
                    var g;
                    if (f && Wk(f) && (g = a.h.get("pid"))) {
                        var h = Ws("img", {
                            pid: g,
                            size: 160
                        })
                          , l = Gq(e, function() {
                            var m = e.cloneNode(!1)
                              , n = new Image;
                            R(n, {
                                border: 0,
                                display: "block"
                            });
                            Vs(h, n).then(function() {
                                this.h && this.h.isVisible() && this.h.la()
                            }, null, this);
                            m.appendChild(n);
                            return m
                        }, !0);
                        c && N(c, l)
                    }
                } else
                    Bd(e, {
                        rel: "nofollow"
                    });
                Nd(e, b);
                cd(e, a.toString());
                et(e);
                return e
            }
        } catch (m) {}
        return b
    }
    var gt = [];
    function ht(a) {
        if (Ms)
            gt.push(a);
        else {
            var b = function() {
                if (0 == gt.length)
                    Ms = null;
                else {
                    var c = v(t.Promise, "allSettled").call(t.Promise, gt).then(b, b);
                    gt.length = 0;
                    return c
                }
            };
            Ms = a.then(b, b)
        }
    }
    function it() {
        return A.tsEnv.staticFileVersion
    }
    function Vs(a, b, c) {
        b || (b = new Image);
        try {
            R(b, "image-rendering", "optimizeQuality"),
            R(b, "image-rendering", "high-quality")
        } catch (d) {}
        if (at.test("" + a) || fb(("string" === typeof a ? new fk(a) : a).g, "/img/"))
            b.crossOrigin = "anonymous";
        return Cl(a, b, c)
    }
    ;function jt(a) {
        for (var b = [], c = 0, d = 0; d < a.length; d++) {
            var e = a.charCodeAt(d);
            255 < e && (b[c++] = e & 255,
            e >>= 8);
            b[c++] = e
        }
        return b
    }
    function kt(a) {
        return Array.prototype.map.call(a, function(b) {
            b = b.toString(16);
            return 1 < b.length ? b : "0" + b
        }).join("")
    }
    ;function lt() {
        this.blockSize = -1
    }
    ;function mt() {
        this.blockSize = -1;
        this.blockSize = 64;
        this.g = Array(4);
        this.j = Array(this.blockSize);
        this.i = this.h = 0;
        this.reset()
    }
    D(mt, lt);
    mt.prototype.reset = function() {
        this.g[0] = 1732584193;
        this.g[1] = 4023233417;
        this.g[2] = 2562383102;
        this.g[3] = 271733878;
        this.i = this.h = 0
    }
    ;
    function nt(a, b, c) {
        c || (c = 0);
        var d = Array(16);
        if ("string" === typeof b)
            for (var e = 0; 16 > e; ++e)
                d[e] = b.charCodeAt(c++) | b.charCodeAt(c++) << 8 | b.charCodeAt(c++) << 16 | b.charCodeAt(c++) << 24;
        else
            for (e = 0; 16 > e; ++e)
                d[e] = b[c++] | b[c++] << 8 | b[c++] << 16 | b[c++] << 24;
        b = a.g[0];
        c = a.g[1];
        e = a.g[2];
        var f = a.g[3];
        var g = b + (f ^ c & (e ^ f)) + d[0] + 3614090360 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[1] + 3905402710 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[2] + 606105819 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[3] + 3250441966 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[4] + 4118548399 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[5] + 1200080426 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[6] + 2821735955 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[7] + 4249261313 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[8] + 1770035416 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[9] + 2336552879 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[10] + 4294925233 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[11] + 2304563134 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (f ^ c & (e ^ f)) + d[12] + 1804603682 & 4294967295;
        b = c + (g << 7 & 4294967295 | g >>> 25);
        g = f + (e ^ b & (c ^ e)) + d[13] + 4254626195 & 4294967295;
        f = b + (g << 12 & 4294967295 | g >>> 20);
        g = e + (c ^ f & (b ^ c)) + d[14] + 2792965006 & 4294967295;
        e = f + (g << 17 & 4294967295 | g >>> 15);
        g = c + (b ^ e & (f ^ b)) + d[15] + 1236535329 & 4294967295;
        c = e + (g << 22 & 4294967295 | g >>> 10);
        g = b + (e ^ f & (c ^ e)) + d[1] + 4129170786 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[6] + 3225465664 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[11] + 643717713 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[0] + 3921069994 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[5] + 3593408605 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[10] + 38016083 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[15] + 3634488961 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[4] + 3889429448 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[9] + 568446438 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[14] + 3275163606 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[3] + 4107603335 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[8] + 1163531501 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (e ^ f & (c ^ e)) + d[13] + 2850285829 & 4294967295;
        b = c + (g << 5 & 4294967295 | g >>> 27);
        g = f + (c ^ e & (b ^ c)) + d[2] + 4243563512 & 4294967295;
        f = b + (g << 9 & 4294967295 | g >>> 23);
        g = e + (b ^ c & (f ^ b)) + d[7] + 1735328473 & 4294967295;
        e = f + (g << 14 & 4294967295 | g >>> 18);
        g = c + (f ^ b & (e ^ f)) + d[12] + 2368359562 & 4294967295;
        c = e + (g << 20 & 4294967295 | g >>> 12);
        g = b + (c ^ e ^ f) + d[5] + 4294588738 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[8] + 2272392833 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[11] + 1839030562 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[14] + 4259657740 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[1] + 2763975236 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[4] + 1272893353 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[7] + 4139469664 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[10] + 3200236656 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[13] + 681279174 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[0] + 3936430074 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[3] + 3572445317 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[6] + 76029189 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (c ^ e ^ f) + d[9] + 3654602809 & 4294967295;
        b = c + (g << 4 & 4294967295 | g >>> 28);
        g = f + (b ^ c ^ e) + d[12] + 3873151461 & 4294967295;
        f = b + (g << 11 & 4294967295 | g >>> 21);
        g = e + (f ^ b ^ c) + d[15] + 530742520 & 4294967295;
        e = f + (g << 16 & 4294967295 | g >>> 16);
        g = c + (e ^ f ^ b) + d[2] + 3299628645 & 4294967295;
        c = e + (g << 23 & 4294967295 | g >>> 9);
        g = b + (e ^ (c | ~f)) + d[0] + 4096336452 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[7] + 1126891415 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[14] + 2878612391 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[5] + 4237533241 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[12] + 1700485571 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[3] + 2399980690 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[10] + 4293915773 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[1] + 2240044497 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[8] + 1873313359 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[15] + 4264355552 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[6] + 2734768916 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[13] + 1309151649 & 4294967295;
        c = e + (g << 21 & 4294967295 | g >>> 11);
        g = b + (e ^ (c | ~f)) + d[4] + 4149444226 & 4294967295;
        b = c + (g << 6 & 4294967295 | g >>> 26);
        g = f + (c ^ (b | ~e)) + d[11] + 3174756917 & 4294967295;
        f = b + (g << 10 & 4294967295 | g >>> 22);
        g = e + (b ^ (f | ~c)) + d[2] + 718787259 & 4294967295;
        e = f + (g << 15 & 4294967295 | g >>> 17);
        g = c + (f ^ (e | ~b)) + d[9] + 3951481745 & 4294967295;
        a.g[0] = a.g[0] + b & 4294967295;
        a.g[1] = a.g[1] + (e + (g << 21 & 4294967295 | g >>> 11)) & 4294967295;
        a.g[2] = a.g[2] + e & 4294967295;
        a.g[3] = a.g[3] + f & 4294967295
    }
    mt.prototype.update = function(a, b) {
        void 0 === b && (b = a.length);
        for (var c = b - this.blockSize, d = this.j, e = this.h, f = 0; f < b; ) {
            if (0 == e)
                for (; f <= c; )
                    nt(this, a, f),
                    f += this.blockSize;
            if ("string" === typeof a)
                for (; f < b; ) {
                    if (d[e++] = a.charCodeAt(f++),
                    e == this.blockSize) {
                        nt(this, d);
                        e = 0;
                        break
                    }
                }
            else
                for (; f < b; )
                    if (d[e++] = a[f++],
                    e == this.blockSize) {
                        nt(this, d);
                        e = 0;
                        break
                    }
        }
        this.h = e;
        this.i += b
    }
    ;
    function ot(a) {
        var b = Array((56 > a.h ? a.blockSize : 2 * a.blockSize) - a.h);
        b[0] = 128;
        for (var c = 1; c < b.length - 8; ++c)
            b[c] = 0;
        var d = 8 * a.i;
        for (c = b.length - 8; c < b.length; ++c)
            b[c] = d & 255,
            d /= 256;
        a.update(b);
        b = Array(16);
        for (c = d = 0; 4 > c; ++c)
            for (var e = 0; 32 > e; e += 8)
                b[d++] = a.g[c] >>> e & 255;
        return b
    }
    ;function pt(a) {
        this.g = a.__c
    }
    ;function qt(a) {
        this.g = a.__c;
        this.pa = a
    }
    z(qt, pt);
    qt.prototype.$ = function() {
        return this.pa.width
    }
    ;
    qt.prototype.Z = function() {
        return this.pa.height
    }
    ;
    function rt(a) {
        return void 0 === a.pa.paudit ? 0 : a.pa.paudit
    }
    function st(a) {
        return new qt(a)
    }
    ;function tt(a) {
        this.g = a.__c;
        this.pa = a;
        void 0 !== this.pa.name && void 0 === this.pa.name_ue && (this.pa.name_ue = Rk(this.pa.name))
    }
    z(tt, pt);
    k = tt.prototype;
    k.ea = function() {
        return this.pa
    }
    ;
    k.Ae = function(a) {
        if ("album.authkey" === a && !this.pa.album)
            return "";
        a = a.split(".");
        var b = a.shift();
        b = this.pa[b];
        if (a.length) {
            var c = a.join(".");
            b instanceof tt ? b = b.Ae(c) : b instanceof qt ? b = b.pa[a[0]] : Da(b) ? b = za(c, b) : (dj(b),
            b = "")
        }
        return b
    }
    ;
    function ut(a) {
        return a.pa.name
    }
    function vt(a) {
        return void 0 === a.pa.image ? null : a.pa.image
    }
    k.Pd = function() {
        var a = this.pa.extras || null;
        return a ? a.cmenu || null : null
    }
    ;
    k.Af = function() {
        var a = this.pa.extras || null;
        return a ? a.mhide || null : null
    }
    ;
    k.yb = function() {
        return this.pa.url
    }
    ;
    function wt() {}
    var xt;
    z(wt, xs);
    wt.prototype.g = function() {
        return A.sessionStorage
    }
    ;
    wt.prototype.Db = function() {
        return "SessionStorage"
    }
    ;
    function yt() {
        Y.call(this);
        this.h = xt || (xt = new wt)
    }
    z(yt, Y);
    yt.prototype.J = function() {
        Y.prototype.J.call(this);
        O(this.s, "ts-phm")
    }
    ;
    function zt(a, b, c, d, e) {
        if (void 0 === c || null === c)
            c = 0;
        e = new At(b,c,d,e);
        a.H(e, !0);
        if (!d) {
            var f;
            Bt(a, f = xh(), b, c);
            a = function() {
                if (void 0 !== f) {
                    var g = f
                      , h = Ct(this);
                    delete h[g];
                    Kc(h) ? Dt(this) : Et(this, h);
                    f = void 0
                }
            }
            .bind(a);
            ne(e, a);
            Bi(a, 2E3)
        }
    }
    yt.prototype.i = function(a, b) {
        zt(this, a, b)
    }
    ;
    function Ft(a) {
        Xi("Cannot access to " + a.h.Db())
    }
    function Ct(a) {
        try {
            var b = a.h.get("ts-" + a.j());
            null !== b && (b = ko(b))
        } catch (c) {
            Ft(a)
        }
        return b && "v1"in b && Da(b.v1) ? b.v1 : {}
    }
    function Et(a, b) {
        var c = {};
        c.v1 = b;
        try {
            a.h.set("ts-" + a.j(), mo(c))
        } catch (d) {
            Ft(a)
        }
    }
    function Dt(a) {
        try {
            zs(a.h, "ts-" + a.j())
        } catch (b) {
            Ft(a)
        }
    }
    function Bt(a, b, c, d) {
        var e = Ct(a)
          , f = {};
        f[Gt] = c instanceof Xc ? [Yc(c).toString()] : c;
        f[Ht] = d;
        f[It] = Mi();
        e[b] = f;
        Et(a, e)
    }
    function Jt(a) {
        var b = Ct(a);
        Dt(a);
        var c = Mi();
        try {
            for (var d in b) {
                var e = b[d]
                  , f = e[Gt];
                Array.isArray(f) && (f = ms(f[0]));
                var g = f;
                var h = e[Ht];
                var l = e[It];
                4E4 >= c - l && a.i(g, h)
            }
        } catch (m) {
            W("amfpp")
        }
    }
    var Gt = "a"
      , Ht = "b"
      , It = "c";
    function At(a, b, c, d) {
        Y.call(this, null, ["ts-msg", "ts-type" + b]);
        this.i = !!c;
        this.H(new Y(null,null,cm(Ps[b])));
        a = a instanceof Xc ? vl(a) : ul(a);
        if (!this.i || d)
            a = Kt(this, a, d);
        this.H(a)
    }
    z(At, Y);
    function Kt(a, b, c) {
        function d() {
            Y.call(this);
            this.Oe = K("A", {
                href: "javascript:void(0)"
            }, em(c ? null : V("Remove")));
            this.H(new Y("DIV",{
                "class": "ts-flx11a",
                style: "align-self:center"
            },b));
            this.H(new Y("DIV",null,this.Oe))
        }
        z(d, Y);
        d.Error = Sj;
        d.prototype.J = function() {
            Y.prototype.J.call(this);
            var e, f = this.s;
            O(f, "ts-flxdspl");
            R(f, "column-gap", "var(--horizontal-spacing)");
            this.ka().C(this.Oe, "click", function() {
                e || (R(this.Oe, "pointer-events", "none"),
                e = c ? c() : t.Promise.resolve(),
                e.then(function() {
                    a.G()
                }, function() {
                    R(this.Oe, "pointer-events", "");
                    e = null
                }
                .bind(this)))
            })
        }
        ;
        return new d
    }
    At.prototype.O = function() {
        Y.prototype.O.call(this);
        var a = new Zm(this.s,200)
          , b = this;
        N(this, a);
        this.i || a.tc("finish", function() {
            Bi(function() {
                b.W() || Lt(b)
            }, 4E3)
        });
        a.play()
    }
    ;
    function Lt(a) {
        var b = a.getParent();
        b instanceof yt && (a.h = new Ym(a.s,650),
        N(a, a.h),
        Q(a.h, "finish", function() {
            b.Ib(this, !0);
            this.G()
        }, !1, a),
        a.h.play())
    }
    ;function Mt() {
        yt.call(this)
    }
    var Nt;
    z(Mt, yt);
    function Ot() {
        Nt || (Nt = new Mt,
        Nt.La(document.body),
        Jt(Nt));
        return Nt
    }
    Mt.prototype.J = function() {
        yt.prototype.J.call(this);
        this.s.id = "ts-hm"
    }
    ;
    Mt.prototype.j = function() {
        return "hotmsgs"
    }
    ;
    function Pt() {
        yt.call(this)
    }
    var Qt;
    z(Pt, yt);
    function Rt() {
        if (void 0 === Qt) {
            var a = ud("ts-pm");
            a ? (Od(a),
            Qt = new Pt,
            Qt.ya(a),
            Jt(Qt)) : Qt = null
        }
        return Qt
    }
    Pt.prototype.i = function(a, b, c) {
        zt(this, a, b, !0, c)
    }
    ;
    Pt.prototype.j = function() {
        return "pagemsgs"
    }
    ;
    function St(a) {
        tt.call(this, a)
    }
    var Tt;
    z(St, tt);
    k = St.prototype;
    k.ea = function() {
        return tt.prototype.ea.call(this)
    }
    ;
    k.Nc = function() {
        var a = this.pa.extras || null, b;
        if (a && void 0 !== (b = a.followed_by_visitor))
            return b
    }
    ;
    k.yb = function() {
        if (this.ea().deactivated)
            return null;
        var a = this.ea().url;
        return void 0 === a ? this.i || (this.i = Ws(null, {
            uname: ut(this)
        })) : a
    }
    ;
    k.ud = function() {
        var a = Ut();
        return a.Wd() && 0 === hb(ut(a), ut(this))
    }
    ;
    function Vt() {
        return 1 === (Ut().ea().role || 0)
    }
    k.Wd = function() {
        return !0
    }
    ;
    function Wt(a, b, c) {
        Ot().i(b, c)
    }
    function Xt(a, b, c, d) {
        Rt().i(b, c, d)
    }
    function Ut() {
        if (void 0 === Tt) {
            var a = A.tsEnv.user;
            if (a)
                try {
                    Tt = jo(a)
                } catch (b) {}
            Tt = Tt || Yt.Ra()
        }
        return Tt
    }
    function Yt() {
        tt.call(this, {
            name: "!Anonymous",
            image: null,
            __c: "User"
        })
    }
    z(Yt, St);
    Yt.prototype.yb = function() {
        return null
    }
    ;
    Yt.prototype.ud = function() {
        return !1
    }
    ;
    Yt.prototype.Ba = function() {}
    ;
    Yt.prototype.Wd = function() {
        return !1
    }
    ;
    Aa(Yt);
    function Zt() {
        return Ut().Wd()
    }
    function $t(a) {
        var b = Ut();
        return 0 === hb(a, ut(b))
    }
    ;function au(a, b) {
        this.g = a;
        this.h = void 0 === b ? 10001 : b
    }
    var bu = new au("Unknown error, sorry. If the error is permanent, please contact us.")
      , cu = new au("Cannot communicate with a server, maybe Internet connection is not working...");
    function du(a) {
        var b, c = [];
        for (b in a)
            c.push(b + ":" + a[b]);
        c.sort();
        return c.join(";") + "_"
    }
    function eu(a, b, c) {
        fu(Eh(a) ? a : a.apiMethod, b, c ? function(d, e) {
            e ? c(null) : c(d)
        }
        : null, {
            Hb: a.showError,
            lb: a.cacheResult,
            bi: this
        })
    }
    function gu(a, b, c) {
        fu(a, b, c ? function(d, e) {
            e ? c(null) : c(d)
        }
        : null, {
            method: "POST",
            bi: this
        })
    }
    function hu(a, b, c) {
        return new t.Promise(function(d, e) {
            fu(a, b, function(f, g) {
                g ? e(Error(g[0].g)) : d(f)
            }, c)
        }
        )
    }
    function fu(a, b, c, d) {
        if ("string" === typeof d)
            fu(a, b, c, {
                method: d
            });
        else {
            var e = d || {};
            void 0 === e.method && (e.method = Fl);
            void 0 === e.Hb && (e.Hb = !0);
            void 0 === e.lb && (e.lb = !1);
            (d = El(e.method)) || (iu = {});
            b = b || {};
            e.lb = e.lb && d;
            if (e.lb) {
                var f = du(b);
                var g = a.toLowerCase().replace(/\//, "_");
                var h = iu[g] || (iu[g] = {});
                if (f in h) {
                    var l = ko(h[f]);
                    c(l, null);
                    return
                }
            }
            if (d)
                a = ju(a, b);
            else {
                if (!Dk.isEnabled()) {
                    Xi("Cookies are disabled, writing anything to a server is not allowed.");
                    c && c(null, [new au("Cookies are disabled, writing anything to a server is not allowed.")]);
                    return
                }
                b = Mc(b);
                b.tok = A.tsEnv.tok;
                l = Tk(b);
                a = ju(a)
            }
            tj(a, function() {
                var m = null
                  , n = null
                  , q = !0;
                try {
                    if (0 >= Cj(this))
                        n = [cu];
                    else {
                        var p = Ej(this);
                        if ((m = ko(p)) && "object" === typeof m && !Array.isArray(m)) {
                            if (!Dj(this)) {
                                var u = [], x;
                                if (x = m.errors)
                                    for (var B = 0; B < x.length; B++)
                                        u.push(new au(x[B].message,x[B].code));
                                n = u
                            }
                        } else
                            n = []
                    }
                } catch (ia) {
                    n = []
                }
                n && !n.length && (n[0] = bu);
                if (n)
                    ku(n, e.bi, e.Hb);
                else {
                    if (v(p, "includes").call(p, "_hm"))
                        try {
                            var E = A.JSON.parse(p)
                              , I = E._hm;
                            if (I) {
                                I = jo(I);
                                for (var G = y(I), P = G.next(); !P.done; P = G.next()) {
                                    var S = P.value;
                                    Wt(Ut(), S.title, S.type)
                                }
                                delete E._hm;
                                p = A.JSON.stringify(E);
                                delete m._hm
                            }
                        } catch (ia) {
                            q = !1,
                            W(ia)
                        }
                    e.lb && q && (h[f] = p)
                }
                c && c.bind(this, n ? null : m, n)()
            }, e.method, l, {
                "X-Jp-Hm": "1"
            })
        }
    }
    function lu(a) {
        for (var b = 0; b < a.length; b++)
            if (10002 === a[b].h)
                return !0;
        return !1
    }
    function mu(a) {
        for (var b = "", c = 0, d = a.length; c < d; c++)
            1 < d && (b += "* "),
            b += a[c].g;
        return b
    }
    function ku(a, b, c) {
        Ra(a, function(d) {
            try {
                console.error(d.g)
            } catch (e) {}
            Xi(d.g)
        });
        c && (b instanceof ro ? (a = lu(a) ? Ys() : K("DIV", {
            style: "width:12em"
        }, mu(a)),
        Hq(b.s, a)) : Wt(Ut(), mu(a), 1))
    }
    function ju(a, b) {
        a = a.toLowerCase().split("/");
        return Xs("api" + a[0], a[1], b).toString()
    }
    var iu = {};
    function nu(a, b) {
        a = a.slice(0);
        b && a.push("ts-list");
        return a
    }
    ;var ou = {
        bd: "mousedown",
        cd: "mouseup",
        Ld: "mousecancel",
        lk: "mousemove",
        nk: "mouseover",
        mk: "mouseout",
        jk: "mouseenter",
        kk: "mouseleave"
    };
    function pu(a, b) {
        if (!a)
            throw Error("Invalid class name " + a);
        if ("function" !== typeof b)
            throw Error("Invalid decorator function " + b);
        qu[a] = b
    }
    var ru = {}
      , qu = {};
    function su(a) {
        this.l = a
    }
    Aa(su);
    function tu(a, b) {
        a && (a.tabIndex = b ? 0 : -1)
    }
    function uu(a, b, c) {
        c.id && Uj(b, c.id);
        var d = a.g()
          , e = !1
          , f = qe(c);
        f && Array.prototype.forEach.call(f, function(g) {
            g == d ? e = !0 : g && this.j(b, g, d)
        }, a);
        e || O(c, d);
        vu(b, c);
        return c
    }
    su.prototype.j = function(a, b, c) {
        b == c + "-disabled" ? a.qa(!1) : b == c + "-horizontal" ? wu(a, xu) : b == c + "-vertical" && wu(a, yu)
    }
    ;
    function vu(a, b) {
        if (b)
            for (var c = b.firstChild, d; c && c.parentNode == b; ) {
                d = c.nextSibling;
                if (1 == c.nodeType) {
                    a: {
                        var e = qe(c);
                        for (var f = 0, g = e.length; f < g; f++) {
                            var h = e[f];
                            if (h = h in qu ? qu[h]() : null) {
                                e = h;
                                break a
                            }
                        }
                        e = null
                    }
                    e && (e.s = c,
                    a.isEnabled() || e.qa(!1),
                    a.H(e),
                    e.ya(c))
                } else
                    c.nodeValue && "" != gb(c.nodeValue) || b.removeChild(c);
                c = d
            }
    }
    function zu(a, b) {
        b = b.o();
        Wf(b, !0, Ib);
        H && (b.hideFocus = !0);
        (a = a.l) && Lk(b, a)
    }
    su.prototype.g = function() {
        return "goog-container"
    }
    ;
    su.prototype.i = function(a) {
        var b = this.g()
          , c = [b, a.ic == xu ? b + "-horizontal" : b + "-vertical"];
        a.isEnabled() || c.push(b + "-disabled");
        return c
    }
    ;
    function Au() {}
    var Bu;
    Aa(Au);
    var Cu = {
        button: "pressed",
        checkbox: "checked",
        menuitem: "selected",
        menuitemcheckbox: "checked",
        menuitemradio: "checked",
        radio: "checked",
        tab: "selected",
        treeitem: "selected"
    };
    k = Au.prototype;
    k.hf = function() {}
    ;
    k.me = function(a) {
        return a.g.Ca("DIV", Du(this, a).join(" "), a.zf())
    }
    ;
    k.Og = function() {
        return !0
    }
    ;
    k.Hd = function(a, b) {
        b.id && Uj(a, b.id);
        b && b.firstChild ? Eu(a, b.firstChild.nextSibling ? Ya(b.childNodes) : b.firstChild) : a.bb = null;
        var c = 0
          , d = this.hc()
          , e = this.hc()
          , f = !1
          , g = !1
          , h = Ya(qe(b));
        h.forEach(function(l) {
            f || l != d ? g || l != e ? c |= Fu(this, l) : g = !0 : (f = !0,
            e == d && (g = !0));
            1 == Fu(this, l) && Zd(b) && $d(b) && Yd(b, !1)
        }, this);
        a.Da = c;
        f || (h.push(d),
        e == d && (g = !0));
        g || h.push(e);
        (a = a.vf) && h.push.apply(h, a);
        f && g && !a || re(b, h.join(" "));
        return b
    }
    ;
    function Gu(a, b, c) {
        if (a = c || a.hf())
            c = b.getAttribute("role") || null,
            a != c && Lk(b, a)
    }
    k.Rg = function(a, b) {
        var c = this.hc() + "-rtl";
        (a = a.o ? a.o() : a) && (b ? te : ve)(a, [c])
    }
    ;
    k.Pg = function(a) {
        var b;
        return a.Xa & 32 && (b = a.o()) ? Zd(b) && $d(b) : !1
    }
    ;
    k.Id = function(a, b) {
        var c;
        if (a.Xa & 32 && (c = a.o())) {
            if (!b && a.Da & 32) {
                try {
                    c.blur()
                } catch (d) {}
                a.Da & 32 && a.Sg(null)
            }
            (Zd(c) && $d(c)) != b && Yd(c, b)
        }
    }
    ;
    k.L = function(a, b) {
        T(a, b);
        a && Mk(a, "hidden", !b)
    }
    ;
    k.jf = function(a, b, c) {
        var d = a.o();
        if (d) {
            var e = Hu(this, b);
            e && (a = a.o ? a.o() : a) && (c ? te : ve)(a, [e]);
            this.Ed(d, b, c)
        }
    }
    ;
    k.Ed = function(a, b, c) {
        Bu || (Bu = {
            1: "disabled",
            8: "selected",
            16: "checked",
            64: "expanded"
        });
        b = Bu[b];
        var d = a.getAttribute("role") || null;
        d && (d = Cu[d] || b,
        b = "checked" == b || "selected" == b ? d : b);
        b && Mk(a, b, c)
    }
    ;
    k.Qg = function(a, b) {
        if (a && (Od(a),
        b))
            if ("string" === typeof b)
                Vd(a, b);
            else {
                var c = function(d) {
                    if (d) {
                        var e = td(a);
                        a.appendChild("string" === typeof d ? e.createTextNode(d) : d)
                    }
                };
                Array.isArray(b) ? b.forEach(c) : !Ca(b) || "nodeType"in b ? c(b) : Ya(b).forEach(c)
            }
    }
    ;
    k.hc = function() {
        return "goog-control"
    }
    ;
    function Du(a, b) {
        var c = a.hc()
          , d = [c]
          , e = a.hc();
        e != c && d.push(e);
        c = b.Da;
        for (e = []; c; ) {
            var f = c & -c;
            e.push(Hu(a, f));
            c &= ~f
        }
        d.push.apply(d, e);
        (a = b.vf) && d.push.apply(d, a);
        return d
    }
    function Hu(a, b) {
        a.g || Iu(a);
        return a.g[b]
    }
    function Fu(a, b) {
        a.h || (a.g || Iu(a),
        a.h = Nc(a.g));
        a = parseInt(a.h[b], 10);
        return isNaN(a) ? 0 : a
    }
    function Iu(a) {
        var b = a.hc();
        a.g = {
            1: b + "-disabled",
            2: b + "-hover",
            4: b + "-active",
            8: b + "-selected",
            16: b + "-checked",
            32: b + "-focused",
            64: b + "-open"
        }
    }
    ;function Ju(a, b, c) {
        X.call(this, c);
        if (!b) {
            for (b = this.constructor; b; ) {
                var d = Ea(b);
                if (d = ru[d])
                    break;
                b = (b = Object.getPrototypeOf(b.prototype)) && b.constructor
            }
            b = d ? "function" === typeof d.Ra ? d.Ra() : new d : null
        }
        this.j = b;
        this.bb = void 0 !== a ? a : null
    }
    D(Ju, X);
    k = Ju.prototype;
    k.bb = null;
    k.Da = 0;
    k.Xa = 39;
    k.Md = 255;
    k.Vc = 0;
    k.Rb = !0;
    k.vf = null;
    k.Gf = !0;
    k.qe = !1;
    k.Zf = null;
    function Ku(a, b) {
        a.aa && b != a.Gf && a.Nd(b);
        a.Gf = b
    }
    k.J = function() {
        var a = this.j.me(this);
        this.s = a;
        Gu(this.j, a, this.Sd());
        this.qe || Wf(a, !0, !H);
        this.isVisible() || this.j.L(a, !1)
    }
    ;
    k.Sd = function() {
        return this.Zf
    }
    ;
    k.Oa = function() {
        return this.o()
    }
    ;
    k.Yc = function(a) {
        return this.j.Og(a)
    }
    ;
    k.Ha = function(a) {
        this.s = a = this.j.Hd(this, a);
        Gu(this.j, a, this.Sd());
        this.qe || Wf(a, !0, !H);
        this.Rb = "none" != a.style.display
    }
    ;
    k.O = function() {
        Ju.M.O.call(this);
        var a = this.j
          , b = this.s;
        this.isVisible() || Mk(b, "hidden", !this.isVisible());
        this.isEnabled() || a.Ed(b, 1, !this.isEnabled());
        this.Xa & 8 && a.Ed(b, 8, !!(this.Da & 8));
        this.Xa & 16 && a.Ed(b, 16, !!(this.Da & 16));
        this.Xa & 64 && a.Ed(b, 64, !!(this.Da & 64));
        a = this.j;
        ak(this) && a.Rg(this.o(), !0);
        this.isEnabled() && a.Id(this, this.isVisible());
        this.Xa & -2 && (this.Gf && this.Nd(!0),
        this.Xa & 32 && (a = this.o())) && (b = this.u || (this.u = new sf),
        tf(b, a),
        this.ka().C(b, pf, this.Jd).C(a, "focus", this.pi).C(a, "blur", this.Sg))
    }
    ;
    k.Nd = function(a) {
        var b = this.ka()
          , c = this.o();
        a ? (b.C(c, ou.bd, this.ne).C(c, [ou.cd, ou.Ld], this.De).C(c, "mouseover", this.If).C(c, "mouseout", this.Hf),
        this.Ud != ec && b.C(c, "contextmenu", this.Ud),
        H && !this.Zd && (this.Zd = new Lu(this),
        N(this, this.Zd))) : (b.ma(c, ou.bd, this.ne).ma(c, [ou.cd, ou.Ld], this.De).ma(c, "mouseover", this.If).ma(c, "mouseout", this.Hf),
        this.Ud != ec && b.ma(c, "contextmenu", this.Ud),
        H && (je(this.Zd),
        this.Zd = null))
    }
    ;
    k.fa = function() {
        Ju.M.fa.call(this);
        this.u && xf(this.u);
        this.isVisible() && this.isEnabled() && this.j.Id(this, !1)
    }
    ;
    k.D = function() {
        Ju.M.D.call(this);
        this.u && (this.u.G(),
        delete this.u);
        delete this.j;
        this.Zd = this.vf = this.bb = null
    }
    ;
    k.zf = function() {
        return this.bb
    }
    ;
    k.oe = function(a) {
        this.j.Qg(this.o(), a);
        this.bb = a
    }
    ;
    function Eu(a, b) {
        a.bb = b
    }
    k.isVisible = function() {
        return this.Rb
    }
    ;
    k.L = function(a, b) {
        if (b || this.Rb != a && this.dispatchEvent(a ? "show" : "hide"))
            (b = this.o()) && this.j.L(b, a),
            this.isEnabled() && this.j.Id(this, a),
            this.Rb = a
    }
    ;
    k.isEnabled = function() {
        return !(this.Da & 1)
    }
    ;
    k.qa = function(a) {
        var b = this.getParent();
        b && "function" == typeof b.isEnabled && !b.isEnabled() || !Mu(this, 1, !a) || (a || (Nu(this, !1),
        Ou(this, !1)),
        this.isVisible() && this.j.Id(this, a),
        Pu(this, 1, !a, !0))
    }
    ;
    function Ou(a, b) {
        Mu(a, 2, b) && Pu(a, 2, b)
    }
    k.isActive = function() {
        return !!(this.Da & 4)
    }
    ;
    function Nu(a, b) {
        Mu(a, 4, b) && Pu(a, 4, b)
    }
    function Qu(a, b) {
        Mu(a, 8, b) && Pu(a, 8, b)
    }
    function Ru(a, b) {
        Mu(a, 32, b) && Pu(a, 32, b)
    }
    function Su(a, b) {
        Mu(a, 64, b) && Pu(a, 64, b)
    }
    function Pu(a, b, c, d) {
        d || 1 != b ? a.Xa & b && c != !!(a.Da & b) && (a.j.jf(a, b, c),
        a.Da = c ? a.Da | b : a.Da & ~b) : a.qa(!c)
    }
    function Tu(a, b, c) {
        if (a.aa && a.Da & b && !c)
            throw Error("Component already rendered");
        !c && a.Da & b && Pu(a, b, !1);
        a.Xa = c ? a.Xa | b : a.Xa & ~b
    }
    function Uu(a, b) {
        return !!(a.Md & b) && !!(a.Xa & b)
    }
    function Mu(a, b, c) {
        return !!(a.Xa & b) && !!(a.Da & b) != c && (!(a.Vc & b) || a.dispatchEvent(Tj(b, c))) && !a.W()
    }
    k.If = function(a) {
        !Vu(a, this.o()) && this.dispatchEvent("enter") && this.isEnabled() && Uu(this, 2) && Ou(this, !0)
    }
    ;
    k.Hf = function(a) {
        !Vu(a, this.o()) && this.dispatchEvent("leave") && (Uu(this, 4) && Nu(this, !1),
        Uu(this, 2) && Ou(this, !1))
    }
    ;
    k.Ud = ec;
    function Vu(a, b) {
        return !!a.relatedTarget && Ud(b, a.relatedTarget)
    }
    k.ne = function(a) {
        this.isEnabled() && (Uu(this, 2) && Ou(this, !0),
        0 != a.ja.button || Kb && a.ctrlKey || (Uu(this, 4) && Nu(this, !0),
        this.j && this.j.Pg(this) && this.o().focus()));
        this.qe || 0 != a.ja.button || Kb && a.ctrlKey || a.preventDefault()
    }
    ;
    k.De = function(a) {
        this.isEnabled() && (Uu(this, 2) && Ou(this, !0),
        this.isActive() && Wu(this, a) && Uu(this, 4) && Nu(this, !1))
    }
    ;
    function Wu(a, b) {
        if (Uu(a, 16)) {
            var c = !(a.Da & 16);
            Mu(a, 16, c) && Pu(a, 16, c)
        }
        Uu(a, 8) && Qu(a, !0);
        Uu(a, 64) && Su(a, !(a.Da & 64));
        c = new He("action",a);
        b && (c.altKey = b.altKey,
        c.ctrlKey = b.ctrlKey,
        c.metaKey = b.metaKey,
        c.shiftKey = b.shiftKey,
        c.i = b.i);
        return a.dispatchEvent(c)
    }
    k.pi = function() {
        Uu(this, 32) && Ru(this, !0)
    }
    ;
    k.Sg = function() {
        Uu(this, 4) && Nu(this, !1);
        Uu(this, 32) && Ru(this, !1)
    }
    ;
    k.Jd = function(a) {
        return this.isVisible() && this.isEnabled() && 13 == a.keyCode && Wu(this, a) ? (a.preventDefault(),
        a.stopPropagation(),
        !0) : !1
    }
    ;
    if ("function" !== typeof Ju)
        throw Error("Invalid component class " + Ju);
    if ("function" !== typeof Au)
        throw Error("Invalid renderer class " + Au);
    var Xu = Ea(Ju);
    ru[Xu] = Au;
    pu("goog-control", function() {
        return new Ju(null)
    });
    function Lu(a) {
        M.call(this);
        this.h = a;
        this.g = !1;
        this.i = new U(this);
        N(this, this.i);
        a = this.h.s;
        this.i.C(a, ou.bd, this.l).C(a, ou.cd, this.m).C(a, "click", this.j)
    }
    D(Lu, M);
    var Yu = !H || Yb(9);
    Lu.prototype.l = function() {
        this.g = !1
    }
    ;
    Lu.prototype.m = function() {
        this.g = !0
    }
    ;
    function Zu(a, b) {
        if (!Yu)
            return a.button = 0,
            a.type = b,
            a;
        var c = document.createEvent("MouseEvents");
        c.initMouseEvent(b, a.bubbles, a.cancelable, a.view || null, a.detail, a.screenX, a.screenY, a.clientX, a.clientY, a.ctrlKey, a.altKey, a.shiftKey, a.metaKey, 0, a.relatedTarget || null);
        return c
    }
    Lu.prototype.j = function(a) {
        if (this.g)
            this.g = !1;
        else {
            var b = a.ja
              , c = b.button
              , d = b.type
              , e = Zu(b, "mousedown");
            this.h.ne(new Me(e,a.currentTarget));
            e = Zu(b, "mouseup");
            this.h.De(new Me(e,a.currentTarget));
            Yu || (b.button = c,
            b.type = d)
        }
    }
    ;
    Lu.prototype.D = function() {
        this.h = null;
        Lu.M.D.call(this)
    }
    ;
    function $u(a, b, c) {
        X.call(this, c);
        this.Kd = b || su.Ra();
        this.ic = a || yu
    }
    D($u, X);
    var xu = "horizontal"
      , yu = "vertical";
    k = $u.prototype;
    k.Pf = null;
    k.Dc = null;
    k.Kd = null;
    k.ic = null;
    k.Sb = !0;
    k.Cc = !0;
    k.od = !0;
    k.ta = -1;
    k.Ia = null;
    k.xd = !1;
    k.Ub = null;
    function av(a) {
        return a.Pf || a.o()
    }
    k.J = function() {
        this.s = this.g.Ca("DIV", this.Kd.i(this).join(" "))
    }
    ;
    k.Oa = function() {
        return this.o()
    }
    ;
    k.Yc = function(a) {
        return "DIV" == a.tagName
    }
    ;
    k.Ha = function(a) {
        this.s = uu(this.Kd, this, a);
        "none" == a.style.display && (this.Sb = !1)
    }
    ;
    k.O = function() {
        $u.M.O.call(this);
        Xj(this, function(b) {
            b.aa && bv(this, b)
        }, this);
        var a = this.o();
        zu(this.Kd, this);
        this.L(this.Sb, !0);
        this.ka().C(this, "enter", this.cj).C(this, "highlight", this.dj).C(this, "unhighlight", this.lj).C(this, "open", this.gj).C(this, "close", this.$i).C(a, ou.bd, this.ri).C(td(a), [ou.cd, ou.Ld], this.aj).C(a, [ou.bd, ou.cd, ou.Ld, "mouseover", "mouseout", "contextmenu"], this.Zi);
        this.od && cv(this, !0)
    }
    ;
    function cv(a, b) {
        var c = a.ka()
          , d = av(a);
        b ? c.C(d, "focus", a.kf).C(d, "blur", a.Tg).C(a.Dc || (a.Dc = new sf(av(a))), pf, a.Ug) : c.ma(d, "focus", a.kf).ma(d, "blur", a.Tg).ma(a.Dc || (a.Dc = new sf(av(a))), pf, a.Ug)
    }
    k.fa = function() {
        dv(this, -1);
        this.Ia && Su(this.Ia, !1);
        this.xd = !1;
        $u.M.fa.call(this)
    }
    ;
    k.D = function() {
        $u.M.D.call(this);
        this.Dc && (this.Dc.G(),
        this.Dc = null);
        this.Kd = this.Ia = this.Ub = this.Pf = null
    }
    ;
    k.cj = function() {
        return !0
    }
    ;
    k.dj = function(a) {
        var b = bk(this, a.target);
        if (-1 < b && b != this.ta) {
            var c = Zj(this, this.ta);
            c && Ou(c, !1);
            this.ta = b;
            c = Zj(this, this.ta);
            this.xd && Nu(c, !0);
            this.Ia && c != this.Ia && (c.Xa & 64 ? Su(c, !0) : Su(this.Ia, !1))
        }
        b = this.o();
        null != a.target.o() && Mk(b, "activedescendant", a.target.o().id)
    }
    ;
    k.lj = function(a) {
        a.target == Zj(this, this.ta) && (this.ta = -1);
        this.o().removeAttribute("aria-activedescendant")
    }
    ;
    k.gj = function(a) {
        (a = a.target) && a != this.Ia && a.getParent() == this && (this.Ia && Su(this.Ia, !1),
        this.Ia = a)
    }
    ;
    k.$i = function(a) {
        a.target == this.Ia && (this.Ia = null);
        var b = this.o()
          , c = a.target.o();
        b && a.target.Da & 2 && c && Nk(b, c)
    }
    ;
    k.ri = function(a) {
        this.Cc && (this.xd = !0);
        var b = av(this);
        b && Zd(b) && $d(b) ? b.focus() : a.preventDefault()
    }
    ;
    k.aj = function() {
        this.xd = !1
    }
    ;
    k.Zi = function(a) {
        a: {
            var b = a.target;
            if (this.Ub)
                for (var c = this.o(); b && b !== c; ) {
                    var d = b.id;
                    if (d in this.Ub) {
                        b = this.Ub[d];
                        break a
                    }
                    b = b.parentNode
                }
            b = null
        }
        if (b)
            switch (a.type) {
            case ou.bd:
                b.ne(a);
                break;
            case ou.cd:
            case ou.Ld:
                b.De(a);
                break;
            case "mouseover":
                b.If(a);
                break;
            case "mouseout":
                b.Hf(a);
                break;
            case "contextmenu":
                b.Ud(a)
            }
    }
    ;
    k.kf = function() {}
    ;
    k.Tg = function() {
        dv(this, -1);
        this.xd = !1;
        this.Ia && Su(this.Ia, !1)
    }
    ;
    k.Ug = function(a) {
        return this.isEnabled() && this.isVisible() && (0 != Yj(this) || this.Pf) && ev(this, a) ? (a.preventDefault(),
        a.stopPropagation(),
        !0) : !1
    }
    ;
    function ev(a, b) {
        var c = Zj(a, a.ta);
        if (c && "function" == typeof c.Jd && c.Jd(b) || a.Ia && a.Ia != c && "function" == typeof a.Ia.Jd && a.Ia.Jd(b))
            return !0;
        if (b.shiftKey || b.ctrlKey || b.metaKey || b.altKey)
            return !1;
        switch (b.keyCode) {
        case 27:
            if (a.od)
                av(a).blur();
            else
                return !1;
            break;
        case 36:
            fv(a);
            break;
        case 35:
            gv(a);
            break;
        case 38:
            if (a.ic == yu)
                hv(a);
            else
                return !1;
            break;
        case 37:
            if (a.ic == xu)
                ak(a) ? iv(a) : hv(a);
            else
                return !1;
            break;
        case 40:
            if (a.ic == yu)
                iv(a);
            else
                return !1;
            break;
        case 39:
            if (a.ic == xu)
                ak(a) ? hv(a) : iv(a);
            else
                return !1;
            break;
        default:
            return !1
        }
        return !0
    }
    function bv(a, b) {
        var c = b.o();
        c = c.id || (c.id = b.Jb());
        a.Ub || (a.Ub = {});
        a.Ub[c] = b
    }
    k.H = function(a, b) {
        $u.M.H.call(this, a, b)
    }
    ;
    k.Aa = function(a, b, c) {
        a.Vc |= 2;
        a.Vc |= 64;
        Tu(a, 32, !1);
        Ku(a, !1);
        var d = a.getParent() == this ? bk(this, a) : -1;
        $u.M.Aa.call(this, a, b, c);
        a.aa && this.aa && bv(this, a);
        a = d;
        -1 == a && (a = Yj(this));
        a == this.ta ? this.ta = Math.min(Yj(this) - 1, b) : a > this.ta && b <= this.ta ? this.ta++ : a < this.ta && b > this.ta && this.ta--
    }
    ;
    k.Ib = function(a, b) {
        if (a = "string" === typeof a ? Vj(this, a) : a) {
            var c = bk(this, a);
            -1 != c && (c == this.ta ? (Ou(a, !1),
            this.ta = -1) : c < this.ta && this.ta--);
            var d = a.o();
            d && d.id && this.Ub && (c = this.Ub,
            d = d.id,
            d in c && delete c[d])
        }
        a = $u.M.Ib.call(this, a, b);
        Ku(a, !0);
        return a
    }
    ;
    function wu(a, b) {
        if (a.o())
            throw Error("Component already rendered");
        a.ic = b
    }
    k.isVisible = function() {
        return this.Sb
    }
    ;
    k.L = function(a, b) {
        if (b || this.Sb != a && this.dispatchEvent(a ? "show" : "hide")) {
            this.Sb = a;
            var c = this.o();
            c && (T(c, a),
            this.od && tu(av(this), this.Cc && this.Sb),
            b || this.dispatchEvent(this.Sb ? "aftershow" : "afterhide"))
        }
    }
    ;
    k.isEnabled = function() {
        return this.Cc
    }
    ;
    k.qa = function(a) {
        this.Cc != a && this.dispatchEvent(a ? "enable" : "disable") && (a ? (this.Cc = !0,
        Xj(this, function(b) {
            b.ei ? delete b.ei : b.qa(!0)
        })) : (Xj(this, function(b) {
            b.isEnabled() ? b.qa(!1) : b.ei = !0
        }),
        this.xd = this.Cc = !1),
        this.od && tu(av(this), a && this.Sb))
    }
    ;
    function jv(a) {
        0 != a.od && a.aa && cv(a, !1);
        a.od = !1;
        a.Cc && a.Sb && tu(av(a), !1)
    }
    function dv(a, b) {
        (b = Zj(a, b)) ? Ou(b, !0) : -1 < a.ta && Ou(Zj(a, a.ta), !1)
    }
    function fv(a) {
        kv(a, function(b, c) {
            return (b + 1) % c
        }, Yj(a) - 1)
    }
    function gv(a) {
        kv(a, function(b, c) {
            b--;
            return 0 > b ? c - 1 : b
        }, 0)
    }
    function iv(a) {
        kv(a, function(b, c) {
            return (b + 1) % c
        }, a.ta)
    }
    function hv(a) {
        kv(a, function(b, c) {
            b--;
            return 0 > b ? c - 1 : b
        }, a.ta)
    }
    function kv(a, b, c) {
        c = 0 > c ? bk(a, a.Ia) : c;
        var d = Yj(a);
        c = b.call(a, c, d);
        for (var e = 0; e <= d; ) {
            var f = Zj(a, c), g;
            if (g = f)
                g = f.isVisible() && f.isEnabled() && !!(f.Xa & 2);
            if (g) {
                a.fg(c);
                break
            }
            e++;
            c = b.call(a, c, d)
        }
    }
    k.fg = function(a) {
        dv(this, a)
    }
    ;
    function lv() {}
    D(lv, Au);
    Aa(lv);
    k = lv.prototype;
    k.hc = function() {
        return "goog-tab"
    }
    ;
    k.hf = function() {
        return "tab"
    }
    ;
    k.me = function(a) {
        var b = lv.M.me.call(this, a);
        (a = a.Ef()) && this.ig(b, a);
        return b
    }
    ;
    k.Hd = function(a, b) {
        b = lv.M.Hd.call(this, a, b);
        var c = this.Ef(b);
        c && (a.ah = c);
        a.Da & 8 && (c = a.getParent()) && "function" === typeof c.yc && (Pu(a, 8, !1),
        c.yc(a));
        return b
    }
    ;
    k.Ef = function(a) {
        return a.title || ""
    }
    ;
    k.ig = function(a, b) {
        a && (a.title = b || "")
    }
    ;
    function mv(a, b, c) {
        Ju.call(this, a, b || lv.Ra(), c);
        Tu(this, 8, !0);
        this.Vc |= 9
    }
    D(mv, Ju);
    mv.prototype.Ef = function() {
        return this.ah
    }
    ;
    mv.prototype.ig = function(a) {
        this.j.ig(this.o(), a);
        this.ah = a
    }
    ;
    pu("goog-tab", function() {
        return new mv(null)
    });
    function nv() {
        this.l = "tablist"
    }
    D(nv, su);
    Aa(nv);
    nv.prototype.g = function() {
        return "goog-tab-bar"
    }
    ;
    nv.prototype.j = function(a, b, c) {
        this.m || (this.h || ov(this),
        this.m = Nc(this.h));
        var d = this.m[b];
        d ? a.X(d) : nv.M.j.call(this, a, b, c)
    }
    ;
    nv.prototype.i = function(a) {
        var b = nv.M.i.call(this, a);
        this.h || ov(this);
        b.push(this.h[a.Cb()]);
        return b
    }
    ;
    function ov(a) {
        var b = a.g();
        a.h = Qc(pv, b + "-top", qv, b + "-bottom", rv, b + "-start", sv, b + "-end")
    }
    ;function tv(a, b, c) {
        this.X(a || pv);
        $u.call(this, this.ic, b || nv.Ra(), c);
        uv(this)
    }
    D(tv, $u);
    var pv = "top"
      , qv = "bottom"
      , rv = "start"
      , sv = "end";
    k = tv.prototype;
    k.Fb = null;
    k.O = function() {
        tv.M.O.call(this);
        uv(this)
    }
    ;
    k.D = function() {
        tv.M.D.call(this);
        this.Fb = null
    }
    ;
    k.Ib = function(a, b) {
        vv(this, a);
        return tv.M.Ib.call(this, a, b)
    }
    ;
    k.Cb = function() {
        return this.h
    }
    ;
    k.X = function(a) {
        wu(this, a == rv || a == sv ? yu : xu);
        this.h = a
    }
    ;
    k.fg = function(a) {
        tv.M.fg.call(this, a);
        this.yc(Zj(this, a))
    }
    ;
    k.yc = function(a) {
        a ? Qu(a, !0) : this.Fb && Qu(this.Fb, !1)
    }
    ;
    function vv(a, b) {
        if (b && b == a.Fb) {
            for (var c = bk(a, b), d = c - 1; b = Zj(a, d); d--) {
                var e = b;
                if (e.isVisible() && e.isEnabled()) {
                    a.yc(b);
                    return
                }
            }
            for (c += 1; b = Zj(a, c); c++)
                if (d = b,
                d.isVisible() && d.isEnabled()) {
                    a.yc(b);
                    return
                }
            a.yc(null)
        }
    }
    k.jj = function(a) {
        this.Fb && this.Fb != a.target && Qu(this.Fb, !1);
        this.Fb = a.target
    }
    ;
    k.kj = function(a) {
        a.target == this.Fb && (this.Fb = null)
    }
    ;
    k.hj = function(a) {
        vv(this, a.target)
    }
    ;
    k.ij = function(a) {
        vv(this, a.target)
    }
    ;
    k.kf = function() {
        Zj(this, this.ta) || dv(this, bk(this, this.Fb || Zj(this, 0)))
    }
    ;
    function uv(a) {
        a.ka().C(a, "select", a.jj).C(a, "unselect", a.kj).C(a, "disable", a.hj).C(a, "hide", a.ij)
    }
    pu("goog-tab-bar", function() {
        return new tv
    });
    var wv = [["\ud83d\ude00", "grinning face"], ["\ud83d\ude01", "grinning face with smiling eyes"], ["\ud83d\ude02", "face with tears of joy"], ["\ud83d\ude03", "smiling face with open mouth"], ["\ud83d\ude04", "smiling face with open mouth and smiling eyes"], ["\ud83d\ude05", "smiling face with open mouth and cold sweat"], ["\ud83d\ude09", "winking face"], ["\ud83d\ude0a", "smiling face with smiling eyes"], ["\ud83d\ude0b", "face savouring delicious food"], ["\ud83d\ude0e", "smiling face with sunglasses"], ["\ud83d\ude0d", "smiling face with heart-shaped eyes"], ["\ud83d\ude18", "face throwing a kiss"], ["\ud83d\ude10", "neutral face"], ["\ud83d\ude11", "expressionless face"], ["\ud83d\ude0f", "smirking face"], ["\ud83d\ude25", "disappointed but relieved face"], ["\ud83d\ude2a", "sleepy face"], ["\ud83d\ude2b", "tired face"], ["\ud83d\ude34", "sleeping face"], ["\ud83d\ude0c", "relieved face"], ["\ud83d\ude1b", "face with stuck-out tongue"], ["\ud83d\ude1c", "face with stuck-out tongue and winking eye"], ["\ud83d\ude1d", "face with stuck-out tongue and tightly-closed eyes"], ["\ud83d\ude07", "smiling face with halo"], ["\ud83d\ude08", "smiling face with horns"], ["\ud83d\ude12", "unamused face"], ["\ud83d\ude14", "pensive face"], ["\ud83d\ude15", "confused face"], ["\ud83d\ude1e", "disappointed face"], ["\ud83d\ude24", "face with look of triumph"], ["\ud83d\ude22", "crying face"], ["\ud83d\ude2d", "loudly crying face"], ["\ud83d\ude29", "weary face"], ["\ud83d\ude31", "face screaming in fear"], ["\ud83d\ude33", "flushed face"], ["\ud83d\ude20", "angry face"], ["\ud83d\udc80", "skull"], ["\u2764", "red heart"], ["\ud83d\udc95", "two hearts"], ["\ud83d\udc97", "growing heart"], ["\ud83d\udc98", "heart with arrow"], ["\ud83d\udc94", "broken heart"], ["\ud83d\udc4c", "ok hand sign"], ["\ud83d\udc4d", "thumbs up sign"], ["\ud83d\udc4e", "thumbs down sign"], ["\u270c", "victory hand"], ["\ud83d\udc48", "left pointing backhand index"], ["\ud83d\udc49", "right pointing backhand index"], ["\ud83d\udc4f", "clapping hands sign"], ["\u270b", "raised hand"], ["\ud83d\udc4a", "fisted hand sign"], ["\ud83d\udcaa", "flexed biceps"], ["\ud83d\ude4f", "person with folded hands"], ["\ud83d\udc45", "tongue"], ["\ud83d\udc8b", "kiss mark"], ["\u267b", "recycling symbol"], ["\u2728", "sparkles"], ["\ud83d\udd25", "fire"], ["\ud83c\udf38", "cherry blossom"], ["\ud83c\udf39", "rose"], ["\ud83c\udf89", "party popper"], ["\u2600", "sun"], ["\ud83c\udfb5", "musical note"], ["\ud83c\udf69", "doughnut"], ["\ud83c\udf82", "birthday cake"], ["\ud83c\udf7e", "bottle with popping cork"], ["\ud83c\udf7a", "beer mug"], ["\ud83c\udf79", "tropical drink"], ["\ud83c\udf7f", "popcorn"], ["\ud83c\udf54", "hamburger"], ["\ud83c\udf55", "slice of pizza"], ["\ud83c\udf53", "strawberry"]];
    function xv() {}
    D(xv, Au);
    Aa(xv);
    k = xv.prototype;
    k.hf = function() {}
    ;
    k.Hd = function(a, b) {
        Ku(a, !1);
        a.Md &= -256;
        Tu(a, 32, !1);
        xv.M.Hd.call(this, a, b);
        a.oe(b.value);
        return b
    }
    ;
    k.me = function(a) {
        Ku(a, !1);
        a.Md &= -256;
        Tu(a, 32, !1);
        return a.g.Ca("TEXTAREA", {
            "class": Du(this, a).join(" "),
            disabled: !a.isEnabled()
        }, a.zf() || "")
    }
    ;
    k.Og = function(a) {
        return "TEXTAREA" == a.tagName
    }
    ;
    k.Rg = function() {}
    ;
    k.Pg = function(a) {
        return a.isEnabled()
    }
    ;
    k.Id = function() {}
    ;
    k.jf = function(a, b, c) {
        xv.M.jf.call(this, a, b, c);
        (a = a.o()) && 1 == b && (a.disabled = c)
    }
    ;
    k.Ed = function() {}
    ;
    k.Qg = function(a, b) {
        a && (a.value = b)
    }
    ;
    k.hc = function() {
        return "goog-textarea"
    }
    ;
    function yv(a, b, c) {
        Ju.call(this, a, b || xv.Ra(), c);
        Ku(this, !1);
        this.qe = !0;
        (b = this.o()) && Wf(b, !1, !H);
        this.rd = "" != a;
        a || (this.bb = "")
    }
    D(yv, Ju);
    var zv = !(H && !Yb(11));
    k = yv.prototype;
    k.td = !1;
    k.Fe = !1;
    k.rd = !1;
    k.Na = 0;
    k.Uf = 0;
    k.wh = !1;
    k.Pe = !1;
    k.eg = !1;
    k.dg = !1;
    k.Rc = "";
    function Av(a, b) {
        a.Rc = b;
        a.o() && Bv(a)
    }
    function Cv(a) {
        return a.rb.top + a.rb.bottom + a.tg.top + a.tg.bottom
    }
    function Dv(a) {
        var b = a.Uf
          , c = a.o();
        b && c && a.Pe && (b -= Cv(a));
        return b
    }
    k.ec = function(a) {
        this.oe(String(a))
    }
    ;
    k.nb = function() {
        return this.o().value != this.Rc || Ev(this) || this.rd ? this.o().value : ""
    }
    ;
    k.oe = function(a) {
        yv.M.oe.call(this, a);
        this.rd = "" != a;
        this.o() && this.gd()
    }
    ;
    k.qa = function(a) {
        yv.M.qa.call(this, a);
        this.o().disabled = !a
    }
    ;
    function Ev(a) {
        return "placeholder"in a.o()
    }
    function Bv(a) {
        a.Rc && (Ev(a) ? a.o().placeholder = a.Rc : !a.o() || a.rd || a.Fe || (O(a.o(), Fv),
        a.o().value = a.Rc))
    }
    k.O = function() {
        yv.M.O.call(this);
        var a = this.o();
        R(a, {
            overflowY: "hidden",
            overflowX: "auto",
            boxSizing: "border-box",
            MsBoxSizing: "border-box",
            WebkitBoxSizing: "border-box",
            MozBoxSizing: "border-box"
        });
        this.rb = Zf(a);
        this.tg = cg(a);
        this.ka().C(a, "scroll", this.gd).C(a, "focus", this.gd).C(a, "keyup", this.gd).C(a, "mouseup", this.Ti).C(a, "blur", this.wi);
        Bv(this);
        this.o() && this.gd()
    }
    ;
    function Gv(a) {
        if (!a.wh) {
            var b = a.o().cloneNode(!1);
            R(b, {
                position: "absolute",
                height: "auto",
                top: "-9999px",
                margin: "0",
                padding: "1px",
                border: "1px solid #000",
                overflow: "hidden"
            });
            a.g.g.body.appendChild(b);
            var c = b.scrollHeight;
            b.style.padding = "10px";
            var d = b.scrollHeight;
            a.eg = d > c;
            b.style.borderWidth = "10px";
            a.dg = b.scrollHeight > d;
            b.style.height = "100px";
            100 != b.offsetHeight && (a.Pe = !0);
            Qd(b);
            a.wh = !0
        }
        b = a.o();
        isNaN(a.rb.top) && (a.rb = Zf(b),
        a.tg = cg(b));
        c = a.o().scrollHeight;
        var e = a.o();
        d = e.offsetHeight - e.clientHeight;
        if (!a.eg) {
            var f = a.rb;
            d -= f.top + f.bottom
        }
        a.dg || (e = cg(e),
        d -= e.top + e.bottom);
        c += 0 < d ? d : 0;
        a.Pe ? c -= Cv(a) : (a.eg || (d = a.rb,
        c += d.top + d.bottom),
        a.dg || (a = cg(b),
        c += a.top + a.bottom));
        return c
    }
    function Hv(a, b) {
        a.Na != b && (a.Na = b,
        a.o().style.height = b + "px")
    }
    function Iv(a) {
        var b = a.o();
        b.style.height = "auto";
        var c = b.value.match(/\n/g) || [];
        b.rows = c.length + 1;
        a.Na = 0
    }
    var Fv = "textarea-placeholder-input";
    yv.prototype.wi = function() {
        Ev(this) || (this.Fe = !1,
        "" == this.o().value && (this.rd = !1,
        Bv(this)))
    }
    ;
    yv.prototype.gd = function(a) {
        if (!this.td) {
            var b = this.o();
            !Ev(this) && a && "focus" == a.type && (b.value == this.Rc && this.Rc && !this.Fe && (ue(b, Fv),
            b.value = ""),
            this.Fe = !0,
            this.rd = "" != b.value);
            var c = !1;
            this.td = !0;
            a = this.Na;
            if (b.scrollHeight) {
                var d = !1
                  , e = !1
                  , f = Gv(this)
                  , g = b.offsetHeight
                  , h = Dv(this);
                var l = 0;
                var m = this.o();
                l && m && this.Pe && (l -= Cv(this));
                h && f < h ? (Hv(this, h),
                d = !0) : l && f > l ? (Hv(this, l),
                b.style.overflowY = "",
                e = !0) : g != f ? Hv(this, f) : this.Na || (this.Na = f);
                d || e || !zv || (c = !0)
            } else
                Iv(this);
            this.td = !1;
            c && (b = this.o(),
            this.td || (this.td = !0,
            (e = b.scrollHeight) ? (f = Gv(this),
            c = Dv(this),
            c && f <= c || (d = this.rb,
            b.style.paddingTop = d.top + 1 + "px",
            Gv(this) == f && (b.style.paddingTop = d.top + e + "px",
            b.scrollTop = 0,
            e = Gv(this) - e,
            e >= c ? Hv(this, e) : Hv(this, c)),
            b.style.paddingTop = d.top + "px")) : Iv(this),
            this.td = !1));
            a != this.Na && this.dispatchEvent("resize")
        }
    }
    ;
    yv.prototype.Ti = function() {
        var a = this.o()
          , b = a.offsetHeight;
        a.filters && a.filters.length && (a = a.filters.item("DXImageTransform.Microsoft.DropShadow")) && (b -= a.offX);
        b != this.Na && (this.Na = this.Uf = b)
    }
    ;
    function Jv(a) {
        var b = Kv(a).ud();
        Y.call(this, null, ["ts-msgs-item", b ? "ts-user-a" : "ts-user-b"]);
        this.h = a;
        this.H(new Y(null,"ts-msgs-fb",b ? null : Kv(a).Ba(),new Y(null,{
            style: "width:.6em",
            "class": "ts-flx00a"
        }),this.j = new Y(null,"ts-body-text")))
    }
    var Lv;
    z(Jv, Y);
    Jv.prototype.i = function(a) {
        return jl(a)
    }
    ;
    Jv.prototype.J = function() {
        Y.prototype.J.call(this);
        var a = this.j.o()
          , b = this.h.j
          , c = this.i(b);
        if (void 0 === Lv)
            try {
                Lv = RegExp("^(?:\\p{Emoji}\ufe0f|\\p{Emoji_Presentation}){1,5}$", "u")
            } catch (d) {
                Lv = null
            }
        Lv && Lv.test(b) && (c = K("DIV", "ts-short-emoji", c));
        a.appendChild(c);
        a = this.o();
        b = Ri(this.h.g, ["minorinf", "ts-end-zero"]);
        a.appendChild(b)
    }
    ;
    function Mv(a, b) {
        Y.call(this);
        this.m = a;
        this.v = b;
        var c = this;
        this.j = new Nv(function(d) {
            return hu("messages/send", {
                uname: ut(c.m),
                message: d
            }, "POST").then(function() {
                c.v && c.h && c.h.stop();
                (r = c.update().then(function() {
                    c.dispatchEvent(Ov)
                }),
                v(r, "finally")).call(r, function() {
                    c.v && Pv(c, !0)
                })
            })
        }
        ,this.Kf());
        this.H(this.j);
        this.K = new Y;
        this.H(this.K);
        this.H(this.i = new Y(null,{
            style: "margin-top:1em"
        }))
    }
    z(Mv, Y);
    function Pv(a, b) {
        a.h && a.h.G();
        a.h = new Ei(a.update,a,b ? Qv : Rv);
        a.h.start()
    }
    k = Mv.prototype;
    k.lh = function(a) {
        return new Jv(a)
    }
    ;
    k.D = function() {
        this.h && this.h.G();
        this.i = null;
        Y.prototype.D.call(this)
    }
    ;
    k.Kf = function() {
        return !0
    }
    ;
    k.O = function() {
        Y.prototype.O.call(this);
        var a = this;
        (r = this.update().then(function() {
            Sv(a.j)
        }),
        v(r, "finally")).call(r, function() {
            a.v && Pv(a)
        })
    }
    ;
    k.fa = function() {
        Y.prototype.fa.call(this);
        this.h && this.h.stop()
    }
    ;
    function Tv(a, b) {
        a = a.K.Oa();
        Od(a);
        b && (b = K("P", "errorColor", "Cannot connect to a server, maybe a temporary connection issue..."),
        R(b, "text-align", "center"),
        Nd(a, b))
    }
    k.update = function() {
        if (!this.u) {
            var a = this;
            this.u = (r = Uv(this, this.N).then(function(b) {
                if (!a.W()) {
                    b.l && (a.j.qa(!1),
                    Av(a.j.h, b.j));
                    Vv(a.j, b.i);
                    var c = b.g;
                    if (c && (a.N = b.h,
                    b = ck(a.i, a.i.aa),
                    Ra(b, function(l) {
                        l.G()
                    }),
                    b = c.length)) {
                        var d = 1
                          , e = (d - .1) / (b - 16 - 1);
                        a.F = c[0];
                        for (var f = 0; f < b; f++) {
                            var g = a.lh(c[f])
                              , h = void 0;
                            16 < f ? (d -= e,
                            h = {
                                style: "opacity:" + d
                            }) : h = void 0;
                            a.i.H(new Y(null,h,g), a.i.aa)
                        }
                    }
                    Tv(a, !1);
                    a.dispatchEvent(Wv)
                }
            }).catch(function() {
                a.W() || Tv(a, !0)
            }),
            v(r, "finally")).call(r, function() {
                qo(a.i.o());
                a.u = void 0
            })
        }
        return this.u
    }
    ;
    var Ov = "h"
      , Wv = "i"
      , Rv = {
        he: 3E4,
        pg: 150
    }
      , Qv = {
        he: 5E3,
        pj: 1.5,
        qj: Rv.he,
        pg: Rv.pg
    };
    function Nv(a, b) {
        function c(d) {
            yv.call(this, d)
        }
        Y.call(this, "FORM");
        this.v = a;
        z(c, yv);
        c.prototype.Ai = function(d) {
            return 32 >= d ? 150 : 64 <= d ? 100 : -50 * (d - 32) / 32 + 150
        }
        ;
        c.prototype.J = function() {
            yv.prototype.J.call(this);
            this.ka().C(this.o(), "input", this.ug);
            this.ug()
        }
        ;
        c.prototype.ug = function() {
            var d = this.o();
            if (d) {
                var e = jd(this.nb());
                e = this.Ai(e.length);
                if (void 0 === this.Ag || this.Ag > e)
                    R(d, "font-size", e + "%"),
                    this.Ag = e
            }
        }
        ;
        c.prototype.O = function() {
            yv.prototype.O.call(this);
            var d = this.s
              , e = Dh(Cf(d, "line-height"));
            if (e) {
                var f = Zf(d);
                d = cg(d);
                this.Uf = d.top + f.top + e + f.bottom + d.top;
                this.o() && this.gd()
            }
        }
        ;
        c.prototype.ec = function(d) {
            yv.prototype.ec.call(this, d);
            this.ug()
        }
        ;
        this.h = new c("");
        Av(this.h, V("Write a message..."));
        this.u = new Y("BUTTON",{
            type: "submit",
            disabled: !0,
            style: "align-self:center;text-overflow:clip",
            title: V("Send"),
            "class": "btn"
        },cm("paper-plane-top", null, {
            style: "font-size:150%"
        }));
        this.H(tl(this.F = new Y(null,{
            style: "position:relative;align-self:center",
            "class": "ts-flx11a"
        },this.h), new Y(null,{
            style: "padding-left:1em"
        }), this.u));
        b && (this.m = new Y(null,{
            style: "margin-top:.6em;display:none"
        }),
        this.H(this.m))
    }
    z(Nv, Y);
    k = Nv.prototype;
    k.J = function() {
        Y.prototype.J.call(this);
        var a = this.h.o();
        this.m && (O(a, "ts-emoji-allwd"),
        this.j = dm("smile", "regular", {
            "class": "ts-emoji-btn unselectable ts-end-zero ts-text-align-end",
            title: V("Choose an emoji")
        }),
        this.F.o().appendChild(this.j));
        Bd(a, {
            spellcheck: "true"
        });
        R(a, {
            display: "block",
            resize: "none"
        })
    }
    ;
    k.O = function() {
        Y.prototype.O.call(this);
        this.i || (this.i = new U(this),
        N(this, this.i));
        this.j && this.i.C(this.j, "click", function() {
            if (this.h.isEnabled()) {
                var b = this.m.s
                  , c = this.h.o();
                ll(b).length || Md(b, Xv(this.i, function(d) {
                    c.focus();
                    var e = c.scrollTop
                      , f = c.selectionStart;
                    c.value = c.value.substring(0, f) + d + c.value.substring(f, c.value.length);
                    f += d.length;
                    c.selectionStart = f;
                    c.selectionEnd = f;
                    c.scrollTop = e;
                    this.Yf()
                }
                .bind(this)));
                T(b, "none" == b.style.display);
                qo(c);
                c.focus()
            }
        });
        this.i.C(this.h.o(), "input", this.Yf);
        var a;
        this.i.C(this.o(), "submit", function(b) {
            if (!a) {
                var c = jd(this.h.nb());
                if (c) {
                    var d = this
                      , e = function(f) {
                        im(d.u.o(), f);
                        d.h.qa(!f)
                    };
                    e(a = !0);
                    (r = this.v(c).then(function() {
                        d.h.ec("")
                    }, function() {}),
                    v(r, "finally")).call(r, function() {
                        e(a = !1);
                        Sv(d);
                        d.Yf()
                    })
                } else
                    Sv(this)
            }
            b.preventDefault()
        })
    }
    ;
    k.fa = function() {
        Y.prototype.fa.call(this);
        gi(this.i)
    }
    ;
    k.qa = function(a) {
        this.h.qa(a)
    }
    ;
    function Vv(a, b) {
        Bd(a.h.o(), {
            maxlength: b
        })
    }
    k.Yf = function() {
        var a = jd(this.h.nb());
        im(this.u.o(), !a)
    }
    ;
    function Xv(a, b) {
        var c = K("DIV", "unselectable");
        R(c, {
            "font-size": "1.5em",
            height: "5.125em",
            "line-height": 1.25,
            overflow: "auto"
        });
        for (var d = 0; d < wv.length; d++) {
            var e = wv[d][1]
              , f = wv[d][0];
            f += "\ufe0f";
            Nd(c, K("DIV", {
                "class": "ts-emoji",
                style: "display:inline-block;cursor:pointer;text-align:center;width:1.5em",
                title: e
            }, f))
        }
        a.C(c, "click", function(g) {
            se(g.target, "ts-emoji") && b(ae(g.target))
        });
        return c
    }
    function Sv(a) {
        Ru(a.h, !0);
        a.h.o().focus()
    }
    k.D = function() {
        this.j = void 0;
        Y.prototype.D.call(this)
    }
    ;
    function Yv(a, b, c, d) {
        mv.call(this, "");
        this.h = a;
        this.K = b;
        this.N = c;
        this.T = d;
        this.m = a.i
    }
    z(Yv, mv);
    function Zv(a, b) {
        a.m = !1;
        if (a.i) {
            var c = a.i;
            Bi(function() {
                Qd(c);
                b(this)
            }, 2E3, a);
            a.i = void 0
        }
    }
    Yv.prototype.J = function() {
        mv.prototype.J.call(this);
        var a, b = K("DIV", "ts-msgs-prvw", a = K("DIV", "ts-flx00a"), K("DIV", {
            style: "overflow:hidden;text-overflow:ellipsis",
            "class": "ts-flx11a"
        }, K("SPAN", null, this.K(this.h.g.j, this))), K("DIV", {
            style: "width:.4em",
            "class": "ts-flx00a"
        }), K("DIV", {
            style: "text-align:right",
            "class": "minorinf ts-flx00a"
        }, Ri(this.h.g.g)));
        if (Kv(this.h.g).ud()) {
            var c = cm("reply", null, {
                title: "My reply"
            });
            R(c, "opacity", .5);
            Nd(a, c, "\u00a0")
        }
        c = K("DIV", ["ts-msgs-title", "ts-hover-parent"], this.F = K("DIV", "ts-flx00a"), K("DIV", {
            style: "width:.6em",
            "class": "ts-flx00a"
        }), K("DIV", {
            style: "overflow:hidden;max-width:100%",
            "class": "ts-flx11a"
        }, K("DIV", "ts-flxdspl", K("DIV", {
            style: "font-weight:bold;text-overflow:ellipsis;overflow:hidden",
            "class": "ts-flx11a ts-msgs-uname"
        }, ut(this.h.h)), K("DIV", {
            "class": "ts-flx00a"
        }, a = dm("ellipsis-h", "regular", {
            "class": "ts-trigger"
        }))), b));
        this.h.i && (this.i = K("DIV", {
            style: "position:absolute;right:.3em;top:.3em;font-size:.6em",
            "class": "ts-new-label"
        }, V("New")),
        c.appendChild(this.i));
        var d = this;
        b = new gq(function() {
            var e = new os;
            var f = new uq(V("Delete"),null,null,function() {
                d.N(d.h.g.h).then(function() {
                    wl()
                })
            }
            );
            f.i = V("Are you sure you want to delete the conversation history?");
            e.H(f);
            f = new uq(V("Block"),null,null,function() {
                d.T(d.h.h).then(function() {
                    wl()
                })
            }
            );
            vq(f, yi(V("Are you sure you want to block messages from %s?"), ut(d.h.h)));
            e.H(f);
            return Tg(e)
        }
        );
        b.ya(a);
        N(this, b);
        Md(this.Oa(), c)
    }
    ;
    Yv.prototype.O = function() {
        mv.prototype.O.call(this);
        this.v = this.h.h.Ba();
        this.v.La(this.F)
    }
    ;
    Yv.prototype.D = function() {
        this.v.G();
        this.v = this.F = this.i = void 0;
        mv.prototype.D.call(this)
    }
    ;
    function $v(a) {
        Y.call(this);
        this.K = new pl;
        this.H(this.K);
        this.F = new Y(null,"ts-msgs-cont");
        this.H(this.F);
        this.ga = a || function(b) {
            return jl(b)
        }
        ;
        this.i = new tv(rv);
        jv(this.i);
        this.F.H(this.i);
        this.ka().C(this, Wv, this.zj)
    }
    z($v, Y);
    k = $v.prototype;
    k.O = function() {
        Y.prototype.O.call(this);
        (r = this.update(),
        v(r, "finally")).call(r, this.Vg.bind(this));
        this.u = new U(this);
        this.u.C(A, "hashchange", this.mj)
    }
    ;
    k.fa = function() {
        Y.prototype.fa.call(this);
        this.j && this.j.stop();
        this.u.G();
        this.u = void 0
    }
    ;
    function aw(a) {
        a.m = new U(a);
        a.m.C(a.i, "select", function(b) {
            b = b.target.h.h;
            bw(b);
            this.h && 0 === hb(ut(this.h.m), ut(b)) || (this.h && this.h.G(),
            this.h = new cw(b,!1),
            b = new U(this),
            N(this.h, b),
            b.C(this.h, Ov, function() {
                this.j && this.j.stop();
                var c = this;
                (r = c.update(),
                v(r, "finally")).call(r, function() {
                    c.Vg(!0)
                })
            }),
            this.F.H(this.h, this.aa),
            dw(this, null))
        })
    }
    function ew(a) {
        a.m && (a.m.G(),
        a.m = void 0)
    }
    k.zj = function(a) {
        a = a.target;
        if (!this.W()) {
            var b = fw(this, ut(a.m));
            b.m && b.h.g.g <= a.F.g && Zv(b, this.Kh.bind(this))
        }
    }
    ;
    k.Kh = function() {}
    ;
    function bw(a) {
        a = "#" + ut(a);
        0 !== hb(A.location.hash, a) && A.location.replace(a)
    }
    k.mj = function() {
        var a = A.location.hash.substring(1) || null;
        if (a && (a = fw(this, a))) {
            this.i.yc(a);
            return
        }
        gw(this)
    }
    ;
    function gw(a) {
        for (var b, c = 0, d; d = Zj(a.i, c); c++)
            if (!b && d.m) {
                b = d;
                break
            }
        (a = b || Zj(a.i, 0)) && bw(a.h.h)
    }
    function fw(a, b) {
        b = b.toLowerCase();
        for (var c = 0, d = Yj(a.i); c < d; c++) {
            var e = Zj(a.i, c);
            if (b === ut(e.h.h).toLowerCase())
                return e
        }
        return null
    }
    k.Vg = function(a) {
        this.j && this.j.G();
        this.j = new Ei(this.update,this,a ? Qv : Rv);
        this.j.m = !0;
        this.j.start()
    }
    ;
    k.update = function() {
        if (!this.v) {
            var a = this;
            this.v = (r = hw(this.ha).then(function(b) {
                if (!a.W()) {
                    var c = b.h;
                    if (c) {
                        a.ha = b.g;
                        var d, e = c.length;
                        b = a.i;
                        var f = a.h;
                        ew(a);
                        var g = ck(b, !0);
                        for (d = 0; d < e; d++) {
                            var h = new Yv(c[d],a.ga,a.N.bind(a),a.T.bind(a));
                            b.H(h, b.aa)
                        }
                        for (d = 0; d < g.length; d++)
                            g[d].G();
                        aw(a);
                        if (e) {
                            c = A.location.hash.substring(1) || null;
                            var l;
                            c && (l = fw(a, c)) ? (b.yc(l),
                            f === a.h && l.h.g.h !== f.F.h && a.h.update()) : gw(a)
                        } else
                            a.h && (a.h.G(),
                            a.h = void 0),
                            dw(a, ms("<b>Tip:</b> To send a message to a user, go to the user's profile page and click on the <i>Message</i> button."))
                    }
                }
            }).catch(function() {
                a.W() || a.h || dw(a, "Cannot connect to a server, maybe a temporary connection issue...")
            }),
            v(r, "finally")).call(r, function() {
                a.v = void 0
            })
        }
        return this.v
    }
    ;
    k.D = function() {
        ew(this);
        this.j && this.j.G();
        this.i && this.i.G();
        Y.prototype.D.call(this)
    }
    ;
    function dw(a, b) {
        a = a.K.Oa();
        Od(a);
        if (null !== b) {
            var c = K("P", {
                style: "text-align:center"
            });
            b instanceof Xc ? bd(c, b) : Nd(c, b);
            a.appendChild(c)
        }
    }
    ;function iw(a) {
        this.h = a
    }
    function jw() {
        return "serviceWorker"in A.navigator && "PushManager"in A && (!Gb || qg(17))
    }
    function kw(a) {
        return lw(a).then(function(b) {
            return !!b
        }, cc)
    }
    function mw(a) {
        return lw(a, !0).then(function(b) {
            return nw(b).catch(function(c) {
                b.unsubscribe();
                return Qh(c)
            })
        }, Qh)
    }
    function ow(a) {
        return lw(a).then(function(b) {
            if (b)
                return b.unsubscribe().then(function(c) {
                    return c ? pw() : t.Promise.reject()
                }, Qh)
        }, Qh)
    }
    function qw(a, b) {
        return jw() ? rw(b).then(function(c) {
            return c ? c.pushManager.getSubscription().then(function(d) {
                if (!d)
                    if (b) {
                        d = c.pushManager;
                        var e = d.subscribe
                          , f = a.h
                          , g = v("=", "repeat").call("=", (4 - f.length % 4) % 4);
                        f = window.atob((f + g).replace(/\-/g, "+").replace(/_/g, "/"));
                        g = new Uint8Array(f.length);
                        for (var h = 0; h < f.length; ++h)
                            g[h] = f.charCodeAt(h);
                        d = e.call(d, {
                            userVisibleOnly: !0,
                            applicationServerKey: g
                        })
                    } else
                        d = null;
                return d
            }, Qh) : b ? t.Promise.reject() : null
        }, Qh) : t.Promise.reject("Push API is not supported")
    }
    function lw(a, b) {
        return a.g || (a.g = qw(a, b)).then(function(c) {
            a.g = null;
            return c
        }, function(c) {
            a.g = null;
            return t.Promise.reject(c)
        })
    }
    ;function sw() {
        this.h = "BJK4oS2QAzmFQMcub2Qwfs8uZOHYdv_0WrZ9NR4JQzjxeJQgNL_s4tLzpUqKN-SsKpP_eiDsoFB2p4yom6Aj9ak"
    }
    z(sw, iw);
    function rw(a) {
        var b = A.navigator.serviceWorker;
        return a ? b.register("/sw.js", {
            scope: "/"
        }) : b.getRegistration("/")
    }
    function nw(a) {
        return new t.Promise(function(b, c) {
            var d = PushManager.supportedContentEncodings
              , e = 0;
            if (d && (Ra(d, function(f) {
                f in tw && (e |= tw[f])
            }),
            !e)) {
                c("Unsupported encoding");
                return
            }
            d = a.toJSON().keys;
            fu("webpush/subscribe", {
                endpoint: a.endpoint,
                auth: d.auth,
                p256dh: d.p256dh,
                encoding: e
            }, function(f, g) {
                g ? c("Cannot write to a server") : b()
            }, "POST")
        }
        )
    }
    function pw() {
        return new t.Promise(function(a, b) {
            fu("webpush/unsubscribe", null, function(c, d) {
                d ? b("Cannot write to a server") : a()
            }, "POST")
        }
        )
    }
    function uw() {
        function a() {
            return lw(c).then(function(d) {
                if (d)
                    return nw(d)
            }, Qh)
        }
        if (!Zt())
            return t.Promise.resolve();
        var b = A.tsEnv.eph;
        if (!th(b))
            return t.Promise.resolve();
        var c = sw.Ra();
        return lw(c).then(function(d) {
            if (b)
                if (d) {
                    var e = new mt;
                    e.update(d.endpoint);
                    d = kt(ot(e));
                    if (0 !== hb(b, d))
                        return a()
                } else
                    return pw();
            else if (d)
                return a()
        }, Xi)
    }
    function vw(a) {
        if (jw() && "showNotification"in ServiceWorkerRegistration.prototype && "Notification"in A && A.fetch) {
            var b = sw.Ra();
            kw(b).then(function(c) {
                function d() {
                    return kw(b).then(function(l) {
                        jm(f, l)
                    }, Qh)
                }
                var e = vh()
                  , f = kl({
                    type: "checkbox",
                    id: e
                })
                  , g = "granted" !== A.Notification.permission
                  , h = cm("bell", "regular");
                e = K("LABEL", {
                    "for": e
                }, h, g ? "..." : "");
                h = K("SPAN", {
                    "class": "unselectable",
                    title: "Notify me"
                }, f, e, dt());
                R(e, {
                    "font-size": "1.5em",
                    opacity: .9
                });
                nm(e);
                jm(f, c);
                nm(f);
                R(f, {
                    margin: "0 .4em"
                });
                R(h, {
                    "white-space": "nowrap"
                });
                a.appendChild(h);
                Q(f, "change", function() {
                    (hm(f) ? g ? new t.Promise(function(l) {
                        var m = K("DIV", null, K("P", null, "See your notifications in the corner of your computer screen or on a display of your phone, even when Jigsaw Planet is closed. You can turn it off anytime you want..."));
                        if ("denied" === A.Notification.permission) {
                            var n = ns("Currently, notifications are blocked for this site in your browser, <a>enable notifications</a> if you want to use them.")
                              , q = Ad("A", null, n);
                            Bd(q, {
                                href: "https://www.google.com/search?q=how+to+enable+notifications+in+browser",
                                target: "_blank",
                                rel: "noopener"
                            });
                            et(q);
                            Nd(m, K("P", null, K("B", null, "Note:"), " ", n))
                        }
                        Ip(m).then(function(p) {
                            l(p ? mw(b) : void 0)
                        })
                    }
                    ) : mw(b) : ow(b)).then(d, function(l) {
                        d();
                        return Qh(l)
                    }).catch(function(l) {
                        return Jp("It is not possible to subscribe, a reason: " + l + " (see a web console for more).")
                    })
                })
            })
        }
    }
    function ww() {
        Vt() && uw().then(function() {
            var a = ud("ts-pushselect");
            a && vw(a)
        })
    }
    Aa(sw);
    var tw = {
        aesgcm: 1,
        aes128gcm: 2
    };
    var xw, yw, zw;
    function Aw() {
        Jv.apply(this, arguments)
    }
    z(Aw, Jv);
    Aw.prototype.i = function(a) {
        return Bw(a, this)
    }
    ;
    function cw() {
        Mv.apply(this, arguments)
    }
    z(cw, Mv);
    cw.prototype.J = function() {
        Mv.prototype.J.call(this);
        var a = this.o();
        O(a, "ts-msgs-tread");
        te(a, Cw())
    }
    ;
    cw.prototype.Kf = function() {
        return Mv.prototype.Kf.call(this) && Dw()
    }
    ;
    function Uv(a, b) {
        a = {
            uname: ut(a.m)
        };
        b && (a.items_etag = b);
        return hu("messages/thread", a, {
            Hb: !1
        }).then(function(c) {
            return c
        })
    }
    cw.prototype.lh = function(a) {
        return new Aw(a)
    }
    ;
    function Ew() {
        $v.apply(this, arguments)
    }
    z(Ew, $v);
    Ew.prototype.J = function() {
        $v.prototype.J.call(this);
        var a = this.o();
        te(a, Cw())
    }
    ;
    function hw(a) {
        return hu("messages/index", a ? {
            items_etag: a
        } : null, {
            Hb: !1
        }).then(function(b) {
            Fw(b.i);
            return b
        })
    }
    Ew.prototype.N = function(a) {
        return hu("messages/delete", {
            message_id: a
        }, "POST")
    }
    ;
    Ew.prototype.T = function(a) {
        return Gw(ut(a), !0)
    }
    ;
    Ew.prototype.Kh = function() {
        xw && Fw(xw - 1)
    }
    ;
    function Hw() {
        Zt() && function() {
            var a = zd("ts-msgs-wrap");
            if (a) {
                var b = new Ew(Bw);
                b.La(a);
                var c = function() {
                    b.update()
                }
            } else {
                var d = Iw();
                d && (c = function() {
                    d.update()
                }
                )
            }
            c && Ks("unreadchngdonsrvr", c);
            Ks("unreadchanged", function(e) {
                Jw(e.data.unread_count)
            })
        }()
    }
    function Iw() {
        void 0 === yw && zd("ts-msgs-count") ? (yw = new Ei(function() {
            fu("messages/unreadCount", null, function(a) {
                a && Fw(a.unread_count)
            }, {
                Hb: !1
            })
        }
        ,null,{
            he: 3E5
        }),
        kw(sw.Ra()).then(function(a) {
            !a && yw && (yw.m = !0,
            yw.start())
        })) : yw = null;
        return yw
    }
    function Fw(a) {
        Ls(new Hs("unreadchanged",{
            unread_count: a
        }))
    }
    function Kw(a) {
        th(zw) || (zw = document.title);
        document.title = (a ? "(" + a + ") " : "") + zw
    }
    function Jw(a) {
        if (a !== xw) {
            var b = ud("ts-mainmenu-msgs");
            if (b) {
                we(b, "ts-new-msgs", !!a);
                b = zd("ts-msgs-count", b);
                var c = parseInt(ce(b), 10);
                (isNaN(c) || a > c) && om(b)
            }
            Ra(yd("ts-msgs-count"), function(d) {
                Vd(d, a)
            });
            xw = a;
            Kw(a)
        }
    }
    function Lw(a, b) {
        var c = jo(b);
        b = new cw(c,!0);
        c = new yp(V("Messages") + " > " + ut(c));
        N(c, b);
        c.L(!0);
        c.H(b, c.aa);
        a.stopPropagation();
        a.preventDefault()
    }
    function Mw(a) {
        if (void 0 === Mw.md)
            try {
                Mw.md = RegExp("(?:\\p{Emoji}\ufe0f|\\p{Emoji_Presentation})+", "gu")
            } catch (e) {
                Mw.md = null
            }
        if (Mw.md) {
            for (var b = [], c = Mw.md.lastIndex = 0, d = a.nodeValue; null !== (a = Mw.md.exec(d)); )
                c !== a.index && b.push(document.createTextNode(String(d.substring(c, a.index)))),
                b.push(K("SPAN", "ts-emoji-noto", a[0])),
                c = Mw.md.lastIndex;
            if (b.length)
                return c < d.length && b.push(document.createTextNode(String(d.substring(c)))),
                Mw.Ii || (c = K("LINK", {
                    href: "https://fonts.googleapis.com/css2?family=Noto+Color+Emoji",
                    rel: "stylesheet"
                }),
                document.head.appendChild(c),
                Mw.Ii = !0),
                b
        }
        return null
    }
    function Bw(a, b) {
        a = jl(a, function(c, d) {
            return ft(c, d, b)
        });
        Dw() || ml(a, Mw);
        return a
    }
    var Dw = fc(function() {
        var a = Ll(48, 48)
          , b = Ml(a)
          , c = [0, 0, 0];
        b.fillStyle = Xh(c);
        b.textBaseline = "top";
        b.font = "32px Arial";
        b.fillText("\ud83d\ude10", 0, 0);
        a = Tl(a);
        return !bb(a, c)
    });
    function Gw(a, b) {
        return hu(b ? "user/block" : "user/unblock", {
            uname: a
        }, "POST")
    }
    var Cw = fc(function() {
        return nu(["ts-size-small", "ts-viewmod-onlyimgs"])
    });
    function Nw() {}
    function Ow(a) {
        var b = new Nw;
        b.i = a.sender;
        b.i = b.i.toLowerCase();
        b.j = a.body;
        b.g = a.time;
        b.h = a.message_id;
        return b
    }
    function Kv(a) {
        return a.Xh.Jj[a.i]
    }
    function Pw(a) {
        var b, c = a.length, d = {};
        for (b = 0; b < c; b++)
            d[ut(a[b]).toLowerCase()] = a[b];
        return {
            Jj: d
        }
    }
    function Qw() {}
    function Rw(a) {
        var b = new Qw;
        b.m = a.unread;
        b.l = a.sending_status;
        b.j = a.sending_status_text;
        b.i = a.max_body_length;
        b.h = a.items_etag;
        b.g = a.items;
        if (b.g) {
            a = Pw(a.participants);
            for (var c = 0, d = b.g.length; c < d; c++)
                b.g[c].Xh = a
        }
        return b
    }
    function Sw(a) {
        this.g = a.last_message;
        this.i = a.unread;
        a = a.participants;
        this.g.Xh = Pw(a);
        for (var b = 0; b < a.length; b++)
            if (!a[b].ud()) {
                this.h = a[b];
                break
            }
    }
    function Tw(a) {
        return new Sw(a)
    }
    function Uw(a) {
        this.h = a.items;
        this.g = a.items_etag;
        this.i = a.unread_count
    }
    function Vw(a) {
        return new Uw(a)
    }
    ;function Ww() {
        tt.apply(this, arguments)
    }
    z(Ww, tt);
    Ww.prototype.ea = function() {
        return tt.prototype.ea.call(this)
    }
    ;
    Ww.prototype.Ae = function(a) {
        return "authkey" === a && void 0 === this.ea().authkey ? "" : "visibility" === a && void 0 === this.ea().visibility ? Xw(this) : tt.prototype.Ae.call(this, a)
    }
    ;
    function Xw(a) {
        a = a.ea().visibility;
        return void 0 === a ? "public" : a
    }
    Ww.prototype.yb = function() {
        return this.ea().url || null
    }
    ;
    Ww.prototype.Ba = function() {
        return new Yw(this)
    }
    ;
    function Zw(a) {
        return new Ww(a)
    }
    ;function $w() {
        Y.apply(this, arguments)
    }
    z($w, Y);
    function ax() {
        var a = Xs("gamehelp", null, {
            heading: 0
        });
        a = Hp("Game Help", K("IFRAME", {
            src: a.toString(),
            style: "border:0 none;flex:1 1 auto"
        }));
        a.Fa = {
            width: Ap.maxWidth,
            height: Ap.maxHeight,
            Qc: Ap.Qc
        };
        return a
    }
    function bx(a) {
        if (a.separator)
            a = new xq;
        else {
            var b = a.link;
            Array.isArray(b) && (b = cx(b));
            b = new uq(a.title,b,a.ico,a.onclick);
            a.confirm && (b.i = a.confirm);
            a.target && (b.F = a.target);
            a = b
        }
        return a
    }
    function cx(a) {
        var b = new os;
        a = y(a);
        for (var c = a.next(); !c.done; c = a.next())
            b.H(bx(c.value));
        return b
    }
    function dx(a, b) {
        function c() {
            Y.call(this, "SPAN");
            for (var e = 0; e < d.length; e++) {
                var f = d[e];
                Eh(f) && (f = ul(f));
                this.H(f)
            }
        }
        var d = xi(a, Array.prototype.slice.call(arguments, 1));
        z(c, Y);
        c.Error = Sj;
        return new c
    }
    ;function ex() {
        this.g = Es()
    }
    var fx;
    function gx() {
        return fx || (fx = new ex)
    }
    ex.prototype.set = function(a, b) {
        var c = !1;
        try {
            var d = mo(b);
            a = "ts-" + a;
            this.g.set(a, d);
            c = this.g.get(a) === d
        } catch (e) {
            (e instanceof vs ? Xi : W)("Cannot write settings to " + this.g.Db(), e)
        }
        return c
    }
    ;
    ex.prototype.get = function(a, b) {
        try {
            var c = this.g.get("ts-" + a);
            c = null === c ? b : ko(c)
        } catch (d) {
            Xi("Cannot read settings from " + this.g.Db(), d),
            c = b
        }
        return c
    }
    ;
    ex.prototype.He = function() {
        return this.g.He()
    }
    ;
    function hx(a, b) {
        this.x = a;
        this.y = b
    }
    D(hx, gd);
    hx.prototype.ef = function() {
        return new hx(this.x,this.y)
    }
    ;
    hx.prototype.add = function(a) {
        this.x += a.x;
        this.y += a.y;
        return this
    }
    ;
    var ix, jx, kx;
    function lx(a, b) {
        var c = {};
        c.url = a;
        c.Cj = b;
        return new Hs("previewerchanged",c)
    }
    function mx(a, b, c) {
        var d = new U;
        if (-1 !== Qa(["mouseenter"], "mouseenter")) {
            var e = !0;
            d.C(a, "mouseenter", function() {
                Ls(lx(b, c))
            })
        }
        e && nx();
        return d
    }
    function nx() {
        if (!ix) {
            var a = Ws("previewer");
            ix = K("A", {
                title: "Click to open Previewer in a popup. Shift+click to open Previewer in a new window. (Experimental)",
                target: "previewer"
            }, cm("window-restore", "regular"));
            cd(ix, a);
            var b = dt("Exp");
            ix.appendChild(b);
            Q(ix, ["touchstart", "touchend", "touchcancel"], function(c) {
                if ("touchstart" === c.type) {
                    var d;
                    Hq(c.currentTarget, K("DIV", null, "This tool only makes sense for mouse control, ", d = K("SPAN", null, "sorry :-(.")));
                    R(d, "white-space", "nowrap")
                }
                c.ja.cancelable && c.preventDefault();
                c.stopPropagation()
            });
            Q(ix, "click", function(c) {
                if (c.ctrlKey || c.shiftKey || c.altKey || c.metaKey)
                    (c.ctrlKey || c.altKey || c.metaKey) && c.preventDefault();
                else {
                    var d = "location=no,menubar=no,toolbar=no,directories=no,scrollbars=no,resizable=yes,dependent=yes"
                      , e = ox();
                    e && (d += ",left=" + e.x + ",top=" + e.y);
                    Ah(a, "previewer", d);
                    c.preventDefault()
                }
            });
            Ns || Md(ud("ts-pg-msc"), Ns = K("DIV", ["ts-wbcntrl", "ts-hoveraltop"]));
            Nd(Ns, ix)
        }
    }
    function ox() {
        var a = gx().get("previewerWinPos");
        return a ? new hx(a[0],a[1]) : a
    }
    var px = fc(function() {
        return Ll(1, 1).toDataURL("image/png")
    });
    function qx(a) {
        a = ll(a)[0];
        return Sd(a) && "IMG" === a.tagName.toUpperCase() ? a : void 0
    }
    function rx(a) {
        a = ll(a)[0];
        var b = new Image;
        jx && gf(jx);
        Rd(b, a);
        Sd(a) && "IMG" === a.tagName.toUpperCase() && Vs(px(), a);
        jx = Q(b, "contextmenu", function(c) {
            c.preventDefault()
        });
        return b
    }
    function sx(a, b) {
        function c(l) {
            R(d, "justify-content", l[0]);
            R(d, "align-items", l[1])
        }
        var d = ud(a);
        Ks("refreshpage", function() {
            window.close()
        });
        var e = yh(), f;
        Ks("previewerchanged", function(l) {
            if (!document.hidden) {
                var m = l.data;
                l = m.url;
                m = m.Cj;
                var n = qx(d);
                if (!n || n.src !== l)
                    if (kx && Od(kx),
                    f && f.cancel(),
                    n = rx(d),
                    f = Vs(l, n).then(function() {
                        tx(d);
                        6E5 < yh() - e && wl()
                    }),
                    "history"in A && m)
                        try {
                            var q = new fk(A.location);
                            q.h.set(b, m);
                            A.history.replaceState(null, "", q.toString())
                        } catch (p) {
                            W("chh", p)
                        }
            }
        });
        Q(A, "beforeunload", function() {
            var l = A.screenX
              , m = A.screenY;
            gx().set("previewerWinPos", [l, m])
        });
        vb() && (a = ox()) && A.moveTo(a.x, a.y);
        var g = gx()
          , h = g.get("previewerAlign");
        void 0 !== h && Array.isArray(h) || (h = ["center", "center"]);
        c(h);
        Ra(cl(".ts-settings-align input", d), function(l) {
            var m = $h(l, "align")
              , n = JSON.parse(m);
            Array.isArray(n) && (bb(n, h) && (l.checked = !0),
            Q(l, "click", function() {
                c(n);
                g.set("previewerAlign", n)
            }))
        });
        ux(d) && vx(d)
    }
    function ux(a) {
        return bl(".ts-settings-histogram input", a)
    }
    function vx(a) {
        function b(f) {
            f ? kx || (kx = L("DIV"),
            R(kx, {
                position: "absolute",
                left: 0,
                bottom: 0
            }),
            document.body.appendChild(kx),
            tx(a)) : kx && (Qd(kx),
            kx = void 0)
        }
        var c = ux(a)
          , d = gx()
          , e = d.get("previewerHistogram");
        b(e);
        e && jm(c, !0);
        Q(c, "click", function() {
            var f = !!hm(c);
            b(f);
            d.set("previewerHistogram", f)
        })
    }
    function tx(a) {
        var b;
        if (kx && (b = qx(a)) && b.width && b.height) {
            Od(kx);
            a = b;
            b = Ll(a.width, a.height);
            var c = a.width
              , d = a.height;
            b.width !== c && (b.width = c);
            b.height !== d && (b.height = d);
            c = Ml(b);
            c.save();
            c.globalCompositeOperation = "copy";
            c.drawImage(a, 0, 0);
            c.restore();
            a = Sl(b);
            b = Ll(256, 100);
            c = Ml(b);
            c.save();
            for (d = 0; d < a.xh.length; d++) {
                var e = a.xh[d]
                  , f = e.length;
                c.strokeStyle = "rgb(" + (0 === d ? "255,0,0" : 1 === d ? "0,255,0" : "0,0,255") + ")";
                c.beginPath();
                for (var g = 0; g < f; g++) {
                    var h = 99 - Math.round(99 * e[g]);
                    g ? c.lineTo(g, h) : c.moveTo(g, h)
                }
                c.stroke()
            }
            c.restore();
            kx.appendChild(b)
        }
    }
    ;var wx, xx;
    function yx(a) {
        $w.call(this);
        this.ua = a;
        var b = this;
        (a = a.Pd()) && Rs[a] ? (a = function(c, d) {
            Y.call(this, c, d)
        }
        ,
        z(a, Y),
        a.Error = Sj,
        a.prototype.O = function() {
            Y.prototype.O.call(this);
            this.mc && this.mc.G();
            this.mc = new gq(function() {
                return Tg(cx(b.Bf()))
            }
            );
            mq(this.mc, 12);
            this.mc.ya(this.s)
        }
        ,
        a.prototype.D = function() {
            this.mc && this.mc.G();
            Y.prototype.D.call(this)
        }
        ,
        a = new a(null,{
            "class": "ts-cm-trggr ts-cntrl-hover-bg bigShadow ts-rarrow",
            title: ""
        })) : a = null;
        this.H(new Y(null,{
            "class": "ts-ic"
        },this.Hc(),a));
        this.H(new Y(null,{
            "class": "ts-tc"
        },this.rf()))
    }
    z(yx, $w);
    k = yx.prototype;
    k.D = function() {
        $w.prototype.D.call(this)
    }
    ;
    k.Ha = function(a) {
        Od(a);
        this.s = a;
        var b = this.g;
        a = this.Oa();
        for (var c = 0, d; d = Zj(this, c); c++)
            d.o() || d.J(),
            b.appendChild(a, d.o());
        this.Zc()
    }
    ;
    k.Zc = function() {
        var a = this.s;
        O(a, "ts-item");
        O(a, "ts-" + this.getData().g);
        Bd(a, {
            title: this.Cf()
        });
        a.style.setProperty("--children", "" + Yj(this))
    }
    ;
    k.J = function() {
        $w.prototype.J.call(this);
        this.Zc()
    }
    ;
    k.Cf = function() {
        return ut(this.ua)
    }
    ;
    k.O = function() {
        $w.prototype.O.call(this);
        var a = this.o();
        zx.set(a, this)
    }
    ;
    k.fa = function() {
        $w.prototype.fa.call(this);
        var a = this.o();
        zx.delete(a)
    }
    ;
    k.getData = function() {
        return this.ua
    }
    ;
    k.Jb = function() {
        return $w.prototype.Jb.call(this)
    }
    ;
    k.Hc = function() {
        return new Ax(this.ua)
    }
    ;
    k.rf = function() {
        return new Bx(this.ua)
    }
    ;
    k.Bf = function() {
        var a = this.getData()
          , b = a.Pd();
        if (b) {
            b = Rs[b] || null;
            var c = a.Af()
              , d = function(h) {
                var l = [];
                Ra(h, function(m) {
                    if (!c || !m.key || -1 === c.indexOf(m.key)) {
                        m = Mc(m);
                        var n = m.link;
                        if (Array.isArray(n) && (n = m.link = d(n),
                        !n.length))
                            return;
                        this.push(m)
                    }
                }, l);
                return l
            };
            var e = d(b.struct);
            var f, g = [];
            for (f = 0; f < b.replace.length; f++)
                g[f] = {
                    search: new RegExp(b.search[f],"mg"),
                    replace: b.replace[f]
                };
            zh(e, function(h) {
                if ("string" === typeof h)
                    for (var l = {
                        Mc: 0
                    }; l.Mc < g.length; l = {
                        Mc: l.Mc
                    },
                    l.Mc++)
                        h = h.replace(g[l.Mc].search, function(m) {
                            return function(n) {
                                var q = "" + a.Ae(g[m.Mc].replace);
                                return n.replace(g[m.Mc].search, q)
                            }
                        }(l));
                return h
            })
        }
        return e || []
    }
    ;
    var zx = new t.Map;
    function Ax(a, b, c) {
        c = c || [];
        var d = a.yb();
        b = vt(a);
        c.push("ts-cnt-wrap");
        c = {
            "class": c.join(" ")
        };
        d && (c.href = d);
        Y.call(this, d ? "A" : "DIV", c);
        this.$d = a;
        a = this.Gc();
        this.zi = a.length ? new Y(null,"ts-exinfo",a) : null;
        a = b ? this.pf() : this.qf();
        this.H(new Y(null,"ts-cntbrdr-wrap",a,this.zi))
    }
    var Cx;
    z(Ax, Y);
    k = Ax.prototype;
    k.J = function() {
        Y.prototype.J.call(this);
        var a = this.oc();
        0 !== a && O(this.s, "ts-paudit-" + a)
    }
    ;
    function Dx(a) {
        return sl(K("DIV", {
            "class": "ts-cnt ts-nocnt"
        }, a))
    }
    k.qf = function() {
        return null
    }
    ;
    k.oc = function() {
        var a = vt(this.$d);
        return a ? rt(a) : 0
    }
    ;
    k.Gc = function() {
        var a = []
          , b = this.oc();
        if (0 !== b && 3 !== b) {
            var c = Ex(b);
            c && (b = cm("eye-slash", "regular"),
            O(b, "ts-label"),
            Gq(b, function() {
                return K("DIV", null, K("P", null, c))
            }),
            a.push(sl(b)))
        }
        return a
    }
    ;
    k.pf = function() {
        var a = vt(this.$d)
          , b = {
            "class": "ts-cnt",
            alt: ut(this.$d)
        }
          , c = this;
        if (3 === this.oc())
            b = Dx(V("banned"));
        else {
            var d = function() {
                Y.apply(this, arguments)
            };
            z(d, Y);
            d.Error = Sj;
            d.prototype.O = function() {
                Y.prototype.O.call(this);
                var e = a.pa.url
                  , f = this.s;
                if (at.test(e)) {
                    var g = c.s;
                    ht(Xl(function() {
                        if (!this.W()) {
                            var h = Rf(g);
                            if (h.width && h.height) {
                                var l = A.getComputedStyle(f);
                                l = !!Dh(l.getPropertyValue("--bigger-img-enabled").trim());
                                var m = bt(e, "%d");
                                l ? (void 0 === Cx && (Cx = Fx.slice(0),
                                Cx.push(1280)),
                                l = Cx) : l = Fx;
                                var n = l;
                                l = $l(function() {
                                    var q = new J(a.$(),a.Z())
                                      , p = q.aspectRatio() > h.aspectRatio() ? h.width / q.width : h.height / q.height;
                                    q.width *= p;
                                    q.height *= p;
                                    .82 < id(q) / id(h) && R(f, "object-fit", "cover");
                                    q = m;
                                    var u, x = h.width;
                                    x *= fe();
                                    for (p = 0; p < n.length; p++) {
                                        var B = n[p];
                                        if (!E || E < B)
                                            var E = B;
                                        B >= x && (!u || B < u) && (u = B)
                                    }
                                    u || (u = E);
                                    f.loading = "lazy";
                                    q = q.replace(RegExp("%d"), "" + u);
                                    return Rh(Vs(q, f, {
                                        wf: "low"
                                    }))
                                });
                                l.catch(function(q) {
                                    Xi("" + q)
                                });
                                return t.Promise.race([l, Di(2E3)])
                            }
                        }
                    }
                    .bind(this)))
                } else
                    Vs(e, f)
            }
            ;
            b = new d("IMG",b)
        }
        return [b]
    }
    ;
    function Ex(a) {
        switch (a) {
        case 1:
            return V("Sharing is limited") + '. This content violates the "Terms of Services".';
        case 2:
            return V("Sharing is limited") + '. This content violates the "Terms of Services" on copyright grounds.';
        case 3:
            return 'Showing is limited. This content significantly violates the "Terms of Services".'
        }
        return null
    }
    var Fx = [32, 96, 160, 320];
    function Bx(a, b) {
        function c() {
            Y.apply(this, arguments)
        }
        var d = {}, e;
        !b && (e = a.yb()) && (d.href = e);
        Y.call(this, e ? "A" : "DIV", d);
        this.$d = a;
        z(c, Y);
        c.Error = Sj;
        c.prototype.J = function() {
            Y.prototype.J.call(this);
            var f = this.Oa();
            Nd(f, ut(a))
        }
        ;
        this.H(new c(null,"ts-label"))
    }
    z(Bx, Y);
    function Gx() {
        yx.apply(this, arguments)
    }
    z(Gx, yx);
    Gx.prototype.Qd = function() {
        return vt(this.ua).pa.image_id
    }
    ;
    Gx.prototype.Hc = function() {
        function a() {
            Ax.apply(this, arguments)
        }
        z(a, Ax);
        a.Error = Sj;
        a.prototype.oc = function() {
            return 0
        }
        ;
        a.prototype.Gc = function() {
            return Ax.prototype.Gc.call(this)
        }
        ;
        return new a(this.getData(),!0)
    }
    ;
    function Hx() {
        tt.apply(this, arguments)
    }
    z(Hx, tt);
    Hx.prototype.Ba = function() {
        return new Gx(this)
    }
    ;
    Hx.prototype.yb = function() {
        return this.ea().url || (3 !== rt(vt(this)) ? vt(this).pa.url : null)
    }
    ;
    function Ix(a) {
        return new Hx(a)
    }
    ;function Jx() {
        tt.apply(this, arguments)
    }
    z(Jx, tt);
    k = Jx.prototype;
    k.ea = function() {
        return tt.prototype.ea.call(this)
    }
    ;
    function Kx(a) {
        a = a.ea().block;
        return void 0 === a ? 0 : a
    }
    k.yb = function() {
        var a;
        return this.ea().url || (0 === Kx(this) && (a = vt(this)) && 3 !== rt(a) ? Ws("play", {
            pid: this.ea().pid
        }) : null)
    }
    ;
    k.Pd = function() {
        var a = tt.prototype.Pd.call(this);
        null === a && this.yb() && Rs.common_play_share && (a = "common_play_share");
        return a
    }
    ;
    k.Af = function() {
        var a = tt.prototype.Af.call(this);
        null === a && "common_play_share" === this.Pd() && (a = "g");
        return a
    }
    ;
    k.Ba = function() {
        return new Lx(this)
    }
    ;
    function Mx(a) {
        return new Jx(a)
    }
    ;function Nx(a) {
        yx.call(this, a);
        this.Te = a.Nc();
        void 0 !== this.Te && this.H(Ox(this))
    }
    z(Nx, yx);
    k = Nx.prototype;
    k.Hc = function() {
        function a() {
            Ax.apply(this, arguments)
        }
        var b = this.getData();
        z(a, Ax);
        a.Error = Sj;
        a.prototype.qf = function() {
            return [new Y("IMG",{
                src: "/img/look1/nofaceuser.svg" + it(),
                "class": "ts-cnt",
                alt: ""
            })]
        }
        ;
        a.prototype.Gc = function() {
            var c = Ax.prototype.Gc.call(this);
            b.ea().deactivated && c.push(sl(cm("xmark", null, "ts-label")));
            return c
        }
        ;
        return new a(b)
    }
    ;
    k.Zc = function() {
        yx.prototype.Zc.call(this);
        var a = this.getData();
        if (a.ea().deactivated) {
            var b = this.s
              , c = ut(this.ua);
            O(b, "ts-" + a.g + "-deactivated");
            N(this, Gq(b, function() {
                return K("DIV", null, K("STRONG", null, c), " deactivated his/her account")
            }))
        }
    }
    ;
    k.Qd = function() {
        return ut(this.ua)
    }
    ;
    function Ox(a) {
        function b() {
            Y.call(this, "BUTTON", {
                type: "button"
            })
        }
        z(b, Y);
        b.Error = Sj;
        b.prototype.Xi = function(c) {
            Vd(this.o(), c ? V("Unfollow") : V("Follow"))
        }
        ;
        b.prototype.Xg = function(c) {
            Vd(this.o(), c ? V("usrbtn\u0004Following") : V("Follow"))
        }
        ;
        b.prototype.Gg = function() {
            var c = a.Nc();
            this.Xg(c);
            we(this.o(), "following", c)
        }
        ;
        b.prototype.J = function() {
            Y.prototype.J.call(this);
            this.Gg();
            var c = this.o();
            te(c, ["follow", "btn", "ts-smaller"]);
            Zt() || (c = Gq(c, Ys),
            N(this, c))
        }
        ;
        b.prototype.O = function() {
            Y.prototype.O.call(this);
            var c = this.o()
              , d = this;
            N(this, this.Qe = new U(this));
            Zt() && this.Qe.C(c, "click", function() {
                im(c, !0);
                var e = a.Nc();
                (r = hu("user/follow", {
                    uname: ut(a.getData()),
                    vote: e ? 0 : 1
                }, "POST").then(function(f) {
                    a.Te = 1 === f.vote;
                    d.Gg();
                    a.zg && a.zg(a)
                }),
                v(r, "finally")).call(r, function() {
                    im(c, !1)
                })
            });
            this.Qe.C(c, "mouseover", function() {
                var e = a.Nc();
                d.Xi(e);
                e && ue(c, "following")
            });
            this.Qe.C(c, "mouseout", function() {
                var e = a.Nc();
                d.Xg(e);
                e && O(c, "following")
            })
        }
        ;
        b.prototype.fa = function() {
            Y.prototype.fa.call(this);
            this.Qe.G()
        }
        ;
        return new b
    }
    k.getData = function() {
        return yx.prototype.getData.call(this)
    }
    ;
    function Px(a) {
        function b() {
            Y.call(this, "SPAN");
            this.H(a.Ba())
        }
        z(b, Y);
        b.Error = Sj;
        b.prototype.J = function() {
            Y.prototype.J.call(this);
            var c = this.s;
            O(c, "ts-viewmod-noimgs");
            R(c, {
                display: "inline-block"
            })
        }
        ;
        return new b
    }
    k.Nc = function() {
        return void 0 === this.Te ? this.getData().Nc() : this.Te
    }
    ;
    function Qx(a) {
        tt.call(this, a)
    }
    z(Qx, St);
    Qx.prototype.Ba = function() {
        return new Nx(this)
    }
    ;
    function Rx(a) {
        var b;
        "admin" === a.name ? b = new Sx : b = new Qx(a);
        return b
    }
    function Sx() {
        tt.call(this, {
            name: "Jigsaw Planet",
            role: 1,
            image: null,
            __c: "User"
        })
    }
    z(Sx, Qx);
    Sx.prototype.yb = function() {
        return null
    }
    ;
    Sx.prototype.Wd = function() {
        return !1
    }
    ;
    Sx.prototype.Ba = function() {
        function a() {
            Nx.apply(this, arguments)
        }
        z(a, Nx);
        a.Error = Sj;
        a.prototype.Hc = function() {
            var b = Nx.prototype.Hc.call(this);
            b.H(new Y("IMG",{
                src: "/img/jp-logo-128x128.png" + it(),
                "class": "ts-admin-user-ico"
            }));
            return b
        }
        ;
        return new a(this)
    }
    ;
    function Tx(a) {
        fu("user/albums", null, function(b) {
            b && a(b.items)
        }, {
            lb: !0
        })
    }
    function Ux(a, b) {
        fu("album/images", {
            aid: a
        }, function(c) {
            c && b(c.items)
        }, {
            lb: !0
        })
    }
    ;function Vx(a, b, c, d, e, f) {
        if (6 == arguments.length)
            Wx(this, a, b, c, d, e, f);
        else {
            if (0 != arguments.length)
                throw Error("Insufficient matrix parameters");
            this.g = this.j = 1;
            this.i = this.h = this.l = this.m = 0
        }
    }
    function Wx(a, b, c, d, e, f, g) {
        if ("number" !== typeof b || "number" !== typeof c || "number" !== typeof d || "number" !== typeof e || "number" !== typeof f || "number" !== typeof g)
            throw Error("Invalid transform parameters");
        a.g = b;
        a.i = c;
        a.h = d;
        a.j = e;
        a.l = f;
        a.m = g;
        return a
    }
    function Xx(a, b, c) {
        a.g *= b;
        a.i *= b;
        a.h *= c;
        a.j *= c
    }
    Vx.prototype.translate = function(a, b) {
        this.l += a * this.g + b * this.h;
        this.m += a * this.i + b * this.j;
        return this
    }
    ;
    Vx.prototype.toString = function() {
        return "matrix(" + [this.g, this.i, this.h, this.j, this.l, this.m].join() + ")"
    }
    ;
    Vx.prototype.transform = function(a, b, c, d, e) {
        var f = b;
        for (b += 2 * e; f < b; ) {
            e = a[f++];
            var g = a[f++];
            c[d++] = e * this.g + g * this.h + this.l;
            c[d++] = e * this.i + g * this.j + this.m
        }
    }
    ;
    function Yx(a, b) {
        this.x = a || 0;
        this.y = b || 0
    }
    k = Yx.prototype;
    k.X = function(a, b) {
        this.x = a;
        this.y = b
    }
    ;
    k.Fc = function() {
        return new this.constructor(this.x,this.y)
    }
    ;
    k.Ec = function(a) {
        return a instanceof Yx && this.x === a.x && this.y === a.y
    }
    ;
    k.translate = function(a, b) {
        this.x += a;
        this.y += b
    }
    ;
    k.transform = function(a) {
        var b = [this.x, this.y];
        a.transform(b, 0, b, 0, 1);
        this.x = b[0];
        this.y = b[1]
    }
    ;
    function Zx(a, b) {
        switch (b) {
        case 90:
            b = a.x;
            a.x = -a.y;
            a.y = b;
            break;
        case 180:
            a.x = -a.x;
            a.y = -a.y;
            break;
        case 270:
            b = a.x,
            a.x = a.y,
            a.y = -b
        }
    }
    ;function $x(a, b, c, d) {
        this.x = a;
        this.y = b;
        this.width = c;
        this.height = d
    }
    k = $x.prototype;
    k.Fc = function() {
        return new this.constructor(this.x,this.y,this.width,this.height)
    }
    ;
    k.Ec = function(a) {
        return a instanceof $x && this.x === a.x && this.y === a.y && this.width === a.width && this.height === a.height
    }
    ;
    k.X = function(a, b) {
        this.x = a;
        this.y = b
    }
    ;
    k.Cb = function() {
        return new Yx(this.x,this.y)
    }
    ;
    k.translate = function(a, b) {
        this.x += a;
        this.y += b
    }
    ;
    k.transform = function(a) {
        var b = [this.x, this.y, this.x + this.width, this.y + this.height];
        a.transform(b, 0, b, 0, 2);
        this.x = b[0];
        this.y = b[1];
        this.width = b[2] - b[0];
        this.height = b[3] - b[1]
    }
    ;
    function ay(a, b, c, d, e) {
        b instanceof $x && (c = b.y,
        d = b.width,
        e = b.height,
        b = b.x);
        return a.x <= b + d && b <= a.x + a.width && a.y <= c + e && c <= a.y + a.height
    }
    k.sd = function(a) {
        var b = Math.max(this.x, a.x)
          , c = Math.min(this.x + this.width, a.x + a.width);
        if (b <= c) {
            var d = Math.max(this.y, a.y);
            a = Math.min(this.y + this.height, a.y + a.height);
            if (d <= a)
                return new $x(b,d,c - b,a - d)
        }
        return null
    }
    ;
    k.contains = function(a, b, c, d) {
        a instanceof $x && (b = a.y,
        c = a.width,
        d = a.height,
        a = a.x);
        return this.x <= a && this.x + this.width >= a + c && this.y <= b && this.y + this.height >= b + d
    }
    ;
    k.add = function(a, b) {
        var c = this.x + this.width
          , d = this.y + this.height;
        this.x > a && (this.x = a);
        this.y > b && (this.y = b);
        c < a && (c = a);
        d < b && (d = b);
        this.width = c - this.x;
        this.height = d - this.y
    }
    ;
    function by(a, b) {
        var c = a.width
          , d = a.height;
        0 > (c | d) && (a.x = b.x,
        a.y = b.y,
        a.width = b.width,
        a.height = b.height);
        var e = b.width
          , f = b.height;
        if (!(0 > (e | f))) {
            var g = a.x
              , h = a.y;
            c += g;
            d += h;
            var l = b.x;
            b = b.y;
            e += l;
            f += b;
            g > l && (g = l);
            h > b && (h = b);
            c < e && (c = e);
            d < f && (d = f);
            a.x = g;
            a.y = h;
            a.width = c - g;
            a.height = d - h
        }
    }
    function cy(a) {
        var b = Math.floor(a.x)
          , c = Math.floor(a.y);
        return new $x(b,c,Math.ceil(a.x + a.width) - b,Math.ceil(a.y + a.height) - c)
    }
    ;function dy() {
        this.Y = []
    }
    dy.prototype.Fc = function() {
        var a = new this.constructor;
        a.Y = this.Y.slice(0);
        return a
    }
    ;
    function ey(a, b, c) {
        var d = a.Y[a.Y.length - 2]
          , e = a.Y[a.Y.length - 1]
          , f = (b - d) / 3
          , g = (c - e) / 3;
        fy(a, d + f, e + g, d + 2 * f, e + 2 * g, b, c);
        a.ob = null
    }
    function fy(a, b, c, d, e, f, g) {
        a.Y.push(b, c);
        a.Y.push(d, e);
        a.Y.push(f, g);
        a.ob = null
    }
    dy.prototype.transform = function(a, b, c) {
        a.transform(this.Y, b || 0, this.Y, b || 0, c || this.Y.length >> 1);
        this.ob = null
    }
    ;
    dy.prototype.translate = function(a, b) {
        for (var c = 0, d = this.Y.length; c < d; c += 2)
            this.Y[c] += a,
            this.Y[c + 1] += b;
        this.ob = null
    }
    ;
    function gy(a, b) {
        a = a.Y;
        b.beginPath();
        b.moveTo(a[0], a[1]);
        for (var c = 2, d = a.length; c < d; c += 6) {
            var e = b
              , f = a[c + 2]
              , g = a[c + 3]
              , h = a[c + 4]
              , l = a[c + 5];
            e.bezierCurveTo(a[c], a[c + 1], f, g, .001 * f + .999 * h, .001 * g + .999 * l);
            e.lineTo(h, l)
        }
        b.closePath()
    }
    dy.prototype.Ob = function() {
        if (!this.ob) {
            for (var a = new Yx(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY), b = new Yx(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY), c = this.Y, d = 0, e = c.length - 2; d < e; d += 6) {
                var f = a
                  , g = b
                  , h = c
                  , l = d;
                l = l || 0;
                h[l] < f.x && (f.x = h[l]);
                h[l] > g.x && (g.x = h[l]);
                h[l + 6] < f.x && (f.x = h[l + 6]);
                h[l + 6] > g.x && (g.x = h[l + 6]);
                for (var m = hy(h, l), n = 0; n < m.length; n++) {
                    var q = m[n];
                    0 <= q && 1 >= q && (q = iy(q, h, l),
                    q < f.x && (f.x = q),
                    q > g.x && (g.x = q))
                }
                l++;
                h[l] < f.y && (f.y = h[l]);
                h[l] > g.y && (g.y = h[l]);
                h[l + 6] < f.y && (f.y = h[l + 6]);
                h[l + 6] > g.y && (g.y = h[l + 6]);
                m = hy(h, l);
                for (n = 0; n < m.length; n++)
                    q = m[n],
                    0 <= q && 1 >= q && (q = iy(q, h, l),
                    q < f.y && (f.y = q),
                    q > g.y && (g.y = q))
            }
            this.ob = new $x(a.x,a.y,b.x - a.x,b.y - a.y)
        }
        return this.ob
    }
    ;
    function hy(a, b) {
        var c = a[b]
          , d = a[b + 2]
          , e = a[b + 4]
          , f = a[b + 6];
        a = -c + 3 * (d - e) + f;
        1E-9 > Math.abs(a) && (f += 1E-9,
        a = -c + 3 * (d - e) + f);
        b = -c + 2 * d - e;
        c = -Math.sqrt(-c * (e - f) + d * (d - e - f) + e * e);
        return [(b + c) / a, (b - c) / a]
    }
    function iy(a, b, c) {
        var d = 1 - a;
        return d * (d * d * b[c] + 3 * a * (d * b[c + 2] + a * b[c + 4])) + a * a * a * b[c + 6]
    }
    ;function jy(a, b, c) {
        var d = document.createElementNS("http://www.w3.org/2000/svg", a);
        if (b)
            if ("string" === typeof b)
                re(d, b);
            else if (Array.isArray(b))
                te(d, b);
            else
                for (var e in b)
                    d.setAttribute(e, b[e]);
        for (e = 2; e < arguments.length; e++)
            Nd(d, arguments[e]);
        return d
    }
    ;function ky() {
        return hu("user/removeMessage", null, "POST")
    }
    function ly() {
        var a = A.googlefc = A.googlefc || {};
        "callbackQueue"in a || (a.callbackQueue = []);
        return a
    }
    function my() {
        A.Cookiebot.show()
    }
    function ny(a) {
        var b = new fk(a)
          , c = b.i.toLowerCase() !== A.location.hostname.toLowerCase()
          , d = fb(b.i.toLowerCase(), "sc-");
        c && !d && b.h.set("dontredirect", 1);
        var e = Vs(b);
        if (c && !d) {
            var f;
            e = e.vb(function(g) {
                if (g instanceof dh)
                    throw g;
                b = new fk(a);
                hk(b, A.location.hostname);
                return f = Vs(b)
            }).vb(function(g) {
                g instanceof dh && f && f.cancel();
                throw g;
            })
        }
        return e
    }
    var oy = {
        "public": "Public",
        link: "Anyone with the link",
        "private": "Private"
    }
      , py = {
        "public": "globe",
        link: "link",
        "private": "lock-alt"
    };
    function qy(a) {
        return sl(cm(py[a], "regular", {
            title: V("Visibility") + ": " + oy[a],
            "class": "ts-ico-color ts-vis-ico"
        }))
    }
    ;function Yw(a) {
        yx.call(this, a);
        a.yb() && (this.pb = this.pb || {},
        this.pb[0] = !0)
    }
    z(Yw, yx);
    Yw.prototype.getData = function() {
        return yx.prototype.getData.call(this)
    }
    ;
    Yw.prototype.Hc = function() {
        function a() {
            Ax.apply(this, arguments)
        }
        var b = this.getData();
        z(a, Ax);
        a.Error = Sj;
        a.prototype.oc = function() {
            var c = Ax.prototype.oc.call(this);
            return 3 !== c && "private" === Xw(b) ? 0 : c
        }
        ;
        return new a(b)
    }
    ;
    Yw.prototype.rf = function() {
        var a = Xw(this.getData())
          , b = new Bx(this.getData());
        void 0 !== a && b.Aa(qy(a), 0);
        return b
    }
    ;
    Yw.prototype.Qd = function() {
        return this.getData().ea().album_id
    }
    ;
    function ry(a, b) {
        var c = v(zx, "values").call(zx)
          , d = [];
        c = y(c);
        for (var e = c.next(); !e.done; e = c.next())
            e = e.value,
            e instanceof Yw && e.getData().ea().album_id === a && d.push(e);
        a = y(d);
        for (d = a.next(); !d.done; d = a.next()) {
            c = d = d.value;
            e = b;
            var f = c.getData()
              , g = Mc(f.pa);
            g.image = e;
            e = new f.constructor(g);
            f = new c.constructor(e);
            e = c;
            c = f;
            if (f = e.getParent()) {
                g = bk(f, e);
                if (-1 === g)
                    throw Error("Child is not in parent component");
                f.Aa(c, g, e.aa);
                f.Ib(e, e.aa)
            } else
                e.aa && (f = e.o(),
                Wj(c, f.parentNode, f),
                e.fa(),
                Qd(f));
            d.G()
        }
    }
    ;function sy() {
        return K("SPAN", null, K("B", null, V("Notice")), ": " + V("Puzzles will not be available to users who just play them."))
    }
    function ty(a, b, c, d, e, f) {
        var g = f ? new Y("DIV",{
            style: "margin-top:.4em;max-width:100%;flex:0 0 auto;visibility:hidden"
        }) : null
          , h = new Y("DIV",{
            style: "flex:1 1 auto;overflow-y:auto;overflow-x:hidden",
            "class": nu(["ts-viewmod-nopevents"], !0).join(" ")
        })
          , l = new yp(a);
        a = new U(l);
        var m = new Y("DIV",{
            style: "display:flex;flex-flow:column;overflow:hidden"
        });
        Bp(l, !1);
        N(l, a);
        Ra(c, function(n, q) {
            function p() {
                Y.apply(this, arguments)
            }
            var u = d ? d(n) : n;
            z(p, Y);
            p.Error = Sj;
            p.prototype.J = function() {
                Y.prototype.J.call(this);
                var x = this.s
                  , B = this.ka();
                g && B.C(x, ["mouseover", "mouseout"], function(E) {
                    var I = g.s
                      , G = f[q];
                    sm(I, !1);
                    G && "mouseover" === E.type && (Od(I),
                    Nd(I, G),
                    sm(I, !0))
                });
                B.C(x, "click", function(E) {
                    0 === E.button && (e(n),
                    l.G())
                })
            }
            ;
            u = new p("BUTTON",{
                type: "submit",
                "class": "ts-option"
            },u);
            h.H(u)
        });
        m.H(ul(b, "DIV", {
            style: "margin-bottom:.4em;flex:0 0 auto"
        }));
        l.H(m);
        l.L(!0);
        m.H(h, m.aa);
        g && m.H(g, m.aa);
        l.la()
    }
    function uy(a) {
        var b = V("Select destination album");
        Tx(function(c) {
            ty(b, V("Choose an album below."), c, function(d) {
                return d.Ba()
            }, a)
        })
    }
    function vy(a, b, c) {
        Tx(function(d) {
            var e, f = d.length;
            if (b)
                for (e = 0; e < f; e++)
                    if (d[e].ea().album_id === b) {
                        d.splice(e, 1);
                        --f;
                        break
                    }
            if ("private" !== c) {
                var g = [];
                for (e = 0; e < f; e++)
                    g[e] = "private" === Xw(d[e]) ? sy() : ""
            }
            ty(V("Move puzzle to album"), V("Choose an album below."), d, function(h) {
                return h.Ba()
            }, function(h) {
                fu("puzzle/move", {
                    pid: a,
                    aid: h.ea().album_id
                }, function(l) {
                    l && wl()
                }, "POST")
            }, g)
        });
        return !1
    }
    function wy(a, b) {
        Jp(K("P", null, a), b)
    }
    function xy(a, b) {
        Ux(a, function(c) {
            c.unshift(null);
            ty(V("Select album cover"), V("Choose an image below."), c, function(d) {
                if (d) {
                    var e = {
                        name: ""
                    };
                    e.image = d;
                    e.__c = "Image";
                    d = Ix(e).Ba()
                } else
                    d = ul(V("No Cover"), "DIV", {
                        "class": "smallShadow ts-empty"
                    });
                return d
            }, function(d) {
                b(a, d)
            })
        })
    }
    function yy(a) {
        xy(a, zy)
    }
    function zy(a, b) {
        var c = {
            aid: a
        };
        if (b) {
            c.image_id = b.pa.image_id;
            var d = "POST"
        } else
            d = "DELETE";
        fu("album/cover", c, function(e, f) {
            f || (ry(a, b),
            Wt(Ut(), V("Album cover has been set.")))
        }, d)
    }
    ;function Ay() {}
    function By(a, b) {
        return void 0 !== a.g && "1" === a.g[b]
    }
    function Cy(a, b) {
        return void 0 !== a.h && "1" === a.h[b]
    }
    function Dy() {
        return new t.Promise(function(a) {
            try {
                A.__tcfapi("getInAppTCData", 2, function(b, c) {
                    if (c)
                        try {
                            var d = new Ay;
                            d.g = b.purpose.consents;
                            d.h = b.purpose.legitimateInterests;
                            a(d)
                        } catch (e) {
                            a(null)
                        }
                    else
                        a(null)
                })
            } catch (b) {
                a(null)
            }
        }
        )
    }
    ;function Ey() {
        var a = Error.call(this, "abdctd");
        this.message = a.message;
        "stack"in a && (this.stack = a.stack)
    }
    z(Ey, Error);
    function Fy() {
        M.call(this)
    }
    z(Fy, M);
    k = Fy.prototype;
    k.start = function() {
        var a, b, c = Math.min(this.sg || Number.MAX_VALUE, 31);
        void 0 !== this.Ue && (a = yh() / 1E3 - this.Ue) < c && (b = Di(1E3 * (c - a)));
        a = function() {
            this.Zg = !0;
            return this.ge().then(function(d) {
                this.Ue = yh() / 1E3;
                this.sg && Gy(this, !0);
                return d
            }
            .bind(this))
        }
        .bind(this);
        this.Re = b ? b.then(a) : a();
        return Rh(this.Re)
    }
    ;
    k.Ze = function() {}
    ;
    k.stop = function() {
        this.Xd() && (this.Zg && (this.Ze(),
        this.Zg = void 0),
        Gy(this, !1),
        this.Re.cancel(),
        this.Re = void 0)
    }
    ;
    function Gy(a, b) {
        b ? a.be || (a.be = new U(a),
        a.be.C(A, "mousedown", function() {
            var c = yh() / 1E3;
            c - this.Ue > this.sg && (this.$c(),
            this.Ue = c)
        })) : a.be && (a.be.G(),
        a.be = void 0)
    }
    k.hg = function(a) {
        (this.sg = a) ? this.Xd() && Gy(this, !0) : Gy(this, !1)
    }
    ;
    k.Xd = function() {
        return !!this.Re
    }
    ;
    k.$c = function() {}
    ;
    k.ve = function() {
        return !1
    }
    ;
    k.D = function() {
        this.stop();
        M.prototype.D.call(this)
    }
    ;
    function Hy(a, b) {
        this.h = a;
        this.g = b
    }
    function Iy(a) {
        return new Hy(a.name,a.id)
    }
    Hy.prototype.toJSON = function() {
        return {}
    }
    ;
    function Jy() {}
    Jy.prototype.i = function() {
        return [[300, 250], [336, 280], [728, 90], [300, 600], [320, 100], [320, 50], [468, 60], [234, 60], [120, 600], [120, 240], [160, 600], [300, 1050], [970, 90], [970, 250], [250, 250], [200, 200], [180, 150], [125, 125]]
    }
    ;
    Jy.prototype.g = function(a) {
        var b = [];
        try {
            for (var c = this.i(), d = y(c), e = d.next(); !e.done; e = d.next()) {
                var f = e.value;
                f[0] <= a.width && f[1] <= a.height && b.push([f[0], f[1]])
            }
            b = Ky(b)
        } catch (g) {
            W("aps", g)
        }
        return b
    }
    ;
    function Ky(a) {
        return a.sort(function(b, c) {
            return c[0] * c[1] - b[0] * b[1]
        })
    }
    var Ly = [[970, 250], [300, 50], [320, 50], [728, 90], [970, 90], [300, 1050], [160, 600], [300, 250], [120, 60], [640, 1136], [750, 1334], [1080, 1920], [120, 20], [168, 28], [216, 36]];
    function My() {
        var a = Error.call(this, "sgpt");
        this.message = a.message;
        "stack"in a && (this.stack = a.stack)
    }
    z(My, Error);
    function Ny() {}
    var Oy, Py;
    z(Ny, Jy);
    Ny.prototype.j = function(a, b, c) {
        c = c.h;
        b = this.g(b);
        a = a.id || (a.id = vh());
        return this.h(c, a, b)
    }
    ;
    Ny.prototype.h = function(a, b, c) {
        return new Qy(a,b,c)
    }
    ;
    function Ry(a, b, c) {
        if (gc(a[b]))
            return a[b].apply(a, Array.prototype.slice.call(arguments, 2));
        throw new My;
    }
    function Sy() {
        return A.googletag = A.googletag || {
            cmd: []
        }
    }
    function Ty() {
        if (!Py) {
            var a = Sy();
            Py = Ry(a, "pubads")
        }
        return Py
    }
    Ny.prototype.g = function(a) {
        var b = Jy.prototype.g.call(this, a);
        b.length && b.push([~~a.width, ~~a.height]);
        return Ky(b)
    }
    ;
    var Uy = new Ge;
    function Vy(a, b) {
        He.call(this, a);
        this.h = b
    }
    z(Vy, He);
    function Qy(a, b, c) {
        M.call(this);
        this.bh = a;
        this.yg = b;
        this.Yg = c
    }
    var Wy;
    z(Qy, Fy);
    k = Qy.prototype;
    k.qg = function(a) {
        Ry(a, "setCentering", !0)
    }
    ;
    k.ge = function() {
        return new Lg(function(a, b) {
            var c = Sy();
            Ry(c.cmd, "push", function() {
                try {
                    if (this.ga = Xy(this.bh, this.yg, this.Yg) || void 0) {
                        this.Bg = Yy().C(Uy, function(f) {
                            f.h.slot === this.ga && (f = f.h.size,
                            Ca(f) && "number" === typeof f[0] ? a(new J(f[0],f[1])) : null === f ? a(void 0) : b("adust"))
                        }
                        .bind(this));
                        var d = Ty();
                        this.qg(d);
                        Ry(this.ga, "addService", d);
                        Ry(c, "enableServices");
                        var e = Ry(this.ga, "getSlotElementId");
                        Ry(c, "display", e);
                        Ry(d, "isInitialLoadDisabled") && this.$c()
                    } else
                        b("adgu")
                } catch (f) {
                    Zy(this),
                    b(f)
                }
            }
            .bind(this))
        }
        ,this)
    }
    ;
    function Zy(a) {
        try {
            if (a.Bg) {
                var b = Yy();
                Ve(b.Nb, a.Bg)
            }
            if (a.ga) {
                var c = Sy();
                Ry(c, "destroySlots", [a.ga]);
                a.ga = void 0
            }
        } catch (d) {
            W("adcdgpt", d)
        }
    }
    k.Ze = function() {
        Zy(this)
    }
    ;
    k.$c = function() {
        try {
            if (this.ga) {
                var a = Ty();
                Ry(a, "refresh", [this.ga], {
                    changeCorrelator: !1
                })
            }
        } catch (b) {
            Xi("adrgpt", b)
        }
    }
    ;
    k.ve = function() {
        return !0
    }
    ;
    function Xy(a, b, c) {
        var d = Sy();
        if (a = Ry(d, "defineSlot", a, c, b))
            Ry(a, "setForceSafeFrame", !0),
            Ry(a, "clearTargeting"),
            Ry(a, "clearCategoryExclusions"),
            Ry(a, "setCollapseEmptyDiv", !1);
        return a
    }
    function Yy() {
        if (!Wy) {
            Wy = new qf;
            var a = Ty();
            Ry(a, "addEventListener", "slotRenderEnded", function(b) {
                Wy.dispatchEvent(new Vy(Uy,b))
            })
        }
        return Wy
    }
    ;function $y() {}
    z($y, Jy);
    $y.prototype.j = function(a, b, c) {
        function d() {
            M.call(this)
        }
        var e = this;
        z(d, Fy);
        d.W = oe;
        d.prototype.ge = function() {
            if (this.s = e.h(b, c) || void 0) {
                var f = this;
                return Sh($l(function() {
                    if (f.s)
                        return Nd(a, f.s),
                        Xl(function() {
                            if (f.s)
                                return Rf(f.s)
                        })
                }))
            }
            return Tg()
        }
        ;
        d.prototype.Ze = function() {
            Qd(this.s);
            this.s = void 0
        }
        ;
        d.prototype.$c = function() {
            this.stop();
            this.start()
        }
        ;
        d.prototype.ve = function() {
            return !0
        }
        ;
        return new d
    }
    ;
    function az() {}
    var bz;
    z(az, $y);
    az.prototype.h = function(a) {
        var b, c = {
            background: "#FF1493",
            "border-radius": "8px",
            width: km(a.width),
            height: km(a.height)
        }, d = K("DIV", {
            style: "text-align:center;color:#fff;overflow-y:auto;justify-content:center"
        }, b = K("DIV", {
            style: "position:absolute;filter:blur(10px);animation: 2s ease-out 0s infinite alternate ts-anim-opacity;z-index:-1"
        }), K("DIV", {
            style: "padding:.6em 1em;"
        }, K("H2", {
            style: "margin:0 0 .4em"
        }, "We noticed you're using an ad blocker."), "We show only ", K("SPAN", {
            style: "font-weight:bold"
        }, "one banner on a page"), " and we rely on the advertising, please ", a = K("A", null, "turn off"), " your ad blocker for this site, thank you."));
        O(d, "ts-flxdspl");
        O(d, "ts-alitms-cntr");
        R(d, c);
        R(b, c);
        b = Ws("faq", null, "Q3");
        cd(a, b);
        return d
    }
    ;
    function cz() {
        M.call(this)
    }
    z(cz, M);
    k = cz.prototype;
    k.fill = function(a, b) {
        this.ed = L("DIV");
        this.$a.appendChild(this.ed);
        R(this.ed, {
            height: "100%",
            margin: "0 auto",
            overflow: "hidden"
        });
        var c = this.$a.getBoundingClientRect();
        this.ha = a.j(this.ed, new J(c.width,c.height), b)
    }
    ;
    k.start = function() {
        return this.vi && !this.ha.ve() ? t.Promise.resolve(void 0) : this.ha.start().then(function(a) {
            a && this.Cg(!0);
            return a
        }
        .bind(this))
    }
    ;
    k.stop = function() {
        this.ha && (this.ha.stop(),
        this.Cg(!1),
        this.vi = !0)
    }
    ;
    k.Xd = function() {
        return !!this.ha && this.ha.Xd()
    }
    ;
    k.hg = function(a) {
        a && this.ha.hg(a)
    }
    ;
    k.D = function() {
        this.stop();
        this.ha && (this.ha.G(),
        this.ha = void 0);
        this.ed && (Qd(this.ed),
        this.ed = void 0);
        this.$a && (Qd(this.$a),
        delete this.$a);
        M.prototype.D.call(this)
    }
    ;
    function dz(a) {
        return function(b) {
            function c() {
                M.call(this);
                this.$a = g;
                ne(this, function() {
                    Qd(h)
                })
            }
            b = b.width > b.height;
            if (Zt()) {
                var d = em("Remove advertisements...");
                R(d, {
                    display: "block"
                });
                d = K("A", {
                    href: Ws("settings", {
                        ret: Uk().toString()
                    })
                }, d);
                R(d, {
                    "text-decoration": "none"
                })
            }
            var e = K("SPAN", "minorinf", "Advertisement")
              , f = K("DIV", null, e, d)
              , g = L("DIV")
              , h = K("DIV", null, g, f);
            e.title = "Advertisement";
            R(e, {
                overflow: "hidden",
                "text-overflow": "ellipsis"
            });
            d = b ? "row" : "column";
            R(h, {
                height: "100%",
                display: "flex",
                "-ms-flex-direction": d,
                "-moz-flex-direction": d,
                "-webkit-flex-direction": d,
                "flex-direction": d,
                overflow: "hidden",
                gap: ".2em",
                margin: "0 auto"
            });
            R(f, {
                display: "flex",
                "font-size": "small",
                gap: ".2em",
                "max-height": "100%"
            });
            sm(f, !1);
            R(g, {
                flex: "1 1 auto"
            });
            b ? (R(f, {
                "writing-mode": "vertical-rl",
                "text-orientation": "mixed",
                "align-self": "center"
            }),
            R(h, {
                "justify-content": "center"
            })) : R(f, {
                "justify-content": "center"
            });
            a.appendChild(h);
            z(c, cz);
            c.W = oe;
            c.prototype.Cg = function(l) {
                sm(f, l);
                R(this.$a, {
                    flex: l ? "0 0 auto" : "1 1 auto"
                })
            }
            ;
            return new c
        }(a.getBoundingClientRect())
    }
    ;function ez() {}
    var fz;
    z(ez, Jy);
    ez.prototype.j = function(a, b, c) {
        function d() {
            M.call(this)
        }
        var e = c.g;
        b = this.g(b);
        var f = new J(b[0][0],b[0][1]);
        b = km(f.width);
        c = km(f.height);
        var g = {
            "max-width": b,
            "max-height": c,
            width: b,
            height: c
        };
        R(a, "clip-path", "inset(0 0 0 0)");
        z(d, Fy);
        d.W = oe;
        d.prototype.ge = function() {
            if (void 0 === this.s) {
                var h = L("DIV");
                R(h, g);
                a.appendChild(h);
                this.s = h;
                this.s.id = e;
                var l = !1;
                return bh(new Lg(function(m) {
                    var n = A.adpushup = A.adpushup || {};
                    n.que = n.que || [];
                    n.que.push(function() {
                        l || (n.triggerAd(e),
                        m(f))
                    })
                }
                ), function() {
                    l = !0
                })
            }
            return Tg(f)
        }
        ;
        d.prototype.Ze = function() {}
        ;
        d.prototype.ve = function() {
            return !0
        }
        ;
        d.prototype.D = function() {
            this.s && (Qd(this.s),
            this.s = void 0);
            Fy.prototype.D.call(this)
        }
        ;
        return new d
    }
    ;
    ez.prototype.i = function() {
        return Jy.prototype.i.call(this)
    }
    ;
    function gz() {}
    var hz;
    z(gz, $y);
    gz.prototype.h = function() {
        return null
    }
    ;
    function iz() {}
    var jz;
    z(iz, $y);
    iz.prototype.h = function(a, b) {
        var c = L("DIV")
          , d = this.g(a);
        R(c, {
            position: "relative",
            "font-size": "small",
            "word-wrap": "break-word",
            "background-color": "rgba(0,0,255,0.1)",
            margin: "0 auto"
        });
        Ra(d, function(e) {
            var f = K("DIV", {
                style: "position:absolute;background:rgb(var(--text-color));opacity:.04"
            });
            Ff(f, (d[0][0] - e[0]) / 2, 0);
            Qf(f, e[0], e[1]);
            c.appendChild(f)
        });
        Qf(c, a);
        a = {
            sizes: d
        };
        void 0 !== b && (a.unit = b);
        Md(c, K("DIV", {
            style: "text-align:center;opacity:.4"
        }, "Ad place (" + mo(a) + ")"));
        return c
    }
    ;
    function kz() {}
    var lz;
    z(kz, $y);
    kz.prototype.h = function(a, b) {
        var c = this.g(a)
          , d = c[Math.floor(Math.random() * c.length)];
        a = new J(d[0],d[1]);
        b = K("DIV", null, "RandomSizeTest " + mo(d), K("DIV", {
            style: "font-size:small"
        }, "Possible sizes: " + mo(c) + (b ? "; unit: " + mo(b) : "")));
        R(b, {
            "background-color": "rgba(0,0,255,0.1)",
            "text-align": "center",
            overflow: "hidden",
            margin: "0 auto",
            "overflow-wrap": "break-word"
        });
        Qf(b, a);
        return b
    }
    ;
    function mz() {}
    var nz;
    z(mz, Ny);
    function oz() {
        var a = A.apstag;
        if (Da(a))
            return a;
        throw new My;
    }
    mz.prototype.h = function(a, b, c) {
        function d() {
            Qy.apply(this, arguments)
        }
        z(d, Qy);
        d.W = oe;
        d.prototype.qg = function(e) {
            Qy.prototype.qg.call(this, e);
            Ry(e, "disableInitialLoad");
            Ry(e, "enableSingleRequest");
            Ry(e, "setCentering", !0)
        }
        ;
        d.prototype.ge = function() {
            oz().init({
                pubID: "6ff91baa-7367-4215-b8f3-d189ea6c2f39",
                adServer: "googletag",
                bidTimeout: 2E3,
                gdpr: {
                    cmpTimeout: 10
                }
            });
            return Qy.prototype.ge.call(this)
        }
        ;
        d.prototype.$c = function() {
            try {
                if (this.ga) {
                    var e = oz()
                      , f = Qy.prototype.$c
                      , g = this;
                    Ry(e, "fetchBids", {
                        slots: [{
                            slotID: this.yg,
                            slotName: this.bh,
                            sizes: this.Yg
                        }]
                    }, function() {
                        var h = Sy();
                        Ry(h.cmd, "push", function() {
                            Ry(e, "setDisplayBids");
                            f.call(g)
                        })
                    })
                }
            } catch (h) {
                Xi("apsrf", h)
            }
        }
        ;
        return new d(a,b,c)
    }
    ;
    mz.prototype.i = function() {
        return Ly
    }
    ;
    function pz(a) {
        switch (a) {
        case "t":
            a = jz || (jz = new iz);
            break;
        case "r":
            a = lz || (lz = new kz);
            break;
        case "e":
            a = hz || (hz = new gz);
            break;
        case "g":
            a = Oy || (Oy = new Ny);
            break;
        case "a":
            a = nz || (nz = new mz);
            break;
        case "p":
            a = fz || (fz = new ez);
            break;
        default:
            W("aupt: " + a),
            a = hz || (hz = new gz)
        }
        return a
    }
    function qz() {
        return ii().then(function() {
            return new t.Promise(function(a) {
                var b = zd(Os[0]);
                a(!b || "block" !== window.getComputedStyle(b).display)
            }
            )
        })
    }
    function rz(a, b, c) {
        a = a.g(new J(b,c));
        return a.length ? new J(a[0][0],a[0][1]) : null
    }
    ;function sz() {
        var a = t.Promise.resolve(!0);
        return t.Promise.all([a.then(function(b) {
            if (!b)
                throw new Ey;
        }), qz().then(function(b) {
            if (b)
                throw new Ey;
        })]).then(cc, function(b) {
            if (b instanceof Ey)
                return !0;
            throw b;
        })
    }
    function tz(a, b, c, d) {
        v(a, "fill").call(a, b, c || void 0);
        d && a.hg(d);
        uz.add(a);
        ne(a, function() {
            uz.delete(a)
        });
        return a.start()
    }
    function vz(a, b) {
        var c = pz(b.unit.provider)
          , d = Iy(b.unit)
          , e = [ii()];
        if (!(c instanceof Ny)) {
            var f = e.length;
            e.push(Dy())
        }
        return t.Promise.all(e).then(function(g) {
            var h = ud(a);
            return h ? sz().then(function(l) {
                var m = dz(h);
                if (l)
                    c = bz || (bz = new az),
                    d = null;
                else if (void 0 !== f) {
                    var n = g[f];
                    n && !By(n, 0) && (Cy(n, 1) || By(n, 1)) && (Cy(n, 6) || By(n, 6)) && (Cy(n, 8) || By(n, 8)) && (Cy(n, 9) || By(n, 9)) && (c = Oy || (Oy = new Ny),
                    d = new Hy("/12159107/uni"),
                    b.refresh = 30,
                    b.fas = void 0)
                }
                if (b.fas) {
                    if (l) {
                        var q = bz || (bz = new az);
                        var p = null
                    } else
                        q = pz(b.fas.unit.provider),
                        p = Iy(b.fas.unit);
                    return t.Promise.resolve(!0).then(function(u) {
                        if (u) {
                            a: {
                                var x = c
                                  , B = b.fas.type;
                                u = q;
                                var E;
                                if (1 === B || 2 === B && (E = m.$a.getBoundingClientRect()) && (null === rz(x, E.width, E.height) || E.y + Math.floor(E.height) > Dd().height)) {
                                    E = wz();
                                    x = E.$a.getBoundingClientRect();
                                    if (rz(u, x.width, x.height)) {
                                        u = E;
                                        break a
                                    }
                                    E.G()
                                }
                                u = null
                            }
                            if (u)
                                return m && m.G(),
                                l || (c = q,
                                d = p),
                                u
                        }
                        return m
                    })
                }
                return m
            }).then(function(l) {
                if (l) {
                    var m = tz(l, c, d, b.refresh);
                    xz(m, b.thenFunc)
                }
                return l
            }) : t.Promise.resolve(void 0)
        })
    }
    function xz(a, b) {
        if (b) {
            var c = za(b);
            c ? a.then(c, ec) : W("adtfnf: " + b)
        }
        a.catch(function(d) {
            if (!(d instanceof dh)) {
                var e;
                d instanceof Ey || d instanceof My ? Vt() && (e = Xi) : e = W;
                e && (d instanceof Error ? e("adsplc", d) : e("adsplc: " + d))
            }
        })
    }
    function wz() {
        var a = ud("ts-vp-wrap");
        a = ll(a)[0];
        var b = L("DIV");
        R(b, {
            position: "absolute",
            width: "100%",
            height: "100%",
            padding: "1em",
            "box-sizing": "border-box",
            "max-width": "calc(350px + 2 * 1em)",
            overflow: "hidden"
        });
        a.appendChild(b);
        a = dz(b);
        ne(a, function() {
            Qd(b)
        });
        return a
    }
    function yz(a) {
        for (var b = y(uz), c = b.next(); !c.done; c = b.next())
            c = c.value,
            a ? c.Xd() || c.start().catch(function(d) {
                if (!(d instanceof dh))
                    throw d;
            }) : c.stop()
    }
    var uz = new t.Set;
    function zz() {
        M.call(this);
        this.h = {};
        try {
            var a = A.AudioContext || A.webkitAudioContext;
            a && (this.g = new a,
            this.j = (this.g.createGain || this.g.createGainNode).call(this.g),
            this.j.connect(this.g.destination))
        } catch (c) {
            this.g = null,
            Xi("AudioContext is not supported (" + c.message + ")")
        }
        if (this.g && (Ab() || ng)) {
            var b = this;
            hi(function() {
                Ze(A, "touchstart", b.l, ni, b);
                Ze(A, "touchend", b.l, ni, b)
            })
        }
    }
    z(zz, M);
    zz.prototype.l = function() {
        try {
            var a = this.g.createBuffer(1, 1, 22050)
              , b = this.g.createBufferSource();
            b.buffer = a;
            b.connect(this.j);
            (b.start || b.noteOn).call(b, 0)
        } catch (c) {
            W("auuo", c)
        }
    }
    ;
    function Az(a, b, c, d) {
        if (a.g)
            if (b in a.h)
                c && c.call(d, a.h[b]);
            else {
                var e = new oj;
                e.j = "arraybuffer";
                Q(e, "complete", function() {
                    if (!this.W()) {
                        var f = this
                          , g = function(l) {
                            f.W() || (f.h[b] = l,
                            c && c.call(d, l))
                        };
                        if (Dj(e)) {
                            var h = Fj(e);
                            h ? this.g.decodeAudioData(h, g, function() {
                                Xi("Error with decoding audio data of " + b);
                                g(null)
                            }) : g(null)
                        } else
                            g(null);
                        e.G()
                    }
                }, !1, a);
                uj(e, b)
            }
    }
    zz.prototype.m = function(a) {
        if (this.g && a) {
            var b = this
              , c = function() {
                var d = b.g.createBufferSource();
                d.buffer = a;
                d.connect(b.j);
                (d.start || d.noteOn).call(d, 0)
            };
            "resume"in this.g && "running" !== this.g.state ? this.g.resume().then(c) : c()
        }
    }
    ;
    zz.prototype.play = function(a, b) {
        if (!(this.i && this.i in b)) {
            this.i = void 0;
            var c;
            try {
                var d = L("AUDIO"), e;
                for (e in b) {
                    var f = d.canPlayType(b[e]);
                    if ("probably" === f) {
                        this.i = e;
                        break
                    } else
                        "maybe" === f && (c = e)
                }
            } catch (l) {}
            if (!this.i) {
                if (!c)
                    a: {
                        for (g in b) {
                            c = g;
                            break a
                        }
                        c = void 0
                    }
                this.i = c
            }
        }
        var g = this.i;
        a = a + "." + g;
        if (this.g)
            Az(this, a, this.m, this);
        else {
            c = this.h[a];
            try {
                if (th(c))
                    null == c || lg || (c.pause(),
                    c.currentTime = 0);
                else {
                    c = L("AUDIO");
                    var h = K("SOURCE", {
                        src: a,
                        type: b[g]
                    });
                    c.appendChild(h);
                    c = "play"in c ? c : null
                }
                this.h[a] = c && lg ? c.cloneNode(!0) : c;
                c && c.play()
            } catch (l) {
                this.h[a] = null,
                Xi("Cannot play a sound.", l)
            }
        }
    }
    ;
    zz.prototype.D = function() {
        M.prototype.D.call(this);
        this.g && (this.j.disconnect(),
        "close"in this.g && this.g.close(),
        this.g = this.j = this.h = null)
    }
    ;
    Aa(zz);
    var Bz = [];
    function Cz() {
        var a = [];
        Ra(Bz, function(b) {
            a.push(new t.Promise(b))
        });
        return t.Promise.all(a)
    }
    ;function Dz() {}
    ;function Ez(a) {
        a = Error.call(this, a);
        this.message = a.message;
        "stack"in a && (this.stack = a.stack);
        if (Error.captureStackTrace)
            Error.captureStackTrace(this, Ez);
        else if (a = Error().stack)
            this.stack = a;
        this.name = "EOFException"
    }
    z(Ez, Error);
    function Fz(a, b) {
        return (a[b] << 24) + ((a[b + 1] & 255) << 16) + ((a[b + 2] & 255) << 8) + (a[b + 3] & 255)
    }
    function Gz(a, b) {
        return 4294967296 * Fz(a, b) + 16777216 * (a[b + 4] & 255) + ((a[b + 5] & 255) << 16) + ((a[b + 6] & 255) << 8) + (a[b + 7] & 255)
    }
    function Hz(a, b, c) {
        a[b] = c >>> 24;
        a[b + 1] = c >> 16 & 255;
        a[b + 2] = c >> 8 & 255;
        a[b + 3] = c & 255
    }
    ;function Iz() {}
    Iz.prototype.close = function() {}
    ;
    Iz.prototype.flush = function() {}
    ;
    Iz.prototype.Sa = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (0 > b || b > a.length || 0 > c || b + c > a.length || 0 > b + c)
            throw Error();
        for (var d = 0; d < c; d++)
            this.write(a[b + d])
    }
    ;
    function Jz(a) {
        this.g = a
    }
    z(Jz, Iz);
    Jz.prototype.close = function() {
        this.g.close()
    }
    ;
    Jz.prototype.flush = function() {
        this.g.flush()
    }
    ;
    Jz.prototype.write = function(a) {
        this.g.write(a)
    }
    ;
    function Kz(a) {
        this.g = a
    }
    z(Kz, Jz);
    function Lz(a, b) {
        b = a.written + b;
        2147483647 < b && (b = 2147483647);
        a.written = b
    }
    k = Kz.prototype;
    k.write = function(a) {
        this.g.write(a);
        Lz(this, 1)
    }
    ;
    k.Sa = function(a, b, c) {
        this.g.Sa(a, b, c);
        Lz(this, c || a.length)
    }
    ;
    k.Za = function(a) {
        this.g.write(255 & a);
        Lz(this, 1)
    }
    ;
    k.sa = function(a) {
        this.g.write(a >> 8 & 255);
        this.g.write(a & 255);
        Lz(this, 2)
    }
    ;
    k.Fd = function(a) {
        this.g.write(a >>> 24);
        this.g.write(a >> 16 & 255);
        this.g.write(a >> 8 & 255);
        this.g.write(a & 255);
        Lz(this, 4)
    }
    ;
    k.je = function(a) {
        this.Fd(Math.floor(a / 4294967296));
        a %= 4294967296;
        this.g.write(a >>> 24);
        this.g.write(a >> 16 & 255);
        this.g.write(a >> 8 & 255);
        this.g.write(a & 255);
        Lz(this, 4)
    }
    ;
    k.cf = function(a) {
        var b = a.length;
        this.sa(b);
        for (var c = 0; c < b; c++) {
            var d = a.charCodeAt(c);
            if (32 > d || 127 < d)
                throw Error();
            this.g.write(d)
        }
        Lz(this, b)
    }
    ;
    k.size = function() {
        return this.written
    }
    ;
    function Mz(a) {
        this.h = Array(1024);
        this.j = Array(5);
        this.l = !1;
        this.g = 0;
        this.i = a;
        this.m = new Kz(this)
    }
    z(Mz, Iz);
    k = Mz.prototype;
    k.write = function(a) {
        1024 <= this.g && Nz(this);
        this.h[this.g++] = a
    }
    ;
    k.Sa = function(a, b, c) {
        Oz(this, a, b, c)
    }
    ;
    k.flush = function() {
        Nz(this);
        this.i.flush()
    }
    ;
    k.close = function() {
        this.flush();
        this.i.close()
    }
    ;
    function Oz(a, b, c, d) {
        c = c || 0;
        var e = !1;
        void 0 === d && (d = b.length);
        if (e || a.l)
            for (; 0 < d; )
                if (1024 <= a.g && Nz(a),
                1024 <= d && !e && 0 == a.g)
                    Pz(a, 1024),
                    a.i.Sa(b, c, 1024),
                    c += 1024,
                    d -= 1024;
                else {
                    var f = Math.min(d, 1024 - a.g);
                    go(b, c, a.h, a.g, f);
                    a.g += f;
                    c += f;
                    d -= f
                }
        else
            Nz(a),
            a.i.Sa(b, c, d)
    }
    function Nz(a) {
        0 != a.g && (a.l && Pz(a, a.g),
        a.i.Sa(a.h, 0, a.g),
        a.g = 0)
    }
    function Pz(a, b) {
        255 >= b ? (a.j[0] = 119,
        a.j[1] = b,
        a.i.Sa(a.j, 0, 2)) : (a.j[0] = 122,
        Hz(a.j, 1, b),
        a.i.Sa(a.j, 0, 5))
    }
    k.Za = function(a) {
        1024 <= this.g && Nz(this);
        this.h[this.g++] = a & 255
    }
    ;
    k.sa = function(a) {
        if (1024 >= this.g + 2) {
            var b = this.h
              , c = this.g;
            b[c] = a >> 8 & 255;
            b[c + 1] = a & 255;
            this.g += 2
        } else
            this.m.sa(a)
    }
    ;
    k.Fd = function(a) {
        1024 >= this.g + 4 ? (Hz(this.h, this.g, a),
        this.g += 4) : this.m.Fd(a)
    }
    ;
    k.je = function(a) {
        if (1024 >= this.g + 8) {
            var b = this.h
              , c = this.g;
            Hz(b, c, Math.floor(a / 4294967296));
            Hz(b, c + 4, a % 4294967296);
            this.g += 8
        } else
            this.m.je(a)
    }
    ;
    k.cf = function(a) {
        var b = a.length;
        this.sa(b);
        for (var c = 0; c < b; c++) {
            var d = a.charCodeAt(c);
            if (32 > d || 127 < d)
                throw Error();
            this.write(d)
        }
    }
    ;
    function Qz() {}
    Qz.prototype.zb = function() {
        return 0
    }
    ;
    Qz.prototype.close = function() {}
    ;
    Qz.prototype.fb = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (a) {
            if (0 > b || 0 > c || c > a.length - b)
                throw Error();
            if (!c)
                return 0
        } else
            throw Error();
        var d = this.wa();
        if (-1 == d)
            return -1;
        a[b] = d;
        var e;
        for (e = 1; e < c; e++) {
            d = this.wa();
            if (-1 == d)
                break;
            a[b + e] = d
        }
        return e
    }
    ;
    Qz.prototype.reset = function() {
        throw Error();
    }
    ;
    function Rz(a) {
        this.g = a
    }
    z(Rz, Qz);
    Rz.prototype.close = function() {
        this.g.close()
    }
    ;
    Rz.prototype.wa = function() {
        return this.g.wa()
    }
    ;
    Rz.prototype.zb = function() {
        return this.g.zb()
    }
    ;
    Rz.prototype.reset = function() {
        return this.g.reset()
    }
    ;
    function Sz(a) {
        this.g = a
    }
    z(Sz, Rz);
    k = Sz.prototype;
    k.fb = function(a, b, c) {
        return this.g.fb(a, b, c)
    }
    ;
    k.jc = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (0 > c)
            throw Error();
        for (var d = 0; d < c; ) {
            var e = this.g.fb(a, b + d, c - d);
            if (0 > e)
                throw new Ez;
            d += e
        }
    }
    ;
    k.Wa = function() {
        var a = this.g.wa();
        if (0 > a)
            throw new Ez;
        return a << 24 >> 24
    }
    ;
    k.Sc = function() {
        var a = this.g.wa();
        if (0 > a)
            throw new Ez;
        return a
    }
    ;
    k.va = function() {
        var a = Array(2);
        this.jc(a);
        return (a[0] & 255) << 24 >> 16 | a[1] & 255
    }
    ;
    k.de = function() {
        var a = Array(4);
        this.jc(a);
        return Fz(a, 0)
    }
    ;
    k.ee = function() {
        var a = Array(8);
        this.jc(a);
        return Gz(a, 0)
    }
    ;
    k.Ve = function() {
        for (var a = this.va(), b = "", c = 0, d; c < a; c++) {
            d = this.g.wa();
            if (0 > d)
                throw new Ez;
            b += String.fromCharCode(d)
        }
        return b
    }
    ;
    function Tz(a) {
        this.l = Array(1024);
        this.m = Array(5);
        this.j = !1;
        this.g = 0;
        this.end = -1;
        this.i = 0;
        this.h = new Uz(a);
        this.u = new Sz(this)
    }
    z(Tz, Qz);
    function Vz(a, b) {
        try {
            for (; ; ) {
                var c = b ? 2147483647 : a.h.zb();
                if (0 == c)
                    return -2;
                var d = a.h;
                var e = 0 <= d.g ? d.g : d.g = d.h.wa();
                switch (e) {
                case 119:
                    if (2 > c)
                        return -2;
                    Wz(a.h, a.m, 2);
                    return a.m[1] & 255;
                case 122:
                    if (5 > c)
                        return -2;
                    Wz(a.h, a.m, 5);
                    var f = Fz(a.m, 1);
                    if (0 > f)
                        throw Error();
                    return f;
                case 121:
                    a.h.wa();
                    break;
                default:
                    if (0 <= e && (112 > e || 126 < e))
                        throw Error();
                    return -1
                }
            }
        } catch (g) {
            throw Error();
        }
    }
    function Xz(a) {
        try {
            do {
                var b = void 0;
                a.g = 0;
                if (0 < a.i)
                    if (b = a.h.fb(a.l, 0, Math.min(a.i, 1024)),
                    0 <= b)
                        a.end = b,
                        a.i -= b;
                    else
                        throw Error();
                else
                    b = Vz(a, !0),
                    0 <= b ? (a.end = 0,
                    a.i = b) : (a.end = -1,
                    a.i = 0)
            } while (a.g == a.end)
        } catch (c) {
            throw a.g = 0,
            a.end = -1,
            a.i = 0,
            c;
        }
    }
    k = Tz.prototype;
    k.jc = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        for (; 0 < c; ) {
            var d = Yz(this, a, b, c);
            if (0 > d)
                throw new Ez;
            b += d;
            c -= d
        }
    }
    ;
    k.wa = function() {
        return this.j ? (this.g == this.end && Xz(this),
        0 <= this.end ? this.l[this.g++] & 255 : -1) : this.h.wa()
    }
    ;
    k.fb = function(a, b, c) {
        return Yz(this, a, b, c)
    }
    ;
    k.zb = function() {
        if (this.j) {
            if (this.g == this.end && 0 == this.i) {
                for (var a; 0 == (a = Vz(this, !1)); )
                    ;
                switch (a) {
                case -2:
                    break;
                case -1:
                    this.g = 0;
                    this.end = -1;
                    break;
                default:
                    this.end = this.g = 0,
                    this.i = a
                }
            }
            a = 0 < this.i ? Math.min(this.h.zb(), this.i) : 0;
            return 0 <= this.end ? this.end - this.g + a : 0
        }
        return this.h.zb()
    }
    ;
    k.close = function() {
        this.j && (this.g = 0,
        this.end = -1,
        this.i = 0);
        this.h.close()
    }
    ;
    function Yz(a, b, c, d) {
        c = c || 0;
        th(d) || (d = b.length);
        if (0 == d)
            return 0;
        if (a.j) {
            a.g == a.end && Xz(a);
            if (0 > a.end)
                return -1;
            d = Math.min(d, a.end - a.g);
            go(a.l, a.g, b, c, d);
            a.g += d;
            return d
        }
        return a.h.fb(b, c, d)
    }
    k.Wa = function() {
        var a = this.wa();
        if (0 > a)
            throw new Ez;
        return a << 24 >> 24
    }
    ;
    k.Sc = function() {
        var a = this.wa();
        if (0 > a)
            throw new Ez;
        return a
    }
    ;
    k.va = function() {
        if (!this.j)
            this.g = 0,
            Wz(this.h, this.l, 2);
        else if (2 > this.end - this.g)
            return this.u.va();
        var a = this.l;
        var b = this.g;
        a = (a[b] & 255) << 24 >> 16 | a[b + 1] & 255;
        this.g += 2;
        return a
    }
    ;
    k.de = function() {
        if (!this.j)
            this.g = 0,
            Wz(this.h, this.l, 4);
        else if (4 > this.end - this.g)
            return this.u.de();
        var a = Fz(this.l, this.g);
        this.g += 4;
        return a
    }
    ;
    k.ee = function() {
        if (!this.j)
            this.g = 0,
            Wz(this.h, this.l, 8);
        else if (8 > this.end - this.g)
            return this.u.ee();
        var a = Gz(this.l, this.g);
        this.g += 8;
        return a
    }
    ;
    k.Ve = function() {
        for (var a = this.va(), b = "", c = 0, d; c < a; c++) {
            d = this.wa();
            if (0 > d)
                throw new Ez;
            b += String.fromCharCode(d)
        }
        return b
    }
    ;
    function Uz(a) {
        this.h = a;
        this.g = -1
    }
    z(Uz, Qz);
    Uz.prototype.wa = function() {
        if (0 <= this.g) {
            var a = this.g;
            this.g = -1;
            return a
        }
        return this.h.wa()
    }
    ;
    Uz.prototype.fb = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (0 === c)
            return 0;
        if (0 > this.g)
            return this.h.fb(a, b, c);
        a[b++] = this.g;
        c--;
        this.g = -1;
        a = this.h.fb(a, b, c);
        return 0 <= a ? a + 1 : 1
    }
    ;
    function Wz(a, b, c) {
        var d = 0;
        void 0 === c && (c = b.length);
        for (var e = 0; e < c; ) {
            var f = a.fb(b, d + e, c - e);
            if (0 > f)
                throw new Ez;
            e += f
        }
    }
    Uz.prototype.zb = function() {
        return this.h.zb() + (0 <= this.g ? 1 : 0)
    }
    ;
    Uz.prototype.close = function() {
        this.h.close()
    }
    ;
    function Zz(a) {
        this.g = new Mz(a);
        this.sa(-21267);
        this.sa(5);
        a = this.g;
        1 != a.l && (Nz(a),
        a.l = !0)
    }
    z(Zz, Iz);
    k = Zz.prototype;
    k.write = function(a) {
        this.g.write(a)
    }
    ;
    k.Sa = function(a, b, c) {
        Oz(this.g, a, b, c)
    }
    ;
    k.close = function() {
        this.flush();
        this.g.close()
    }
    ;
    k.flush = function() {
        this.g.flush()
    }
    ;
    k.Za = function(a) {
        this.g.Za(a)
    }
    ;
    k.sa = function(a) {
        this.g.sa(a)
    }
    ;
    k.Fd = function(a) {
        this.g.Fd(a)
    }
    ;
    k.je = function(a) {
        this.g.je(a)
    }
    ;
    k.cf = function(a) {
        this.g.cf(a)
    }
    ;
    function $z(a) {
        this.g = new Tz(a);
        a = this.g.va();
        var b = this.g.va();
        if (-21267 != a || 5 != b)
            throw Error();
        a = this.g;
        1 != a.j && (a.g = 0,
        a.end = 0,
        a.i = 0,
        a.j = !0)
    }
    z($z, Qz);
    k = $z.prototype;
    k.wa = function() {
        return this.g.wa()
    }
    ;
    k.jc = function(a, b, c) {
        this.g.jc(a, b, c)
    }
    ;
    k.fb = function(a, b, c) {
        if (!a)
            throw Error();
        b = b || 0;
        void 0 === c && (c = a.length);
        var d = b + c;
        if (0 > b || 0 > c || d > a.length || 0 > d)
            throw Error();
        return Yz(this.g, a, b, c)
    }
    ;
    k.zb = function() {
        return this.g.zb()
    }
    ;
    k.close = function() {
        this.g.close()
    }
    ;
    k.Wa = function() {
        return this.g.Wa()
    }
    ;
    k.va = function() {
        return this.g.va()
    }
    ;
    k.de = function() {
        return this.g.de()
    }
    ;
    k.ee = function() {
        return this.g.ee()
    }
    ;
    k.Sc = function() {
        return this.g.Sc()
    }
    ;
    k.Ve = function() {
        return this.g.Ve()
    }
    ;
    var aA = 1;
    function bA(a) {
        aA = (214013 * aA + 2531011) % 4294967296;
        return (aA >> 16 & 32767) % a
    }
    ;function cA(a, b, c, d) {
        this.m = c;
        this.l = d;
        this.g = new J(a,b);
        dA || (dA = Array(eA.length),
        fA = Array(eA.length));
        if (!dA[c]) {
            a = dA[c] = new dy;
            b = fA[c] = new dy;
            d = eA[c].slice(0);
            for (var e = d.length, f = 1 / (d[e - 2] - d[0]), g = 2; g < e; g += 2)
                d[g] = (d[g] - d[0]) * f,
                d[g + 1] = (d[g + 1] - d[1]) * f;
            d[0] = d[1] = 0;
            a.Y.push(d[0], d[1]);
            a.ob = null;
            b.Y.push(d[0], -d[1]);
            b.ob = null;
            for (g = 2; g < e; g += 6)
                fy(a, d[g], d[g + 1], d[g + 2], d[g + 3], d[g + 4], d[g + 5]),
                fy(b, d[g], -d[g + 1], d[g + 2], -d[g + 3], d[g + 4], -d[g + 5])
        }
        this.j = Array(3);
        this.j[2] = dA[c];
        this.j[4] = fA[c]
    }
    var dA, fA;
    function gA(a, b, c, d, e) {
        if (1 == c)
            ey(b, e.x, e.y);
        else {
            a = a.j[c].Fc();
            c = d.x;
            d = d.y;
            var f = e.x;
            e = e.y;
            var g = a.Y
              , h = g.length
              , l = f - c
              , m = -e + d
              , n = g[h - 2] - g[0]
              , q = g[h - 1] - g[1]
              , p = Math.sqrt(l * l + m * m) / Math.sqrt(n * n + q * q);
            m = Math.atan2(m, l) - Math.atan2(q, n);
            l = new Vx;
            l.translate(c, d);
            Xx(l, p, p);
            n = -m;
            p = new Vx;
            m = Math.cos(n);
            n = Math.sin(n);
            p = Wx(p, m, n, -n, m, -(0 * m) + 0 * n, -(0 * n) - 0 * m);
            m = l.g;
            n = l.h;
            l.g = p.g * m + p.i * n;
            l.h = p.h * m + p.j * n;
            l.l += p.l * m + p.m * n;
            m = l.i;
            n = l.j;
            l.i = p.g * m + p.i * n;
            l.j = p.h * m + p.j * n;
            l.m += p.l * m + p.m * n;
            l.translate(-g[0], -g[1]);
            a.transform(l, 2, h / 2 - 2);
            a.Y[0] = c;
            a.Y[1] = d;
            a.Y[h - 2] = f;
            a.Y[h - 1] = e;
            a.ob = null;
            c = b.Y.length;
            a = a.Y;
            c ? (d = b.Y[c - 1],
            b.Y[c - 2] == a[0] && d == a[1] || ey(b, a[0], a[1]),
            b.Y = b.Y.concat(a.slice(2))) : b.Y = a.slice(0);
            b.ob = null
        }
    }
    function hA(a, b) {
        for (var c = {}, d = 2, e = Math.floor(a / 10); d <= e; d++)
            for (var f = 2, g = Math.floor(b / 10); f <= g; f++) {
                var h = d * f;
                if (300 < h)
                    break;
                if (iA(a, b, d, f)) {
                    var l = c[h];
                    if (!l || jA(a, b, d, f) < jA(a, b, l.x, l.y))
                        c[h] = new J(d,f)
                }
            }
        a = [];
        for (d in c)
            a.push(c[d]);
        a.sort(function(m, n) {
            return id(m) - id(n)
        });
        return a
    }
    function jA(a, b, c, d) {
        a /= c;
        b /= d;
        return a >= b ? a / b : b / a
    }
    function kA(a, b) {
        if (!lA) {
            lA = Array(8);
            for (var c = 0; 8 > c; c++)
                lA[c] = 276 / 7 * c + 24
        }
        a = hA(a, b);
        b = a.length;
        var d = lA.length
          , e = []
          , f = void 0;
        for (c = 0; c < d; c++) {
            for (var g = void 0, h = 1E6, l = lA[c], m = th(f) ? f + 1 : 0; m < b; m++) {
                var n = a[m]
                  , q = id(n);
                if (24 <= q && 300 >= q)
                    if (q = Math.abs(q - l),
                    q < h)
                        g = n,
                        h = q,
                        f = m;
                    else if (q >= h)
                        break
            }
            g && e.push(g)
        }
        return e
    }
    var lA;
    function iA(a, b, c, d) {
        a *= d;
        b *= c;
        return a >= b ? a <= 1.2 * b : b <= 1.2 * a
    }
    var eA = [[78, 200, 239, 200, 400, 200, 562, 200], [27, 198, 237, 260, 281, 237, 242, 180, 164, 66, 476, 66, 398, 180, 359, 237, 403, 260, 613, 198], [88, 200, 138, 200, 188, 200, 238, 200, 225, 73, 415, 73, 402, 200, 452, 200, 502, 200, 552, 200], [64, 199, 116, 210, 168, 221, 220, 233, 253, 189, 286, 145, 320, 101, 354, 145, 387, 189, 420, 233, 472, 221, 524, 210, 576, 199], [71, 200, 122, 200, 174, 200, 226, 200, 257, 160, 288, 120, 320, 80, 352, 120, 383, 160, 414, 200, 466, 200, 518, 200, 569, 200], [48, 200, 66, 241, 200, 245, 223, 200, 258, 131, 382, 131, 417, 200, 440, 245, 574, 241, 592, 200], [120, 200, 220, 138, 420, 138, 520, 200], [9, 199, 30, 140, 118, 159, 109, 195, 79, 315, 371, 344, 228, 176, 166, 103, 474, 103, 412, 176, 269, 344, 561, 315, 531, 195, 522, 159, 610, 140, 631, 199]]
      , mA = eA.length;
    function nA() {}
    function oA(a, b, c, d) {
        var e = new nA;
        e.h = a;
        e.i = b;
        e.g = c;
        e.j = d || 20;
        return e
    }
    nA.prototype.Ec = function(a) {
        return a instanceof nA && (a === this || a.h == this.h && a.i == this.i && a.g == this.g)
    }
    ;
    function pA(a) {
        return a.h * a.i
    }
    nA.prototype.V = function(a) {
        a.Wa();
        this.h = a.va();
        this.i = a.va();
        this.g = a.Wa();
        this.j = a.Wa()
    }
    ;
    nA.prototype.N = function(a) {
        a.Za(0);
        a.sa(this.h);
        a.sa(this.i);
        a.Za(this.g);
        a.Za(this.j)
    }
    ;
    function qA(a) {
        var b = 40;
        b = void 0 === b ? 0 : b;
        var c;
        return (new Lg(function(d, e) {
            function f() {
                l < g.length ? c = Bi(function() {
                    c = void 0;
                    var m;
                    b && (m = h());
                    do
                        try {
                            g[l++]()
                        } catch (n) {
                            e(n)
                        }
                    while (l < g.length && (!b || h() - m < b));
                    f()
                }) : d()
            }
            var g = v(Array, "from").call(Array, a)
              , h = Ih ? Jh : yh
              , l = 0;
            f()
        }
        )).vb(function(d) {
            void 0 !== c && Ci(c);
            throw d;
        })
    }
    ;var rA = {}
      , sA = null
      , uA = Ib || Jb || !ng && !H && "function" == typeof A.atob;
    function vA(a) {
        if (uA)
            return A.atob(a);
        var b = "";
        wA(a, function(c) {
            b += String.fromCharCode(c)
        });
        return b
    }
    function xA(a) {
        var b = [];
        wA(a, function(c) {
            b.push(c)
        });
        return b
    }
    function wA(a, b) {
        function c(l) {
            for (; d < a.length; ) {
                var m = a.charAt(d++)
                  , n = sA[m];
                if (null != n)
                    return n;
                if (!/^[\s\xa0]*$/.test(m))
                    throw Error("Unknown base64 encoding at char: " + m);
            }
            return l
        }
        yA();
        for (var d = 0; ; ) {
            var e = c(-1)
              , f = c(0)
              , g = c(64)
              , h = c(64);
            if (64 === h && -1 === e)
                break;
            b(e << 2 | f >> 4);
            64 != g && (b(f << 4 & 240 | g >> 2),
            64 != h && b(g << 6 & 192 | h))
        }
    }
    function yA() {
        if (!sA) {
            sA = {};
            for (var a = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""), b = ["+/=", "+/", "-_=", "-_.", "-_"], c = 0; 5 > c; c++) {
                var d = a.concat(b[c].split(""));
                rA[c] = d;
                for (var e = 0; e < d.length; e++) {
                    var f = d[e];
                    void 0 === sA[f] && (sA[f] = e)
                }
            }
        }
    }
    ;function zA(a) {
        this.i = a;
        this.h = a.length;
        this.j = this.g = 0
    }
    z(zA, Qz);
    zA.prototype.zb = function() {
        return this.h - this.g
    }
    ;
    zA.prototype.wa = function() {
        return this.g < this.h ? this.i[this.g++] & 255 : -1
    }
    ;
    zA.prototype.fb = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (a) {
            if (0 > b || 0 > c || c > a.length - b)
                throw Error();
            if (!c)
                return 0
        } else
            throw Error();
        c = Math.min(c, this.h - this.g);
        go(this.i, this.g, a, b, c);
        this.g += c;
        return c
    }
    ;
    zA.prototype.reset = function() {
        this.g = this.j
    }
    ;
    function AA() {
        this.g = []
    }
    z(AA, Iz);
    AA.prototype.reset = function() {
        this.g.length = 0
    }
    ;
    AA.prototype.size = function() {
        return this.g.length
    }
    ;
    AA.prototype.write = function(a) {
        this.g.push(a)
    }
    ;
    AA.prototype.Sa = function(a, b, c) {
        b = b || 0;
        void 0 === c && (c = a.length);
        if (a) {
            if (0 > b || b > a.length || 0 > c || b + c > a.length || 0 > b + c)
                throw Error();
            c && (this.g = this.g.concat(a.slice(b, b + c)))
        } else
            throw Error();
    }
    ;
    function BA(a) {
        var b = 1, c = 0, d;
        var e = e || 0;
        var f = f || a.length;
        for (d = 0; d < f; ++d)
            b = (b + a[e + d]) % 65521,
            c = (c + b) % 65521;
        return c << 16 | b
    }
    ;var CA, DA, EA, FA, GA, HA, Z, IA, JA, KA, LA, MA, NA, OA, PA, QA, RA, SA, TA, UA, VA, WA, XA, YA, ZA, $A, aB, bB, cB, dB, eB, fB, gB, hB, iB, jB, kB, lB, mB, nB, oB, pB, qB, rB, sB, tB, uB, vB, wB, xB, yB, zB, AB, BB, CB;
    function DB() {
        this.g = this.h = 0
    }
    function EB() {
        this.h = this.i = this.m = null;
        this.l = this.j = this.u = this.g = 0
    }
    function FB(a, b, c) {
        this.Yi = a;
        this.xj = b;
        this.wj = c
    }
    function GB() {
        this.next = null;
        this.g = this.h = 0;
        this.i = Array(8192)
    }
    function HB(a) {
        IB[aB + bB++] = a;
        if (8192 == aB + bB && 0 != bB) {
            var b;
            null != FA ? (a = FA,
            FA = FA.next) : a = new GB;
            a.next = null;
            a.g = a.h = 0;
            null == GA ? GA = HA = a : HA = HA.next = a;
            a.g = bB - aB;
            for (b = 0; b < a.g; b++)
                a.i[b] = IB[aB + b];
            bB = aB = 0
        }
    }
    function JB(a) {
        a &= 65535;
        8190 > aB + bB ? (IB[aB + bB++] = a & 255,
        IB[aB + bB++] = a >>> 8) : (HB(a & 255),
        HB(a >>> 8))
    }
    function KB() {
        cB = (cB << 5 ^ Z[dB + 3 - 1] & 255) & 8191;
        eB = KA[32768 + cB];
        KA[dB & 32767] = eB;
        KA[32768 + cB] = dB
    }
    function LB(a, b) {
        MB(b[a].g, b[a].h)
    }
    function NB(a, b, c) {
        return a[b].g < a[c].g || a[b].g == a[c].g && VA[b] <= VA[c]
    }
    function OB(a, b) {
        for (var c = Z, d = 0; d < b && fB < gB.length; d++) {
            var e = gB[fB++];
            c[a + d] = e
        }
        return d
    }
    function PB() {
        var a = eB
          , b = jB
          , c = dB
          , d = mB
          , e = 32506 < dB ? dB - 32506 : 0
          , f = dB + 258
          , g = Z[c + d - 1]
          , h = Z[c + d];
        mB >= iB && (b >>= 2);
        do {
            var l = a;
            if (Z[l + d] == h && Z[l + d - 1] == g && Z[l] == Z[c] && Z[++l] == Z[c + 1]) {
                c += 2;
                for (l++; Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && Z[++c] == Z[++l] && c < f; )
                    ;
                l = 258 - (f - c);
                c = f - 258;
                if (l > d) {
                    nB = a;
                    d = l;
                    if (258 <= l)
                        break;
                    g = Z[c + d - 1];
                    h = Z[c + d]
                }
            }
        } while ((a = KA[a & 32767]) > e && 0 != --b);
        return d
    }
    function QB() {
        var a, b = 65536 - lB - dB;
        if (-1 == b)
            b--;
        else if (65274 <= dB) {
            for (a = 0; 32768 > a; a++)
                Z[a] = Z[a + 32768];
            nB -= 32768;
            dB -= 32768;
            kB -= 32768;
            for (a = 0; 8192 > a; a++) {
                var c = KA[32768 + a];
                KA[32768 + a] = 32768 <= c ? c - 32768 : 0
            }
            for (a = 0; 32768 > a; a++)
                c = KA[a],
                KA[a] = 32768 <= c ? c - 32768 : 0;
            b += 32768
        }
        EA || (a = OB(dB + lB, b),
        0 >= a ? EA = !0 : lB += a)
    }
    function RB(a, b) {
        var c;
        if (!DA) {
            if (!EA) {
                sB = rB = 0;
                var d, e;
                if (0 == OA[0].h) {
                    QA.h = LA;
                    QA.i = NA;
                    QA.m = SB;
                    QA.l = 257;
                    QA.j = 286;
                    QA.u = 15;
                    QA.g = 0;
                    RA.h = MA;
                    RA.i = OA;
                    RA.m = TB;
                    RA.l = 0;
                    RA.j = 30;
                    RA.u = 15;
                    RA.g = 0;
                    SA.h = PA;
                    SA.i = null;
                    SA.m = UB;
                    SA.l = 0;
                    SA.j = 19;
                    SA.u = 7;
                    for (e = d = SA.g = 0; 28 > e; e++)
                        for (YA[e] = d,
                        c = 0; c < 1 << SB[e]; c++)
                            WA[d++] = e;
                    WA[d - 1] = e;
                    for (e = d = 0; 16 > e; e++)
                        for (ZA[e] = d,
                        c = 0; c < 1 << TB[e]; c++)
                            XA[d++] = e;
                    for (d >>= 7; 30 > e; e++)
                        for (ZA[e] = d << 7,
                        c = 0; c < 1 << TB[e] - 7; c++)
                            XA[256 + d++] = e;
                    for (c = 0; 15 >= c; c++)
                        TA[c] = 0;
                    for (c = 0; c < NA.length; c++)
                        143 >= c ? (NA[c].h = 8,
                        TA[8]++) : 255 >= c ? (NA[c].h = 9,
                        TA[9]++) : 279 >= c ? (NA[c].h = 7,
                        TA[7]++) : (NA[c].h = 8,
                        TA[8]++);
                    VB(NA, 287);
                    for (c = 0; 30 > c; c++)
                        OA[c].h = 5,
                        OA[c].g = WB(c, 5);
                    XB()
                }
                for (c = 0; 8192 > c; c++)
                    KA[32768 + c] = 0;
                hB = YB[CA].xj;
                iB = YB[CA].Yi;
                jB = YB[CA].wj;
                kB = dB = 0;
                lB = OB(0, 65536);
                if (0 >= lB)
                    EA = !0,
                    lB = 0;
                else {
                    for (EA = !1; 262 > lB && !EA; )
                        QB();
                    for (c = cB = 0; 2 > c; c++)
                        cB = (cB << 5 ^ Z[c] & 255) & 8191
                }
                GA = null;
                aB = bB = 0;
                3 >= CA ? (mB = 2,
                oB = 0) : (oB = 2,
                qB = 0);
                tB = !1
            }
            DA = !0;
            if (0 == lB)
                return tB = !0,
                0
        }
        if ((c = ZB(a, 0, b)) == b)
            return b;
        if (tB)
            return c;
        if (3 >= CA)
            for (; 0 != lB && null == GA; ) {
                KB();
                0 != eB && 32506 >= dB - eB && (oB = PB(),
                oB > lB && (oB = lB));
                if (3 <= oB)
                    if (e = $B(dB - nB, oB - 3),
                    lB -= oB,
                    oB <= hB) {
                        oB--;
                        do
                            dB++,
                            KB();
                        while (0 != --oB);
                        dB++
                    } else
                        dB += oB,
                        oB = 0,
                        cB = Z[dB] & 255,
                        cB = (cB << 5 ^ Z[dB + 1] & 255) & 8191;
                else
                    e = $B(0, Z[dB] & 255),
                    lB--,
                    dB++;
                e && (aC(0),
                kB = dB);
                for (; 262 > lB && !EA; )
                    QB()
            }
        else
            for (; 0 != lB && null == GA; ) {
                KB();
                mB = oB;
                pB = nB;
                oB = 2;
                0 != eB && mB < hB && 32506 >= dB - eB && (oB = PB(),
                oB > lB && (oB = lB),
                3 == oB && 4096 < dB - nB && oB--);
                if (3 <= mB && oB <= mB) {
                    e = $B(dB - 1 - pB, mB - 3);
                    lB -= mB - 1;
                    mB -= 2;
                    do
                        dB++,
                        KB();
                    while (0 != --mB);
                    qB = 0;
                    oB = 2;
                    dB++;
                    e && (aC(0),
                    kB = dB)
                } else
                    0 != qB ? $B(0, Z[dB - 1] & 255) && (aC(0),
                    kB = dB) : qB = 1,
                    dB++,
                    lB--;
                for (; 262 > lB && !EA; )
                    QB()
            }
        0 == lB && (0 != qB && $B(0, Z[dB - 1] & 255),
        aC(1),
        tB = !0);
        return c + ZB(a, c, b - c)
    }
    function ZB(a, b, c) {
        var d, e;
        for (d = 0; null != GA && d < c; ) {
            var f = c - d;
            f > GA.g && (f = GA.g);
            for (e = 0; e < f; e++)
                a[b + d + e] = GA.i[GA.h + e];
            GA.h += f;
            GA.g -= f;
            d += f;
            0 == GA.g && (f = GA,
            GA = GA.next,
            f.next = FA,
            FA = f)
        }
        if (d == c)
            return d;
        if (aB < bB) {
            f = c - d;
            f > bB - aB && (f = bB - aB);
            for (e = 0; e < f; e++)
                a[b + d + e] = IB[aB + e];
            aB += f;
            d += f;
            bB == aB && (bB = aB = 0)
        }
        return d
    }
    function XB() {
        var a;
        for (a = 0; 286 > a; a++)
            LA[a].g = 0;
        for (a = 0; 30 > a; a++)
            MA[a].g = 0;
        for (a = 0; 19 > a; a++)
            PA[a].g = 0;
        LA[256].g = 1;
        zB = wB = xB = yB = uB = vB = 0;
        AB = 1
    }
    function bC(a, b) {
        for (var c = UA[b], d = b << 1; d <= BB; ) {
            d < BB && NB(a, UA[d + 1], UA[d]) && d++;
            if (NB(a, c, UA[d]))
                break;
            UA[b] = UA[d];
            b = d;
            d <<= 1
        }
        UA[b] = c
    }
    function VB(a, b) {
        var c = Array(16), d = 0, e;
        for (e = 1; 15 >= e; e++)
            d = d + TA[e - 1] << 1,
            c[e] = d;
        for (d = 0; d <= b; d++)
            e = a[d].h,
            0 != e && (a[d].g = WB(c[e]++, e))
    }
    function cC(a) {
        var b = a.h, c = a.i, d = a.j, e, f = -1, g = d;
        BB = 0;
        CB = 573;
        for (e = 0; e < d; e++)
            0 != b[e].g ? (UA[++BB] = f = e,
            VA[e] = 0) : b[e].h = 0;
        for (; 2 > BB; )
            e = UA[++BB] = 2 > f ? ++f : 0,
            b[e].g = 1,
            VA[e] = 0,
            uB--,
            null != c && (vB -= c[e].h);
        a.g = f;
        for (e = BB >> 1; 1 <= e; e--)
            bC(b, e);
        do
            e = UA[1],
            UA[1] = UA[BB--],
            bC(b, 1),
            c = UA[1],
            UA[--CB] = e,
            UA[--CB] = c,
            b[g].g = b[e].g + b[c].g,
            VA[g] = VA[e] > VA[c] ? VA[e] + 1 : VA[c] + 1,
            b[e].h = b[c].h = g,
            UA[1] = g++,
            bC(b, 1);
        while (2 <= BB);
        UA[--CB] = UA[1];
        g = a.h;
        e = a.m;
        d = a.l;
        c = a.g;
        var h = a.u, l = a.i, m, n = 0;
        for (m = 0; 15 >= m; m++)
            TA[m] = 0;
        g[UA[CB]].h = 0;
        for (a = CB + 1; 573 > a; a++) {
            var q = UA[a];
            m = g[g[q].h].h + 1;
            m > h && (m = h,
            n++);
            g[q].h = m;
            if (!(q > c)) {
                TA[m]++;
                var p = 0;
                q >= d && (p = e[q - d]);
                var u = g[q].g;
                uB += u * (m + p);
                null != l && (vB += u * (l[q].h + p))
            }
        }
        if (0 != n) {
            do {
                for (m = h - 1; 0 == TA[m]; )
                    m--;
                TA[m]--;
                TA[m + 1] += 2;
                TA[h]--;
                n -= 2
            } while (0 < n);
            for (m = h; 0 != m; m--)
                for (q = TA[m]; 0 != q; )
                    e = UA[--a],
                    e > c || (g[e].h != m && (uB += (m - g[e].h) * g[e].g,
                    g[e].h = m),
                    q--)
        }
        VB(b, f)
    }
    function dC(a, b) {
        var c, d = -1, e = a[0].h, f = 0, g = 7, h = 4;
        0 == e && (g = 138,
        h = 3);
        a[b + 1].h = 65535;
        for (c = 0; c <= b; c++) {
            var l = e;
            e = a[c + 1].h;
            ++f < g && l == e || (f < h ? PA[l].g += f : 0 != l ? (l != d && PA[l].g++,
            PA[16].g++) : 10 >= f ? PA[17].g++ : PA[18].g++,
            f = 0,
            d = l,
            0 == e ? (g = 138,
            h = 3) : l == e ? (g = 6,
            h = 3) : (g = 7,
            h = 4))
        }
    }
    function eC(a, b) {
        var c, d = -1, e = a[0].h, f = 0, g = 7, h = 4;
        0 == e && (g = 138,
        h = 3);
        for (c = 0; c <= b; c++) {
            var l = e;
            e = a[c + 1].h;
            if (!(++f < g && l == e)) {
                if (f < h) {
                    do
                        LB(l, PA);
                    while (0 != --f)
                } else
                    0 != l ? (l != d && (LB(l, PA),
                    f--),
                    LB(16, PA),
                    MB(f - 3, 2)) : 10 >= f ? (LB(17, PA),
                    MB(f - 3, 3)) : (LB(18, PA),
                    MB(f - 11, 7));
                f = 0;
                d = l;
                0 == e ? (g = 138,
                h = 3) : l == e ? (g = 6,
                h = 3) : (g = 7,
                h = 4)
            }
        }
    }
    function aC(a) {
        var b;
        var c = dB - kB;
        $A[yB] = zB;
        cC(QA);
        cC(RA);
        dC(LA, QA.g);
        dC(MA, RA.g);
        cC(SA);
        for (b = 18; 3 <= b && 0 == PA[fC[b]].h; b--)
            ;
        uB += 3 * (b + 1) + 14;
        var d = b;
        b = uB + 10 >> 3;
        var e = vB + 10 >> 3;
        e <= b && (b = e);
        if (c + 4 <= b && 0 <= kB)
            for (MB(a, 3),
            gC(),
            JB(c),
            JB(~c),
            b = 0; b < c; b++)
                HB(Z[kB + b]);
        else if (e == b)
            MB(2 + a, 3),
            hC(NA, OA);
        else {
            MB(4 + a, 3);
            c = d + 1;
            b = QA.g + 1;
            e = RA.g + 1;
            MB(b - 257, 5);
            MB(e - 1, 5);
            MB(c - 4, 4);
            for (d = 0; d < c; d++)
                MB(PA[fC[d]].h, 3);
            eC(LA, b - 1);
            eC(MA, e - 1);
            hC(LA, MA)
        }
        XB();
        0 != a && gC()
    }
    function $B(a, b) {
        JA[wB++] = b;
        0 == a ? LA[b].g++ : (a--,
        LA[WA[b] + 257].g++,
        MA[(256 > a ? XA[a] : XA[256 + (a >> 7)]) & 255].g++,
        IA[xB++] = a,
        zB |= AB);
        AB <<= 1;
        0 == (wB & 7) && ($A[yB++] = zB,
        zB = 0,
        AB = 1);
        if (2 < CA && 0 == (wB & 4095)) {
            a = wB << 3;
            b = dB - kB;
            var c;
            for (c = 0; 30 > c; c++)
                a += MA[c].g * (5 + TB[c]);
            if (xB < wB >> 1 && a >> 3 < b >> 1)
                return !0
        }
        return 8191 == wB || 8192 == xB
    }
    function hC(a, b) {
        var c = 0
          , d = 0
          , e = 0
          , f = 0;
        if (0 != wB) {
            do {
                0 == (c & 7) && (f = $A[e++]);
                var g = JA[c++] & 255;
                if (0 == (f & 1))
                    LB(g, a);
                else {
                    var h = WA[g];
                    LB(h + 257, a);
                    var l = SB[h];
                    0 != l && (g -= YA[h],
                    MB(g, l));
                    g = IA[d++];
                    h = (256 > g ? XA[g] : XA[256 + (g >> 7)]) & 255;
                    LB(h, b);
                    l = TB[h];
                    0 != l && (g -= ZA[h],
                    MB(g, l))
                }
                f >>= 1
            } while (c < wB)
        }
        LB(256, a)
    }
    function MB(a, b) {
        sB > 16 - b ? (rB |= a << sB,
        JB(rB),
        rB = a >> 16 - sB,
        sB += b - 16) : (rB |= a << sB,
        sB += b)
    }
    function WB(a, b) {
        var c = 0;
        do
            c |= a & 1,
            a >>= 1,
            c <<= 1;
        while (0 < --b);
        return c >> 1
    }
    function gC() {
        8 < sB ? JB(rB) : 0 < sB && HB(rB);
        sB = rB = 0
    }
    var IB = null
      , SB = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0]
      , TB = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
      , UB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7]
      , fC = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
      , YB = [new FB(0,0,0), new FB(4,4,4), new FB(4,5,8), new FB(4,6,32), new FB(4,4,16), new FB(8,16,32), new FB(8,16,128), new FB(8,32,256), new FB(32,128,1024), new FB(32,258,4096)];
    function iC(a, b) {
        this.g = a;
        this.h = [];
        this.i = b
    }
    z(iC, Jz);
    iC.prototype.close = function() {
        if (this.h)
            try {
                gB = this.h;
                fB = 0;
                var a = this.i, b;
                a ? 1 > a ? a = 1 : 9 < a && (a = 9) : a = 6;
                CA = a;
                EA = DA = !1;
                FA = GA = HA = null;
                IB = Array(8192);
                Z = Array(65536);
                IA = Array(8192);
                JA = Array(32832);
                KA = Array(65536);
                LA = Array(573);
                for (b = 0; 573 > b; b++)
                    LA[b] = new DB;
                MA = Array(61);
                for (b = 0; 61 > b; b++)
                    MA[b] = new DB;
                NA = Array(288);
                for (b = 0; 288 > b; b++)
                    NA[b] = new DB;
                OA = Array(30);
                for (b = 0; 30 > b; b++)
                    OA[b] = new DB;
                PA = Array(39);
                for (b = 0; 39 > b; b++)
                    PA[b] = new DB;
                QA = new EB;
                RA = new EB;
                SA = new EB;
                TA = Array(16);
                UA = Array(573);
                VA = Array(573);
                WA = Array(256);
                XA = Array(512);
                YA = Array(29);
                ZA = Array(30);
                $A = Array(1024);
                this.g.write(120);
                this.g.write(218);
                for (var c = Array(1024), d; 0 < (d = RB(c, c.length)); )
                    this.g.Sa(c, 0, d);
                this.g.Sa(jC(this.h))
            } catch (e) {
                throw e;
            } finally {
                this.h = gB = FA = GA = HA = IB = Z = IA = JA = KA = LA = MA = NA = OA = PA = QA = RA = SA = TA = UA = VA = WA = XA = YA = ZA = $A = null
            }
        Jz.prototype.close.call(this)
    }
    ;
    iC.prototype.write = function(a) {
        this.h.push(a)
    }
    ;
    function jC(a) {
        a = BA(a);
        return [a >>> 24, a >> 16 & 255, a >> 8 & 255, a & 255]
    }
    ;var kC, lC, mC, nC, oC, pC, qC, rC, sC, tC, uC, vC, wC, xC, yC, zC;
    function AC() {
        this.next = this.list = null
    }
    function BC() {
        this.n = this.e = this.b = 0;
        this.t = null
    }
    function CC(a, b, c, d, e, f) {
        this.status = this.g = 0;
        this.h = null;
        var g = Array(17), h, l, m, n = Array(17), q, p = new BC, u = Array(16);
        var x = Array(288);
        var B = Array(17), E, I, G = null;
        this.h = null;
        for (l = 0; l < g.length; l++)
            g[l] = 0;
        for (l = 0; l < n.length; l++)
            n[l] = 0;
        for (l = 0; l < u.length; l++)
            u[l] = null;
        for (l = 0; l < x.length; l++)
            x[l] = 0;
        for (l = 0; l < B.length; l++)
            B[l] = 0;
        var P = 256 < b ? a[256] : 16;
        var S = a;
        var ia = 0;
        l = b;
        do
            g[S[ia]]++,
            ia++;
        while (0 < --l);
        if (g[0] == b)
            this.h = null,
            this.status = this.g = 0;
        else {
            for (m = 1; 16 >= m && 0 == g[m]; m++)
                ;
            var ra = m;
            f < m && (f = m);
            for (l = 16; 0 != l && 0 == g[l]; l--)
                ;
            var sa = l;
            f > l && (f = l);
            for (E = 1 << m; m < l; m++,
            E <<= 1)
                if (0 > (E -= g[m])) {
                    this.status = 2;
                    this.g = f;
                    return
                }
            if (0 > (E -= g[l]))
                this.status = 2,
                this.g = f;
            else {
                g[l] += E;
                B[1] = m = 0;
                S = g;
                ia = 1;
                for (q = 2; 0 < --l; )
                    B[q++] = m += S[ia++];
                S = a;
                l = ia = 0;
                do
                    0 != (m = S[ia++]) && (x[B[m]++] = l);
                while (++l < b);
                b = B[sa];
                B[0] = l = 0;
                S = x;
                ia = 0;
                x = -1;
                var ja = n[0] = 0;
                q = null;
                for (I = 0; ra <= sa; ra++)
                    for (a = g[ra]; 0 < a--; ) {
                        for (; ra > ja + n[1 + x]; ) {
                            ja += n[1 + x];
                            x++;
                            I = (I = sa - ja) > f ? f : I;
                            if ((h = 1 << (m = ra - ja)) > a + 1)
                                for (h -= a + 1,
                                q = ra; ++m < I && !((h <<= 1) <= g[++q]); )
                                    h -= g[q];
                            ja + m > P && ja < P && (m = P - ja);
                            I = 1 << m;
                            n[1 + x] = m;
                            q = Array(I);
                            for (h = 0; h < I; h++)
                                q[h] = new BC;
                            null == G ? G = this.h = new AC : (G.next = new AC,
                            G = G.next);
                            G.next = null;
                            G.list = q;
                            u[x] = q;
                            0 < x && (B[x] = l,
                            p.b = n[x],
                            p.e = 16 + m,
                            p.t = q,
                            m = (l & (1 << ja) - 1) >> ja - n[x],
                            u[x - 1][m].e = p.e,
                            u[x - 1][m].b = p.b,
                            u[x - 1][m].n = p.n,
                            u[x - 1][m].t = p.t)
                        }
                        p.b = ra - ja;
                        ia >= b ? p.e = 99 : S[ia] < c ? (p.e = 256 > S[ia] ? 16 : 15,
                        p.n = S[ia++]) : (p.e = e[S[ia] - c],
                        p.n = d[S[ia++] - c]);
                        h = 1 << ra - ja;
                        for (m = l >> ja; m < I; m += h)
                            q[m].e = p.e,
                            q[m].b = p.b,
                            q[m].n = p.n,
                            q[m].t = p.t;
                        for (m = 1 << ra - 1; 0 != (l & m); m >>= 1)
                            l ^= m;
                        for (l ^= m; (l & (1 << ja) - 1) != B[x]; )
                            ja -= n[x],
                            x--
                    }
                this.g = n[1];
                this.status = 0 != E && 1 != sa ? 1 : 0
            }
        }
    }
    function DC(a) {
        for (; lC < a; )
            mC |= kC() << lC,
            lC += 8
    }
    function EC(a) {
        return mC & FC[a]
    }
    function GC(a) {
        mC >>= a;
        lC -= a
    }
    function HC(a, b, c) {
        var d, e;
        if (0 == c)
            return 0;
        for (e = 0; ; ) {
            DC(nC);
            var f = oC.list[EC(nC)];
            for (d = f.e; 16 < d; ) {
                if (99 == d)
                    return -1;
                GC(f.b);
                d -= 16;
                DC(d);
                f = f.t[EC(d)];
                d = f.e
            }
            GC(f.b);
            if (16 == d)
                pC &= 32767,
                a[b + e++] = qC[pC++] = f.n;
            else {
                if (15 == d)
                    break;
                DC(d);
                rC = f.n + EC(d);
                GC(d);
                DC(sC);
                f = tC.list[EC(sC)];
                for (d = f.e; 16 < d; ) {
                    if (99 == d)
                        return -1;
                    GC(f.b);
                    d -= 16;
                    DC(d);
                    f = f.t[EC(d)];
                    d = f.e
                }
                GC(f.b);
                DC(d);
                uC = pC - f.n - EC(d);
                for (GC(d); 0 < rC && e < c; )
                    rC--,
                    uC &= 32767,
                    pC &= 32767,
                    a[b + e++] = qC[pC++] = qC[uC++]
            }
            if (e == c)
                return c
        }
        vC = -1;
        return e
    }
    function IC(a, b, c) {
        var d, e, f, g = Array(316);
        for (d = 0; d < g.length; d++)
            g[d] = 0;
        DC(5);
        var h = 257 + EC(5);
        GC(5);
        DC(5);
        var l = 1 + EC(5);
        GC(5);
        DC(4);
        d = 4 + EC(4);
        GC(4);
        if (286 < h || 30 < l)
            return -1;
        for (e = 0; e < d; e++)
            DC(3),
            g[JC[e]] = EC(3),
            GC(3);
        for (; 19 > e; e++)
            g[JC[e]] = 0;
        nC = 7;
        e = new CC(g,19,19,null,null,nC);
        if (0 != e.status)
            return -1;
        oC = e.h;
        nC = e.g;
        var m = h + l;
        for (d = f = 0; d < m; ) {
            DC(nC);
            var n = oC.list[EC(nC)];
            e = n.b;
            GC(e);
            e = n.n;
            if (16 > e)
                g[d++] = f = e;
            else if (16 == e) {
                DC(2);
                e = 3 + EC(2);
                GC(2);
                if (d + e > m)
                    return -1;
                for (; 0 < e--; )
                    g[d++] = f
            } else {
                17 == e ? (DC(3),
                e = 3 + EC(3),
                GC(3)) : (DC(7),
                e = 11 + EC(7),
                GC(7));
                if (d + e > m)
                    return -1;
                for (; 0 < e--; )
                    g[d++] = 0;
                f = 0
            }
        }
        nC = 9;
        e = new CC(g,h,257,KC,LC,nC);
        0 == nC && (e.status = 1);
        if (0 != e.status && 1 == e.status)
            return -1;
        oC = e.h;
        nC = e.g;
        for (d = 0; d < l; d++)
            g[d] = g[d + h];
        sC = 6;
        e = new CC(g,l,0,MC,NC,sC);
        tC = e.h;
        sC = e.g;
        return 0 == sC && 257 < h || 0 != e.status ? -1 : HC(a, b, c)
    }
    function OC(a, b) {
        var c;
        for (c = 0; c < b && (!zC || -1 != vC); ) {
            if (0 < rC) {
                if (0 != vC)
                    for (; 0 < rC && c < b; )
                        rC--,
                        uC &= 32767,
                        pC &= 32767,
                        a[c++] = qC[pC++] = qC[uC++];
                else {
                    for (; 0 < rC && c < b; )
                        rC--,
                        pC &= 32767,
                        DC(8),
                        a[c++] = qC[pC++] = EC(8),
                        GC(8);
                    0 == rC && (vC = -1)
                }
                if (c == b)
                    break
            }
            if (-1 == vC) {
                if (zC)
                    break;
                DC(1);
                0 != EC(1) && (zC = !0);
                GC(1);
                DC(2);
                vC = EC(2);
                GC(2);
                oC = null;
                rC = 0
            }
            switch (vC) {
            case 0:
                var d = a
                  , e = c
                  , f = b - c;
                var g = lC & 7;
                GC(g);
                DC(16);
                g = EC(16);
                GC(16);
                DC(16);
                if (g != (~mC & 65535))
                    g = -1;
                else {
                    GC(16);
                    rC = g;
                    for (g = 0; 0 < rC && g < f; )
                        rC--,
                        pC &= 32767,
                        DC(8),
                        d[e + g++] = qC[pC++] = EC(8),
                        GC(8);
                    0 == rC && (vC = -1)
                }
                break;
            case 1:
                if (null != oC)
                    g = HC(a, c, b - c);
                else
                    a: {
                        var h;
                        g = a;
                        d = c;
                        e = b - c;
                        if (null == PC) {
                            f = Array(288);
                            for (h = 0; 144 > h; h++)
                                f[h] = 8;
                            for (; 256 > h; h++)
                                f[h] = 9;
                            for (; 280 > h; h++)
                                f[h] = 7;
                            for (; 288 > h; h++)
                                f[h] = 8;
                            wC = 7;
                            h = new CC(f,288,257,KC,LC,wC);
                            if (0 != h.status) {
                                g = -1;
                                break a
                            }
                            PC = h.h;
                            wC = h.g;
                            for (h = 0; 30 > h; h++)
                                f[h] = 5;
                            xC = 5;
                            h = new CC(f,30,0,MC,NC,xC);
                            if (1 < h.status) {
                                PC = null;
                                g = -1;
                                break a
                            }
                            yC = h.h;
                            xC = h.g
                        }
                        oC = PC;
                        tC = yC;
                        nC = wC;
                        sC = xC;
                        g = HC(g, d, e)
                    }
                break;
            case 2:
                g = null != oC ? HC(a, c, b - c) : IC(a, c, b - c);
                break;
            default:
                g = -1
            }
            if (-1 == g)
                return zC ? 0 : -1;
            c += g
        }
        return c
    }
    var FC = [0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535]
      , KC = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0]
      , LC = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99]
      , MC = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577]
      , NC = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13]
      , JC = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]
      , PC = null;
    function QC(a) {
        this.g = a
    }
    z(QC, Rz);
    QC.prototype.wa = function() {
        if (!this.h) {
            var a = this.g.wa();
            if (120 != a)
                throw Error();
            var b = this.g.wa();
            if (((a << 8) + b) % 31)
                throw Error();
            if (b & 32)
                throw Error();
            var c = this;
            null == qC && (qC = Array(65536));
            pC = mC = lC = rC = uC = 0;
            vC = -1;
            zC = !1;
            oC = null;
            kC = function() {
                return c.g.wa()
            }
            ;
            b = Array(2048);
            for (this.h = []; 0 < (a = OC(b, b.length)); )
                this.h = this.h.concat(b.length == a ? b : b.slice(0, a));
            a = jC(this.h);
            b = Array(4);
            if (4 != this.g.fb(b) || !bb(a, b))
                throw Error("Diff. checksum.");
            this.i = 0
        }
        return this.i < this.h.length ? this.h[this.i++] : -1
    }
    ;
    function RC(a, b, c, d) {
        this.g = new Yx(a,b);
        this.i = c;
        this.h = d
    }
    RC.prototype.Cb = function() {
        return new Yx(Math.round(this.g.x),Math.round(this.g.y))
    }
    ;
    function SC() {}
    ;function TC() {}
    ;function UC() {}
    function VC(a) {
        var b = WC(a);
        if (b) {
            var c = a.v;
            a = a.progress;
            var d;
            void 0 === d && (d = 0);
            yA();
            d = rA[d];
            for (var e = Array(Math.floor(b.length / 3)), f = d[64] || "", g = 0, h = 0; g < b.length - 2; g += 3) {
                var l = b[g]
                  , m = b[g + 1]
                  , n = b[g + 2]
                  , q = d[l >> 2];
                l = d[(l & 3) << 4 | m >> 4];
                m = d[(m & 15) << 2 | n >> 6];
                n = d[n & 63];
                e[h++] = q + l + m + n
            }
            q = 0;
            n = f;
            switch (b.length - g) {
            case 2:
                q = b[g + 1],
                n = d[(q & 15) << 2] || f;
            case 1:
                b = b[g],
                e[h] = d[b >> 2] + d[(b & 3) << 4 | q >> 4] + n + f
            }
            c = {
                gametime: c,
                progress: a,
                data: e.join("")
            }
        } else
            c = null;
        return c
    }
    function XC(a) {
        var b = a.data;
        if (b) {
            b = b.replace(/\s*/g, "");
            try {
                var c = xA(b)
            } catch (d) {
                W("sggi", d)
            }
            if (c && (b = YC(c)))
                return b.progress = a.progress,
                b
        }
        return null
    }
    UC.prototype.transform = function(a) {
        if (!this.l.Ec(a)) {
            var b = new Vx, c;
            b.translate(a.x, a.y);
            Xx(b, a.width / this.l.width, a.height / this.l.height);
            b.translate(-this.l.x, -this.l.y);
            this.j && this.j.g.transform(b);
            if (this.g) {
                var d = 0;
                for (c = this.g.length; d < c; d++)
                    this.g[d].h.g.transform(b)
            }
            if (this.h)
                for (d = 0,
                c = this.h.length; d < c; d++)
                    this.h[d].g.g.transform(b);
            b = this.l;
            d = a.y;
            c = a.width;
            var e = a.height;
            b.x = a.x;
            b.y = d;
            b.width = c;
            b.height = e
        }
    }
    ;
    UC.prototype.Ec = function(a) {
        return a instanceof UC && (a === this || bb(WC(this), WC(a)))
    }
    ;
    function ZC(a) {
        return !!a.g && 1 == a.g.length && a.g[0].g.length == pA(a.Ga)
    }
    function YC(a) {
        var b = new UC;
        try {
            var c = b
              , d = new zA(a)
              , e = Array(2);
            if (2 === d.fb(e, 0, 2)) {
                if (8192 >= e.length)
                    var f = String.fromCharCode.apply(null, e);
                else {
                    a = "";
                    for (var g = 0; g < e.length; g += 8192)
                        a += String.fromCharCode.apply(null, Array.prototype.slice.call(e, g, g + 8192));
                    f = a
                }
                if ("SG" === f) {
                    var h = new $z(new QC(d));
                    c.V(h);
                    h.close()
                } else if ("CG" === f) {
                    d = h = new Sz(d);
                    c.Ga = oA(d.Wa(), d.Wa(), d.Wa());
                    c.rotation = !!d.Wa();
                    var l = Array(4);
                    d.jc(l);
                    c.v = 16777216 * l[0] + ((l[1] & 255) << 16) + ((l[2] & 255) << 8) + (l[3] & 255);
                    c.u = c.K = 0;
                    c.l = new $x(0,0,100,100);
                    c.m = 0;
                    c.j = null;
                    c.F = !1;
                    var m = new TC
                      , n = pA(c.Ga);
                    m.h = new RC(0,0,0,0);
                    m.g = Array(n);
                    for (l = 0; l < n; l++)
                        m.g[l] = l;
                    c.g = [m];
                    c.h = void 0;
                    h.close()
                } else
                    throw Error("Incorrect saved game.");
            } else
                throw Error("Incorrect saved game.");
            if (!c.g && !c.h)
                throw Error("Incorrect saved game.");
            var q = pA(c.Ga), p = Array(q), u, x;
            if (c.g)
                for (u = 0; u < c.g.length; u++)
                    for (x = 0; x < c.g[u].g.length; x++) {
                        var B = c.g[u].g[x];
                        if (B >= q)
                            throw Error("Incorrect saved game.");
                        if (th(p[B]))
                            throw Error("Incorrect saved game.");
                        p[B] = !0
                    }
            if (c.h)
                for (u = 0; u < c.h.length; u++) {
                    B = c.h[u].h;
                    if (B >= q)
                        throw Error("Incorrect saved game.");
                    if (th(p[B]))
                        throw Error("Incorrect saved game.");
                    p[B] = !0
                }
            for (u = 0; u < p.length; u++)
                if (!th(p[u]))
                    throw Error("Incorrect saved game.");
        } catch (E) {
            Xi("Cannot process the saved game.", E),
            b = null
        }
        return b
    }
    function WC(a) {
        var b;
        void 0 === b && (b = 1E6);
        if (0 === b)
            var c = $C(a, 2);
        else
            (c = $C(a, 0)) && c.length > b && (c = $C(a, 2),
            c.length > b && (Xi("Cannot pack saved_game to required data size"),
            c = null));
        return c
    }
    function aD(a, b, c) {
        var d = (c.g.x - a.i.x) / a.i.width
          , e = (c.g.y - a.i.y) / a.i.height;
        a.u & 2 ? (b.Za(Math.round(255 * d - 128)),
        b.Za(Math.round(255 * e - 128))) : (b.sa(Math.round(65535 * d - 32768)),
        b.sa(Math.round(65535 * e - 32768)));
        b.sa(c.i);
        0 == (a.u & 1) && b.sa(c.h)
    }
    function bD(a, b) {
        if (a.u & 2) {
            var c = (b.Wa() + 128) / 255;
            var d = (b.Wa() + 128) / 255
        } else
            c = (b.va() + 32768) / 65535,
            d = (b.va() + 32768) / 65535;
        return new RC(c * a.i.width + a.i.x,d * a.i.height + a.i.y,b.va(),0 == (a.u & 1) ? b.va() : 0)
    }
    function cD(a, b) {
        var c, d, e = 0;
        var f = d = 0;
        for (c = b.length; f < c; f++) {
            var g = b[f];
            g -= d;
            if (63 < g) {
                var h = ~~(g / 256);
                h |= 64;
                e = g % 256
            } else
                h = g;
            f == c - 1 && (h |= 128);
            a.write(h);
            0 != (h & 64) && a.write(e);
            d += g
        }
    }
    function dD(a) {
        var b = [];
        var c = 0;
        do {
            var d = a.Sc();
            var e = d & 63;
            0 != (d & 64) && (e = 256 * e + a.Sc());
            c += e;
            b.push(c)
        } while (0 == (d & 128));
        return b
    }
    function eD(a, b, c) {
        aD(a, b, c.h);
        cD(b, c.g)
    }
    function fD(a, b) {
        a.sa(b.x);
        a.sa(b.y);
        a.sa(b.width);
        a.sa(b.height)
    }
    function gD(a) {
        return new $x(a.va(),a.va(),a.va(),a.va())
    }
    function hD(a) {
        function b(g, h) {
            e ? e.add(g, h) : e = new $x(g,h,0,0)
        }
        var c = !1, d, e;
        a.j && b(a.j.g.x, a.j.g.y);
        if (a.g)
            for (d = 0; d < a.g.length; d++) {
                var f = a.g[d].h;
                f.h && (c = !0);
                b(f.g.x, f.g.y)
            }
        if (a.h)
            for (d = 0; d < a.h.length; d++)
                f = a.h[d].g,
                f.h && (c = !0),
                b(f.g.x, f.g.y);
        a.i = cy(e);
        a = 0;
        c || (a |= 1);
        return a
    }
    function $C(a, b) {
        var c = Ph();
        try {
            var d;
            a.T = b;
            var e = new AA
              , f = a.Ga instanceof nA && 256 > a.Ga.h && 256 > a.Ga.i && 4294967295 >= a.v;
            if (ZC(a) && f) {
                e.Sa(jt("CG"));
                b = d = new Kz(e);
                b.Za(a.Ga.h);
                b.Za(a.Ga.i);
                b.Za(a.Ga.g);
                b.Za(a.rotation ? 1 : 0);
                var g = a.v;
                b.g.write(g >>> 24);
                b.g.write(g >> 16 & 255);
                b.g.write(g >> 8 & 255);
                b.g.write(g & 255);
                Lz(b, 4);
                d.close()
            } else
                e.Sa(jt("SG")),
                d = new Zz(new iC(e,9)),
                a.N(d),
                d.close();
            var h = e.g.slice(0);
            if (c && h && !YC(h))
                throw Error();
            return h
        } catch (l) {
            a = "Storing game failed",
            c ? (a += ". Because you use a problematic browser (" + Oh().join(", ") + ") we strongly recommend to update your device/browser.",
            Wt(Ut(), a, 1)) : W(a, l)
        }
        return null
    }
    UC.prototype.V = function(a) {
        if (13 != a.Wa())
            throw Error("Incorrect saved game.");
        a.Ve();
        var b = new nA;
        b.V(a);
        this.Ga = b;
        this.v = a.ee();
        this.u = a.va();
        this.i = gD(a);
        this.K = a.Wa();
        this.l = gD(a);
        this.rotation = 0 != a.Wa();
        a.de();
        (this.m = a.va()) ? (this.j = bD(this, a),
        0 > this.m ? (this.F = !1,
        this.m = -this.m) : this.F = !0) : (this.j = null,
        this.F = !1);
        bD(this, a);
        var c, d = pA(this.Ga);
        b = a.va();
        if (0 > b || b > d)
            throw Error("Incorrect saved game.");
        if (b)
            for (this.g = Array(b),
            c = 0; c < b; c++) {
                var e = this.g
                  , f = c
                  , g = a
                  , h = new TC;
                h.h = bD(this, g);
                h.g = dD(g);
                e[f] = h
            }
        b = a.va();
        if (0 > b || b > d)
            throw Error("Incorrect saved game.");
        if (b)
            for (d = dD(a),
            this.h = Array(b),
            c = 0; c < b; c++)
                e = this.h[c] = new SC,
                e.h = d[c],
                e.g = bD(this, a);
        a: {
            try {
                var l = a.Sc()
            } catch (u) {
                u instanceof Ez || W("rdchnk", u);
                var m = null;
                break a
            }
            try {
                if (-1 != l) {
                    var n = a.va();
                    if (0 < n) {
                        var q = Array(n);
                        a.jc(q);
                        var p = new Sz(new zA(q))
                    }
                    m = {
                        type: l,
                        data: p
                    };
                    break a
                }
            } catch (u) {
                W("rdchnk", u)
            }
            m = null
        }
        if (m && m.type == iD)
            for (c = 0; c < b; c++)
                this.h[c].i = !!(m.data.Sc() & 1)
    }
    ;
    UC.prototype.N = function(a) {
        var b;
        a.Za(13);
        a.cf("ClassicCutting");
        this.Ga.N(a);
        a.je(this.v);
        this.u = hD(this) | this.T | 16;
        a.sa(this.u);
        fD(a, this.i);
        a.Za(this.K);
        fD(a, this.l);
        a.Za(this.rotation ? 1 : 0);
        a.Fd(1);
        this.j ? (a.sa(this.F ? this.m : -this.m),
        aD(this, a, this.j)) : a.sa(0);
        aD(this, a, new RC(this.i.x,this.i.y,0,0));
        if (this.g) {
            var c = this.g.length;
            a.sa(c);
            for (b = 0; b < c; b++) {
                var d = this.g[b];
                d.g.sort(function(l, m) {
                    return l - m
                });
                eD(this, a, d)
            }
        } else
            a.sa(0);
        if (this.h) {
            this.h.sort(function(l, m) {
                return l.h - m.h
            });
            c = this.h.length;
            a.sa(c);
            d = Array(c);
            var e = Array(c);
            var f = Array(c);
            for (b = 0; b < c; b++) {
                var g = this.h[b];
                d[b] = g.h;
                e[b] = g.g;
                var h = 0;
                g.i && (h |= 1);
                f[b] = h
            }
            cD(a, d);
            for (b = 0; b < c; b++)
                aD(this, a, e[b])
        } else
            a.sa(0);
        f && jD(a, function(l) {
            l.Sa(f)
        })
    }
    ;
    var iD = 1;
    function jD(a, b) {
        var c = iD
          , d = new AA
          , e = new Kz(d);
        b(e);
        e.flush();
        a.write(c);
        b = d.size();
        a.sa(b);
        a.Sa(d.g.slice(0))
    }
    ;function kD() {}
    var lD, mD;
    function nD(a) {
        if (!mD)
            try {
                a: {
                    a = "SG_" + a;
                    var b = Es().get(a);
                    if (b) {
                        var c = ko(b.substring(b.indexOf(";") + 1));
                        if (Da(c)) {
                            var d = c;
                            break a
                        }
                    }
                    d = null
                }
                return d
            } catch (e) {
                e instanceof vs && e.name === ws && (mD = !0),
                (e instanceof vs ? Xi : W)("Cannot read saved games from LocalStorage", e)
            }
        return null
    }
    kD.prototype.h = function(a, b) {
        var c = null;
        (a = nD(a)) && (c = XC(a));
        b(c)
    }
    ;
    kD.prototype.xc = function(a, b, c) {
        var d = !1;
        try {
            var e = Es();
            a = "SG_" + a;
            var f = VC(b), g;
            if (g = f) {
                var h = ~~(Mi() / 1E3) + ";" + mo(f)
                  , l = Es();
                l.set(a, h);
                g = l.get(a) === h
            }
            if (g)
                for (d = !0,
                b = 0,
                f = void 0; 100 < (f = Bs(e)) && 100 > b; b++) {
                    var m = Number.MAX_VALUE;
                    g = void 0;
                    for (h = 0; h < f; h++) {
                        var n = e.key(h);
                        l = void 0;
                        a = n;
                        var q = Es().get(a);
                        q && (l = Dh(q.substring(0, q.indexOf(";") - 1)) || void 0);
                        var p = l;
                        p < m && (m = p,
                        g = n)
                    }
                    g = g || e.key(0);
                    zs(Es(), g)
                }
        } catch (u) {
            Wt(Ut(), "Cannot save a game", 1),
            (u instanceof vs ? Xi : W)("Cannot save a game", u)
        }
        c && c(d)
    }
    ;
    kD.prototype.g = function() {}
    ;
    kD.prototype.i = function(a) {
        try {
            a = "SG_" + a,
            zs(Es(), a)
        } catch (b) {
            Xi("cntdg", b)
        }
    }
    ;
    function Lx(a) {
        yx.call(this, a);
        this.pb = this.pb || {};
        this.pb[0] = !0
    }
    z(Lx, yx);
    k = Lx.prototype;
    k.getData = function() {
        return yx.prototype.getData.call(this)
    }
    ;
    k.Hc = function() {
        function a() {
            Ax.apply(this, arguments)
        }
        var b = oD(this)
          , c = this.getData();
        z(a, Ax);
        a.Error = Sj;
        a.prototype.Gc = function() {
            var d = Ax.prototype.Gc.call(this);
            100 === b && d.push(sl(cm("check", null, "ts-label")));
            return d
        }
        ;
        a.prototype.oc = function() {
            var d = Ax.prototype.oc.call(this), e;
            return 3 !== d && 0 !== d && (e = c.ea().album) && "private" === Xw(e) ? 0 : d
        }
        ;
        a.prototype.pf = function() {
            var d = Ax.prototype.pf.call(this);
            if (void 0 !== b && 100 !== b) {
                var e = d.push;
                var f = b;
                var g = new J(100,100);
                .5 > f && (f = .5);
                var h = g.width / 2
                  , l = g.height / 2
                  , m = Math.sqrt(h * h + l * l) + 4
                  , n = -Math.PI / 2 + 2 * Math.PI * f / 100;
                f = jy("svg", {
                    "class": "ts-progress",
                    viewBox: "0 0 " + g.width + " " + g.height,
                    preserveAspectRatio: "xMaxYMid slice"
                }, jy("path", {
                    d: "M" + h + " " + (l - m) + " A " + m + " " + m + " 0 " + (50 > f ? 1 : 0) + " 0 " + (h + m * Math.cos(n)) + " " + (l + m * Math.sin(n)) + " L " + h + " " + l + " z"
                }));
                e.call(d, sl(f))
            }
            return d
        }
        ;
        a.prototype.qf = function() {
            switch (Kx(this.$d)) {
            case 1:
                var d = V("deleted");
                break;
            case 4:
                d = V("access denied");
                break;
            case 5:
                d = V("inaccessible")
            }
            return [Dx(d)]
        }
        ;
        return new a(c,!0,0 !== Kx(c) ? ["ts-block"] : void 0)
    }
    ;
    k.Zc = function() {
        yx.prototype.Zc.call(this);
        Vt() || qz().then(function(a) {
            if (!a && !this.W() && (a = vt(this.ua))) {
                var b = this.getData(), c;
                var d = this.s;
                b = b.ea().pid;
                var e = rt(a);
                3 !== e && 1 !== e && 2 !== e && (c = a.pa.url) && at.test(c) ? (c = bt(c, 1280),
                c = mx(d, c, b)) : c = null;
                c && N(this, c)
            }
        }
        .bind(this))
    }
    ;
    k.rf = function() {
        function a() {
            Bx.apply(this, arguments)
        }
        var b = this.getData()
          , c = b.ea().user || null
          , d = b.ea().album || null;
        z(a, Bx);
        a.Error = Sj;
        a.prototype.J = function() {
            Bx.prototype.J.call(this);
            var f = [];
            c && f.push("ts-viewmod-onlyimgs");
            te(this.o(), nu(f))
        }
        ;
        var e = new a(b);
        c ? e.Aa(c.Ba(), 0) : d && e.Aa(qy(Xw(d)), 0);
        b = pD(oA(b.ea().pieces, 1, b.ea().curve), b.ea().rotation);
        e.H(sl(b));
        return e
    }
    ;
    function oD(a) {
        if (void 0 === a.h) {
            var b = a.getData(), c, d = b.pa.extras || null;
            if (d)
                var e = d.progress;
            a.h = e;
            void 0 === a.h && !Zt() && (c = nD(b.ea().pid)) && (a.h = c.progress)
        }
        return a.h
    }
    k.Cf = function() {
        var a = yx.prototype.Cf.call(this)
          , b = oD(this);
        void 0 !== b && (a += " | " + (100 > b ? yi(V("%s%% complete"), "" + b) : V("This puzzle is completed")));
        return a
    }
    ;
    k.Qd = function() {
        return this.getData().ea().pid
    }
    ;
    k.Bf = function() {
        for (var a = this.getData(), b = yx.prototype.Bf.call(this), c = 0, d = b.length; c < d; c++) {
            var e = b[c];
            if ("a" === e.key) {
                var f = vt(a)
                  , g = uh();
                b[c] = qD(f.$(), f.Z(), a.ea().pieces, a.ea().curve, a.ea().rotation, e.link, "play" === g);
                b[c].key = "a"
            }
            "b" === e.key && (f = rD(a.ea().pid, ut(a))) && Array.isArray(e.link) && e.link.push(f)
        }
        return b
    }
    ;
    function pD(a, b) {
        b = sD(a.g, b, !0);
        a = pA(a);
        return K("SPAN", "ts-cut-desc", K("SPAN", {
            title: yi(wi("%d piece", "%d pieces", a), a)
        }, a + ""), b)
    }
    function sD(a, b, c) {
        var d = new Image;
        void 0 !== c && (d.title = b ? V("Rotation") : V("No rotation"));
        d.src = "/img/shapes/" + a + (b ? "1" : "0") + ".svg" + it();
        return d
    }
    function qD(a, b, c, d, e, f, g) {
        var h = []
          , l = {
            title: V("Play As"),
            link: h
        }
          , m = kA(a, b);
        Ra(m, function(n) {
            var q = {};
            q.pieces = id(n);
            var p = tD(q, f);
            n = {
                title: K("SPAN", {
                    style: "display:inline-block;width:100%;text-align:right"
                }, pD(oA(n.width, n.height, d), e))
            };
            g ? n.onclick = function() {
                A.location.replace(p)
            }
            : n.link = p;
            h.push(n)
        });
        h.push({
            title: V("Custom..."),
            onclick: function() {
                uD(c, d, e, a, b, function(n) {
                    n && (c == n.pieces && delete n.pieces,
                    d == n.shape && delete n.shape,
                    e == n.rotation && delete n.rotation,
                    n = tD(n, f),
                    g ? A.location.replace(n) : Al(n))
                })
            }
        });
        h.push({
            separator: !0
        });
        m = {
            title: V("Original")
        };
        g ? m.onclick = function() {
            A.location.replace(f)
        }
        : m.link = f;
        h.push(m);
        return l
    }
    function rD(a, b) {
        if (navigator.share) {
            var c = {};
            c.title = V("More") + "...";
            c.onclick = function() {
                navigator.share({
                    title: "Jigsaw Planet - " + b,
                    text: yi('Play the "%s" puzzle!', b),
                    url: Ws("play", {
                        pid: a
                    })
                })
            }
            ;
            c.ico = "ellipsis-h"
        } else
            c = null;
        return c
    }
    function tD(a, b) {
        for (var c in a)
            b += "&" + c + "=" + ("boolean" === typeof a[c] ? a[c] ? 1 : 0 : a[c]);
        return b
    }
    function vD(a, b) {
        return new Y("DIV","ts-row",K("DIV", "ts-cell", a),new Y("DIV","ts-cell",b))
    }
    function uD(a, b, c, d, e, f) {
        e = hA(d, e);
        d = [];
        var g;
        for (g = 0; g < e.length; g++)
            d[g] = id(e[g]);
        e = K("DIV", "ts-shape-choice");
        for (g = 0; g < mA; g++) {
            var h = vh();
            Md(e, K("LABEL", {
                "for": h
            }, sD(g, !1), kl({
                type: "radio",
                name: "shape",
                value: g,
                id: h,
                checked: b === g
            })))
        }
        b = vh();
        a = Eo(a, d);
        var l = new Y("FORM","ts-form-table",new Y("DIV","ts-row-group",vD(K("SPAN", "ts-label-like", V("Pieces")), a)),new Y("DIV","ts-row-group",vD(K("SPAN", "ts-label-like", V("Shape")), e)),new Y("DIV",["ts-row-group", "CheckboxElement"],vD(kl({
            type: "checkbox",
            name: "rotation",
            checked: c,
            id: b
        }), K("LABEL", {
            "for": b
        }, V("Rotation")))));
        c = new yp(V("Custom cut"));
        c.H(l);
        a = new hp;
        gp(a, {
            key: "play",
            caption: V("Play")
        }, !0);
        sp(c, a);
        c.C(tp, function() {
            var m = {}
              , n = fm(l.s)
              , q = v(n, "keys").call(n);
            q = y(q);
            for (var p = q.next(); !p.done; p = q.next())
                p = p.value,
                m[p] = n.get(p)[0];
            m.rotation = !!m.rotation;
            f(m)
        });
        c.Fa = {
            width: 80,
            Qc: 600
        };
        c.L(!0)
    }
    ;function wD(a) {
        function b(d, e) {
            return d in a ? !!a[d] : !!e
        }
        var c = {
            fe: b("saveGameToServer"),
            Oh: b("gmPlaySounds"),
            Bh: b("gmMaximizeToFullscreen"),
            $h: b("gmShowImageOnStart"),
            Yh: b("gmShowGhostOnStart"),
            qh: a.gmGhostOpacity,
            Ff: a.gmGhostPosition,
            Zh: b("gmShowGhostOutlineIfHidden"),
            backgroundColor: a.gmBackgroundColor,
            dh: a.ad
        };
        oo(c);
        return c
    }
    function xD() {
        var a = sh("view");
        return "iframe" === a || "maximized" === a ? a : 1 == sh("iframe") ? "iframe" : void 0
    }
    function yD() {
        var a = sh("pview");
        return "iframe" === a ? a : void 0
    }
    function zD() {
        return "iframe" === xD()
    }
    function AD() {
        return "maximized" === xD()
    }
    function BD() {
        return V("Are you sure you want to restart the game?")
    }
    ;function CD(a, b) {
        He.call(this, a, b)
    }
    z(CD, He);
    function DD(a) {
        function b(c) {
            var d = Dh(a[c]);
            isNaN(d) && (d = a.style[nd(c)],
            d = (c = "undefined" !== typeof d ? d : a.style[Af(a, c)] || "") && v(c, "endsWith").call(c, "px") ? Dh(c) : 0);
            return d
        }
        M.call(this);
        this.s = a;
        this.oa = null;
        this.vd = !0;
        this.zh = !1;
        this.Ie = !0;
        this.Ah = !1;
        this.Wc = b("width");
        this.Na = b("height");
        this.X(0, 0)
    }
    z(DD, M);
    k = DD.prototype;
    k.D = function() {
        ED(this, !1);
        FD(this);
        this.wc && (this.wc.disconnect(),
        delete this.wc);
        this.Va && (this.Va.G(),
        delete this.Va);
        delete this.s;
        delete this.Ab;
        M.prototype.D.call(this)
    }
    ;
    k.ka = function() {
        this.Va || (this.Va = new U(this));
        return this.Va
    }
    ;
    k.contains = function(a, b) {
        return 0 <= a && 0 <= b && a < this.Wc && b < this.Na
    }
    ;
    k.o = function() {
        return this.s
    }
    ;
    k.$ = function() {
        return this.Wc
    }
    ;
    k.Z = function() {
        return this.Na
    }
    ;
    k.getSize = function() {
        return new J(this.Wc,this.Na)
    }
    ;
    function GD(a, b, c) {
        a.Gb(null, null, b, c)
    }
    k.qa = function(a) {
        this.Ie = a
    }
    ;
    k.isEnabled = function() {
        return this.Ie && this.isVisible()
    }
    ;
    k.L = function(a) {
        this.vd != a && (this.s.style.visibility = a ? "" : "hidden",
        Bi(function() {
            this.W() || (this.s.style.visibility = this.vd ? "" : "hidden")
        }, 0, this));
        this.vd = a
    }
    ;
    k.isVisible = function() {
        return this.vd
    }
    ;
    k.Gb = function(a, b, c, d) {
        var e = this
          , f = e.s.style;
        a instanceof $x && (b = a.y,
        c = a.width,
        d = a.height,
        a = a.x);
        null === a || a == e.ca && b == e.da || (e.ca = a,
        e.da = b,
        f.left = km(a),
        f.top = km(b),
        e.Ab && e.Ab.forEach(function(g) {
            g.ih(new He(HD,e))
        }));
        null == c || e.Wc == c && e.Na == d || (e.Wc = c,
        e.Na = d,
        e.Ah || (f.width = km(c),
        f.height = km(d)),
        e.Ab && e.Ab.forEach(function(g) {
            g.jh()
        }))
    }
    ;
    k.Ob = function() {
        return new $x(this.ca,this.da,this.Wc,this.Na)
    }
    ;
    k.Cb = function() {
        return new Yx(this.ca,this.da)
    }
    ;
    k.X = function(a, b) {
        if (a instanceof Yx) {
            var c = a.x;
            a = a.y
        } else
            c = a,
            a = b;
        this.Gb(c, a, null, null)
    }
    ;
    k.getParent = function() {
        return this.oa
    }
    ;
    k.Bd = function(a) {
        this.oa = a
    }
    ;
    function ED(a, b, c) {
        a.zh != b && ((a.zh = b) ? (b = ID(),
        JD(a, b),
        KD("touchstart", a, b),
        LD()) : (b = ID(),
        MD("mousedown", a, b),
        MD("touchstart", a, b)));
        a.sj = c
    }
    k.Df = function(a, b) {
        return this.vd && this.Ie && this.contains(a, b) ? this : null
    }
    ;
    function ND(a) {
        function b() {
            if (!c.W()) {
                var d = Rf(c.s);
                GD(c, d.width, d.height)
            }
        }
        var c = a;
        a.Ah = !0;
        b();
        A.ResizeObserver ? (a.wc = new ResizeObserver(function() {
            b()
        }
        ),
        a.wc.observe(a.s)) : a.ka().C(A, "resize", function() {
            Bi(b, 1E3)
        })
    }
    function JD(a, b) {
        KD("mousedown", a, b)
    }
    k.toString = function() {
        return M.prototype.toString.call(this)
    }
    ;
    var HD = "moved";
    function OD(a, b) {
        var c = L("DIV");
        R(c, "color", "#fff");
        Qf(c, a);
        DD.call(this, c);
        this.L(!1);
        var d = this;
        Ig(function() {
            d.W() || (d.L(!0),
            vz(c.id = vh(), b).then(function(e) {
                e && N(d, e)
            }))
        })
    }
    z(OD, DD);
    function PD(a, b) {
        qf.call(this);
        this.s = a;
        a = Sd(this.s) ? this.s : this.s ? this.s.body : null;
        this.j = !!a && Uf(a);
        this.g = Q(this.s, Ib ? "DOMMouseScroll" : "mousewheel", this, b)
    }
    z(PD, qf);
    PD.prototype.handleEvent = function(a) {
        var b = 0
          , c = 0
          , d = a.ja;
        "mousewheel" == d.type ? (a = vm(-d.wheelDelta),
        th(d.wheelDeltaX) ? (b = vm(-d.wheelDeltaX),
        c = vm(-d.wheelDeltaY)) : c = a) : (a = d.detail,
        100 < a ? a = 3 : -100 > a && (a = -3),
        th(d.axis) && d.axis === d.HORIZONTAL_AXIS ? b = a : c = a);
        "number" === typeof this.h && (b = fd(b, -this.h, this.h));
        "number" === typeof this.i && (c = fd(c, -this.i, this.i));
        this.j && (b = -b);
        b = new wm(a,d,b,c);
        this.dispatchEvent(b)
    }
    ;
    PD.prototype.D = function() {
        qf.prototype.D.call(this);
        gf(this.g);
        this.g = null
    }
    ;
    function QD(a) {
        a = a || K("DIV");
        var b = a.style.position;
        "relative" != b && "absolute" != b && "fixed" != b && (a.style.position = "relative");
        DD.call(this, a);
        this.h = []
    }
    z(QD, DD);
    k = QD.prototype;
    k.contains = function(a, b) {
        if (0 <= a && 0 <= b && a < this.Wc && b < this.Na)
            if (this.$a)
                for (var c = 0, d = this.h.length; c < d; c++) {
                    var e = this.h[c];
                    if (e.contains(a - e.ca, b - e.da))
                        return !0
                }
            else
                return !0;
        return !1
    }
    ;
    k.add = function(a, b) {
        var c = a.getParent();
        c && c.ra(a);
        c = a.o();
        c.style.position = "absolute";
        a.Bd(this);
        if (void 0 === b || -1 === b)
            b = this.h.length;
        this.o().insertBefore(c, b < this.h.length ? this.h[b].o() : null);
        this.h.splice(b, 0, a)
    }
    ;
    k.ra = function(a) {
        var b;
        a instanceof DD ? b = Qa(this.h, a) : a = this.h[b = a];
        this.o().removeChild(a.o());
        this.h.splice(b, 1);
        a.Bd(null)
    }
    ;
    k.D = function() {
        for (var a = this.h.slice(0), b = this.o(), c = 0, d = this.h.length; c < d; c++) {
            var e = this.h[c]
              , f = e.o();
            Td(f) === b ? b.removeChild(f) : W("Cntnr rmall: " + xe(Td(f)) + "; " + xe(e));
            e.Bd(null)
        }
        b = this.h.length = 0;
        for (c = a.length; b < c; b++)
            a[b].G();
        this.h.length = 0;
        DD.prototype.D.call(this)
    }
    ;
    function RD(a) {
        return a.h.length
    }
    function SD(a, b) {
        if (0 > b || b >= a.h.length)
            throw Error();
        return a.h[b]
    }
    function TD(a, b, c, d) {
        if (a.vd && (!d || a.Ie) && a.contains(b, c)) {
            for (var e = a.h, f = e.length - 1, g; 0 <= f; f--)
                if (g = e[f],
                g instanceof QD) {
                    if (g = TD(g, b - g.ca, c - g.da, d))
                        return g
                } else if (g.isVisible() && (!d || g.isEnabled()) && g.contains(b - g.ca, c - g.da))
                    return g;
            return a
        }
        return null
    }
    k.Df = function(a, b) {
        return TD(this, a, b, !0)
    }
    ;
    function UD(a) {
        QD.call(this, a);
        this.m = Array(3);
        for (a = 0; 3 > a; a++)
            this.m[a] = 0
    }
    z(UD, QD);
    UD.prototype.add = function(a, b) {
        QD.prototype.add.call(this, a, VD(this, WD, b));
        for (a = WD + 1; a < this.m.length; a++)
            this.m[a]++
    }
    ;
    UD.prototype.ra = function(a) {
        var b = "number" === typeof a ? SD(this, a) : a;
        for (b = XD(this, b) + 1; b < this.m.length; b++)
            this.m[b]--;
        QD.prototype.ra.call(this, a)
    }
    ;
    function XD(a, b) {
        b = Qa(a.h, b);
        for (var c = 1; 3 > c; c++)
            if (b < a.m[c])
                return c - 1;
        return 2
    }
    function YD(a, b, c, d) {
        var e = XD(a, b);
        void 0 === c && (c = e);
        for (e += 1; e < a.m.length; e++)
            a.m[e]--;
        d = e = VD(a, c, d);
        e = Qa(a.h, b);
        e !== d && (a.h.splice(e, 1),
        a.o().insertBefore(b.o(), d < a.h.length ? a.h[d].o() : null),
        a.h.splice(d, 0, b));
        for (e = c + 1; e < a.m.length; e++)
            a.m[e]++
    }
    function VD(a, b, c) {
        return -1 !== c && th(c) ? a.m[b] + c : b + 1 < a.m.length ? a.m[b + 1] : RD(a)
    }
    var WD = 1;
    function ZD(a) {
        UD.call(this, a);
        $D.push(this)
    }
    z(ZD, UD);
    ZD.prototype.D = function() {
        this.N && (Qd(this.N),
        delete this.N);
        Wa($D, this);
        UD.prototype.D.call(this)
    }
    ;
    var $D = [];
    function aE(a, b) {
        b = Mf(b);
        var c = If(document);
        a.translate(c.x - b.x, c.y - b.y)
    }
    var bE = fc(function() {
        return ig && !qg(59)
    });
    function cE(a) {
        return !a || bE() ? yh() : a
    }
    ;function dE() {}
    var eE, fE, gE, hE, iE, jE;
    function ID() {
        return eE || (eE = new dE)
    }
    function LD() {
        if (!fE) {
            var a = document;
            fE = new U;
            fE.C(a, "mouseup", kE, mi);
            if (Bh()) {
                fE.C(a, "touchend", lE, mi);
                fE.C(a, "touchcancel", mE, mi);
                var b = mi;
                b = Da(b) ? no({}, b, {
                    capture: !0
                }) : !0;
                fE.C(a, "touchstart", function(c) {
                    nE(0) ? (c.preventDefault(),
                    c.stopPropagation()) : 1 === c.ja.touches.length && oE(1) && nE(1)
                }, b)
            }
        }
    }
    function pE(a) {
        return a ? qE.has(a) : !!qE.size
    }
    dE.prototype.Vf = function(a) {
        var b = a.target;
        0 !== a.button || a.ctrlKey || a.shiftKey || a.altKey || a.metaKey || pE(b) || oE(0) || (rE({
            component: b,
            vc: 0,
            timeStamp: a.timeStamp
        }, a.clientX, a.clientY),
        gE ? gE.G() : gE = new U,
        gE.C(document, "mousemove", sE, mi))
    }
    ;
    function sE(a) {
        tE(function(b) {
            uE(b, a.clientX, a.clientY)
        }, function(b) {
            return 0 === b.vc
        })
    }
    function kE(a) {
        if (!a.button) {
            var b = cE(a.ja.timeStamp);
            tE(function(c) {
                var d = a.clientX
                  , e = a.clientY;
                vE(c);
                c.component.Ye(d, e, c.vc)
            }, function(c) {
                return 0 === c.vc && !(c.component.sj && 200 > b - c.timeStamp)
            });
            oE(0) || (gE && gE.G(),
            a.stopPropagation(),
            a.preventDefault())
        }
    }
    function tE(a, b) {
        try {
            for (var c = y(v(qE, "values").call(qE)), d = c.next(); !d.done; d = c.next()) {
                var e = d.value;
                b && !b(e) || a(e)
            }
        } catch (f) {
            W("frall failed", f)
        }
    }
    function nE(a) {
        var b = !1;
        tE(function(c) {
            b = !0;
            vE(c);
            c.component.Ye(void 0, void 0, c.vc)
        }, function(c) {
            return c.vc === a
        });
        return b
    }
    function oE(a) {
        for (var b = y(v(qE, "values").call(qE)), c = b.next(); !c.done; c = b.next())
            if (c = c.value,
            void 0 === a || c.vc === a)
                return !0;
        return !1
    }
    dE.prototype.af = function(a) {
        var b = a.target;
        pE(b) || (b = {
            component: b,
            vc: 1,
            identifier: a.identifier
        },
        hE || (hE = new U,
        hE.C(document, "touchmove", wE, mi)),
        rE(b, a.clientX, a.clientY))
    }
    ;
    function xE(a) {
        for (var b = y(v(qE, "values").call(qE)), c = b.next(); !c.done; c = b.next())
            if (c = c.value,
            c.identifier === a)
                return c
    }
    function wE(a) {
        var b = a.ja.changedTouches, c, d;
        for (c = 0; c < b.length; c++) {
            var e = b[c];
            if (d = xE(e.identifier))
                uE(d, e.clientX, e.clientY),
                a.preventDefault()
        }
    }
    function lE(a) {
        var b = a.ja.changedTouches, c, d;
        for (c = 0; c < b.length; c++) {
            var e = b[c];
            if (d = xE(e.identifier)) {
                var f = e.clientX;
                e = e.clientY;
                vE(d);
                d.component.Ye(f, e, d.vc);
                a.preventDefault()
            }
        }
    }
    function mE(a) {
        var b = a.ja.changedTouches, c;
        for (c = 0; c < b.length; c++) {
            var d = b[c];
            if (d = xE(d.identifier))
                yE(d),
                a.preventDefault()
        }
    }
    function rE(a, b, c) {
        var d = a.component;
        a.jd = d.getParent();
        a.tf = a.we = d.ca;
        a.uf = a.xe = d.da;
        a.Ri = b;
        a.Si = c;
        a.jd instanceof UD && (a.hh = XD(a.jd, d));
        qE.set(d, a);
        a.jd.ra(d);
        b = ID();
        d.Ab || (d.Ab = new t.Set);
        d.Ab.add(b);
        iE ? iE.L(!0) : (iE = new QD(K("DIV", {
            style: "position:fixed;top:0;left:0;bottom:0;right:0;overflow:hidden;z-index:32000",
            "class": "dragging unselectable"
        })),
        iE.$a = !0,
        b = $D[0],
        b.N = iE.o(),
        c = b.o(),
        c.parentNode && c.parentNode.insertBefore(b.N, c.nextSibling),
        ND(iE),
        b = iE.o(),
        Q(new PD(b), "mousewheel", Je),
        b.oncontextmenu = cc);
        a.ye = Nf(a.jd.o(), iE.o());
        iE.add(d);
        if (b = d.Ic())
            b = a.Uc = new DD(b),
            GD(b, 8, 8),
            b.qa(!1),
            b.X(d.ca, d.da),
            iE.add(b, 0);
        d.X(d.ca + a.ye.x, d.da + a.ye.y);
        d.Cd()
    }
    function uE(a, b, c) {
        a.tf = b = a.we + b - a.Ri;
        a.uf = c = a.xe + c - a.Si;
        jE = !0;
        a.component.X(b, c);
        jE = !1;
        a.Uc && a.Uc.X(b, c)
    }
    function vE(a) {
        var b = a.component;
        qE.delete(b);
        var c = ID();
        b.Ab.delete(c);
        a.Uc && (iE.ra(a.Uc),
        a.Uc.G());
        iE.ra(b);
        b.X(b.ca - a.ye.x, b.da - a.ye.y);
        a.jd.add(b);
        th(a.hh) && YD(a.jd, b, a.hh, 0);
        0 === RD(iE) && iE.L(!1)
    }
    function yE(a) {
        var b = a.component;
        jE = !0;
        b.X(a.we, a.xe);
        jE = !1;
        vE(a);
        b.fh()
    }
    dE.prototype.jh = function() {}
    ;
    dE.prototype.ih = function(a) {
        if (!jE) {
            var b = a.target;
            a = qE.get(b);
            var c = b.ca;
            b = b.da;
            a.we -= a.tf - c;
            a.xe -= a.uf - b;
            a.Uc && a.Uc.X(c, b);
            a.tf = c;
            a.uf = b
        }
    }
    ;
    var qE = new t.Map;
    function zE(a) {
        function b() {
            var g = e & 15;
            e >>= 4;
            return c[g + 2]
        }
        var c = AE().split(" "), d, e = Dh(c[1], 16);
        if (a = a[b() + b()])
            if (a = a[b() + b()])
                if (d = a[b()][b() + b()]) {
                    a = String.fromCharCode(46);
                    d = d.split(a);
                    var f = d.length;
                    return 2 <= f ? (d = d[f - 2] + a + d[f - 1],
                    a = BA(jt(d)),
                    446497884 === a || 939329143 === a) : !1
                }
        return !0
    }
    function AE() {
        return "DBGMSGID B820163: View default location owner of current Document with host %s and name %s."
    }
    ;var BE, CE;
    function KD(a, b, c) {
        var d = DE[a];
        d || (d = DE[a] = new t.Map);
        (a = d.get(b)) || d.set(b, a = new t.Set);
        a.add(c);
        if (!BE) {
            var e;
            c = document;
            for (e in EE)
                b = EE[e],
                "wheel" === e ? Q(new PD(c,mi), "mousewheel", b, mi) : c.addEventListener(e, b, mi);
            BE = !0
        }
    }
    function MD(a, b, c) {
        var d = DE[a];
        if (d) {
            var e = d.get(b);
            e && (e.delete(c),
            e.size || (d.delete(b),
            d.size || delete DE[a]))
        }
    }
    function FD(a) {
        var b, c, d = [];
        for (b in DE)
            if (c = DE[b]) {
                var e = c.get(a);
                e && (e.clear(),
                c.delete(a),
                c.size || d.push(b))
            }
        for (b = 0; b < d.length; b++)
            delete DE[d[b]]
    }
    function FE(a) {
        for (var b = y($D), c = b.next(); !c.done; c = b.next())
            if (c = c.value,
            Ud(c.o(), a))
                return c;
        return (b = iE) && Ud(b.o(), a) ? b : null
    }
    function GE(a, b) {
        var c = DE[b];
        if (c) {
            var d;
            if (d = FE(a.target)) {
                var e = function(g) {
                    var h = new Yx(a.clientX,a.clientY);
                    aE(h, g.o());
                    return g.Df(h.x, h.y)
                };
                if (!(b = e(d)) && d === iE) {
                    d = y($D);
                    for (var f = d.next(); !f.done && !(b = e(f.value)); f = d.next())
                        ;
                }
                if (b && (c = c.get(b)) && (e = new Yx(a.clientX,a.clientY),
                aE(e, b.o()),
                c = {
                    component: b,
                    Ea: c,
                    Bb: e.x,
                    Mb: e.y
                },
                HE += c.Bb,
                HE & 7 || zE(b.o())))
                    return bq(),
                    c
            }
        }
    }
    function IE(a) {
        var b = cE(a.timeStamp)
          , c = a.type
          , d = GE(a, c);
        if (d) {
            var e = new CD(c,d.component);
            e.Bb = d.Bb;
            e.Mb = d.Mb;
            e.button = a.button;
            e.clientX = a.clientX;
            e.clientY = a.clientY;
            e.ctrlKey = a.ctrlKey;
            e.shiftKey = a.shiftKey;
            e.altKey = a.altKey;
            e.metaKey = a.metaKey;
            e.timeStamp = b;
            var f;
            (new t.Set(d.Ea)).forEach(function(g) {
                if (d.Ea.has(g)) {
                    switch (a.type) {
                    case "click":
                        f = g.Ne;
                        break;
                    case "mousedown":
                        f = g.Vf;
                        break;
                    case "mouseup":
                        f = g.Ek
                    }
                    try {
                        f.call(g, e)
                    } catch (h) {
                        W("mslst", h)
                    }
                }
            });
            a.preventDefault()
        }
    }
    function JE(a, b) {
        var c = a.changedTouches, d, e = !1;
        try {
            var f = 0;
            for (d = c.length; f < d; f++) {
                var g = c[f]
                  , h = GE(g, a.type);
                h && (b.call(h, g),
                e = !0)
            }
        } catch (l) {
            W("tchit (" + a.type + ")", l)
        }
        return e
    }
    function KE(a) {
        var b = cE(a.timeStamp);
        JE(a, function(c) {
            var d = new CD("touchstart",this.component);
            d.Bb = this.Bb;
            d.Mb = this.Mb;
            d.clientX = c.clientX;
            d.clientY = c.clientY;
            d.identifier = c.identifier;
            d.timeStamp = b;
            this.Ea.forEach(function(e) {
                e.af.call(e, d)
            })
        }) && a.preventDefault()
    }
    var EE = {
        click: IE,
        mousedown: IE,
        mouseup: IE,
        mousemove: function(a) {
            LE.x = a.clientX;
            LE.y = a.clientY
        },
        wheel: function(a) {
            var b = pE() ? {
                target: a.target,
                clientX: LE.x,
                clientY: LE.y
            } : a.ja
              , c = GE(b, "wheel");
            if (c) {
                var d = a.deltaY;
                if (d) {
                    var e = Math.abs(d);
                    if (!CE || e < CE)
                        CE = e;
                    var f = new CD("wheel",c.component);
                    f.Bb = c.Bb;
                    f.Mb = c.Mb;
                    f.clientX = b.clientX;
                    f.clientY = b.clientY;
                    f.deltaY = Math.round(d / CE);
                    try {
                        c.Ea.forEach(function(g) {
                            g.Pc && ME(g, 90 * f.deltaY, new Yx(f.Bb,f.Mb))
                        })
                    } catch (g) {
                        W("mswh", g)
                    }
                    a.preventDefault()
                }
            }
        }
    };
    Bh() && (EE.touchstart = KE);
    var DE = {}
      , LE = new Yx
      , HE = 0;
    function NE() {
        this.g = {}
    }
    NE.prototype.set = function(a, b) {
        this.g[a] = b
    }
    ;
    NE.prototype.get = function(a) {
        return this.g[a]
    }
    ;
    function OE(a, b, c) {
        this.x = void 0 !== a ? a : 0;
        this.y = void 0 !== b ? b : 0;
        this.z = void 0 !== c ? c : 0
    }
    ;function PE(a, b, c) {
        this.x = a;
        this.y = b;
        this.z = c
    }
    D(PE, OE);
    PE.prototype.add = function(a) {
        this.x += a.x;
        this.y += a.y;
        this.z += a.z;
        return this
    }
    ;
    var QE;
    function RE(a, b) {
        var c = b.Me
          , d = a.x * c.x + a.y * c.y + a.z * c.z
          , e = 2 * d;
        a = b.view.x * (e * a.x - c.x) + b.view.y * (e * a.y - c.y) + b.view.z * (e * a.z - c.z);
        return (0 < d ? b.Fi * d : 0) + (0 < a ? b.Gi * Math.pow(a, b.rh) : 0) + b.Ei
    }
    function SE(a, b) {
        if (0 > b) {
            if (a *= 1 + b,
            0 > a)
                return 0
        } else if (a += (255 - a) * b,
        255 < a)
            return 255;
        return ~~(a + .5)
    }
    function TE(a, b) {
        return [SE(a[0], b), SE(a[1], b), SE(a[2], b)]
    }
    function UE(a, b, c, d, e) {
        var f = a.data, g, h, l, m;
        a = 4 * a.width;
        c *= 4;
        switch (e.length) {
        case 1:
            var n = l = m = e[0];
            break;
        case 3:
            n = e[0],
            l = e[1],
            m = e[2]
        }
        for (g = 0; g < d; g++)
            for (e = (b + g) * a,
            h = e + c; e < h; e += 4)
                f[e] = n[f[e]],
                f[e + 1] = l[f[e + 1]],
                f[e + 2] = m[f[e + 2]]
    }
    function VE(a, b) {
        return 128 > b ? ~~(2 * a * b / 255) : 255 - ~~(2 * (255 - a) * (255 - b) / 255)
    }
    ;function WE(a, b, c, d, e, f) {
        M.call(this);
        this.F = a;
        this.m = b;
        this.j = e.width;
        this.i = e.height;
        this.l = c;
        this.g = d;
        this.u = this.h = 1;
        this.v = null;
        this.K = f
    }
    z(WE, M);
    WE.prototype.D = function() {
        if (Ol(this.m)) {
            var a = this.m;
            a.width = a.height = 1
        }
        delete this.m;
        M.prototype.D.call(this)
    }
    ;
    function XE(a, b) {
        return YE(a)[b]
    }
    function YE(a) {
        if (!a.v) {
            var b = a.l
              , c = a.j
              , d = a.i
              , e = a.K;
            b = new cA(b.h,b.i,b.g,b.j);
            aA = (void 0 === e ? 1234 : e) % 4294967296;
            c = new J(c,d);
            b.h = Array(b.g.height + 1);
            var f = c.width * b.l / (100 * b.g.width)
              , g = c.height * b.l / (100 * b.g.height);
            for (e = 0; e <= b.g.height; e++)
                for (b.h[e] = Array(b.g.width + 1),
                d = 0; d <= b.g.width; d++) {
                    var h = Math.round(d * c.width / b.g.width)
                      , l = Math.round(e * c.height / b.g.height);
                    0 == f && 0 == g || 0 == d || 0 == e || d == b.g.width || e == b.g.height || (h += Math.round(-f + 2 * f * bA(100) / 100),
                    l += Math.round(-g + 2 * g * bA(100) / 100));
                    b.h[e][d] = new Yx(h,l)
                }
            c = b.g.height + 1;
            d = b.g.width + 1;
            l = b.u || 7 == b.m;
            b.i = Array(c);
            for (f = 0; f < c; f++)
                for (b.i[f] = Array(d),
                e = 0; e < d; e++)
                    g = f && f < b.g.height ? l ? (e ^ f) & 1 ? 4 : 2 : bA(2) ? 2 : 4 : 1,
                    h = e && e < b.g.width ? l ? (e ^ f) & 1 ? 2 : 4 : bA(2) ? 2 : 4 : 1,
                    b.i[f][e] = g | h << 8;
            c = Array(b.g.width * b.g.height);
            for (e = f = 0; e < b.g.height; e++)
                for (d = 0; d < b.g.width; d++,
                f++) {
                    h = g = c[f] = new Dz;
                    l = b;
                    var m = d
                      , n = e
                      , q = new Yx
                      , p = new Yx
                      , u = [l.i[n][m] & 255, l.i[n][m + 1] >> 8, l.i[n + 1][m] & 255, l.i[n][m] >> 8];
                    u[1] & 6 && (u[1] ^= 6);
                    u[2] & 6 && (u[2] ^= 6);
                    var x = new dy;
                    q.X(l.h[n][m].x, l.h[n][m].y);
                    p.X(l.h[n][m + 1].x, l.h[n][m + 1].y);
                    x.Y.push(q.x, q.y);
                    x.ob = null;
                    gA(l, x, u[0], q, p);
                    q.X(p.x, p.y);
                    p.X(l.h[n + 1][m + 1].x, l.h[n + 1][m + 1].y);
                    gA(l, x, u[1], q, p);
                    q.X(p.x, p.y);
                    p.X(l.h[n + 1][m].x, l.h[n + 1][m].y);
                    gA(l, x, u[2], q, p);
                    q.X(p.x, p.y);
                    p.X(l.h[n][m].x, l.h[n][m].y);
                    gA(l, x, u[3], q, p);
                    x.Y[0] == x.Y[x.Y.length - 2] && x.Y[1] == x.Y[x.Y.length - 1] || ey(x, x.Y[0], x.Y[1]);
                    h.h = x;
                    g.g = [];
                    0 < d && g.g.push(e * b.g.width + (d - 1));
                    d < b.g.width - 1 && g.g.push(e * b.g.width + (d + 1));
                    0 < e && g.g.push((e - 1) * b.g.width + d);
                    e < b.g.height - 1 && g.g.push((e + 1) * b.g.width + d)
                }
            a.v = c
        }
        return a.v
    }
    function ZE(a) {
        var b = new Image;
        b.width = $E(a);
        b.height = aF(a);
        Vs(a.F, b, {
            wf: "low"
        }).vb(function(c) {
            c instanceof Vg || (c = Bl(this.F));
            Wt(Ut(), c.message, 1)
        }, a);
        return b
    }
    function bF(a) {
        return new J($E(a),aF(a))
    }
    function $E(a) {
        return Math.round(a.j * a.h)
    }
    function aF(a) {
        return Math.round(a.i * a.u)
    }
    var cF = fc(function() {
        if (!Ph())
            if (Lb || Kb || Mb && !Nb) {
                if (mg)
                    return qg(77);
                if (H)
                    return qg(9);
                if (Gb)
                    return qg(18);
                if (ig)
                    return qg(69);
                if (ng)
                    return qg(10)
            } else {
                if (Rb)
                    return 0 <= ob(hg, 12);
                if (Nb)
                    return 0 <= ob(hg, 8)
            }
        return !1
    });
    function dF(a, b, c) {
        M.call(this);
        this.eb = c;
        this.g = Array(4);
        this.v = Array(4);
        this.F = Array(4);
        this.K = b.g;
        this.R = b;
        this.u = XE(b, a).h;
        var d = this.u.Ob();
        a = Math.floor(d.x);
        b = Math.floor(d.y);
        0 > a && (a = 0);
        0 > b && (b = 0);
        this.l = new Yx(a,b);
        c = Math.ceil(d.x + d.width) - a;
        d = Math.ceil(d.y + d.height) - b;
        var e = this.R;
        e = new J(e.j,e.i);
        a + c > e.width && (c = e.width - a);
        b + d > e.height && (d = e.height - b);
        this.j = new J(c,d);
        this.K || (eF(this, fF() ? 5 : 0),
        gF(this, 0))
    }
    var hF;
    z(dF, M);
    k = dF.prototype;
    k.D = function() {
        for (var a = y(this.v), b = a.next(); !b.done; b = a.next())
            (b = b.value) && b.cancel();
        this.v.length = this.F.length = 0;
        a = this.g;
        a.push(this.i, this.m, this.h);
        a = y(a);
        for (b = a.next(); !b.done; b = a.next())
            b = b.value,
            Ol(b) && (b.width = b.height = 1);
        this.g.length = 0;
        this.i = this.m = this.h = this.u = void 0;
        delete this.R;
        M.prototype.D.call(this)
    }
    ;
    function eF(a, b) {
        b = b || 0;
        var c = a.j.width
          , d = a.j.height
          , e = iF(a.eb.Qj)
          , f = a.V = e[0];
        e = e[1];
        var g = c + 2 * f
          , h = d + 2 * f
          , l = "rgba(0,0,0," + a.eb.Pj + ")"
          , m = c + g
          , n = jF(m, h)
          , q = Ml(n);
        q.save();
        q.clearRect(0, 0, m, h);
        a.eb.jg && (q.shadowBlur = e,
        no(q, Ul(c + f, f)),
        q.shadowColor = l);
        q.translate(-a.l.x, -a.l.y);
        gy(a.u, q);
        v(q, "fill").call(q);
        q.restore();
        a.i = b & 1 ? jF(c, d, 1) : Ll(c, d);
        q = Ml(a.i);
        q.save();
        q.globalCompositeOperation = "copy";
        q.drawImage(n, 0, 0);
        q.restore();
        a.eb.jg && (a.m = Ll(g, h),
        q = Ml(a.m),
        q.save(),
        q.globalCompositeOperation = "copy",
        q.drawImage(n, c, 0, g, h, 0, 0, g, h),
        q.restore(),
        R(a.m, {
            width: km(g * a.R.h),
            height: km(h * a.R.u)
        }));
        a.eb.nf && (a.h = b & 4 ? jF(c, d) : Ll(c, d),
        q = Ml(a.h),
        b & 4 && q.clearRect(0, 0, c, d),
        q.save(),
        e = iF(a.eb.Li),
        q.shadowBlur = e[1],
        no(q, Ul(c, 0)),
        q.shadowColor = "black",
        q.translate(-a.l.x - c, -a.l.y),
        gy(a.u, q),
        v(q, "fill").call(q),
        q.restore())
    }
    function jF(a, b, c) {
        c = c || 0;
        var d = kF[c];
        if (!d)
            d = kF[c] = Ll(~~(1.2 * a), ~~(1.2 * b));
        else if (d.width < a || d.height < b)
            d.width = ~~(1.2 * a),
            d.height = ~~(1.2 * b);
        return d
    }
    function gF(a, b) {
        var c = b / 90
          , d = a.g[c];
        if (!d || null === Ml(d)) {
            a.g[c] = void 0;
            (a.eb.nf && !a.h || !a.i && !a.g[0]) && eF(a);
            var e = a.j.width
              , f = a.j.height;
            d = Ll(e, f);
            var g = Ml(d);
            g.save();
            g.globalCompositeOperation = "copy";
            g.drawImage(a.R.m, a.l.x, a.l.y, e, f, 0, 0, e, f);
            if (a.eb.nf) {
                lF.Me.x = 90 >= b ? -mF : mF;
                lF.Me.y = 90 === b || 180 === b ? -mF : mF;
                var h = a.h
                  , l = a.eb.Ki
                  , m = lF
                  , n = new PE(0,0,0)
                  , q = new PE(0,0,1);
                m || (m = QE || (QE = {
                    Me: new PE(-.57735026918963,.57735026918963,.57735026918963),
                    view: new PE(0,0,1),
                    df: .655,
                    Fg: 1,
                    Rh: .1,
                    Sh: .7,
                    Qh: .2,
                    rh: 1
                }));
                var p = m;
                p.Fi = p.df * p.Rh;
                p.Gi = p.df * p.Sh;
                p.Ei = p.Fg * p.Qh;
                p = RE(q, m);
                q = 128 === Math.round(255 * p);
                l /= 255;
                try {
                    var u = new PE(-1,0,7)
                      , x = new PE(0,-1,7)
                      , B = new PE(1,0,7)
                      , E = new PE(0,1,7)
                      , I = g.getImageData(0, 0, e, f)
                      , G = I.data
                      , P = Ml(h).getImageData(0, 0, e, f).data;
                    h = 0;
                    var S = 3, ia = 4 * e, ra, sa = 0
                } catch (ja) {
                    if (ja instanceof Error && "InvalidStateError" === ja.name && ub())
                        throw a = 'An unexpected problem occurred, probably out of memory, try to reload the page (an original reason: "' + ja.message + '").',
                        Xi(a, ja),
                        new Vg(a);
                    throw ja;
                }
                for (; sa < f; sa++)
                    for (ra = 0; ra < e; ra++,
                    h += 4,
                    S += 4)
                        if (G[S]) {
                            p = P[S];
                            if (0 === ra || 0 === sa)
                                B.z = ra === e - 1 ? -(P[S - 4] - p) * l : (P[S + 4] - p) * l,
                                E.z = sa === f - 1 ? -(p - P[S - ia]) * l : (p - P[S + ia]) * l,
                                p = 1 / Math.sqrt(B.z * B.z + E.z * E.z + 1),
                                n.x = -B.z * p,
                                n.y = -E.z * p,
                                n.z = p;
                            else if (ra === e - 1 || sa === f - 1)
                                u.z = (P[S - 4] - p) * l,
                                x.z = (p - P[S - ia]) * l,
                                p = 1 / Math.sqrt(u.z * u.z + x.z * x.z + 1),
                                n.x = u.z * p,
                                n.y = x.z * p,
                                n.z = p;
                            else {
                                u.z = (P[S - 4] - p) * l;
                                x.z = (p - P[S - ia]) * l;
                                B.z = (P[S + 4] - p) * l;
                                E.z = (p - P[S + ia]) * l;
                                if (q && 0 === u.z && 0 === x.z && 0 === B.z && 0 === E.z)
                                    continue;
                                n.x = u.z - B.z;
                                n.y = x.z - E.z;
                                n.z = 2;
                                p = 1 / Math.sqrt(n.x * n.x + n.y * n.y + 4);
                                n.x *= p;
                                n.y *= p;
                                n.z *= p
                            }
                            p = RE(n, m) - .5;
                            G[h] = SE(G[h], p);
                            G[h + 1] = SE(G[h + 1], p);
                            G[h + 2] = SE(G[h + 2], p)
                        }
                g.putImageData(I, 0, 0)
            }
            g.globalCompositeOperation = "destination-in";
            g.drawImage(a.i || a.g[0], 0, 0);
            g.restore();
            if (b) {
                f = d;
                g = f.width;
                m = f.height;
                d = f.style.width;
                e = f.style.height;
                if (90 === b || 270 === b)
                    n = g,
                    g = m,
                    m = n,
                    n = d,
                    d = e,
                    e = n;
                n = Ll(g, m);
                u = Ml(n);
                u.save();
                u.translate(90 === b || 180 === b ? g : 0, 180 === b || 270 === b ? m : 0);
                u.rotate(b * Math.PI / 180);
                u.globalCompositeOperation = "copy";
                u.drawImage(f, 0, 0);
                u.restore();
                f = n.style;
                f.width = d;
                f.height = e;
                d = n
            }
            R(d, {
                width: km(a.$(b)),
                height: km(a.Z(b))
            });
            a.g[c] = d;
            a.g[0] && (a.i && (-1 === Qa(kF, a.i) && (a.i.width = a.i.height = 1),
            a.i = void 0),
            (!a.K || a.g[1] && a.g[2] && a.g[3]) && a.h && (-1 === Qa(kF, a.h) && (a.h.width = a.h.height = 1),
            a.h = void 0))
        }
        return d
    }
    k.o = function(a) {
        return nF(this, a)
    }
    ;
    function nF(a, b, c) {
        b = b || 0;
        var d = b / 90
          , e = a.v[d];
        e || (b = gF(a, b),
        e = fF() ? Ql(b) : Tg(b),
        a.v[d] = e);
        return e.then(function(f) {
            try {
                R(f, "filter", c ? "opacity(0.5) drop-shadow(0.01px 0.01px 0 red) drop-shadow(0.01px 0.01px 0 red)" : "")
            } catch (g) {}
            return f
        })
    }
    k.$ = function(a) {
        return 0 === a || 180 === a ? this.j.width * this.R.h : this.j.height * this.R.u
    }
    ;
    k.Z = function(a) {
        return 0 === a || 180 === a ? this.j.height * this.R.u : this.j.width * this.R.h
    }
    ;
    k.contains = function(a, b, c) {
        a = gF(this, a);
        return !!Ml(a).getImageData(Math.round(b / this.R.h), Math.round(c / this.R.u), 1, 1).data[3]
    }
    ;
    function oF(a, b) {
        var c = a.R.h
          , d = a.R.u
          , e = a.$(b)
          , f = a.Z(b);
        e = b && 270 !== b ? e : 0;
        f = b && 90 !== b ? f : 0;
        R(a.m, qm("transform-origin", "0px 0px"));
        R(a.m, qm("transform", "translate(" + (a.eb.Wh * c + e) + "px," + (a.eb.Wh * d + f) + "px)" + (b ? " rotate(" + b + "deg)" : "") + " translate(" + km(-a.V * c) + ", " + km(-a.V * d) + ")"));
        R(a.m, {
            display: "block",
            position: "absolute"
        });
        return a.m
    }
    function iF(a) {
        var b = Math.sqrt(-(2 * a * a) * Math.log(1 / 255));
        return .5 <= b ? [Math.ceil(b), 2 * a] : [0, 0]
    }
    function pF(a, b) {
        a = gF(a, b);
        b = a.width;
        var c = a.height;
        var d = Ll(b, c);
        var e = Ml(d);
        e.globalCompositeOperation = "copy";
        e.drawImage(a, 0, 0);
        e.globalCompositeOperation = "lighter";
        e.fillStyle = "red";
        e.fillRect(0, 0, b, c);
        e.globalCompositeOperation = "destination-in";
        e.drawImage(a, 0, 0);
        return d
    }
    function qF() {
        if (void 0 === hF)
            try {
                var a = A.CSS;
                hF = !!a && (a.supports("filter", "opacity(0.5) drop-shadow(0.01px 0.01px 0 red) drop-shadow(0.01px 0.01px 0 red)") || a.supports("(-webkit-filter", "opacity(0.5) drop-shadow(0.01px 0.01px 0 red) drop-shadow(0.01px 0.01px 0 red)"))
            } catch (b) {
                hF = !1
            }
        return hF
    }
    function rF(a, b) {
        if (qF())
            return nF(a, b, !0);
        b = b || 0;
        var c = b / 90
          , d = a.F[c];
        d || (d = pF(a, b),
        d = (fF() ? Ql(d) : Tg(d)).then(function(e) {
            R(e, {
                width: km(this.$(b)),
                height: km(this.Z(b))
            });
            return e
        }, null, a),
        a.F[c] = d);
        return d
    }
    var fF = fc(function() {
        return mg
    })
      , mF = 1 / Math.sqrt(3)
      , lF = {
        Me: new PE(0,0,mF),
        view: new PE(0,0,1),
        df: .655,
        Fg: 1,
        Rh: .1,
        Sh: .7,
        Qh: .2,
        rh: 1
    }
      , kF = [];
    function sF(a) {
        UD.call(this);
        this.Lb = a
    }
    z(sF, UD);
    sF.prototype.ia = function(a, b) {
        this.Lb.ia(a, b)
    }
    ;
    sF.prototype.qd = function() {
        return this.Lb.qd()
    }
    ;
    function tF(a, b) {
        QD.call(this, a);
        this.i = new t.Set;
        this.Pc = this.u = !1;
        this.g = 0;
        this.j = b;
        this.T = b.qd().get("0");
        ED(this, !0, !0)
    }
    var uF;
    z(tF, QD);
    k = tF.prototype;
    k.Kb = function(a) {
        this.g = (this.g + a) % 360;
        0 > this.g && (this.g += 360)
    }
    ;
    k.D = function() {
        delete this.j;
        delete this.i;
        QD.prototype.D.call(this)
    }
    ;
    function ME(a, b, c) {
        a.isEnabled() && (a.Kb(b, c),
        a.j.ia("6", a),
        pE(a) || a.j.ia("5", a))
    }
    k.kc = function(a) {
        this.u = a
    }
    ;
    k.nc = function(a, b) {
        var c;
        !a && this.i.size && (c = this.Nf()) ? (this.j.ia("4"),
        a = c) : a = this;
        b || this.j.ia("5", a);
        return c
    }
    ;
    function vF(a) {
        if (!(a.ctrlKey || a.shiftKey || a.altKey || a.metaKey)) {
            var b = 37 == a.keyCode;
            a = 39 == a.keyCode;
            if (b || a) {
                a = LE;
                var c = []
                  , d = iE;
                d && c.push(d);
                for (d = 0; d < wF.length; d++) {
                    var e = wF[d].g;
                    e instanceof sF && c.push(e)
                }
                for (d = 0; d < c.length; d++) {
                    var f = c[d];
                    e = a.Fc();
                    aE(e, f.o());
                    f = f.Df(e.x, e.y);
                    if (f instanceof tF) {
                        e.x -= f.ca;
                        e.y -= f.da;
                        ME(f, b ? -90 : 90, e);
                        break
                    }
                }
            }
        }
    }
    function xF(a, b) {
        if (a.Pc = b)
            KD("wheel", a, a),
            JD(a, a),
            uF || (Q(new sf(document), pf, vF),
            uF = !0)
    }
    function yF(a) {
        var b = []
          , c = a.Jc()
          , d = a.Kc();
        a.i.forEach(function(e) {
            if (this.getParent() === e.getParent() && this.g === e.g && d) {
                var f = e.Jc();
                f.translate(-c.x, -c.y);
                var g = e.Kc();
                g.translate(-d.x, -d.y);
                this.g && Zx(g, 360 - this.g);
                var h = f.x - g.x;
                f = f.y - g.y;
                h * h + f * f <= this.T && b.push(e)
            }
        }, a);
        return b
    }
    k.Cd = function() {
        this.j.ia("6", this);
        this.F = !0;
        this.ng() && this.j.ia("9")
    }
    ;
    k.ng = function() {
        return this.Pc
    }
    ;
    k.Ye = function(a, b, c) {
        var d = this.getParent();
        YD(d, this);
        d = this.nc();
        this.F = !1;
        if (d && 1 === c)
            try {
                var e = A.navigator;
                "vibrate"in e && e.vibrate(40)
            } catch (f) {}
        e = d || this;
        e.ng() && th(a) && 1 === c && e.j.ia("8", [e, new Yx(a,b)])
    }
    ;
    k.fh = function() {
        var a = this.getParent();
        YD(a, this);
        this.nc();
        this.F = !1
    }
    ;
    k.Ic = function() {
        return null
    }
    ;
    k.Vf = function(a) {
        this.F && 2 === a.button && this.Pc && ME(this, a.ctrlKey ? -90 : 90, new Yx(a.Bb,a.Mb))
    }
    ;
    function zF(a, b, c, d) {
        var e = K("DIV", "ts-gm-pc");
        tF.call(this, e, a);
        this.l = new dF(b,c,d);
        GD(this, this.l.$(0), this.l.Z(0));
        XE(c, b);
        xF(this, c.g);
        this.K = b;
        a = this.l;
        this.v = new Yx(a.l.x * a.R.h,a.l.y * a.R.u);
        AF(this, BF(this))
    }
    z(zF, tF);
    k = zF.prototype;
    k.D = function() {
        this.l.G();
        delete this.l;
        this.m = void 0;
        tF.prototype.D.call(this)
    }
    ;
    k.contains = function(a, b) {
        return tF.prototype.contains.call(this, a, b) ? this.l.contains(this.g, a, b) : !1
    }
    ;
    k.Jc = function(a) {
        a ? a.X(this.v.x, this.v.y) : a = new Yx(this.v.x,this.v.y);
        return a
    }
    ;
    k.Kc = function(a) {
        a ? a.X(this.ca, this.da) : a = new Yx(this.ca,this.da);
        switch (this.g) {
        case 90:
            a.x += this.$();
            break;
        case 180:
            a.translate(this.$(), this.Z());
            break;
        case 270:
            a.y += this.Z()
        }
        return a
    }
    ;
    k.Kb = function(a, b) {
        tF.prototype.Kb.call(this, a, b);
        if (a %= 360) {
            0 > a && (a += 360);
            var c = this.Ob()
              , d = a;
            a = b.x + c.x;
            b = b.y + c.y;
            if (d) {
                var e = new Yx(c.x - a,c.y - b)
                  , f = new Yx(e.x + c.width,e.y + c.height);
                Zx(e, d);
                Zx(f, d);
                d = e.y + b;
                c.x = e.x + a;
                c.y = d;
                c.width = 0;
                c.height = 0;
                c.add(f.x + a, f.y + b)
            }
            this.Gb(c);
            AF(this, BF(this));
            pE(this) && this.Ic()
        }
    }
    ;
    function BF(a) {
        var b = a.g;
        return a.u ? rF(a.l, b) : a.l.o(b)
    }
    function AF(a, b) {
        var c = a.g
          , d = a.u;
        b.then(function(e) {
            if (!this.W() && c === this.g && d === this.u) {
                var f = this.o()
                  , g = f.firstChild;
                g ? e !== g && Rd(e, g) : f.appendChild(e)
            }
        }, function(e) {
            Xi("" + e)
        }, a)
    }
    k.kc = function(a) {
        a !== this.u && (tF.prototype.kc.call(this, a),
        AF(this, BF(this)))
    }
    ;
    k.Lf = function(a) {
        var b = this.Ob();
        if (b = b.sd(a)) {
            b.translate(-this.ca, -this.da);
            if (this.contains(b.x + b.width / 2, b.y + b.height / 2))
                return !0;
            for (a = b.y; a < b.y + b.height; a++)
                for (var c = b.x; c < b.x + b.width; c++)
                    if (this.contains(c, a))
                        return !0
        }
        return !1
    }
    ;
    k.Cd = function() {
        this.ce = !0;
        tF.prototype.Cd.call(this)
    }
    ;
    function CF(a) {
        void 0 === a.V && (a.V = Math.random());
        return a.V
    }
    k.Ic = function() {
        if (this.l.eb.jg) {
            var a = this.g;
            a !== this.N && (this.N = a,
            this.m || (this.m = L("DIV")),
            Tg(oF(this.l, a)).then(function(b) {
                if (!this.W() && this.N === a) {
                    var c = this.m.firstChild;
                    c ? b !== c && Rd(b, c) : this.m.appendChild(b)
                }
            }, null, this));
            return this.m
        }
        return null
    }
    ;
    k.Nf = function() {
        var a = yF(this);
        if (a.length) {
            for (var b, c = y(a), d = c.next(); !d.done; d = c.next())
                d = d.value,
                d instanceof DF && (!b || RD(b) < RD(d)) && (b = d);
            b || (b = new DF(this.j),
            this.getParent().add(b));
            b.uc(this);
            a = y(a);
            for (d = a.next(); !d.done; d = a.next())
                c = d.value,
                b !== c && b.uc(c);
            return b
        }
    }
    ;
    function EF(a, b) {
        var c = void 0, d = a.length, e;
        if (d && (e = a[0].getParent())) {
            c = c || new $x(0,0,e.$(),e.Z());
            var f, g;
            for (e = f = g = 0; g < d; g++) {
                var h = a[g];
                e += h.$();
                f += h.Z()
            }
            var l = new J(e / d,f / d), m = l.width / l.height, n = Math.sqrt(l.width * l.height * m), q, p, u, x = function() {
                q = n / m;
                p = ~~(c.width / n);
                u = ~~(c.height / q)
            };
            e = function() {
                for (var B = p, E = u; 1 <= --n; )
                    if (x(),
                    B != p || E != u)
                        return !0;
                return !1
            }
            ;
            for (x(); d > p * u && e(); )
                ;
            if (!(1 > n))
                for (a.sort(function(B, E) {
                    return CF(B) - CF(E)
                }),
                f = function(B, E, I) {
                    var G, P, S = c.width / B, ia = c.height / E, ra = l.width, sa = l.height, ja = (S - ra) / 2, kI = (ia - sa) / 2;
                    var Vr = c.y;
                    for (P = 0; E; E--,
                    Vr += ia) {
                        var Wr = c.x;
                        for (G = 0; G < B; G++,
                        Wr += S) {
                            if (b) {
                                var tA = !1;
                                for (var $f = 0; $f < b.length; $f++)
                                    if (ay(b[$f], Math.round(Wr + ja), Math.round(Vr + kI), ra, sa)) {
                                        tA = !0;
                                        break
                                    }
                            }
                            if (!tA && (I || ($f = a[P],
                            $f.X(Math.round(Wr + (S - $f.$()) / 2), Math.round(Vr + (ia - $f.Z()) / 2))),
                            P++,
                            P == d))
                                return !0
                        }
                    }
                    return !1
                }
                ; ; )
                    if (f(p, u, !0)) {
                        f(p, u);
                        break
                    } else if (!e())
                        break
        }
    }
    function FF(a, b, c) {
        var d = void 0, e = a.length, f;
        if (e && (f = a[0].getParent()))
            for (d = d || new $x(0,0,f.$(),f.Z()),
            f = 0; f < e; f++) {
                var g = a[f];
                c && g.Pc && g.Kb(90 * ~~(4 * Math.random()), new Yx(Math.floor(g.$() / 2),Math.floor(g.Z() / 2)));
                var h = g.$()
                  , l = g.Z()
                  , m = 0
                  , n = void 0;
                do {
                    var q = 100
                      , p = h * m
                      , u = l * m;
                    do {
                        var x = Math.round(Math.random() * (d.width + 2 * p - h) + d.x - p);
                        var B = Math.round(Math.random() * (d.height + 2 * u - l) + d.y - u);
                        if (b) {
                            n = !1;
                            for (var E = 0; E < b.length; E++)
                                if (ay(b[E], x, B, h, l)) {
                                    n = !0;
                                    break
                                }
                        }
                    } while (n && --q);
                    m += .1
                } while (n && .6 > m);
                g.X(x, B)
            }
    }
    ;function GF(a, b) {
        UD.call(this);
        var c = this.o();
        this.l = b;
        this.u = new J(a.width,a.height);
        this.$a = !0;
        this.F = 100;
        HF || (HF = mm(4, 4, 8, "rgba(0,0,0,.4)"));
        R(a, HF);
        this.j = new DD(a);
        this.j.qa(!1);
        this.add(this.j);
        YD(this, this.j, 0, 0);
        ED(this, !0, !1);
        this.g = new QD;
        this.g.L(!1);
        O(this.g.o(), "ts-text");
        IF = IF || [25, 50, 75, 100];
        for (var d = b = a = 0; d < IF.length; d++) {
            var e = IF[d];
            e = new JF(e + "%",e);
            e.X(a, 0);
            KD("click", e, this);
            KD("touchstart", e, this);
            this.g.add(e);
            a += e.$();
            b = Math.max(b, e.Z())
        }
        GD(this.g, a, b);
        this.add(this.g);
        GD(this, this.u.width, this.u.height);
        var f = this;
        Q(c, ["mouseover", "mouseout"], function(h) {
            h.relatedTarget && c != h.relatedTarget && !Ud(c, h.relatedTarget) && ("mouseover" == h.type ? KF(f, !0) : KF(f, !1))
        });
        Q(c, ["touchstart", "touchmove", "touchend", "touchcancel"], function(h) {
            KF(f, !0, !0);
            h.preventDefault()
        });
        var g;
        Q(c, "gesturestart", function(h) {
            g = f.F;
            h.preventDefault()
        });
        Q(c, ["gestureend", "gesturechange"], function(h) {
            var l = g * h.ja.scale;
            l >= IF[0] && l < IF[IF.length - 1] && LF(f, l);
            h.preventDefault()
        })
    }
    var HF, IF, MF;
    z(GF, UD);
    k = GF.prototype;
    k.D = function() {
        this.v && Ci(this.v);
        this.i && this.i.G();
        this.l = null;
        UD.prototype.D.call(this)
    }
    ;
    k.L = function(a) {
        UD.prototype.L.call(this, a);
        a && KF(this, a, a)
    }
    ;
    k.Gb = function(a, b, c, d) {
        UD.prototype.Gb.call(this, a, b, c, d);
        this.l && !pE(this) && this.l.ia("5", this)
    }
    ;
    k.Ne = function(a) {
        0 === a.button && LF(this, a.target.g)
    }
    ;
    k.af = function(a) {
        LF(this, a.target.g)
    }
    ;
    function LF(a, b) {
        a.F = b;
        b = ~~(a.u.width * b / 100 + .5);
        var c = ~~(b * a.u.height / a.u.width + .5)
          , d = a.j.o();
        Qf(d, b, c);
        GD(a.j, b, c);
        NF(a)
    }
    function NF(a) {
        var b = a.j.$()
          , c = a.j.Z();
        a.g.isVisible() && (b = Math.max(a.g.$(), b),
        c = Math.max(a.g.Z(), c));
        GD(a, b, c)
    }
    function KF(a, b, c) {
        function d(e) {
            a.v = null;
            e ? a.g.L(e) : (a.i = new Ym(a.g.o(),650),
            Ze(a.i, "end", function() {
                a.g.L(!1);
                Tf(a.g.o(), 1);
                a.i.G();
                a.i = null
            }),
            a.i.play());
            NF(a)
        }
        Ci(a.v);
        a.i && (a.i.G(),
        a.i = null);
        b && d(b);
        if (!b || c)
            a.v = Bi(function() {
                d(!1)
            }, 3E3)
    }
    k.Cd = function() {
        R(this.j.o(), MF || (MF = mm(10, 10, 15, "rgba(0,0,0,.4)")));
        R(this.o(), {
            opacity: .4
        })
    }
    ;
    function OF(a) {
        R(a.j.o(), HF);
        R(a.o(), {
            opacity: 1
        })
    }
    k.Ye = function() {
        OF(this);
        this.l.ia("5", this)
    }
    ;
    k.fh = function() {
        OF(this)
    }
    ;
    k.Ic = function() {
        return null
    }
    ;
    function JF(a, b) {
        a = K("span", {
            style: "padding:0 .4em;text-shadow:1px 1px 2px black"
        }, a);
        a = K("div", {
            "class": "gamebtncol",
            style: "line-height:2.6em;cursor:pointer;position:absolute"
        }, a);
        DD.call(this, a);
        this.g = b;
        this.L(!1);
        document.body.appendChild(a);
        b = Rf(a);
        Qd(a);
        GD(this, b.width, b.height);
        this.L(!0)
    }
    z(JF, DD);
    function PF(a, b, c) {
        b = rD(b, c);
        var d = {
            "font-size": km(b ? 40 : 60),
            padding: ".2em"
        };
        c = dm("sync-alt", null, {
            title: V("Restart")
        });
        R(c, d);
        Q(c, "click", function() {
            a.ia("scatter")
        });
        if (b) {
            var e = dm("share-alt", null, {
                title: V("Share")
            });
            R(e, d);
            Q(e, "click", b.onclick)
        } else
            e = null;
        b = em();
        d = K("DIV", {
            "class": "ts-infobox"
        }, K("DIV", {
            "class": "ts-flx00a",
            style: "align-self:center"
        }, c, e), c = K("DIV", {
            "class": "ts-flx00a",
            style: "white-space:nowrap;display:none"
        }), e = K("DIV", [QF, "ts-flx11a"]), K("DIV", [QF, "ts-flx00a"], b));
        te(e, nu(["ts-size-medium2"], !0));
        R(e, {
            "grid-auto-flow": "column",
            position: "relative"
        });
        te(c, [QF, "ts-text"]);
        DD.call(this, d);
        this.h = c;
        this.g = e;
        var f = this;
        Q(b, "click", function() {
            RF(f, !1)
        });
        R(d, {
            top: "auto"
        });
        RF(this, !1);
        this.L(!1)
    }
    z(PF, DD);
    PF.prototype.D = function() {
        this.h = this.g = null;
        DD.prototype.D.call(this)
    }
    ;
    function RF(a, b) {
        a = a.o();
        R(a, {
            "background-color": b ? "rgba(0,0,0,.3)" : "transparent"
        });
        Ra(yd(QF, a), function(c) {
            sm(c, b ? "" : !1)
        })
    }
    function SF(a, b, c) {
        RF(a, !0);
        T(a.h, !0);
        Nd(a.h, K("DIV", {
            style: "font-size:22px;text-align:center"
        }, V("Congratulations!")), $k([[V("Time [mm:ss]") + ":", Zs(b)], [V("Number of pieces") + ":", c]]))
    }
    function TF(a, b) {
        if (!a.i) {
            a.i = !0;
            RF(a, !0);
            var c, d;
            Nd(a.g, c = L("DIV"), d = L("DIV"));
            var e = (new gd(c.offsetLeft,c.offsetTop)).x
              , f = (new J(c.offsetWidth,c.offsetHeight)).width
              , g = (new gd(d.offsetLeft,d.offsetTop)).x - (e + f);
            Qd(c);
            Qd(d);
            Q(a.g, "contextmenu", Ie);
            var h = Rf(a.g).width;
            c = ~~((h - e) / (f + g));
            0 < c && (c = {
                count: c
            },
            c.pid = b,
            fu("puzzle/suggested", c, function(l, m) {
                if (!m && a.g) {
                    l = l.items;
                    m = ct(!0);
                    for (var n = 0; n < l.length; n++) {
                        var q = l[n];
                        m.pid = q.ea().pid;
                        var p = Ws("play", m)
                          , u = Mc(q.pa);
                        u.url = p;
                        q = new q.constructor(u);
                        q = q.Ba();
                        q.La(a.g);
                        p = q.o();
                        if ((new gd(p.offsetLeft,p.offsetTop)).x + (new J(p.offsetWidth,p.offsetHeight)).width > h) {
                            q.G();
                            break
                        }
                    }
                }
            }, {
                lb: !0,
                Hb: !1
            }))
        }
    }
    var QF = vh();
    function UF(a) {
        tF.call(this, K("div"), a)
    }
    z(UF, tF);
    k = UF.prototype;
    k.D = function() {
        this.l = void 0;
        tF.prototype.D.call(this)
    }
    ;
    k.add = function(a) {
        a.qa(!1);
        tF.prototype.add.call(this, a);
        VF(this, a)
    }
    ;
    k.ra = function(a) {
        var b = "number" === typeof a ? SD(this, a) : a;
        tF.prototype.ra.call(this, a);
        b.qa(!0);
        VF(this)
    }
    ;
    k.contains = function(a, b) {
        for (var c = 0, d = RD(this); c < d; c++) {
            var e = SD(this, c);
            if (e.contains(a - e.ca, b - e.da))
                return !0
        }
        return !1
    }
    ;
    k.Kb = function(a, b) {
        tF.prototype.Kb.call(this, a, b);
        for (var c = 0, d = RD(this); c < d; c++) {
            var e = SD(this, c);
            e.Kb(a, new Yx(b.x - e.ca,b.y - e.da))
        }
        VF(this);
        pE(this) && this.Ic()
    }
    ;
    k.kc = function(a) {
        tF.prototype.kc.call(this, a);
        for (var b = 0, c = RD(this); b < c; b++)
            SD(this, b).kc(a)
    }
    ;
    k.Lf = function(a) {
        a = a.Fc();
        a.translate(-this.ca, -this.da);
        for (var b = 0, c = RD(this); b < c; b++)
            if (SD(this, b).Lf(a))
                return !0;
        return !1
    }
    ;
    function WF(a, b) {
        a.X(a.ca + b.x, a.da + b.y);
        GD(a, b.width, b.height);
        if (b.x || b.y)
            for (var c = 0, d = RD(a); c < d; c++) {
                var e = SD(a, c);
                e.X(e.ca - b.x, e.da - b.y)
            }
    }
    function VF(a, b) {
        var c;
        if (b) {
            var d = new $x(0,0,a.$(),a.Z());
            b = b.Ob();
            d.contains(b) || (by(d, b),
            WF(a, d))
        } else if (c = RD(a)) {
            var e = SD(a, 0);
            d = e.Ob();
            for (b = 1; b < c; b++)
                e = SD(a, b),
                by(d, e.Ob());
            WF(a, d)
        } else
            GD(a, 0, 0)
    }
    k.Ic = function() {
        this.l || (this.l = L("DIV"));
        if (this.l.hasChildNodes())
            for (; this.l.childNodes.length; )
                this.l.removeChild(this.l.firstChild);
        for (var a = 0, b = RD(this); a < b; a++) {
            var c = SD(this, a)
              , d = c.Ic();
            d && (R(d, "position", "absolute"),
            Ff(d, c.ca, c.da),
            this.l.appendChild(d))
        }
        return this.l
    }
    ;
    function DF() {
        UF.apply(this, arguments)
    }
    z(DF, UF);
    k = DF.prototype;
    k.uc = function(a) {
        a instanceof zF ? XF(this, a) : a instanceof DF && YF(this, a)
    }
    ;
    k.og = function() {}
    ;
    function YF(a, b) {
        var c, d;
        a.i.delete(b);
        b.i.delete(a);
        for (b.i.forEach(function(e) {
            this.i.add(e);
            e.i.delete(b);
            e.i.add(this)
        }, a); 0 < (d = RD(b)); )
            d = SD(b, c = d - 1),
            b.ra(c),
            c = ZF(a, d),
            d.X(c.x, c.y),
            a.add(d);
        b.i.clear();
        b.getParent().ra(b);
        $F(a)
    }
    function XF(a, b) {
        b.getParent().ra(b);
        FD(b);
        if (0 === RD(a))
            a.X(b.ca, b.da),
            a.g = b.g,
            xF(a, b.Pc),
            b.X(0, 0);
        else {
            a.i.delete(b);
            b.i.delete(a);
            var c = ZF(a, b);
            b.X(c.x, c.y)
        }
        b.i.forEach(function(d) {
            this.i.add(d);
            d.i.delete(b);
            d.i.add(this)
        }, a);
        b.i.clear();
        a.add(b);
        $F(a)
    }
    k.nc = function(a, b) {
        (a = UF.prototype.nc.call(this, a, b)) && a != this ? Bi(function() {
            this.G()
        }, 0, this) : $F(this);
        return a
    }
    ;
    function $F(a) {
        var b = a.getParent()
          , c = a.j.qd().get("1");
        RD(a) > c >> 1 && YD(b, a, void 0, 0)
    }
    function ZF(a, b) {
        var c = a.Jc()
          , d = b.Jc()
          , e = a.Kc();
        e.translate(-a.ca, -a.da);
        d.translate(-c.x, -c.y);
        c = b.Kc();
        c.translate(-b.ca, -b.da);
        Zx(d, a.g);
        d.X(e.x + d.x - c.x, e.y + d.y - c.y);
        return d
    }
    k.Jc = function(a) {
        return 0 < RD(this) ? SD(this, 0).Jc(a) : null
    }
    ;
    k.Kc = function(a) {
        return 0 < RD(this) ? (a = SD(this, 0).Kc(a),
        a.translate(this.ca, this.da),
        a) : null
    }
    ;
    k.Nf = function() {
        var a = yF(this), b = a.length, c, d = this;
        if (b) {
            for (c = 0; c < b; c++)
                a[c]instanceof DF && RD(d) < RD(a[c]) && (d = a[c]);
            d != this && d.uc(this);
            for (c = 0; c < b; c++)
                d != a[c] && d.uc(a[c]);
            return d
        }
    }
    ;
    function aG() {
        QD.call(this);
        this.L(!1);
        this.$a = !0;
        for (var a = 0; 2 > a; a++) {
            var b = K("DIV", {
                "class": "gamebtncol rad bigShadow ts-flxdspl",
                style: "width:5em;height:5em;opacity:.4;cursor:pointer;justify-content:center"
            });
            b = new DD(b);
            KD("touchstart", b, this);
            KD("click", b, this);
            this.add(b)
        }
    }
    z(aG, QD);
    function bG(a, b, c) {
        var d = a.getParent();
        if (!a.j) {
            a.j = !0;
            var e = SD(a, 0)
              , f = SD(a, 1)
              , g = e.o()
              , h = Rf(g);
            g = h.width;
            h = h.height;
            GD(a, 3 * g, h);
            e.Gb(0, 0, g, h);
            f.Gb(2 * g, 0, g, h);
            g = {
                viewBox: "0 0 253 143",
                width: g - (Math.max(Math.round(g / 12), 2) << 1)
            };
            h = {
                d: "M105.47,1.85c19.07-0.54,62.34,7.55,95.93,36.3l42.84-36.92c0.95-0.81,2.13-1.23,3.34-1.23c0.71,0,1.44,0.15,2.1,0.47c1.8,0.82,2.96,2.63,2.97,4.61l0.01,132.75c0.01,1.48-0.64,2.89-1.76,3.85c-0.93,0.8-2.12,1.23-3.33,1.23c-0.24,0-0.48-0.02-0.75-0.06l-131.29-19.61c-1.97-0.3-3.59-1.71-4.13-3.62c-0.56-1.91,0.04-3.97,1.55-5.27l45.17-38.93c-16.09-11.44-39.59-18.52-54.28-17.71c-30.32,1.66-43.11,8.51-63.73,23.65c-1.6,1.18-3.81,1.02-5.45-0.04c-0.2-0.13-0.38-0.29-0.59-0.46L1.73,48.63C0.58,47.62-0.04,46.15,0,44.64c0.07-1.54,0.85-2.88,2.03-3.88C43.49,5.94,79.34,2.59,105.47,1.85z",
                fill: "#fff"
            };
            f = f.o();
            var l = jy("svg", g, jy("path", h));
            f.appendChild(l);
            h.transform = "scale(-1,1) translate(-253, 0)";
            e = e.o();
            f = jy("svg", g, jy("path", h));
            e.appendChild(f)
        }
        a.g = b.Fc();
        aE(a.g, d.o());
        a.i = c;
        a.X(a.g.x - (a.$() >> 1), a.g.y - (a.Z() >> 1));
        YD(d, a);
        a.L(!0);
        cG(a)
    }
    aG.prototype.L = function(a) {
        QD.prototype.L.call(this, a);
        for (var b = 0, c = RD(this); b < c; b++)
            SD(this, b).L(a)
    }
    ;
    function cG(a) {
        Ci(a.l);
        a.l = Bi(function() {
            a.W() || a.L(!1)
        }, 3E3)
    }
    aG.prototype.af = function(a) {
        var b = new Yx(this.g.x - this.i.ca,this.g.y - this.i.da);
        ME(this.i, a.target == SD(this, 0) ? -90 : 90, b);
        cG(this)
    }
    ;
    aG.prototype.Ne = function(a) {
        this.af(a)
    }
    ;
    function dG(a, b, c, d) {
        this.g = a;
        this.h = b;
        this.pe = b - d;
        this.re = c - a;
        this.eh = -this.pe * a - this.re * b
    }
    function eG(a, b) {
        return new dG(a.x,a.y,b.x,b.y)
    }
    function fG(a, b) {
        return a.re * (b.y - a.h) > -a.pe * (b.x - a.g)
    }
    ;function gG(a, b) {
        if (!hG(a, b)) {
            for (var c = a.X, d = a.Ob(), e = d.x, f = d.y, g = (b.width - d.width >> 1) + b.x, h = (b.height - d.height >> 1) + b.y, l, m, n = new Yx(g,h); ; ) {
                d.x = l = g + e >> 1;
                d.y = m = h + f >> 1;
                if (l === g && m === h || l === e && m === f)
                    break;
                iG(d, a, b) ? (n.x = g = l,
                n.y = h = m) : (e = l,
                f = m)
            }
            c.call(a, n)
        }
    }
    function jG(a, b, c) {
        var d = [];
        a = y(a);
        for (var e = a.next(); !e.done; e = a.next()) {
            var f = e.value;
            hG(f, b) || d.push(f)
        }
        if (0 !== d.length) {
            var g = kG(d);
            f = [new dG(b.x,b.y,b.x + b.width - 1,b.y + b.height - 1), new dG(b.x,b.y + b.height - 1,b.x + b.width - 1,b.y)];
            a = [[], [], [], []];
            var h = y(d);
            for (e = h.next(); !e.done; e = h.next()) {
                var l = e.value
                  , m = l.Cb();
                m.translate(l.$() / 2, l.Z() / 2);
                for (var n = e = 0; n < f.length; n++)
                    !fG(f[n], m) || (e |= n + 1);
                a[e].push(l)
            }
            var q = new Yx(b.x + b.width / 2,b.y + b.height / 2);
            f = y(a);
            for (h = f.next(); !h.done; h = f.next())
                h.value.sort(function(I, G) {
                    var P = I.ca + I.$() / 2 - q.x;
                    I = I.da + I.Z() / 2 - q.y;
                    var S = G.ca + G.$() / 2 - q.x;
                    G = G.da + G.Z() / 2 - q.y;
                    return P * P + I * I - (S * S + G * G)
                });
            f = [c.x, c.y];
            c = [c.width, c.height];
            h = [b.width, b.height];
            g = [g.width, g.height];
            l = {};
            for (m = 0; m < a.length; l = {
                hd: l.hd,
                Qa: l.Qa
            },
            m++) {
                e = a[m];
                var p = e.length;
                if (p) {
                    l.Qa = m & 1 ^ m >> 1;
                    n = 1 - l.Qa;
                    var u = 4 < c[l.Qa] / g[l.Qa] ? g[l.Qa] : 0
                      , x = Math.round((c[l.Qa] - 2 * u) / g[l.Qa])
                      , B = void 0;
                    B = x >= p ? x : p;
                    p = Array(2);
                    p[l.Qa] = (c[l.Qa] - 2 * u) / B;
                    p[n] = Math.min(g[n], (c[n] - h[n]) / 2);
                    l.hd = [];
                    for (x = 0; x < B; x++) {
                        var E = Array(2);
                        E[l.Qa] = f[l.Qa] + u + p[l.Qa] / 2 + x * p[l.Qa];
                        E[n] = f[n] + (m & 2 ? c[n] - p[n] / 2 : p[n] / 2);
                        l.hd.push(eG(q, new Yx(E[0],E[1])))
                    }
                    n = function(I) {
                        return function(G) {
                            for (var P = Number.MAX_VALUE, S, ia, ra = 0; ra < I.hd.length; ra++) {
                                var sa = I.hd[ra];
                                if (I.Qa) {
                                    var ja = G.x;
                                    sa = new Yx(ja,(-sa.eh - sa.pe * ja) / sa.re)
                                } else
                                    ja = G.y,
                                    sa = new Yx((-sa.eh - sa.re * ja) / sa.pe,ja);
                                ja = Math.abs(I.Qa ? sa.y - G.y : sa.x - G.x);
                                ja < P && (P = ja,
                                S = ra,
                                ia = sa)
                            }
                            return {
                                uj: S,
                                sd: ia
                            }
                        }
                    }(l);
                    u = y(e);
                    for (e = u.next(); !e.done; e = u.next())
                        e = e.value,
                        B = e.Cb(),
                        B.translate(e.$() / 2, e.Z() / 2),
                        p = n(B),
                        l.hd.splice(p.uj, 1),
                        e.X(Math.round(e.ca + p.sd.x - B.x), Math.round(e.da + p.sd.y - B.y))
                }
            }
            d = y(d);
            for (e = d.next(); !e.done; e = d.next())
                gG(e.value, b)
        }
    }
    function iG(a, b, c) {
        var d = ay(c, a), e;
        if (d && b instanceof UF && (e = RD(b))) {
            d = new $x(0,0,0,0);
            for (var f = 0; f < e; f++) {
                var g = SD(b, f);
                d.x = g.ca + a.x;
                d.y = g.da + a.y;
                d.width = g.$();
                d.height = g.Z();
                if (iG(d, g, c))
                    return !0
            }
            return !1
        }
        return d
    }
    function hG(a, b) {
        return iG(a.Ob(), a, b)
    }
    function kG(a) {
        var b = 0
          , c = 0
          , d = 0;
        a = y(a);
        for (var e = a.next(); !e.done; e = a.next()) {
            var f = e.value;
            f instanceof UF ? (e = kG(f.h[v(t.Symbol, "iterator")]()),
            f = RD(f),
            b += e.width * f,
            c += e.height * f,
            d += f) : (b += f.$(),
            c += f.Z(),
            d++)
        }
        return new J(b / d,c / d)
    }
    ;function lG(a) {
        UF.call(this, a);
        this.kc(!0);
        KD("click", this, this)
    }
    z(lG, UF);
    k = lG.prototype;
    k.uc = function(a) {
        var b = a.ca
          , c = a.da;
        a.getParent().ra(a);
        0 === RD(this) ? (this.X(b, c),
        xF(this, a.Pc),
        a.X(0, 0)) : a.X(b - this.ca, c - this.da);
        a.kc(!0);
        this.add(a)
    }
    ;
    k.og = function(a) {
        var b = this.ca
          , c = this.da;
        this.ra(a);
        a.X(a.ca + b, a.da + c);
        a.kc(!1);
        this.getParent().add(a)
    }
    ;
    k.Jc = function() {
        return null
    }
    ;
    k.Kc = function() {
        return null
    }
    ;
    k.Nf = function() {}
    ;
    k.nc = function(a) {
        a = 1 !== RD(this);
        for (var b, c = []; RD(this); ) {
            var d = SD(this, 0);
            this.og(d);
            (b = d.nc(a, !0)) ? this.j.ia("5", b) : c.push(d)
        }
        this.j.ia("5", c);
        UF.prototype.nc.call(this, a);
        GD(this, 0, 0);
        return b
    }
    ;
    k.Ne = function(a) {
        if (this.getParent()instanceof sF && 0 === a.button && a.ctrlKey) {
            a: {
                var b = a.Bb;
                a = a.Mb;
                if (this.contains(b, a))
                    for (var c = this.h, d = c.length - 1, e; 0 <= d; d--)
                        if (e = c[d],
                        e.contains(b - e.ca, a - e.da)) {
                            b = e;
                            break a
                        }
                b = null
            }
            b && this.og(b)
        }
    }
    ;
    k.Cd = function() {
        for (var a = 0, b = RD(this); a < b; a++) {
            var c = SD(this, a);
            c instanceof zF && (c.ce = !0)
        }
        UF.prototype.Cd.call(this)
    }
    ;
    k.ng = function() {
        return !1
    }
    ;
    function mG() {
        DD.call(this, L("DIV"));
        nG || (nG = mm(1, 1, 2, "rgba(0,0,0,.5)"),
        nG.border = "1px dotted red",
        nG.backgroundColor = "rgba(255,0,0,.5)");
        no(this.o().style, nG)
    }
    var nG;
    z(mG, DD);
    function oG() {}
    oG.prototype.getData = function() {
        return this.g
    }
    ;
    function pG(a, b) {
        var c = new oG;
        c.h = a;
        c.g = b;
        return c
    }
    function qG(a) {
        var b = ho(a, "saves", 4);
        a = ho(a, "data", 64);
        return pG(b, a)
    }
    oG.prototype.toJSON = function() {
        return {
            saves: this.h,
            data: this.g,
            __c: "sgb"
        }
    }
    ;
    function rG(a) {
        this.j = a
    }
    var sG;
    rG.prototype.h = function(a, b) {
        tj(ju("game/load", {
            pid: a,
            _: yh()
        }), function() {
            if (Dj(this)) {
                var c = this.ba ? ej(this.ba.responseText) : void 0;
                b(XC(c))
            } else
                b(null)
        })
    }
    ;
    rG.prototype.xc = function(a, b, c) {
        function d(e) {
            e ? (tG(a, null),
            iu = {}) : Xi("Game could not be saved.");
            c && c(e)
        }
        (b = VC(b)) ? (b.pid = a,
        b.auth_code = uG(b),
        tG(a, pG(1, b)),
        this.j ? c && c(!0) : fu("game/save", b, function(e, f) {
            d(null === f)
        }, {
            method: "POST",
            Hb: !1
        })) : d(!1)
    }
    ;
    function vG() {
        var a = Ut();
        if (void 0 === a.h) {
            var b = ut(a).toLowerCase();
            b += b;
            var c = new mt;
            c.update(b);
            a.h = kt(ot(c))
        }
        return "sgb-" + a.h
    }
    function tG(a, b) {
        var c = !1;
        if (Zt()) {
            c = (Zt() ? gx().get(vG(), null) : null) || {};
            b ? c[a] = b : delete c[a];
            if (Kc(c)) {
                a = gx();
                b = vG();
                c = !1;
                try {
                    b = "ts-" + b,
                    zs(a.g, b),
                    c = null === a.g.get(b)
                } catch (d) {
                    (d instanceof vs ? Xi : W)("Cannot remove settings from " + a.g.Db(), d)
                }
                a = c
            } else
                a = gx().set(vG(), c);
            c = a
        }
        return c
    }
    function wG() {
        var a;
        if (a = Zt() ? gx().get(vG(), null) : null) {
            if (void 0 === lD ? !(lD = Es().He()) : !lD)
                return t.Promise.reject("Storage is disabled. Cause: a higher level of the Tracking protection, the private mode, cookies blocking...");
            var b = [];
            Ic(a, function(c, d) {
                b.push(new t.Promise(function(e, f) {
                    var g = c.getData();
                    "tok"in g && (g = Mc(g),
                    delete g.tok,
                    delete g.auth_code,
                    g.auth_code = uG(g));
                    fu("game/save", g, function(h, l) {
                        h = !1;
                        if (l) {
                            var m = l[0].g;
                            5 > c.h ? (c.h++,
                            tG(d, c)) : (W("sg bckp fail; rsn: " + m),
                            tG(d, null))
                        } else
                            tG(d, null) ? h = {
                                pid: d,
                                progress: c.g.progress
                            } : m = "Cannot remove a backed up saved game.";
                        h ? e(h) : f(m)
                    }, {
                        method: "POST",
                        Hb: !1
                    })
                }
                ))
            });
            a = t.Promise.all(b).catch(function(c) {
                Xi('An error during saving backed up saved game(s) ("' + c + '").');
                throw c;
            })
        } else
            a = t.Promise.resolve([]);
        return a
    }
    rG.prototype.g = function(a, b, c, d, e, f) {
        c = {
            pieces: c,
            curve: d,
            rotation: e ? 1 : 0
        };
        c.pid = a;
        c.gametime = b;
        c.auth_code = uG(c);
        c.tok = A.tsEnv.tok;
        xl(ju("game/completed"), function() {
            f && f(Dj(this))
        }, Tk(c))
    }
    ;
    rG.prototype.i = function() {}
    ;
    function xG(a, b) {
        a = {
            pid: a
        };
        void 0 !== b && (a.pieces = b);
        a.auth_code = uG(a);
        fu("puzzle/played", a, void 0, {
            method: "POST",
            Hb: !1
        })
    }
    function uG(a) {
        var b = ""
          , c = Jc(a).sort();
        c = y(c);
        for (var d = c.next(); !d.done; d = c.next())
            b += a[d.value];
        a = b;
        b = new mt;
        c = yG.length;
        d = Array(4 * c);
        for (var e = 0; e < c; e++)
            Hz(d, 4 * e, yG[e]);
        d.splice(d.length - 3, 3);
        b.update(jt(a.replace(/\n/g, "")).concat(d));
        return kt(ot(b))
    }
    var yG = [1248421747, 1081548880, 1970961004, 1696622963, 543319411, 1949840435, 892875572, 960314685];
    function zG() {
        this.j = 0;
        this.h = !1;
        this.l = !!Ih;
        this.m = this.g = 0;
        this.reset()
    }
    zG.prototype.start = function() {
        this.u = (this.l ? Jh : yh)();
        this.h = !0;
        void 0 === this.i && (this.g = 0,
        this.i = Lh(function() {
            this.g += 1E3
        }
        .bind(this), 1E3))
    }
    ;
    function AG(a) {
        a.j = BG(a);
        a.h && (a.h = !1,
        void 0 !== a.i && (Nh(a.i),
        a.i = void 0),
        a.g = 0)
    }
    function BG(a) {
        var b = a.j;
        if (a.h) {
            var c = (a.l ? Jh : yh)()
              , d = c - a.u;
            if (3E3 < a.g - d || 1E3 < -d) {
                if (!a.m) {
                    var e = [d, a.g - d];
                    Bi(function() {
                        e.push((this.l ? Jh : yh)() - c);
                        W("Sakr; " + e.join("; "))
                    }, 1E3, a);
                    a.m++
                }
                d = Math.max(0, a.g)
            }
            b += d
        }
        return Math.round(b)
    }
    zG.prototype.reset = function(a) {
        AG(this);
        this.j = a || 0
    }
    ;
    function CG(a, b, c, d) {
        Zi("pr cnstr");
        sF.call(this, a);
        this.g = b;
        this.j = c;
        this.cc = new mG;
        this.K = Number.NaN;
        this.ha = 50;
        this.l = void 0 === d ? null : d;
        this.ib = !!d;
        this.Ad = new U(this)
    }
    z(CG, sF);
    function DG(a) {
        return $g([EG(a), FG(a)]).then(a.Oi, null, a).then(a.Pi, null, a).then(a.rj, null, a)
    }
    k = CG.prototype;
    k.D = function() {
        Zi("pr dstr");
        tE(yE);
        var a;
        this.N && (a = this.N.getParent()) && a.ra(this.N);
        this.pb && gf(this.pb);
        GG(this);
        sF.prototype.D.call(this);
        a = [];
        a.push(this.N, this.T, this.xa, this.v, this.F, this.i, this.V, this.cc, this.Ad, this.R, this.ga);
        a = y(a);
        for (var b = a.next(); !b.done; b = a.next())
            (b = b.value) && b.G();
        this.l = null;
        this.Ja = this.R = void 0
    }
    ;
    k.start = function() {
        this.l && HG(this) && IG(this)
    }
    ;
    function IG(a) {
        JG(a) || KG(a) || (a.u.start(),
        a.Ta = !0,
        a.ia("gameStarted", a.u))
    }
    function JG(a) {
        return !!a.u && a.u.h
    }
    function GG(a) {
        a.cc.L(!1);
        gi(a.Ad);
        JG(a) && (AG(a.u),
        a.ia("gamePaused", HG(a)))
    }
    function LG(a) {
        if (a.u) {
            tE(yE);
            var b = !0
              , c = a.getParent();
            if (a.ua)
                IG(a),
                a.ua = !1,
                c.ra(a.N);
            else if (JG(a)) {
                GG(a);
                b = !1;
                a.ua = !0;
                var d = HG(a);
                if (!a.qb || 6E4 < d - a.qb)
                    a.qb = d,
                    MG(a);
                a.N || (d = function() {
                    var e = $k([[V("Paused")]]);
                    Bd(e, {
                        style: "font-weight:bold;font-size:36px;color:#fff;text-shadow:10px 10px 20px #000;text-align:center;cursor:default;text-align:center"
                    });
                    DD.call(this, e);
                    var f = a.getSize();
                    GD(this, f.width, f.height);
                    this.ka().C(e, "mousedown", function(g) {
                        !a.W() && 0 == g.ja.button && LG(a)
                    })
                }
                ,
                z(d, DD),
                d.W = oe,
                a.N = new d);
                c.add(a.N);
                YD(c, a.N, 2, 0);
                YD(c, a.N)
            }
            a.L(b)
        }
    }
    function EG(a) {
        return ny(a.g.image.url).then(function(b) {
            var c = new J(b.naturalWidth,b.naturalHeight);
            if (16 > c.width || 16 > c.height)
                throw Bl(this.g.image.url);
            for (var d = this.g.pid, e = 0, f = 0; f < d.length; ++f)
                e = 31 * e + d.charCodeAt(f) >>> 0;
            this.R = new WE(b.src,b,this.g.Ga,this.g.rotation,c,e);
            b = bF(this.R);
            e = this.getSize();
            e = new J(e.width - 20,e.height - 20);
            c = b.height / b.width;
            d = Math.sqrt(e.width * e.height / 100 * 50 / c);
            d = new J(d,d * c);
            f = e.width / d.width;
            e = e.height / d.height;
            if (1 > f || 1 > e)
                d.width *= Math.min(f, e);
            8 < d.width / b.width && (d.width = 8 * b.width);
            d.width = ~~d.width & 4294967292;
            d.height = Math.round(d.width * c) & 4294967294;
            b = this.R;
            c = d.width;
            d = d.height;
            e = fe();
            f = 1 < e && cF();
            Zi("Sbsmplng(dpr:" + e + "):" + f);
            if (f)
                b.j = Math.round(c * e),
                b.i = Math.round(d * e),
                b.m = Pl(b.m, b.j, b.i),
                b.h = c / b.j,
                b.u = d / b.i;
            else if (c !== b.j || d !== b.i) {
                b.m = Pl(b.m, c, d);
                e = c / b.j;
                f = d / b.i;
                if (b.v)
                    for (var g = 0; g < b.v.length; g++) {
                        for (var h = b.v[g].h, l = e, m = f, n = 0, q = h.Y.length; n < q; n += 2)
                            h.Y[n] *= l,
                            h.Y[n + 1] *= m;
                        h.ob = null
                    }
                b.j = c;
                b.i = d
            }
        }
        .bind(a))
    }
    function FG(a) {
        return new Lg(function(b) {
            if (!this.l && !1 !== this.l && this.g.pid && this.j.xc) {
                var c = this
                  , d = function(e) {
                    (new kD).h(c.g.pid, function(f) {
                        f && (c.l = f,
                        Zi("gl f lc"));
                        e(!!f)
                    })
                };
                this.j.fe ? (r = (sG || (sG = wG())).catch(ec),
                v(r, "finally")).call(r, function() {
                    c.W() ? b() : (new rG).h(c.g.pid, function(e) {
                        c.W() ? b() : e ? (c.l = e,
                        Zi("gl f s"),
                        b()) : d(function(f) {
                            f && c.l instanceof UC && ZC(c.l) ? NG(c.l, c.g.pid, function() {
                                b()
                            }, c.j.fe) : b()
                        })
                    })
                }) : d(function() {
                    b()
                })
            } else
                b()
        }
        ,a)
    }
    k.Oi = function() {
        var a = vh(), b = vh(), c;
        return (new Lg(function(d) {
            if (this.l instanceof UC) {
                var e = this
                  , f = this.l
                  , g = function() {
                    e.R.g = f.rotation;
                    var l = e.R;
                    l.l = f.Ga;
                    l.v = null
                };
                if (this.ib)
                    g();
                else if (this.R.g != f.rotation || !this.R.l.Ec(f.Ga)) {
                    var h = K("DIV", null, el(null, V("A saved game with different cutting exists. Do you want to load the saved game (%1$s) or start a new game (%2$s)?"), pD(f.Ga, f.rotation), pD(this.R.l, this.R.g)));
                    c = Hp(V("Different Saved Game"), h);
                    h = new hp;
                    gp(gp(h, {
                        key: a,
                        caption: V("Load the saved game")
                    }, !0, !0), {
                        key: b,
                        caption: V("Start a new game")
                    });
                    sp(c, h);
                    Ze(c, tp, function(l) {
                        l.key === b ? (e.l = null,
                        e.dc = !0) : g();
                        d()
                    });
                    c.L(!0);
                    return
                }
            }
            d()
        }
        ,this)).vb(function(d) {
            c && c.G();
            throw d;
        })
    }
    ;
    function NG(a, b, c, d, e) {
        d ? ((new kD).i(b),
        (new rG(e)).xc(b, a, c)) : (new kD).xc(b, a, c)
    }
    function MG(a, b, c) {
        if (a.j.xc && a.Ta) {
            JG(a) || (a.Ta = !1);
            var d = OG(a);
            if (d) {
                NG(d, a.g.pid, b, a.j.fe, c);
                return
            }
            W("CntCrSG")
        }
        b && b(!1)
    }
    function PG(a, b, c) {
        if (a.g.pid) {
            var d = a.R.l
              , e = pA(d);
            d = d.g;
            var f = a.R.g;
            (new kD).g(a.g.pid, b, e, d, f);
            (new rG).g(a.g.pid, b, e, d, f, c)
        } else
            c && c(!1)
    }
    k.Pi = function() {
        function a(e) {
            this.Ja && (this.Ja[e] = new zF(this,e,this.R,this.eb))
        }
        var b = YE(this.R).length, c, d;
        this.Ja = Array(b);
        this.qd().set("1", b);
        aA = 1234;
        for (c = d = 0; 10 > c && c < b; c++)
            d += XE(this.R, bA(b)).h.Ob().width;
        c = d / c * this.R.h;
        QG(this, c);
        c = Math.max(10, Math.round(c / 1.5));
        d = Math.min(this.$(), this.Z()) >> 1;
        c >= d && (c = d - 1);
        this.rb = new $x(c,c,this.$() - 2 * c,this.Z() - 2 * c);
        c = 70;
        c >= d && (c = d - 1);
        this.mc = new $x(c,c,this.$() - 2 * c,this.Z() - 2 * c);
        c = [];
        for (d = 0; d < b; d++)
            c.push(a.bind(this, d));
        return qA(c).then(function() {
            if (this.Ja)
                for (var e = 0; e < b; e++)
                    for (var f = XE(this.R, e).g, g = 0; g < f.length; g++)
                        this.Ja[e].i.add(this.Ja[f[g]])
        }
        .bind(this))
    }
    ;
    k.rj = function() {
        this.ia("setTimeInfo");
        if (this.R.g) {
            var a = ns(V("Pieces are randomly rotated, see <a>Help</a> if you need."))
              , b = Ad("A", null, a);
            Yk(b);
            R(a, "display", "inline-block");
            R(a, lm(0, 0, 4, 4));
            Q(b, "click", function(c) {
                this.ia("showHelp");
                c.stopPropagation();
                c.preventDefault()
            }, !0, this);
            this.ia("setBPMsg", a)
        }
        this.pb = Q(new sf(document), pf, function(c) {
            if (!(c.ctrlKey || c.shiftKey || c.altKey || c.metaKey))
                switch (c.keyCode) {
                case 65:
                    RG(this);
                    break;
                case 68:
                    SG(this);
                    break;
                case 71:
                    TG(this, !UG(this));
                    break;
                case 73:
                    VG(this, !WG(this));
                    break;
                case 80:
                    LG(this)
                }
        }, !1, this);
        b = this.Ja.length;
        for (a = 0; a < b; a++)
            this.add(this.Ja[a]);
        XG(this, !0);
        this.l instanceof UC ? YG(this, this.l) : (ZG(this, 0),
        SG(this, !0));
        this.ib || (TG(this, UG(this) || this.j.Yh),
        VG(this, WG(this) || this.j.$h));
        Ls(lx(this.g.image.url, this.g.pid));
        $G(this);
        return Tg()
    }
    ;
    k.add = function(a, b) {
        sF.prototype.add.call(this, a, b);
        a instanceof tF && !(a instanceof lG) && (KD("click", a, this),
        JD(a, this))
    }
    ;
    k.ra = function(a) {
        var b = "number" === typeof a ? SD(this, a) : a;
        MD("mousedown", b, this);
        MD("click", b, this);
        sF.prototype.ra.call(this, a)
    }
    ;
    function QG(a, b) {
        var c = Math.min(b / 30, 8)
          , d = a.R.h;
        a.eb = {
            jg: !0,
            Qj: Math.min(b / 20, 15) / d,
            Wh: Math.max(Math.round(b / 21), 1) / d,
            Pj: .65,
            nf: !0,
            Li: c / 2 / d,
            Ki: c / d
        };
        b = Math.max(b / 10, 5);
        a.qd().set("0", Math.round(b * b))
    }
    function SG(a, b) {
        a.u && aH(a, !0, b)
    }
    function RG(a) {
        a.u && (IG(a),
        aH(a))
    }
    function aH(a, b, c) {
        if (!a.ua) {
            var d = []
              , e = function(g) {
                for (var h = 0, l = RD(g); h < l; h++) {
                    var m = SD(g, h);
                    m instanceof zF && (b || !m.ce) && d.push(m)
                }
            };
            a.xa && RD(a.xa) ? (e(a.xa),
            bH(a)) : e(a);
            if (e = d.length) {
                var f = cH(a);
                f = [new $x(f.x,f.y,$E(a.R),aF(a.R))];
                WG(a) && f.push(new $x(a.i.ca,a.i.da,a.i.$(),a.i.Z()));
                b ? FF(d, f, c) : EF(d, f);
                if (b)
                    for (db(d),
                    c = 0; c < e; c++)
                        YD(a, d[c]),
                        d[c].ce = !1;
                for (c = 0; c < e; c++)
                    dH(a, d[c])
            }
        }
    }
    function dH(a, b) {
        (a = b instanceof tF ? a.rb : a.mc) && gG(b, a)
    }
    function eH(a, b) {
        jG(b, a.rb, new $x(0,0,a.$(),a.Z()))
    }
    function KG(a) {
        var b;
        if (a.Ja && a.Ja.length && (b = a.Ja[0].getParent()) && b instanceof DF && RD(b) == a.Ja.length)
            return b
    }
    function bH(a) {
        a.xa && (a.xa.getParent() !== a && tE(yE),
        a.xa.getParent() === a && a.xa.nc())
    }
    function XG(a, b) {
        b !== !!a.xa && (b ? (a.add(a.xa = new lG(a)),
        JD(a, a)) : (MD("mousedown", a, a),
        bH(a),
        a.ra(a.xa),
        a.xa.G(),
        a.xa = void 0))
    }
    function fH(a, b) {
        a.cc.getParent() || (a.cc.L(!1),
        a.add(a.cc));
        bH(a);
        var c = b.clientX
          , d = b.clientY
          , e = b.Bb
          , f = b.Mb
          , g = new $x(e,f,0,0);
        gi(a.Ad);
        b = document;
        a.Ad.C(b, "mousemove", function(h) {
            YD(this, this.cc);
            this.cc.L(!0);
            g.x = e;
            g.y = f;
            g.width = 0;
            g.height = 0;
            g.add(e + h.clientX - c, f + h.clientY - d);
            this.cc.Gb(g)
        });
        a.Ad.C(b, "mouseup", function() {
            if (g.width && g.height && this.xa.getParent() === this) {
                for (var h = RD(this), l = [], m = 0; m < h; m++) {
                    var n = SD(this, m);
                    (n instanceof DF || n instanceof zF) && n.Lf(g) && n.isEnabled() && l.push(n)
                }
                if (h = l.length)
                    for (YD(this, this.xa),
                    m = 0; m < h; m++)
                        this.xa.uc(l[m])
            }
            this.cc.L(!1);
            gi(this.Ad)
        })
    }
    k.Vf = function(a) {
        this.T && this.T.L(!1);
        0 === a.button && this.xa && this.xa.getParent() === this && (a.target === this ? fH(this, a) : a.ctrlKey || bH(this))
    }
    ;
    k.Ne = function(a) {
        if (this.xa && this.xa.getParent() === this) {
            var b = a.target;
            b.getParent() === this && 0 === a.button && a.ctrlKey && (RD(this.xa) || YD(this, this.xa),
            this.xa.uc(b))
        }
    }
    ;
    k.ia = function(a, b) {
        switch (a) {
        case "6":
            b instanceof lG || bH(this);
            this.lc || (this.lc = !0,
            IG(this));
            Ls(lx(this.g.image.url, this.g.pid));
            break;
        case "5":
            b instanceof DD ? dH(this, b) : eH(this, b);
            break;
        case "4":
            sF.prototype.ia.call(this, "playSound", gH);
            var c = this.K;
            $G(this);
            this.g.pid && 10 > c && 10 <= this.K && xG(this.g.pid, YE(this.R).length);
            100 === this.K ? Ig(function() {
                if (!this.W()) {
                    var d = KG(this);
                    GG(this);
                    hH(this, d);
                    iH(this, d)
                }
            }, this) : pE() || MG(this, void 0, !0);
            break;
        case "8":
            KG(this) || (this.T || this.add(this.T = new aG),
            bG(this.T, b[1], b[0]));
            break;
        case "9":
            this.T && this.T.L(!1)
        }
        sF.prototype.ia.call(this, a, b)
    }
    ;
    function jH(a) {
        var b = a.Z() - 10 - 10 - 140;
        if (240 > b)
            return null;
        var c = cH(a)
          , d = c.x - 10 - 10;
        if (120 <= d)
            return new $x(10,10,Math.min(d, 160),b);
        c = c.x + $E(a.R) + 10;
        a = a.$() - c - 10;
        return 120 <= a ? (d = a - 160,
        0 < d && (a -= d,
        c += d),
        new $x(c,10,a,b)) : null
    }
    function hH(a, b) {
        b = b || KG(a);
        XG(a, !1);
        b.Kb(-b.g, new Yx(0,0));
        b.qa(!1);
        var c = cH(a);
        b.X(c);
        TG(a, !1, !0);
        b = new DD(K("DIV", "bigShadow", ZE(a.R)));
        b.Gb(c.x, c.y, $E(a.R), aF(a.R));
        a.add(b);
        YD(a, b, void 0, 0);
        a.V = new PF(a,a.g.pid,a.g.name);
        a.add(a.V);
        YD(a, a.V, 2, 0);
        var d;
        a.j.dh && Jk() && !zD() && (d = jH(a)) && (a.ga = new OD(new J(d.width,d.height),a.j.dh),
        a.ga.X(d.x, d.y),
        a.add(a.ga),
        YD(a, a.ga, 2, 0))
    }
    function iH(a, b) {
        var c = HG(a);
        sF.prototype.ia.call(a, "playSound", kH);
        VG(a, !1);
        MG(a);
        SF(a.V, c, YE(a.R).length);
        PG(a, c, function() {
            a.W() || (sF.prototype.ia.call(a, "gameCompleted", c),
            a.g.pid && a.j.kg && TF(a.V, a.g.pid))
        });
        var d = new Ym(b.o(),1E3);
        Q(d, "end", function() {
            b.W() || b.L(!1);
            this.V.W() || this.V.L(!0)
        }, !1, a);
        d.play()
    }
    function $G(a) {
        var b, c, d = [];
        var e = c = 0;
        for (b = a.Ja.length; c < b; c++) {
            var f = a.Ja[c].getParent();
            f && f instanceof DF ? -1 == Qa(d, f) && d.push(f) : e++
        }
        e += d.length;
        b = a.K;
        a.K = ~~(100 * (a.Ja.length - e) / (a.Ja.length - 1));
        b !== a.K && a.ia("progressChanged", a.K)
    }
    function TG(a, b, c) {
        if (a.R) {
            var d = function(e) {
                e.qa(!1);
                a.add(e);
                YD(a, e, 0, 0);
                YD(a, e, void 0, 0)
            };
            b ? KG(a) || (a.v || (b = L("DIV"),
            b.appendChild(ZE(a.R)),
            a.v = new DD(b)),
            R(a.v.o(), {
                opacity: a.j.qh / 100
            }),
            b = cH(a),
            a.v.Gb(b.x, b.y, $E(a.R), aF(a.R)),
            a.v.getParent() || d(a.v),
            a.F && a.F.getParent() == a && a.ra(a.F)) : (a.v && a.v.getParent() == a && a.ra(a.v),
            c || !a.j.Zh ? a.F && a.F.getParent() == a && a.ra(a.F) : (a.F || (b = K("DIV", {
                style: "border:1px solid;border-color:rgba(0,0,0,.2) rgba(255,255,255,.15) rgba(255,255,255,.15) rgba(0,0,0,.2) "
            }),
            a.F = new DD(b)),
            b = cH(a),
            a.F.Gb(b.x - 1, b.y - 1, $E(a.R), aF(a.R)),
            a.F.getParent() || d(a.F)))
        }
    }
    function UG(a) {
        return !!a.v && a.v.getParent() == a
    }
    function VG(a, b) {
        a.R && (b ? KG(a) || (a.i ? a.i.L(!0) : (b = ZE(a.R),
        a.i = new GF(b,a),
        a.add(a.i),
        YD(a, a.i, 2, 0),
        a.za && (lH(a, a.za),
        a.za = void 0),
        a.ha && (mH(a, a.ha),
        delete a.ha),
        a = a.i,
        b = a.getParent(),
        b instanceof QD && (a.X(10, b.Z() - a.Z() - 10),
        a.l.ia("5", a)))) : a.i && a.i.L(!1))
    }
    function lH(a, b) {
        a.i ? (a.i.X(b.x, b.y),
        dH(a, a.i)) : a.za = b.Fc()
    }
    function mH(a, b) {
        a.i ? (LF(a.i, b),
        dH(a, a.i)) : a.ha = b
    }
    function WG(a) {
        return !!a.i && a.i.isVisible()
    }
    function ZG(a, b) {
        a.u || (a.u = new zG);
        a.u.reset(b)
    }
    function HG(a) {
        return a.u ? BG(a.u) : 0
    }
    function cH(a) {
        var b = bF(a.R);
        switch (~~(a.j.Ff / 3)) {
        case 0:
            var c = 10;
            break;
        case 2:
            c = a.Z() - b.height - 10;
            break;
        default:
            c = Math.round((a.Z() - b.height) / 2)
        }
        switch (a.j.Ff % 3) {
        case 0:
            a = 10;
            break;
        case 2:
            a = a.$() - b.width - 10;
            break;
        default:
            a = Math.round((a.$() - b.width) / 2)
        }
        return new Yx(a,c)
    }
    function OG(a) {
        if (!a.Ja || v(Number, "isNaN").call(Number, a.K))
            return null;
        tE(yE);
        bH(a);
        var b = new UC;
        b.Ga = a.R.l;
        b.rotation = a.R.g;
        b.progress = a.K;
        var c = HG(a);
        b.v = Math.min(c, 4294967295);
        c = cH(a);
        var d = bF(a.R);
        b.l = new $x(c.x,c.y,d.width,d.height);
        b.K = UG(a) ? 1 : 0;
        b.F = WG(a);
        a.i && (b.j = new RC(a.i.ca,a.i.da,0,0),
        b.m = a.i.F);
        c = 0;
        for (d = RD(a); c < d; c++) {
            var e = SD(a, c);
            if (e instanceof tF)
                if (e instanceof zF) {
                    var f = new SC;
                    f.h = e.K;
                    f.g = new RC(e.ca,e.da,d - c,e.g);
                    f.i = !!e.ce;
                    b.h || (b.h = []);
                    b.h.push(f)
                } else if (e instanceof DF) {
                    f = RD(e);
                    var g = new TC;
                    g.h = new RC(e.ca,e.da,d - c,e.g);
                    g.g = Array(f);
                    for (var h = 0; h < f; h++) {
                        var l = SD(e, h);
                        g.g[h] = l.K
                    }
                    b.g || (b.g = []);
                    b.g.push(g)
                }
        }
        return b
    }
    function YG(a, b) {
        if (b.rotation == a.R.g && b.Ga.Ec(a.R.l)) {
            var c = cH(a)
              , d = bF(a.R);
            b.transform(new $x(c.x,c.y,d.width,d.height));
            ZG(a, b.v);
            TG(a, !!b.K);
            VG(a, b.F);
            b.j && (lH(a, b.j.Cb()),
            mH(a, b.m));
            var e = [];
            if (b.g)
                for (d = 0,
                c = b.g.length; d < c; d++) {
                    var f = b.g[d]
                      , g = new DF(a);
                    a.add(g);
                    for (var h = 0; h < f.g.length; h++)
                        g.uc(a.Ja[f.g[h]]);
                    g.Kb(f.h.h, g.Cb());
                    g.X(f.h.Cb());
                    e.push({
                        wg: f.h.i,
                        component: g
                    })
                }
            if (b.h)
                for (d = 0,
                c = b.h.length; d < c; d++)
                    f = b.h[d],
                    g = a.Ja[f.h],
                    g.Kb(f.g.h, g.Cb()),
                    g.X(f.g.Cb()),
                    g.ce = !!f.i,
                    e.push({
                        wg: f.g.i,
                        component: g
                    });
            e.sort(function(l, m) {
                return m.wg - l.wg
            });
            d = 0;
            for (c = e.length; d < c; d++)
                YD(a, e[d].component);
            if (b = KG(a))
                hH(a, b),
                b.L(!1),
                a.V.L(!0),
                a.g.pid && a.j.kg && TF(a.V, a.g.pid),
                a.ia("setTimeInfo", [HG(a)]);
            else {
                b = [];
                c = y(a.h[v(t.Symbol, "iterator")]());
                for (d = c.next(); !d.done; d = c.next())
                    d = d.value,
                    d instanceof tF && b.push(d);
                eH(a, b)
            }
        }
    }
    var nH = {
        ogg: "audio/ogg",
        mp3: "audio/mpeg"
    }
      , gH = {
        url: "/img/play/snd/connect",
        yf: nH
    }
      , kH = {
        url: "/img/play/snd/congr",
        yf: nH
    };
    function oH(a, b, c, d, e) {
        var f = ud(a);
        "private" !== hm(f) && Q(f, "change", function() {
            var g = ud(b);
            Od(g);
            if ("private" === hm(f)) {
                var h = sy();
                g.appendChild(h)
            }
        });
        Q(ud(c), "click", function(g) {
            xy(d, function(h, l) {
                ry(h, l);
                jm(ud(e), l ? l.pa.image_id : void 0)
            });
            g.stopPropagation()
        })
    }
    function pH(a, b, c) {
        function d(e) {
            pH.Qf && pH.Qf.G();
            var f = ud(b);
            e || (e = $h(f, "album"),
            e = ko(e));
            pH.Qf = e.Ba();
            pH.Qf.La(f)
        }
        d();
        Ra(yd(a), function(e) {
            Q(e, "click", function(f) {
                uy(function(g) {
                    d(g);
                    jm(ud(c), g.ea().album_id)
                });
                f.stopPropagation()
            })
        })
    }
    function qH(a, b) {
        if (a = hm(a)) {
            var c, d, e, f;
            if ((c = zd(b)) && (d = ud(b)) && (e = $h(c, "attribs")) && (f = ko(e)) && Da(f)) {
                b = f;
                e = f.src;
                a = a.replace(/#/, "0x");
                if (a = "bgcolor" + (null != a ? "=" + encodeURIComponent(String(a)) : "")) {
                    var g = e.indexOf("#");
                    0 > g && (g = e.length);
                    var h = e.indexOf("?");
                    if (0 > h || h > g) {
                        h = g;
                        var l = ""
                    } else
                        l = e.substring(h + 1, g);
                    e = [e.slice(0, h), l, e.slice(g)];
                    g = e[1];
                    e[1] = a ? g ? g + "&" + a : a : g;
                    e = e[0] + (e[1] ? "?" + e[1] : "") + e[2]
                }
                b.src = e;
                b = f;
                e = "<iframe";
                for (var m in b)
                    a = b[m],
                    "boolean" === typeof a ? a && (e += " " + m) : e += " " + m + '="' + (Fh(a) ? a : kd(a + "")) + '"';
                m = e + "></iframe>";
                b = Rf(c).height;
                c.style.height = Gf(b, !0);
                Od(c);
                b = L("IFRAME");
                for (var n in f)
                    try {
                        var q = f[n];
                        if ("boolean" === typeof q)
                            if (!0 === q)
                                q = "";
                            else
                                continue;
                        else
                            Fh(q) && (q = "" + q);
                        b.setAttribute(n, q)
                    } catch (p) {}
                c.appendChild(b);
                R(c, {
                    height: "auto"
                });
                jm(d, m)
            }
        }
        return !1
    }
    function rH(a, b, c) {
        jm(a, c);
        qH(a, b);
        return !1
    }
    function sH(a) {
        return (a = ud(a)) ? zd("ts-faq-a", a) : null
    }
    function tH(a) {
        return (a = ud(a)) ? zd("ts-faq-q", a) : null
    }
    function uH(a, b) {
        "none" != sH(a).style.display != b && (a = sH(a),
        b ? (new $m(a,650)).play() : T(a, b))
    }
    function vH() {
        Ra(yd("ts-faq-itm"), function(b) {
            var c = tH(b);
            Q(c, "click", function(d) {
                uH(b, "none" == sH(b).style.display);
                d.preventDefault()
            })
        });
        var a = A.location.hash;
        a && (a = a.substring(1)) && uH(a, "none" == sH(a).style.display)
    }
    function wH() {
        Ra(yd("ts-faq-itm"), function(a) {
            uH(a, !0)
        })
    }
    function xH(a) {
        qz().then(function(b) {
            var c = "";
            try {
                var d = [];
                rb() && d.push("Opera");
                F("Coast") && d.push("Coast");
                sb() && d.push("IE");
                F("Edg/") && d.push("EdgeChromium");
                F("Edge") && d.push("Edge");
                vb() && d.push("Chrome");
                tb() && d.push("Firefox");
                ub() && d.push("Safari");
                !F("iPad") && !F("iPhone") || ub() || vb() || F("Coast") || tb() || !F("AppleWebKit") || d.push("IosWebview");
                wb() && d.push("AndroidBrowser");
                F("Silk") && d.push("Silk");
                for (var e = [], f = y(cl("script:not(.ts-cntnt)")), g = f.next(); !g.done; g = f.next()) {
                    var h = g.value;
                    e.push(h.src ? h.src : h.innerText)
                }
                var l = A.navigator.cookieEnabled;
                f = {};
                var m = {
                    scripts: document.getElementsByTagName("SCRIPT").length,
                    screen: [A.screen.width, A.screen.height],
                    viewport: [A.innerWidth, A.innerHeight],
                    dpr: fe(),
                    touchdev: void 0 !== oh ? oh : oh = Ch(),
                    browser: d,
                    browserVer: yb(),
                    date: (new Date).toUTCString(),
                    alienScripts: e,
                    warnings: f
                };
                A.matchMedia && A.matchMedia("(forced-colors: active)").matches && (f.highContrast = !0);
                for (var n = [Es(), xt || (xt = new wt)], q = y(n), p = q.next(); !p.done; p = q.next()) {
                    var u = p.value;
                    u.He() || (f[u.Db() + "Support"] = !1)
                }
                !1 === l && (f.cookieEnabled = l);
                b && (f.ab = b);
                c = mo(m)
            } catch (x) {
                x instanceof Error && (c = x.name)
            }
            a(c)
        })
    }
    function yH(a, b) {
        fu("game/delete", {
            pid: a
        }, function(c, d) {
            d || (b ? Al(b) : wl())
        }, "POST")
    }
    function zH(a, b) {
        fu("puzzle/delete", {
            pid: a
        }, function(c, d) {
            d || (b ? Al(b) : wl())
        }, "POST")
    }
    function AH(a, b) {
        fu("album/delete", {
            aid: a
        }, function(c, d) {
            d || (b ? Al(b) : wl())
        }, "POST")
    }
    function BH() {
        (r = Cz().catch(function(a) {
            W("so problem", a instanceof Error ? a : void 0)
        }),
        v(r, "finally")).call(r, function() {
            hu("user/signout", null, "POST").then(function(a) {
                var b = new Hs("refreshpage")
                  , c = Js();
                b = Is(b);
                c.i(b);
                Al(a.forward)
            })
        })
    }
    function CH(a, b) {
        Gw(a, b).then(function() {
            wl()
        })
    }
    function DH(a) {
        hm(zd("ts-srch-inpt", a.target)) || a.preventDefault()
    }
    function EH() {
        zz.Ra().play(kH.url, kH.yf)
    }
    function FH() {
        var a = zd("ts-infopanel");
        a && O(a, "ts-aplaced")
    }
    function GH() {
        function a(b) {
            hu("user/settings", {
                theme: b
            }, "POST").then(function() {
                wl()
            })
        }
        return new uq(V("Theme"),function() {
            var b = new os;
            b.H(new uq(V("Light"),void 0,{
                name: "sun",
                type: "regular"
            },a.bind(A, "light")));
            b.H(new uq(V("Dark"),void 0,{
                name: "moon",
                type: "regular"
            },a.bind(A, "dark")));
            b.H(new uq(V("System dependent"),void 0,{
                name: "moon-over-sun",
                type: "regular"
            },a.bind(A, "system")));
            return Tg(b)
        }
        ,{
            name: "moon-over-sun",
            type: "regular"
        })
    }
    ;function HH(a, b) {
        a = a.value;
        b.value = "";
        if (a) {
            var c = Math.max(a.lastIndexOf("\\"), a.lastIndexOf("/"));
            0 <= c && (a = a.substring(c + 1));
            c = a.lastIndexOf(".");
            0 <= c && (a = a.substring(0, c));
            /^([A-Z]{3,}|Tumblr|\d+)_/.test(a) || (a = a.replace(/_+/g, " "),
            a = a.replace(/\xa0|[ \t]+/g, " "),
            (a = gb(a)) && (a = a.charAt(0).toUpperCase() + a.substring(1)));
            c = Dh(b.getAttribute("minlength"));
            if (!c || a.length >= c)
                (c = Dh(b.getAttribute("maxlength"))) && a.length > c && (a = a.substring(0, c)),
                /[a-zA-Z]{2,}/.test(a) && (b.value = a,
                b.select());
            b.focus()
        }
    }
    ;function IH(a) {
        var b = new M;
        a = yd("ts-item", a);
        for (var c = [], d = 0; d < a.length; d++)
            c.push(function(e) {
                if (!b.W())
                    try {
                        var f = $h(e, "item");
                        if (f) {
                            var g = ko(f).Ba();
                            N(b, g);
                            g.ya(e)
                        }
                    } catch (h) {
                        W("An item is incorrect", h)
                    }
            }
            .bind(null, a[d]));
        qA(c);
        return b
    }
    function JH(a) {
        fu("puzzle/reportAbuse", {
            pids: a
        }, function(b) {
            b && Wt(Ut(), "Thank you. We will review the item(s) as soon as possible.")
        }, "POST")
    }
    function KH() {
        function a() {
            wx && (xx.G(),
            Ra(wx, Qd),
            wx = xx = null)
        }
        if (wx)
            a();
        else if (zx.size) {
            var b = function(f) {
                a();
                if (this instanceof Lx)
                    JH([this.Qd()]);
                else {
                    var g = "I am reporting abuse on the following item:\n\n";
                    if (this instanceof Yw) {
                        var h = this.ua.yb();
                        h = h instanceof fk ? new fk(h) : new fk(h);
                        var l = A.location;
                        gk(h, l.protocol);
                        hk(h, l.hostname);
                        ik(h, l.port);
                        g += "album: " + h.toString()
                    }
                    g = {
                        subject: "Abuse report of an item",
                        msg: g + "\n\nReason: ?\n"
                    };
                    g.ret = Uk().toString();
                    Al(Ws("contact", g))
                }
                f.stopPropagation()
            };
            wx = [];
            xx = new U;
            var c = v(zx, "values").call(zx);
            c = y(c);
            for (var d = c.next(); !d.done; d = c.next())
                if (d = d.value,
                d.pb && d.pb[0]) {
                    var e = kl({
                        type: "button",
                        value: "Report",
                        title: "Report",
                        "class": "btn ts-smaller ts-abs",
                        style: "bottom:6px;right:6px;max-width:150%"
                    });
                    ei(xx, e, "click", b, !1, d);
                    Md(d.o(), e);
                    wx.push(e)
                }
            Bi(function() {
                xx.C(document.body, "click", a)
            }, 0);
            Wt(Ut(), "Please click on the Report button on the preview.")
        } else
            (b = sh("pid")) ? JH([b]) : (b = {
                subject: "Abuse report of page",
                msg: "I am reporting abuse on the following web page:\n\n  " + A.location.href + "\n"
            },
            b.ret = Uk().toString(),
            Al(Ws("contact", b)))
    }
    ;function LH() {
        pl.call(this);
        this.Bc = !0;
        this.Xe = new U(this);
        N(this, this.Xe)
    }
    z(LH, pl);
    LH.prototype.O = function() {
        pl.prototype.O.call(this);
        MH(this);
        this.Nd(this.Bc)
    }
    ;
    LH.prototype.qa = function(a) {
        this.Bc = a;
        MH(this);
        this.Nd(a)
    }
    ;
    function MH(a) {
        var b = a.o();
        b && we(b, "ts-ctrl-disabled", !a.Bc)
    }
    LH.prototype.Nd = function(a) {
        this.Xe && gi(this.Xe);
        var b;
        a && (b = this.o()) && this.Xe.tc(b, "click", function() {
            this.qa(!1);
            this.dispatchEvent("action")
        })
    }
    ;
    function NH(a) {
        var b, c = new Y(null,nu(["ts-size-medium2"], !0));
        for (b = 0; b < a.length; b++)
            c.H(a[b].Ba());
        return c
    }
    function OH(a) {
        var b, c = a.data, d = c.length, e = new Y(null,"ts-title");
        switch (a.type) {
        case "pcreated":
            e.H(dx(1 == d ? V("%s has created a new puzzle.") : V("%s has created new puzzles."), Px(a.user)));
            var f = NH(c);
            break;
        case "pliked":
            e.H(dx(1 == d ? V("%s has liked a puzzle.") : V("%s has liked puzzles."), Px(a.user)));
            f = NH(c);
            break;
        case "ppicked":
            e.H(ul(1 === d ? V("Your puzzle has been chosen for the Featured puzzles.") : V("Your puzzles have been chosen for the Featured puzzles.")));
            f = NH(c);
            break;
        case "newfan":
            for (e.H(ul(1 === d ? V("You have a new follower.") : V("You have new followers."))),
            f = new Y(null,nu(["ts-size-small", "ts-list-3xwide"], !0)),
            b = 0; b < d; b++) {
                var g = c[b].Ba();
                f.H(g)
            }
        }
        return new Y(null,"ts-flx11a",Ri(a.time, ["ts-float-end", "minorinf"]),e,f)
    }
    function PH(a) {
        try {
            var b = OH(a)
              , c = nu(["ts-size-small", "ts-viewmod-onlyimgs"]);
            c.push("ts-actor", "ts-flx00a");
            var d = function() {
                LH.call(this);
                var g = this;
                this.C("action", function() {
                    fu("event/mute", {
                        event_id: a.event_id
                    }, function(h) {
                        h ? (h = Ao(g.s)) && h.update() : g.qa(!0)
                    }, "POST")
                })
            };
            z(d, LH);
            d.Error = Sj;
            d.prototype.J = function() {
                this.s = em("Mute")
            }
            ;
            var e = new d;
            var f = new Y(null,["ts-flxdspl", "ts-event"],new Y(null,c,a.user.Ba()),b,ul("\u00a0", "DIV", "ts-flx00a"),new Y(null,"ts-flx00a",e))
        } catch (g) {
            W("A non processable event!", g),
            f = ul("Error: A non processable event!", "DIV", "errorColor")
        }
        return f
    }
    ;function QH(a, b, c) {
        var d = {
            "class": "minorinf"
        };
        c && (d.title = vi(b));
        return K("H2", null, a, " ", K("SPAN", d, "(" + vi(b, c) + ")"))
    }
    function RH(a, b, c, d, e) {
        a = ae(QH(a, c));
        d = nu(["ts-list-grid", "ts-layout-tiles", "ts-size-small", "ts-list-5xwide"], !0);
        var f = new Y(null,d);
        d = b.length;
        var g = new yp(a);
        g.L(!0);
        g.H(f, !0);
        c > d && g.H(ul(yi(V("This list is limited to %d items."), d), "DIV", {
            style: "margin-top:1em",
            "class": "minorinf"
        }), !0);
        g.la();
        if (d) {
            var h = 0;
            a = [];
            c = function(l) {
                if (!g.W()) {
                    var m = f.aa;
                    l = l.Ba();
                    e && (l.zg = e);
                    f.H(l, m);
                    ++h % 32 || g.la()
                }
            }
            ;
            b = y(b);
            for (d = b.next(); !d.done; d = b.next())
                a.push(c.bind(null, d.value));
            bh(qA(a), function() {
                g.W() || g.la()
            })
        }
        return g
    }
    function SH(a, b) {
        fu("user/following", {
            uname: a
        }, function(c) {
            if (c) {
                var d, e = RH(V("Following"), c.items, c.total_count, $t(a), function(f) {
                    d = !0;
                    var g = f.o();
                    if (g) {
                        var h = new Ym(g,650);
                        Ze(h, "end", function() {
                            var l = Td(g);
                            Qd(g);
                            f.G();
                            ll(l).length ? e.la() : e.G()
                        });
                        h.play()
                    } else
                        b()
                });
                b && e.C("hide", function() {
                    d && b()
                })
            }
        }, {
            lb: !0
        })
    }
    function TH(a) {
        fu("user/followers", {
            uname: a
        }, function(b) {
            b && RH(V("Followers"), b.items, b.total_count, 0)
        }, {
            lb: !0
        })
    }
    ;function UH(a) {
        function b() {
            Y.call(this, "FORM", {
                action: "",
                "class": "ts-flxdspl",
                style: "flex-direction:column;align-items:flex-start"
            })
        }
        var c = (this.pb || {}).ownersUname
          , d = this.u.pid;
        z(b, Y);
        b.Error = Sj;
        b.prototype.J = function() {
            Y.prototype.J.call(this);
            var e = this.s;
            try {
                var f, g = a.vote, h = a.count, l = function(I) {
                    return I ? V("Like") : V("Unlike")
                }, m = function(I) {
                    I = K("SPAN", "ts-inlnflxdspl", cm("thumbs-up", I ? "regular" : "solid", {
                        style: "font-size:150%;margin:0.1em 0"
                    }), "\u00a0", K("SPAN", null, vi(h, !0)));
                    R(I, "align-items", "center");
                    return I
                }, n = m.bind(null, !0), q = m.bind(null, !1);
                if (Zt())
                    if (c && $t(c)) {
                        var p = K("BUTTON", {
                            type: "button"
                        });
                        Md(p, n());
                        var u = l(!0);
                        Gq(p, "It is not allowed to vote for your own puzzles.")
                    } else
                        p = K("BUTTON", {
                            type: "submit",
                            name: "vote",
                            value: g ^ 1
                        }),
                        Nd(p, g ? q() : n()),
                        u = l(!g);
                else
                    p = K("BUTTON", {
                        type: "button"
                    }),
                    Md(p, n()),
                    u = l(!0),
                    Gq(p, Ys);
                p.title = u;
                R(p, "min-width", "5em");
                te(p, ["btn", "ts-smaller", "ts-flx00a"]);
                e.appendChild(p);
                switch (g) {
                case void 0:
                case 0:
                    h && (f = wi("<a>%d person</a> likes this", "<a>%d people</a> like this", h));
                    break;
                case 1:
                    --h,
                    f = h ? wi("You and <a>%d other</a> like this", "You and <a>%d others</a> like this", h) : V("You like this")
                }
                if (f) {
                    var x = ns(yi(f, h));
                    O(x, "ts-desc");
                    Nd(e, x);
                    var B = Ad("A", null, x);
                    if (B) {
                        Yk(B);
                        var E = new gq(function() {
                            return Sh(hu("puzzle/likers", {
                                pid: d
                            }, {
                                lb: !0
                            }).then(function(I) {
                                var G = nu(["ts-list-list", "ts-layout-horizontal", "ts-size-smallest"], !0);
                                G.push("dlgfrm");
                                G.push("rad");
                                G = new Y(null,G);
                                I = I.items;
                                for (var P = 0; P < I.length; P++)
                                    G.H(I[P].Ba());
                                return G
                            }))
                        }
                        );
                        E.ya(B);
                        N(this, E)
                    }
                }
            } catch (I) {}
        }
        ;
        return new b
    }
    function VH(a) {
        for (var b = new Y(null,nu(["ts-list-grid", "ts-size-small", "ts-viewmod-onlyimgs"], !0)), c = 0, d = Math.min(a.length, 12); c < d; c++)
            b.H(a[c].Ba());
        return b
    }
    function WH(a) {
        var b = a.items
          , c = new Y;
        if (b.length) {
            c.H(sl(QH(V("Following"), a.total_count, !0)));
            c.H(VH(b));
            a = 12 < b.length;
            var d, e = this.u.uname;
            $t(e) ? d = a ? V("View / Edit All") : V("Edit") : a && (d = V("View All"));
            if (d) {
                var f = this;
                a = function() {
                    Y.apply(this, arguments)
                }
                ;
                z(a, Y);
                a.Error = Sj;
                a.prototype.J = function() {
                    Y.prototype.J.call(this);
                    var g = this.s;
                    Nd(g, d);
                    this.ka().C(g, "click", function(h) {
                        SH(e, function() {
                            f.update()
                        });
                        h.stopPropagation()
                    })
                }
                ;
                c.H(new a("A",{
                    href: "javascript:void(0)"
                }))
            }
        }
        return c
    }
    function XH(a) {
        var b = a.items
          , c = new Y;
        if (b.length && (c.H(sl(QH(V("Followers"), a.total_count, !0))),
        c.H(VH(b)),
        12 < b.length)) {
            var d = this.u;
            a = function() {
                Y.apply(this, arguments)
            }
            ;
            z(a, Y);
            a.Error = Sj;
            a.prototype.J = function() {
                Y.prototype.J.call(this);
                var e = this.s;
                Nd(e, V("View All"));
                this.ka().C(e, "click", function(f) {
                    TH(d.uname);
                    f.stopPropagation()
                })
            }
            ;
            c.H(new a("A",{
                href: "javascript:void(0)"
            }))
        }
        return c
    }
    function YH(a) {
        function b(f) {
            d.H(PH(f), d.aa)
        }
        var c = a.items
          , d = new Y;
        a = [];
        c = y(c);
        for (var e = c.next(); !e.done; e = c.next())
            a.push(b.bind(null, e.value));
        c = 0;
        for (e = Math.min(20, a.length); c < e; c++)
            a.shift()();
        a && qA(a);
        return Tg(d)
    }
    ;function ZH() {
        C("tibo.jp.addContextMenu", Qs);
        C("tibo.jp.openDialog", Ss);
        C("tibo.ts.net.forwardTo", Al);
        C("tibo.jp.openWindow", Ts);
        C("tibo.jp.showImage", Us);
        C("tibo.jp.a.put", vz);
        C("tibo.jp.api.get", eu);
        C("tibo.jp.api.post", gu);
        C("tibo.jp.api.send", fu);
        C("tibo.jp.c.AlbumPropertiesForm", oH);
        C("tibo.jp.c.PuzzlePropertiesForm", pH);
        C("tibo.jp.c.deleteAlbum", AH);
        C("tibo.jp.c.deletePuzzle", zH);
        C("tibo.jp.c.deleteSavedGame", yH);
        C("tibo.jp.c.EmbedPuzzleUpdateBgColor", qH);
        C("tibo.jp.c.EmbedPuzzleSetColor", rH);
        C("tibo.jp.c.FaqExpandAll", wH);
        C("tibo.jp.c.FaqInit", vH);
        C("tibo.jp.c.getClientInfo", xH);
        C("tibo.jp.c.playSound", EH);
        C("tibo.jp.c.PlayALoaded", FH);
        C("tibo.jp.c.signout", BH);
        C("tibo.jp.c.setBlockedAndRefreshPage", CH);
        C("tibo.jp.c.SearchOnSubmit", DH);
        C("tibo.jp.c.UserMenuThemeSwitch", GH);
        C("tibo.jp.comm.openThreadWith", Lw);
        C("tibo.jp.comm.sUCIPT", Kw);
        C("tibo.jp.create.useFilenameForName", HH);
        C("tibo.jp.dialogs.openMovePuzzle", vy);
        C("tibo.jp.dialogs.openOK", wy);
        C("tibo.jp.dialogs.selectAndSetCover", yy);
        C("tibo.jp.addHotMessage", function(a, b) {
            "string" !== typeof a && (a = jo(a));
            Wt(Ut(), a, b)
        });
        C("tibo.jp.addPageMessage", function(a, b, c) {
            "string" !== typeof a && (a = jo(a));
            Xt(Ut(), a, b, c)
        });
        C("tibo.jp.items.reportAbuse", KH);
        C("tibo.jp.trans.likeButton", UH);
        C("tibo.jp.trans.userFollowing", WH);
        C("tibo.jp.trans.userFollowers", XH);
        C("tibo.jp.trans.eventEvents", YH);
        C("tibo.jp.removeUserMessage", ky);
        C("tibo.jp.showPS", my);
        C("tibo.jp.initPreviewerWindow", sx)
    }
    ;function $H(a, b, c) {
        this.i = a;
        this.h = b;
        this.g = c
    }
    function aI(a) {
        return new $H(a.user,a.game_time,a.position)
    }
    ;function bI(a, b, c) {
        Y.call(this, "TABLE");
        this.dc = a.items;
        var d = 0
          , e = this.dc.length;
        for (a = a.signed; d < e; d++)
            this.dc[d].g = d + 1;
        if (!a && e && Zt())
            for (d = 0; d < e; d++)
                if (this.dc[d].i.ud()) {
                    a = d;
                    break
                }
        this.nj = a;
        this.ui = b;
        this.bf = c;
        cI(this)
    }
    z(bI, Y);
    bI.prototype.D = function() {
        this.K = this.ld = void 0;
        Y.prototype.D.call(this)
    }
    ;
    bI.prototype.J = function() {
        Y.prototype.J.call(this);
        var a = this.s;
        Bd(a, {
            title: V("Top Times")
        });
        O(a, "hiscore")
    }
    ;
    function cI(a, b) {
        a.K && a.K.G();
        a.K = new Y("TBODY");
        var c = a.dc.length;
        a.$e = a.ld = void 0;
        if (c) {
            var d = b ? a.bf - 1 : a.bf
              , e = a.xi = a.dc.slice(0, d);
            var f = a.nj;
            void 0 !== f && (f instanceof $H || Fh(f) && f > d - 1) && ("number" === typeof f && (f = a.dc[f]),
            e.splice(d - 2, d),
            e.push(f),
            d--);
            var g;
            if (1 < e.length || 1 === e.length && b)
                for (f = g = 0,
                c = e.length; f < c; f++)
                    g = Math.max(e[f].h, g);
            a.Ji = g;
            b && (a.$e = dI(e, b));
            for (f = 0; f < d; f++)
                c = e[f],
                b && a.$e === f && (a.K.H(a.ld = eI(a, b, g)),
                b = null),
                c ? (a.K.H(eI(a, c, g)),
                (c = e[f + 1]) && void 0 !== c.g && e[f].g + 1 < c.g && a.K.H(eI(a, K("DIV", {
                    style: "width:1.5ch;text-align:center"
                }, cm("ellipsis-v", "regular"))))) : a.K.H(eI(a, null));
            b && a.K.H(a.ld = eI(a, b, g))
        } else if (b)
            for (a.K.H(a.ld = eI(a, b)),
            f = 0; f < a.bf - 1; f++)
                a.K.H(eI(a, null));
        else
            for (f = 0; f < a.bf; f++)
                a.K.H(eI(a, null));
        a.H(a.K, a.aa)
    }
    bI.prototype.update = function(a, b) {
        b && a && this.ld instanceof fI && (void 0 === this.$e || dI(this.xi, a) === this.$e) ? (b = this.ld,
        b.h && gI(b.h, a.h, this.Ji)) : cI(this, a)
    }
    ;
    function dI(a, b) {
        var c;
        var d = 0;
        for (c = a.length; d < c; d++)
            if (b.h < a[d].h)
                return d;
        return c
    }
    function eI(a, b, c) {
        return b instanceof $H ? new fI(a.ui,b,c) : new Y("TR",null,K("TD", {
            colspan: 4
        }, null === b ? "\u00a0" : b))
    }
    function fI(a, b, c) {
        Y.call(this, "TR");
        var d = void 0 === b.g
          , e = b.i;
        this.H(new Y("TD",null,d ? cm("stopwatch", "regular", {
            style: "font-size:110%;position:relative;left:-2px",
            title: "Just played"
        }) : ul(b.g + ".")));
        this.H(new Y("TD",["ts-user", "ts-layout-horizontal", "ts-size-smallest"],e.Wd() ? new Nx(e) : ul(V("You"))));
        this.H(new Y("TD","time",this.h = hI(b.h, c)));
        b = new Y("TD");
        e.ud() && !d && (d = function() {
            LH.call(this);
            var f = this;
            this.C("action", function() {
                hu("puzzle/removeScore", {
                    pid: a
                }, "POST").then(function() {
                    f.dispatchEvent("change");
                    f.G()
                }, function() {
                    f.qa(!0)
                })
            })
        }
        ,
        z(d, LH),
        d.Error = Sj,
        d.prototype.J = function() {
            this.s = em(V("Remove"))
        }
        ,
        b.H(new d));
        this.H(b)
    }
    z(fI, Y);
    fI.prototype.D = function() {
        this.h = void 0;
        Y.prototype.D.call(this)
    }
    ;
    function hI(a, b) {
        var c = L("DIV");
        b && O(c, "hilightbg");
        gI(c, a, b);
        return c
    }
    function gI(a, b, c) {
        var d = zd("ts-t", a);
        d ? $s(d, b) : (d = Zs(b),
        R(d, {
            margin: "0 .6em"
        }),
        O(d, "ts-t"),
        a.appendChild(d));
        c && (a.style.width = Gf(b <= c ? b / c * 100 + "%" : 0, !0))
    }
    ;function iI(a, b) {
        ro.call(this, {
            method: eu,
            when: vo,
            refresh: 3E5,
            parms: {
                apiMethod: "puzzle/scores",
                showError: !1
            },
            query: {
                pid: a,
                count: b
            },
            transformer: function() {
                return iI.prototype.qb.apply(this, arguments)
            }
        });
        this.N = a;
        this.K = b
    }
    z(iI, ro);
    iI.prototype.qb = function(a) {
        this.h && this.h.G();
        var b = new Y(null,null,this.h = new bI(a,this.N,this.K));
        this.h.C("change", function() {
            this.update()
        }, !1, this);
        ne(this.h, function() {
            this.h = null
        }, this);
        if (a.items.length >= this.K) {
            var c = this.N
              , d = this;
            a = function() {
                Y.apply(this, arguments)
            }
            ;
            z(a, Y);
            a.Error = Sj;
            a.prototype.J = function() {
                Y.prototype.J.call(this);
                var e = this.s;
                Yk(e);
                Md(e, dm("ellipsis-h", "regular"));
                var f = new gq(function() {
                    return Sh(hu("puzzle/scores", {
                        count: 20,
                        pid: c
                    }, {
                        lb: !0
                    }).then(function(g) {
                        function h() {
                            bI.apply(this, arguments)
                        }
                        var l = new Y(null,"dlgfrm rad");
                        z(h, bI);
                        h.Error = Sj;
                        h.prototype.J = function() {
                            bI.prototype.J.call(this);
                            R(this.s, {
                                width: "30vw",
                                "max-width": "40em"
                            })
                        }
                        ;
                        g = new h(g,c,20);
                        g.C("change", function() {
                            Bi(function() {
                                d.W() || d.update()
                            }, 1E3)
                        });
                        l.H(g);
                        return l
                    }))
                }
                );
                f.ya(e);
                N(this, f)
            }
            ;
            a = new a("A",{
                style: "display:block;text-align:center"
            });
            b.H(a)
        }
        return b
    }
    ;
    iI.prototype.D = function() {
        this.h && (this.h.G(),
        this.h = null);
        ro.prototype.D.call(this)
    }
    ;
    function jI() {
        QD.call(this, L("DIV"));
        GD(this, 40, 40);
        var a = this;
        this.i = Bi(function() {
            if (th(a.i)) {
                var b = function() {
                    if (!a.W()) {
                        var c = RD(a), d;
                        if (!c)
                            for (c = 5,
                            a.j = yh(),
                            d = 0; d < c; d++) {
                                var e = a
                                  , f = e.add;
                                var g = 1 - d / c;
                                var h = L("DIV")
                                  , l = lm("50%");
                                l["background-color"] = "#fff";
                                R(h, l);
                                R(h, mm(1, 1, 1, "rgba(0,0,0,.5)"));
                                Qf(h, 8, 8);
                                Tf(h, g);
                                g = new DD(h);
                                f.call(e, g)
                            }
                        e = 2 * Math.PI / 9;
                        d = .00675 * (yh() - a.j);
                        f = d % 9 * e;
                        for (d = 0; d < c; d++,
                        f -= e)
                            SD(a, d).X(16 * Math.cos(f) + 16, 16 * Math.sin(f) + 16);
                        a.g = (0,
                        A.requestAnimationFrame)(b)
                    }
                };
                delete a.i;
                a.g = (0,
                A.requestAnimationFrame)(b)
            }
        }, 1500)
    }
    z(jI, QD);
    jI.prototype.D = function() {
        Ci(this.i);
        th(this.g) && (0,
        A.cancelAnimationFrame)(this.g);
        QD.prototype.D.call(this)
    }
    ;
    function lI(a, b, c, d) {
        c.oncontextmenu = function() {
            return !1
        }
        ;
        R(c, {
            overflow: "hidden"
        });
        O(c, "unselectable");
        O(c, "game");
        ZD.call(this, c);
        this.Ta = new NE;
        this.V = a;
        this.l = null;
        this.za = d;
        mI(this, b);
        b.width && b.height ? GD(this, b.width, b.height) : ND(this);
        wF.push(this);
        this.Ab || (this.Ab = new t.Set);
        this.Ab.add(this);
        var e = this;
        bh(nI(this).then(function() {
            return $g([oI(e), pI(e)])
        }), function() {
            e.l = null
        })
    }
    var qI;
    z(lI, ZD);
    function mI(a, b) {
        a.K || (a.K = {});
        no(a.K, b);
        var c = b.backgroundColor;
        a.j = [c >> 16, c >> 8 & 255, c & 255];
        a.g && (oI(a),
        a = a.g,
        no(a.j, b),
        a.R && (b = UG(a),
        TG(a, !b),
        TG(a, b)))
    }
    function rI(a) {
        if (!(100 < a.$() && 100 < a.Z()))
            return Ug();
        var b = new jI;
        a.add(b);
        b.X(a.$() - b.$() >> 1, a.Z() - b.Z() >> 1);
        a.g && (a.ra(a.g),
        a.g.G(),
        a.g = void 0);
        var c = new CG(a,a.V,a.K,null === a.l ? void 0 : a.l);
        c.L(!1);
        GD(c, a.$(), a.Z());
        a.add(c);
        return a.ga = bh(DG(c).then(function() {
            var d = A.location.hostname.split(".");
            var e = d.length;
            2 <= e ? (d = d[e - 2] + "." + d[e - 1],
            d = d == vA("anBsYW5ldC5jb20=") || d == vA("amlnc2F3cGxhbmV0LmNvbQ==")) : d = !1;
            d && (this.g = c,
            this.ia("gameInited"))
        }, function(d) {
            this.ra(c);
            c.G();
            throw d;
        }, a), function() {
            this.ga = void 0;
            this.ra(b);
            b.G()
        }, a)
    }
    function pI(a) {
        var b = 0, c = a.$(), d = a.Z(), e = function() {
            var g = this.$()
              , h = this.Z();
            if (g !== c || h !== d) {
                if (5 > b) {
                    b++;
                    c = g;
                    d = h;
                    var l;
                    return rI(this).then(function() {
                        return l = e()
                    }).vb(function(m) {
                        m instanceof dh && l && l.cancel();
                        throw m;
                    })
                }
                throw new Vg("The game space is still resized, it is not possible to initialize it.");
            }
        }
        .bind(a), f;
        return a.v = bh(rI(a).then(function() {
            return f = e()
        }).then(function() {
            this.g.L(!0);
            this.g.start()
        }, function(g) {
            if (g instanceof dh)
                throw f && f.cancel(),
                g;
            g instanceof Vg || g instanceof Error && fb(g.message, "Not enough storage is available") && (g = new Vg("Not enough memory to initialize the game."));
            var h = g instanceof Vg ? g.message : g instanceof Error ? "Unknown error (reloading the page might be the solution)" : "" + g;
            Xi(h, g instanceof Error ? g : void 0);
            Wt(Ut(), h, 1);
            if (!(g instanceof Vg))
                throw g;
        }, a), function() {
            this.v = void 0
        }, a)
    }
    function nI(a) {
        var b = L("DIV");
        a.i = new DD(b);
        GD(a.i, a.$(), 1);
        a.i.qa(!1);
        a.add(a.i);
        YD(a, a.i, 2, 0);
        a.K.ai && (b = K("DIV", null, a.V.name),
        sI(b),
        Nd(a.i.o(), b));
        a.u = K("DIV");
        R(a.u, "text-align", "center");
        Nd(a.i.o(), a.u);
        return Tg()
    }
    function sI(a) {
        R(a, mm(0, 1, 5, "rgba(0,0,0,.7)"));
        R(a, {
            padding: ".6em",
            background: "rgba(0,0,0,.4)",
            "text-shadow": "1px 1px 2px rgba(0,0,0,0.5)"
        });
        O(a, "ts-text")
    }
    function tI(a, b) {
        a.u && (sI(b),
        Od(a.u),
        Nd(a.u, b))
    }
    function oI(a) {
        qI || (qI = Vs("/img/play/background.png").vb(function(b) {
            Xi(b);
            return null
        }));
        qI.then(function(b) {
            if (!this.W() && b) {
                var c = b.width
                  , d = this.Z();
                this.j || (this.j = [128, 128, 128]);
                if (!this.ua || !bb(this.ua, this.j) || this.ib != d) {
                    try {
                        var e = TE(this.j, .1)
                          , f = TE(this.j, -.4)
                          , g = this.o()
                          , h = this.j
                          , l = g.style;
                        if (null === e)
                            l.backgroundImage = "",
                            l.backgroundColor = "";
                        else {
                            var m = Xh(e)
                              , n = Xh(f);
                            e = "linear-gradient(top," + m + "," + n + ")";
                            h && (l.backgroundColor = "string" === typeof h ? h : Xh(h));
                            l.backgroundImage = e
                        }
                        var q = Ll(4, 4)
                          , p = q.toDataURL("image/jpeg");
                        if (0 === p.indexOf("data:image/jpeg") || 0 === p.indexOf("data:image/png")) {
                            q = Ll(c, d);
                            var u = Ml(q, {
                                alpha: !1
                            });
                            u.fillStyle = u.createPattern(b, "repeat");
                            u.fillRect(0, 0, c, d);
                            var x = u.getImageData(0, 0, c, d)
                              , B = x.width
                              , E = x.height;
                            b = 0;
                            c = [];
                            h = [c];
                            for (var I; b < E; b++) {
                                var G = -.5 / E * b + .1;
                                for (I = 0; 256 > I; I++)
                                    c[I] = SE(I, G);
                                UE(x, b, B, 1, h)
                            }
                            if (128 !== this.j[0] || 128 !== this.j[1] || 128 !== this.j[2]) {
                                var P = this.j;
                                B = [];
                                E = [];
                                G = [];
                                var S = P[0]
                                  , ia = P[1]
                                  , ra = P[2];
                                for (P = 0; 256 > P; P++)
                                    B[P] = VE(S, P),
                                    E[P] = VE(ia, P),
                                    G[P] = VE(ra, P);
                                UE(x, 0, x.width, x.height, [B, E, G])
                            }
                            u.putImageData(x, 0, 0);
                            R(this.o(), {
                                backgroundImage: "url(" + q.toDataURL("image/jpeg") + ")"
                            });
                            q.width = q.height = 1
                        }
                    } catch (sa) {}
                    this.ua = this.j;
                    this.ib = d
                }
            }
        }, null, a);
        return Tg()
    }
    k = lI.prototype;
    k.D = function() {
        this.v && this.v.cancel();
        this.ga && this.ga.cancel();
        this.T && this.T.cancel();
        this.ha && gf(this.ha);
        this.F && this.F.G();
        this.F = this.i = this.u = void 0;
        ZD.prototype.D.call(this)
    }
    ;
    k.ia = function(a, b) {
        switch (a) {
        case "6":
            this.i && !this.F && (this.F = new Ym(this.i.o(),2E3),
            Ze(this.F, "end", function() {
                this.W() || (this.ra(this.i),
                this.i.G(),
                this.F = this.i = this.u = void 0)
            }, !1, this),
            this.F.play());
            this.V.rotation && !this.ha && (this.ha = Q(new PD(this.o(),mi), "mousewheel", Je, mi));
            break;
        case "setBPMsg":
            tI(this, b);
            break;
        case "scatter":
            uI(this)
        }
        this.za(a, b)
    }
    ;
    k.qd = function() {
        return this.Ta
    }
    ;
    k.ih = function() {}
    ;
    k.jh = function() {
        Zi("gm rszd");
        this.i && GD(this.i, this.$(), 1);
        this.T && this.T.cancel();
        var a;
        this.T = bh(Di(500).then(function() {
            if (!this.W() && (oI(this),
            !this.v)) {
                if (this.g instanceof CG) {
                    var b = this.g;
                    GG(b);
                    HG(b) ? this.l = OG(b) : b.dc && (this.l = !1)
                }
                return a = pI(this)
            }
        }, null, this).vb(function(b) {
            b instanceof dh && a && a.cancel();
            throw b;
        }, this), function() {}, this)
    }
    ;
    function uI(a) {
        a.v || (a.l = !1,
        pI(a))
    }
    function vI(a, b, c) {
        Zi("Event " + mo(b));
        var d = null;
        switch (b) {
        case wI:
            a.j = Vh(c);
            oI(a);
            break;
        case xI:
            a.qa(!1);
            var e = void 0 === c ? !0 : c;
            a.g instanceof CG ? (GG(a.g),
            d = new Lg(function(f) {
                this.g instanceof CG ? MG(this.g, f, e) : f(!0)
            }
            ,a)) : a.l && (a.v && a.v.cancel(),
            a.K.xc && (d = new Lg(function(f) {
                NG(this.l, this.V.pid, f, this.K.fe, e)
            }
            ,a)));
            d || (d = Tg());
            bh(d, function() {
                this.g && (this.ra(this.g),
                this.g.G(),
                this.g = void 0)
            }, a);
            break;
        case yI:
            a.g instanceof CG && MG(a.g);
            break;
        case zI:
            a.g instanceof CG && TG(a.g, !UG(a.g));
            break;
        case AI:
            a.g instanceof CG && VG(a.g, !WG(a.g));
            break;
        case BI:
            a.g instanceof CG && uI(a);
            break;
        case CI:
            a.g instanceof CG && (d = HG(a.g));
            break;
        case DI:
            a.g instanceof CG && (d = KG(a.g) ? EI : HG(a.g) ? JG(a.g) ? FI : GI : HI);
            break;
        case II:
            a.g instanceof CG && LG(a.g);
            break;
        case JI:
            if (a.g instanceof CG)
                return {
                    cutting: a.g.R.l,
                    rotation: a.g.R.g
                };
            break;
        case KI:
            a.g instanceof CG && RG(a.g);
            break;
        case LI:
            a.g instanceof CG && SG(a.g)
        }
        return d
    }
    var HI = 0
      , FI = 1
      , GI = 2
      , EI = 3
      , wI = "background"
      , xI = "exitGame"
      , yI = "saveGame"
      , CI = "getGameTime"
      , DI = "getGameStatus"
      , AI = "image"
      , zI = "ghost"
      , BI = "scatter"
      , II = "togglePause"
      , JI = "getGameProperties"
      , KI = "arrange"
      , LI = "disarrange"
      , MI = {
        Xj: wI,
        bk: xI,
        uk: yI,
        fk: CI,
        ek: DI,
        ik: AI,
        gk: zI,
        vk: BI,
        zk: II,
        dk: JI,
        Wj: KI,
        $j: LI
    }
      , wF = []
      , Wg = "Game space is too small.\nSolution: resize the browser window (and reload the page if needed).";
    function NI() {
        Y.call(this, null, "control");
        this.m = [];
        var a = function() {
            for (var d = new os, e = y(OI), f = e.next(); !f.done; f = e.next()) {
                f = f.value;
                var g = K("SPAN", {
                    style: "font-family:monospace;forced-color-adjust:none;background-color:#" + f
                }, md("\u00a0", 8));
                d.H(new uq(g,null,null,this.h.bind(this, wI, "#" + f)))
            }
            return Tg(d)
        }
        .bind(this)
          , b = new os;
        var c = new uq(V("Restart"),null,null,this.h.bind(this, BI));
        c.i = BD();
        b.H(c);
        b.H(new uq(V("Background"),a));
        b.H(new uq(V("Settings"),null,null,this.h.bind(this, PI)));
        b.H(new uq(V("Help"),null,null,this.h.bind(this, QI)));
        a = new os;
        a.H(new uq(V("Arrange"),null,null,this.h.bind(this, KI)));
        a.H(new uq(V("Disarrange"),null,null,this.h.bind(this, LI)));
        this.H(RI(V("Image"), SI, this.h.bind(this, AI)));
        this.H(RI(V("Ghost"), TI, this.h.bind(this, zI)));
        this.H(RI(V("Arrange"), UI, void 0, a));
        this.H(RI("", cm("ellipsis-v"), void 0, b));
        this.H(new Y(null,"info",new Y(null,"ts-no-active",this.u = L("SPAN")),sl(K("DIV", "ts-no-active", "|")),this.v = RI(L("DIV"), void 0, this.h.bind(this, II))))
    }
    var VI;
    z(NI, Y);
    NI.prototype.D = function() {
        this.u = this.j = this.i = void 0;
        delete this.m;
        Y.prototype.D.call(this)
    }
    ;
    NI.prototype.h = function(a, b) {
        this.dispatchEvent(new WI(a,b))
    }
    ;
    function XI(a, b) {
        Bd(a.u, {
            title: yi(V("%s%% complete"), "" + b)
        });
        Vd(a.u, b + "%")
    }
    function RI(a, b, c, d) {
        function e() {
            Y.call(this, null, "button ts-hoveraltop")
        }
        z(e, Y);
        e.Error = Sj;
        e.prototype.J = function() {
            Y.prototype.J.call(this);
            var f = this.s;
            void 0 === c && R(f, "cursor", "default");
            if ("string" === typeof a) {
                if (a.length && Bd(f, {
                    title: a
                }),
                void 0 !== b) {
                    var g = "string" === typeof b ? jy("svg", {
                        "class": "ico",
                        viewBox: "0 0 24 24"
                    }, jy("path", {
                        d: YI[b]
                    })) : b;
                    f.appendChild(g)
                }
            } else
                f.appendChild(a);
            d ? (g = new gq(d),
            mq(g, 8),
            g.K = 9,
            g.ya(f)) : O(f, "ts-curhov")
        }
        ;
        e.prototype.O = function() {
            Y.prototype.O.call(this);
            if (c) {
                var f = this.s;
                this.ka().C(f, "click", c).C(f, "mouseenter", function() {
                    bq()
                })
            }
        }
        ;
        return new e
    }
    var UI = "arrange"
      , TI = "ghost"
      , SI = "image"
      , YI = {
        arrange: "M1.8,1h3.4C5.642,1,6,1.358,6,1.8v3.4C6,5.642,5.642,6,5.2,6H1.8C1.358,6,1,5.642,1,5.2V1.8C1,1.358,1.358,1,1.8,1z M9.799,1h3.4C13.641,1,14,1.358,14,1.8v3.4C14,5.642,13.641,6,13.199,6h-3.4C9.358,6,9,5.642,9,5.2V1.8C9,1.358,9.358,1,9.799,1z M17.799,1h3.4C21.641,1,22,1.358,22,1.8v3.4C22,5.642,21.641,6,21.199,6h-3.4C17.357,6,17,5.642,17,5.2V1.8C17,1.358,17.357,1,17.799,1z M1.8,9h3.4C5.642,9,6,9.358,6,9.8v3.4C6,13.642,5.642,14,5.2,14H1.8C1.358,14,1,13.642,1,13.2V9.8C1,9.358,1.358,9,1.8,9z M17.799,9h3.4C21.641,9,22,9.358,22,9.8v3.4c0,0.441-0.359,0.8-0.801,0.8h-3.4C17.357,14,17,13.642,17,13.2V9.8C17,9.358,17.357,9,17.799,9z M1.8,17h3.4C5.642,17,6,17.358,6,17.8v3.4C6,21.642,5.642,22,5.2,22H1.8C1.358,22,1,21.642,1,21.2v-3.4C1,17.358,1.358,17,1.8,17z M9.799,17h3.4C13.641,17,14,17.358,14,17.8v3.4c0,0.441-0.359,0.8-0.801,0.8h-3.4C9.358,22,9,21.642,9,21.2v-3.4C9,17.358,9.358,17,9.799,17z M17.799,17h3.4C21.641,17,22,17.358,22,17.8v3.4c0,0.441-0.359,0.8-0.801,0.8h-3.4C17.357,22,17,21.642,17,21.2v-3.4C17,17.358,17.357,17,17.799,17z",
        exit: "M22.783,18.129L16.654,12l6.129-6.127c0.287-0.289,0.287-0.757,0-1.045l-3.609-3.611C19.033,1.076,18.848,1,18.65,1s-0.383,0.076-0.523,0.216L12,7.344L5.873,1.217c-0.141-0.14-0.325-0.216-0.523-0.216c-0.197,0-0.382,0.076-0.522,0.216l-3.61,3.61C1.076,4.967,1,5.152,1,5.349c0,0.198,0.076,0.383,0.217,0.523L7.345,12l-6.128,6.129C1.076,18.268,1,18.453,1,18.652c0,0.195,0.076,0.383,0.217,0.521l3.61,3.609C4.967,22.924,5.152,23,5.349,23c0.198,0,0.382-0.076,0.523-0.217L12,16.652l6.128,6.131C18.268,22.924,18.453,23,18.65,23s0.383-0.076,0.523-0.217l3.609-3.609C22.924,19.035,23,18.848,23,18.652C23,18.453,22.924,18.268,22.783,18.129z",
        expand: "M19.5,1h-15C2.025,1,0,3.025,0,5.5v12C0,19.976,2.025,22,4.5,22h15c2.476,0,4.5-2.024,4.5-4.5v-12C24,3.025,21.976,1,19.5,1z M13.5,17.5c0,0.824-0.676,1.5-1.5,1.5H4.5C3.675,19,3,18.324,3,17.5V13c0-0.824,0.675-1.5,1.5-1.5H12c0.824,0,1.5,0.676,1.5,1.5V17.5z M21,11.107c0,0.122-0.056,0.277-0.123,0.344s-0.176,0.067-0.243,0c-0.067-0.067-0.296-0.774-0.509-1.571l-0.24-0.901c-0.212-0.796-0.44-1.504-0.506-1.571c-0.068-0.067-0.178-0.067-0.245,0l-3.847,3.847c-0.135,0.135-0.354,0.135-0.489,0l-0.526-0.526c-0.156-0.155-0.393-0.393-0.527-0.527c-0.135-0.134-0.135-0.354,0-0.488c0.134-0.135,0.723-0.722,1.306-1.305l1.359-1.36c0.583-0.583,1.116-1.115,1.183-1.183s0.066-0.177,0-0.245c-0.066-0.067-0.775-0.295-1.572-0.508L15.12,4.875c-0.797-0.212-1.506-0.441-1.573-0.508c-0.066-0.067-0.066-0.176,0-0.244C13.614,4.055,13.758,4,13.863,4h6.858C20.874,4,21,4.125,21,4.278V11.107z",
        ghost: "M21.762,9.878C18.41,5.172,16.275-0.277,13.346,0.01C6.055,0.723,5.844,4.785,2.442,9.878c-1.972,2.952,3.036,5.594,7.342,7.999c3.726,2.078,3.847,4.299,3.44,6.123c2.971-1.537,2.816-4.473,4.75-5.996C19.791,16.576,23.396,12.175,21.762,9.878z M6.928,8.095C7.163,6.286,8.523,4.787,9.875,4.84c0.951,0.037,1.078,1.601,0.889,3.357c-0.23,2.13-1.412,3.197-2.253,3.201C6.841,11.404,6.683,9.973,6.928,8.095z M13.143,16.109c-2.275-0.027-3.983-1.676-3.983-1.676s1.44-0.162,4.466-0.545c2.07-0.26,4.395-1.665,4.395-1.665S15.762,16.141,13.143,16.109zM15.084,10.743c-0.811-0.036-2.829-1.13-2.404-2.881c0.435-1.8-0.575-3.732,1.224-3.56c1.105,0.106,3.939,2.707,4.191,4.51C18.246,9.869,16.752,10.816,15.084,10.743z",
        image: "M23.25,1H0.75C0.337,1,0,1.337,0,1.75v20.575c0,0.413,0.337,0.75,0.75,0.75h22.5c0.413,0,0.75-0.337,0.75-0.75V1.75C24,1.337,23.663,1,23.25,1z M21,20c0-3-4.5-8.5-6-8.5S10.5,19,10.5,19s-3-3-4.5-3s-3,4-3,4V4h18V20z M7.209,10.918c1.479,0,2.678-1.199,2.678-2.678S8.688,5.563,7.209,5.563c-1.479,0-2.678,1.199-2.678,2.678S5.73,10.918,7.209,10.918z",
        jp: "M3.75,1h16.5C21.77,1,23,2.231,23,3.75v16.5c0,1.52-1.23,2.75-2.75,2.75H3.75C2.231,23,1,21.77,1,20.25V3.75C1,2.231,2.231,1,3.75,1z M5.215,20.686c0,0,3.545,0.464,4.779,0.266c0.574-0.094,0.837-1.086,0.306-1.551c-0.489-0.428-0.592-2.713,1.961-2.449c1.997,0.205,1.666,1.95,1.157,2.268c-0.491,0.305-0.467,1.256,0.549,1.526c1.392,0.372,5.062,0.063,5.062,0.063s0.32-3.691,0.12-4.926c-0.093-0.574-1.083-0.836-1.548-0.307c-0.428,0.49-2.714,0.594-2.452-1.961c0.207-1.998,1.951-1.664,2.269-1.154c0.304,0.488,1.257,0.465,1.528-0.551c0.371-1.391-0.4-4.169-0.4-4.169s-3.421,0.557-4.529,0.371c-1.187-0.199-0.472-1.559-0.244-1.73C15.238,5.282,14.437,3,11.975,3C8.388,3,8.998,6.257,9.86,6.565c0.947,0.338,0.704,1.459,0.122,1.582C8.621,8.434,4.908,7.971,4.908,7.971s-0.184,3.004-0.053,4.026c0.076,0.586,0.8,0.861,1.276,0.227c0.733-0.978,2.762-0.339,2.864,1.577c0.107,2.016-2.039,2.326-2.498,1.54c-0.427-0.733-1.649-0.917-1.702,0.02C4.713,16.818,5.215,20.686,5.215,20.686z",
        shrink: "M19.5,1h-15C2.025,1,0,3.025,0,5.5v12C0,19.976,2.025,22,4.5,22h15c2.476,0,4.5-2.024,4.5-4.5v-12C24,3.025,21.976,1,19.5,1z M13.5,17.5c0,0.824-0.676,1.5-1.5,1.5H4.5C3.675,19,3,18.324,3,17.5V13c0-0.824,0.675-1.5,1.5-1.5H12c0.824,0,1.5,0.676,1.5,1.5V17.5z M14.003,3.88c0-0.122,0.056-0.277,0.123-0.344c0.067-0.068,0.176-0.068,0.243,0c0.068,0.066,0.296,0.774,0.508,1.571l0.24,0.901c0.213,0.797,0.441,1.504,0.508,1.571c0.066,0.068,0.177,0.068,0.244,0l3.847-3.846c0.135-0.135,0.354-0.135,0.489,0l0.525,0.525c0.157,0.155,0.393,0.393,0.527,0.527c0.135,0.134,0.135,0.354,0,0.488c-0.133,0.134-0.722,0.722-1.305,1.305l-1.359,1.36c-0.582,0.583-1.116,1.115-1.182,1.183c-0.068,0.067-0.068,0.177,0,0.244c0.065,0.067,0.775,0.295,1.571,0.508l0.899,0.239c0.797,0.212,1.506,0.441,1.573,0.509c0.067,0.066,0.067,0.176,0,0.244s-0.211,0.122-0.316,0.122h-6.858c-0.152,0-0.278-0.125-0.278-0.278V3.88z"
    }
      , OI = "D3D3D3 808080 90EE90 20B2AA E0FFFF 4682B4 FFEBCD CD853F".split(" ")
      , QI = "k"
      , PI = "o"
      , ZI = {
        hk: QI,
        xk: "l",
        ck: "m",
        ak: "n",
        wk: PI,
        tk: "p"
    };
    function WI(a, b) {
        He.call(this, a);
        this.h = b
    }
    z(WI, He);
    function $I(a, b) {
        Y.call(this);
        this.j = this.h = null;
        this.T = !1;
        aJ(this, b);
        bJ.add(this);
        this.F = {};
        this.F.image = {
            url: a.puzzleImage,
            Dk: new J(a.puzzleImageW,a.puzzleImageH)
        };
        this.F.Ga = oA(a.puzzleNx, a.puzzleNy, a.puzzleCurve);
        this.F.rotation = !!a.puzzleRotation;
        this.F.name = a.puzzleName;
        this.F.pid = a.puzzleId;
        !Kl() || -1 < A.navigator.userAgent.indexOf("Opera Mini") ? (a = this.H,
        b = K("DIV", null, K("DIV", null, K("DIV", null, cm("exclamation-triangle")), K("DIV", null, K("DIV", "title", "Your browser is not supported, please use a better browser."), K("DIV", null, void 0)))),
        a.call(this, new Y(null,"ts-gmspc-err",b))) : (this.H(cJ(this)),
        this.H(this.m = new NI))
    }
    var dJ;
    z($I, Y);
    function cJ(a) {
        function b() {
            Y.apply(this, arguments)
        }
        z(b, Y);
        b.Error = Sj;
        b.prototype.O = function() {
            function c() {
                Ig(function() {
                    if (!this.W()) {
                        eJ(this, zD() || AD());
                        fJ(this);
                        this.i = new lI(this.F,this.K,d,this.si.bind(this));
                        for (var f in MI)
                            this.m.C(MI[f], this.kh, !1, this);
                        for (var g in ZI)
                            this.m.C(ZI[g], this.kh, !1, this)
                    }
                }, a)
            }
            Y.prototype.O.call(this);
            gJ(a);
            XI(a.m, 0);
            dJ || (dJ = new U,
            dJ.C(A, ["beforeunload", "unload", "pagehide"], function(f) {
                if ("pagehide" !== f.type || f.ja.persisted)
                    hJ(),
                    dJ.G(),
                    dJ = void 0
            }),
            Bz.push(function(f) {
                bh(hJ(!1), function() {
                    f(!0)
                })
            }));
            var d = this.s;
            if (0 === al().width) {
                Xi("Zero viewport size.");
                var e = new U;
                N(this, e);
                e.C(A, "resize", function() {
                    var f = al();
                    f.width && f.height && (e.G(),
                    c())
                })
            } else
                c()
        }
        ;
        return new b
    }
    k = $I.prototype;
    k.kh = function(a) {
        var b = a.type;
        switch (b) {
        case QI:
            ax().L(!0);
            break;
        case PI:
            this.N && this.N.cancel();
            this.N = iJ(this);
            break;
        case "m":
            "iframe" === xD() ? !Hk() || ng || Ab() ? jJ(!0) : kJ(this, !0) : kJ(this, this.K.Bh && Hk() && !ng && !Ab());
            break;
        case "n":
        case "l":
            "maximized" === xD() ? jJ(!1) : lJ(this);
            break;
        case "p":
            bh(hJ(!1), function() {
                var c = ct(!1, !0);
                c = Ws("play", c);
                if ("iframe" === xD()) {
                    if (!Ah(c, "_parent")) {
                        var d = new yp;
                        d.H(sl(K("DIV", null, "Your browser or the author of this website does not allow you to move to ", K("A", {
                            href: c,
                            target: "_parent"
                        }, c), ". Open the link in a new tab or press OK to stay.")));
                        sp(d, gp(new hp, Fp(), !0));
                        d.L(!0);
                        N(this, d);
                        ne(d, function() {
                            wl()
                        })
                    }
                } else
                    Al(c)
            }, this);
            break;
        case II:
            if (mJ(this, DI, a.h) === EI) {
                Ip(BD()).then(function(c) {
                    c && mJ(this, BI)
                }
                .bind(this));
                break
            }
        default:
            try {
                mJ(this, b, a.h)
            } catch (c) {
                W("apphnd", c)
            }
        }
    }
    ;
    k.J = function() {
        Y.prototype.J.call(this)
    }
    ;
    k.Ha = function(a) {
        O(a, "unselectable");
        li(a);
        Y.prototype.Ha.call(this, a)
    }
    ;
    function aJ(a, b) {
        a.K || (a.K = {});
        no(a.K, b);
        a.i && mI(a.i, b)
    }
    function mJ(a, b, c) {
        if (!a.i)
            throw Error("app is not inited");
        return vI(a.i, b, c)
    }
    k.si = function(a, b) {
        switch (a) {
        case "gameInited":
            this.dispatchEvent(new nJ(oJ,this));
            break;
        case "gameStarted":
            pJ(this, b);
            break;
        case "gamePaused":
            qJ(this, Math.floor(b));
            break;
        case "gameCompleted":
            b = Math.floor(b);
            rJ(this, b);
            var c;
            AD() && (c = sJ()) && (c = c.replace(/__TIME__/g, b + ""),
            Bi(function() {
                dd(c)
            }, 3E3));
            break;
        case "setTimeInfo":
            Array.isArray(b) ? (a = b[0],
            b = b[1]) : b = a = b;
            gJ(this, a, b);
            break;
        case "progressChanged":
            XI(this.m, Math.floor(b));
            break;
        case "playSound":
            this.K.Oh && zz.Ra().play(b.url, b.yf);
            break;
        case "showHelp":
            ax().L(!0);
            break;
        case "6":
            zz.Ra()
        }
    }
    ;
    function pJ(a, b) {
        null !== a.h && Nh(a.h);
        a.h = Lh(function() {
            var d = BG(b);
            gJ(this, d, d)
        }
        .bind(a), 1E3);
        var c = BG(b);
        gJ(a, c, c)
    }
    function qJ(a, b) {
        null !== a.h && (Nh(a.h),
        a.h = null);
        gJ(a, b, b)
    }
    function rJ(a, b) {
        null !== a.h && (Nh(a.h),
        a.h = null);
        gJ(a, b);
        Zt() && (b = new nJ(tJ,a),
        b.h = !1,
        a.dispatchEvent(b))
    }
    k.D = function() {
        uJ(this, !0);
        bJ.delete(this);
        this.N && this.N.cancel();
        delete this.u;
        this.j && delete this.j;
        this.v && (gf(this.v),
        delete this.v);
        this.i && (this.i.G(),
        delete this.i);
        Y.prototype.D.call(this)
    }
    ;
    function gJ(a, b, c) {
        if (void 0 === b) {
            var d = a.m;
            b = d.v.s;
            Od(b);
            d.j = d.i = void 0;
            Vd(b, "--:--")
        } else {
            d = a.m;
            var e = !!a.h;
            if (d.j)
                $s(d.j, b);
            else {
                var f = d.v.s;
                Od(f);
                d.j = Zs(b);
                f.appendChild(d.j)
            }
            b = e ? "pause" : "play";
            VI = VI || {};
            VI[b] || (e = VI[b] = cm("play" === b ? "play" : "pause"),
            Bd(e, {
                style: "font-size:80%;position:relative;top:2px",
                title: "play" === b ? V("Play") : V("Pause")
            }));
            b = VI[b];
            b !== d.i && (d.i && Qd(d.i),
            d.v.s.appendChild(b),
            d.i = b)
        }
        d = new nJ(tJ,a);
        d.h = c;
        a.dispatchEvent(d)
    }
    function iJ(a) {
        var b = Ws("settingsform"), c, d;
        return zl(b).then(function(e) {
            return new Lg(function(f, g) {
                var h = gp(gp(new hp, Fp(), !0), Gp(), !1, !0);
                c = new yp(V("Settings") + " > " + V("Game"));
                c.H(e);
                var l = e.o();
                l || (e.J(),
                l = e.o());
                Jo(l) && gp(h, {
                    key: "def_vals",
                    caption: V("Default Values")
                }, !1, !1);
                sp(c, h);
                c.C(tp, function(m) {
                    if ("ok" === m.key) {
                        m = {};
                        var n = {}
                          , q = fm(l)
                          , p = v(q, "keys").call(q);
                        p = y(p);
                        for (var u = p.next(); !u.done; u = p.next()) {
                            u = u.value;
                            var x = m[u] = q.get(u)[0];
                            fb(u, "gm") && (n[u] = x)
                        }
                        "gmBackgroundColor"in n && (n.gmBackgroundColor = parseInt(n.gmBackgroundColor.substring(1), 16));
                        Ra(wd("INPUT", null, l), function(B) {
                            "checkbox" == B.type && (B = B.name,
                            0 === B.indexOf("gm") && (n[B] = !!n[B]))
                        });
                        aJ(a, wD(n));
                        d = tj(b, function() {
                            Dj(this) ? (Wt(Ut(), V("Your settings have been changed.")),
                            f()) : g("Saving/loading of game settings to/from a server failed (maybe temporarily Internet connection dropout, try it again).")
                        }, "POST", Tk(m))
                    } else
                        "def_vals" === m.key ? (Io(l),
                        m.preventDefault()) : m.key === np && f()
                });
                c.L(!0)
            }
            )
        }).then(function() {
            c && c.G()
        }, function(e) {
            d && d.G();
            c && c.G();
            e instanceof dh || Wt(Ut(), "Saving/loading of game settings to/from a server failed (maybe temporarily Internet connection dropout, try it again).", 1)
        })
    }
    function uJ(a, b) {
        if (b) {
            if (a.j) {
                var c = y(a.j);
                for (b = c.next(); !b.done; b = c.next())
                    T(b.value, !0)
            }
            a.j = null;
            yz(!0)
        } else
            for (yz(!1),
            a.j = [],
            (b = ud("ts-page")) && a.j.push(b),
            (b = ud("ts-pg-msc")) && a.j.push(b),
            a = y(a.j),
            b = a.next(); !b.done; b = a.next())
                T(b.value, !1)
    }
    function eJ(a, b) {
        var c = a.s;
        if (b) {
            var d = document.body;
            d !== Td(c) && (a.u = L("DIV"),
            T(a.u, !1),
            Pd(a.u, c),
            d.appendChild(c))
        } else
            a.u && (Rd(c, a.u),
            delete a.u);
        we(c, "ts-enlarged", b);
        uJ(a, !b);
        b ? Ab() || R(document.documentElement, {
            overflow: "hidden"
        }) : Ab() || tm(document.documentElement, "overflow");
        a.i && (b = Rf(Td(a.i.o())),
        GD(a.i, b.width, b.height))
    }
    function fJ(a) {
        var b = []
          , c = xD();
        "iframe" === c || "maximized" === c ? (b.push("p"),
        "iframe" === c ? b.push(a.T ? "l" : "m") : b.push("iframe" === yD() ? "l" : "n")) : b.push(a.T ? "l" : "m");
        a = a.m;
        c = y(a.m);
        for (var d = c.next(); !d.done; d = c.next())
            d = d.value,
            a.Ib(d),
            d.G();
        c = [];
        b = y(b);
        for (d = b.next(); !d.done; d = b.next()) {
            var e = void 0;
            switch (d.value) {
            case "p":
                e = RI(yi(V("Play on %s"), "Jigsaw Planet"), "jp", a.h.bind(a, "p"));
                break;
            case "l":
                e = RI(V("Shrink"), "shrink", a.h.bind(a, "l"));
                break;
            case "m":
                e = RI(V("Maximize"), "expand", a.h.bind(a, "m"));
                break;
            case "n":
                e = RI(V("Exit"), "exit", a.h.bind(a, "n"))
            }
            c.push(e)
        }
        a.m = c;
        rl(a, a.m, a.aa)
    }
    function kJ(a, b) {
        a.T = !0;
        zD() || AD() || eJ(a, !0);
        fJ(a);
        b && (Ik(),
        a.v = Q(document, Fk, function() {
            Jk() || lJ(this)
        }, !1, a))
    }
    function lJ(a) {
        a.T = !1;
        zD() || AD() || eJ(a, !1);
        fJ(a);
        a.v && (gf(a.v),
        a.v = null);
        Jk() && (a = rd().g,
        a.exitFullscreen ? a.exitFullscreen() : a.webkitCancelFullScreen ? a.webkitCancelFullScreen() : a.mozCancelFullScreen ? a.mozCancelFullScreen() : a.msExitFullscreen && a.msExitFullscreen())
    }
    function jJ(a) {
        bh(hJ(!1), a ? function() {
            var b = ct(!1, !0);
            b.view = "maximized";
            b.pview = "iframe";
            Ah(Ws("play", b), "_parent")
        }
        : function() {
            var b = A.history;
            b && 1 < b.length ? b.back() : Al(A.location.protocol + "//" + A.location.hostname)
        }
        )
    }
    function hJ(a) {
        for (var b = [], c = y(bJ), d = c.next(); !d.done; d = c.next()) {
            var e = b
              , f = e.push
              , g = void 0;
            d = d.value;
            var h = a;
            null !== d.h && (Nh(d.h),
            d.h = null);
            if (d.i)
                try {
                    g = mJ(d, xI, h)
                } catch (l) {
                    W("jsgeg", l),
                    g = Tg()
                }
            else
                g = Tg();
            f.call(e, g)
        }
        bJ.clear();
        return $g(b)
    }
    function sJ() {
        var a = "DSPJ".replace(/./g, function(b) {
            return String.fromCharCode(b.charCodeAt(0) + 34)
        });
        (a = sh(a)) && (a = Sk(a)) && "http" !== a.substring(0, 4).toLowerCase() && (a = "http://" + a);
        return a
    }
    var bJ = new t.Set
      , tJ = "q"
      , oJ = "r";
    function nJ(a, b) {
        He.call(this, a, b)
    }
    z(nJ, He);
    /*
 isNaN(shape) && */
    var vJ;
    function wJ(a, b, c) {
        return new t.Promise(function(d, e) {
            if (vJ)
                vJ = !0,
                e("Only one instance per a page");
            else {
                e = ud(a);
                Od(e);
                var f = {
                    fe: !0,
                    xc: !0,
                    kg: !0,
                    ai: !1,
                    Oh: !0,
                    Bh: !1,
                    $h: !1,
                    Yh: !1,
                    qh: 35,
                    Ff: 4,
                    Zh: !1,
                    backgroundColor: 8421504
                };
                no(f, wD(c));
                if (zD()) {
                    var g = sh("bgcolor");
                    "string" === typeof g && (g = qd(g),
                    isNaN(g) ? Xi("'" + g + "' is not an integer in dec or hex ('0xff00ff') form.") : f.backgroundColor = g)
                }
                if (zD() || AD())
                    f.ai = !0;
                g = Mc(b);
                var h = parseInt(sh("pieces"), 10);
                if (h) {
                    for (var l, m = hA(g.puzzleImageW, g.puzzleImageH), n = 1E6, q = 0, p = m.length; q < p; q++) {
                        var u = m[q]
                          , x = Math.abs(id(u) - h);
                        if (x < n)
                            l = u,
                            n = x;
                        else if (x >= n)
                            break
                    }
                    l && (g.puzzleNx = l.width,
                    g.puzzleNy = l.height)
                }
                l = parseInt(sh("rotation"), 10);
                0 <= l && 1 >= l && (g.puzzleRotation = !!l);
                l = parseInt(sh("shape"), 10);
                0 <= l && l < mA && (g.puzzleCurve = l);
                l = parseInt(sh("savegame"), 10);
                0 <= l && 1 >= l && (f.xc = !!l);
                l = xD();
                if ("iframe" === l || "maximized" === l && "iframe" === yD())
                    f.kg = !1;
                f = new $I(g,f);
                f.ya(e);
                d({
                    instance: f,
                    Nh: b
                })
            }
        }
        )
    }
    function xJ(a) {
        if (!this.W())
            try {
                var b = a.h;
                if ("number" === typeof b) {
                    var c = new $H(Ut(),b);
                    this.h && this.h.update(c, !0)
                } else
                    void 0 === b ? this.h && this.h.update() : !1 === b && this.update()
            } catch (d) {}
    }
    function yJ(a, b) {
        return (a = rD(a, b)) ? bx(a) : null
    }
    function zJ(a, b, c, d, e) {
        var f = ct(!0);
        f = Ws("play", f);
        a = qD(a, b, c, d, e, f, !0);
        return bx(a)
    }
    function AJ(a) {
        try {
            var b = a.instance, c;
            b && b.C(oJ, function(d) {
                var e = mJ(d.target, JI)
                  , f = e.cutting;
                if (d = ud("ts-puzzlecut")) {
                    Od(d);
                    var g = pD(f, e.rotation);
                    d.appendChild(g)
                }
                if (d = ud("ts-toptimes"))
                    g = a.Nh,
                    e = e.rotation,
                    f.Ec(oA(g.puzzleNx, g.puzzleNy, g.puzzleCurve, f.j)) && g.puzzleRotation == e ? c || (Od(d),
                    c = new iI(a.Nh.puzzleId,3),
                    c.La(d),
                    b.C(tJ, xJ, !1, c)) : (c && (c.G(),
                    c = null,
                    b.ma(tJ, xJ, !1, c)),
                    Od(d),
                    f = K("DIV", {
                        "class": "minorinf",
                        style: "text-align:center;max-width:200px;margin:1em auto"
                    }, V("Top times are not available for custom cuts")),
                    d.appendChild(f))
            })
        } catch (d) {
            W("ugp", d)
        }
    }
    ;var BJ;
    function CJ() {
        if (void 0 === BJ) {
            var a = !0;
            try {
                (r = t.Promise.resolve(),
                v(r, "finally")).call(r, ec)
            } catch (c) {
                a = !1,
                Xi("Promise.prototype.finally is not supported")
            }
            if (a = a && Kl() && !!A.requestAnimationFrame && Th()) {
                var b;
                a = (b = A.CSS) && b.supports && b.supports("width", "var(--items-size)") && b.supports("display", "grid")
            }
            BJ = a && Nl()
        }
        return BJ
    }
    function DJ() {
        var a, b;
        if ((a = ud("topBar")) && (b = zd("ts-srch-inpt", a))) {
            var c, d = bl(".ts-srch button", a);
            Q(b, "focus", function() {
                O(a, "ts-srch-open")
            });
            Q(b, "blur", function() {
                c ? (b.focus(),
                c = !1) : ue(a, "ts-srch-open")
            });
            Q(b, "keydown", function(e) {
                27 == e.keyCode && b.blur()
            });
            Q(d, "mousedown", function() {
                c = !0
            })
        }
    }
    function EJ(a) {
        var b = K("UL", ["ts-menu", "popupMenu"]);
        b.innerHTML = a.innerHTML;
        return b
    }
    function FJ() {
        var a, b, c, d = !!A.ResizeObserver;
        if ((a = zd("ts-mainmenu")) && (b = zd("MainMenu", a)) && (c = ud("topBar"))) {
            var e, f = EJ(b);
            Bq(b);
            var g = function() {
                var h = !d || Rf(a).width < Rf(b).width;
                we(c, "ts-nicnzdmm", !h);
                return h && !e ? $l(function() {
                    var l = K("DIV", ["ts-imm", "ts-cntrl-hover-bg"])
                      , m = gg();
                    m = km(Math.round(.25 * m));
                    for (var n = 2; 0 <= n; n--) {
                        var q = L("DIV");
                        R(q, "height", m);
                        n && R(q, "margin-bottom", m);
                        l.appendChild(q)
                    }
                    a.insertBefore(l, a.childNodes[0] || null);
                    e = new gq(function() {
                        return Tg(lq(f))
                    }
                    );
                    mq(e, 12);
                    e.ya(l)
                }) : t.Promise.resolve()
            };
            g().then(function() {
                if (d) {
                    var h;
                    (new ResizeObserver(function() {
                        h || (h = (r = g(),
                        v(r, "finally")).call(r, function() {
                            h = void 0
                        }))
                    }
                    )).observe(a)
                }
            })
        }
    }
    function GJ() {
        function a() {
            Xl(function() {
                return Dd()
            }).then(function(d) {
                b.scrollTop > 2 * d.height ? c ? T(c, !0) : (c = K("DIV", ["ts-hoveraltop", "ts-ico-color"], cm("arrow-square-up")),
                R(c, {
                    position: "fixed",
                    right: "0.5em",
                    bottom: "0.5em",
                    "font-size": "3em",
                    cursor: "pointer",
                    "text-shadow": "2px 2px 13px rgba(0,0,0,0.2)",
                    "line-height": 1
                }),
                Q(c, "click", function() {
                    b.scrollTop = 0
                }),
                document.body.appendChild(c)) : c && T(c, !1)
            })
        }
        var b = Gd(document), c;
        Q(A, ["resize", "scroll"], a);
        a()
    }
    function HJ() {
        lo.HtmlCode = function(a) {
            return ms(a.code)
        }
    }
    (function() {
        ZH();
        C("tibo.jp.game.putPuzzle", wJ);
        C("tibo.jp.game.updateGP", AJ);
        C("tibo.jp.game.createNativeShareMI", yJ);
        C("tibo.jp.game.createPlayAsMI", zJ);
        Lq(function(b) {
            b && !F("Googlebot") && fu("service/reportError", {
                appname: "Jigsaw Planet JavaScript",
                log: b
            }, null, {
                method: "POST",
                Hb: !1
            })
        });
        lo.sgb = qG;
        lo.Score = aI;
        lo.ImageStruct = st;
        lo.User = Rx;
        lo.Image = Ix;
        lo.Album = Zw;
        lo.Puzzle = Mx;
        lo.Thread = Rw;
        lo.Message = Ow;
        lo.ThreadBrief = Tw;
        lo.Index = Vw;
        HJ();
        var a = Ek();
        Q(A, "pageshow", function(b) {
            b.ja.persisted && Ek() !== a && wl()
        });
        ol.push(IH);
        ol.push(function(b) {
            b = wd("A", null, b);
            for (var c = new M, d = 0; d < b.length; d++)
                et(b[d]);
            return c
        });
        if (sb())
            try {
                ie()
            } catch (b) {}
        ly().controlledMessagingFunction = function(b) {
            b.proceed(!1)
        }
        ;
        hi(function() {
            FJ();
            GJ();
            CJ() || Xt(Ut(), "Your browser is not supported, please use a better browser.", 1);
            DJ();
            Hw();
            Q(new sf(document), pf, function(c) {
                c.shiftKey && c.altKey && 76 == c.keyCode && (Ip("Are you sure you wish to send a log to developers of this web site?").then(function(d) {
                    d && (W("Log to developers;body code:\n" + document.body.innerHTML + "\n\n"),
                    Wt(Ut(), "The log has been sent, thank you."))
                }),
                c.preventDefault())
            });
            Ot();
            Rt();
            ww();
            var b = uh();
            "play" !== b && (sG || (sG = wG())).then(function(c) {
                if (c.length) {
                    if ("savedgames" === b)
                        return !0;
                    var d = new t.Map;
                    c = y(c);
                    for (var e = c.next(); !e.done; e = c.next())
                        e = e.value,
                        d.set(e.pid, e);
                    c = v(zx, "values").call(zx);
                    c = y(c);
                    for (e = c.next(); !e.done; e = c.next())
                        if (e = e.value,
                        e instanceof Lx && d.get(e.Qd()))
                            return !0
                }
            }, cc).then(function(c) {
                c && wl()
            });
            Ks("refreshpage", function() {
                wl()
            })
        })
    }
    )();
}
).call(this);

var Ps = Object.defineProperty;
var Rs = (e, t, n) => t in e ? Ps(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var jr = (e, t, n) => Rs(e, typeof t != "symbol" ? t + "" : t, n);
import * as Ir from "vue";
import { ref as E, computed as O, nextTick as Ue, watchEffect as oe, onMounted as J, cloneVNode as Us, h as Q, Fragment as Wt, defineComponent as H, inject as se, provide as pe, onUnmounted as le, watch as qe, shallowRef as Nt, unref as C, getCurrentInstance as ni, Teleport as Bs, reactive as Bn, toRaw as Qe, normalizeClass as Dn, openBlock as Se, createElementBlock as dt, createElementVNode as D, effectScope as Ds, readonly as ri, getCurrentScope as _s, onScopeDispose as Ns, createBlock as Rt, withCtx as ne, createVNode as ce, createTextVNode as _n, toDisplayString as ut, renderSlot as ii, renderList as si, withKeys as ai, Transition as Ls, withDirectives as Fs, vShow as Vs } from "vue";
function zs(e) {
  if (e.length >= 255)
    throw new TypeError("Alphabet too long");
  const t = new Uint8Array(256);
  for (let d = 0; d < t.length; d++)
    t[d] = 255;
  for (let d = 0; d < e.length; d++) {
    const u = e.charAt(d), f = u.charCodeAt(0);
    if (t[f] !== 255)
      throw new TypeError(u + " is ambiguous");
    t[f] = d;
  }
  const n = e.length, r = e.charAt(0), i = Math.log(n) / Math.log(256), s = Math.log(256) / Math.log(n);
  function a(d) {
    if (d instanceof Uint8Array || (ArrayBuffer.isView(d) ? d = new Uint8Array(d.buffer, d.byteOffset, d.byteLength) : Array.isArray(d) && (d = Uint8Array.from(d))), !(d instanceof Uint8Array))
      throw new TypeError("Expected Uint8Array");
    if (d.length === 0)
      return "";
    let u = 0, f = 0, p = 0;
    const v = d.length;
    for (; p !== v && d[p] === 0; )
      p++, u++;
    const h = (v - p) * s + 1 >>> 0, m = new Uint8Array(h);
    for (; p !== v; ) {
      let w = d[p], $ = 0;
      for (let M = h - 1; (w !== 0 || $ < f) && M !== -1; M--, $++)
        w += 256 * m[M] >>> 0, m[M] = w % n >>> 0, w = w / n >>> 0;
      if (w !== 0)
        throw new Error("Non-zero carry");
      f = $, p++;
    }
    let g = h - f;
    for (; g !== h && m[g] === 0; )
      g++;
    let S = r.repeat(u);
    for (; g < h; ++g)
      S += e.charAt(m[g]);
    return S;
  }
  function o(d) {
    if (typeof d != "string")
      throw new TypeError("Expected String");
    if (d.length === 0)
      return new Uint8Array();
    let u = 0, f = 0, p = 0;
    for (; d[u] === r; )
      f++, u++;
    const v = (d.length - u) * i + 1 >>> 0, h = new Uint8Array(v);
    for (; d[u]; ) {
      let w = t[d.charCodeAt(u)];
      if (w === 255)
        return;
      let $ = 0;
      for (let M = v - 1; (w !== 0 || $ < p) && M !== -1; M--, $++)
        w += n * h[M] >>> 0, h[M] = w % 256 >>> 0, w = w / 256 >>> 0;
      if (w !== 0)
        throw new Error("Non-zero carry");
      p = $, u++;
    }
    let m = v - p;
    for (; m !== v && h[m] === 0; )
      m++;
    const g = new Uint8Array(f + (v - m));
    let S = f;
    for (; m !== v; )
      g[S++] = h[m++];
    return g;
  }
  function l(d) {
    const u = o(d);
    if (u)
      return u;
    throw new Error("Non-base" + n + " character");
  }
  return {
    encode: a,
    decodeUnsafe: o,
    decode: l
  };
}
var Ws = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const oi = zs(Ws), mn = (e) => oi.encode(e), Nn = (e) => oi.decode(e);
function Be(e) {
  return Uint8Array.from(atob(e), (t) => t.charCodeAt(0));
}
const Tn = 8192;
function Ee(e) {
  if (e.length < Tn)
    return btoa(String.fromCharCode(...e));
  let t = "";
  for (var n = 0; n < e.length; n += Tn) {
    const r = e.slice(n, n + Tn);
    t += String.fromCharCode(...r);
  }
  return btoa(t);
}
function li(e) {
  var i;
  const t = e.startsWith("0x") ? e.slice(2) : e, r = ((i = (t.length % 2 === 0 ? t : `0${t}}`).match(/.{2}/g)) == null ? void 0 : i.map((s) => parseInt(s, 16))) ?? [];
  return Uint8Array.from(r);
}
function cn(e) {
  return e.reduce((t, n) => t + n.toString(16).padStart(2, "0"), "");
}
function nr(e) {
  let t = [], n = 0;
  if (e === 0)
    return [0];
  for (; e > 0; )
    t[n] = e & 127, (e >>= 7) && (t[n] |= 128), n += 1;
  return t;
}
function Gs(e) {
  let t = 0, n = 0, r = 0;
  for (; ; ) {
    let i = e[r];
    if (r += 1, t |= (i & 127) << n, !(i & 128))
      break;
    n += 7;
  }
  return {
    value: t,
    length: r
  };
}
class Hs {
  /**
   * @param {Uint8Array} data Data to use as a buffer.
   */
  constructor(t) {
    this.bytePosition = 0, this.dataView = new DataView(t.buffer);
  }
  /**
   * Shift current cursor position by `bytes`.
   *
   * @param {Number} bytes Number of bytes to
   * @returns {this} Self for possible chaining.
   */
  shift(t) {
    return this.bytePosition += t, this;
  }
  /**
   * Read U8 value from the buffer and shift cursor by 1.
   * @returns
   */
  read8() {
    let t = this.dataView.getUint8(this.bytePosition);
    return this.shift(1), t;
  }
  /**
   * Read U16 value from the buffer and shift cursor by 2.
   * @returns
   */
  read16() {
    let t = this.dataView.getUint16(this.bytePosition, !0);
    return this.shift(2), t;
  }
  /**
   * Read U32 value from the buffer and shift cursor by 4.
   * @returns
   */
  read32() {
    let t = this.dataView.getUint32(this.bytePosition, !0);
    return this.shift(4), t;
  }
  /**
   * Read U64 value from the buffer and shift cursor by 8.
   * @returns
   */
  read64() {
    let t = this.read32(), r = this.read32().toString(16) + t.toString(16).padStart(8, "0");
    return BigInt("0x" + r).toString(10);
  }
  /**
   * Read U128 value from the buffer and shift cursor by 16.
   */
  read128() {
    let t = BigInt(this.read64()), r = BigInt(this.read64()).toString(16) + t.toString(16).padStart(16, "0");
    return BigInt("0x" + r).toString(10);
  }
  /**
   * Read U128 value from the buffer and shift cursor by 32.
   * @returns
   */
  read256() {
    let t = BigInt(this.read128()), r = BigInt(this.read128()).toString(16) + t.toString(16).padStart(32, "0");
    return BigInt("0x" + r).toString(10);
  }
  /**
   * Read `num` number of bytes from the buffer and shift cursor by `num`.
   * @param num Number of bytes to read.
   */
  readBytes(t) {
    let n = this.bytePosition + this.dataView.byteOffset, r = new Uint8Array(this.dataView.buffer, n, t);
    return this.shift(t), r;
  }
  /**
   * Read ULEB value - an integer of varying size. Used for enum indexes and
   * vector lengths.
   * @returns {Number} The ULEB value.
   */
  readULEB() {
    let t = this.bytePosition + this.dataView.byteOffset, n = new Uint8Array(this.dataView.buffer, t), { value: r, length: i } = Gs(n);
    return this.shift(i), r;
  }
  /**
   * Read a BCS vector: read a length and then apply function `cb` X times
   * where X is the length of the vector, defined as ULEB in BCS bytes.
   * @param cb Callback to process elements of vector.
   * @returns {Array<Any>} Array of the resulting values, returned by callback.
   */
  readVec(t) {
    let n = this.readULEB(), r = [];
    for (let i = 0; i < n; i++)
      r.push(t(this, i, n));
    return r;
  }
}
function Ks(e, t) {
  switch (t) {
    case "base58":
      return mn(e);
    case "base64":
      return Ee(e);
    case "hex":
      return cn(e);
    default:
      throw new Error("Unsupported encoding, supported values are: base64, hex");
  }
}
function qs(e, t = ["<", ">"]) {
  const [n, r] = t, i = [];
  let s = "", a = 0;
  for (let o = 0; o < e.length; o++) {
    const l = e[o];
    if (l === n && a++, l === r && a--, a === 0 && l === ",") {
      i.push(s.trim()), s = "";
      continue;
    }
    s += l;
  }
  return i.push(s.trim()), i;
}
class Js {
  constructor({
    initialSize: t = 1024,
    maxSize: n = 1 / 0,
    allocateSize: r = 1024
  } = {}) {
    this.bytePosition = 0, this.size = t, this.maxSize = n, this.allocateSize = r, this.dataView = new DataView(new ArrayBuffer(t));
  }
  ensureSizeOrGrow(t) {
    const n = this.bytePosition + t;
    if (n > this.size) {
      const r = Math.min(this.maxSize, this.size + this.allocateSize);
      if (n > r)
        throw new Error(
          `Attempting to serialize to BCS, but buffer does not have enough size. Allocated size: ${this.size}, Max size: ${this.maxSize}, Required size: ${n}`
        );
      this.size = r;
      const i = new ArrayBuffer(this.size);
      new Uint8Array(i).set(new Uint8Array(this.dataView.buffer)), this.dataView = new DataView(i);
    }
  }
  /**
   * Shift current cursor position by `bytes`.
   *
   * @param {Number} bytes Number of bytes to
   * @returns {this} Self for possible chaining.
   */
  shift(t) {
    return this.bytePosition += t, this;
  }
  /**
   * Write a U8 value into a buffer and shift cursor position by 1.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write8(t) {
    return this.ensureSizeOrGrow(1), this.dataView.setUint8(this.bytePosition, Number(t)), this.shift(1);
  }
  /**
   * Write a U16 value into a buffer and shift cursor position by 2.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write16(t) {
    return this.ensureSizeOrGrow(2), this.dataView.setUint16(this.bytePosition, Number(t), !0), this.shift(2);
  }
  /**
   * Write a U32 value into a buffer and shift cursor position by 4.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  write32(t) {
    return this.ensureSizeOrGrow(4), this.dataView.setUint32(this.bytePosition, Number(t), !0), this.shift(4);
  }
  /**
   * Write a U64 value into a buffer and shift cursor position by 8.
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write64(t) {
    return kn(BigInt(t), 8).forEach((n) => this.write8(n)), this;
  }
  /**
   * Write a U128 value into a buffer and shift cursor position by 16.
   *
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write128(t) {
    return kn(BigInt(t), 16).forEach((n) => this.write8(n)), this;
  }
  /**
   * Write a U256 value into a buffer and shift cursor position by 16.
   *
   * @param {bigint} value Value to write.
   * @returns {this}
   */
  write256(t) {
    return kn(BigInt(t), 32).forEach((n) => this.write8(n)), this;
  }
  /**
   * Write a ULEB value into a buffer and shift cursor position by number of bytes
   * written.
   * @param {Number} value Value to write.
   * @returns {this}
   */
  writeULEB(t) {
    return nr(t).forEach((n) => this.write8(n)), this;
  }
  /**
   * Write a vector into a buffer by first writing the vector length and then calling
   * a callback on each passed value.
   *
   * @param {Array<Any>} vector Array of elements to write.
   * @param {WriteVecCb} cb Callback to call on each element of the vector.
   * @returns {this}
   */
  writeVec(t, n) {
    return this.writeULEB(t.length), Array.from(t).forEach((r, i) => n(this, r, i, t.length)), this;
  }
  /**
   * Adds support for iterations over the object.
   * @returns {Uint8Array}
   */
  *[Symbol.iterator]() {
    for (let t = 0; t < this.bytePosition; t++)
      yield this.dataView.getUint8(t);
    return this.toBytes();
  }
  /**
   * Get underlying buffer taking only value bytes (in case initial buffer size was bigger).
   * @returns {Uint8Array} Resulting bcs.
   */
  toBytes() {
    return new Uint8Array(this.dataView.buffer.slice(0, this.bytePosition));
  }
  /**
   * Represent data as 'hex' or 'base64'
   * @param encoding Encoding to use: 'base64' or 'hex'
   */
  toString(t) {
    return Ks(this.toBytes(), t);
  }
}
function kn(e, t) {
  let n = new Uint8Array(t), r = 0;
  for (; e > 0; )
    n[r] = Number(e % BigInt(256)), e = e / BigInt(256), r += 1;
  return n;
}
var ui = (e) => {
  throw TypeError(e);
}, ci = (e, t, n) => t.has(e) || ui("Cannot " + n), je = (e, t, n) => (ci(e, t, "read from private field"), n ? n.call(e) : t.get(e)), dn = (e, t, n) => t.has(e) ? ui("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), fn = (e, t, n, r) => (ci(e, t, "write to private field"), t.set(e, n), n), bt, $t, sn, Ze;
const Xs = class di {
  constructor(t) {
    dn(this, bt), dn(this, $t), this.name = t.name, this.read = t.read, this.serializedSize = t.serializedSize ?? (() => null), fn(this, bt, t.write), fn(this, $t, t.serialize ?? ((n, r) => {
      const i = new Js({
        initialSize: this.serializedSize(n) ?? void 0,
        ...r
      });
      return je(this, bt).call(this, n, i), i.toBytes();
    })), this.validate = t.validate ?? (() => {
    });
  }
  write(t, n) {
    this.validate(t), je(this, bt).call(this, t, n);
  }
  serialize(t, n) {
    return this.validate(t), new Ys(this, je(this, $t).call(this, t, n));
  }
  parse(t) {
    const n = new Hs(t);
    return this.read(n);
  }
  fromHex(t) {
    return this.parse(li(t));
  }
  fromBase58(t) {
    return this.parse(Nn(t));
  }
  fromBase64(t) {
    return this.parse(Be(t));
  }
  transform({
    name: t,
    input: n,
    output: r,
    validate: i
  }) {
    return new di({
      name: t ?? this.name,
      read: (s) => r(this.read(s)),
      write: (s, a) => je(this, bt).call(this, n(s), a),
      serializedSize: (s) => this.serializedSize(n(s)),
      serialize: (s, a) => je(this, $t).call(this, n(s), a),
      validate: (s) => {
        i == null || i(s), this.validate(n(s));
      }
    });
  }
};
bt = /* @__PURE__ */ new WeakMap();
$t = /* @__PURE__ */ new WeakMap();
let Ge = Xs;
const fi = Symbol.for("@mysten/serialized-bcs");
function rr(e) {
  return !!e && typeof e == "object" && e[fi] === !0;
}
class Ys {
  constructor(t, n) {
    dn(this, sn), dn(this, Ze), fn(this, sn, t), fn(this, Ze, n);
  }
  // Used to brand SerializedBcs so that they can be identified, even between multiple copies
  // of the @mysten/bcs package are installed
  get [fi]() {
    return !0;
  }
  toBytes() {
    return je(this, Ze);
  }
  toHex() {
    return cn(je(this, Ze));
  }
  toBase64() {
    return Ee(je(this, Ze));
  }
  toBase58() {
    return mn(je(this, Ze));
  }
  parse() {
    return je(this, sn).parse(je(this, Ze));
  }
}
sn = /* @__PURE__ */ new WeakMap();
Ze = /* @__PURE__ */ new WeakMap();
function pn({
  size: e,
  ...t
}) {
  return new Ge({
    ...t,
    serializedSize: () => e
  });
}
function An({
  readMethod: e,
  writeMethod: t,
  ...n
}) {
  return pn({
    ...n,
    read: (r) => r[e](),
    write: (r, i) => i[t](r),
    validate: (r) => {
      var i;
      if (r < 0 || r > n.maxValue)
        throw new TypeError(
          `Invalid ${n.name} value: ${r}. Expected value in range 0-${n.maxValue}`
        );
      (i = n.validate) == null || i.call(n, r);
    }
  });
}
function jn({
  readMethod: e,
  writeMethod: t,
  ...n
}) {
  return pn({
    ...n,
    read: (r) => r[e](),
    write: (r, i) => i[t](BigInt(r)),
    validate: (r) => {
      var s;
      const i = BigInt(r);
      if (i < 0 || i > n.maxValue)
        throw new TypeError(
          `Invalid ${n.name} value: ${i}. Expected value in range 0-${n.maxValue}`
        );
      (s = n.validate) == null || s.call(n, i);
    }
  });
}
function Zs({
  serialize: e,
  ...t
}) {
  const n = new Ge({
    ...t,
    serialize: e,
    write: (r, i) => {
      for (const s of n.serialize(r).toBytes())
        i.write8(s);
    }
  });
  return n;
}
function Qs({
  toBytes: e,
  fromBytes: t,
  ...n
}) {
  return new Ge({
    ...n,
    read: (r) => {
      const i = r.readULEB(), s = r.readBytes(i);
      return t(s);
    },
    write: (r, i) => {
      const s = e(r);
      i.writeULEB(s.length);
      for (let a = 0; a < s.length; a++)
        i.write8(s[a]);
    },
    serialize: (r) => {
      const i = e(r), s = nr(i.length), a = new Uint8Array(s.length + i.length);
      return a.set(s, 0), a.set(i, s.length), a;
    },
    validate: (r) => {
      var i;
      if (typeof r != "string")
        throw new TypeError(`Invalid ${n.name} value: ${r}. Expected string`);
      (i = n.validate) == null || i.call(n, r);
    }
  });
}
function ea(e) {
  let t = null;
  function n() {
    return t || (t = e()), t;
  }
  return new Ge({
    name: "lazy",
    read: (r) => n().read(r),
    serializedSize: (r) => n().serializedSize(r),
    write: (r, i) => n().write(r, i),
    serialize: (r, i) => n().serialize(r, i).toBytes()
  });
}
const c = {
  /**
   * Creates a BcsType that can be used to read and write an 8-bit unsigned integer.
   * @example
   * bcs.u8().serialize(255).toBytes() // Uint8Array [ 255 ]
   */
  u8(e) {
    return An({
      name: "u8",
      readMethod: "read8",
      writeMethod: "write8",
      size: 1,
      maxValue: 2 ** 8 - 1,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write a 16-bit unsigned integer.
   * @example
   * bcs.u16().serialize(65535).toBytes() // Uint8Array [ 255, 255 ]
   */
  u16(e) {
    return An({
      name: "u16",
      readMethod: "read16",
      writeMethod: "write16",
      size: 2,
      maxValue: 2 ** 16 - 1,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write a 32-bit unsigned integer.
   * @example
   * bcs.u32().serialize(4294967295).toBytes() // Uint8Array [ 255, 255, 255, 255 ]
   */
  u32(e) {
    return An({
      name: "u32",
      readMethod: "read32",
      writeMethod: "write32",
      size: 4,
      maxValue: 2 ** 32 - 1,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write a 64-bit unsigned integer.
   * @example
   * bcs.u64().serialize(1).toBytes() // Uint8Array [ 1, 0, 0, 0, 0, 0, 0, 0 ]
   */
  u64(e) {
    return jn({
      name: "u64",
      readMethod: "read64",
      writeMethod: "write64",
      size: 8,
      maxValue: 2n ** 64n - 1n,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write a 128-bit unsigned integer.
   * @example
   * bcs.u128().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
   */
  u128(e) {
    return jn({
      name: "u128",
      readMethod: "read128",
      writeMethod: "write128",
      size: 16,
      maxValue: 2n ** 128n - 1n,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write a 256-bit unsigned integer.
   * @example
   * bcs.u256().serialize(1).toBytes() // Uint8Array [ 1, ..., 0 ]
   */
  u256(e) {
    return jn({
      name: "u256",
      readMethod: "read256",
      writeMethod: "write256",
      size: 32,
      maxValue: 2n ** 256n - 1n,
      ...e
    });
  },
  /**
   * Creates a BcsType that can be used to read and write boolean values.
   * @example
   * bcs.bool().serialize(true).toBytes() // Uint8Array [ 1 ]
   */
  bool(e) {
    return pn({
      name: "bool",
      size: 1,
      read: (t) => t.read8() === 1,
      write: (t, n) => n.write8(t ? 1 : 0),
      ...e,
      validate: (t) => {
        var n;
        if ((n = e == null ? void 0 : e.validate) == null || n.call(e, t), typeof t != "boolean")
          throw new TypeError(`Expected boolean, found ${typeof t}`);
      }
    });
  },
  /**
   * Creates a BcsType that can be used to read and write unsigned LEB encoded integers
   * @example
   *
   */
  uleb128(e) {
    return Zs({
      name: "uleb128",
      read: (t) => t.readULEB(),
      serialize: (t) => Uint8Array.from(nr(t)),
      ...e
    });
  },
  /**
   * Creates a BcsType representing a fixed length byte array
   * @param size The number of bytes this types represents
   * @example
   * bcs.bytes(3).serialize(new Uint8Array([1, 2, 3])).toBytes() // Uint8Array [1, 2, 3]
   */
  bytes(e, t) {
    return pn({
      name: `bytes[${e}]`,
      size: e,
      read: (n) => n.readBytes(e),
      write: (n, r) => {
        for (let i = 0; i < e; i++)
          r.write8(n[i] ?? 0);
      },
      ...t,
      validate: (n) => {
        var r;
        if ((r = t == null ? void 0 : t.validate) == null || r.call(t, n), !n || typeof n != "object" || !("length" in n))
          throw new TypeError(`Expected array, found ${typeof n}`);
        if (n.length !== e)
          throw new TypeError(`Expected array of length ${e}, found ${n.length}`);
      }
    });
  },
  /**
   * Creates a BcsType that can ser/de string values.  Strings will be UTF-8 encoded
   * @example
   * bcs.string().serialize('a').toBytes() // Uint8Array [ 1, 97 ]
   */
  string(e) {
    return Qs({
      name: "string",
      toBytes: (t) => new TextEncoder().encode(t),
      fromBytes: (t) => new TextDecoder().decode(t),
      ...e
    });
  },
  /**
   * Creates a BcsType that represents a fixed length array of a given type
   * @param size The number of elements in the array
   * @param type The BcsType of each element in the array
   * @example
   * bcs.fixedArray(3, bcs.u8()).serialize([1, 2, 3]).toBytes() // Uint8Array [ 1, 2, 3 ]
   */
  fixedArray(e, t, n) {
    return new Ge({
      name: `${t.name}[${e}]`,
      read: (r) => {
        const i = new Array(e);
        for (let s = 0; s < e; s++)
          i[s] = t.read(r);
        return i;
      },
      write: (r, i) => {
        for (const s of r)
          t.write(s, i);
      },
      ...n,
      validate: (r) => {
        var i;
        if ((i = n == null ? void 0 : n.validate) == null || i.call(n, r), !r || typeof r != "object" || !("length" in r))
          throw new TypeError(`Expected array, found ${typeof r}`);
        if (r.length !== e)
          throw new TypeError(`Expected array of length ${e}, found ${r.length}`);
      }
    });
  },
  /**
   * Creates a BcsType representing an optional value
   * @param type The BcsType of the optional value
   * @example
   * bcs.option(bcs.u8()).serialize(null).toBytes() // Uint8Array [ 0 ]
   * bcs.option(bcs.u8()).serialize(1).toBytes() // Uint8Array [ 1, 1 ]
   */
  option(e) {
    return c.enum(`Option<${e.name}>`, {
      None: null,
      Some: e
    }).transform({
      input: (t) => t == null ? { None: !0 } : { Some: t },
      output: (t) => t.$kind === "Some" ? t.Some : null
    });
  },
  /**
   * Creates a BcsType representing a variable length vector of a given type
   * @param type The BcsType of each element in the vector
   *
   * @example
   * bcs.vector(bcs.u8()).toBytes([1, 2, 3]) // Uint8Array [ 3, 1, 2, 3 ]
   */
  vector(e, t) {
    return new Ge({
      name: `vector<${e.name}>`,
      read: (n) => {
        const r = n.readULEB(), i = new Array(r);
        for (let s = 0; s < r; s++)
          i[s] = e.read(n);
        return i;
      },
      write: (n, r) => {
        r.writeULEB(n.length);
        for (const i of n)
          e.write(i, r);
      },
      ...t,
      validate: (n) => {
        var r;
        if ((r = t == null ? void 0 : t.validate) == null || r.call(t, n), !n || typeof n != "object" || !("length" in n))
          throw new TypeError(`Expected array, found ${typeof n}`);
      }
    });
  },
  /**
   * Creates a BcsType representing a tuple of a given set of types
   * @param types The BcsTypes for each element in the tuple
   *
   * @example
   * const tuple = bcs.tuple([bcs.u8(), bcs.string(), bcs.bool()])
   * tuple.serialize([1, 'a', true]).toBytes() // Uint8Array [ 1, 1, 97, 1 ]
   */
  tuple(e, t) {
    return new Ge({
      name: `(${e.map((n) => n.name).join(", ")})`,
      serializedSize: (n) => {
        let r = 0;
        for (let i = 0; i < e.length; i++) {
          const s = e[i].serializedSize(n[i]);
          if (s == null)
            return null;
          r += s;
        }
        return r;
      },
      read: (n) => {
        const r = [];
        for (const i of e)
          r.push(i.read(n));
        return r;
      },
      write: (n, r) => {
        for (let i = 0; i < e.length; i++)
          e[i].write(n[i], r);
      },
      ...t,
      validate: (n) => {
        var r;
        if ((r = t == null ? void 0 : t.validate) == null || r.call(t, n), !Array.isArray(n))
          throw new TypeError(`Expected array, found ${typeof n}`);
        if (n.length !== e.length)
          throw new TypeError(`Expected array of length ${e.length}, found ${n.length}`);
      }
    });
  },
  /**
   * Creates a BcsType representing a struct of a given set of fields
   * @param name The name of the struct
   * @param fields The fields of the struct. The order of the fields affects how data is serialized and deserialized
   *
   * @example
   * const struct = bcs.struct('MyStruct', {
   *  a: bcs.u8(),
   *  b: bcs.string(),
   * })
   * struct.serialize({ a: 1, b: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
   */
  struct(e, t, n) {
    const r = Object.entries(t);
    return new Ge({
      name: e,
      serializedSize: (i) => {
        let s = 0;
        for (const [a, o] of r) {
          const l = o.serializedSize(i[a]);
          if (l == null)
            return null;
          s += l;
        }
        return s;
      },
      read: (i) => {
        const s = {};
        for (const [a, o] of r)
          s[a] = o.read(i);
        return s;
      },
      write: (i, s) => {
        for (const [a, o] of r)
          o.write(i[a], s);
      },
      ...n,
      validate: (i) => {
        var s;
        if ((s = n == null ? void 0 : n.validate) == null || s.call(n, i), typeof i != "object" || i == null)
          throw new TypeError(`Expected object, found ${typeof i}`);
      }
    });
  },
  /**
   * Creates a BcsType representing an enum of a given set of options
   * @param name The name of the enum
   * @param values The values of the enum. The order of the values affects how data is serialized and deserialized.
   * null can be used to represent a variant with no data.
   *
   * @example
   * const enum = bcs.enum('MyEnum', {
   *   A: bcs.u8(),
   *   B: bcs.string(),
   *   C: null,
   * })
   * enum.serialize({ A: 1 }).toBytes() // Uint8Array [ 0, 1 ]
   * enum.serialize({ B: 'a' }).toBytes() // Uint8Array [ 1, 1, 97 ]
   * enum.serialize({ C: true }).toBytes() // Uint8Array [ 2 ]
   */
  enum(e, t, n) {
    const r = Object.entries(t);
    return new Ge({
      name: e,
      read: (i) => {
        const s = i.readULEB(), a = r[s];
        if (!a)
          throw new TypeError(`Unknown value ${s} for enum ${e}`);
        const [o, l] = a;
        return {
          [o]: (l == null ? void 0 : l.read(i)) ?? !0,
          $kind: o
        };
      },
      write: (i, s) => {
        const [a, o] = Object.entries(i).filter(
          ([l]) => Object.hasOwn(t, l)
        )[0];
        for (let l = 0; l < r.length; l++) {
          const [d, u] = r[l];
          if (d === a) {
            s.writeULEB(l), u == null || u.write(o, s);
            return;
          }
        }
      },
      ...n,
      validate: (i) => {
        var o;
        if ((o = n == null ? void 0 : n.validate) == null || o.call(n, i), typeof i != "object" || i == null)
          throw new TypeError(`Expected object, found ${typeof i}`);
        const s = Object.keys(i).filter(
          (l) => i[l] !== void 0 && Object.hasOwn(t, l)
        );
        if (s.length !== 1)
          throw new TypeError(
            `Expected object with one key, but found ${s.length} for type ${e}}`
          );
        const [a] = s;
        if (!Object.hasOwn(t, a))
          throw new TypeError(`Invalid enum variant ${a}`);
      }
    });
  },
  /**
   * Creates a BcsType representing a map of a given key and value type
   * @param keyType The BcsType of the key
   * @param valueType The BcsType of the value
   * @example
   * const map = bcs.map(bcs.u8(), bcs.string())
   * map.serialize(new Map([[2, 'a']])).toBytes() // Uint8Array [ 1, 2, 1, 97 ]
   */
  map(e, t) {
    return c.vector(c.tuple([e, t])).transform({
      name: `Map<${e.name}, ${t.name}>`,
      input: (n) => [...n.entries()],
      output: (n) => {
        const r = /* @__PURE__ */ new Map();
        for (const [i, s] of n)
          r.set(i, s);
        return r;
      }
    });
  },
  /**
   * Creates a BcsType that wraps another BcsType which is lazily evaluated. This is useful for creating recursive types.
   * @param cb A callback that returns the BcsType
   */
  lazy(e) {
    return ea(e);
  }
}, ir = 32;
function pi(e) {
  return ta(e) && na(e) === ir;
}
function W(e, t = !1) {
  let n = e.toLowerCase();
  return !t && n.startsWith("0x") && (n = n.slice(2)), `0x${n.padStart(ir * 2, "0")}`;
}
function Lt(e, t = !1) {
  return W(e, t);
}
function ta(e) {
  return /^(0x|0X)?[a-fA-F0-9]+$/.test(e) && e.length % 2 === 0;
}
function na(e) {
  return /^(0x|0X)/.test(e) ? (e.length - 2) / 2 : e.length / 2;
}
const ra = /^vector<(.+)>$/, ia = /^([^:]+)::([^:]+)::([^<]+)(<(.+)>)?/;
class Re {
  static parseFromStr(t, n = !1) {
    if (t === "address")
      return { address: null };
    if (t === "bool")
      return { bool: null };
    if (t === "u8")
      return { u8: null };
    if (t === "u16")
      return { u16: null };
    if (t === "u32")
      return { u32: null };
    if (t === "u64")
      return { u64: null };
    if (t === "u128")
      return { u128: null };
    if (t === "u256")
      return { u256: null };
    if (t === "signer")
      return { signer: null };
    const r = t.match(ra);
    if (r)
      return {
        vector: Re.parseFromStr(r[1], n)
      };
    const i = t.match(ia);
    if (i)
      return {
        struct: {
          address: n ? W(i[1]) : i[1],
          module: i[2],
          name: i[3],
          typeParams: i[5] === void 0 ? [] : Re.parseStructTypeArgs(i[5], n)
        }
      };
    throw new Error(`Encountered unexpected token when parsing type args for ${t}`);
  }
  static parseStructTypeArgs(t, n = !1) {
    return qs(t).map(
      (r) => Re.parseFromStr(r, n)
    );
  }
  static tagToString(t) {
    if ("bool" in t)
      return "bool";
    if ("u8" in t)
      return "u8";
    if ("u16" in t)
      return "u16";
    if ("u32" in t)
      return "u32";
    if ("u64" in t)
      return "u64";
    if ("u128" in t)
      return "u128";
    if ("u256" in t)
      return "u256";
    if ("address" in t)
      return "address";
    if ("signer" in t)
      return "signer";
    if ("vector" in t)
      return `vector<${Re.tagToString(t.vector)}>`;
    if ("struct" in t) {
      const n = t.struct, r = n.typeParams.map(Re.tagToString).join(", ");
      return `${n.address}::${n.module}::${n.name}${r ? `<${r}>` : ""}`;
    }
    throw new Error("Invalid TypeTag");
  }
}
function sa(e) {
  return c.u64({
    name: "unsafe_u64",
    ...e
  }).transform({
    input: (t) => t,
    output: (t) => Number(t)
  });
}
function aa(e) {
  return c.enum("Option", {
    None: null,
    Some: e
  });
}
const q = c.bytes(ir).transform({
  validate: (e) => {
    const t = typeof e == "string" ? e : cn(e);
    if (!t || !pi(W(t)))
      throw new Error(`Invalid Sui address ${t}`);
  },
  input: (e) => typeof e == "string" ? li(W(e)) : e,
  output: (e) => W(cn(e))
}), xe = c.vector(c.u8()).transform({
  name: "ObjectDigest",
  input: (e) => Nn(e),
  output: (e) => mn(new Uint8Array(e)),
  validate: (e) => {
    if (Nn(e).length !== 32)
      throw new Error("ObjectDigest must be 32 bytes");
  }
}), we = c.struct("SuiObjectRef", {
  objectId: q,
  version: c.u64(),
  digest: xe
}), hi = c.struct("SharedObjectRef", {
  objectId: q,
  initialSharedVersion: c.u64(),
  mutable: c.bool()
}), vi = c.enum("ObjectArg", {
  ImmOrOwnedObject: we,
  SharedObject: hi,
  Receiving: we
}), gi = c.enum("CallArg", {
  Pure: c.struct("Pure", {
    bytes: c.vector(c.u8()).transform({
      input: (e) => typeof e == "string" ? Be(e) : e,
      output: (e) => Ee(new Uint8Array(e))
    })
  }),
  Object: vi
}), sr = c.enum("TypeTag", {
  bool: null,
  u8: null,
  u64: null,
  u128: null,
  address: null,
  signer: null,
  vector: c.lazy(() => sr),
  struct: c.lazy(() => Ei),
  u16: null,
  u32: null,
  u256: null
}), ar = sr.transform({
  input: (e) => typeof e == "string" ? Re.parseFromStr(e, !0) : e,
  output: (e) => Re.tagToString(e)
}), Pe = c.enum("Argument", {
  GasCoin: null,
  Input: c.u16(),
  Result: c.u16(),
  NestedResult: c.tuple([c.u16(), c.u16()])
}), mi = c.struct("ProgrammableMoveCall", {
  package: q,
  module: c.string(),
  function: c.string(),
  typeArguments: c.vector(ar),
  arguments: c.vector(Pe)
}), bi = c.enum("Command", {
  /**
   * A Move Call - any public Move function can be called via
   * this transaction. The results can be used that instant to pass
   * into the next transaction.
   */
  MoveCall: mi,
  /**
   * Transfer vector of objects to a receiver.
   */
  TransferObjects: c.struct("TransferObjects", {
    objects: c.vector(Pe),
    address: Pe
  }),
  // /**
  //  * Split `amount` from a `coin`.
  //  */
  SplitCoins: c.struct("SplitCoins", {
    coin: Pe,
    amounts: c.vector(Pe)
  }),
  // /**
  //  * Merge Vector of Coins (`sources`) into a `destination`.
  //  */
  MergeCoins: c.struct("MergeCoins", {
    destination: Pe,
    sources: c.vector(Pe)
  }),
  // /**
  //  * Publish a Move module.
  //  */
  Publish: c.struct("Publish", {
    modules: c.vector(
      c.vector(c.u8()).transform({
        input: (e) => typeof e == "string" ? Be(e) : e,
        output: (e) => Ee(new Uint8Array(e))
      })
    ),
    dependencies: c.vector(q)
  }),
  // /**
  //  * Build a vector of objects using the input arguments.
  //  * It is impossible to export construct a `vector<T: key>` otherwise,
  //  * so this call serves a utility function.
  //  */
  MakeMoveVec: c.struct("MakeMoveVec", {
    type: aa(ar).transform({
      input: (e) => e === null ? {
        None: !0
      } : {
        Some: e
      },
      output: (e) => e.Some ?? null
    }),
    elements: c.vector(Pe)
  }),
  Upgrade: c.struct("Upgrade", {
    modules: c.vector(
      c.vector(c.u8()).transform({
        input: (e) => typeof e == "string" ? Be(e) : e,
        output: (e) => Ee(new Uint8Array(e))
      })
    ),
    dependencies: c.vector(q),
    package: q,
    ticket: Pe
  })
}), yi = c.struct("ProgrammableTransaction", {
  inputs: c.vector(gi),
  commands: c.vector(bi)
}), wi = c.enum("TransactionKind", {
  ProgrammableTransaction: yi,
  ChangeEpoch: null,
  Genesis: null,
  ConsensusCommitPrologue: null
}), Si = c.enum("TransactionExpiration", {
  None: null,
  Epoch: sa()
}), Ei = c.struct("StructTag", {
  address: q,
  module: c.string(),
  name: c.string(),
  typeParams: c.vector(sr)
}), Oi = c.struct("GasData", {
  payment: c.vector(we),
  owner: q,
  price: c.u64(),
  budget: c.u64()
}), Ti = c.struct("TransactionDataV1", {
  kind: wi,
  sender: q,
  gasData: Oi,
  expiration: Si
}), ki = c.enum("TransactionData", {
  V1: Ti
}), Ai = c.enum("IntentScope", {
  TransactionData: null,
  TransactionEffects: null,
  CheckpointSummary: null,
  PersonalMessage: null
}), ji = c.enum("IntentVersion", {
  V0: null
}), Ii = c.enum("AppId", {
  Sui: null
}), xi = c.struct("Intent", {
  scope: Ai,
  version: ji,
  appId: Ii
});
function Ci(e) {
  return c.struct(`IntentMessage<${e.name}>`, {
    intent: xi,
    value: e
  });
}
const $i = c.enum("CompressedSignature", {
  ED25519: c.fixedArray(64, c.u8()),
  Secp256k1: c.fixedArray(64, c.u8()),
  Secp256r1: c.fixedArray(64, c.u8()),
  ZkLogin: c.vector(c.u8())
}), Mi = c.enum("PublicKey", {
  ED25519: c.fixedArray(32, c.u8()),
  Secp256k1: c.fixedArray(33, c.u8()),
  Secp256r1: c.fixedArray(33, c.u8()),
  ZkLogin: c.vector(c.u8())
}), Pi = c.struct("MultiSigPkMap", {
  pubKey: Mi,
  weight: c.u8()
}), Ri = c.struct("MultiSigPublicKey", {
  pk_map: c.vector(Pi),
  threshold: c.u16()
}), oa = c.struct("MultiSig", {
  sigs: c.vector($i),
  bitmap: c.u16(),
  multisig_pk: Ri
}), la = c.vector(c.u8()).transform({
  input: (e) => typeof e == "string" ? Be(e) : e,
  output: (e) => Ee(new Uint8Array(e))
}), Ui = c.struct("SenderSignedTransaction", {
  intentMessage: Ci(ki),
  txSignatures: c.vector(la)
}), ua = c.vector(Ui, {
  name: "SenderSignedData"
}), ca = c.enum("PackageUpgradeError", {
  UnableToFetchPackage: c.struct("UnableToFetchPackage", { packageId: q }),
  NotAPackage: c.struct("NotAPackage", { objectId: q }),
  IncompatibleUpgrade: null,
  DigestDoesNotMatch: c.struct("DigestDoesNotMatch", { digest: c.vector(c.u8()) }),
  UnknownUpgradePolicy: c.struct("UnknownUpgradePolicy", { policy: c.u8() }),
  PackageIDDoesNotMatch: c.struct("PackageIDDoesNotMatch", {
    packageId: q,
    ticketId: q
  })
}), da = c.struct("ModuleId", {
  address: q,
  name: c.string()
}), xr = c.struct("MoveLocation", {
  module: da,
  function: c.u16(),
  instruction: c.u16(),
  functionName: c.option(c.string())
}), fa = c.enum("CommandArgumentError", {
  TypeMismatch: null,
  InvalidBCSBytes: null,
  InvalidUsageOfPureArg: null,
  InvalidArgumentToPrivateEntryFunction: null,
  IndexOutOfBounds: c.struct("IndexOutOfBounds", { idx: c.u16() }),
  SecondaryIndexOutOfBounds: c.struct("SecondaryIndexOutOfBounds", {
    resultIdx: c.u16(),
    secondaryIdx: c.u16()
  }),
  InvalidResultArity: c.struct("InvalidResultArity", { resultIdx: c.u16() }),
  InvalidGasCoinUsage: null,
  InvalidValueUsage: null,
  InvalidObjectByValue: null,
  InvalidObjectByMutRef: null,
  SharedObjectOperationNotAllowed: null
}), pa = c.enum("TypeArgumentError", {
  TypeNotFound: null,
  ConstraintNotSatisfied: null
}), ha = c.enum("ExecutionFailureStatus", {
  InsufficientGas: null,
  InvalidGasObject: null,
  InvariantViolation: null,
  FeatureNotYetSupported: null,
  MoveObjectTooBig: c.struct("MoveObjectTooBig", {
    objectSize: c.u64(),
    maxObjectSize: c.u64()
  }),
  MovePackageTooBig: c.struct("MovePackageTooBig", {
    objectSize: c.u64(),
    maxObjectSize: c.u64()
  }),
  CircularObjectOwnership: c.struct("CircularObjectOwnership", { object: q }),
  InsufficientCoinBalance: null,
  CoinBalanceOverflow: null,
  PublishErrorNonZeroAddress: null,
  SuiMoveVerificationError: null,
  MovePrimitiveRuntimeError: c.option(xr),
  MoveAbort: c.tuple([xr, c.u64()]),
  VMVerificationOrDeserializationError: null,
  VMInvariantViolation: null,
  FunctionNotFound: null,
  ArityMismatch: null,
  TypeArityMismatch: null,
  NonEntryFunctionInvoked: null,
  CommandArgumentError: c.struct("CommandArgumentError", {
    argIdx: c.u16(),
    kind: fa
  }),
  TypeArgumentError: c.struct("TypeArgumentError", {
    argumentIdx: c.u16(),
    kind: pa
  }),
  UnusedValueWithoutDrop: c.struct("UnusedValueWithoutDrop", {
    resultIdx: c.u16(),
    secondaryIdx: c.u16()
  }),
  InvalidPublicFunctionReturnType: c.struct("InvalidPublicFunctionReturnType", {
    idx: c.u16()
  }),
  InvalidTransferObject: null,
  EffectsTooLarge: c.struct("EffectsTooLarge", { currentSize: c.u64(), maxSize: c.u64() }),
  PublishUpgradeMissingDependency: null,
  PublishUpgradeDependencyDowngrade: null,
  PackageUpgradeError: c.struct("PackageUpgradeError", { upgradeError: ca }),
  WrittenObjectsTooLarge: c.struct("WrittenObjectsTooLarge", {
    currentSize: c.u64(),
    maxSize: c.u64()
  }),
  CertificateDenied: null,
  SuiMoveVerificationTimedout: null,
  SharedObjectOperationNotAllowed: null,
  InputObjectDeleted: null
}), Bi = c.enum("ExecutionStatus", {
  Success: null,
  Failed: c.struct("ExecutionFailed", {
    error: ha,
    command: c.option(c.u64())
  })
}), Di = c.struct("GasCostSummary", {
  computationCost: c.u64(),
  storageCost: c.u64(),
  storageRebate: c.u64(),
  nonRefundableStorageFee: c.u64()
}), yt = c.enum("Owner", {
  AddressOwner: q,
  ObjectOwner: q,
  Shared: c.struct("Shared", {
    initialSharedVersion: c.u64()
  }),
  Immutable: null
}), va = c.struct("TransactionEffectsV1", {
  status: Bi,
  executedEpoch: c.u64(),
  gasUsed: Di,
  modifiedAtVersions: c.vector(c.tuple([q, c.u64()])),
  sharedObjects: c.vector(we),
  transactionDigest: xe,
  created: c.vector(c.tuple([we, yt])),
  mutated: c.vector(c.tuple([we, yt])),
  unwrapped: c.vector(c.tuple([we, yt])),
  deleted: c.vector(we),
  unwrappedThenDeleted: c.vector(we),
  wrapped: c.vector(we),
  gasObject: c.tuple([we, yt]),
  eventsDigest: c.option(xe),
  dependencies: c.vector(xe)
}), or = c.tuple([c.u64(), xe]), ga = c.enum("ObjectIn", {
  NotExist: null,
  Exist: c.tuple([or, yt])
}), ma = c.enum("ObjectOut", {
  NotExist: null,
  ObjectWrite: c.tuple([xe, yt]),
  PackageWrite: or
}), ba = c.enum("IDOperation", {
  None: null,
  Created: null,
  Deleted: null
}), ya = c.struct("EffectsObjectChange", {
  inputState: ga,
  outputState: ma,
  idOperation: ba
}), wa = c.enum("UnchangedSharedKind", {
  ReadOnlyRoot: or,
  MutateDeleted: c.u64(),
  ReadDeleted: c.u64(),
  Cancelled: c.u64(),
  PerEpochConfig: null
}), Sa = c.struct("TransactionEffectsV2", {
  status: Bi,
  executedEpoch: c.u64(),
  gasUsed: Di,
  transactionDigest: xe,
  gasObjectIndex: c.option(c.u32()),
  eventsDigest: c.option(xe),
  dependencies: c.vector(xe),
  lamportVersion: c.u64(),
  changedObjects: c.vector(c.tuple([q, ya])),
  unchangedSharedObjects: c.vector(c.tuple([q, wa])),
  auxDataDigest: c.option(xe)
}), Ea = c.enum("TransactionEffects", {
  V1: va,
  V2: Sa
}), A = {
  ...c,
  U8: c.u8(),
  U16: c.u16(),
  U32: c.u32(),
  U64: c.u64(),
  U128: c.u128(),
  U256: c.u256(),
  ULEB128: c.uleb128(),
  Bool: c.bool(),
  String: c.string(),
  Address: q,
  AppId: Ii,
  Argument: Pe,
  CallArg: gi,
  CompressedSignature: $i,
  GasData: Oi,
  Intent: xi,
  IntentMessage: Ci,
  IntentScope: Ai,
  IntentVersion: ji,
  MultiSig: oa,
  MultiSigPkMap: Pi,
  MultiSigPublicKey: Ri,
  ObjectArg: vi,
  ObjectDigest: xe,
  ProgrammableMoveCall: mi,
  ProgrammableTransaction: yi,
  PublicKey: Mi,
  SenderSignedData: ua,
  SenderSignedTransaction: Ui,
  SharedObjectRef: hi,
  StructTag: Ei,
  SuiObjectRef: we,
  Command: bi,
  TransactionData: ki,
  TransactionDataV1: Ti,
  TransactionExpiration: Si,
  TransactionKind: wi,
  TypeTag: ar,
  TransactionEffects: Ea
}, Oa = "…";
function Cr(e) {
  if (e.length <= 6)
    return e;
  const t = e.startsWith("0x") ? 2 : 0;
  return `0x${e.slice(t, t + 4)}${Oa}${e.slice(-4)}`;
}
BigInt(1e9);
const Ta = "0x1", _i = "0x2";
Lt("0x6");
const ka = `${_i}::sui::SUI`;
Lt("0x5");
const Aa = "object", ja = "ID", Ia = "ascii", xa = "String", Ca = "string", $a = "String", Ma = "option", Pa = "Option";
function Ra(e) {
  const t = typeof e.body == "object" && "datatype" in e.body ? e.body.datatype : null;
  return !!t && W(t.package) === W("0x2") && t.module === "tx_context" && t.type === "TxContext";
}
function Ln(e) {
  if (typeof e == "string")
    switch (e) {
      case "address":
        return A.Address;
      case "bool":
        return A.Bool;
      case "u8":
        return A.U8;
      case "u16":
        return A.U16;
      case "u32":
        return A.U32;
      case "u64":
        return A.U64;
      case "u128":
        return A.U128;
      case "u256":
        return A.U256;
      default:
        throw new Error(`Unknown type signature ${e}`);
    }
  if ("vector" in e) {
    if (e.vector === "u8")
      return A.vector(A.U8).transform({
        input: (n) => typeof n == "string" ? new TextEncoder().encode(n) : n,
        output: (n) => n
      });
    const t = Ln(e.vector);
    return t ? A.vector(t) : null;
  }
  if ("datatype" in e) {
    const t = W(e.datatype.package);
    if (t === W(Ta)) {
      if (e.datatype.module === Ia && e.datatype.type === xa || e.datatype.module === Ca && e.datatype.type === $a)
        return A.String;
      if (e.datatype.module === Ma && e.datatype.type === Pa) {
        const n = Ln(e.datatype.typeParameters[0]);
        return n ? A.vector(n) : null;
      }
    }
    if (t === W(_i) && e.datatype.module === Aa && e.datatype.type === ja)
      return A.Address;
  }
  return null;
}
function Ua(e) {
  return typeof e == "object" && "Reference" in e ? {
    ref: "&",
    body: Ut(e.Reference)
  } : typeof e == "object" && "MutableReference" in e ? {
    ref: "&mut",
    body: Ut(e.MutableReference)
  } : {
    ref: null,
    body: Ut(e)
  };
}
function Ut(e) {
  if (typeof e == "string")
    switch (e) {
      case "Address":
        return "address";
      case "Bool":
        return "bool";
      case "U8":
        return "u8";
      case "U16":
        return "u16";
      case "U32":
        return "u32";
      case "U64":
        return "u64";
      case "U128":
        return "u128";
      case "U256":
        return "u256";
      default:
        throw new Error(`Unexpected type ${e}`);
    }
  if ("Vector" in e)
    return { vector: Ut(e.Vector) };
  if ("Struct" in e)
    return {
      datatype: {
        package: e.Struct.address,
        module: e.Struct.module,
        type: e.Struct.name,
        typeParameters: e.Struct.typeArguments.map(Ut)
      }
    };
  if ("TypeParameter" in e)
    return { typeParameter: e.TypeParameter };
  throw new Error(`Unexpected type ${JSON.stringify(e)}`);
}
function Ba(e) {
  return {
    $kind: "Pure",
    Pure: {
      bytes: e instanceof Uint8Array ? Ee(e) : e.toBase64()
    }
  };
}
const He = {
  Pure: Ba,
  ObjectRef({ objectId: e, digest: t, version: n }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "ImmOrOwnedObject",
        ImmOrOwnedObject: {
          digest: t,
          version: n,
          objectId: W(e)
        }
      }
    };
  },
  SharedObjectRef({
    objectId: e,
    mutable: t,
    initialSharedVersion: n
  }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "SharedObject",
        SharedObject: {
          mutable: t,
          initialSharedVersion: n,
          objectId: W(e)
        }
      }
    };
  },
  ReceivingRef({ objectId: e, digest: t, version: n }) {
    return {
      $kind: "Object",
      Object: {
        $kind: "Receiving",
        Receiving: {
          digest: t,
          version: n,
          objectId: W(e)
        }
      }
    };
  }
};
var Ne;
function Da(e) {
  return {
    lang: (e == null ? void 0 : e.lang) ?? (Ne == null ? void 0 : Ne.lang),
    message: e == null ? void 0 : e.message,
    abortEarly: (e == null ? void 0 : e.abortEarly) ?? (Ne == null ? void 0 : Ne.abortEarly),
    abortPipeEarly: (e == null ? void 0 : e.abortPipeEarly) ?? (Ne == null ? void 0 : Ne.abortPipeEarly)
  };
}
var In;
function _a(e) {
  return In == null ? void 0 : In.get(e);
}
var xn;
function Na(e) {
  return xn == null ? void 0 : xn.get(e);
}
var Cn;
function La(e, t) {
  var n;
  return (n = Cn == null ? void 0 : Cn.get(e)) == null ? void 0 : n.get(t);
}
function Ni(e) {
  var n, r;
  const t = typeof e;
  return t === "string" ? `"${e}"` : t === "number" || t === "bigint" || t === "boolean" ? `${e}` : t === "object" || t === "function" ? (e && ((r = (n = Object.getPrototypeOf(e)) == null ? void 0 : n.constructor) == null ? void 0 : r.name)) ?? "null" : t;
}
function he(e, t, n, r, i) {
  const s = i && "input" in i ? i.input : n.value, a = (i == null ? void 0 : i.expected) ?? e.expects ?? null, o = (i == null ? void 0 : i.received) ?? Ni(s), l = {
    kind: e.kind,
    type: e.type,
    input: s,
    expected: a,
    received: o,
    message: `Invalid ${t}: ${a ? `Expected ${a} but r` : "R"}eceived ${o}`,
    // @ts-expect-error
    requirement: e.requirement,
    path: i == null ? void 0 : i.path,
    issues: i == null ? void 0 : i.issues,
    lang: r.lang,
    abortEarly: r.abortEarly,
    abortPipeEarly: r.abortPipeEarly
  }, d = e.kind === "schema", u = (i == null ? void 0 : i.message) ?? // @ts-expect-error
  e.message ?? La(e.reference, l.lang) ?? (d ? Na(l.lang) : null) ?? r.message ?? _a(l.lang);
  u && (l.message = typeof u == "function" ? u(l) : u), d && (n.typed = !1), n.issues ? n.issues.push(l) : n.issues = [l];
}
function Fa(e, t) {
  return Object.hasOwn(e, t) && t !== "__proto__" && t !== "prototype" && t !== "constructor";
}
var Va = class extends Error {
  /**
   * Creates a Valibot error with useful information.
   *
   * @param issues The error issues.
   */
  constructor(t) {
    super(t[0].message);
    /**
     * The error issues.
     */
    jr(this, "issues");
    this.name = "ValiError", this.issues = t;
  }
};
function Gt(e, t) {
  return {
    kind: "validation",
    type: "check",
    reference: Gt,
    async: !1,
    expects: null,
    requirement: e,
    message: t,
    _run(n, r) {
      return n.typed && !this.requirement(n.value) && he(this, "input", n, r), n;
    }
  };
}
function G(e) {
  return {
    kind: "validation",
    type: "integer",
    reference: G,
    async: !1,
    expects: null,
    requirement: Number.isInteger,
    message: e,
    _run(t, n) {
      return t.typed && !this.requirement(t.value) && he(this, "integer", t, n), t;
    }
  };
}
function bn(e) {
  return {
    kind: "transformation",
    type: "transform",
    reference: bn,
    async: !1,
    operation: e,
    _run(t) {
      return t.value = this.operation(t.value), t;
    }
  };
}
function lr(e, t, n) {
  return typeof e.default == "function" ? (
    // @ts-expect-error
    e.default(t, n)
  ) : (
    // @ts-expect-error
    e.default
  );
}
function Fn(e, t) {
  return !e._run({ typed: !1, value: t }, { abortEarly: !0 }).issues;
}
function T(e, t) {
  return {
    kind: "schema",
    type: "array",
    reference: T,
    expects: "Array",
    async: !1,
    item: e,
    message: t,
    _run(n, r) {
      var s;
      const i = n.value;
      if (Array.isArray(i)) {
        n.typed = !0, n.value = [];
        for (let a = 0; a < i.length; a++) {
          const o = i[a], l = this.item._run({ typed: !1, value: o }, r);
          if (l.issues) {
            const d = {
              type: "array",
              origin: "value",
              input: i,
              key: a,
              value: o
            };
            for (const u of l.issues)
              u.path ? u.path.unshift(d) : u.path = [d], (s = n.issues) == null || s.push(u);
            if (n.issues || (n.issues = l.issues), r.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          l.typed || (n.typed = !1), n.value.push(l.value);
        }
      } else
        he(this, "type", n, r);
      return n;
    }
  };
}
function ur(e) {
  return {
    kind: "schema",
    type: "bigint",
    reference: ur,
    expects: "bigint",
    async: !1,
    message: e,
    _run(t, n) {
      return typeof t.value == "bigint" ? t.typed = !0 : he(this, "type", t, n), t;
    }
  };
}
function yn(e) {
  return {
    kind: "schema",
    type: "boolean",
    reference: yn,
    expects: "boolean",
    async: !1,
    message: e,
    _run(t, n) {
      return typeof t.value == "boolean" ? t.typed = !0 : he(this, "type", t, n), t;
    }
  };
}
function Ft(e) {
  return {
    kind: "schema",
    type: "lazy",
    reference: Ft,
    expects: "unknown",
    async: !1,
    getter: e,
    _run(t, n) {
      return this.getter(t.value)._run(t, n);
    }
  };
}
function k(e, t) {
  return {
    kind: "schema",
    type: "literal",
    reference: k,
    expects: Ni(e),
    async: !1,
    literal: e,
    message: t,
    _run(n, r) {
      return n.value === this.literal ? n.typed = !0 : he(this, "type", n, r), n;
    }
  };
}
function B(e, ...t) {
  const n = {
    kind: "schema",
    type: "nullable",
    reference: B,
    expects: `${e.expects} | null`,
    async: !1,
    wrapped: e,
    _run(r, i) {
      return r.value === null && ("default" in this && (r.value = lr(
        this,
        r,
        i
      )), r.value === null) ? (r.typed = !0, r) : this.wrapped._run(r, i);
    }
  };
  return 0 in t && (n.default = t[0]), n;
}
function St(e, ...t) {
  const n = {
    kind: "schema",
    type: "nullish",
    reference: St,
    expects: `${e.expects} | null | undefined`,
    async: !1,
    wrapped: e,
    _run(r, i) {
      return (r.value === null || r.value === void 0) && ("default" in this && (r.value = lr(
        this,
        r,
        i
      )), r.value === null || r.value === void 0) ? (r.typed = !0, r) : this.wrapped._run(r, i);
    }
  };
  return 0 in t && (n.default = t[0]), n;
}
function V(e) {
  return {
    kind: "schema",
    type: "number",
    reference: V,
    expects: "number",
    async: !1,
    message: e,
    _run(t, n) {
      return typeof t.value == "number" && !isNaN(t.value) ? t.typed = !0 : he(this, "type", t, n), t;
    }
  };
}
function b(e, t) {
  return {
    kind: "schema",
    type: "object",
    reference: b,
    expects: "Object",
    async: !1,
    entries: e,
    message: t,
    _run(n, r) {
      var s;
      const i = n.value;
      if (i && typeof i == "object") {
        n.typed = !0, n.value = {};
        for (const a in this.entries) {
          const o = i[a], l = this.entries[a]._run(
            { typed: !1, value: o },
            r
          );
          if (l.issues) {
            const d = {
              type: "object",
              origin: "value",
              input: i,
              key: a,
              value: o
            };
            for (const u of l.issues)
              u.path ? u.path.unshift(d) : u.path = [d], (s = n.issues) == null || s.push(u);
            if (n.issues || (n.issues = l.issues), r.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          l.typed || (n.typed = !1), (l.value !== void 0 || a in i) && (n.value[a] = l.value);
        }
      } else
        he(this, "type", n, r);
      return n;
    }
  };
}
function re(e, ...t) {
  const n = {
    kind: "schema",
    type: "optional",
    reference: re,
    expects: `${e.expects} | undefined`,
    async: !1,
    wrapped: e,
    _run(r, i) {
      return r.value === void 0 && ("default" in this && (r.value = lr(
        this,
        r,
        i
      )), r.value === void 0) ? (r.typed = !0, r) : this.wrapped._run(r, i);
    }
  };
  return 0 in t && (n.default = t[0]), n;
}
function Vt(e, t, n) {
  return {
    kind: "schema",
    type: "record",
    reference: Vt,
    expects: "Object",
    async: !1,
    key: e,
    value: t,
    message: n,
    _run(r, i) {
      var a, o;
      const s = r.value;
      if (s && typeof s == "object") {
        r.typed = !0, r.value = {};
        for (const l in s)
          if (Fa(s, l)) {
            const d = s[l], u = this.key._run(
              { typed: !1, value: l },
              i
            );
            if (u.issues) {
              const p = {
                type: "object",
                origin: "key",
                input: s,
                key: l,
                value: d
              };
              for (const v of u.issues)
                v.path = [p], (a = r.issues) == null || a.push(v);
              if (r.issues || (r.issues = u.issues), i.abortEarly) {
                r.typed = !1;
                break;
              }
            }
            const f = this.value._run(
              { typed: !1, value: d },
              i
            );
            if (f.issues) {
              const p = {
                type: "object",
                origin: "value",
                input: s,
                key: l,
                value: d
              };
              for (const v of f.issues)
                v.path ? v.path.unshift(p) : v.path = [p], (o = r.issues) == null || o.push(v);
              if (r.issues || (r.issues = f.issues), i.abortEarly) {
                r.typed = !1;
                break;
              }
            }
            (!u.typed || !f.typed) && (r.typed = !1), u.typed && (r.value[u.value] = f.value);
          }
      } else
        he(this, "type", r, i);
      return r;
    }
  };
}
function x(e) {
  return {
    kind: "schema",
    type: "string",
    reference: x,
    expects: "string",
    async: !1,
    message: e,
    _run(t, n) {
      return typeof t.value == "string" ? t.typed = !0 : he(this, "type", t, n), t;
    }
  };
}
function cr(e, t) {
  return {
    kind: "schema",
    type: "tuple",
    reference: cr,
    expects: "Array",
    async: !1,
    items: e,
    message: t,
    _run(n, r) {
      var s;
      const i = n.value;
      if (Array.isArray(i)) {
        n.typed = !0, n.value = [];
        for (let a = 0; a < this.items.length; a++) {
          const o = i[a], l = this.items[a]._run(
            { typed: !1, value: o },
            r
          );
          if (l.issues) {
            const d = {
              type: "array",
              origin: "value",
              input: i,
              key: a,
              value: o
            };
            for (const u of l.issues)
              u.path ? u.path.unshift(d) : u.path = [d], (s = n.issues) == null || s.push(u);
            if (n.issues || (n.issues = l.issues), r.abortEarly) {
              n.typed = !1;
              break;
            }
          }
          l.typed || (n.typed = !1), n.value.push(l.value);
        }
      } else
        he(this, "type", n, r);
      return n;
    }
  };
}
function $r(e) {
  let t;
  if (e)
    for (const n of e)
      t ? t.push(...n.issues) : t = n.issues;
  return t;
}
function te(e, t) {
  return {
    kind: "schema",
    type: "union",
    reference: te,
    expects: [...new Set(e.map((n) => n.expects))].join(" | ") || "never",
    async: !1,
    options: e,
    message: t,
    _run(n, r) {
      let i, s, a;
      for (const o of this.options) {
        const l = o._run(
          { typed: !1, value: n.value },
          r
        );
        if (l.typed)
          if (l.issues)
            s ? s.push(l) : s = [l];
          else {
            i = l;
            break;
          }
        else
          a ? a.push(l) : a = [l];
      }
      if (i)
        return i;
      if (s) {
        if (s.length === 1)
          return s[0];
        he(this, "type", n, r, {
          issues: $r(s)
        }), n.typed = !0;
      } else {
        if ((a == null ? void 0 : a.length) === 1)
          return a[0];
        he(this, "type", n, r, {
          issues: $r(a)
        });
      }
      return n;
    }
  };
}
function pt() {
  return {
    kind: "schema",
    type: "unknown",
    reference: pt,
    expects: "unknown",
    async: !1,
    _run(e) {
      return e.typed = !0, e;
    }
  };
}
function z(e, t, n) {
  const r = e._run(
    { typed: !1, value: t },
    Da(n)
  );
  if (r.issues)
    throw new Va(r.issues);
  return r.value;
}
function _(...e) {
  return {
    ...e[0],
    pipe: e,
    _run(t, n) {
      for (let r = 0; r < e.length; r++) {
        if (t.issues && (e[r].kind === "schema" || e[r].kind === "transformation")) {
          t.typed = !1;
          break;
        }
        (!t.issues || !n.abortEarly && !n.abortPipeEarly) && (t = e[r]._run(t, n));
      }
      return t;
    }
  };
}
function vt(e) {
  const t = Object.entries(e).map(([n, r]) => b({ [n]: r }));
  return _(
    te(t),
    bn((n) => ({
      ...n,
      $kind: Object.keys(n)[0]
    }))
  );
}
const Ot = _(
  x(),
  bn((e) => W(e)),
  Gt(pi)
), fe = Ot, ht = x(), ue = _(
  te([x(), _(V(), G())]),
  Gt((e) => {
    try {
      return BigInt(e), BigInt(e) >= 0 && BigInt(e) <= 18446744073709551615n;
    } catch {
      return !1;
    }
  }, "Invalid u64")
), nt = b({
  objectId: Ot,
  version: ue,
  digest: x()
}), F = _(
  te([
    b({ GasCoin: k(!0) }),
    b({ Input: _(V(), G()), type: re(k("pure")) }),
    b({ Input: _(V(), G()), type: re(k("object")) }),
    b({ Result: _(V(), G()) }),
    b({ NestedResult: cr([_(V(), G()), _(V(), G())]) })
  ]),
  bn((e) => ({
    ...e,
    $kind: Object.keys(e)[0]
  }))
  // Defined manually to add `type?: 'pure' | 'object'` to Input
), za = b({
  budget: B(ue),
  price: B(ue),
  owner: B(Ot),
  payment: B(T(nt))
}), Vn = te([
  k("address"),
  k("bool"),
  k("u8"),
  k("u16"),
  k("u32"),
  k("u64"),
  k("u128"),
  k("u256"),
  b({ vector: Ft(() => Vn) }),
  b({
    datatype: b({
      package: x(),
      module: x(),
      type: x(),
      typeParameters: T(Ft(() => Vn))
    })
  }),
  b({ typeParameter: _(V(), G()) })
]), Wa = b({
  ref: B(te([k("&"), k("&mut")])),
  body: Vn
}), Ga = b({
  package: fe,
  module: x(),
  function: x(),
  // snake case in rust
  typeArguments: T(x()),
  arguments: T(F),
  _argumentTypes: re(B(T(Wa)))
}), Ha = b({
  name: x(),
  inputs: Vt(x(), te([F, T(F)])),
  data: Vt(x(), pt())
}), Ka = vt({
  MoveCall: Ga,
  TransferObjects: b({
    objects: T(F),
    address: F
  }),
  SplitCoins: b({
    coin: F,
    amounts: T(F)
  }),
  MergeCoins: b({
    destination: F,
    sources: T(F)
  }),
  Publish: b({
    modules: T(ht),
    dependencies: T(fe)
  }),
  MakeMoveVec: b({
    type: B(x()),
    elements: T(F)
  }),
  Upgrade: b({
    modules: T(ht),
    dependencies: T(fe),
    package: fe,
    ticket: F
  }),
  $Intent: Ha
}), Li = vt({
  ImmOrOwnedObject: nt,
  SharedObject: b({
    objectId: fe,
    // snake case in rust
    initialSharedVersion: ue,
    mutable: yn()
  }),
  Receiving: nt
}), qa = vt({
  Object: Li,
  Pure: b({
    bytes: ht
  }),
  UnresolvedPure: b({
    value: pt()
  }),
  UnresolvedObject: b({
    objectId: fe,
    version: re(B(ue)),
    digest: re(B(x())),
    initialSharedVersion: re(B(ue))
  })
}), Mr = vt({
  Object: Li,
  Pure: b({
    bytes: ht
  })
}), Fi = vt({
  None: k(!0),
  Epoch: ue
}), an = b({
  version: k(2),
  sender: St(Ot),
  expiration: St(Fi),
  gasData: za,
  inputs: T(qa),
  commands: T(Ka)
}), rt = {
  MoveCall(e) {
    const [t, n = "", r = ""] = "target" in e ? e.target.split("::") : [e.package, e.module, e.function];
    return {
      $kind: "MoveCall",
      MoveCall: {
        package: t,
        module: n,
        function: r,
        typeArguments: e.typeArguments ?? [],
        arguments: e.arguments ?? []
      }
    };
  },
  TransferObjects(e, t) {
    return {
      $kind: "TransferObjects",
      TransferObjects: {
        objects: e.map((n) => z(F, n)),
        address: z(F, t)
      }
    };
  },
  SplitCoins(e, t) {
    return {
      $kind: "SplitCoins",
      SplitCoins: {
        coin: z(F, e),
        amounts: t.map((n) => z(F, n))
      }
    };
  },
  MergeCoins(e, t) {
    return {
      $kind: "MergeCoins",
      MergeCoins: {
        destination: z(F, e),
        sources: t.map((n) => z(F, n))
      }
    };
  },
  Publish({
    modules: e,
    dependencies: t
  }) {
    return {
      $kind: "Publish",
      Publish: {
        modules: e.map(
          (n) => typeof n == "string" ? n : Ee(new Uint8Array(n))
        ),
        dependencies: t.map((n) => Lt(n))
      }
    };
  },
  Upgrade({
    modules: e,
    dependencies: t,
    package: n,
    ticket: r
  }) {
    return {
      $kind: "Upgrade",
      Upgrade: {
        modules: e.map(
          (i) => typeof i == "string" ? i : Ee(new Uint8Array(i))
        ),
        dependencies: t.map((i) => Lt(i)),
        package: n,
        ticket: z(F, r)
      }
    };
  },
  MakeMoveVec({
    type: e,
    elements: t
  }) {
    return {
      $kind: "MakeMoveVec",
      MakeMoveVec: {
        type: e ?? null,
        elements: t.map((n) => z(F, n))
      }
    };
  },
  Intent({
    name: e,
    inputs: t = {},
    data: n = {}
  }) {
    return {
      $kind: "$Intent",
      $Intent: {
        name: e,
        inputs: Object.fromEntries(
          Object.entries(t).map(([r, i]) => [
            r,
            Array.isArray(i) ? i.map((s) => z(F, s)) : z(F, i)
          ])
        ),
        data: n
      }
    };
  }
}, zn = b({
  digest: x(),
  objectId: x(),
  version: te([_(V(), G()), x(), ur()])
}), Ja = vt({
  ImmOrOwned: zn,
  Shared: b({
    objectId: fe,
    initialSharedVersion: ue,
    mutable: yn()
  }),
  Receiving: zn
}), Pr = vt({
  Object: Ja,
  Pure: T(_(V(), G()))
}), Vi = te([
  b({
    kind: k("Input"),
    index: _(V(), G()),
    value: pt(),
    type: re(k("object"))
  }),
  b({
    kind: k("Input"),
    index: _(V(), G()),
    value: pt(),
    type: k("pure")
  })
]), Xa = te([
  b({ Epoch: _(V(), G()) }),
  b({ None: B(k(!0)) })
]), Rr = _(
  te([V(), x(), ur()]),
  Gt((e) => {
    if (!["string", "number", "bigint"].includes(typeof e)) return !1;
    try {
      return BigInt(e), !0;
    } catch {
      return !1;
    }
  })
), dr = te([
  b({ bool: B(k(!0)) }),
  b({ u8: B(k(!0)) }),
  b({ u64: B(k(!0)) }),
  b({ u128: B(k(!0)) }),
  b({ address: B(k(!0)) }),
  b({ signer: B(k(!0)) }),
  b({ vector: Ft(() => dr) }),
  b({ struct: Ft(() => Ya) }),
  b({ u16: B(k(!0)) }),
  b({ u32: B(k(!0)) }),
  b({ u256: B(k(!0)) })
]), Ya = b({
  address: x(),
  module: x(),
  name: x(),
  typeParams: T(dr)
}), Za = b({
  budget: re(Rr),
  price: re(Rr),
  payment: re(T(zn)),
  owner: re(x())
}), Qa = [
  Vi,
  b({ kind: k("GasCoin") }),
  b({ kind: k("Result"), index: _(V(), G()) }),
  b({
    kind: k("NestedResult"),
    index: _(V(), G()),
    resultIndex: _(V(), G())
  })
], Ke = te([...Qa]), eo = b({
  kind: k("MoveCall"),
  target: _(
    x(),
    Gt((e) => e.split("::").length === 3)
  ),
  typeArguments: T(x()),
  arguments: T(Ke)
}), to = b({
  kind: k("TransferObjects"),
  objects: T(Ke),
  address: Ke
}), no = b({
  kind: k("SplitCoins"),
  coin: Ke,
  amounts: T(Ke)
}), ro = b({
  kind: k("MergeCoins"),
  destination: Ke,
  sources: T(Ke)
}), io = b({
  kind: k("MakeMoveVec"),
  type: te([b({ Some: dr }), b({ None: B(k(!0)) })]),
  objects: T(Ke)
}), so = b({
  kind: k("Publish"),
  modules: T(T(_(V(), G()))),
  dependencies: T(x())
}), ao = b({
  kind: k("Upgrade"),
  modules: T(T(_(V(), G()))),
  dependencies: T(x()),
  packageId: x(),
  ticket: Ke
}), oo = [
  eo,
  to,
  no,
  ro,
  so,
  ao,
  io
], lo = te([...oo]);
b({
  version: k(1),
  sender: re(x()),
  expiration: St(Xa),
  gasConfig: Za,
  inputs: T(Vi),
  transactions: T(lo)
});
function Ur(e) {
  var n;
  const t = e.inputs.map(
    (r, i) => {
      if (r.Object)
        return {
          kind: "Input",
          index: i,
          value: {
            Object: r.Object.ImmOrOwnedObject ? {
              ImmOrOwned: r.Object.ImmOrOwnedObject
            } : r.Object.Receiving ? {
              Receiving: {
                digest: r.Object.Receiving.digest,
                version: r.Object.Receiving.version,
                objectId: r.Object.Receiving.objectId
              }
            } : {
              Shared: {
                mutable: r.Object.SharedObject.mutable,
                initialSharedVersion: r.Object.SharedObject.initialSharedVersion,
                objectId: r.Object.SharedObject.objectId
              }
            }
          },
          type: "object"
        };
      if (r.Pure)
        return {
          kind: "Input",
          index: i,
          value: {
            Pure: Array.from(Be(r.Pure.bytes))
          },
          type: "pure"
        };
      if (r.UnresolvedPure)
        return {
          kind: "Input",
          type: "pure",
          index: i,
          value: r.UnresolvedPure.value
        };
      if (r.UnresolvedObject)
        return {
          kind: "Input",
          type: "object",
          index: i,
          value: r.UnresolvedObject.objectId
        };
      throw new Error("Invalid input");
    }
  );
  return {
    version: 1,
    sender: e.sender ?? void 0,
    expiration: ((n = e.expiration) == null ? void 0 : n.$kind) === "Epoch" ? { Epoch: Number(e.expiration.Epoch) } : e.expiration ? { None: !0 } : null,
    gasConfig: {
      owner: e.gasData.owner ?? void 0,
      budget: e.gasData.budget ?? void 0,
      price: e.gasData.price ?? void 0,
      payment: e.gasData.payment ?? void 0
    },
    inputs: t,
    transactions: e.commands.map((r) => {
      if (r.MakeMoveVec)
        return {
          kind: "MakeMoveVec",
          type: r.MakeMoveVec.type === null ? { None: !0 } : { Some: Re.parseFromStr(r.MakeMoveVec.type) },
          objects: r.MakeMoveVec.elements.map(
            (i) => Le(i, t)
          )
        };
      if (r.MergeCoins)
        return {
          kind: "MergeCoins",
          destination: Le(r.MergeCoins.destination, t),
          sources: r.MergeCoins.sources.map((i) => Le(i, t))
        };
      if (r.MoveCall)
        return {
          kind: "MoveCall",
          target: `${r.MoveCall.package}::${r.MoveCall.module}::${r.MoveCall.function}`,
          typeArguments: r.MoveCall.typeArguments,
          arguments: r.MoveCall.arguments.map(
            (i) => Le(i, t)
          )
        };
      if (r.Publish)
        return {
          kind: "Publish",
          modules: r.Publish.modules.map((i) => Array.from(Be(i))),
          dependencies: r.Publish.dependencies
        };
      if (r.SplitCoins)
        return {
          kind: "SplitCoins",
          coin: Le(r.SplitCoins.coin, t),
          amounts: r.SplitCoins.amounts.map((i) => Le(i, t))
        };
      if (r.TransferObjects)
        return {
          kind: "TransferObjects",
          objects: r.TransferObjects.objects.map(
            (i) => Le(i, t)
          ),
          address: Le(r.TransferObjects.address, t)
        };
      if (r.Upgrade)
        return {
          kind: "Upgrade",
          modules: r.Upgrade.modules.map((i) => Array.from(Be(i))),
          dependencies: r.Upgrade.dependencies,
          packageId: r.Upgrade.package,
          ticket: Le(r.Upgrade.ticket, t)
        };
      throw new Error(`Unknown transaction ${Object.keys(r)}`);
    })
  };
}
function Le(e, t) {
  if (e.$kind === "GasCoin")
    return { kind: "GasCoin" };
  if (e.$kind === "Result")
    return { kind: "Result", index: e.Result };
  if (e.$kind === "NestedResult")
    return { kind: "NestedResult", index: e.NestedResult[0], resultIndex: e.NestedResult[1] };
  if (e.$kind === "Input")
    return t[e.Input];
  throw new Error(`Invalid argument ${Object.keys(e)}`);
}
function uo(e) {
  var t, n, r;
  return z(an, {
    version: 2,
    sender: e.sender ?? null,
    expiration: e.expiration ? "Epoch" in e.expiration ? { Epoch: e.expiration.Epoch } : { None: !0 } : null,
    gasData: {
      owner: e.gasConfig.owner ?? null,
      budget: ((t = e.gasConfig.budget) == null ? void 0 : t.toString()) ?? null,
      price: ((n = e.gasConfig.price) == null ? void 0 : n.toString()) ?? null,
      payment: ((r = e.gasConfig.payment) == null ? void 0 : r.map((i) => ({
        digest: i.digest,
        objectId: i.objectId,
        version: i.version.toString()
      }))) ?? null
    },
    inputs: e.inputs.map((i) => {
      if (i.kind === "Input") {
        if (Fn(Pr, i.value)) {
          const s = z(Pr, i.value);
          if (s.Object) {
            if (s.Object.ImmOrOwned)
              return {
                Object: {
                  ImmOrOwnedObject: {
                    objectId: s.Object.ImmOrOwned.objectId,
                    version: String(s.Object.ImmOrOwned.version),
                    digest: s.Object.ImmOrOwned.digest
                  }
                }
              };
            if (s.Object.Shared)
              return {
                Object: {
                  SharedObject: {
                    mutable: s.Object.Shared.mutable ?? null,
                    initialSharedVersion: s.Object.Shared.initialSharedVersion,
                    objectId: s.Object.Shared.objectId
                  }
                }
              };
            if (s.Object.Receiving)
              return {
                Object: {
                  Receiving: {
                    digest: s.Object.Receiving.digest,
                    version: String(s.Object.Receiving.version),
                    objectId: s.Object.Receiving.objectId
                  }
                }
              };
            throw new Error("Invalid object input");
          }
          return {
            Pure: {
              bytes: Ee(new Uint8Array(s.Pure))
            }
          };
        }
        return i.type === "object" ? {
          UnresolvedObject: {
            objectId: i.value
          }
        } : {
          UnresolvedPure: {
            value: i.value
          }
        };
      }
      throw new Error("Invalid input");
    }),
    commands: e.transactions.map((i) => {
      switch (i.kind) {
        case "MakeMoveVec":
          return {
            MakeMoveVec: {
              type: "Some" in i.type ? Re.tagToString(i.type.Some) : null,
              elements: i.objects.map((s) => Fe(s))
            }
          };
        case "MergeCoins":
          return {
            MergeCoins: {
              destination: Fe(i.destination),
              sources: i.sources.map((s) => Fe(s))
            }
          };
        case "MoveCall": {
          const [s, a, o] = i.target.split("::");
          return {
            MoveCall: {
              package: s,
              module: a,
              function: o,
              typeArguments: i.typeArguments,
              arguments: i.arguments.map((l) => Fe(l))
            }
          };
        }
        case "Publish":
          return {
            Publish: {
              modules: i.modules.map((s) => Ee(Uint8Array.from(s))),
              dependencies: i.dependencies
            }
          };
        case "SplitCoins":
          return {
            SplitCoins: {
              coin: Fe(i.coin),
              amounts: i.amounts.map((s) => Fe(s))
            }
          };
        case "TransferObjects":
          return {
            TransferObjects: {
              objects: i.objects.map((s) => Fe(s)),
              address: Fe(i.address)
            }
          };
        case "Upgrade":
          return {
            Upgrade: {
              modules: i.modules.map((s) => Ee(Uint8Array.from(s))),
              dependencies: i.dependencies,
              package: i.packageId,
              ticket: Fe(i.ticket)
            }
          };
      }
      throw new Error(`Unknown transaction ${Object.keys(i)}`);
    })
  });
}
function Fe(e) {
  switch (e.kind) {
    case "GasCoin":
      return { GasCoin: !0 };
    case "Result":
      return { Result: e.index };
    case "NestedResult":
      return { NestedResult: [e.index, e.resultIndex] };
    case "Input":
      return { Input: e.index };
  }
}
function Ht(e) {
  return te(
    Object.entries(e).map(([t, n]) => b({ [t]: n }))
  );
}
const ke = Ht({
  GasCoin: k(!0),
  Input: _(V(), G()),
  Result: _(V(), G()),
  NestedResult: cr([_(V(), G()), _(V(), G())])
}), co = b({
  budget: B(ue),
  price: B(ue),
  owner: B(Ot),
  payment: B(T(nt))
}), fo = b({
  package: fe,
  module: x(),
  function: x(),
  // snake case in rust
  typeArguments: T(x()),
  arguments: T(ke)
}), po = b({
  name: x(),
  inputs: Vt(x(), te([ke, T(ke)])),
  data: Vt(x(), pt())
}), ho = Ht({
  MoveCall: fo,
  TransferObjects: b({
    objects: T(ke),
    address: ke
  }),
  SplitCoins: b({
    coin: ke,
    amounts: T(ke)
  }),
  MergeCoins: b({
    destination: ke,
    sources: T(ke)
  }),
  Publish: b({
    modules: T(ht),
    dependencies: T(fe)
  }),
  MakeMoveVec: b({
    type: B(x()),
    elements: T(ke)
  }),
  Upgrade: b({
    modules: T(ht),
    dependencies: T(fe),
    package: fe,
    ticket: ke
  }),
  $Intent: po
}), vo = Ht({
  ImmOrOwnedObject: nt,
  SharedObject: b({
    objectId: fe,
    // snake case in rust
    initialSharedVersion: ue,
    mutable: yn()
  }),
  Receiving: nt
}), go = Ht({
  Object: vo,
  Pure: b({
    bytes: ht
  }),
  UnresolvedPure: b({
    value: pt()
  }),
  UnresolvedObject: b({
    objectId: fe,
    version: re(B(ue)),
    digest: re(B(x())),
    initialSharedVersion: re(B(ue))
  })
}), mo = Ht({
  None: k(!0),
  Epoch: ue
}), bo = b({
  version: k(2),
  sender: St(Ot),
  expiration: St(mo),
  gasData: co,
  inputs: T(go),
  commands: T(ho)
}), yo = 50, wo = 1000n, So = 5e10;
async function Eo(e, t, n) {
  return await jo(e, t), await Ao(e, t), t.onlyTransactionKind || (await Oo(e, t), await To(e, t), await ko(e, t)), await Io(e), await n();
}
async function Oo(e, t) {
  e.gasConfig.price || (e.gasConfig.price = String(await Kt(t).getReferenceGasPrice()));
}
async function To(e, t) {
  if (e.gasConfig.budget)
    return;
  const n = await Kt(t).dryRunTransactionBlock({
    transactionBlock: e.build({
      overrides: {
        gasData: {
          budget: String(So),
          payment: []
        }
      }
    })
  });
  if (n.effects.status.status !== "success")
    throw new Error(
      `Dry run failed, could not automatically determine a budget: ${n.effects.status.error}`,
      { cause: n }
    );
  const r = wo * BigInt(e.gasConfig.price || 1n), i = BigInt(n.effects.gasUsed.computationCost) + r, s = i + BigInt(n.effects.gasUsed.storageCost) - BigInt(n.effects.gasUsed.storageRebate);
  e.gasConfig.budget = String(
    s > i ? s : i
  );
}
async function ko(e, t) {
  if (!e.gasConfig.payment) {
    const r = (await Kt(t).getCoins({
      owner: e.gasConfig.owner || e.sender,
      coinType: ka
    })).data.filter((i) => !e.inputs.find((a) => {
      var o;
      return (o = a.Object) != null && o.ImmOrOwnedObject ? i.coinObjectId === a.Object.ImmOrOwnedObject.objectId : !1;
    })).map((i) => ({
      objectId: i.coinObjectId,
      digest: i.digest,
      version: i.version
    }));
    if (!r.length)
      throw new Error("No valid gas coins found for the transaction.");
    e.gasConfig.payment = r.map((i) => z(nt, i));
  }
}
async function Ao(e, t) {
  const n = e.inputs.filter((u) => {
    var f;
    return u.UnresolvedObject && !(u.UnresolvedObject.version || (f = u.UnresolvedObject) != null && f.initialSharedVersion);
  }), r = [
    ...new Set(
      n.map((u) => Lt(u.UnresolvedObject.objectId))
    )
  ], i = r.length ? Mo(r, yo) : [], s = (await Promise.all(
    i.map(
      (u) => Kt(t).multiGetObjects({
        ids: u,
        options: { showOwner: !0 }
      })
    )
  )).flat(), a = new Map(
    r.map((u, f) => [u, s[f]])
  ), o = Array.from(a).filter(([u, f]) => f.error).map(([u, f]) => JSON.stringify(f.error));
  if (o.length)
    throw new Error(`The following input objects are invalid: ${o.join(", ")}`);
  const l = s.map((u) => {
    if (u.error || !u.data)
      throw new Error(`Failed to fetch object: ${u.error}`);
    const f = u.data.owner, p = f && typeof f == "object" && "Shared" in f ? f.Shared.initial_shared_version : null;
    return {
      objectId: u.data.objectId,
      digest: u.data.digest,
      version: u.data.version,
      initialSharedVersion: p
    };
  }), d = new Map(
    r.map((u, f) => [u, l[f]])
  );
  for (const [u, f] of e.inputs.entries()) {
    if (!f.UnresolvedObject)
      continue;
    let p;
    const v = W(f.UnresolvedObject.objectId), h = d.get(v);
    f.UnresolvedObject.initialSharedVersion ?? (h == null ? void 0 : h.initialSharedVersion) ? p = He.SharedObjectRef({
      objectId: v,
      initialSharedVersion: f.UnresolvedObject.initialSharedVersion || (h == null ? void 0 : h.initialSharedVersion),
      mutable: xo(e, u)
    }) : Co(e, u) && (p = He.ReceivingRef(
      {
        objectId: v,
        digest: f.UnresolvedObject.digest ?? (h == null ? void 0 : h.digest),
        version: f.UnresolvedObject.version ?? (h == null ? void 0 : h.version)
      }
    )), e.inputs[e.inputs.indexOf(f)] = p ?? He.ObjectRef({
      objectId: v,
      digest: f.UnresolvedObject.digest ?? (h == null ? void 0 : h.digest),
      version: f.UnresolvedObject.version ?? (h == null ? void 0 : h.version)
    });
  }
}
async function jo(e, t) {
  const { inputs: n, commands: r } = e, i = [], s = /* @__PURE__ */ new Set();
  r.forEach((o) => {
    if (o.MoveCall) {
      if (o.MoveCall._argumentTypes)
        return;
      if (o.MoveCall.arguments.map((u) => u.$kind === "Input" ? e.inputs[u.Input] : null).some(
        (u) => (u == null ? void 0 : u.UnresolvedPure) || (u == null ? void 0 : u.UnresolvedObject)
      )) {
        const u = `${o.MoveCall.package}::${o.MoveCall.module}::${o.MoveCall.function}`;
        s.add(u), i.push(o.MoveCall);
      }
    }
    switch (o.$kind) {
      case "SplitCoins":
        o.SplitCoins.amounts.forEach((l) => {
          Br(l, A.U64, e);
        });
        break;
      case "TransferObjects":
        Br(o.TransferObjects.address, A.Address, e);
        break;
    }
  });
  const a = /* @__PURE__ */ new Map();
  if (s.size > 0) {
    const o = Kt(t);
    await Promise.all(
      [...s].map(async (l) => {
        const [d, u, f] = l.split("::"), p = await o.getNormalizedMoveFunction({
          package: d,
          module: u,
          function: f
        });
        a.set(
          l,
          p.parameters.map((v) => Ua(v))
        );
      })
    );
  }
  i.length && await Promise.all(
    i.map(async (o) => {
      const l = a.get(
        `${o.package}::${o.module}::${o.function}`
      );
      if (!l)
        return;
      const u = l.length > 0 && Ra(l.at(-1)) ? l.slice(0, l.length - 1) : l;
      o._argumentTypes = u;
    })
  ), r.forEach((o) => {
    if (!o.MoveCall)
      return;
    const l = o.MoveCall, d = `${l.package}::${l.module}::${l.function}`, u = l._argumentTypes;
    if (u) {
      if (u.length !== o.MoveCall.arguments.length)
        throw new Error(`Incorrect number of arguments for ${d}`);
      u.forEach((f, p) => {
        var w, $;
        const v = l.arguments[p];
        if (v.$kind !== "Input") return;
        const h = n[v.Input];
        if (!h.UnresolvedPure && !h.UnresolvedObject)
          return;
        const m = ((w = h.UnresolvedPure) == null ? void 0 : w.value) ?? (($ = h.UnresolvedObject) == null ? void 0 : $.objectId), g = Ln(f.body);
        if (g) {
          v.type = "pure", n[n.indexOf(h)] = He.Pure(g.serialize(m));
          return;
        }
        if (typeof m != "string")
          throw new Error(
            `Expect the argument to be an object id string, got ${JSON.stringify(
              m,
              null,
              2
            )}`
          );
        v.type = "object";
        const S = h.UnresolvedPure ? {
          $kind: "UnresolvedObject",
          UnresolvedObject: {
            objectId: m
          }
        } : h;
        n[v.Input] = S;
      });
    }
  });
}
function Io(e) {
  e.inputs.forEach((t, n) => {
    if (t.$kind !== "Object" && t.$kind !== "Pure")
      throw new Error(
        `Input at index ${n} has not been resolved.  Expected a Pure or Object input, but found ${JSON.stringify(
          t
        )}`
      );
  });
}
function Br(e, t, n) {
  if (e.$kind !== "Input")
    return;
  const r = n.inputs[e.Input];
  r.$kind === "UnresolvedPure" && (n.inputs[e.Input] = He.Pure(t.serialize(r.UnresolvedPure.value)));
}
function xo(e, t) {
  let n = !1;
  return e.getInputUses(t, (r, i) => {
    if (i.MoveCall && i.MoveCall._argumentTypes) {
      const s = i.MoveCall.arguments.indexOf(r);
      n = i.MoveCall._argumentTypes[s].ref !== "&" || n;
    }
    (i.$kind === "MakeMoveVec" || i.$kind === "MergeCoins" || i.$kind === "SplitCoins") && (n = !0);
  }), n;
}
function Co(e, t) {
  let n = !1;
  return e.getInputUses(t, (r, i) => {
    if (i.MoveCall && i.MoveCall._argumentTypes) {
      const s = i.MoveCall.arguments.indexOf(r);
      n = $o(i.MoveCall._argumentTypes[s]) || n;
    }
  }), n;
}
function $o(e) {
  return typeof e.body != "object" || !("datatype" in e.body) ? !1 : e.body.datatype.package === "0x2" && e.body.datatype.module === "transfer" && e.body.datatype.type === "Receiving";
}
function Kt(e) {
  if (!e.client)
    throw new Error(
      "No provider passed to Transaction#build, but transaction data was not sufficient to build offline."
    );
  return e.client;
}
function Mo(e, t) {
  return Array.from(
    { length: Math.ceil(e.length / t) },
    (n, r) => e.slice(r * t, r * t + t)
  );
}
function Po(e) {
  function t(n) {
    return e(n);
  }
  return t.system = () => t("0x5"), t.clock = () => t("0x6"), t.random = () => t("0x8"), t.denyList = () => t("0x403"), t;
}
function Ro(e) {
  function t(n, r) {
    if (typeof n == "string")
      return e(Bt(n).serialize(r));
    if (n instanceof Uint8Array || rr(n))
      return e(n);
    throw new Error("tx.pure must be called either a bcs type name, or a serialized bcs value");
  }
  return t.u8 = (n) => e(A.U8.serialize(n)), t.u16 = (n) => e(A.U16.serialize(n)), t.u32 = (n) => e(A.U32.serialize(n)), t.u64 = (n) => e(A.U64.serialize(n)), t.u128 = (n) => e(A.U128.serialize(n)), t.u256 = (n) => e(A.U256.serialize(n)), t.bool = (n) => e(A.Bool.serialize(n)), t.string = (n) => e(A.String.serialize(n)), t.address = (n) => e(A.Address.serialize(n)), t.id = t.address, t.vector = (n, r) => e(A.vector(Bt(n)).serialize(r)), t.option = (n, r) => e(A.option(Bt(n)).serialize(r)), t;
}
function Bt(e) {
  switch (e) {
    case "u8":
      return A.u8();
    case "u16":
      return A.u16();
    case "u32":
      return A.u32();
    case "u64":
      return A.u64();
    case "u128":
      return A.u128();
    case "u256":
      return A.u256();
    case "bool":
      return A.bool();
    case "string":
      return A.string();
    case "id":
    case "address":
      return A.Address;
  }
  const t = e.match(/^(vector|option)<(.+)>$/);
  if (t) {
    const [n, r] = t.slice(1);
    return n === "vector" ? A.vector(Bt(r)) : A.option(Bt(r));
  }
  throw new Error(`Invalid Pure type name: ${e}`);
}
function $n(e) {
  if (!Number.isSafeInteger(e) || e < 0)
    throw new Error(`positive integer expected, not ${e}`);
}
function Uo(e) {
  return e instanceof Uint8Array || e != null && typeof e == "object" && e.constructor.name === "Uint8Array";
}
function zi(e, ...t) {
  if (!Uo(e))
    throw new Error("Uint8Array expected");
  if (t.length > 0 && !t.includes(e.length))
    throw new Error(`Uint8Array expected of length ${t}, not of length=${e.length}`);
}
function Dr(e, t = !0) {
  if (e.destroyed)
    throw new Error("Hash instance has been destroyed");
  if (t && e.finished)
    throw new Error("Hash#digest() has already been called");
}
function Bo(e, t) {
  zi(e);
  const n = t.outputLen;
  if (e.length < n)
    throw new Error(`digestInto() expects output buffer of length at least ${n}`);
}
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const hn = (e) => new Uint32Array(e.buffer, e.byteOffset, Math.floor(e.byteLength / 4)), at = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68, Wi = (e) => e << 24 & 4278190080 | e << 8 & 16711680 | e >>> 8 & 65280 | e >>> 24 & 255, Ve = at ? (e) => e : (e) => Wi(e);
function mt(e) {
  for (let t = 0; t < e.length; t++)
    e[t] = Wi(e[t]);
}
function Do(e) {
  if (typeof e != "string")
    throw new Error(`utf8ToBytes expected string, got ${typeof e}`);
  return new Uint8Array(new TextEncoder().encode(e));
}
function Dt(e) {
  return typeof e == "string" && (e = Do(e)), zi(e), e;
}
class _o {
  // Safe version that clones internal state
  clone() {
    return this._cloneInto();
  }
}
function No(e) {
  const t = (r, i) => e(i).update(Dt(r)).digest(), n = e({});
  return t.outputLen = n.outputLen, t.blockLen = n.blockLen, t.create = (r) => e(r), t;
}
const Lo = /* @__PURE__ */ new Uint8Array([
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3,
  11,
  8,
  12,
  0,
  5,
  2,
  15,
  13,
  10,
  14,
  3,
  6,
  7,
  1,
  9,
  4,
  7,
  9,
  3,
  1,
  13,
  12,
  11,
  14,
  2,
  6,
  5,
  10,
  4,
  0,
  15,
  8,
  9,
  0,
  5,
  7,
  2,
  4,
  10,
  15,
  14,
  1,
  11,
  12,
  6,
  8,
  3,
  13,
  2,
  12,
  6,
  10,
  0,
  11,
  8,
  3,
  4,
  13,
  7,
  5,
  15,
  14,
  1,
  9,
  12,
  5,
  1,
  15,
  14,
  13,
  4,
  10,
  0,
  7,
  6,
  3,
  9,
  2,
  8,
  11,
  13,
  11,
  7,
  14,
  12,
  1,
  3,
  9,
  5,
  0,
  15,
  4,
  8,
  6,
  2,
  10,
  6,
  15,
  14,
  9,
  11,
  3,
  0,
  8,
  12,
  2,
  13,
  7,
  1,
  4,
  10,
  5,
  10,
  2,
  8,
  4,
  7,
  6,
  1,
  5,
  15,
  11,
  9,
  14,
  3,
  12,
  13,
  0,
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  14,
  10,
  4,
  8,
  9,
  15,
  13,
  6,
  1,
  12,
  0,
  2,
  11,
  7,
  5,
  3
]);
class Fo extends _o {
  constructor(t, n, r = {}, i, s, a) {
    if (super(), this.blockLen = t, this.outputLen = n, this.length = 0, this.pos = 0, this.finished = !1, this.destroyed = !1, $n(t), $n(n), $n(i), n < 0 || n > i)
      throw new Error("outputLen bigger than keyLen");
    if (r.key !== void 0 && (r.key.length < 1 || r.key.length > i))
      throw new Error(`key must be up 1..${i} byte long or undefined`);
    if (r.salt !== void 0 && r.salt.length !== s)
      throw new Error(`salt must be ${s} byte long or undefined`);
    if (r.personalization !== void 0 && r.personalization.length !== a)
      throw new Error(`personalization must be ${a} byte long or undefined`);
    this.buffer32 = hn(this.buffer = new Uint8Array(t));
  }
  update(t) {
    Dr(this);
    const { blockLen: n, buffer: r, buffer32: i } = this;
    t = Dt(t);
    const s = t.length, a = t.byteOffset, o = t.buffer;
    for (let l = 0; l < s; ) {
      this.pos === n && (at || mt(i), this.compress(i, 0, !1), at || mt(i), this.pos = 0);
      const d = Math.min(n - this.pos, s - l), u = a + l;
      if (d === n && !(u % 4) && l + d < s) {
        const f = new Uint32Array(o, u, Math.floor((s - l) / 4));
        at || mt(f);
        for (let p = 0; l + n < s; p += i.length, l += n)
          this.length += n, this.compress(f, p, !1);
        at || mt(f);
        continue;
      }
      r.set(t.subarray(l, l + d), this.pos), this.pos += d, this.length += d, l += d;
    }
    return this;
  }
  digestInto(t) {
    Dr(this), Bo(t, this);
    const { pos: n, buffer32: r } = this;
    this.finished = !0, this.buffer.subarray(n).fill(0), at || mt(r), this.compress(r, 0, !0), at || mt(r);
    const i = hn(t);
    this.get().forEach((s, a) => i[a] = Ve(s));
  }
  digest() {
    const { buffer: t, outputLen: n } = this;
    this.digestInto(t);
    const r = t.slice(0, n);
    return this.destroy(), r;
  }
  _cloneInto(t) {
    const { buffer: n, length: r, finished: i, destroyed: s, outputLen: a, pos: o } = this;
    return t || (t = new this.constructor({ dkLen: a })), t.set(...this.get()), t.length = r, t.finished = i, t.destroyed = s, t.outputLen = a, t.buffer.set(n), t.pos = o, t;
  }
}
const Zt = /* @__PURE__ */ BigInt(2 ** 32 - 1), Wn = /* @__PURE__ */ BigInt(32);
function Gi(e, t = !1) {
  return t ? { h: Number(e & Zt), l: Number(e >> Wn & Zt) } : { h: Number(e >> Wn & Zt) | 0, l: Number(e & Zt) | 0 };
}
function Vo(e, t = !1) {
  let n = new Uint32Array(e.length), r = new Uint32Array(e.length);
  for (let i = 0; i < e.length; i++) {
    const { h: s, l: a } = Gi(e[i], t);
    [n[i], r[i]] = [s, a];
  }
  return [n, r];
}
const zo = (e, t) => BigInt(e >>> 0) << Wn | BigInt(t >>> 0), Wo = (e, t, n) => e >>> n, Go = (e, t, n) => e << 32 - n | t >>> n, Ho = (e, t, n) => e >>> n | t << 32 - n, Ko = (e, t, n) => e << 32 - n | t >>> n, qo = (e, t, n) => e << 64 - n | t >>> n - 32, Jo = (e, t, n) => e >>> n - 32 | t << 64 - n, Xo = (e, t) => t, Yo = (e, t) => e, Zo = (e, t, n) => e << n | t >>> 32 - n, Qo = (e, t, n) => t << n | e >>> 32 - n, el = (e, t, n) => t << n - 32 | e >>> 64 - n, tl = (e, t, n) => e << n - 32 | t >>> 64 - n;
function nl(e, t, n, r) {
  const i = (t >>> 0) + (r >>> 0);
  return { h: e + n + (i / 2 ** 32 | 0) | 0, l: i | 0 };
}
const rl = (e, t, n) => (e >>> 0) + (t >>> 0) + (n >>> 0), il = (e, t, n, r) => t + n + r + (e / 2 ** 32 | 0) | 0, sl = (e, t, n, r) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0), al = (e, t, n, r, i) => t + n + r + i + (e / 2 ** 32 | 0) | 0, ol = (e, t, n, r, i) => (e >>> 0) + (t >>> 0) + (n >>> 0) + (r >>> 0) + (i >>> 0), ll = (e, t, n, r, i, s) => t + n + r + i + s + (e / 2 ** 32 | 0) | 0, ie = {
  fromBig: Gi,
  split: Vo,
  toBig: zo,
  shrSH: Wo,
  shrSL: Go,
  rotrSH: Ho,
  rotrSL: Ko,
  rotrBH: qo,
  rotrBL: Jo,
  rotr32H: Xo,
  rotr32L: Yo,
  rotlSH: Zo,
  rotlSL: Qo,
  rotlBH: el,
  rotlBL: tl,
  add: nl,
  add3L: rl,
  add3H: il,
  add4L: sl,
  add4H: al,
  add5H: ll,
  add5L: ol
}, Z = /* @__PURE__ */ new Uint32Array([
  4089235720,
  1779033703,
  2227873595,
  3144134277,
  4271175723,
  1013904242,
  1595750129,
  2773480762,
  2917565137,
  1359893119,
  725511199,
  2600822924,
  4215389547,
  528734635,
  327033209,
  1541459225
]), y = /* @__PURE__ */ new Uint32Array(32);
function Xe(e, t, n, r, i, s) {
  const a = i[s], o = i[s + 1];
  let l = y[2 * e], d = y[2 * e + 1], u = y[2 * t], f = y[2 * t + 1], p = y[2 * n], v = y[2 * n + 1], h = y[2 * r], m = y[2 * r + 1], g = ie.add3L(l, u, a);
  d = ie.add3H(g, d, f, o), l = g | 0, { Dh: m, Dl: h } = { Dh: m ^ d, Dl: h ^ l }, { Dh: m, Dl: h } = { Dh: ie.rotr32H(m, h), Dl: ie.rotr32L(m, h) }, { h: v, l: p } = ie.add(v, p, m, h), { Bh: f, Bl: u } = { Bh: f ^ v, Bl: u ^ p }, { Bh: f, Bl: u } = { Bh: ie.rotrSH(f, u, 24), Bl: ie.rotrSL(f, u, 24) }, y[2 * e] = l, y[2 * e + 1] = d, y[2 * t] = u, y[2 * t + 1] = f, y[2 * n] = p, y[2 * n + 1] = v, y[2 * r] = h, y[2 * r + 1] = m;
}
function Ye(e, t, n, r, i, s) {
  const a = i[s], o = i[s + 1];
  let l = y[2 * e], d = y[2 * e + 1], u = y[2 * t], f = y[2 * t + 1], p = y[2 * n], v = y[2 * n + 1], h = y[2 * r], m = y[2 * r + 1], g = ie.add3L(l, u, a);
  d = ie.add3H(g, d, f, o), l = g | 0, { Dh: m, Dl: h } = { Dh: m ^ d, Dl: h ^ l }, { Dh: m, Dl: h } = { Dh: ie.rotrSH(m, h, 16), Dl: ie.rotrSL(m, h, 16) }, { h: v, l: p } = ie.add(v, p, m, h), { Bh: f, Bl: u } = { Bh: f ^ v, Bl: u ^ p }, { Bh: f, Bl: u } = { Bh: ie.rotrBH(f, u, 63), Bl: ie.rotrBL(f, u, 63) }, y[2 * e] = l, y[2 * e + 1] = d, y[2 * t] = u, y[2 * t + 1] = f, y[2 * n] = p, y[2 * n + 1] = v, y[2 * r] = h, y[2 * r + 1] = m;
}
class ul extends Fo {
  constructor(t = {}) {
    super(128, t.dkLen === void 0 ? 64 : t.dkLen, t, 64, 16, 16), this.v0l = Z[0] | 0, this.v0h = Z[1] | 0, this.v1l = Z[2] | 0, this.v1h = Z[3] | 0, this.v2l = Z[4] | 0, this.v2h = Z[5] | 0, this.v3l = Z[6] | 0, this.v3h = Z[7] | 0, this.v4l = Z[8] | 0, this.v4h = Z[9] | 0, this.v5l = Z[10] | 0, this.v5h = Z[11] | 0, this.v6l = Z[12] | 0, this.v6h = Z[13] | 0, this.v7l = Z[14] | 0, this.v7h = Z[15] | 0;
    const n = t.key ? t.key.length : 0;
    if (this.v0l ^= this.outputLen | n << 8 | 65536 | 1 << 24, t.salt) {
      const r = hn(Dt(t.salt));
      this.v4l ^= Ve(r[0]), this.v4h ^= Ve(r[1]), this.v5l ^= Ve(r[2]), this.v5h ^= Ve(r[3]);
    }
    if (t.personalization) {
      const r = hn(Dt(t.personalization));
      this.v6l ^= Ve(r[0]), this.v6h ^= Ve(r[1]), this.v7l ^= Ve(r[2]), this.v7h ^= Ve(r[3]);
    }
    if (t.key) {
      const r = new Uint8Array(this.blockLen);
      r.set(Dt(t.key)), this.update(r);
    }
  }
  // prettier-ignore
  get() {
    let { v0l: t, v0h: n, v1l: r, v1h: i, v2l: s, v2h: a, v3l: o, v3h: l, v4l: d, v4h: u, v5l: f, v5h: p, v6l: v, v6h: h, v7l: m, v7h: g } = this;
    return [t, n, r, i, s, a, o, l, d, u, f, p, v, h, m, g];
  }
  // prettier-ignore
  set(t, n, r, i, s, a, o, l, d, u, f, p, v, h, m, g) {
    this.v0l = t | 0, this.v0h = n | 0, this.v1l = r | 0, this.v1h = i | 0, this.v2l = s | 0, this.v2h = a | 0, this.v3l = o | 0, this.v3h = l | 0, this.v4l = d | 0, this.v4h = u | 0, this.v5l = f | 0, this.v5h = p | 0, this.v6l = v | 0, this.v6h = h | 0, this.v7l = m | 0, this.v7h = g | 0;
  }
  compress(t, n, r) {
    this.get().forEach((l, d) => y[d] = l), y.set(Z, 16);
    let { h: i, l: s } = ie.fromBig(BigInt(this.length));
    y[24] = Z[8] ^ s, y[25] = Z[9] ^ i, r && (y[28] = ~y[28], y[29] = ~y[29]);
    let a = 0;
    const o = Lo;
    for (let l = 0; l < 12; l++)
      Xe(0, 4, 8, 12, t, n + 2 * o[a++]), Ye(0, 4, 8, 12, t, n + 2 * o[a++]), Xe(1, 5, 9, 13, t, n + 2 * o[a++]), Ye(1, 5, 9, 13, t, n + 2 * o[a++]), Xe(2, 6, 10, 14, t, n + 2 * o[a++]), Ye(2, 6, 10, 14, t, n + 2 * o[a++]), Xe(3, 7, 11, 15, t, n + 2 * o[a++]), Ye(3, 7, 11, 15, t, n + 2 * o[a++]), Xe(0, 5, 10, 15, t, n + 2 * o[a++]), Ye(0, 5, 10, 15, t, n + 2 * o[a++]), Xe(1, 6, 11, 12, t, n + 2 * o[a++]), Ye(1, 6, 11, 12, t, n + 2 * o[a++]), Xe(2, 7, 8, 13, t, n + 2 * o[a++]), Ye(2, 7, 8, 13, t, n + 2 * o[a++]), Xe(3, 4, 9, 14, t, n + 2 * o[a++]), Ye(3, 4, 9, 14, t, n + 2 * o[a++]);
    this.v0l ^= y[0] ^ y[16], this.v0h ^= y[1] ^ y[17], this.v1l ^= y[2] ^ y[18], this.v1h ^= y[3] ^ y[19], this.v2l ^= y[4] ^ y[20], this.v2h ^= y[5] ^ y[21], this.v3l ^= y[6] ^ y[22], this.v3h ^= y[7] ^ y[23], this.v4l ^= y[8] ^ y[24], this.v4h ^= y[9] ^ y[25], this.v5l ^= y[10] ^ y[26], this.v5h ^= y[11] ^ y[27], this.v6l ^= y[12] ^ y[28], this.v6h ^= y[13] ^ y[29], this.v7l ^= y[14] ^ y[30], this.v7h ^= y[15] ^ y[31], y.fill(0);
  }
  destroy() {
    this.destroyed = !0, this.buffer32.fill(0), this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }
}
const cl = /* @__PURE__ */ No((e) => new ul(e));
function dl(e, t) {
  const n = Array.from(`${e}::`).map((i) => i.charCodeAt(0)), r = new Uint8Array(n.length + t.length);
  return r.set(n), r.set(t, n.length), cl(r, { dkLen: 32 });
}
function _r(e) {
  return W(e).replace("0x", "");
}
class Ie {
  constructor(t) {
    this.version = 2, this.sender = (t == null ? void 0 : t.sender) ?? null, this.expiration = (t == null ? void 0 : t.expiration) ?? null, this.inputs = (t == null ? void 0 : t.inputs) ?? [], this.commands = (t == null ? void 0 : t.commands) ?? [], this.gasData = (t == null ? void 0 : t.gasData) ?? {
      budget: null,
      price: null,
      owner: null,
      payment: null
    };
  }
  static fromKindBytes(t) {
    const r = A.TransactionKind.parse(t).ProgrammableTransaction;
    if (!r)
      throw new Error("Unable to deserialize from bytes.");
    return Ie.restore({
      version: 2,
      sender: null,
      expiration: null,
      gasData: {
        budget: null,
        owner: null,
        payment: null,
        price: null
      },
      inputs: r.inputs,
      commands: r.commands
    });
  }
  static fromBytes(t) {
    const n = A.TransactionData.parse(t), r = n == null ? void 0 : n.V1, i = r.kind.ProgrammableTransaction;
    if (!r || !i)
      throw new Error("Unable to deserialize from bytes.");
    return Ie.restore({
      version: 2,
      sender: r.sender,
      expiration: r.expiration,
      gasData: r.gasData,
      inputs: i.inputs,
      commands: i.commands
    });
  }
  static restore(t) {
    return t.version === 2 ? new Ie(z(an, t)) : new Ie(z(an, uo(t)));
  }
  /**
   * Generate transaction digest.
   *
   * @param bytes BCS serialized transaction data
   * @returns transaction digest.
   */
  static getDigestFromBytes(t) {
    const n = dl("TransactionData", t);
    return mn(n);
  }
  // @deprecated use gasData instead
  get gasConfig() {
    return this.gasData;
  }
  // @deprecated use gasData instead
  set gasConfig(t) {
    this.gasData = t;
  }
  build({
    maxSizeBytes: t = 1 / 0,
    overrides: n,
    onlyTransactionKind: r
  } = {}) {
    const i = this.inputs, s = this.commands, a = {
      ProgrammableTransaction: {
        inputs: i,
        commands: s
      }
    };
    if (r)
      return A.TransactionKind.serialize(a, { maxSize: t }).toBytes();
    const o = (n == null ? void 0 : n.expiration) ?? this.expiration, l = (n == null ? void 0 : n.sender) ?? this.sender, d = { ...this.gasData, ...n == null ? void 0 : n.gasConfig, ...n == null ? void 0 : n.gasData };
    if (!l)
      throw new Error("Missing transaction sender");
    if (!d.budget)
      throw new Error("Missing gas budget");
    if (!d.payment)
      throw new Error("Missing gas payment");
    if (!d.price)
      throw new Error("Missing gas price");
    const u = {
      sender: _r(l),
      expiration: o || { None: !0 },
      gasData: {
        payment: d.payment,
        owner: _r(this.gasData.owner ?? l),
        price: BigInt(d.price),
        budget: BigInt(d.budget)
      },
      kind: {
        ProgrammableTransaction: {
          inputs: i,
          commands: s
        }
      }
    };
    return A.TransactionData.serialize(
      { V1: u },
      { maxSize: t }
    ).toBytes();
  }
  addInput(t, n) {
    const r = this.inputs.length;
    return this.inputs.push(n), { Input: r, type: t, $kind: "Input" };
  }
  getInputUses(t, n) {
    this.mapArguments((r, i) => (r.$kind === "Input" && r.Input === t && n(r, i), r));
  }
  mapArguments(t) {
    for (const n of this.commands)
      switch (n.$kind) {
        case "MoveCall":
          n.MoveCall.arguments = n.MoveCall.arguments.map((i) => t(i, n));
          break;
        case "TransferObjects":
          n.TransferObjects.objects = n.TransferObjects.objects.map(
            (i) => t(i, n)
          ), n.TransferObjects.address = t(n.TransferObjects.address, n);
          break;
        case "SplitCoins":
          n.SplitCoins.coin = t(n.SplitCoins.coin, n), n.SplitCoins.amounts = n.SplitCoins.amounts.map((i) => t(i, n));
          break;
        case "MergeCoins":
          n.MergeCoins.destination = t(n.MergeCoins.destination, n), n.MergeCoins.sources = n.MergeCoins.sources.map((i) => t(i, n));
          break;
        case "MakeMoveVec":
          n.MakeMoveVec.elements = n.MakeMoveVec.elements.map(
            (i) => t(i, n)
          );
          break;
        case "Upgrade":
          n.Upgrade.ticket = t(n.Upgrade.ticket, n);
          break;
        case "$Intent":
          const r = n.$Intent.inputs;
          n.$Intent.inputs = {};
          for (const [i, s] of Object.entries(r))
            n.$Intent.inputs[i] = Array.isArray(s) ? s.map((a) => t(a, n)) : t(s, n);
          break;
        case "Publish":
          break;
        default:
          throw new Error(`Unexpected transaction kind: ${n.$kind}`);
      }
  }
  replaceCommand(t, n) {
    if (!Array.isArray(n)) {
      this.commands[t] = n;
      return;
    }
    const r = n.length - 1;
    this.commands.splice(t, 1, ...n), r !== 0 && this.mapArguments((i) => {
      switch (i.$kind) {
        case "Result":
          i.Result > t && (i.Result += r);
          break;
        case "NestedResult":
          i.NestedResult[0] > t && (i.NestedResult[0] += r);
          break;
      }
      return i;
    });
  }
  getDigest() {
    const t = this.build({ onlyTransactionKind: !1 });
    return Ie.getDigestFromBytes(t);
  }
  snapshot() {
    return z(an, this);
  }
}
function Nr(e) {
  if (typeof e == "string")
    return W(e);
  if (e.Object)
    return e.Object.ImmOrOwnedObject ? W(e.Object.ImmOrOwnedObject.objectId) : e.Object.Receiving ? W(e.Object.Receiving.objectId) : W(e.Object.SharedObject.objectId);
  if (e.UnresolvedObject)
    return W(e.UnresolvedObject.objectId);
}
var Hi = (e) => {
  throw TypeError(e);
}, fr = (e, t, n) => t.has(e) || Hi("Cannot " + n), P = (e, t, n) => (fr(e, t, "read from private field"), n ? n.call(e) : t.get(e)), At = (e, t, n) => t.has(e) ? Hi("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, n), it = (e, t, n, r) => (fr(e, t, "write to private field"), t.set(e, n), n), ze = (e, t, n) => (fr(e, t, "access private method"), n), Mt, _t, ot, U, Ae, on, pr, Gn, hr;
function fl(e) {
  const t = { $kind: "Result", Result: e }, n = [], r = (i) => n[i] ?? (n[i] = {
    $kind: "NestedResult",
    NestedResult: [e, i]
  });
  return new Proxy(t, {
    set() {
      throw new Error(
        "The transaction result is a proxy, and does not support setting properties directly"
      );
    },
    // TODO: Instead of making this return a concrete argument, we should ideally
    // make it reference-based (so that this gets resolved at build-time), which
    // allows re-ordering transactions.
    get(i, s) {
      if (s in i)
        return Reflect.get(i, s);
      if (s === Symbol.iterator)
        return function* () {
          let o = 0;
          for (; ; )
            yield r(o), o++;
        };
      if (typeof s == "symbol") return;
      const a = parseInt(s, 10);
      if (!(Number.isNaN(a) || a < 0))
        return r(a);
    }
  });
}
const Ki = Symbol.for("@mysten/transaction");
function pl(e) {
  return !!e && typeof e == "object" && e[Ki] === !0;
}
const Lr = {
  buildPlugins: /* @__PURE__ */ new Map(),
  serializationPlugins: /* @__PURE__ */ new Map()
}, Mn = Symbol.for("@mysten/transaction/registry");
function jt() {
  try {
    const e = globalThis;
    return e[Mn] || (e[Mn] = Lr), e[Mn];
  } catch {
    return Lr;
  }
}
const hl = class Hn {
  constructor() {
    At(this, Ae), At(this, Mt), At(this, _t), At(this, ot, /* @__PURE__ */ new Map()), At(this, U), this.object = Po(
      (n) => {
        var s, a;
        if (typeof n == "function")
          return this.object(n(this));
        if (typeof n == "object" && Fn(F, n))
          return n;
        const r = Nr(n), i = P(this, U).inputs.find((o) => r === Nr(o));
        return (s = i == null ? void 0 : i.Object) != null && s.SharedObject && typeof n == "object" && ((a = n.Object) != null && a.SharedObject) && (i.Object.SharedObject.mutable = i.Object.SharedObject.mutable || n.Object.SharedObject.mutable), i ? { $kind: "Input", Input: P(this, U).inputs.indexOf(i), type: "object" } : P(this, U).addInput(
          "object",
          typeof n == "string" ? {
            $kind: "UnresolvedObject",
            UnresolvedObject: { objectId: W(n) }
          } : n
        );
      }
    );
    const t = jt();
    it(this, U, new Ie()), it(this, _t, [...t.buildPlugins.values()]), it(this, Mt, [...t.serializationPlugins.values()]);
  }
  /**
   * Converts from a serialize transaction kind (built with `build({ onlyTransactionKind: true })`) to a `Transaction` class.
   * Supports either a byte array, or base64-encoded bytes.
   */
  static fromKind(t) {
    const n = new Hn();
    return it(n, U, Ie.fromKindBytes(
      typeof t == "string" ? Be(t) : t
    )), n;
  }
  /**
   * Converts from a serialized transaction format to a `Transaction` class.
   * There are two supported serialized formats:
   * - A string returned from `Transaction#serialize`. The serialized format must be compatible, or it will throw an error.
   * - A byte array (or base64-encoded bytes) containing BCS transaction data.
   */
  static from(t) {
    const n = new Hn();
    return pl(t) ? it(n, U, new Ie(t.getData())) : typeof t != "string" || !t.startsWith("{") ? it(n, U, Ie.fromBytes(
      typeof t == "string" ? Be(t) : t
    )) : it(n, U, Ie.restore(JSON.parse(t))), n;
  }
  static registerGlobalSerializationPlugin(t, n) {
    jt().serializationPlugins.set(
      t,
      n ?? t
    );
  }
  static unregisterGlobalSerializationPlugin(t) {
    jt().serializationPlugins.delete(t);
  }
  static registerGlobalBuildPlugin(t, n) {
    jt().buildPlugins.set(
      t,
      n ?? t
    );
  }
  static unregisterGlobalBuildPlugin(t) {
    jt().buildPlugins.delete(t);
  }
  addSerializationPlugin(t) {
    P(this, Mt).push(t);
  }
  addBuildPlugin(t) {
    P(this, _t).push(t);
  }
  addIntentResolver(t, n) {
    if (P(this, ot).has(t) && P(this, ot).get(t) !== n)
      throw new Error(`Intent resolver for ${t} already exists`);
    P(this, ot).set(t, n);
  }
  setSender(t) {
    P(this, U).sender = t;
  }
  /**
   * Sets the sender only if it has not already been set.
   * This is useful for sponsored transaction flows where the sender may not be the same as the signer address.
   */
  setSenderIfNotSet(t) {
    P(this, U).sender || (P(this, U).sender = t);
  }
  setExpiration(t) {
    P(this, U).expiration = t ? z(Fi, t) : null;
  }
  setGasPrice(t) {
    P(this, U).gasConfig.price = String(t);
  }
  setGasBudget(t) {
    P(this, U).gasConfig.budget = String(t);
  }
  setGasBudgetIfNotSet(t) {
    P(this, U).gasData.budget == null && (P(this, U).gasConfig.budget = String(t));
  }
  setGasOwner(t) {
    P(this, U).gasConfig.owner = t;
  }
  setGasPayment(t) {
    P(this, U).gasConfig.payment = t.map((n) => z(nt, n));
  }
  /** @deprecated Use `getData()` instead. */
  get blockData() {
    return Ur(P(this, U).snapshot());
  }
  /** Get a snapshot of the transaction data, in JSON form: */
  getData() {
    return P(this, U).snapshot();
  }
  // Used to brand transaction classes so that they can be identified, even between multiple copies
  // of the builder.
  get [Ki]() {
    return !0;
  }
  // Temporary workaround for the wallet interface accidentally serializing transactions via postMessage
  get pure() {
    return Object.defineProperty(this, "pure", {
      enumerable: !1,
      value: Ro((t) => rr(t) ? P(this, U).addInput("pure", {
        $kind: "Pure",
        Pure: {
          bytes: t.toBase64()
        }
      }) : P(this, U).addInput(
        "pure",
        Fn(Mr, t) ? z(Mr, t) : t instanceof Uint8Array ? He.Pure(t) : { $kind: "UnresolvedPure", UnresolvedPure: { value: t } }
      ))
    }), this.pure;
  }
  /** Returns an argument for the gas coin, to be used in a transaction. */
  get gas() {
    return { $kind: "GasCoin", GasCoin: !0 };
  }
  /**
   * Add a new object input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  objectRef(...t) {
    return this.object(He.ObjectRef(...t));
  }
  /**
   * Add a new receiving input to the transaction using the fully-resolved object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  receivingRef(...t) {
    return this.object(He.ReceivingRef(...t));
  }
  /**
   * Add a new shared object input to the transaction using the fully-resolved shared object reference.
   * If you only have an object ID, use `builder.object(id)` instead.
   */
  sharedObjectRef(...t) {
    return this.object(He.SharedObjectRef(...t));
  }
  /** Add a transaction to the transaction */
  add(t) {
    if (typeof t == "function")
      return t(this);
    const n = P(this, U).commands.push(t);
    return fl(n - 1);
  }
  // Method shorthands:
  splitCoins(t, n) {
    return this.add(
      rt.SplitCoins(
        typeof t == "string" ? this.object(t) : ze(this, Ae, pr).call(this, t),
        n.map(
          (r) => typeof r == "number" || typeof r == "bigint" || typeof r == "string" ? this.pure.u64(r) : ze(this, Ae, on).call(this, r)
        )
      )
    );
  }
  mergeCoins(t, n) {
    return this.add(
      rt.MergeCoins(
        this.object(t),
        n.map((r) => this.object(r))
      )
    );
  }
  publish({ modules: t, dependencies: n }) {
    return this.add(
      rt.Publish({
        modules: t,
        dependencies: n
      })
    );
  }
  upgrade({
    modules: t,
    dependencies: n,
    package: r,
    ticket: i
  }) {
    return this.add(
      rt.Upgrade({
        modules: t,
        dependencies: n,
        package: r,
        ticket: this.object(i)
      })
    );
  }
  moveCall({
    arguments: t,
    ...n
  }) {
    return this.add(
      rt.MoveCall({
        ...n,
        arguments: t == null ? void 0 : t.map((r) => ze(this, Ae, on).call(this, r))
      })
    );
  }
  transferObjects(t, n) {
    return this.add(
      rt.TransferObjects(
        t.map((r) => this.object(r)),
        typeof n == "string" ? this.pure.address(n) : ze(this, Ae, on).call(this, n)
      )
    );
  }
  makeMoveVec({
    type: t,
    elements: n
  }) {
    return this.add(
      rt.MakeMoveVec({
        type: t,
        elements: n.map((r) => this.object(r))
      })
    );
  }
  /**
   * @deprecated Use toJSON instead.
   * For synchronous serialization, you can use `getData()`
   * */
  serialize() {
    return JSON.stringify(Ur(P(this, U).snapshot()));
  }
  async toJSON(t = {}) {
    return await this.prepareForSerialization(t), JSON.stringify(
      z(bo, P(this, U).snapshot()),
      (n, r) => typeof r == "bigint" ? r.toString() : r,
      2
    );
  }
  /** Build the transaction to BCS bytes, and sign it with the provided keypair. */
  async sign(t) {
    const { signer: n, ...r } = t, i = await this.build(r);
    return n.signTransaction(i);
  }
  /** Build the transaction to BCS bytes. */
  async build(t = {}) {
    return await this.prepareForSerialization(t), await ze(this, Ae, Gn).call(this, t), P(this, U).build({
      onlyTransactionKind: t.onlyTransactionKind
    });
  }
  /** Derive transaction digest */
  async getDigest(t = {}) {
    return await ze(this, Ae, Gn).call(this, t), P(this, U).getDigest();
  }
  async prepareForSerialization(t) {
    var i;
    const n = /* @__PURE__ */ new Set();
    for (const s of P(this, U).commands)
      s.$Intent && n.add(s.$Intent.name);
    const r = [...P(this, Mt)];
    for (const s of n)
      if (!((i = t.supportedIntents) != null && i.includes(s))) {
        if (!P(this, ot).has(s))
          throw new Error(`Missing intent resolver for ${s}`);
        r.push(P(this, ot).get(s));
      }
    await ze(this, Ae, hr).call(this, r, t);
  }
};
Mt = /* @__PURE__ */ new WeakMap();
_t = /* @__PURE__ */ new WeakMap();
ot = /* @__PURE__ */ new WeakMap();
U = /* @__PURE__ */ new WeakMap();
Ae = /* @__PURE__ */ new WeakSet();
on = function(e) {
  return rr(e) ? this.pure(e) : ze(this, Ae, pr).call(this, e);
};
pr = function(e) {
  return typeof e == "function" ? z(F, e(this)) : z(F, e);
};
Gn = async function(e) {
  if (!e.onlyTransactionKind && !P(this, U).sender)
    throw new Error("Missing transaction sender");
  await ze(this, Ae, hr).call(this, [...P(this, _t), Eo], e);
};
hr = async function(e, t) {
  const n = (r) => {
    if (r >= e.length)
      return () => {
      };
    const i = e[r];
    return async () => {
      const s = n(r + 1);
      let a = !1, o = !1;
      if (await i(P(this, U), t, async () => {
        if (a)
          throw new Error(`next() was call multiple times in TransactionPlugin ${r}`);
        a = !0, await s(), o = !0;
      }), !a)
        throw new Error(`next() was not called in TransactionPlugin ${r}`);
      if (!o)
        throw new Error(`next() was not awaited in TransactionPlugin ${r}`);
    };
  };
  await n(0)();
};
let Pc = hl;
function vl(e, t, n) {
  let r = E(n == null ? void 0 : n.value), i = O(() => e.value !== void 0);
  return [O(() => i.value ? e.value : r.value), function(s) {
    return i.value || (r.value = s), t == null ? void 0 : t(s);
  }];
}
function vr(e) {
  typeof queueMicrotask == "function" ? queueMicrotask(e) : Promise.resolve().then(e).catch((t) => setTimeout(() => {
    throw t;
  }));
}
function qt() {
  let e = [], t = { addEventListener(n, r, i, s) {
    return n.addEventListener(r, i, s), t.add(() => n.removeEventListener(r, i, s));
  }, requestAnimationFrame(...n) {
    let r = requestAnimationFrame(...n);
    t.add(() => cancelAnimationFrame(r));
  }, nextFrame(...n) {
    t.requestAnimationFrame(() => {
      t.requestAnimationFrame(...n);
    });
  }, setTimeout(...n) {
    let r = setTimeout(...n);
    t.add(() => clearTimeout(r));
  }, microTask(...n) {
    let r = { current: !0 };
    return vr(() => {
      r.current && n[0]();
    }), t.add(() => {
      r.current = !1;
    });
  }, style(n, r, i) {
    let s = n.style.getPropertyValue(r);
    return Object.assign(n.style, { [r]: i }), this.add(() => {
      Object.assign(n.style, { [r]: s });
    });
  }, group(n) {
    let r = qt();
    return n(r), this.add(() => r.dispose());
  }, add(n) {
    return e.push(n), () => {
      let r = e.indexOf(n);
      if (r >= 0) for (let i of e.splice(r, 1)) i();
    };
  }, dispose() {
    for (let n of e.splice(0)) n();
  } };
  return t;
}
var Fr;
let gl = Symbol("headlessui.useid"), ml = 0;
const ve = (Fr = Ir.useId) != null ? Fr : function() {
  return Ir.inject(gl, () => `${++ml}`)();
};
function I(e) {
  var t;
  if (e == null || e.value == null) return null;
  let n = (t = e.value.$el) != null ? t : e.value;
  return n instanceof Node ? n : null;
}
function $e(e, t, ...n) {
  if (e in t) {
    let i = t[e];
    return typeof i == "function" ? i(...n) : i;
  }
  let r = new Error(`Tried to handle "${e}" but there is no handler defined. Only defined handlers are: ${Object.keys(t).map((i) => `"${i}"`).join(", ")}.`);
  throw Error.captureStackTrace && Error.captureStackTrace(r, $e), r;
}
var bl = Object.defineProperty, yl = (e, t, n) => t in e ? bl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, Vr = (e, t, n) => (yl(e, typeof t != "symbol" ? t + "" : t, n), n);
let wl = class {
  constructor() {
    Vr(this, "current", this.detect()), Vr(this, "currentId", 0);
  }
  set(t) {
    this.current !== t && (this.currentId = 0, this.current = t);
  }
  reset() {
    this.set(this.detect());
  }
  nextId() {
    return ++this.currentId;
  }
  get isServer() {
    return this.current === "server";
  }
  get isClient() {
    return this.current === "client";
  }
  detect() {
    return typeof window > "u" || typeof document > "u" ? "server" : "client";
  }
}, Jt = new wl();
function Ce(e) {
  if (Jt.isServer) return null;
  if (e instanceof Node) return e.ownerDocument;
  if (e != null && e.hasOwnProperty("value")) {
    let t = I(e);
    if (t) return t.ownerDocument;
  }
  return document;
}
let Kn = ["[contentEditable=true]", "[tabindex]", "a[href]", "area[href]", "button:not([disabled])", "iframe", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])"].map((e) => `${e}:not([tabindex='-1'])`).join(",");
var ae = ((e) => (e[e.First = 1] = "First", e[e.Previous = 2] = "Previous", e[e.Next = 4] = "Next", e[e.Last = 8] = "Last", e[e.WrapAround = 16] = "WrapAround", e[e.NoScroll = 32] = "NoScroll", e))(ae || {}), vn = ((e) => (e[e.Error = 0] = "Error", e[e.Overflow = 1] = "Overflow", e[e.Success = 2] = "Success", e[e.Underflow = 3] = "Underflow", e))(vn || {}), Sl = ((e) => (e[e.Previous = -1] = "Previous", e[e.Next = 1] = "Next", e))(Sl || {});
function qi(e = document.body) {
  return e == null ? [] : Array.from(e.querySelectorAll(Kn)).sort((t, n) => Math.sign((t.tabIndex || Number.MAX_SAFE_INTEGER) - (n.tabIndex || Number.MAX_SAFE_INTEGER)));
}
var gr = ((e) => (e[e.Strict = 0] = "Strict", e[e.Loose = 1] = "Loose", e))(gr || {});
function mr(e, t = 0) {
  var n;
  return e === ((n = Ce(e)) == null ? void 0 : n.body) ? !1 : $e(t, { 0() {
    return e.matches(Kn);
  }, 1() {
    let r = e;
    for (; r !== null; ) {
      if (r.matches(Kn)) return !0;
      r = r.parentElement;
    }
    return !1;
  } });
}
function Ji(e) {
  let t = Ce(e);
  Ue(() => {
    t && !mr(t.activeElement, 0) && tt(e);
  });
}
var El = ((e) => (e[e.Keyboard = 0] = "Keyboard", e[e.Mouse = 1] = "Mouse", e))(El || {});
typeof window < "u" && typeof document < "u" && (document.addEventListener("keydown", (e) => {
  e.metaKey || e.altKey || e.ctrlKey || (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0), document.addEventListener("click", (e) => {
  e.detail === 1 ? delete document.documentElement.dataset.headlessuiFocusVisible : e.detail === 0 && (document.documentElement.dataset.headlessuiFocusVisible = "");
}, !0));
function tt(e) {
  e == null || e.focus({ preventScroll: !0 });
}
let Ol = ["textarea", "input"].join(",");
function Tl(e) {
  var t, n;
  return (n = (t = e == null ? void 0 : e.matches) == null ? void 0 : t.call(e, Ol)) != null ? n : !1;
}
function br(e, t = (n) => n) {
  return e.slice().sort((n, r) => {
    let i = t(n), s = t(r);
    if (i === null || s === null) return 0;
    let a = i.compareDocumentPosition(s);
    return a & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : a & Node.DOCUMENT_POSITION_PRECEDING ? 1 : 0;
  });
}
function kl(e, t) {
  return ft(qi(), t, { relativeTo: e });
}
function ft(e, t, { sorted: n = !0, relativeTo: r = null, skipElements: i = [] } = {}) {
  var s;
  let a = (s = Array.isArray(e) ? e.length > 0 ? e[0].ownerDocument : document : e == null ? void 0 : e.ownerDocument) != null ? s : document, o = Array.isArray(e) ? n ? br(e) : e : qi(e);
  i.length > 0 && o.length > 1 && (o = o.filter((h) => !i.includes(h))), r = r ?? a.activeElement;
  let l = (() => {
    if (t & 5) return 1;
    if (t & 10) return -1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), d = (() => {
    if (t & 1) return 0;
    if (t & 2) return Math.max(0, o.indexOf(r)) - 1;
    if (t & 4) return Math.max(0, o.indexOf(r)) + 1;
    if (t & 8) return o.length - 1;
    throw new Error("Missing Focus.First, Focus.Previous, Focus.Next or Focus.Last");
  })(), u = t & 32 ? { preventScroll: !0 } : {}, f = 0, p = o.length, v;
  do {
    if (f >= p || f + p <= 0) return 0;
    let h = d + f;
    if (t & 16) h = (h + p) % p;
    else {
      if (h < 0) return 3;
      if (h >= p) return 1;
    }
    v = o[h], v == null || v.focus(u), f += l;
  } while (v !== a.activeElement);
  return t & 6 && Tl(v) && v.select(), 2;
}
function Xi() {
  return /iPhone/gi.test(window.navigator.platform) || /Mac/gi.test(window.navigator.platform) && window.navigator.maxTouchPoints > 0;
}
function Al() {
  return /Android/gi.test(window.navigator.userAgent);
}
function jl() {
  return Xi() || Al();
}
function Qt(e, t, n) {
  Jt.isServer || oe((r) => {
    document.addEventListener(e, t, n), r(() => document.removeEventListener(e, t, n));
  });
}
function Yi(e, t, n) {
  Jt.isServer || oe((r) => {
    window.addEventListener(e, t, n), r(() => window.removeEventListener(e, t, n));
  });
}
function Zi(e, t, n = O(() => !0)) {
  function r(s, a) {
    if (!n.value || s.defaultPrevented) return;
    let o = a(s);
    if (o === null || !o.getRootNode().contains(o)) return;
    let l = function d(u) {
      return typeof u == "function" ? d(u()) : Array.isArray(u) || u instanceof Set ? u : [u];
    }(e);
    for (let d of l) {
      if (d === null) continue;
      let u = d instanceof HTMLElement ? d : I(d);
      if (u != null && u.contains(o) || s.composed && s.composedPath().includes(u)) return;
    }
    return !mr(o, gr.Loose) && o.tabIndex !== -1 && s.preventDefault(), t(s, o);
  }
  let i = E(null);
  Qt("pointerdown", (s) => {
    var a, o;
    n.value && (i.value = ((o = (a = s.composedPath) == null ? void 0 : a.call(s)) == null ? void 0 : o[0]) || s.target);
  }, !0), Qt("mousedown", (s) => {
    var a, o;
    n.value && (i.value = ((o = (a = s.composedPath) == null ? void 0 : a.call(s)) == null ? void 0 : o[0]) || s.target);
  }, !0), Qt("click", (s) => {
    jl() || i.value && (r(s, () => i.value), i.value = null);
  }, !0), Qt("touchend", (s) => r(s, () => s.target instanceof HTMLElement ? s.target : null), !0), Yi("blur", (s) => r(s, () => window.document.activeElement instanceof HTMLIFrameElement ? window.document.activeElement : null), !0);
}
function zr(e, t) {
  if (e) return e;
  let n = t ?? "button";
  if (typeof n == "string" && n.toLowerCase() === "button") return "button";
}
function Il(e, t) {
  let n = E(zr(e.value.type, e.value.as));
  return J(() => {
    n.value = zr(e.value.type, e.value.as);
  }), oe(() => {
    var r;
    n.value || I(t) && I(t) instanceof HTMLButtonElement && !((r = I(t)) != null && r.hasAttribute("type")) && (n.value = "button");
  }), n;
}
function Wr(e) {
  return [e.screenX, e.screenY];
}
function xl() {
  let e = E([-1, -1]);
  return { wasMoved(t) {
    let n = Wr(t);
    return e.value[0] === n[0] && e.value[1] === n[1] ? !1 : (e.value = n, !0);
  }, update(t) {
    e.value = Wr(t);
  } };
}
function Qi({ container: e, accept: t, walk: n, enabled: r }) {
  oe(() => {
    let i = e.value;
    if (!i || r !== void 0 && !r.value) return;
    let s = Ce(e);
    if (!s) return;
    let a = Object.assign((l) => t(l), { acceptNode: t }), o = s.createTreeWalker(i, NodeFilter.SHOW_ELEMENT, a, !1);
    for (; o.nextNode(); ) n(o.currentNode);
  });
}
var Et = ((e) => (e[e.None = 0] = "None", e[e.RenderStrategy = 1] = "RenderStrategy", e[e.Static = 2] = "Static", e))(Et || {}), et = ((e) => (e[e.Unmount = 0] = "Unmount", e[e.Hidden = 1] = "Hidden", e))(et || {});
function X({ visible: e = !0, features: t = 0, ourProps: n, theirProps: r, ...i }) {
  var s;
  let a = ts(r, n), o = Object.assign(i, { props: a });
  if (e || t & 2 && a.static) return Pn(o);
  if (t & 1) {
    let l = (s = a.unmount) == null || s ? 0 : 1;
    return $e(l, { 0() {
      return null;
    }, 1() {
      return Pn({ ...i, props: { ...a, hidden: !0, style: { display: "none" } } });
    } });
  }
  return Pn(o);
}
function Pn({ props: e, attrs: t, slots: n, slot: r, name: i }) {
  var s, a;
  let { as: o, ...l } = yr(e, ["unmount", "static"]), d = (s = n.default) == null ? void 0 : s.call(n, r), u = {};
  if (r) {
    let f = !1, p = [];
    for (let [v, h] of Object.entries(r)) typeof h == "boolean" && (f = !0), h === !0 && p.push(v);
    f && (u["data-headlessui-state"] = p.join(" "));
  }
  if (o === "template") {
    if (d = es(d ?? []), Object.keys(l).length > 0 || Object.keys(t).length > 0) {
      let [f, ...p] = d ?? [];
      if (!$l(f) || p.length > 0) throw new Error(['Passing props on "template"!', "", `The current component <${i} /> is rendering a "template".`, "However we need to passthrough the following props:", Object.keys(l).concat(Object.keys(t)).map((m) => m.trim()).filter((m, g, S) => S.indexOf(m) === g).sort((m, g) => m.localeCompare(g)).map((m) => `  - ${m}`).join(`
`), "", "You can apply a few solutions:", ['Add an `as="..."` prop, to ensure that we render an actual element instead of a "template".', "Render a single element as the child so that we can forward the props onto that element."].map((m) => `  - ${m}`).join(`
`)].join(`
`));
      let v = ts((a = f.props) != null ? a : {}, l, u), h = Us(f, v, !0);
      for (let m in v) m.startsWith("on") && (h.props || (h.props = {}), h.props[m] = v[m]);
      return h;
    }
    return Array.isArray(d) && d.length === 1 ? d[0] : d;
  }
  return Q(o, Object.assign({}, l, u), { default: () => d });
}
function es(e) {
  return e.flatMap((t) => t.type === Wt ? es(t.children) : [t]);
}
function ts(...e) {
  if (e.length === 0) return {};
  if (e.length === 1) return e[0];
  let t = {}, n = {};
  for (let r of e) for (let i in r) i.startsWith("on") && typeof r[i] == "function" ? (n[i] != null || (n[i] = []), n[i].push(r[i])) : t[i] = r[i];
  if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(n).map((r) => [r, void 0])));
  for (let r in n) Object.assign(t, { [r](i, ...s) {
    let a = n[r];
    for (let o of a) {
      if (i instanceof Event && i.defaultPrevented) return;
      o(i, ...s);
    }
  } });
  return t;
}
function Cl(e) {
  let t = Object.assign({}, e);
  for (let n in t) t[n] === void 0 && delete t[n];
  return t;
}
function yr(e, t = []) {
  let n = Object.assign({}, e);
  for (let r of t) r in n && delete n[r];
  return n;
}
function $l(e) {
  return e == null ? !1 : typeof e.type == "string" || typeof e.type == "object" || typeof e.type == "function";
}
var zt = ((e) => (e[e.None = 1] = "None", e[e.Focusable = 2] = "Focusable", e[e.Hidden = 4] = "Hidden", e))(zt || {});
let gn = H({ name: "Hidden", props: { as: { type: [Object, String], default: "div" }, features: { type: Number, default: 1 } }, setup(e, { slots: t, attrs: n }) {
  return () => {
    var r;
    let { features: i, ...s } = e, a = { "aria-hidden": (i & 2) === 2 ? !0 : (r = s["aria-hidden"]) != null ? r : void 0, hidden: (i & 4) === 4 ? !0 : void 0, style: { position: "fixed", top: 1, left: 1, width: 1, height: 0, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0, 0, 0, 0)", whiteSpace: "nowrap", borderWidth: "0", ...(i & 4) === 4 && (i & 2) !== 2 && { display: "none" } } };
    return X({ ourProps: a, theirProps: s, slot: {}, attrs: n, slots: t, name: "Hidden" });
  };
} }), ns = Symbol("Context");
var ee = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(ee || {});
function Ml() {
  return wn() !== null;
}
function wn() {
  return se(ns, null);
}
function rs(e) {
  pe(ns, e);
}
var L = ((e) => (e.Space = " ", e.Enter = "Enter", e.Escape = "Escape", e.Backspace = "Backspace", e.Delete = "Delete", e.ArrowLeft = "ArrowLeft", e.ArrowUp = "ArrowUp", e.ArrowRight = "ArrowRight", e.ArrowDown = "ArrowDown", e.Home = "Home", e.End = "End", e.PageUp = "PageUp", e.PageDown = "PageDown", e.Tab = "Tab", e))(L || {});
function Pl(e) {
  function t() {
    document.readyState !== "loading" && (e(), document.removeEventListener("DOMContentLoaded", t));
  }
  typeof window < "u" && typeof document < "u" && (document.addEventListener("DOMContentLoaded", t), t());
}
let lt = [];
Pl(() => {
  function e(t) {
    t.target instanceof HTMLElement && t.target !== document.body && lt[0] !== t.target && (lt.unshift(t.target), lt = lt.filter((n) => n != null && n.isConnected), lt.splice(10));
  }
  window.addEventListener("click", e, { capture: !0 }), window.addEventListener("mousedown", e, { capture: !0 }), window.addEventListener("focus", e, { capture: !0 }), document.body.addEventListener("click", e, { capture: !0 }), document.body.addEventListener("mousedown", e, { capture: !0 }), document.body.addEventListener("focus", e, { capture: !0 });
});
function Rl(e) {
  throw new Error("Unexpected object: " + e);
}
var de = ((e) => (e[e.First = 0] = "First", e[e.Previous = 1] = "Previous", e[e.Next = 2] = "Next", e[e.Last = 3] = "Last", e[e.Specific = 4] = "Specific", e[e.Nothing = 5] = "Nothing", e))(de || {});
function Ul(e, t) {
  let n = t.resolveItems();
  if (n.length <= 0) return null;
  let r = t.resolveActiveIndex(), i = r ?? -1;
  switch (e.focus) {
    case 0: {
      for (let s = 0; s < n.length; ++s) if (!t.resolveDisabled(n[s], s, n)) return s;
      return r;
    }
    case 1: {
      i === -1 && (i = n.length);
      for (let s = i - 1; s >= 0; --s) if (!t.resolveDisabled(n[s], s, n)) return s;
      return r;
    }
    case 2: {
      for (let s = i + 1; s < n.length; ++s) if (!t.resolveDisabled(n[s], s, n)) return s;
      return r;
    }
    case 3: {
      for (let s = n.length - 1; s >= 0; --s) if (!t.resolveDisabled(n[s], s, n)) return s;
      return r;
    }
    case 4: {
      for (let s = 0; s < n.length; ++s) if (t.resolveId(n[s], s, n) === e.id) return s;
      return r;
    }
    case 5:
      return null;
    default:
      Rl(e);
  }
}
function is(e = {}, t = null, n = []) {
  for (let [r, i] of Object.entries(e)) as(n, ss(t, r), i);
  return n;
}
function ss(e, t) {
  return e ? e + "[" + t + "]" : t;
}
function as(e, t, n) {
  if (Array.isArray(n)) for (let [r, i] of n.entries()) as(e, ss(t, r.toString()), i);
  else n instanceof Date ? e.push([t, n.toISOString()]) : typeof n == "boolean" ? e.push([t, n ? "1" : "0"]) : typeof n == "string" ? e.push([t, n]) : typeof n == "number" ? e.push([t, `${n}`]) : n == null ? e.push([t, ""]) : is(n, t, e);
}
function Bl(e) {
  var t, n;
  let r = (t = e == null ? void 0 : e.form) != null ? t : e.closest("form");
  if (r) {
    for (let i of r.elements) if (i !== e && (i.tagName === "INPUT" && i.type === "submit" || i.tagName === "BUTTON" && i.type === "submit" || i.nodeName === "INPUT" && i.type === "image")) {
      i.click();
      return;
    }
    (n = r.requestSubmit) == null || n.call(r);
  }
}
function os(e, t, n, r) {
  Jt.isServer || oe((i) => {
    e = e ?? window, e.addEventListener(t, n, r), i(() => e.removeEventListener(t, n, r));
  });
}
var Pt = ((e) => (e[e.Forwards = 0] = "Forwards", e[e.Backwards = 1] = "Backwards", e))(Pt || {});
function Dl() {
  let e = E(0);
  return Yi("keydown", (t) => {
    t.key === "Tab" && (e.value = t.shiftKey ? 1 : 0);
  }), e;
}
function ls(e) {
  if (!e) return /* @__PURE__ */ new Set();
  if (typeof e == "function") return new Set(e());
  let t = /* @__PURE__ */ new Set();
  for (let n of e.value) {
    let r = I(n);
    r instanceof HTMLElement && t.add(r);
  }
  return t;
}
var us = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(us || {});
let It = Object.assign(H({ name: "FocusTrap", props: { as: { type: [Object, String], default: "div" }, initialFocus: { type: Object, default: null }, features: { type: Number, default: 30 }, containers: { type: [Object, Function], default: E(/* @__PURE__ */ new Set()) } }, inheritAttrs: !1, setup(e, { attrs: t, slots: n, expose: r }) {
  let i = E(null);
  r({ el: i, $el: i });
  let s = O(() => Ce(i)), a = E(!1);
  J(() => a.value = !0), le(() => a.value = !1), Nl({ ownerDocument: s }, O(() => a.value && !!(e.features & 16)));
  let o = Ll({ ownerDocument: s, container: i, initialFocus: O(() => e.initialFocus) }, O(() => a.value && !!(e.features & 2)));
  Fl({ ownerDocument: s, container: i, containers: e.containers, previousActiveElement: o }, O(() => a.value && !!(e.features & 8)));
  let l = Dl();
  function d(v) {
    let h = I(i);
    h && ((m) => m())(() => {
      $e(l.value, { [Pt.Forwards]: () => {
        ft(h, ae.First, { skipElements: [v.relatedTarget] });
      }, [Pt.Backwards]: () => {
        ft(h, ae.Last, { skipElements: [v.relatedTarget] });
      } });
    });
  }
  let u = E(!1);
  function f(v) {
    v.key === "Tab" && (u.value = !0, requestAnimationFrame(() => {
      u.value = !1;
    }));
  }
  function p(v) {
    if (!a.value) return;
    let h = ls(e.containers);
    I(i) instanceof HTMLElement && h.add(I(i));
    let m = v.relatedTarget;
    m instanceof HTMLElement && m.dataset.headlessuiFocusGuard !== "true" && (cs(h, m) || (u.value ? ft(I(i), $e(l.value, { [Pt.Forwards]: () => ae.Next, [Pt.Backwards]: () => ae.Previous }) | ae.WrapAround, { relativeTo: v.target }) : v.target instanceof HTMLElement && tt(v.target)));
  }
  return () => {
    let v = {}, h = { ref: i, onKeydown: f, onFocusout: p }, { features: m, initialFocus: g, containers: S, ...w } = e;
    return Q(Wt, [!!(m & 4) && Q(gn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: d, features: zt.Focusable }), X({ ourProps: h, theirProps: { ...t, ...w }, slot: v, attrs: t, slots: n, name: "FocusTrap" }), !!(m & 4) && Q(gn, { as: "button", type: "button", "data-headlessui-focus-guard": !0, onFocus: d, features: zt.Focusable })]);
  };
} }), { features: us });
function _l(e) {
  let t = E(lt.slice());
  return qe([e], ([n], [r]) => {
    r === !0 && n === !1 ? vr(() => {
      t.value.splice(0);
    }) : r === !1 && n === !0 && (t.value = lt.slice());
  }, { flush: "post" }), () => {
    var n;
    return (n = t.value.find((r) => r != null && r.isConnected)) != null ? n : null;
  };
}
function Nl({ ownerDocument: e }, t) {
  let n = _l(t);
  J(() => {
    oe(() => {
      var r, i;
      t.value || ((r = e.value) == null ? void 0 : r.activeElement) === ((i = e.value) == null ? void 0 : i.body) && tt(n());
    }, { flush: "post" });
  }), le(() => {
    t.value && tt(n());
  });
}
function Ll({ ownerDocument: e, container: t, initialFocus: n }, r) {
  let i = E(null), s = E(!1);
  return J(() => s.value = !0), le(() => s.value = !1), J(() => {
    qe([t, n, r], (a, o) => {
      if (a.every((d, u) => (o == null ? void 0 : o[u]) === d) || !r.value) return;
      let l = I(t);
      l && vr(() => {
        var d, u;
        if (!s.value) return;
        let f = I(n), p = (d = e.value) == null ? void 0 : d.activeElement;
        if (f) {
          if (f === p) {
            i.value = p;
            return;
          }
        } else if (l.contains(p)) {
          i.value = p;
          return;
        }
        f ? tt(f) : ft(l, ae.First | ae.NoScroll) === vn.Error && console.warn("There are no focusable elements inside the <FocusTrap />"), i.value = (u = e.value) == null ? void 0 : u.activeElement;
      });
    }, { immediate: !0, flush: "post" });
  }), i;
}
function Fl({ ownerDocument: e, container: t, containers: n, previousActiveElement: r }, i) {
  var s;
  os((s = e.value) == null ? void 0 : s.defaultView, "focus", (a) => {
    if (!i.value) return;
    let o = ls(n);
    I(t) instanceof HTMLElement && o.add(I(t));
    let l = r.value;
    if (!l) return;
    let d = a.target;
    d && d instanceof HTMLElement ? cs(o, d) ? (r.value = d, tt(d)) : (a.preventDefault(), a.stopPropagation(), tt(l)) : tt(r.value);
  }, !0);
}
function cs(e, t) {
  for (let n of e) if (n.contains(t)) return !0;
  return !1;
}
function Vl(e) {
  let t = Nt(e.getSnapshot());
  return le(e.subscribe(() => {
    t.value = e.getSnapshot();
  })), t;
}
function zl(e, t) {
  let n = e(), r = /* @__PURE__ */ new Set();
  return { getSnapshot() {
    return n;
  }, subscribe(i) {
    return r.add(i), () => r.delete(i);
  }, dispatch(i, ...s) {
    let a = t[i].call(n, ...s);
    a && (n = a, r.forEach((o) => o()));
  } };
}
function Wl() {
  let e;
  return { before({ doc: t }) {
    var n;
    let r = t.documentElement;
    e = ((n = t.defaultView) != null ? n : window).innerWidth - r.clientWidth;
  }, after({ doc: t, d: n }) {
    let r = t.documentElement, i = r.clientWidth - r.offsetWidth, s = e - i;
    n.style(r, "paddingRight", `${s}px`);
  } };
}
function Gl() {
  return Xi() ? { before({ doc: e, d: t, meta: n }) {
    function r(i) {
      return n.containers.flatMap((s) => s()).some((s) => s.contains(i));
    }
    t.microTask(() => {
      var i;
      if (window.getComputedStyle(e.documentElement).scrollBehavior !== "auto") {
        let o = qt();
        o.style(e.documentElement, "scrollBehavior", "auto"), t.add(() => t.microTask(() => o.dispose()));
      }
      let s = (i = window.scrollY) != null ? i : window.pageYOffset, a = null;
      t.addEventListener(e, "click", (o) => {
        if (o.target instanceof HTMLElement) try {
          let l = o.target.closest("a");
          if (!l) return;
          let { hash: d } = new URL(l.href), u = e.querySelector(d);
          u && !r(u) && (a = u);
        } catch {
        }
      }, !0), t.addEventListener(e, "touchstart", (o) => {
        if (o.target instanceof HTMLElement) if (r(o.target)) {
          let l = o.target;
          for (; l.parentElement && r(l.parentElement); ) l = l.parentElement;
          t.style(l, "overscrollBehavior", "contain");
        } else t.style(o.target, "touchAction", "none");
      }), t.addEventListener(e, "touchmove", (o) => {
        if (o.target instanceof HTMLElement) {
          if (o.target.tagName === "INPUT") return;
          if (r(o.target)) {
            let l = o.target;
            for (; l.parentElement && l.dataset.headlessuiPortal !== "" && !(l.scrollHeight > l.clientHeight || l.scrollWidth > l.clientWidth); ) l = l.parentElement;
            l.dataset.headlessuiPortal === "" && o.preventDefault();
          } else o.preventDefault();
        }
      }, { passive: !1 }), t.add(() => {
        var o;
        let l = (o = window.scrollY) != null ? o : window.pageYOffset;
        s !== l && window.scrollTo(0, s), a && a.isConnected && (a.scrollIntoView({ block: "nearest" }), a = null);
      });
    });
  } } : {};
}
function Hl() {
  return { before({ doc: e, d: t }) {
    t.style(e.documentElement, "overflow", "hidden");
  } };
}
function Kl(e) {
  let t = {};
  for (let n of e) Object.assign(t, n(t));
  return t;
}
let ct = zl(() => /* @__PURE__ */ new Map(), { PUSH(e, t) {
  var n;
  let r = (n = this.get(e)) != null ? n : { doc: e, count: 0, d: qt(), meta: /* @__PURE__ */ new Set() };
  return r.count++, r.meta.add(t), this.set(e, r), this;
}, POP(e, t) {
  let n = this.get(e);
  return n && (n.count--, n.meta.delete(t)), this;
}, SCROLL_PREVENT({ doc: e, d: t, meta: n }) {
  let r = { doc: e, d: t, meta: Kl(n) }, i = [Gl(), Wl(), Hl()];
  i.forEach(({ before: s }) => s == null ? void 0 : s(r)), i.forEach(({ after: s }) => s == null ? void 0 : s(r));
}, SCROLL_ALLOW({ d: e }) {
  e.dispose();
}, TEARDOWN({ doc: e }) {
  this.delete(e);
} });
ct.subscribe(() => {
  let e = ct.getSnapshot(), t = /* @__PURE__ */ new Map();
  for (let [n] of e) t.set(n, n.documentElement.style.overflow);
  for (let n of e.values()) {
    let r = t.get(n.doc) === "hidden", i = n.count !== 0;
    (i && !r || !i && r) && ct.dispatch(n.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", n), n.count === 0 && ct.dispatch("TEARDOWN", n);
  }
});
function ql(e, t, n) {
  let r = Vl(ct), i = O(() => {
    let s = e.value ? r.value.get(e.value) : void 0;
    return s ? s.count > 0 : !1;
  });
  return qe([e, t], ([s, a], [o], l) => {
    if (!s || !a) return;
    ct.dispatch("PUSH", s, n);
    let d = !1;
    l(() => {
      d || (ct.dispatch("POP", o ?? s, n), d = !0);
    });
  }, { immediate: !0 }), i;
}
let Rn = /* @__PURE__ */ new Map(), xt = /* @__PURE__ */ new Map();
function Gr(e, t = E(!0)) {
  oe((n) => {
    var r;
    if (!t.value) return;
    let i = I(e);
    if (!i) return;
    n(function() {
      var a;
      if (!i) return;
      let o = (a = xt.get(i)) != null ? a : 1;
      if (o === 1 ? xt.delete(i) : xt.set(i, o - 1), o !== 1) return;
      let l = Rn.get(i);
      l && (l["aria-hidden"] === null ? i.removeAttribute("aria-hidden") : i.setAttribute("aria-hidden", l["aria-hidden"]), i.inert = l.inert, Rn.delete(i));
    });
    let s = (r = xt.get(i)) != null ? r : 0;
    xt.set(i, s + 1), s === 0 && (Rn.set(i, { "aria-hidden": i.getAttribute("aria-hidden"), inert: i.inert }), i.setAttribute("aria-hidden", "true"), i.inert = !0);
  });
}
function Jl({ defaultContainers: e = [], portals: t, mainTreeNodeRef: n } = {}) {
  let r = E(null), i = Ce(r);
  function s() {
    var a, o, l;
    let d = [];
    for (let u of e) u !== null && (u instanceof HTMLElement ? d.push(u) : "value" in u && u.value instanceof HTMLElement && d.push(u.value));
    if (t != null && t.value) for (let u of t.value) d.push(u);
    for (let u of (a = i == null ? void 0 : i.querySelectorAll("html > *, body > *")) != null ? a : []) u !== document.body && u !== document.head && u instanceof HTMLElement && u.id !== "headlessui-portal-root" && (u.contains(I(r)) || u.contains((l = (o = I(r)) == null ? void 0 : o.getRootNode()) == null ? void 0 : l.host) || d.some((f) => u.contains(f)) || d.push(u));
    return d;
  }
  return { resolveContainers: s, contains(a) {
    return s().some((o) => o.contains(a));
  }, mainTreeNodeRef: r, MainTreeNode() {
    return n != null ? null : Q(gn, { features: zt.Hidden, ref: r });
  } };
}
let ds = Symbol("ForcePortalRootContext");
function Xl() {
  return se(ds, !1);
}
let qn = H({ name: "ForcePortalRoot", props: { as: { type: [Object, String], default: "template" }, force: { type: Boolean, default: !1 } }, setup(e, { slots: t, attrs: n }) {
  return pe(ds, e.force), () => {
    let { force: r, ...i } = e;
    return X({ theirProps: i, ourProps: {}, slot: {}, slots: t, attrs: n, name: "ForcePortalRoot" });
  };
} }), fs = Symbol("StackContext");
var Jn = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(Jn || {});
function Yl() {
  return se(fs, () => {
  });
}
function Zl({ type: e, enabled: t, element: n, onUpdate: r }) {
  let i = Yl();
  function s(...a) {
    r == null || r(...a), i(...a);
  }
  J(() => {
    qe(t, (a, o) => {
      a ? s(0, e, n) : o === !0 && s(1, e, n);
    }, { immediate: !0, flush: "sync" });
  }), le(() => {
    t.value && s(1, e, n);
  }), pe(fs, s);
}
let ps = Symbol("DescriptionContext");
function Ql() {
  let e = se(ps, null);
  if (e === null) throw new Error("Missing parent");
  return e;
}
function wr({ slot: e = E({}), name: t = "Description", props: n = {} } = {}) {
  let r = E([]);
  function i(s) {
    return r.value.push(s), () => {
      let a = r.value.indexOf(s);
      a !== -1 && r.value.splice(a, 1);
    };
  }
  return pe(ps, { register: i, slot: e, name: t, props: n }), O(() => r.value.length > 0 ? r.value.join(" ") : void 0);
}
H({ name: "Description", props: { as: { type: [Object, String], default: "p" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let i = (r = e.id) != null ? r : `headlessui-description-${ve()}`, s = Ql();
  return J(() => le(s.register(i))), () => {
    let { name: a = "Description", slot: o = E({}), props: l = {} } = s, { ...d } = e, u = { ...Object.entries(l).reduce((f, [p, v]) => Object.assign(f, { [p]: C(v) }), {}), id: i };
    return X({ ourProps: u, theirProps: d, slot: o.value, attrs: t, slots: n, name: a });
  };
} });
function eu(e) {
  let t = Ce(e);
  if (!t) {
    if (e === null) return null;
    throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e}`);
  }
  let n = t.getElementById("headlessui-portal-root");
  if (n) return n;
  let r = t.createElement("div");
  return r.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(r);
}
const Xn = /* @__PURE__ */ new WeakMap();
function tu(e) {
  var t;
  return (t = Xn.get(e)) != null ? t : 0;
}
function Hr(e, t) {
  let n = t(tu(e));
  return n <= 0 ? Xn.delete(e) : Xn.set(e, n), n;
}
let hs = H({ name: "Portal", props: { as: { type: [Object, String], default: "div" } }, setup(e, { slots: t, attrs: n }) {
  let r = E(null), i = O(() => Ce(r)), s = Xl(), a = se(vs, null), o = E(s === !0 || a == null ? eu(r.value) : a.resolveTarget());
  o.value && Hr(o.value, (p) => p + 1);
  let l = E(!1);
  J(() => {
    l.value = !0;
  }), oe(() => {
    s || a != null && (o.value = a.resolveTarget());
  });
  let d = se(Yn, null), u = !1, f = ni();
  return qe(r, () => {
    if (u || !d) return;
    let p = I(r);
    p && (le(d.register(p), f), u = !0);
  }), le(() => {
    var p, v;
    let h = (p = i.value) == null ? void 0 : p.getElementById("headlessui-portal-root");
    !h || o.value !== h || Hr(o.value, (m) => m - 1) || o.value.children.length > 0 || (v = o.value.parentElement) == null || v.removeChild(o.value);
  }), () => {
    if (!l.value || o.value === null) return null;
    let p = { ref: r, "data-headlessui-portal": "" };
    return Q(Bs, { to: o.value }, X({ ourProps: p, theirProps: e, slot: {}, attrs: n, slots: t, name: "Portal" }));
  };
} }), Yn = Symbol("PortalParentContext");
function nu() {
  let e = se(Yn, null), t = E([]);
  function n(s) {
    return t.value.push(s), e && e.register(s), () => r(s);
  }
  function r(s) {
    let a = t.value.indexOf(s);
    a !== -1 && t.value.splice(a, 1), e && e.unregister(s);
  }
  let i = { register: n, unregister: r, portals: t };
  return [t, H({ name: "PortalWrapper", setup(s, { slots: a }) {
    return pe(Yn, i), () => {
      var o;
      return (o = a.default) == null ? void 0 : o.call(a);
    };
  } })];
}
let vs = Symbol("PortalGroupContext"), ru = H({ name: "PortalGroup", props: { as: { type: [Object, String], default: "template" }, target: { type: Object, default: null } }, setup(e, { attrs: t, slots: n }) {
  let r = Bn({ resolveTarget() {
    return e.target;
  } });
  return pe(vs, r), () => {
    let { target: i, ...s } = e;
    return X({ theirProps: s, ourProps: {}, slot: {}, attrs: t, slots: n, name: "PortalGroup" });
  };
} });
var iu = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(iu || {});
let Zn = Symbol("DialogContext");
function Xt(e) {
  let t = se(Zn, null);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Dialog /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Xt), n;
  }
  return t;
}
let en = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", su = H({ name: "Dialog", inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, open: { type: [Boolean, String], default: en }, initialFocus: { type: Object, default: null }, id: { type: String, default: null }, role: { type: String, default: "dialog" } }, emits: { close: (e) => !0 }, setup(e, { emit: t, attrs: n, slots: r, expose: i }) {
  var s, a;
  let o = (s = e.id) != null ? s : `headlessui-dialog-${ve()}`, l = E(!1);
  J(() => {
    l.value = !0;
  });
  let d = !1, u = O(() => e.role === "dialog" || e.role === "alertdialog" ? e.role : (d || (d = !0, console.warn(`Invalid role [${u}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), f = E(0), p = wn(), v = O(() => e.open === en && p !== null ? (p.value & ee.Open) === ee.Open : e.open), h = E(null), m = O(() => Ce(h));
  if (i({ el: h, $el: h }), !(e.open !== en || p !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
  if (typeof v.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${v.value === en ? void 0 : e.open}`);
  let g = O(() => l.value && v.value ? 0 : 1), S = O(() => g.value === 0), w = O(() => f.value > 1), $ = se(Zn, null) !== null, [M, Oe] = nu(), { resolveContainers: ge, mainTreeNodeRef: Je, MainTreeNode: Te } = Jl({ portals: M, defaultContainers: [O(() => {
    var N;
    return (N = gt.panelRef.value) != null ? N : h.value;
  })] }), Tt = O(() => w.value ? "parent" : "leaf"), R = O(() => p !== null ? (p.value & ee.Closing) === ee.Closing : !1), Y = O(() => $ || R.value ? !1 : S.value), me = O(() => {
    var N, K, be;
    return (be = Array.from((K = (N = m.value) == null ? void 0 : N.querySelectorAll("body > *")) != null ? K : []).find((ye) => ye.id === "headlessui-portal-root" ? !1 : ye.contains(I(Je)) && ye instanceof HTMLElement)) != null ? be : null;
  });
  Gr(me, Y);
  let Me = O(() => w.value ? !0 : S.value), kt = O(() => {
    var N, K, be;
    return (be = Array.from((K = (N = m.value) == null ? void 0 : N.querySelectorAll("[data-headlessui-portal]")) != null ? K : []).find((ye) => ye.contains(I(Je)) && ye instanceof HTMLElement)) != null ? be : null;
  });
  Gr(kt, Me), Zl({ type: "Dialog", enabled: O(() => g.value === 0), element: h, onUpdate: (N, K) => {
    if (K === "Dialog") return $e(N, { [Jn.Add]: () => f.value += 1, [Jn.Remove]: () => f.value -= 1 });
  } });
  let De = wr({ name: "DialogDescription", slot: O(() => ({ open: v.value })) }), _e = E(null), gt = { titleId: _e, panelRef: E(null), dialogState: g, setTitleId(N) {
    _e.value !== N && (_e.value = N);
  }, close() {
    t("close", !1);
  } };
  pe(Zn, gt);
  let Tr = O(() => !(!S.value || w.value));
  Zi(ge, (N, K) => {
    N.preventDefault(), gt.close(), Ue(() => K == null ? void 0 : K.focus());
  }, Tr);
  let kr = O(() => !(w.value || g.value !== 0));
  os((a = m.value) == null ? void 0 : a.defaultView, "keydown", (N) => {
    kr.value && (N.defaultPrevented || N.key === L.Escape && (N.preventDefault(), N.stopPropagation(), gt.close()));
  });
  let Ar = O(() => !(R.value || g.value !== 0 || $));
  return ql(m, Ar, (N) => {
    var K;
    return { containers: [...(K = N.containers) != null ? K : [], ge] };
  }), oe((N) => {
    if (g.value !== 0) return;
    let K = I(h);
    if (!K) return;
    let be = new ResizeObserver((ye) => {
      for (let On of ye) {
        let Yt = On.target.getBoundingClientRect();
        Yt.x === 0 && Yt.y === 0 && Yt.width === 0 && Yt.height === 0 && gt.close();
      }
    });
    be.observe(K), N(() => be.disconnect());
  }), () => {
    let { open: N, initialFocus: K, ...be } = e, ye = { ...n, ref: h, id: o, role: u.value, "aria-modal": g.value === 0 ? !0 : void 0, "aria-labelledby": _e.value, "aria-describedby": De.value }, On = { open: g.value === 0 };
    return Q(qn, { force: !0 }, () => [Q(hs, () => Q(ru, { target: h.value }, () => Q(qn, { force: !1 }, () => Q(It, { initialFocus: K, containers: ge, features: S.value ? $e(Tt.value, { parent: It.features.RestoreFocus, leaf: It.features.All & ~It.features.FocusLock }) : It.features.None }, () => Q(Oe, {}, () => X({ ourProps: ye, theirProps: { ...be, ...n }, slot: On, attrs: n, slots: r, visible: g.value === 0, features: Et.RenderStrategy | Et.Static, name: "Dialog" })))))), Q(Te)]);
  };
} });
H({ name: "DialogOverlay", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let i = (r = e.id) != null ? r : `headlessui-dialog-overlay-${ve()}`, s = Xt("DialogOverlay");
  function a(o) {
    o.target === o.currentTarget && (o.preventDefault(), o.stopPropagation(), s.close());
  }
  return () => {
    let { ...o } = e;
    return X({ ourProps: { id: i, "aria-hidden": !0, onClick: a }, theirProps: o, slot: { open: s.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogOverlay" });
  };
} });
H({ name: "DialogBackdrop", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { attrs: t, slots: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-dialog-backdrop-${ve()}`, a = Xt("DialogBackdrop"), o = E(null);
  return r({ el: o, $el: o }), J(() => {
    if (a.panelRef.value === null) throw new Error("A <DialogBackdrop /> component is being used, but a <DialogPanel /> component is missing.");
  }), () => {
    let { ...l } = e, d = { id: s, ref: o, "aria-hidden": !0 };
    return Q(qn, { force: !0 }, () => Q(hs, () => X({ ourProps: d, theirProps: { ...t, ...l }, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogBackdrop" })));
  };
} });
let au = H({ name: "DialogPanel", props: { as: { type: [Object, String], default: "div" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-dialog-panel-${ve()}`, a = Xt("DialogPanel");
  r({ el: a.panelRef, $el: a.panelRef });
  function o(l) {
    l.stopPropagation();
  }
  return () => {
    let { ...l } = e, d = { id: s, ref: a.panelRef, onClick: o };
    return X({ ourProps: d, theirProps: l, slot: { open: a.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogPanel" });
  };
} }), ou = H({ name: "DialogTitle", props: { as: { type: [Object, String], default: "h2" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n }) {
  var r;
  let i = (r = e.id) != null ? r : `headlessui-dialog-title-${ve()}`, s = Xt("DialogTitle");
  return J(() => {
    s.setTitleId(i), le(() => s.setTitleId(null));
  }), () => {
    let { ...a } = e;
    return X({ ourProps: { id: i }, theirProps: a, slot: { open: s.dialogState.value === 0 }, attrs: t, slots: n, name: "DialogTitle" });
  };
} }), Kr = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function qr(e) {
  var t, n;
  let r = (t = e.innerText) != null ? t : "", i = e.cloneNode(!0);
  if (!(i instanceof HTMLElement)) return r;
  let s = !1;
  for (let o of i.querySelectorAll('[hidden],[aria-hidden],[role="img"]')) o.remove(), s = !0;
  let a = s ? (n = i.innerText) != null ? n : "" : r;
  return Kr.test(a) && (a = a.replace(Kr, "")), a;
}
function lu(e) {
  let t = e.getAttribute("aria-label");
  if (typeof t == "string") return t.trim();
  let n = e.getAttribute("aria-labelledby");
  if (n) {
    let r = n.split(" ").map((i) => {
      let s = document.getElementById(i);
      if (s) {
        let a = s.getAttribute("aria-label");
        return typeof a == "string" ? a.trim() : qr(s).trim();
      }
      return null;
    }).filter(Boolean);
    if (r.length > 0) return r.join(", ");
  }
  return qr(e).trim();
}
function uu(e) {
  let t = E(""), n = E("");
  return () => {
    let r = I(e);
    if (!r) return "";
    let i = r.innerText;
    if (t.value === i) return n.value;
    let s = lu(r).trim().toLowerCase();
    return t.value = i, n.value = s, s;
  };
}
var cu = ((e) => (e[e.Open = 0] = "Open", e[e.Closed = 1] = "Closed", e))(cu || {}), du = ((e) => (e[e.Pointer = 0] = "Pointer", e[e.Other = 1] = "Other", e))(du || {});
function fu(e) {
  requestAnimationFrame(() => requestAnimationFrame(e));
}
let gs = Symbol("MenuContext");
function Sn(e) {
  let t = se(gs, null);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Sn), n;
  }
  return t;
}
let pu = H({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(e, { slots: t, attrs: n }) {
  let r = E(1), i = E(null), s = E(null), a = E([]), o = E(""), l = E(null), d = E(1);
  function u(p = (v) => v) {
    let v = l.value !== null ? a.value[l.value] : null, h = br(p(a.value.slice()), (g) => I(g.dataRef.domRef)), m = v ? h.indexOf(v) : null;
    return m === -1 && (m = null), { items: h, activeItemIndex: m };
  }
  let f = { menuState: r, buttonRef: i, itemsRef: s, items: a, searchQuery: o, activeItemIndex: l, activationTrigger: d, closeMenu: () => {
    r.value = 1, l.value = null;
  }, openMenu: () => r.value = 0, goToItem(p, v, h) {
    let m = u(), g = Ul(p === de.Specific ? { focus: de.Specific, id: v } : { focus: p }, { resolveItems: () => m.items, resolveActiveIndex: () => m.activeItemIndex, resolveId: (S) => S.id, resolveDisabled: (S) => S.dataRef.disabled });
    o.value = "", l.value = g, d.value = h ?? 1, a.value = m.items;
  }, search(p) {
    let v = o.value !== "" ? 0 : 1;
    o.value += p.toLowerCase();
    let h = (l.value !== null ? a.value.slice(l.value + v).concat(a.value.slice(0, l.value + v)) : a.value).find((g) => g.dataRef.textValue.startsWith(o.value) && !g.dataRef.disabled), m = h ? a.value.indexOf(h) : -1;
    m === -1 || m === l.value || (l.value = m, d.value = 1);
  }, clearSearch() {
    o.value = "";
  }, registerItem(p, v) {
    let h = u((m) => [...m, { id: p, dataRef: v }]);
    a.value = h.items, l.value = h.activeItemIndex, d.value = 1;
  }, unregisterItem(p) {
    let v = u((h) => {
      let m = h.findIndex((g) => g.id === p);
      return m !== -1 && h.splice(m, 1), h;
    });
    a.value = v.items, l.value = v.activeItemIndex, d.value = 1;
  } };
  return Zi([i, s], (p, v) => {
    var h;
    f.closeMenu(), mr(v, gr.Loose) || (p.preventDefault(), (h = I(i)) == null || h.focus());
  }, O(() => r.value === 0)), pe(gs, f), rs(O(() => $e(r.value, { 0: ee.Open, 1: ee.Closed }))), () => {
    let p = { open: r.value === 0, close: f.closeMenu };
    return X({ ourProps: {}, theirProps: e, slot: p, slots: t, attrs: n, name: "Menu" });
  };
} }), hu = H({ name: "MenuButton", props: { disabled: { type: Boolean, default: !1 }, as: { type: [Object, String], default: "button" }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-menu-button-${ve()}`, a = Sn("MenuButton");
  r({ el: a.buttonRef, $el: a.buttonRef });
  function o(f) {
    switch (f.key) {
      case L.Space:
      case L.Enter:
      case L.ArrowDown:
        f.preventDefault(), f.stopPropagation(), a.openMenu(), Ue(() => {
          var p;
          (p = I(a.itemsRef)) == null || p.focus({ preventScroll: !0 }), a.goToItem(de.First);
        });
        break;
      case L.ArrowUp:
        f.preventDefault(), f.stopPropagation(), a.openMenu(), Ue(() => {
          var p;
          (p = I(a.itemsRef)) == null || p.focus({ preventScroll: !0 }), a.goToItem(de.Last);
        });
        break;
    }
  }
  function l(f) {
    switch (f.key) {
      case L.Space:
        f.preventDefault();
        break;
    }
  }
  function d(f) {
    e.disabled || (a.menuState.value === 0 ? (a.closeMenu(), Ue(() => {
      var p;
      return (p = I(a.buttonRef)) == null ? void 0 : p.focus({ preventScroll: !0 });
    })) : (f.preventDefault(), a.openMenu(), fu(() => {
      var p;
      return (p = I(a.itemsRef)) == null ? void 0 : p.focus({ preventScroll: !0 });
    })));
  }
  let u = Il(O(() => ({ as: e.as, type: t.type })), a.buttonRef);
  return () => {
    var f;
    let p = { open: a.menuState.value === 0 }, { ...v } = e, h = { ref: a.buttonRef, id: s, type: u.value, "aria-haspopup": "menu", "aria-controls": (f = I(a.itemsRef)) == null ? void 0 : f.id, "aria-expanded": a.menuState.value === 0, onKeydown: o, onKeyup: l, onClick: d };
    return X({ ourProps: h, theirProps: v, slot: p, attrs: t, slots: n, name: "MenuButton" });
  };
} }), vu = H({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: !1 }, unmount: { type: Boolean, default: !0 }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-menu-items-${ve()}`, a = Sn("MenuItems"), o = E(null);
  r({ el: a.itemsRef, $el: a.itemsRef }), Qi({ container: O(() => I(a.itemsRef)), enabled: O(() => a.menuState.value === 0), accept(p) {
    return p.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : p.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(p) {
    p.setAttribute("role", "none");
  } });
  function l(p) {
    var v;
    switch (o.value && clearTimeout(o.value), p.key) {
      case L.Space:
        if (a.searchQuery.value !== "") return p.preventDefault(), p.stopPropagation(), a.search(p.key);
      case L.Enter:
        if (p.preventDefault(), p.stopPropagation(), a.activeItemIndex.value !== null) {
          let h = a.items.value[a.activeItemIndex.value];
          (v = I(h.dataRef.domRef)) == null || v.click();
        }
        a.closeMenu(), Ji(I(a.buttonRef));
        break;
      case L.ArrowDown:
        return p.preventDefault(), p.stopPropagation(), a.goToItem(de.Next);
      case L.ArrowUp:
        return p.preventDefault(), p.stopPropagation(), a.goToItem(de.Previous);
      case L.Home:
      case L.PageUp:
        return p.preventDefault(), p.stopPropagation(), a.goToItem(de.First);
      case L.End:
      case L.PageDown:
        return p.preventDefault(), p.stopPropagation(), a.goToItem(de.Last);
      case L.Escape:
        p.preventDefault(), p.stopPropagation(), a.closeMenu(), Ue(() => {
          var h;
          return (h = I(a.buttonRef)) == null ? void 0 : h.focus({ preventScroll: !0 });
        });
        break;
      case L.Tab:
        p.preventDefault(), p.stopPropagation(), a.closeMenu(), Ue(() => kl(I(a.buttonRef), p.shiftKey ? ae.Previous : ae.Next));
        break;
      default:
        p.key.length === 1 && (a.search(p.key), o.value = setTimeout(() => a.clearSearch(), 350));
        break;
    }
  }
  function d(p) {
    switch (p.key) {
      case L.Space:
        p.preventDefault();
        break;
    }
  }
  let u = wn(), f = O(() => u !== null ? (u.value & ee.Open) === ee.Open : a.menuState.value === 0);
  return () => {
    var p, v;
    let h = { open: a.menuState.value === 0 }, { ...m } = e, g = { "aria-activedescendant": a.activeItemIndex.value === null || (p = a.items.value[a.activeItemIndex.value]) == null ? void 0 : p.id, "aria-labelledby": (v = I(a.buttonRef)) == null ? void 0 : v.id, id: s, onKeydown: l, onKeyup: d, role: "menu", tabIndex: 0, ref: a.itemsRef };
    return X({ ourProps: g, theirProps: m, slot: h, attrs: t, slots: n, features: Et.RenderStrategy | Et.Static, visible: f.value, name: "MenuItems" });
  };
} }), Jr = H({ name: "MenuItem", inheritAttrs: !1, props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: !1 }, id: { type: String, default: null } }, setup(e, { slots: t, attrs: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-menu-item-${ve()}`, a = Sn("MenuItem"), o = E(null);
  r({ el: o, $el: o });
  let l = O(() => a.activeItemIndex.value !== null ? a.items.value[a.activeItemIndex.value].id === s : !1), d = uu(o), u = O(() => ({ disabled: e.disabled, get textValue() {
    return d();
  }, domRef: o }));
  J(() => a.registerItem(s, u)), le(() => a.unregisterItem(s)), oe(() => {
    a.menuState.value === 0 && l.value && a.activationTrigger.value !== 0 && Ue(() => {
      var S, w;
      return (w = (S = I(o)) == null ? void 0 : S.scrollIntoView) == null ? void 0 : w.call(S, { block: "nearest" });
    });
  });
  function f(S) {
    if (e.disabled) return S.preventDefault();
    a.closeMenu(), Ji(I(a.buttonRef));
  }
  function p() {
    if (e.disabled) return a.goToItem(de.Nothing);
    a.goToItem(de.Specific, s);
  }
  let v = xl();
  function h(S) {
    v.update(S);
  }
  function m(S) {
    v.wasMoved(S) && (e.disabled || l.value || a.goToItem(de.Specific, s, 0));
  }
  function g(S) {
    v.wasMoved(S) && (e.disabled || l.value && a.goToItem(de.Nothing));
  }
  return () => {
    let { disabled: S, ...w } = e, $ = { active: l.value, disabled: S, close: a.closeMenu };
    return X({ ourProps: { id: s, ref: o, role: "menuitem", tabIndex: S === !0 ? void 0 : -1, "aria-disabled": S === !0 ? !0 : void 0, onClick: f, onFocus: p, onPointerenter: h, onMouseenter: h, onPointermove: m, onMousemove: m, onPointerleave: g, onMouseleave: g }, theirProps: { ...n, ...w }, slot: $, attrs: n, slots: t, name: "MenuItem" });
  };
} }), ms = Symbol("LabelContext");
function bs() {
  let e = se(ms, null);
  if (e === null) {
    let t = new Error("You used a <Label /> component, but it is not inside a parent.");
    throw Error.captureStackTrace && Error.captureStackTrace(t, bs), t;
  }
  return e;
}
function ys({ slot: e = {}, name: t = "Label", props: n = {} } = {}) {
  let r = E([]);
  function i(s) {
    return r.value.push(s), () => {
      let a = r.value.indexOf(s);
      a !== -1 && r.value.splice(a, 1);
    };
  }
  return pe(ms, { register: i, slot: e, name: t, props: n }), O(() => r.value.length > 0 ? r.value.join(" ") : void 0);
}
let gu = H({ name: "Label", props: { as: { type: [Object, String], default: "label" }, passive: { type: [Boolean], default: !1 }, id: { type: String, default: null } }, setup(e, { slots: t, attrs: n }) {
  var r;
  let i = (r = e.id) != null ? r : `headlessui-label-${ve()}`, s = bs();
  return J(() => le(s.register(i))), () => {
    let { name: a = "Label", slot: o = {}, props: l = {} } = s, { passive: d, ...u } = e, f = { ...Object.entries(l).reduce((p, [v, h]) => Object.assign(p, { [v]: C(h) }), {}), id: i };
    return d && (delete f.onClick, delete f.htmlFor, delete u.onClick), X({ ourProps: f, theirProps: u, slot: o, attrs: n, slots: t, name: a });
  };
} });
function mu(e, t) {
  return e === t;
}
let ws = Symbol("RadioGroupContext");
function Ss(e) {
  let t = se(ws, null);
  if (t === null) {
    let n = new Error(`<${e} /> is missing a parent <RadioGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(n, Ss), n;
  }
  return t;
}
let bu = H({ name: "RadioGroup", emits: { "update:modelValue": (e) => !0 }, props: { as: { type: [Object, String], default: "div" }, disabled: { type: [Boolean], default: !1 }, by: { type: [String, Function], default: () => mu }, modelValue: { type: [Object, String, Number, Boolean], default: void 0 }, defaultValue: { type: [Object, String, Number, Boolean], default: void 0 }, form: { type: String, optional: !0 }, name: { type: String, optional: !0 }, id: { type: String, default: null } }, inheritAttrs: !1, setup(e, { emit: t, attrs: n, slots: r, expose: i }) {
  var s;
  let a = (s = e.id) != null ? s : `headlessui-radiogroup-${ve()}`, o = E(null), l = E([]), d = ys({ name: "RadioGroupLabel" }), u = wr({ name: "RadioGroupDescription" });
  i({ el: o, $el: o });
  let [f, p] = vl(O(() => e.modelValue), (g) => t("update:modelValue", g), O(() => e.defaultValue)), v = { options: l, value: f, disabled: O(() => e.disabled), firstOption: O(() => l.value.find((g) => !g.propsRef.disabled)), containsCheckedOption: O(() => l.value.some((g) => v.compare(Qe(g.propsRef.value), Qe(e.modelValue)))), compare(g, S) {
    if (typeof e.by == "string") {
      let w = e.by;
      return (g == null ? void 0 : g[w]) === (S == null ? void 0 : S[w]);
    }
    return e.by(g, S);
  }, change(g) {
    var S;
    if (e.disabled || v.compare(Qe(f.value), Qe(g))) return !1;
    let w = (S = l.value.find(($) => v.compare(Qe($.propsRef.value), Qe(g)))) == null ? void 0 : S.propsRef;
    return w != null && w.disabled ? !1 : (p(g), !0);
  }, registerOption(g) {
    l.value.push(g), l.value = br(l.value, (S) => S.element);
  }, unregisterOption(g) {
    let S = l.value.findIndex((w) => w.id === g);
    S !== -1 && l.value.splice(S, 1);
  } };
  pe(ws, v), Qi({ container: O(() => I(o)), accept(g) {
    return g.getAttribute("role") === "radio" ? NodeFilter.FILTER_REJECT : g.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(g) {
    g.setAttribute("role", "none");
  } });
  function h(g) {
    if (!o.value || !o.value.contains(g.target)) return;
    let S = l.value.filter((w) => w.propsRef.disabled === !1).map((w) => w.element);
    switch (g.key) {
      case L.Enter:
        Bl(g.currentTarget);
        break;
      case L.ArrowLeft:
      case L.ArrowUp:
        if (g.preventDefault(), g.stopPropagation(), ft(S, ae.Previous | ae.WrapAround) === vn.Success) {
          let w = l.value.find(($) => {
            var M;
            return $.element === ((M = Ce(o)) == null ? void 0 : M.activeElement);
          });
          w && v.change(w.propsRef.value);
        }
        break;
      case L.ArrowRight:
      case L.ArrowDown:
        if (g.preventDefault(), g.stopPropagation(), ft(S, ae.Next | ae.WrapAround) === vn.Success) {
          let w = l.value.find(($) => {
            var M;
            return $.element === ((M = Ce($.element)) == null ? void 0 : M.activeElement);
          });
          w && v.change(w.propsRef.value);
        }
        break;
      case L.Space:
        {
          g.preventDefault(), g.stopPropagation();
          let w = l.value.find(($) => {
            var M;
            return $.element === ((M = Ce($.element)) == null ? void 0 : M.activeElement);
          });
          w && v.change(w.propsRef.value);
        }
        break;
    }
  }
  let m = O(() => {
    var g;
    return (g = I(o)) == null ? void 0 : g.closest("form");
  });
  return J(() => {
    qe([m], () => {
      if (!m.value || e.defaultValue === void 0) return;
      function g() {
        v.change(e.defaultValue);
      }
      return m.value.addEventListener("reset", g), () => {
        var S;
        (S = m.value) == null || S.removeEventListener("reset", g);
      };
    }, { immediate: !0 });
  }), () => {
    let { disabled: g, name: S, form: w, ...$ } = e, M = { ref: o, id: a, role: "radiogroup", "aria-labelledby": d.value, "aria-describedby": u.value, onKeydown: h };
    return Q(Wt, [...S != null && f.value != null ? is({ [S]: f.value }).map(([Oe, ge]) => Q(gn, Cl({ features: zt.Hidden, key: Oe, as: "input", type: "hidden", hidden: !0, readOnly: !0, form: w, disabled: g, name: Oe, value: ge }))) : [], X({ ourProps: M, theirProps: { ...n, ...yr($, ["modelValue", "defaultValue", "by"]) }, slot: {}, attrs: n, slots: r, name: "RadioGroup" })]);
  };
} });
var yu = ((e) => (e[e.Empty = 1] = "Empty", e[e.Active = 2] = "Active", e))(yu || {});
let wu = H({ name: "RadioGroupOption", props: { as: { type: [Object, String], default: "div" }, value: { type: [Object, String, Number, Boolean] }, disabled: { type: Boolean, default: !1 }, id: { type: String, default: null } }, setup(e, { attrs: t, slots: n, expose: r }) {
  var i;
  let s = (i = e.id) != null ? i : `headlessui-radiogroup-option-${ve()}`, a = Ss("RadioGroupOption"), o = ys({ name: "RadioGroupLabel" }), l = wr({ name: "RadioGroupDescription" }), d = E(null), u = O(() => ({ value: e.value, disabled: e.disabled })), f = E(1);
  r({ el: d, $el: d });
  let p = O(() => I(d));
  J(() => a.registerOption({ id: s, element: p, propsRef: u })), le(() => a.unregisterOption(s));
  let v = O(() => {
    var M;
    return ((M = a.firstOption.value) == null ? void 0 : M.id) === s;
  }), h = O(() => a.disabled.value || e.disabled), m = O(() => a.compare(Qe(a.value.value), Qe(e.value))), g = O(() => h.value ? -1 : m.value || !a.containsCheckedOption.value && v.value ? 0 : -1);
  function S() {
    var M;
    a.change(e.value) && (f.value |= 2, (M = I(d)) == null || M.focus());
  }
  function w() {
    f.value |= 2;
  }
  function $() {
    f.value &= -3;
  }
  return () => {
    let { value: M, disabled: Oe, ...ge } = e, Je = { checked: m.value, disabled: h.value, active: !!(f.value & 2) }, Te = { id: s, ref: d, role: "radio", "aria-checked": m.value ? "true" : "false", "aria-labelledby": o.value, "aria-describedby": l.value, "aria-disabled": h.value ? !0 : void 0, tabIndex: g.value, onClick: h.value ? void 0 : S, onFocus: h.value ? void 0 : w, onBlur: h.value ? void 0 : $ };
    return X({ ourProps: Te, theirProps: ge, slot: Je, attrs: t, slots: n, name: "RadioGroupOption" });
  };
} }), Su = gu;
function Eu(e) {
  let t = { called: !1 };
  return (...n) => {
    if (!t.called) return t.called = !0, e(...n);
  };
}
function Un(e, ...t) {
  e && t.length > 0 && e.classList.add(...t);
}
function tn(e, ...t) {
  e && t.length > 0 && e.classList.remove(...t);
}
var Qn = ((e) => (e.Finished = "finished", e.Cancelled = "cancelled", e))(Qn || {});
function Ou(e, t) {
  let n = qt();
  if (!e) return n.dispose;
  let { transitionDuration: r, transitionDelay: i } = getComputedStyle(e), [s, a] = [r, i].map((o) => {
    let [l = 0] = o.split(",").filter(Boolean).map((d) => d.includes("ms") ? parseFloat(d) : parseFloat(d) * 1e3).sort((d, u) => u - d);
    return l;
  });
  return s !== 0 ? n.setTimeout(() => t("finished"), s + a) : t("finished"), n.add(() => t("cancelled")), n.dispose;
}
function Xr(e, t, n, r, i, s) {
  let a = qt(), o = s !== void 0 ? Eu(s) : () => {
  };
  return tn(e, ...i), Un(e, ...t, ...n), a.nextFrame(() => {
    tn(e, ...n), Un(e, ...r), a.add(Ou(e, (l) => (tn(e, ...r, ...t), Un(e, ...i), o(l))));
  }), a.add(() => tn(e, ...t, ...n, ...r, ...i)), a.add(() => o("cancelled")), a.dispose;
}
function st(e = "") {
  return e.split(/\s+/).filter((t) => t.length > 1);
}
let Sr = Symbol("TransitionContext");
var Tu = ((e) => (e.Visible = "visible", e.Hidden = "hidden", e))(Tu || {});
function ku() {
  return se(Sr, null) !== null;
}
function Au() {
  let e = se(Sr, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
function ju() {
  let e = se(Er, null);
  if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
  return e;
}
let Er = Symbol("NestingContext");
function En(e) {
  return "children" in e ? En(e.children) : e.value.filter(({ state: t }) => t === "visible").length > 0;
}
function Es(e) {
  let t = E([]), n = E(!1);
  J(() => n.value = !0), le(() => n.value = !1);
  function r(s, a = et.Hidden) {
    let o = t.value.findIndex(({ id: l }) => l === s);
    o !== -1 && ($e(a, { [et.Unmount]() {
      t.value.splice(o, 1);
    }, [et.Hidden]() {
      t.value[o].state = "hidden";
    } }), !En(t) && n.value && (e == null || e()));
  }
  function i(s) {
    let a = t.value.find(({ id: o }) => o === s);
    return a ? a.state !== "visible" && (a.state = "visible") : t.value.push({ id: s, state: "visible" }), () => r(s, et.Unmount);
  }
  return { children: t, register: i, unregister: r };
}
let Os = Et.RenderStrategy, er = H({ props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: r, expose: i }) {
  let s = E(0);
  function a() {
    s.value |= ee.Opening, t("beforeEnter");
  }
  function o() {
    s.value &= ~ee.Opening, t("afterEnter");
  }
  function l() {
    s.value |= ee.Closing, t("beforeLeave");
  }
  function d() {
    s.value &= ~ee.Closing, t("afterLeave");
  }
  if (!ku() && Ml()) return () => Q(Ts, { ...e, onBeforeEnter: a, onAfterEnter: o, onBeforeLeave: l, onAfterLeave: d }, r);
  let u = E(null), f = O(() => e.unmount ? et.Unmount : et.Hidden);
  i({ el: u, $el: u });
  let { show: p, appear: v } = Au(), { register: h, unregister: m } = ju(), g = E(p.value ? "visible" : "hidden"), S = { value: !0 }, w = ve(), $ = { value: !1 }, M = Es(() => {
    !$.value && g.value !== "hidden" && (g.value = "hidden", m(w), d());
  });
  J(() => {
    let Me = h(w);
    le(Me);
  }), oe(() => {
    if (f.value === et.Hidden && w) {
      if (p.value && g.value !== "visible") {
        g.value = "visible";
        return;
      }
      $e(g.value, { hidden: () => m(w), visible: () => h(w) });
    }
  });
  let Oe = st(e.enter), ge = st(e.enterFrom), Je = st(e.enterTo), Te = st(e.entered), Tt = st(e.leave), R = st(e.leaveFrom), Y = st(e.leaveTo);
  J(() => {
    oe(() => {
      if (g.value === "visible") {
        let Me = I(u);
        if (Me instanceof Comment && Me.data === "") throw new Error("Did you forget to passthrough the `ref` to the actual DOM node?");
      }
    });
  });
  function me(Me) {
    let kt = S.value && !v.value, De = I(u);
    !De || !(De instanceof HTMLElement) || kt || ($.value = !0, p.value && a(), p.value || l(), Me(p.value ? Xr(De, Oe, ge, Je, Te, (_e) => {
      $.value = !1, _e === Qn.Finished && o();
    }) : Xr(De, Tt, R, Y, Te, (_e) => {
      $.value = !1, _e === Qn.Finished && (En(M) || (g.value = "hidden", m(w), d()));
    })));
  }
  return J(() => {
    qe([p], (Me, kt, De) => {
      me(De), S.value = !1;
    }, { immediate: !0 });
  }), pe(Er, M), rs(O(() => $e(g.value, { visible: ee.Open, hidden: ee.Closed }) | s.value)), () => {
    let { appear: Me, show: kt, enter: De, enterFrom: _e, enterTo: gt, entered: Tr, leave: kr, leaveFrom: Ar, leaveTo: N, ...K } = e, be = { ref: u }, ye = { ...K, ...v.value && p.value && Jt.isServer ? { class: Dn([n.class, K.class, ...Oe, ...ge]) } : {} };
    return X({ theirProps: ye, ourProps: be, slot: {}, slots: r, attrs: n, features: Os, visible: g.value === "visible", name: "TransitionChild" });
  };
} }), Iu = er, Ts = H({ inheritAttrs: !1, props: { as: { type: [Object, String], default: "div" }, show: { type: [Boolean], default: null }, unmount: { type: [Boolean], default: !0 }, appear: { type: [Boolean], default: !1 }, enter: { type: [String], default: "" }, enterFrom: { type: [String], default: "" }, enterTo: { type: [String], default: "" }, entered: { type: [String], default: "" }, leave: { type: [String], default: "" }, leaveFrom: { type: [String], default: "" }, leaveTo: { type: [String], default: "" } }, emits: { beforeEnter: () => !0, afterEnter: () => !0, beforeLeave: () => !0, afterLeave: () => !0 }, setup(e, { emit: t, attrs: n, slots: r }) {
  let i = wn(), s = O(() => e.show === null && i !== null ? (i.value & ee.Open) === ee.Open : e.show);
  oe(() => {
    if (![!0, !1].includes(s.value)) throw new Error('A <Transition /> is used but it is missing a `:show="true | false"` prop.');
  });
  let a = E(s.value ? "visible" : "hidden"), o = Es(() => {
    a.value = "hidden";
  }), l = E(!0), d = { show: s, appear: O(() => e.appear || !l.value) };
  return J(() => {
    oe(() => {
      l.value = !1, s.value ? a.value = "visible" : En(o) || (a.value = "hidden");
    });
  }), pe(Er, o), pe(Sr, d), () => {
    let u = yr(e, ["show", "appear", "unmount", "onBeforeEnter", "onBeforeLeave", "onAfterEnter", "onAfterLeave"]), f = { unmount: e.unmount };
    return X({ ourProps: { ...f, as: "template" }, theirProps: {}, slot: {}, slots: { ...r, default: () => [Q(Iu, { onBeforeEnter: () => t("beforeEnter"), onAfterEnter: () => t("afterEnter"), onBeforeLeave: () => t("beforeLeave"), onAfterLeave: () => t("afterLeave"), ...n, ...f, ...u }, r.default)] }, attrs: {}, features: Os, visible: a.value === "visible", name: "Transition" });
  };
} });
function xu(e, t) {
  return Se(), dt("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    D("path", {
      "fill-rule": "evenodd",
      d: "M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.857-9.809a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z",
      "clip-rule": "evenodd"
    })
  ]);
}
function Cu(e, t) {
  return Se(), dt("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: "0 0 20 20",
    fill: "currentColor",
    "aria-hidden": "true",
    "data-slot": "icon"
  }, [
    D("path", {
      "fill-rule": "evenodd",
      d: "M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z",
      "clip-rule": "evenodd"
    })
  ]);
}
var $u = function(e, t, n, r, i) {
  if (r === "m") throw new TypeError("Private method is not writable");
  if (r === "a" && !i) throw new TypeError("Private accessor was defined without a setter");
  if (typeof t == "function" ? e !== t || !i : !t.has(e)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
  return r === "a" ? i.call(e, n) : i ? i.value = n : t.set(e, n), n;
}, Mu = function(e, t, n, r) {
  if (n === "a" && !r) throw new TypeError("Private accessor was defined without a getter");
  if (typeof t == "function" ? e !== t || !r : !t.has(e)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
  return n === "m" ? r : n === "a" ? r.call(e) : r ? r.value : t.get(e);
}, ln;
let Ct;
const un = /* @__PURE__ */ new Set(), wt = {};
function Pu() {
  if (Ct || (Ct = Object.freeze({ register: Yr, get: Ru, on: Uu }), typeof window > "u"))
    return Ct;
  const e = Object.freeze({ register: Yr });
  try {
    window.addEventListener("wallet-standard:register-wallet", ({ detail: t }) => t(e));
  } catch (t) {
    console.error(`wallet-standard:register-wallet event listener could not be added
`, t);
  }
  try {
    window.dispatchEvent(new Bu(e));
  } catch (t) {
    console.error(`wallet-standard:app-ready event could not be dispatched
`, t);
  }
  return Ct;
}
function Yr(...e) {
  var t;
  return e = e.filter((n) => !un.has(n)), e.length ? (e.forEach((n) => un.add(n)), (t = wt.register) == null || t.forEach((n) => Zr(() => n(...e))), function() {
    var r;
    e.forEach((i) => un.delete(i)), (r = wt.unregister) == null || r.forEach((i) => Zr(() => i(...e)));
  }) : () => {
  };
}
function Ru() {
  return [...un];
}
function Uu(e, t) {
  var n;
  return (n = wt[e]) != null && n.push(t) || (wt[e] = [t]), function() {
    var i;
    wt[e] = (i = wt[e]) == null ? void 0 : i.filter((s) => t !== s);
  };
}
function Zr(e) {
  try {
    e();
  } catch (t) {
    console.error(t);
  }
}
class Bu extends Event {
  constructor(t) {
    super("wallet-standard:app-ready", {
      bubbles: !1,
      cancelable: !1,
      composed: !1
    }), ln.set(this, void 0), $u(this, ln, t, "f");
  }
  get detail() {
    return Mu(this, ln, "f");
  }
  get type() {
    return "wallet-standard:app-ready";
  }
  /** @deprecated */
  preventDefault() {
    throw new Error("preventDefault cannot be called");
  }
  /** @deprecated */
  stopImmediatePropagation() {
    throw new Error("stopImmediatePropagation cannot be called");
  }
  /** @deprecated */
  stopPropagation() {
    throw new Error("stopPropagation cannot be called");
  }
}
ln = /* @__PURE__ */ new WeakMap();
const Du = "standard:connect", _u = "standard:events", Nu = [
  "standard:connect",
  "standard:events"
];
function Lu(e, t = []) {
  return [...Nu, ...t].every(
    (n) => n in e.features
  );
}
const Fu = "zkSend";
function Vu(e) {
  return _s() ? (Ns(e), !0) : !1;
}
function ks(e) {
  let t = !1, n;
  const r = Ds(!0);
  return (...i) => (t || (n = r.run(() => e(...i)), t = !0), n);
}
function Or(e) {
  return typeof e == "function" ? e() : C(e);
}
const zu = typeof window < "u" && typeof document < "u";
typeof WorkerGlobalScope < "u" && globalThis instanceof WorkerGlobalScope;
const Wu = Object.prototype.toString, Gu = (e) => Wu.call(e) === "[object Object]", Hu = () => {
};
function Ku(e, t) {
  function n(...r) {
    return new Promise((i, s) => {
      Promise.resolve(e(() => t.apply(this, r), { fn: t, thisArg: this, args: r })).then(i).catch(s);
    });
  }
  return n;
}
const As = (e) => e();
function qu(e = As) {
  const t = E(!0);
  function n() {
    t.value = !1;
  }
  function r() {
    t.value = !0;
  }
  const i = (...s) => {
    t.value && e(...s);
  };
  return { isActive: ri(t), pause: n, resume: r, eventFilter: i };
}
function Ju(e) {
  return ni();
}
function Xu(e, t, n = {}) {
  const {
    eventFilter: r = As,
    ...i
  } = n;
  return qe(
    e,
    Ku(
      r,
      t
    ),
    i
  );
}
function Yu(e, t, n = {}) {
  const {
    eventFilter: r,
    ...i
  } = n, { eventFilter: s, pause: a, resume: o, isActive: l } = qu(r);
  return { stop: Xu(
    e,
    t,
    {
      ...i,
      eventFilter: s
    }
  ), pause: a, resume: o, isActive: l };
}
function Zu(e, t = !0, n) {
  Ju() ? J(e, n) : t ? e() : Ue(e);
}
function Qu(e) {
  var t;
  const n = Or(e);
  return (t = n == null ? void 0 : n.$el) != null ? t : n;
}
const tr = zu ? window : void 0;
function Qr(...e) {
  let t, n, r, i;
  if (typeof e[0] == "string" || Array.isArray(e[0]) ? ([n, r, i] = e, t = tr) : [t, n, r, i] = e, !t)
    return Hu;
  Array.isArray(n) || (n = [n]), Array.isArray(r) || (r = [r]);
  const s = [], a = () => {
    s.forEach((u) => u()), s.length = 0;
  }, o = (u, f, p, v) => (u.addEventListener(f, p, v), () => u.removeEventListener(f, p, v)), l = qe(
    () => [Qu(t), Or(i)],
    ([u, f]) => {
      if (a(), !u)
        return;
      const p = Gu(f) ? { ...f } : f;
      s.push(
        ...n.flatMap((v) => r.map((h) => o(u, v, h, p)))
      );
    },
    { immediate: !0, flush: "post" }
  ), d = () => {
    l(), a();
  };
  return Vu(d), d;
}
const nn = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {}, rn = "__vueuse_ssr_handlers__", ec = /* @__PURE__ */ tc();
function tc() {
  return rn in nn || (nn[rn] = nn[rn] || {}), nn[rn];
}
function nc(e, t) {
  return ec[e] || t;
}
function rc(e) {
  return e == null ? "any" : e instanceof Set ? "set" : e instanceof Map ? "map" : e instanceof Date ? "date" : typeof e == "boolean" ? "boolean" : typeof e == "string" ? "string" : typeof e == "object" ? "object" : Number.isNaN(e) ? "any" : "number";
}
const ic = {
  boolean: {
    read: (e) => e === "true",
    write: (e) => String(e)
  },
  object: {
    read: (e) => JSON.parse(e),
    write: (e) => JSON.stringify(e)
  },
  number: {
    read: (e) => Number.parseFloat(e),
    write: (e) => String(e)
  },
  any: {
    read: (e) => e,
    write: (e) => String(e)
  },
  string: {
    read: (e) => e,
    write: (e) => String(e)
  },
  map: {
    read: (e) => new Map(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e.entries()))
  },
  set: {
    read: (e) => new Set(JSON.parse(e)),
    write: (e) => JSON.stringify(Array.from(e))
  },
  date: {
    read: (e) => new Date(e),
    write: (e) => e.toISOString()
  }
}, ei = "vueuse-storage";
function sc(e, t, n, r = {}) {
  var i;
  const {
    flush: s = "pre",
    deep: a = !0,
    listenToStorageChanges: o = !0,
    writeDefaults: l = !0,
    mergeDefaults: d = !1,
    shallow: u,
    window: f = tr,
    eventFilter: p,
    onError: v = (R) => {
      console.error(R);
    },
    initOnMounted: h
  } = r, m = (u ? Nt : E)(typeof t == "function" ? t() : t);
  if (!n)
    try {
      n = nc("getDefaultStorage", () => {
        var R;
        return (R = tr) == null ? void 0 : R.localStorage;
      })();
    } catch (R) {
      v(R);
    }
  if (!n)
    return m;
  const g = Or(t), S = rc(g), w = (i = r.serializer) != null ? i : ic[S], { pause: $, resume: M } = Yu(
    m,
    () => ge(m.value),
    { flush: s, deep: a, eventFilter: p }
  );
  f && o && Zu(() => {
    Qr(f, "storage", Te), Qr(f, ei, Tt), h && Te();
  }), h || Te();
  function Oe(R, Y) {
    f && f.dispatchEvent(new CustomEvent(ei, {
      detail: {
        key: e,
        oldValue: R,
        newValue: Y,
        storageArea: n
      }
    }));
  }
  function ge(R) {
    try {
      const Y = n.getItem(e);
      if (R == null)
        Oe(Y, null), n.removeItem(e);
      else {
        const me = w.write(R);
        Y !== me && (n.setItem(e, me), Oe(Y, me));
      }
    } catch (Y) {
      v(Y);
    }
  }
  function Je(R) {
    const Y = R ? R.newValue : n.getItem(e);
    if (Y == null)
      return l && g != null && n.setItem(e, w.write(g)), g;
    if (!R && d) {
      const me = w.read(Y);
      return typeof d == "function" ? d(me, g) : S === "object" && !Array.isArray(me) ? { ...g, ...me } : me;
    } else return typeof Y != "string" ? Y : w.read(Y);
  }
  function Te(R) {
    if (!(R && R.storageArea !== n)) {
      if (R && R.key == null) {
        m.value = g;
        return;
      }
      if (!(R && R.key !== e)) {
        $();
        try {
          (R == null ? void 0 : R.newValue) !== w.write(m.value) && (m.value = Je(R));
        } catch (Y) {
          v(Y);
        } finally {
          R ? Ue(M) : M();
        }
      }
    }
  }
  function Tt(R) {
    Te(R.detail);
  }
  return m;
}
const ac = "Sui Wallet", { get: oc, on: ti } = Pu(), lc = ks(() => ({
  // config state
  autoConnect: E(!0),
  preferredWallets: E([ac, Fu]),
  requiredFeatures: E(["sui:signTransactionBlock"]),
  connectButtonText: Bn({
    connect: "Connect",
    disconnect: "Disconnect"
  }),
  connectDialogText: Bn({
    connectWallet: "Connect Sui Wallet",
    noWallet: "Get Started with Sui"
  }),
  // wallet state
  currentWallet: void 0,
  currentWalletStatus: E(),
  currentAccount: Nt(),
  accounts: Nt()
})), j = lc(), js = () => ({
  autoConnect: j.autoConnect,
  preferredWallets: j.preferredWallets,
  requiredFeatures: j.requiredFeatures,
  connectButtonText: j.connectButtonText,
  connectDialogText: j.connectDialogText
}), Is = ks(
  () => sc("sui-vue-connection-info", {
    lastConnectedWalletName: void 0,
    lastConnectedAccountAddress: void 0
  })
), We = Is(), xs = () => {
  const e = () => {
    const n = oc().filter(
      (r) => Lu(r, j.requiredFeatures.value)
    );
    return [
      ...j.preferredWallets.value.map((r) => n.find((i) => i.name === r)).filter(Boolean),
      ...n.filter((r) => !j.preferredWallets.value.includes(r.name))
    ];
  }, t = Nt(e());
  return ti("register", () => t.value = e()), ti("unregister", () => t.value = e()), { wallets: t };
}, Cs = () => ({ connect: async (t) => {
  try {
    j.currentWallet = t, j.currentWalletStatus.value = "connecting";
    const n = await t.features[Du].connect();
    j.accounts.value = n.accounts, We.value.lastConnectedWalletName = t.name, We.value.lastConnectedAccountAddress ? j.currentAccount.value = n.accounts.find((i) => i.address === We.value.lastConnectedAccountAddress) ?? n.accounts[0] : j.currentAccount.value = n.accounts[0], We.value.lastConnectedAccountAddress = j.currentAccount.value.address;
    const r = t.features[_u].on("change", ({ accounts: i }) => {
      j.accounts.value = i, i === void 0 || i.length == 0 ? (j.currentWalletStatus.value = "disconnected", j.currentWallet = void 0, j.currentAccount.value = void 0, We.value.lastConnectedWalletName = void 0, We.value.lastConnectedAccountAddress = void 0, r()) : (j.currentAccount.value = i[0], We.value.lastConnectedAccountAddress = j.currentAccount.value.address);
    });
    j.currentWalletStatus.value = "connected";
  } catch {
    j.currentWalletStatus.value = "disconnected", j.currentWallet = void 0;
  }
} }), uc = () => ({ disconnect: () => {
  var t, n;
  try {
    (n = (t = j.currentWallet) == null ? void 0 : t.features["standard:disconnect"]) == null || n.disconnect();
  } catch {
  }
  j.currentWalletStatus.value = "disconnected", j.currentWallet = void 0, j.currentAccount.value = void 0, j.accounts.value = void 0, We.value.lastConnectedWalletName = void 0, We.value.lastConnectedAccountAddress = void 0;
} }), cc = () => ({ accounts: j.accounts }), $s = () => ({
  currentWallet: () => j.currentWallet,
  currentWalletStatus: j.currentWalletStatus
}), dc = () => ({ currentAccount: j.currentAccount }), Uc = () => ({ signPersonalMessage: ({
  message: t,
  account: n
}) => {
  if (!j.currentWallet)
    throw new Error("No wallet is connected.");
  const r = n ?? j.currentAccount.value;
  if (!r)
    throw new Error("No wallet account is selected to sign the personal message with.");
  const i = j.currentWallet.features["sui:signPersonalMessage"];
  if (!i)
    throw new Error("This wallet doesn't support the `signPersonalMessage` feature.");
  return i.signPersonalMessage({ message: t, account: r });
} }), Bc = () => ({ signTransactionBlock: ({ transaction: t, account: n, chain: r }) => {
  if (!j.currentWallet)
    throw new Error("No wallet is connected.");
  const i = n ?? j.currentAccount.value;
  if (!i)
    throw new Error("No wallet account is selected to sign the personal message with.");
  const s = j.currentWallet.features["sui:signTransaction"];
  if (!s) {
    const a = j.currentWallet.features["sui:signTransactionBlock"];
    if (!a)
      throw new Error("This wallet doesn't support the `signTransaction | signTransactionBlock` feature.");
    return a.signTransactionBlock({
      transactionBlock: t,
      account: i,
      chain: r ?? i.chains[0]
    });
  }
  return s.signTransaction({
    transaction: t,
    account: i,
    chain: r ?? i.chains[0]
  });
} }), Dc = () => ({ signAndExecuteTransaction: ({
  transaction: t,
  account: n,
  chain: r
}) => {
  if (!j.currentWallet)
    throw new Error("No wallet is connected.");
  const i = n ?? j.currentAccount.value;
  if (!i)
    throw new Error("No wallet account is selected to sign the personal message with.");
  const s = j.currentWallet.features["sui:signAndExecuteTransaction"];
  if (!s) {
    const a = j.currentWallet.features["sui:signAndExecuteTransactionBlock"];
    if (!a)
      throw new Error(
        "This wallet doesn't support the `signAndExecuteTransaction | signAndExecuteTransactionBlock` feature."
      );
    return a.signAndExecuteTransactionBlock({
      transactionBlock: t,
      account: i,
      chain: r ?? i.chains[0]
    });
  }
  return s.signAndExecuteTransaction({
    transaction: t,
    account: i,
    chain: r ?? i.chains[0]
  });
} }), fc = { class: "fixed inset-0 overflow-y-auto" }, pc = { class: "flex min-h-full items-center justify-center p-4 text-center" }, hc = { class: "mt-2" }, vc = { class: "mx-auto w-full p-4" }, gc = {
  key: 0,
  class: "max-w-96"
}, mc = { class: "space-y-2" }, bc = { class: "flex w-full items-center justify-between" }, yc = { class: "flex items-center w-64 gap-4" }, wc = ["src"], Sc = { class: "text-sm" }, Ec = { class: "text-sm mt-4" }, Oc = /* @__PURE__ */ H({
  __name: "ConnectDialog",
  setup(e, { expose: t }) {
    const n = js(), { wallets: r } = xs(), { currentWalletStatus: i } = $s(), s = E(), a = async (u) => {
      const { connect: f } = Cs();
      s.value = "Connecting to wallet...", await f(u), i.value == "connected" ? (s.value = "Wallet connected.", d()) : i.value == "disconnected" && (s.value = "Connection failed.");
    }, o = E(!1), l = () => {
      o.value = !0, s.value = void 0;
    }, d = () => o.value = !1;
    return t({ isOpen: ri(o), open: l, close: d }), (u, f) => (Se(), Rt(C(Ts), {
      appear: "",
      show: o.value,
      as: "template"
    }, {
      default: ne(() => [
        ce(C(su), {
          as: "div",
          onClose: f[0] || (f[0] = (p) => o.value = !1),
          class: "relative z-10"
        }, {
          default: ne(() => [
            ce(C(er), {
              as: "template",
              enter: "duration-300 ease-out",
              "enter-from": "opacity-0",
              "enter-to": "opacity-100",
              leave: "duration-200 ease-in",
              "leave-from": "opacity-100",
              "leave-to": "opacity-0"
            }, {
              default: ne(() => f[1] || (f[1] = [
                D("div", { class: "fixed inset-0 bg-black/25" }, null, -1)
              ])),
              _: 1
            }),
            D("div", fc, [
              D("div", pc, [
                ce(C(er), {
                  as: "template",
                  enter: "duration-300 ease-out",
                  "enter-from": "opacity-0 scale-95",
                  "enter-to": "opacity-100 scale-100",
                  leave: "duration-200 ease-in",
                  "leave-from": "opacity-100 scale-100",
                  "leave-to": "opacity-0 scale-95"
                }, {
                  default: ne(() => [
                    ce(C(au), { class: "connect-dialog-panel" }, {
                      default: ne(() => [
                        ce(C(ou), { class: "connect-dialog-title" }, {
                          default: ne(() => [
                            _n(ut(C(r).length == 0 ? C(n).connectDialogText.noWallet : C(n).connectDialogText.connectWallet), 1)
                          ]),
                          _: 1
                        }),
                        D("div", hc, [
                          D("div", vc, [
                            C(r).length == 0 ? (Se(), dt("div", gc, [
                              ii(u.$slots, "no-wallets", {}, () => [
                                f[2] || (f[2] = D("div", { class: "text-base" }, "Install the Sui Wallet Extension", -1)),
                                f[3] || (f[3] = D("p", { class: "mb-4 text-sm text-gray-600" }, " We recommend pinning Sui Wallet to your taskbar for quicker access. ", -1)),
                                f[4] || (f[4] = D("div", { class: "text-base" }, "Create or Import a Wallet", -1)),
                                f[5] || (f[5] = D("p", { class: "mb-4 text-sm text-gray-600" }, " Be sure to back up your wallet using a secure method. Never share your secret phrase with anyone. ", -1)),
                                f[6] || (f[6] = D("div", { class: "text-base" }, "Refresh Your Browser", -1)),
                                f[7] || (f[7] = D("p", { class: "mb-4 text-sm text-gray-600" }, " Once you set up your wallet, refresh this window browser to load up the extension. ", -1)),
                                f[8] || (f[8] = D("div", { class: "flex justify-end" }, [
                                  D("div", { class: "connect-dialog-install-button" }, [
                                    D("a", { href: "https://chrome.google.com/webstore/detail/sui-wallet/opcgpfmipidbgpenhmajoajpbobppdil" }, " Install ")
                                  ])
                                ], -1))
                              ], !0)
                            ])) : (Se(), Rt(C(bu), { key: 1 }, {
                              default: ne(() => [
                                D("div", mc, [
                                  (Se(!0), dt(Wt, null, si(C(r), (p) => (Se(), Rt(C(wu), {
                                    onClick: (v) => a(p),
                                    onKeyup: ai((v) => a(p), ["enter"]),
                                    as: "template",
                                    key: p.name,
                                    value: p
                                  }, {
                                    default: ne(({ active: v, checked: h }) => [
                                      D("div", {
                                        class: Dn([[
                                          v ? "ring-2 ring-white/60 ring-offset-2 ring-offset-sky-300" : "",
                                          h ? "bg-sky-900/75 text-white " : "bg-white "
                                        ], "relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none"])
                                      }, [
                                        D("div", bc, [
                                          D("div", yc, [
                                            D("img", {
                                              src: p.icon,
                                              class: "w-8 h-8"
                                            }, null, 8, wc),
                                            D("div", Sc, [
                                              ce(C(Su), {
                                                as: "p",
                                                class: Dn([h ? "text-white" : "text-gray-900", "font-medium"])
                                              }, {
                                                default: ne(() => [
                                                  _n(ut(p.name), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["class"])
                                            ])
                                          ])
                                        ])
                                      ], 2)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick", "onKeyup", "value"]))), 128))
                                ])
                              ]),
                              _: 1
                            })),
                            D("div", Ec, ut(s.value), 1)
                          ])
                        ])
                      ]),
                      _: 3
                    })
                  ]),
                  _: 3
                })
              ])
            ])
          ]),
          _: 3
        })
      ]),
      _: 3
    }, 8, ["show"]));
  }
}), Ms = (e, t) => {
  const n = e.__vccOpts || e;
  for (const [r, i] of t)
    n[r] = i;
  return n;
}, Tc = /* @__PURE__ */ Ms(Oc, [["__scopeId", "data-v-a6b318dd"]]), kc = { class: "w-fit flex items-center" }, Ac = { class: "px-1 py-1" }, jc = { class: "group connect-btn-menu-item gap-4 justify-between" }, Ic = { class: "text-nowrap" }, xc = { class: "px-1 py-1" }, Cc = {
  __name: "ConnectButton",
  setup(e, { expose: t }) {
    const n = js(), r = Is(), { wallets: i } = xs(), { currentWalletStatus: s } = $s(), { currentAccount: a } = dc(), { accounts: o } = cc(), { connect: l } = Cs(), { disconnect: d } = uc(), u = E();
    return n.autoConnect.value && r.value.lastConnectedWalletName && r.value.lastConnectedAccountAddress && i.forEach((v) => v.name === r.value.lastConnectedWalletName && l(v)), t({ openDialog: () => u.value.open(), closeDialog: () => u.value.close() }), (v, h) => (Se(), dt("div", kc, [
      C(s) === "connected" ? (Se(), Rt(C(pu), {
        key: 0,
        as: "div",
        class: "relative inline-block text-left font-mono"
      }, {
        default: ne(() => [
          ce(C(hu), { class: "inline-flex w-full justify-center connect-btn-menu-btn" }, {
            default: ne(() => [
              _n(ut(C(Cr)(C(a).address)) + " ", 1),
              ce(C(Cu), {
                class: "-mr-1 ml-2 h-5 w-5 text-violet-200 hover:text-violet-100",
                "aria-hidden": "true"
              })
            ]),
            _: 1
          }),
          ce(Ls, {
            "enter-active-class": "transition duration-100 ease-out",
            "enter-from-class": "transform scale-95 opacity-0",
            "enter-to-class": "transform scale-100 opacity-100",
            "leave-active-class": "transition duration-75 ease-in",
            "leave-from-class": "transform scale-100 opacity-100",
            "leave-to-class": "transform scale-95 opacity-0"
          }, {
            default: ne(() => [
              ce(C(vu), { class: "absolute right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none" }, {
                default: ne(() => [
                  D("div", Ac, [
                    (Se(!0), dt(Wt, null, si(C(o), (m) => (Se(), Rt(C(Jr), {
                      onClick: (g) => (a.value = m) && (C(r).lastConnectedAccountAddress = m.address)
                    }, {
                      default: ne(({ active: g }) => [
                        D("button", jc, [
                          D("div", Ic, ut(C(Cr)(m.address)), 1),
                          Fs(ce(C(xu), { class: "h-5 w-5 self-end" }, null, 512), [
                            [Vs, C(a).address === m.address]
                          ])
                        ])
                      ]),
                      _: 2
                    }, 1032, ["onClick"]))), 256))
                  ]),
                  D("div", xc, [
                    ce(C(Jr), null, {
                      default: ne(({ active: m }) => [
                        D("button", {
                          onClick: h[0] || (h[0] = (...g) => C(d) && C(d)(...g)),
                          onKeyup: h[1] || (h[1] = ai((...g) => C(d) && C(d)(...g), ["enter"])),
                          class: "connect-btn-menu-item"
                        }, ut(C(n).connectButtonText.disconnect), 33)
                      ]),
                      _: 1
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })
        ]),
        _: 1
      })) : (Se(), dt("button", {
        key: 1,
        class: "connect-btn",
        onClick: h[2] || (h[2] = (m) => u.value.open())
      }, ut(C(n).connectButtonText.connect), 1)),
      ce(Tc, {
        ref_key: "connectDialog",
        ref: u
      }, {
        "no-wallets": ne(() => [
          ii(v.$slots, "no-wallets", {}, void 0, !0)
        ]),
        _: 3
      }, 512)
    ]));
  }
}, _c = /* @__PURE__ */ Ms(Cc, [["__scopeId", "data-v-c61a89a0"]]);
export {
  _c as ConnectButton,
  Tc as ConnectDialog,
  Pc as Transaction,
  cc as useAccounts,
  js as useConfig,
  Cs as useConnectWallet,
  dc as useCurrentAccount,
  $s as useCurrentWallet,
  uc as useDisconnectWallet,
  Is as usePersistState,
  Dc as useSignAndExecuteTransactionBlock,
  Uc as useSignPersonalMessage,
  Bc as useSignTransactionBlock,
  xs as useWallets
};

var c = Object.defineProperty;
var l = (i, s, t) => s in i ? c(i, s, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[s] = t;
var n = (i, s, t) => (l(i, typeof s != "symbol" ? s + "" : s, t), t);
class r {
  constructor(s = null, t) {
    /**
     * movement cost to move from the starting point to this node
     */
    n(this, "g", 0);
    /**
     * estimated movement cost  to move from this node to the end
     */
    n(this, "h", 0);
    n(this, "equals", (s) => r.equals(this, s));
    this.parent = s, this.position = t;
  }
  static equals(s, t) {
    var e, o, h, a;
    return !s.position || !t.position ? !1 : ((e = s.position) == null ? void 0 : e.x) === ((o = t.position) == null ? void 0 : o.x) && ((h = s.position) == null ? void 0 : h.y) === ((a = t.position) == null ? void 0 : a.y);
  }
  /**
   * total cost (g + h)
   */
  get f() {
    return this.g + this.h;
  }
}
const p = (i) => {
  const s = [];
  let t = i;
  for (; t.parent; )
    s.push(t), t = t.parent;
  return s;
}, u = (i, s = !1) => {
  const t = i.position.x, e = i.position.y;
  let o = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  return s && (o = o.concat([
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 }
  ])), o.map((h) => new r(i, {
    x: t + h.x,
    y: e + h.y
  }));
}, f = {
  DEFAULT: (i, s) => Math.abs(i.position.x - s.position.x) + Math.abs(i.position.y - s.position.y)
}, d = {
  DEFAULT: (i, s) => i.equals(s)
}, x = 99999;
class N {
  constructor(s) {
    /**
     * Open list of nodes to be checked
     */
    n(this, "possibleNodes", []);
    /**
     * Closed list of nodes to be checked
     */
    n(this, "checkedNodes", []);
    /**
     * Beginning node
     */
    n(this, "start");
    /**
     * Destination node
     */
    n(this, "end");
    n(this, "config");
    n(this, "findPath", () => {
      for (; this.possibleNodes.length; ) {
        const s = this.checkNode();
        if (s != null && s.path)
          return s.path;
      }
    });
    n(this, "checkNode", () => {
      this.possibleNodes.sort((e, o) => o.f - e.f);
      const s = this.possibleNodes.pop();
      if (!s)
        return;
      if (this.checkedNodes.push(s), this.config.isDone(s, this.end))
        return {
          path: p(s).reverse()
        };
      const t = u(s, this.config.diagonal);
      for (let e of t)
        this.config.wouldCollide(e) || this.possibleNodes.filter((o) => o.equals(e)).length > 0 || this.checkedNodes.filter((o) => o.equals(e)).length > 0 || (e.g = s.g + 1, e.h = this.config.heuristic(e, this.end), this.possibleNodes.push(e));
    });
    this.config = {
      ...s,
      heuristic: s.heuristic || f.DEFAULT,
      diagonal: s.diagonal || !1,
      maxIterations: s.maxIterations || x,
      isDone: s.isDone || d.DEFAULT
    }, this.start = new r(null, s.startPos), this.end = new r(null, s.endPos), this.possibleNodes.push(this.start);
  }
}
const g = (...i) => new N(...i).findPath();
export {
  g as findPath
};

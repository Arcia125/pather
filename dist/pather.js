var c = Object.defineProperty;
var l = (i, t, s) => t in i ? c(i, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : i[t] = s;
var n = (i, t, s) => (l(i, typeof t != "symbol" ? t + "" : t, s), s);
class r {
  constructor(t = null, s) {
    /**
     * movement cost to move from the starting point to this node
     */
    n(this, "g", 0);
    /**
     * estimated movement cost  to move from this node to the end
     */
    n(this, "h", 0);
    n(this, "equals", (t) => r.equals(this, t));
    this.parent = t, this.position = s;
  }
  static equals(t, s) {
    var e, o, h, a;
    return !t.position || !s.position ? !1 : ((e = t.position) == null ? void 0 : e.x) === ((o = s.position) == null ? void 0 : o.x) && ((h = t.position) == null ? void 0 : h.y) === ((a = s.position) == null ? void 0 : a.y);
  }
  /**
   * total cost (g + h)
   */
  get f() {
    return this.g + this.h;
  }
}
const p = (i) => {
  const t = [];
  let s = i;
  for (; s.parent; )
    t.push(s), s = s.parent;
  return t;
}, u = (i, t = !1) => {
  const s = i.position.x, e = i.position.y;
  let o = [
    { x: 0, y: -1 },
    { x: 0, y: 1 },
    { x: -1, y: 0 },
    { x: 1, y: 0 }
  ];
  return t && (o = o.concat([
    { x: -1, y: -1 },
    { x: 1, y: -1 },
    { x: -1, y: 1 },
    { x: 1, y: 1 }
  ])), o.map((h) => new r(i, {
    x: s + h.x,
    y: e + h.y
  }));
}, f = {
  DEFAULT: (i, t) => Math.abs(i.position.x - t.position.x) + Math.abs(i.position.y - t.position.y)
}, d = {
  DEFAULT: (i, t) => i.equals(t)
}, x = 99999;
class N {
  constructor(t) {
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
    n(this, "iterations");
    n(this, "config");
    n(this, "findPath", () => {
      for (; this.possibleNodes.length; ) {
        if (this.iterations >= this.config.maxIterations)
          return;
        const t = this.checkNode();
        if (t != null && t.path)
          return t.path;
        this.iterations++;
      }
    });
    n(this, "checkNode", () => {
      this.possibleNodes.sort((e, o) => o.f - e.f);
      const t = this.possibleNodes.pop();
      if (!t)
        return;
      if (this.checkedNodes.push(t), this.config.isDone(t, this.end))
        return {
          path: p(t).reverse()
        };
      const s = u(t, this.config.diagonal);
      for (let e of s)
        this.config.wouldCollide(e) || this.possibleNodes.filter((o) => o.equals(e)).length > 0 || this.checkedNodes.filter((o) => o.equals(e)).length > 0 || (e.g = t.g + 1, e.h = this.config.heuristic(e, this.end), this.possibleNodes.push(e));
    });
    this.config = {
      ...t,
      heuristic: t.heuristic || f.DEFAULT,
      diagonal: t.diagonal || !1,
      maxIterations: t.maxIterations || x,
      isDone: t.isDone || d.DEFAULT
    }, this.iterations = 0, this.start = new r(null, t.startPos), this.end = new r(null, t.endPos), this.possibleNodes.push(this.start);
  }
}
const y = (...i) => new N(...i).findPath();
export {
  r as PathNode,
  y as findPath
};

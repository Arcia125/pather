var c = Object.defineProperty;
var l = (e, t, s) => t in e ? c(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var n = (e, t, s) => (l(e, typeof t != "symbol" ? t + "" : t, s), s);
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
    var i, o, h, a;
    return !t.position || !s.position ? !1 : ((i = t.position) == null ? void 0 : i.x) === ((o = s.position) == null ? void 0 : o.x) && ((h = t.position) == null ? void 0 : h.y) === ((a = s.position) == null ? void 0 : a.y);
  }
  /**
   * total cost (g + h)
   */
  get f() {
    return this.g + this.h;
  }
  get x() {
    return this.position.x;
  }
  set x(t) {
    this.position.x = t;
  }
  get y() {
    return this.position.y;
  }
  set y(t) {
    this.position.y = t;
  }
}
const p = (e) => {
  const t = [];
  let s = e;
  for (; s.parent; )
    t.push(s), s = s.parent;
  return t;
}, u = (e, t = !1) => {
  const s = e.position.x, i = e.position.y;
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
  ])), o.map((h) => new r(e, {
    x: s + h.x,
    y: i + h.y
  }));
}, d = {
  DEFAULT: (e, t) => Math.abs(e.position.x - t.position.x) + Math.abs(e.position.y - t.position.y)
}, f = {
  DEFAULT: (e, t) => e.equals(t)
}, N = 99999;
class x {
  constructor(t) {
    /**
     * Open list of nodes to be checked
     */
    n(this, "possibleNodes");
    /**
     * Closed list of nodes to be checked
     */
    n(this, "checkedNodes");
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
    n(this, "initialState", () => {
      const s = new r(null, this.config.startPos), i = new r(null, this.config.endPos), o = [], h = [];
      return o.push(this.start), {
        iterations: 0,
        start: s,
        end: i,
        possibleNodes: o,
        checkedNodes: h
      };
    });
    n(this, "findPath", () => {
      if (this.iterations !== 0) {
        const { start: t, end: s, iterations: i, possibleNodes: o, checkedNodes: h } = this.initialState();
        this.possibleNodes = o, this.checkedNodes = h, this.start = t, this.end = s, this.iterations = i;
      }
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
      this.possibleNodes.sort((i, o) => o.f - i.f);
      const t = this.possibleNodes.pop();
      if (!t)
        return;
      if (this.checkedNodes.push(t), this.config.isDone(t, this.end))
        return {
          path: p(t).reverse()
        };
      const s = u(t, this.config.diagonal);
      for (let i of s)
        this.config.isOutOfBounds(i) || this.config.wouldCollide(i) || this.possibleNodes.filter((o) => o.equals(i)).length > 0 || this.checkedNodes.filter((o) => o.equals(i)).length > 0 || (i.g = t.g + 1, i.h = this.config.heuristic(i, this.end), this.possibleNodes.push(i));
    });
    this.config = {
      ...t,
      heuristic: t.heuristic || d.DEFAULT,
      diagonal: t.diagonal || !1,
      maxIterations: t.maxIterations || N,
      isDone: t.isDone || f.DEFAULT
    };
    const { start: s, end: i, iterations: o, possibleNodes: h, checkedNodes: a } = this.initialState();
    this.possibleNodes = h, this.checkedNodes = a, this.start = s, this.end = i, this.iterations = o;
  }
}
const y = (...e) => new x(...e).findPath();
export {
  r as PathNode,
  y as findPath
};

module.exports = class {
    constructor(pos, rad, color) {
        this.pos = pos || null;
        this.radius = rad || null;
        this.color = color || null;
        this.active = 0;
    }

    draw(context) {
        if (!this.active) return;
        context.beginPath();
        context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI, false);
        context.fillStyle = 'rgba(46,100,153,' + this.active + ')';
        context.fill();
    }
};

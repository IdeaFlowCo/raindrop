var React           = require('react');
var $               = require('jquery');
var Circle          = require('../utils/circle');
var MouseRandomizer = require('../utils/mouseRandomizer');

if (typeof window !== 'undefined') {
    var gsap = require('gsap');
}

const DEFAULT_GRAPH_STYLE = {
    'short_distance_opacities': {
        'circle_opacity': 0.7,
        'line_opacity': 0.7,
        'max_distance': 80
    },
    'medium_distance_opacities': {
        'circle_opacity': 0.1,
        'line_opacity': 0.1,
        'max_distance': 200
    },
    'long_distance_opacities': {
        'circle_opacity': 0.01,
        'line_opacity': 0.01,
        'max_distance': 300
    },
    'infinite_distance_opacities': {
        'circle_opacity': 0.0,
        'line_opacity': 0.0,
        'max_distance': Number.MAX_VALUE
    },
    'horizontal_density': 15,
    'vertical_density': 15
};

class HeaderGraph extends React.Component {
    constructor(props) {
        super(props);
        this.animateHeader = true;

        this.mouseRandomizer = new MouseRandomizer();
        this.mouseRandomizer.start(this.props.canvasWidth, this.props.canvasHeight, this.mouseMoveHandler);

        this.mouseMoveHandler = (e) => {
            let posx = 0;
            let posy = 0;
            if (e.pageX || e.pageY) {
                posx = e.pageX;
                posy = e.pageY;
            } else if (e.clientX || e.clientY) {
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            this.target.x = posx + $(this.refs.canvas).scrollLeft();
            this.target.y = posy + $(this.refs.canvas).scrollTop();
        };

        this.resizeHandler = () => {
            if (this.requestId) {
                window.cancelAnimationFrame(this.requestId);
                this.requestId = null;
            }
            this.removeListeners();
            this.initHeader();
            this.initAnimation();
            this.addListeners();
        };

        this.scrollHandler = () => {
            this.animateHeader = document.body.scrollTop < this.height
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.canvasWidth !== this.props.canvasWidth || prevProps.canvasHeight !== this.props.canvasHeight) {
          this.resizeHandler();
          this.mouseRandomizer.start(this.props.canvasWidth, this.props.canvasHeight, this.mouseMoveHandler);
        }
    }

    componentDidMount() {
        this.initHeader();
        this.initAnimation();
        this.addListeners();
    }

    componentWillUnmount() {
        this.removeListeners();
    }

    render() {
        return (
            <canvas ref="canvas" className="absolute hidden-xs" width="9999px" height="100%" />
        )
    }

    initHeader() {
        this.width = this.props.canvasWidth;
        this.height = this.props.canvasHeight;
        this.target = {
            x: this.width / 2,
            y: this.height / 3
        };

        this.refs.canvas.width =this.width;
        this.refs.canvas.height = this.height;

        this.context = this.refs.canvas.getContext('2d');

        // Create points
        this.points = [];
        for (let x = 0; x < this.width; x = x + this.width / DEFAULT_GRAPH_STYLE.horizontal_density) {
            for (let y = 0; y < this.height; y = y + this.height / DEFAULT_GRAPH_STYLE.vertical_density) {
                let px = x + Math.random() * this.width / DEFAULT_GRAPH_STYLE.horizontal_density;
                let py = y + Math.random() * this.height / DEFAULT_GRAPH_STYLE.vertical_density;
                let p = {
                    x: px,
                    originX: px,
                    y: py,
                    originY: py
                };
                this.points.push(p);
            }
        }

        // For each point find the 5 closest points
        for (let i = 0; i < this.points.length; i++) {
            let closest = [];
            let p1 = this.points[i];
            for (let j = 0; j < this.points.length; j++) {
                let p2 = this.points[j];
                if (!(p1 == p2)) {
                    let placed = false;
                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (closest[k] == undefined) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }

                    for (let k = 0; k < 5; k++) {
                        if (!placed) {
                            if (HeaderGraph.getDistance(p1, p2) < HeaderGraph.getDistance(p1, closest[k])) {
                                closest[k] = p2;
                                placed = true;
                            }
                        }
                    }
                }
            }
            p1.closest = closest;
        }

        // Assign a circle to each point
        for (let i in this.points) {
            this.points[i].circle = new Circle(this.points[i], 2 + Math.random() * 2, 'rgba(255,255,255,0.3)');
        }
    }

    initAnimation() {
        this.animate();
        for (var i in this.points) {
            this.shiftPoint(this.points[i]);
        }
    }

    animate() {
        if (this.animateHeader) {
            this.context.clearRect(0, 0, this.width, this.height);
            for (let i in this.points) {
                // detect points in range
                if (Math.abs(HeaderGraph.getDistance(this.target, this.points[i])) <
                        DEFAULT_GRAPH_STYLE.short_distance_opacities.max_distance) {
                    this.points[i].active = DEFAULT_GRAPH_STYLE.short_distance_opacities.line_opacity;
                    this.points[i].circle.active = DEFAULT_GRAPH_STYLE.short_distance_opacities.circle_opacity;
                } else if (Math.abs(HeaderGraph.getDistance(this.target, this.points[i])) <
                        DEFAULT_GRAPH_STYLE.medium_distance_opacities.max_distance) {
                    this.points[i].active = DEFAULT_GRAPH_STYLE.medium_distance_opacities.line_opacity;
                    this.points[i].circle.active = DEFAULT_GRAPH_STYLE.medium_distance_opacities.circle_opacity;
                } else if (Math.abs(HeaderGraph.getDistance(this.target, this.points[i]))
                        < DEFAULT_GRAPH_STYLE.long_distance_opacities.max_distance) {
                    this.points[i].active = DEFAULT_GRAPH_STYLE.long_distance_opacities.line_opacity;
                    this.points[i].circle.active = DEFAULT_GRAPH_STYLE.long_distance_opacities.circle_opacity;
                } else {
                    this.points[i].active = DEFAULT_GRAPH_STYLE.infinite_distance_opacities.line_opacity;
                    this.points[i].circle.active = DEFAULT_GRAPH_STYLE.infinite_distance_opacities.circle_opacity;
                }

                this.drawLines(this.points[i]);
                this.points[i].circle.draw(this.context);
            }
        }
        this.requestId = requestAnimationFrame(() => this.animate());
    }

    shiftPoint(p) {
        TweenLite.to(p, 1 + Math.random(), {
            x: p.originX - 50 + Math.random() * 100,
            y: p.originY - 50 + Math.random() * 100,
            onComplete: () => {
                this.shiftPoint(p);
            }
        });
    }

    addListeners() {
        window.addEventListener('scroll', this.scrollHandler);
    }

    removeListeners() {
        window.removeEventListener('scroll', this.scrollHandler);
    }

    drawLines(p) {
        if (!p.active) return;
        for (var i in p.closest) {
            this.context.beginPath();
            this.context.moveTo(p.x, p.y);
            this.context.lineTo(p.closest[i].x, p.closest[i].y);
            this.context.strokeStyle = 'rgba(144,229,244,' + p.active + ')';
            this.context.stroke();
        }
    }

    static getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }
}

module.exports = HeaderGraph;

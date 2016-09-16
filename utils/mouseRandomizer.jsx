const DIRECTIONS = [
    "TOP",
    "LEFT",
    "BOTTOM",
    "RIGHT",
    "TOP_LEFT",
    "BOTTOM_RIGHT",
    "TOP_RIGHT",
    "BOTTOM_LEFT"
];

const DIRECTION_CHANGE_INTERVAL = 3000;
const POSITION_CHANGE_INTERVAL = 10;

class MouseRandomizer {
    constructor() {
        this.x = 0;
        this.y = 0;
        this.started = false;
        this.newDirection = () => {
            return Math.floor((Math.random() * DIRECTIONS.length))
        };
        this.direction = DIRECTIONS[this.newDirection()];
    }

    start(width, height, handler) {
        if (this.started) {
            window.clearInterval(this.positionInterval);
            window.clearInterval(this.directionInterval);
        }
        let x = Math.floor((Math.random() * width) + 1);
        let y = Math.floor((Math.random() * height) + 1);

        this.directionInterval = window.setInterval(() => {
            this.direction = DIRECTIONS[this.newDirection()];
        }, DIRECTION_CHANGE_INTERVAL);

        this.positionInterval = window.setInterval(() => {
            if (this.direction == "TOP") {
                y = Math.max(y - 1, 0);
            } else if (this.direction == "LEFT") {
                x = Math.max(x - 1, 0);
            } else if (this.direction == "BOTTOM") {
                y = Math.min(y + 1, height);
            } else if (this.direction == "RIGHT") {
                x = Math.min(x + 1, width);
            } else if (this.direction == "TOP_LEFT") {
                y = Math.max(y - 1, 0);
                x = Math.max(x - 1, 0);
            } else if (this.direction == "BOTTOM_RIGHT") {
                y = Math.min(y + 1, height);
                x = Math.min(x + 1, width);
            } else if (this.direction == "TOP_RIGHT") {
                y = Math.max(y - 1, 0);
                x = Math.min(x + 1, width);
            } else if (this.direction == "BOTTOM_LEFT") {
                y = Math.min(y + 1, height);
                x = Math.max(x - 1, 0);
            }

            handler({
                "clientX": x,
                "clientY": y
            });

        }, POSITION_CHANGE_INTERVAL);
        this.started = true;
    }
}

module.exports = MouseRandomizer;

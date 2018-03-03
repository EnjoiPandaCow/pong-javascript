class Vec {
    constructor(x = 0, y = 0) {

        this.x = x;
        this.y = y;
    }
}

// Class for generating rectangles.
class Rect {

    constructor(w, h) {
        // This will be the position of the rectangle.
        this.pos = new Vec;
        // This will be the size of the rectangle.
        this.size = new Vec(w, h);
    }

    // Get the position of the left side of the rectangle
    get left() {
        return this.pos.x - this.size.x / 2;
    }

    get right() {
        return this.pos.x + this.size.x / 2;
    }

    get top() {
        return this.pos.y - this.size.y / 2;
    }

    get bottom() {
        return this.pos.y + this.size.y / 2;
    }
}

class Ball extends Rect {
    constructor() {
        super(10, 10);
        this.vel = new Vec;
    }
}

class Pong {

    constructor(canvas) {
        this._canvas = canvas;
        this._context = canvas.getContext('2d');

        // Initialing the ball.
        this.ball = new Ball;
        this.ball.pos.x = 100;
        this.ball.pos.y = 50;

        this.ball.vel.x = 500;
        this.ball.vel.y = 500;

        let lastTime;
        const callback = (millis) => {
            if (lastTime) {
                this.update((millis - lastTime) / 1000);
            }
            lastTime = millis;
            requestAnimationFrame(callback);
        };
        callback();
    }

    draw () {
        // Draw everything every time there is an update.
        this._context.fillStyle = '#000';
        this._context.fillRect(0, 0, this._canvas.width, this._canvas.height);

        this.drawRect(this.ball);
    }

    drawRect(rect) {
        this._context.fillStyle = '#fff';
        this._context.fillRect(rect.pos.x, rect.pos.y, rect.size.x, rect.size.y);
    }

    // Updates the balls position. Takes a delta time.
    update (dt) {
        //  Movement of the ball is relative to the time difference of the update method.
        this.ball.pos.x += this.ball.vel.x * dt;
        this.ball.pos.y += this.ball.vel.y * dt;

        // Adding bounce to the edges of the canvas.
        if (this.ball.left < 0 || this.ball.right > this._canvas.width) {
            // Inverting the balls velocity.
            this.ball.vel.x = -this.ball.vel.x;
        }

        if (this.ball.top < 0 || this.ball.bottom > this._canvas.height) {
            // Inverting the balls velocity.
            this.ball.vel.y = -this.ball.vel.y;
        }

        this.draw()
    }
}

const canvas = document.getElementById('pong');
const pong = new Pong(canvas);




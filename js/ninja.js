const GAME_BOAD_WIDTH = 750;
const GAME_BOAD_HEIGHT = 750;

const ORIENTATION_LEFT = "left";
const ORIENTATION_RIGHT = "right";
const ORIENTATION_UP = "up";
const ORIENTATION_DOWN = "dow";

const NINJA_WIDTH = 59;
const NINJA_HEIGHT = 86;

const NINJA_X_POSITION = 0;
const NINJA_Y_POSITION = 0;
const ORIENTATION = ORIENTATION_DOWN;
const NINJA_SPEED = 20;


// LOP NINJA

function Ninja() {
    this.xPosition = NINJA_X_POSITION;
    this.yPosition = NINJA_Y_POSITION;
    this.orientation = ORIENTATION;
    this.speed = NINJA_SPEED;
    this.step = 1;

    this.buildImg = function () {
        this.image = `${this.orientation}${this.step}.png `;
    };
    this.move = function () {
        switch (this.orientation) {
            case ORIENTATION_DOWN :
                if(this.yPosition < GAME_BOAD_HEIGHT - NINJA_HEIGHT)
                this.yPosition += this.speed;
                break;
            case ORIENTATION_UP :
                if(this.yPosition > 0)
                this.yPosition -= this.speed;
                break;
            case ORIENTATION_LEFT :
                if(this.xPosition > 0)
                this.xPosition -= this.speed;
                break;
            case ORIENTATION_RIGHT :
                if(this.xPosition < GAME_BOAD_WIDTH - NINJA_WIDTH)
                this.xPosition += this.speed;
                break;
        }

        if(this.step == 2) {
            this.step = 1;
        } else {
            this.step = 2;
        }

        this.buildImg();
    };
       
    this.show = function (ctx) {
        let image = new Image();
        let xPosition = this.xPosition;
        let yPosition = this.yPosition;
        image.onload = function () {
            ctx.drawImage(image,xPosition,yPosition);

        };
        image.src = `/src/ninjaGame/img/ninja_${this.image}`;
    };
}

function GameBoard() {

    this.ninja = new Ninja();
    this.ctx = undefined;
    this.start = function () {
        this.ninja.buildImg();
        this.ctx = document.getElementById('gameCanvas').getContext('2d');
        this.ninja.show(this.ctx);
    };

    this.render = function () {
        this.ctx.clearRect(0,0,GAME_BOAD_WIDTH,GAME_BOAD_HEIGHT);
        this.ninja.show(this.ctx);

    }

    this.moveNinja = function (event) {
        let orientation = 0;
        switch (event.which) {
            case 37:
                orientation = ORIENTATION_LEFT;
                break;
            case 38 :
                orientation = ORIENTATION_UP;
                break;
            case 39 :
                orientation = ORIENTATION_RIGHT;
                break;
            case 40 :
                orientation = ORIENTATION_DOWN;
                break;
        }

        if(orientation){
            if(this.ninja.orientation !== orientation) {
                this.ninja.orientation = orientation;
            } else {
                this.ninja.move();
            }
            this.render();
        }
    } 
}

let gameBoard = new GameBoard();
gameBoard.start();
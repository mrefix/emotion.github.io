var centerX;
var centerY;
var curve;
var toggleAnchors;
var toggleMousePress;

function setup() {
    createCanvas(windowWidth, windowHeight);
    //initialize variables
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;
    toggleAnchors = false;
    toggleMousePress = false;

    curve = new MoveableBezierCurve(85, 10, 100, 100, 20, 20, 15, 80);
}

function draw() {

    background(255);
    curve.draw();
}

function mousePressed() {
    if (!toggleAnchors) {
        console.log("Attempt to set Anchor 1");
        curve.setAnchor1(mouseX, mouseY);
        toggleAnchors = true;
    } else {
        console.log("Attempt to set Anchor 2");
        curve.setAnchor2(mouseX, mouseY);
        toggleAnchors = false;
    }
}


function MoveableBezierCurve(x1, y1, x2, y2, x3, y3, x4, y4) {
    this.x1 = x1;
    this.x2 = x2;
    this.x3 = x3;
    this.x4 = x4;
    this.y1 = y1;
    this.y2 = y2;
    this.y3 = y3;
    this.y4 = y4;


    this.draw = function() {
        bezier(this.x1, this.y1, this.x2, this.y2, this.x3, this.y3, this.x4, this.y4);
        fill(255);
        ellipse(this.x2, this.y2, 5);
        ellipse(this.x3, this.y3, 5);
    }
    this.setAnchor1 = function(newX, newY) {
        console.log("Setting Anchor 1");
        this.x2 = newX;
        this.y2 = newY;
    }
    this.setAnchor2 = function(newX, newY) {
        console.log("Setting Anchor 2");
        this.x3 = newX;
        this.y3 = newY;
    }
}
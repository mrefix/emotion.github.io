var mapX = 0,
    mapY = 0,
    centerX,
    centerY,
    hasMouseMoved,
    img;

// This function is needed before setup
function preload() {
    // image is loaded from local memory. WILL ERROR IN GOOGLE CHROME
    img = loadImage("../koiArt.jpg");
}

function setup() {
    createCanvas(windowWidth - 20, windowHeight - 20);
    centerX = windowWidth / 2;
    centerY = windowHeight / 2;

    //Creates faded center white circle
    noStroke();
    var i = 255;
    var radius = windowWidth / 18 + (255 - i);
    for (; i >= 0; i--) {
        fill(255, 255, 255, i);
        radius = windowWidth / 18 + (255 - i);
        ellipse(centerX, centerY, radius);
    }

    // Puts image on page.  
    // image(image, x, y, newDimensionX, newDimensionY)
    image(img, centerX - 90, centerY - 90, 180, 180);
}

function draw() {}

let playerState = 'front'; // initial state of the player
const dropdown = document.getElementById('animations'); // grabbing the dropdown by id
dropdown.addEventListener('change', function(e) { // adding an event listener to the dropdown
    playerState = e.target.value; // setting the playerState to the value of the dropdown
});

const canvas = document.getElementById('canvas1'); // grabbing the canvas by id
const ctx = canvas.getContext('2d'); // setting the context to 2d (or webgl for 3d)
// Global variables CAPITALIZED
const CANVAS_WIDTH = canvas.width = 474; // setting width to the #canvas1 CSS style width to avoid distortion
const CANVAS_HEIGHT = canvas.height = 474; // setting height to the #canvas1 CSS style width to avoid distortion

// Simple way to animate sprites -------------------------------------------------------------------------
const playerImage = new Image(); // creating a new image object
playerImage.src = 'OIP.jpg'; // setting the source of the image
const spriteWidth = 118.5; // width of the sprite image (total sprite sheet width / number of frames)
const spriteHeight = 118.5; // height of the sprite image (total sprite sheet height / number of rows)
let gameFrame = 0; // used to control the speed of the animation
let staggerFrames = 5; // controls the speed of the animation, higher number = slower animation


const spriteAnimations = []; // array to hold the animations
const animationStates = [ // array to hold the animation states (like a map) this is for a regular sprite sheet
    { name: 'front', frames: 4 }, // idle animation with 7 frames
    { name: 'left', frames: 4 }, // jump animation with 7 frames
    { name: 'right', frames: 4 }, // fall animation with 7 frames
    { name: 'butt', frames: 4 }, // run animation with 9 frames
];
animationStates.forEach((state, index) => { // looping through the animation states
    let frames = {
        loc: [] // creating an array to hold the locations of the frames
    };
    for (let j = 0; j < state.frames; j++) { // looping through the number of frames in each animation state
        let positionX = j * spriteWidth; // calculating the x position of the frame
        let positionY = index * spriteHeight; // calculating the y position of the frame based on the index of the animation state
        frames.loc.push({ x: positionX, y: positionY }); // pushing the x and y positions into the loc array
    }
    spriteAnimations[state.name] = frames; // adding the frames to the spriteAnimations object with the name of the animation state as the key
});
console.log(spriteAnimations); // logging the animation states to the console

function animate() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT); // clearing the canvas - expects x, y, width, height
    let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length; // takes 5 gameFrames to get to 1 (5/5 = 1)
    // then 1 % 6 = 1, 2 % 6 = 2, 3 % 6 = 3, 4 % 6 = 4, 5 % 6 = 5, 6 % 6 = 0, 7 % 6 = 1(starts all over again)
    let frameX = spriteAnimations[playerState].loc[position].x; // setting frameX to the current position multiplied by the sprite width
    let frameY = spriteAnimations[playerState].loc[position].y; // getting the y position of the current frame from the spriteAnimations object

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 177.75, 177.75, spriteWidth, spriteHeight); // drawing the image on the canvas at position (0, 0)
    // ctx.drawImage(image to use, sx, sy, sw, sh, dx, dy, dw, dh); s = source 'cut-out' / d = destination on canvas to draw
    // setting source width (sw) to 1 * spriteWidth jumps the sprite sheet by 1 frame to the right
    
    
    gameFrame++; // incrementing gameFrame to control the speed of the animation
    requestAnimationFrame(animate); // calling animate again to create an animation loop
};

animate(); // calling the animate function to start the animation


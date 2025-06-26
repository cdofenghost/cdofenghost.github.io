const leadHeading = document.querySelector('.lead-heading');
const overlayBalls = document.querySelector('.overlay-balls');

const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

const width = window.innerWidth;
const height = window.innerHeight;

let mX = 0;
let mY = 0;

const greenColorR = 106;
const greenColorG = 176;
const greenColorB = 76;

const redColorR = 235;
const redColorG = 77;
const redColorB = 75;

const rangeAmount = 500;

onresize = () => {
    const screenWidth = window.screen.width;
    const screenHeight = window.screen.height;
    
    width = window.innerWidth;
    height = window.innerHeight;
};

document.addEventListener('mousemove', (event) => {
    mX = event.clientX;
    mY = event.clientY;
});

const ballAmount = 3;
const baselineSine = 0.025;
const toplineSine = 0.3;
var balls = [];
var ballAlphas = [];

var oldBallPositionsX = [];
var oldBallPositionsY = [];

var ballPositionsX = [];
var ballPositionsY = [];

let startTime = null;
let startTimeColor = null;

const duration = 5000;
const awaitTime = 500;

document.addEventListener("DOMContentLoaded", (event) => {
    setTimeout(() => {
        spawnFunnyBalls();
        requestAnimationFrame(animateBalls);
    }, 1000);
});

function spawnFunnyBalls()
{
    for (var i = 0; i < ballAmount; i++)
    {
        const ball = document.createElement("canvas");
        ball.id = `canvas-${i}`;
        ball.width= "2000";
        ball.height="2000"; 

        var randomSize = Math.min(250 + Math.random() * 500, 500);
        var alpha = Math.random() * 100;
        ballAlphas.push(alpha);

        var posX = Math.floor(-screenWidth / 2 + Math.random()*(width + 1));
        var posY = Math.floor(-screenHeight + Math.random()*(height + 1));

        oldBallPositionsX.push(posX);
        oldBallPositionsY.push(posY);

        ball.style = `position: absolute; color: #6ab04c; top: ${posY}px; left: ${posX}px; z-index: -1`;

        if (ball.getContext) {
            const ctx = ball.getContext("2d");

            ctx.arc(1000, 1000, randomSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(106, 176, 76, ${alpha}%)`;
            ctx.fill();
        }

        balls.push(ball);
        overlayBalls.append(ball);
        setNewPositions();
    }
}

function setNewPositions()
{
    ballPositionsX = [];
    ballPositionsY = [];

    for (var i = 0; i < ballAmount; i++)
    {
        var posX = Math.floor(-screenWidth / 2 + Math.random()*(width + 1));
        var posY = Math.floor(-screenHeight + Math.random()*(height + 1));

        ballPositionsX.push(posX);
        ballPositionsY.push(posY);
    }
}

function setOldPositions()
{
    oldBallPositionsX = [];
    oldBallPositionsY = [];

    for (var i = 0; i < ballAmount; i++)
    {
        var oldX = ballPositionsX[i];
        var oldY = ballPositionsY[i];

        oldBallPositionsX.push(oldX);
        oldBallPositionsY.push(oldY);
    }
}

function clamp01(a)
{
    if (a < 0) return 0;
    if (a > 1) return 1;

    return a;
}
function lerp(a, b, time)
{
    return a + (b - a) * clamp01(time);
}

function vectorLength(x, y)
{
    return Math.sqrt(x**2 + y**2);
}

function inBallRange(magnitude)
{
    return clamp01(magnitude / rangeAmount);
}

function animateBalls(currentTime)
{
    if (!startTime) 
        startTime = currentTime;

    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);

    var ballSpeed = easeInOut(progress);
    var alpha = sineInOut(progress);

    for (var i = 0; i < ballAmount; i++)
    {
        const ball = balls[i];

        var goalX = oldBallPositionsX[i] + (ballPositionsX[i] - oldBallPositionsX[i]) * ballSpeed;
        var goalY = oldBallPositionsY[i] + (ballPositionsY[i] - oldBallPositionsY[i]) * ballSpeed;

        ball.style.top = `${goalY}px`;
        ball.style.left = `${goalX}px`;

        var rangeValue = inBallRange(vectorLength(mX - (goalX + screenWidth/2), mY - (goalY + screenHeight)));

        var r = lerp(redColorR, greenColorR, rangeValue);
        var g = lerp(redColorG, greenColorG, rangeValue);
        var b = lerp(redColorB, greenColorB, rangeValue);

        if (ball.getContext) {
            const ctx = ball.getContext("2d");

            ctx.clearRect(0, 0, ball.width, ball.height);

            ctx.fillStyle = `rgb(${r}, ${g}, ${b}, ${alpha})`;
            ctx.fill();
        }
    }

    if (progress >= 1)
    {
        startTime = currentTime;
        setOldPositions();
        setNewPositions();
    }
    requestAnimationFrame(animateBalls);
}

function easeInOut(x) {
    return Math.sqrt(1 - Math.pow(x - 1, 2));
}

function sineInOut(x)
{
    var angle = 3 * x;

    if (angle < 0 || angle > Math.PI)
        return baselineSine;

    return Math.abs(Math.min(Math.max(baselineSine, Math.sin(angle)), toplineSine));
}


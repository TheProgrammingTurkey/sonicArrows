let canvas = document.getElementById('game');
let ctx = canvas.getContext('2d');
let movingSpeed = 60;
let secondsPassed = 0;
let oldTimeStamp = 0;

//sets canvas fullscreen
canvas.height = Math.floor(window.innerHeight)
canvas.width = Math.floor(window.innerWidth)

//setting up which arrow displays
const arrows = ["up", "left", "right", "down"]
let currentArrow = arrows[Math.floor(Math.random() * arrows.length)];
let arrowCalculation

//basic variables
let playing = false
let played = false
let spacePressed = false
let toggledKey = ""
let startTime = ""
let timer = 0
let score = 0
let officialTime = 0
let mistakes = 0

let highscore = 0
let highscore2 = 0
let highscore3 = 0
let highscore4 = 0
let highscore5 = 0

//getting past highscores from localStorage
if (localStorage.getItem("highscore") === null){
    highscore = 0
}
else{
    highscore = parseFloat(localStorage.getItem("highscore"))
}

if (localStorage.getItem("highscore2") === null){
    highscore2 = 0
}
else{
    highscore2 = parseFloat(localStorage.getItem("highscore2"))
}
if (localStorage.getItem("highscore3") === null){
    highscore3 = 0
}
else{
    highscore3 = parseFloat(localStorage.getItem("highscore3"))
}

if (localStorage.getItem("highscore4") === null){
    highscore4 = 0
}
else{
    highscore4 = parseFloat(localStorage.getItem("highscore4"))
}

if (localStorage.getItem("highscore5") === null){
    highscore5 = 0
}
else{
    highscore5 = parseFloat(localStorage.getItem("highscore5"))
}

//when key is pressed down, log the key
document.addEventListener("keydown", event => {
    toggledKey = event.code;
    event.preventDefault();
});
//when key is lifted, log the key
document.addEventListener("keyup", event => {
    if (event.code == "Space" && playing == false){
        spacePressed = true
    }
    event.preventDefault();
});
function update() {  
    //start game on space press  
    if (spacePressed == true){
        timer = 0
        score = 0
        officialTime = 0
        startTime = Date.now();
        playing = true
        spacePressed = false
    }
    
    //whole game part
    if (playing == true){
        //timer
        setInterval(function() {
            let elapsedTime = Date.now() - startTime;
            timer = (elapsedTime / 1000).toFixed(3);
        }, 100);

        //seeing if arrow press is the right one and showing new arrow
        if (toggledKey == "ArrowUp" && currentArrow == "up") {
            arrowCalculation = Math.floor(Math.random() * (arrows.length-1));
            if(arrowCalculation == 0){
                currentArrow = "right"
            } else if(arrowCalculation == 1){
                currentArrow = "left"
            } else{
                currentArrow = "down"
            }
            score++
            toggledKey = "";
        }
        if (toggledKey == "ArrowDown" && currentArrow == "down") {
            arrowCalculation = Math.floor(Math.random() * (arrows.length-1));
            if(arrowCalculation == 0){
                currentArrow = "up"
            } else if(arrowCalculation == 1){
                currentArrow = "right"
            } else{
                currentArrow = "left"
            }
            score++
            toggledKey = "";
        }
        if (toggledKey == "ArrowLeft" && currentArrow == "left") {
            arrowCalculation = Math.floor(Math.random() * (arrows.length-1));
            if(arrowCalculation == 0){
                currentArrow = "down"
            } else if(arrowCalculation == 1){
                currentArrow = "up"
            } else{
                currentArrow = "right"
            }
            score++
            toggledKey = "";
        }
        if (toggledKey == "ArrowRight" && currentArrow == "right") {
            arrowCalculation = Math.floor(Math.random() * (arrows.length-1));
            if(arrowCalculation == 0){
                currentArrow = "left"
            } else if(arrowCalculation == 1){
                currentArrow = "down"
            } else{
                currentArrow = "up"
            }
            score++
            toggledKey = "";
        }
        if ((toggledKey == "ArrowDown" || toggledKey == "ArrowLeft" || toggledKey == "ArrowRight") && currentArrow == "up"){
            startTime = startTime-250
            mistakes +=1
            toggledKey = "";
        }
        if ((toggledKey == "ArrowLeft" || toggledKey == "ArrowRight" || toggledKey == "ArrowUp") && currentArrow == "down"){
            startTime = startTime-250
            mistakes +=1
            toggledKey = "";
        }
        if ((toggledKey == "ArrowRight" || toggledKey == "ArrowUp" || toggledKey == "ArrowDown") && currentArrow == "left"){
            startTime = startTime-250
            mistakes +=1
            toggledKey = "";
        }
        if ((toggledKey == "ArrowUp" || toggledKey == "ArrowDown" || toggledKey == "ArrowLeft") && currentArrow == "right"){
            startTime = startTime-250
            mistakes +=1
            toggledKey = "";
        }
        //if game ends
        if (score == 30){
            setInterval(function() {
                let elapsedTime = Date.now() - startTime;
                timer = (elapsedTime / 1000).toFixed(3);
            }, 100);
            playing = false
            officialTime = Math.round((parseFloat(timer)+parseFloat(mistakes*.25))*1000)/100
            played = true
            mistakes = 0
            //adding new score to highscores
            if (highscore == 0){
                highscore = officialTime
            }
            else if (officialTime < highscore){
                highscore5 = highscore4
                highscore4 = highscore3
                highscore3 = highscore2
                highscore2 = highscore
                highscore = officialTime
            }
            else if (highscore2 == 0){
                highscore2 = officialTime
            }
            else if (officialTime < highscore2){
                highscore5 = highscore4
                highscore4 = highscore3
                highscore3 = highscore2
                highscore2 = officialTime
            }
            else if (highscore3 == 0){
                highscore3 = officialTime
            }
            else if (officialTime < highscore3){
                highscore5 = highscore4
                highscore4 = highscore3
                highscore3 = officialTime
            }
            else if (highscore4 == 0){
                highscore4 = officialTime
            }
            else if (officialTime < highscore4){
                highscore5 = highscore4
                highscore4 = officialTime
            }
            else if (highscore5 == 0){
                highscore5 = officialTime
            }
            else if (officialTime < highscore5){
                highscore5 = officialTime
            }
            //adding highscores to local storage
            localStorage.setItem("highscore", highscore);
            localStorage.setItem("highscore2", highscore2);
            localStorage.setItem("highscore3", highscore3);
            localStorage.setItem("highscore4", highscore4);
            localStorage.setItem("highscore5", highscore5);
            officialTime = parseFloat(timer)
        }
    }
}

//drawing everything
function draw(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);    
    update();
    if (canvas.width > 1000){
        ctx.font = "30px Arial";
    }
    else {
        ctx.font = "20px Arial";
    }
    ctx.textAlign = "center";
    //timer
    if (playing == true){
        ctx.fillStyle="black"
        ctx.fillText(timer, canvas.width/2, 40);
    }
    //highscores and end time
    if (playing == false){
        ctx.fillStyle="black"
        ctx.fillText(officialTime, canvas.width/2, 40);
        if(highscore != 0){
            ctx.fillText("Highscores:", canvas.width - 140, 40)
            ctx.fillText(highscore, canvas.width - 140, 80)
        }
        if(highscore2 != 0){
            ctx.fillText(highscore2, canvas.width - 140, 120)
        }
        if(highscore3 != 0){
            ctx.fillText(highscore3, canvas.width - 140, 160)
        }
        if(highscore4 != 0){
            ctx.fillText(highscore4, canvas.width - 140, 200)
        }
        if(highscore5 != 0){
            ctx.fillText(highscore5, canvas.width - 140, 240)
        }
        //information
        ctx.fillStyle="grey"
        if (played == false){
            ctx.textAlign = "left";
            ctx.fillText("Press The Same Arrow Key As The Arrow That Shows", 80, 120)
            ctx.fillText("Try To Get 30 In The Fastest Possible Time", 80, 160)
            ctx.fillText("Be Careful! Mistakes Cost Time!", 80, 200)
            ctx.fillText("Press Space To Start", 80, 240);
            ctx.textAlign = "center";
        }
        if (played == true){
            ctx.fillText("Press Space To Start", canvas.width/2, 140);
        }
        ctx.textAlign = "center";
    }//arrows
    if (playing == true){
        if(currentArrow == "up"){
            ctx.drawImage(upArrow, canvas.width/2-50, canvas.height/2-150, 100, 100);
        }
        if(currentArrow == "left"){
            ctx.drawImage(leftArrow, canvas.width/2-150, canvas.height/2-50, 100, 100);
        }
        if(currentArrow == "right"){
            ctx.drawImage(rightArrow, canvas.width/2+50, canvas.height/2-50, 100, 100);
        }
        if(currentArrow == "down"){
            ctx.drawImage(downArrow, canvas.width/2-50, canvas.height/2+50, 100, 100);
        }
    }
    window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

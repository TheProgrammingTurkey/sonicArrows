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
let rounds = 0
let scoreNeeded = 0


//user scores
const scores = ["", "", "", "", "", "", "", "", "", "", ]
let p1avg = ""
let p2avg = ""
let p1scores = 0
let p2scores = 0

//when key is pressed down, log the key
document.addEventListener("keydown", event => {
    toggledKey = event.code;
    event.preventDefault();
});
//when key is lifted, log the key
document.addEventListener("keyup", event => {
    if (event.code == "Space" && !playing){
        spacePressed = true
    }
    event.preventDefault();
});
function update() {
    //start game on space press  
    if (spacePressed && rounds <= 9){
        timer = 0
        score = 0
        officialTime = 0
        startTime = Date.now();
        playing = true
        spacePressed = false
    }
    
    //whole game part
    if (playing){
        if (toggledKey == "KeyR"){
            playing = false
        }
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
            toggledKey = "";
        }
        if ((toggledKey == "ArrowLeft" || toggledKey == "ArrowRight" || toggledKey == "ArrowUp") && currentArrow == "down"){
            startTime = startTime-250
            toggledKey = "";
        }
        if ((toggledKey == "ArrowRight" || toggledKey == "ArrowUp" || toggledKey == "ArrowDown") && currentArrow == "left"){
            startTime = startTime-250
            toggledKey = "";
        }
        if ((toggledKey == "ArrowUp" || toggledKey == "ArrowDown" || toggledKey == "ArrowLeft") && currentArrow == "right"){
            startTime = startTime-250
            toggledKey = "";
        }
        //if game ends
        if (score == 30){
            setInterval(function() {
                let elapsedTime = Date.now() - startTime;
                timer = (elapsedTime / 1000).toFixed(3);
            }, 100);
            playing = false
            officialTime = Math.round(timer*1000)/1000
            scores[rounds] = officialTime
            played = true
            rounds+=1
            if ((rounds % 2) == 0){
                p2scores += parseFloat(officialTime)
                p2avg = Math.round((p2scores / Math.ceil(rounds/2))*1000)/1000
            }
            else{
                p1scores += parseFloat(officialTime)
                p1avg = Math.round((p1scores / Math.ceil(rounds/2))*1000)/1000
            }
            if (rounds == 9){
                scoreNeeded = Math.round(((p1avg*5)-(p2avg*4))*1000)/1000-0.001
            }
        }
    }
    if (toggledKey == "Escape" && !playing){
        window.location.replace("index.html")
    }

}

//drawing everything
function draw(timeStamp) {
    secondsPassed = (timeStamp - oldTimeStamp) / 1000;
    oldTimeStamp = timeStamp;
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);    
    update();
    if (canvas.width > 1000){
        ctx.font = "30px Kanit";
    }
    else {
        ctx.font = "20px Kanit";
    }
    ctx.textAlign = "center";
    //timer
    if (playing){
        ctx.fillStyle="black"
        ctx.fillText(timer, canvas.width/2, 40);
    }
    //highscores and end time
    if (!playing){
        ctx.fillStyle="black"
        ctx.fillText(officialTime, canvas.width/2, 40);
        ctx.fillText("Player One:", 120, 40)
        ctx.fillText(scores[0], 120, 80)
        ctx.fillText(scores[2], 120, 120)
        ctx.fillText(scores[4], 120, 160)
        ctx.fillText(scores[6], 120, 200)
        ctx.fillText(scores[8], 120, 240)
        ctx.beginPath();
        ctx.moveTo(40, 280);
        ctx.lineTo(200, 280);
        ctx.stroke();
        ctx.fillText("Avg: "+p1avg, 120, 320)
        ctx.fillText("Player Two:", canvas.width-120, 40)
        ctx.fillText(scores[1], canvas.width-120, 80)
        ctx.fillText(scores[3], canvas.width-120, 120)
        ctx.fillText(scores[5], canvas.width-120, 160)
        ctx.fillText(scores[7], canvas.width-120, 200)
        ctx.fillText(scores[9], canvas.width-120, 240)
        ctx.beginPath();
        ctx.moveTo(canvas.width-200, 280);
        ctx.lineTo(canvas.width-40, 280);
        ctx.stroke();
        ctx.fillText("Avg: "+p2avg, canvas.width-120, 320)
        //information
        ctx.fillStyle="grey"
        if (rounds<=9){
            ctx.fillText("Press Space To Start", canvas.width/2, 140);
            ctx.fillText("Press Escape To Go Back", canvas.width/2, 200)
            ctx.fillText('Press "R" To Go Back', canvas.width/2, 260);
        }
        else{
            ctx.fillText("Press Escape To Go Back", canvas.width/2, 200)

        }
        if (rounds == 9 && scoreNeeded > 0){
            ctx.fillStyle="black"
            ctx.fillText("Score Needed To Win: "+scoreNeeded, canvas.width/2, 320);
            ctx.fillStyle="grey"
        }        
        if (played && rounds>9){
            ctx.fillStyle="black"
            if (p1avg < p2avg){
                ctx.fillText("Player One Wins!", canvas.width/2, 140);
            }
            else if(p2avg < p1avg){
                ctx.fillText("Player Two Wins!", canvas.width/2, 140);
            }
            else{
                ctx.fillText("It's A Tie!", canvas.width/2, 140);
            }
            ctx.fillStyle="grey"
        }
        ctx.textAlign = "center";
    }//arrows
    if (playing){
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
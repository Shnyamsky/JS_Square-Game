let time, level, timer;

function timeTick() {
    document.getElementById("timeText").innerHTML = time;
    if (time === 0) {
        loose();
    }
    time--;
}

function rand(min, max){
    return Math.floor(Math.random() * (max - min)) + min;
}

function squareSplit() {
    const
        hue = rand(0, 360), /*тон*/
        saturation = 100, /*насыщенность*/
        lightness = 50, /*светлота*/
        extra = 20;
        squareCount = (level+1) * (level+1),
        gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    gameField.style.gridTemplateColumns = `repeat(${(level+1).toString()}, 1fr)`;

    const
        mainColor = "hsl(" + hue.toString() + ", " + saturation.toString() + "%, " + lightness.toString() + "%)",
        otherColor = "hsl(" + hue.toString() + ", " + (saturation - saturation/level - extra).toString() + "%, " + (lightness + lightness/level).toString() + "%)",
        randomSquare = rand(0, squareCount);

    for (let i = 0; i < squareCount; i++) {

        let square = document.createElement('div');
        square.className = 'square';
        
        if (i === randomSquare) {
            square.style.backgroundColor = otherColor;
            square.id = "otherSquare";
        } else {
            square.style.backgroundColor = mainColor;
            square.id = "mainSquare";
        }

        square.onclick = squareClick;
        gameField.appendChild(square);
    }
}

function loose() {
    clearInterval(timer);
    let gameField = document.getElementById("gameField");

    while (gameField.firstChild) {
        gameField.removeChild(gameField.firstChild);
    }

    alert(`Игра окончена. Вы набрали очков: ${(level - 1).toString()}.`);

    time = 0;
    level = 0;
}

function squareClick() {
    if (this.id === "otherSquare") {
        level++;
        document.getElementById("level").innerHTML = level;
        squareSplit();
    }
    else {
        loose();
    }
}

function startGame() {
    
    clearInterval(timer);
    time = 30;
    level = 1;
    document.getElementById("level").innerHTML = level;
    squareSplit();
    timer = setInterval(timeTick, 1000);
}

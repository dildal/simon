const colors = ["green", "blue", "red", "yellow"];
const simonButtons = document.querySelectorAll('.button');
const start = document.querySelector('.start');
const wrong = document.querySelector('audio.wrong');
const count = document.querySelector('.count');
const strict = document.querySelector('.strict');
let compMoves = [];
let playerMoves = [];
let playerTurn = false;
let turnNumber = 0;
let strictOn = false;


var timerID;

// =======================
// Computer Move Functions
// =======================

function computerTurn(){
    playerTurn = false;
    turnNumber = 0;
    playerMoves = [];
    compMoves.push(colors[Math.floor(Math.random() * 4)]);
    if(compMoves.length < 10){
        count.innerText = '0' + compMoves.length;
    }else{
        count.innerText = compMoves.length;
    }
    runPattern();
}

function runPattern() {
    let i = 0;
    let timerID = setInterval(function(){
        let color = compMoves[i];
        let button = document.querySelector(`.button[data-color="${color}"]`);
        clickButton(button, 500);
        i++;
        if(i == compMoves.length){
          playerTurn = true;
          clearInterval(timerID)  
        } 
    }, 1000);
}

function clickButton(button, time){
    let audio = document.querySelector(`audio[data-color="${button.getAttribute('data-color')}"]`)
    audio.play();
    button.classList.add('click');
    setTimeout(function(){
        button.classList.remove('click');
    }, time);
};

// =======================
//  Player Move Functions
// =======================

function playerClick(){
    let pushed = this.getAttribute('data-color');
    clickButton(this, 100);
    if(pushed != compMoves[turnNumber]){
        if(strictOn){
            compMoves = [];
            computerTurn();
        }
        wrong.play();
        turnNumber = 0;
        equals = false;
        playerMoves = [];
        playerTurn = false;
        runPattern();
    } else{
       turnNumber++;
       if(turnNumber === compMoves.length){
        computerTurn()
       } else{
        return
       }
    }
}

// ================
// Event Listeners
// ================

simonButtons.forEach(function(simonButton){
    simonButton.addEventListener('click', function() {playerTurn && playerClick.call(this)})
})
start.addEventListener('click', () => {
    compMoves = [];
    computerTurn();
})

strict.addEventListener('click', () => {
    strict.classList.toggle('pressed');
    strictOn = !strictOn;
});



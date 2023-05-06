'use strict'

//////Functions
//Generate random number
const randNum = () => Math.trunc(Math.random()*49 + 1);
//
//generate user Arr
const userArr = () => {
    guesses.forEach(guess => {
        userNums.push(Number(guess.value));
    });
}

//Populating happyArr
const happyNum = arr => {
    let arrSet;
    let setArr;
    //do while loop check if happy numbers are unique, thanks to Set object 
    do {
        arrSet = arr.map(el => el = randNum());
        setArr = new Set(arrSet);
    } while (setArr.size < 6)

    return arrSet;
}

//Checking numbers between happyArr and userArr
const check = (userArr, happyArr) => {
    let i = 0;
    userArr.forEach(num => {
        if (happyArr.includes(num)) {
            boxes.forEach(box => {
                if (box.textContent === String(num)) {
                    box.style.backgroundColor = 'green';
                }
            })
            guesses.forEach(guess => {
                if (Number(guess.value) === num) {
                    guess.style.backgroundColor = 'green';
                }
            })
            ++i;
            if (i === 6) {
                clearInterval(setID);
                opis.textContent="WOW!!! YOU WIN!!!";
            }
        }
    })
    i = 0;
}

//Reseting colors
const resetColors = () => {
    boxes.forEach(box => box.style.backgroundColor = 'grey');
    guesses.forEach(guess => guess.style.backgroundColor = 'black');
}

const run = () => {
    opis.textContent="...następuje zwolnienie blokady komory...";
    info.textContent="";
    btnStop.textContent="Stop";
    btnStop.style.border="1px solid white";
    btnStart.textContent="";
    btnStart.style.border="1px solid black";

    tickets.textContent=++ticketNum;
    resetColors();
    const happyNums = happyNum(happyArr);

    //Populate boxes
    happyNums.forEach((num, i) => {
        const boxNum = `.box${i+1}`;
        document.querySelector(boxNum).textContent = num;
    })

    //Check if success
    check(userNums, happyNums);
}

const correct = (userInput) => {
    const arr = [];
    const setInput = new Set(userInput);
    console.log(userInput);
    userInput.forEach(input => {
        (input <= 49 && input > 0 && setInput.size === 6) ? arr.push('ok') : false;
    })
    return arr.length === 6 ? true : false;
}

/////
//Variables
const boxes = document.querySelectorAll('.box');
const guesses = document.querySelectorAll('.number');
const btnStart = document.querySelector('.btn-start');
const info = document.querySelector('.info');
const opis = document.querySelector('.opis');
const tickets = document.querySelector('.tickets');
const btnStop = document.querySelector('.btn-stop');

//happy numbers
const happyArr = new Array(6).fill(0);

//populating user array
let userNums = [];

//Interval ID
let setID;

//Number of tickets
let ticketNum;

opis.textContent="...komora maszyny losującej jest pusta...";
info.textContent="pick your numbers (1-49)";
btnStart.textContent="Start";
tickets.textContent="[number of tickets]";
btnStop.style.border="1px solid black";

btnStart.addEventListener('click', () => {
    userNums = [];
    ticketNum = 0;
    userArr();
    if (correct(userNums)) {
    run();
    setID = setInterval(run, 10);
    }
})

btnStop.addEventListener('click', () => {
    if (setID) {
    clearInterval(setID);
    btnStop.textContent="";
    btnStop.style.border="1px solid black";
    btnStart.textContent="Start";
    btnStart.style.border="1px solid white";
    info.textContent="pick your numbers";
    }
})


'use strict'

const boxes = document.querySelectorAll('.box');
const btnColor = document.querySelector('.btn-color');
const counter = document.querySelector('.counter');
const info = document.querySelector('.info');

// ID of setInterval method, useful to call clearInterval(ID)
let intID;
let count = 0;
const boxesObj = [];

//
counter.textContent = "_";
info.textContent="Tap to start";

//
const prop = (propColor) => {
    if (propColor === 'blue') return "BOXES";
    if (propColor === 'green') return "RINGS";
    if (propColor === 'yellow') return "BOUNCES";
    if (propColor === 'orange') return "HATS";
}


//Randomize appearance of colors
const randomColor = () => {
    const max = 4;
    const rand = Math.trunc(Math.random()*max);
    if (rand === 0) return 'blue';
    if (rand === 1) return 'green';
    if (rand === 2) return 'yellow';
    if (rand === 3) return 'orange';
}

// Color boxes
const colorBoxes = () => {
    boxes.forEach((box, index) => {
        const color = randomColor();
        box.style.backgroundColor = color;
        boxesObj[index] = color;
    });
    info.textContent='Proceeding...'
    count++;
    counter.textContent = count;
    console.log(count);
    const unify = new Set(boxesObj);
    if (unify.size === 1) {
        count = 0;
        const propColor = [...unify][0];
        clearInterval(intID);
        setTimeout(() => {info.textContent=prop(propColor)}, 3000);
        info.textContent="PROP..."
    }
}

// callback function for btnColor, has setInterval 
const changeColor = () => {
    colorBoxes();
    intID = setInterval(colorBoxes, 500);
}

//Eventlisteners
btnColor.addEventListener('click', changeColor);

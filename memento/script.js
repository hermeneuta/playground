
//Functions

//Check condition to show Memento Mori

const show = function () {
    //Central condition if input is correct
    if (inputAge.value > 0 && inputAge.value < 100
        && inputSex.value.toLowerCase() === man.id) {
        who = man;
        return true;
    } else if (inputAge.value > 0 && inputAge.value < 100 
        && inputSex.value.toLowerCase() === woman.id) {
        who = woman;
        return true;
    } else return false;
}

//Initialize UI
const resetUI = () => {
    // displayTimer.textContent = displayDate;
    // displayTime.textContent = displayHM;
    //Set Initial values
    nameAge.textContent = 'age:';
    nameSex.textContent = 'gender (m/f):';

    //Clear
    formAge.style.opacity = formSex.style.opacity = btnMemento.style.opacity = 1;
    inputAge.value = inputSex.value = mementoMori.textContent = '';
    btnReset.style.opacity = 0;
    document.querySelector('body').style.color='black';
    document.querySelector('body').style.backgroundColor='white';
}

//Compute how many years you left
const moriYear = (age, sex) => {
    let moriYears = 0; 
    sex.toLowerCase() === 'm' ?  moriYears = man.age - Number(age) : moriYears = woman.age - Number(age);
    return moriYears;
    }

//Change layout after hitting button Memento Mori
const changeLayOut = () => {
    formAge.style.opacity = formSex.style.opacity = btnMemento.style.opacity = 0;
    btnReset.style.opacity = 1;
    document.querySelector('body').style.color='white';
    document.querySelector('body').style.backgroundColor='black';
}
//function allow to start timer
const turnOn = function() {
    intID = setInterval(inter, 1000); //intID is important to stop timer by clearInterval(intID)
} 

//callback function for setInterval
const inter = function() {
    //Hours and minutes
    const now = new Date();
    const day = String(now.getDate()).padStart(2,0);
    const month = String(now.getMonth() + 1).padStart(2,0);
    const year = now.getFullYear();
    const displayDate = `${day}-${month}-${year}`;
    displayTimer.textContent = displayDate;
    const h = String(now.getHours()).padStart(2,0);
    const min = String(now.getMinutes()).padStart(2,0);
    const sec = String(now.getSeconds()).padStart(2,0);
    const displayHM = `${h}:${min}:${sec}`; 
    displayTime.textContent = displayHM;
}

const showMemento = function () {
    if (show()) {
        changeLayOut();
        clearInterval(intID); //turn off timer

        const now = new Date();
        const month = now.getMonth() + 1;
        const year = now.getFullYear();
        const day = now.getDate()

        const yearsToLive = moriYear(inputAge.value, inputSex.value);
        const displayDeathYear = `${day}-${month}-${year + Number(yearsToLive)}`;
        if (who.id && inputAge.value > who.age) {
            displayTimer.textContent = `Lucky you!!!`;
            mementoMori.textContent = `You should already pass ${inputAge.value - who.age} years ago (statistically)`;
        } else {
            displayTimer.textContent = `You will die ${displayDeathYear}`;
            mementoMori.textContent = `You have ${yearsToLive} years left (statistically)`;
        }
    };
};


//DOM elements
const displayTimer = document.querySelector('.display_timer');
const displayTime = document.querySelector('.display_time');
const btnMemento = document.querySelector('.memento');
const btnReset = document.querySelector('.reset');
const formAge = document.querySelector('.age');
const formSex = document.querySelector('.sex');
const nameAge = document.querySelector('.name_age');
const nameSex = document.querySelector('.name_sex');
const inputAge = document.querySelector('.age_input');
const inputSex = document.querySelector('.sex_input');
const mementoMori = document.querySelector('.memento_mori');

//Average live
const man = {age: 72, id: 'm'};
const woman = {age: 80, id: 'f'};

//Store information who click button (male or female)
let who;
let intID; //declare globally because is used in other places

inter(); //show timer without 1s delay
resetUI();
turnOn(); //present timer in 1s loop


//Event handlers
inputAge.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') 
    {
    e.preventDefault();
    showMemento();
    }
});

inputSex.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') 
    {
    e.preventDefault();
    showMemento();
    }
})

btnMemento.addEventListener('click', showMemento);

btnReset.addEventListener('click', () => {
    inter(); //time appear without delay
    turnOn(); //turn on timer -> need to be putted in eventhandler
    resetUI();
})
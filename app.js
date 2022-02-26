'use strict';

// Elements
const options = document.querySelector('#options');
const tipContainer = document.querySelector('.tip__button-box');
const buttons = document.querySelectorAll('.tip__button');

const billInput = document.getElementById('bill-input');
const peopleInput = document.getElementById('people-input');
const tipInput = document.getElementById('tip-input');

const tipDisplay = document.getElementById('tipDisplay');
const totalDisplay = document.getElementById('totalDisplay');

const button5Percent = document.querySelector('[value="5"]');
const buttonCalculate = document.getElementById('button-calculate');
const buttonReset = document.getElementById('button-reset');

function updateDisplay(tipAmount, total) {
   tipDisplay.textContent = '$' + tipAmount;
   totalDisplay.textContent = '$' + total;
}

function resetDisplay() {
   tipDisplay.textContent = 0;
   totalDisplay.textContent = 0;
   billInput.value = '';
   peopleInput.value = '';
   tipInput.value = '';

   buttons.forEach(button => {
      button.classList.remove('tip__button--active');
   });

   button5Percent.classList.add('tip__button--active');
}

function calculateTipPerPerson(data) {
   return ((data.bill * data.percent) / 100 / data.person).toFixed(2);
}

function calculateTotalPerPerson(data) {
   return ((data.bill + (data.bill * data.percent) / 100) / data.person).toFixed(2);
}

let currentTipElement = button5Percent;

buttonCalculate.addEventListener('click', e => {
   e.preventDefault();

   if (billInput.value === '' || peopleInput.value === '') return;
   if (billInput.value === '0' || peopleInput.value === '0') {
      field.setCustomValidity("Can't be zero");
      return;
   }

   const input = {
      bill: parseFloat(billInput.value),
      percent: parseFloat(currentTipElement.value),
      person: parseFloat(peopleInput.value),
   };
   console.log(input);

   const tipPerPerson = calculateTipPerPerson(input);
   const totalPerPerson = calculateTotalPerPerson(input);

   updateDisplay(tipPerPerson, totalPerPerson);
});

buttonReset.addEventListener('click', e => {
   e.preventDefault();

   resetDisplay();
});

tipContainer.addEventListener('click', e => {
   if (e.target.matches('button') || e.target.matches('input')) {
      const clickedButton = e.target;

      buttons.forEach(button => {
         button.classList.remove('tip__button--active');
      });

      currentTipElement = clickedButton;
      clickedButton.classList.add('tip__button--active');
   }
});

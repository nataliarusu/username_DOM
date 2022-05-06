const form = document.getElementById('codename');
const userInput = document.getElementById('str-length');
const helperInfo = document.querySelector('.helper--info');
const lowerCaseEl = document.getElementById('lower');
const upperCaseEl = document.getElementById('upper');
const lengthEl = document.getElementById('length');
const numbEl = document.getElementById('numb');
const checkboxList = document.querySelectorAll('#rules input');
checkboxList.forEach((el) => (el.disabled = true));

const checkLength = (str) => {
  const inputLengh = str.length;
  if (inputLengh > 5) {
    lengthEl.setAttribute('checked', 'true');
    return true;
  } else {
    lengthEl.closest('label').classList.add('error');
    return false;
  }
};

const checkUpperLowerCase = (str) => {
  const regexLowerCase = /[a-z]/;
  const regexUpperCase = /[A-Z]/;
  const resultLC = regexLowerCase.test(str);
  const resultUC = regexUpperCase.test(str);

  if (resultLC) {
    lowerCaseEl.setAttribute('checked', 'true');
  } else {
    lowerCaseEl.closest('label').classList.add('error');
  }
  if (resultUC) {
    upperCaseEl.setAttribute('checked', 'true');
  } else {
    upperCaseEl.closest('label').classList.add('error');
  }

  return resultLC && resultUC;
};

const checkNumbers = (str) => {
  const regexNumb = /\d/g; //  /\d{2}/ at least two numbers but numbers should be in sequence
  const result = str.match(regexNumb); //going with match() because user can put numb not in sequence

  if (result) {
    //if not null
    const isMoreThanTwo = result.length >= 2;
    if (isMoreThanTwo) {
      numbEl.setAttribute('checked', 'true');
    } else {
      numbEl.closest('label').classList.add('error');
    }
    return isMoreThanTwo;
  } else {
    //if null
    numbEl.closest('label').classList.add('error');
    return false;
  }
};

const validateInput = (value) => {
  const checkedLU = checkUpperLowerCase(value);
  const checkedNumb = checkNumbers(value);
  const checkedLength = checkLength(value);
  return checkedLU && checkedNumb && checkedLength;
};

const submitHandler = (ev) => {
  ev.preventDefault();
  const validatedResult = validateInput(userInput.value);

  if (validatedResult) {
    helperInfo.classList.remove('inVisible');
    helperInfo.innerHTML = `${userInput.value} is a valid user name!`;
    userInput.value = '';
  }
};

const removeAttrsOnFocus = (el) => {
  el.closest('label').classList.remove('error');
  el.removeAttribute('checked');
};

const inputFocusHandler = () => {
  removeAttrsOnFocus(lowerCaseEl);
  removeAttrsOnFocus(upperCaseEl);
  removeAttrsOnFocus(lengthEl);
  removeAttrsOnFocus(numbEl);
  helperInfo.classList.add('inVisible');
};

form.addEventListener('submit', submitHandler);
userInput.addEventListener('focus', inputFocusHandler);

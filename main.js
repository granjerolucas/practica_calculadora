const OPERATORS = {
  SUM: "+",
  SUBTRACT: "-",
  MULTIPLY: "*",
  DIVIDE: "÷",
  RESULT: "=",
  NONE: "",
};
function initValues() {
  return {
    currentInput: 0,
    // previousInput: 0,
    currentResult: 0,
    previousValue: 0,
    inputPoint: false,

    currentOperator: OPERATORS.NONE,
  };
}
let __state = initValues();
const txtPreviousSendL = document.querySelector("#previous-send-left");
const txtPreviousSendR = document.querySelector("#previous-send-right");
const txtPreviousResult = document.querySelector("#previous-result");
const txtPreviousSymbol = document.querySelector("#previous-symbol");

function resetValues() {
  __state = initValues();
}
const txtValues = document.querySelector("#input-values");

makeEvent(".container-buttons .btn-function", "click", eventFunctions);
makeEvent(".container-buttons .btn-numbers", "click", eventNumbers);
makeEvent(".container-buttons .btn-options", "click", eventOptions);

function makeEvent(selector, event, callback) {
  let inputValues = document.querySelectorAll(selector);

  for (let i = 0; i < inputValues.length; i++) {
    inputValues[i].addEventListener(event, callback);
  }
}
let operations = {
  calculeSum(a, b) {
    return a + b;
  },
  calculeRes(a, b) {
    return a - b;
  },
  calculeMultiply(a, b) {
    return a * b;
  },
  calculeDivide(a, b) {
    return a / b;
  },
};
let actions = {
  delete() {
    if (__state.currentInput === 0) {
      return;
    } else {
      if (__state.currentOperator !== OPERATORS.NONE) {
        __state.currentOperator = OPERATORS.NONE;
        let _temp = __state.currentResult;
        resetValues();
        __state.currentInput = _temp;
        hideAllHelperText();

        showCurrentNumber(__state.currentInput);
      } else {
        if (__state.currentInput.toString().length > 1) {
          let _temp = __state.currentInput.toString().slice(0, -1);

          if (__state.inputPoint) {
            __state.inputPoint = false;
            showCurrentNumber(`${__state.currentInput}`);

            return;
          }

          if (_temp[_temp.length - 1] === ".") {
            __state.inputPoint = true;
          }

          __state.currentInput = parseFloat(_temp);
          showCurrentNumber(_temp);
        } else {
          if (__state.inputPoint) {
            __state.inputPoint = false;
            showCurrentNumber(`${__state.currentInput}`);
          } else {
            __state.currentInput = 0;

            showCurrentNumber(0);
          }
        }
      }
    }
  },

  result(showValues = false) {
    let res;
    switch (__state.currentOperator) {
      case OPERATORS.SUM:
        __state.previousValue = +__state.currentResult;
        res = operations.calculeSum(
          +__state.currentResult,
          +__state.currentInput
        );

        break;
      case OPERATORS.SUBTRACT:
        __state.previousValue = +__state.currentResult;
        res = operations.calculeRes(
          +__state.currentResult,
          +__state.currentInput
        );
        break;
      case OPERATORS.MULTIPLY:
        __state.previousValue = +__state.currentResult;
        res = operations.calculeMultiply(
          +__state.currentResult,
          +__state.currentInput
        );
        break;
      case OPERATORS.DIVIDE:
        __state.previousValue = +__state.currentResult;
        res = operations.calculeDivide(
          +__state.currentResult,
          +__state.currentInput
        );
        break;
    }
    if (showValues) {
      txtPreviousSendL.textContent = __state.previousValue;
      txtPreviousSymbol.textContent = __state.currentOperator;
      txtPreviousSendR.textContent = __state.currentInput;
    }
    __state.currentResult = res;

    showCurrentNumber(__state.currentResult);
  },
};
function eventNumbers(e) {
  makeNumber(e.currentTarget.value);
}
function eventOptions(e) {
  switch (e.currentTarget.value) {
    case "reset":
      hideAllHelperText();

      resetValues();
      showCurrentNumber(0);
      // }
      break;
    case "delete":
      actions.delete();
      break;
  }
}
function hideAllHelperText() {
  txtPreviousSendL.classList.add("d-none");
  txtPreviousSymbol.classList.add("d-none");
  txtPreviousSendR.classList.add("d-none");
  txtPreviousResult.classList.add("d-none");
}
function eventFunctions(e) {
  if (__state.currentOperator === OPERATORS.NONE) {
    __state.currentResult = +__state.currentInput;
  } else if (__state.currentOperator !== OPERATORS.RESULT) {
    actions.result(false);
  }
  if (txtPreviousSymbol.classList.contains("d-none")) {
    txtPreviousSymbol.classList.remove("d-none");
  }
  if (txtPreviousSendL.classList.contains("d-none")) {
    txtPreviousSendL.classList.remove("d-none");
  }
  txtPreviousSendR.classList.add("d-none");

  switch (e.currentTarget.value) {
    case "divide":
      __state.currentOperator = OPERATORS.DIVIDE;

      break;
    case "multiply":
      __state.currentOperator = OPERATORS.MULTIPLY;
      break;
    case "resta":
      __state.currentOperator = OPERATORS.SUBTRACT;
      break;
    case "sum":
      __state.currentOperator = OPERATORS.SUM;
      // actions.result(false);

      break;
    case "result":
      actions.result(true);
      __state.currentOperator = OPERATORS.RESULT;

      if (txtPreviousSendR.classList.contains("d-none")) {
        txtPreviousSendR.classList.remove("d-none");
      }
      if (txtPreviousResult.classList.contains("d-none")) {
        txtPreviousResult.classList.remove("d-none");
      }
      break;
    default:
  }
  if (e.currentTarget.value !== "result") {
    __state.previousValue = +__state.currentResult;
    __state.currentInput = 0;
    if (!txtPreviousResult.classList.contains("d-none")) {
      txtPreviousResult.classList.add("d-none");
    }
    txtPreviousSendL.textContent = __state.currentResult;
    txtPreviousSymbol.textContent = __state.currentOperator;
  }
}

function validaNumer(str) {
  const num = parseFloat(str);
  return !isNaN(num) && isFinite(num);
}

function findPoint(str) {
  return str.indexOf(".") === -1 ? false : true;
}
function check() {
  console.log(__state);
}
function makeNumber(value) {
  // console.log(value);
  // console.log("start with", __state.currentInput);
  let newValue = `${__state.currentInput}${value}`;
  if (__state.inputPoint) {
    newValue = `${__state.currentInput}.${value}`;
    __state.inputPoint = false;
  }

  if (value === "." && findPoint(__state.currentInput.toString())) {
    console.log("ya tiene un punto no avanzaaa");
    return;
  }
  if (validaNumer(newValue) && value !== ".") {
    __state.currentInput = +newValue;
    newValue = `${__state.currentInput}`;
  } else {
    if (value === ".") {
      __state.inputPoint = true;
      // return;
    }
  }

  showCurrentNumber(newValue);
}

function showCurrentNumber(value) {
  // inputValues.textContent = __state.inputPoint ? `${number}.` : number;
  txtValues.textContent = value;
}

function initiallize() {
  txtValues.textContent = __state.currentInput;
}

initiallize();

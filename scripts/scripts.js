class Algebra {
  // returns sum of x and y
  static add(x, y) {
    return x + y;
  }

  // returns difference of x and y
  static subtract(x, y) {
    return x - y;
  }

  // returns product of x and y
  static multiply(x, y) {
    return x * y;
  }

  // returns quotient of x and y
  static divide(x, y) {
    return x / y;
  }

  // calls func on x and y
  static operate(func, x, y) {
    return func(x, y);
  }
}

class Screen {
  static updateDisplay(calc) {
    const mainDisplay = document.querySelector('.main');
    const subDisplay = document.querySelector('.sub');

    const mainValue = calc.getOp().concat(' ', calc.getMainValue());
    const subValue = calc.getSubValue();
    
    mainDisplay.value = mainValue;
    subDisplay.value = subValue;
  }

  static initialize(calc) {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
      button.addEventListener('click', calc);
    })
  }
}

class Calculator {
  #x = null;
  #y = null;
  #op = null;
  #cursor = '×';

  #getX() {
    return this.#x || "";
  }

  #getY() {
    return this.#y || "";
  }

  getOp() {
    return this.#op || "";
  }

  getMainValue() {
    if (this.#cursor === '×') {
      return this.#getX();
    } else {
      return this.#getY();
    }
  }

  getSubValue() {
    if (this.#cursor === 'y') {
      return this.#getX();
    } else {
      return '';
    }
  }

  #isNumericValid(value) {
    const isNumber = !isNaN(value);
    const isDecimalOk = !this.getMainValue().includes('.');
    const isMoreOk = this.getMainValue().length < 16;
    
    return (isNumber || isDecimalOk) && isMoreOk;
  }

  #numericHandler(value) {
    if (this.#isNumericValid(value)) {
      const currentValue = this.getMainValue();
      const newValue = currentValue === '0' ? value : currentValue + value;

      if (this.#cursor === '×') {
        this.#x = newValue;
      } else {
        this.#y = newValue;
      }
    }

    Screen.updateDisplay(this);
  }

  #deleteHandler() {
    const mainValue = this.getMainValue();
    const valueLength = mainValue.length; 
    const newValue = mainValue.substring(0, valueLength - 1);

    if(this.#cursor === '×') {
      this.#x = newValue;
    } else {
      this.#y = newValue;
    }

    Screen.updateDisplay(this);
  }

  #clearHandler() {
    this.#x = null;
    this.#y = null;
    this.#op = null;
    this.#cursor = '×';

    Screen.updateDisplay(this);
  }

  #operatorHandler(value) {
    const isAllowedX = this.#cursor === '×' && this.#getX() !== '';
    const isAllowedY = this.#cursor === 'y' && this.#getY() === '';

    if(isAllowedX || isAllowedY) {
      this.#cursor = 'y';
      this.#op = value;

      Screen.updateDisplay(this);
    }
  }

  handleEvent(e) {
    const value = e.target.value;

    if(!isNaN(value) || value === '.') {
      this.#numericHandler(value);
    } else if (value === 'clr') {
      this.#clearHandler();
    } else if (value === 'del') {
      this.#deleteHandler();
    } else if (['+', '-', '×', '/'].includes(value)) {
      this.#operatorHandler(value);
    }
  }
}

function main() {
  Screen.initialize(new Calculator());
}
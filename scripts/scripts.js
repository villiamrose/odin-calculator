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
    return y === 0 ? '' : (x / y);
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
    const body = document.querySelector('body');

    buttons.forEach((button) => {
      button.addEventListener('click', calc);
    });

    body.addEventListener('keydown', calc);
  }
}

class Calculator {
  #x = null;
  #y = null;
  #op = null;
  #cursor = 'x';

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
    if (this.#cursor === 'x') {
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

  #setMainValue(value) {
    if (this.#cursor === 'x') {
      this.#x = value;
    } else {
      this.#y = value;
    }
  }

  #isNumericValid(value) {
    const isNumber = !isNaN(value);
    const isDecimalOk = !this.getMainValue().includes('.');
    const isMoreOk = this.getMainValue().length < 15;
    
    return (isNumber || isDecimalOk) && isMoreOk;
  }

  #numericHandler(value) {
    if (this.#isNumericValid(value)) {
      const currentValue = this.getMainValue();
      const newValue = currentValue === '0' ? value : currentValue + value;

      if (this.#cursor === 'x') {
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
    const index = (valueLength === 2 && mainValue < 0) ? 2 : 1;
    const newValue = mainValue.substring(0, valueLength - index);

    if(this.#cursor === 'x') {
      this.#x = newValue;
    } else if(mainValue === '') {
      this.#cursor = 'x';
      this.#op = null;
    } else {
      this.#y = newValue;
    }

    Screen.updateDisplay(this);
  }

  #clearHandler() {
    this.#x = null;
    this.#y = null;
    this.#op = null;
    this.#cursor = 'x';

    Screen.updateDisplay(this);
  }

  #operatorHandler(value) {
    const isCursorX = this.#cursor === 'x';
    const isCursorY = this.#cursor === 'y';
    const isAllowedX = isCursorX && this.#getX() !== '';
    const isAllowedY = isCursorY && this.#getY() === '';

    if(isAllowedX || isAllowedY) {
      this.#cursor = 'y';
      this.#op = value;
    } else if (isCursorY) {
      this.#equalHandler(value);
    }

    Screen.updateDisplay(this);
  }

  #getOperator() {
    switch(this.#op) {
      case '+':
        return Algebra.add;
      case '-':
        return Algebra.subtract;
      case '??':
        return Algebra.multiply;
      case '/':
        return Algebra.divide;
    }
  }

  #equalHandler(value) {
    const x = this.#getX();
    const y = this.#getY();
    const isValuesValid = x !== '' && y !== '';

    if(isValuesValid) {
      const operator = this.#getOperator();
      const result = Algebra.operate(operator, parseFloat(x), parseFloat(y));
      
      this.#x = result.toString();
      this.#y = null;
      
      if(value === 'eql') {
        this.#cursor = 'x';
        this.#op = null;
      } else {
        this.#op = value;
      }
    }

    Screen.updateDisplay(this);
  }

  #signHandler() {
    if(this.getMainValue() !== '') {
      const value = parseFloat(this.getMainValue());

      if(value > 0) {
        this.#setMainValue(`${-value}`);
      } else {
        this.#setMainValue(`${Math.abs(value)}`);
      }

      Screen.updateDisplay(this);
    }
  }

  handleEvent(e) {
    const type = e.type;
    
    if(type === 'click') {
      const value = e.target.value;

      if(!isNaN(value) || value === '.') {
        this.#numericHandler(value);
      } else if (value === 'clr') {
        this.#clearHandler();
      } else if (value === 'del') {
        this.#deleteHandler();
      } else if (['+', '-', '??', '/'].includes(value)) {
        this.#operatorHandler(value);
      } else if(value === 'eql') {
        this.#equalHandler(value);
      } else if (value === 'sign') {
        this.#signHandler();
      }
    } else if(type === 'keydown') {
      const key = e.key;

      console.log(e);
      
      if(!isNaN(key) || key === '.') {
        this.#numericHandler(key);
      } else if (key === 'Backspace') {
        this.#deleteHandler();
      } else if (key === 'Escape') {
        this.#clearHandler();
      } else if (key === 'Enter') {
        this.#equalHandler('eql');
      }
    }
  }
}

function main() {
  Screen.initialize(new Calculator());
}
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
  static #textDisplay = '';

  static #updateTextDisplay() {
    const textDisplay = document.querySelector('.textDisplay');

    textDisplay.value = this.#textDisplay;
  }

  static #numericHandler(value) {
    this.#textDisplay += value;

    this.#updateTextDisplay();
  }

  static #clearHandler() {
    this.#textDisplay = '';
    
    this.#updateTextDisplay();
  }

  static #deleteHandler() {
    const textDisplay = this.#textDisplay;
    const textDisplayLength = textDisplay.length;
    
    this.#textDisplay = textDisplay.substring(0, textDisplayLength - 1);

    this.#updateTextDisplay();
  }

  static clickHandler(e) {
    const value = e.target.value;
    
    if(!isNaN(value)) {
      this.#numericHandler(value);
    } else if (value === 'clr') {
      this.#clearHandler();
    } else if (value === 'del') {
      this.#deleteHandler();
    }
  }
  

  static initialize() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => Screen.clickHandler(e));
    })
  }
}

function main() {
  Screen.initialize();
}
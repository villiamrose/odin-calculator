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

  static updateTextDisplay(value) {
    const textDisplay = document.querySelector('.textDisplay');
    
    this.#textDisplay = value;

    textDisplay.value = this.#textDisplay;
  }

  static initialize() {
    const buttons = document.querySelectorAll('button');

    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        Screen.updateTextDisplay(e.target.value)
      });
    })
  }
}

function main() {
  Screen.initialize();
}
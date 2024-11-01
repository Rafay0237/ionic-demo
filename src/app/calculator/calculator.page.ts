import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: 'calculator.page.html',
  styleUrls: ['calculator.page.scss'],
})
export class CalculatorPage {
  display: string = '';  

  // Appends a number to the display
  appendNumber(number: string) {
    this.display += number;
  }

  // Appends an operator (+, -, *, /) to the display
  appendOperator(operator: string) {
    if (this.display && !this.isOperator(this.display[this.display.length - 1])) {
      this.display += operator;
    }
  }

  // Appends a decimal point
  appendDot() {
    // Prevent adding multiple decimal points in a single number
    const parts = this.display.split(/[\+\-\*\/]/);
    const currentNumber = parts[parts.length - 1];
    if (!currentNumber.includes('.')) {
      this.display += '.';
    }
  }

  // Clears the display
  clear() {
    this.display = '';
  }

  // Deletes the last character from the display
  deleteLast() {
    this.display = this.display.slice(0, -1);
  }

  // Performs the calculation and updates the display with the result
  calculate() {
    try {
      this.display = eval(this.display).toString();  // Use eval cautiously
    } catch (e) {
      this.display = 'Error';  // If there's a problem with the calculation
    }
  }

  // Checks if the character is an operator
  private isOperator(char: string): boolean {
    return ['+', '-', '*', '/'].includes(char);
  }
}

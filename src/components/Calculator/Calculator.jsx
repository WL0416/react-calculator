import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {

    state = {
        displayValue: '0',
        numbers: ['9','8','7','6','5','4','3','2','1','.','0','AC'],
        operators: ['/','X','-','+'],
        selectedOperator: '',
        storedValue: '',
    }

    callOperator = () => {
        console.log('call operation');
    }

    setOperator = () => {
        console.log('set operation');
    }

    updateDisplay = () => {
        console.log('update display');
    }

    render = () => {

        const { displayValue, numbers, operators } = this.state;

        return (
            <div className="calculator-container">
                <Display displayValue={displayValue} />
                <Keypad 
                    callOperator={this.callOperator}
                    numbers={numbers}
                    operators={operators}
                    setOperator={this.setOperator}
                    updateDisplay={this.updateDisplay}
                />
            </div>
        );
    }
}

export default Calculator;
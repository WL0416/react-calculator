import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {

    state = {
        displayValue: '0',
        numbers: ['7','8','9','4','5','6','1','2','3','.','0','ac'],
        operators: ['/','X','-','+'],
        selectedOperator: '',
        storedValue: '',
    }

    callOperator = () => {
        console.log('call operation');

        let {displayValue, selectedOperator, storedValue} = this.state;

        const updateStoredValue = displayValue;

        displayValue = parseInt(displayValue ,10);
        storedValue = parseInt(storedValue, 10);

        switch (selectedOperator) {
            case '+':
                displayValue = storedValue + displayValue;
                break;
            case '-':
                displayValue = storedValue - displayValue;
                break;
            case 'X':
                displayValue = storedValue * displayValue;
                break;
            case '/':
                displayValue = storedValue / displayValue;
                break;
            default:
                displayValue = '0';
        }

        displayValue = displayValue.toString();

        selectedOperator = '';

        if (displayValue === 'NaN' || displayValue === 'Infinity')
            displayValue = '0';

        this.setState({displayValue, selectedOperator , storedValue: updateStoredValue});
    }

    setOperator = value => {
        console.log('set operation');

        let {displayValue, selectedOperator, storedValue} = this.state;

        if(selectedOperator === '') {
            storedValue = displayValue;
            displayValue = '0';
            selectedOperator = value;
        } else {
            selectedOperator = value;
        }

        this.setState({displayValue, selectedOperator, storedValue});
    }

    updateDisplay = value => {
        console.log('update display');
        
        let {displayValue} = this.state;

        if(value === '.' && displayValue.includes('.'))
            value = '';
        
        if (value === 'ac') {
            displayValue = '0';
        } else {
            displayValue === '0' ? displayValue = value : displayValue += value;
        }
        
        this.setState({displayValue});
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
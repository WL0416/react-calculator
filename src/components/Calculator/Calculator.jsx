import React, { Component } from 'react';
import './Calculator.css';
import Display from '../Display/Display';
import Keypad from '../Keypad/Keypad';

class Calculator extends Component {

    state = {
        displayValue: '0',
        numbers: ['7','8','9','4','5','6','1','2','3','.','0','ac'],
        operators: ['/','x','-','+'],
        extraOperators: ['^','sr'],
        selectedOperator: '',
        storedValue: '',
    }

    callOperator = () => {
        // console.log('call operation');

        let {displayValue, selectedOperator, storedValue} = this.state;

        const updateStoredValue = displayValue;
        
        if(displayValue.includes('.'))
            displayValue = parseFloat(displayValue);
        else
            displayValue = parseInt(displayValue ,10);

        if(storedValue.includes('.'))
            storedValue = parseFloat(storedValue);
        else
            storedValue = parseInt(storedValue, 10);

        switch (selectedOperator) {
            case '+':
                displayValue = storedValue + displayValue;
                break;
            case '-':
                displayValue = storedValue - displayValue;
                break;
            case 'x':
                displayValue = storedValue * displayValue;
                break;
            case '/':
                displayValue = storedValue / displayValue;
                break;
            case '^':
                displayValue = Math.pow(storedValue, displayValue);
                break;
            case 'sr':
                displayValue = Math.sqrt(storedValue);
                break;
            default:
                displayValue = 0;
        }

        if(!Number.isInteger(displayValue))
            displayValue = displayValue.toFixed(2);

        displayValue = displayValue.toString();

        selectedOperator = '';

        if (displayValue === 'NaN' || displayValue === 'Infinity')
            displayValue = '0';

        this.setState({displayValue, selectedOperator , storedValue: updateStoredValue});
    }

    setOperator = value => {
        // console.log('set operation');

        let {displayValue, selectedOperator, storedValue} = this.state;

        // console.log(value);

        if(selectedOperator === '') {
            storedValue = displayValue;
            displayValue = value;
            selectedOperator = value;
        } else {
            selectedOperator = value;
            displayValue = selectedOperator;
        }

        this.setState({displayValue, selectedOperator, storedValue});
    }

    updateDisplay = value => {
        // console.log('update display');
        
        let {displayValue} = this.state;

        if(value === '.' && displayValue.includes('.'))
            value = '';
        
        // console.log(displayValue);
        // console.log(value);
        // console.log(this.state.operators.indexOf(displayValue));

        if (value === 'ac') {
            displayValue = '0';
        } else if (this.state.operators.indexOf(displayValue) !== -1 || 
                this.state.extraOperators.indexOf(displayValue) !== -1 ||
                (this.state.selectedOperator === '' && this.state.storedValue)){
            displayValue = value;
        } else {
            displayValue === '0' ? displayValue = value : displayValue += value;
        }
        
        this.setState({displayValue});
    }

    render = () => {

        const { displayValue, numbers, operators, extraOperators } = this.state;

        return (
            <div className="calculator-container">
                <Display displayValue={displayValue} />
                <Keypad 
                    callOperator={this.callOperator}
                    numbers={numbers}
                    operators={operators}
                    extraOperators = {extraOperators}
                    setOperator={this.setOperator}
                    updateDisplay={this.updateDisplay}
                />
            </div>
        );
    }
}

export default Calculator;
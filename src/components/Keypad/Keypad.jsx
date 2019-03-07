import React from 'react';
import propTypes from 'prop-types';
import './Keypad.css';
import Key from '../Key/Key'

const Keypad = ({callOperator,numbers,operators,extraOperators,setOperator,updateDisplay}) => {
    
    const numberKeys = numbers.map(number => 
        (<Key 
            key={number}
            keyAction={updateDisplay}
            keyType='number-key'
            keyValue={number}
        />)
    );

    const operatorKeys = operators.map(operator => (
        <Key 
            key={operator}
            keyAction={setOperator}
            keyType='operator-key'
            keyValue={operator}
        />
    ));

    const extraOperatorKeys = extraOperators.map(extraOperators => (
        <Key 
            key={extraOperators}
            keyAction={setOperator}
            keyType='extra-operator-key'
            keyValue={extraOperators}
        />
    ));

    return (
        <div className='keypad-container'>
            <div className='numbers-container'>
                {numberKeys}
            </div>
            <div className='operators-container'>
                {operatorKeys}
            </div>
            <div className='submit-container'>
                <Key 
                    keyAction={callOperator}
                    keyType='submit-key'
                    keyValue='='
                />
            </div>
            <div className='extraoperators-container'>
                {extraOperatorKeys}
            </div>
        </div>
    );
}

Keypad.propTypes = {
    callOperator: propTypes.func.isRequired,
    numbers: propTypes.array.isRequired,
    operators: propTypes.array.isRequired,
    extraOperators: propTypes.array.isRequired,
    setOperator: propTypes.func.isRequired,
    updateDisplay: propTypes.func.isRequired,
}

export default Keypad;
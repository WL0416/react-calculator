import React from 'react';
import { mount, shallow } from 'enzyme';
import Keypad from './Keypad';

describe('Keypad', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(
            <Keypad 
                callOperator = {jest.fn()}
                numbers = {[]}
                operators = {[]}
                // Wei Li
                extraOperators = {[]}
                //
                setOperator = {jest.fn()}
                updateDisplay = {jest.fn()}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper).toMatchSnapshot()
    });

    it('should render five <div />s', () => {
        expect(wrapper.find('div').length).toEqual(5);
    });

    it('should render the Key component', () => {
        const numbers = ['0', '1'];
        const operators = ['+', '-'];
        const extraOperators = ['^','sr'];
        const submit = 1;
        // Wei Li
        const keyTotal = numbers.length + operators.length + submit + extraOperators.length;
        wrapper.setProps({numbers, operators, extraOperators});
        //
        expect(wrapper.find('Key').length).toEqual(keyTotal);
    });
});

describe('mounted Keypad', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = mount(
        <Keypad
            callOperator={jest.fn()}
            numbers={[]}
            operators={[]}
            // Wei Li
            extraOperators={[]}
            //
            setOperator={jest.fn()}
            updateDisplay={jest.fn()}
        />
        );  
    });
      
    it('should render the values of numbers to the DOM', () => {
        wrapper.setProps({ numbers: ['0', '1', '2'] })
        expect(wrapper.find('.numbers-container').text()).toEqual('012');
    });
      
    it('should render the values of operators to the DOM', () => {
        wrapper.setProps({ operators: ['+', '-', '*', '/'] });
        expect(wrapper.find('.operators-container').text()).toEqual('+-*/');
    });

    // Wei Li
    it('should render the values of extra operators to the Dom', () => {
        wrapper.setProps({ extraOperators: ['^','sr'] });
        expect(wrapper.find('.extraoperators-container').text()).toEqual('^sr');
    });
    // 
});
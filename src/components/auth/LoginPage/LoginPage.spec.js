import React from 'react';
import { shallow } from 'enzyme';

import { LoginPage } from './LoginPage';

describe('LoginPage', () => { // Component with snapshot testing
    const props = {
        loading: false,
        error: null,
        onLogin: jest.fn(),
    };

    const render = () => shallow(<LoginPage {...props} />);

    test('snapshot', () => {
        const wrapper = render();
        expect(wrapper).toMatchSnapshot();
    });

    test('should call an onLogin', () => {
        const event = {
            preventDefault: jest.fn(),
        };
        const wrapper = render();
        const form = wrapper.find('LoginForm');
        form.simulate('submit', event);

        expect(event.preventDefault).toHaveBeenCalled();
        expect(props.onLogin).toHaveBeenCalled();
    });
});

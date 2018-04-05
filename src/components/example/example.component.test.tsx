import * as React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import { mount } from 'enzyme';
import { spy } from 'sinon';

import {
    default as ConnectedExampleComponent,
    ExampleComponent,
} from './example.component';
import { setExample } from '@actions/example.actions';

const createStore = configureStore();

describe(`ExampleComponent`, () => {
    it(`should render the example component`, () => {
        const store = createStore();

        const tree = renderer
            .create(<ExampleComponent {...store} example={'hello'} />)
            .toJSON();

        expect(tree).toMatchSnapshot();
    });

    it(`should not crash if we connect to the store`, () => {
        const store = createStore();
        const connectedExampleComponent = new ConnectedExampleComponent({
            store,
        });
        expect(connectedExampleComponent).toBeDefined();
    });

    it(`should have a default state`, () => {
        const store = createStore();
        const wrapper = mount(
            <ExampleComponent {...store} example={'hello'} />,
        );

        expect(wrapper.state()).toEqual({ input: '' });
    });

    it(`should set the state on change`, () => {
        const store = createStore();
        const wrapper = mount(
            <ExampleComponent {...store} example={'hello'} />,
        );
        const input = wrapper.find('.input');

        expect(wrapper.state().input).toEqual('');

        input.simulate('change', {
            target: { value: 'test' },
        });

        expect(wrapper.state().input).toEqual('test');
    });

    it(`should dispatch actions on send`, () => {
        const store = createStore();
        const dispatch = spy(store, 'dispatch');
        const wrapper = mount(
            <ExampleComponent {...store} example={'hello'} />,
        );
        const button = wrapper.find('.button');

        wrapper.state().input = 'mock';

        button.simulate('click');

        expect(dispatch.callCount).toEqual(1);
        expect(dispatch.calledWith(setExample('mock'))).toEqual(true);
    });
});

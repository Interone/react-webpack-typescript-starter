import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { configureStore, RootStore } from './store';
import { ExampleComponent } from './components';

import 'app.scss';

const store: Store<RootStore> = configureStore();

export class App extends React.Component<{}, {}> {
    public render() {
        return (
            <Provider store={store}>
                <div className="app">
                    <ExampleComponent />
                </div>
            </Provider>
        );
    }
}

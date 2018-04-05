import { Store, createStore, applyMiddleware, Reducer } from 'redux';
import thunk from 'redux-thunk';

import { rootReducer, ExampleState } from './reducers';

export interface RootStore {
    example: ExampleState;
}

export function configureStore(): Store<RootStore> {
    const store: Store<RootStore> = createStore(
        rootReducer,
        applyMiddleware(thunk),
    ) as Store<RootStore>;

    if (module.hot) {
        module.hot.accept('./reducers', async () => {
            const nextRootReducer = (await import('./reducers'))
                .rootReducer as Reducer<RootStore>;
            store.replaceReducer(nextRootReducer);
        });
    }

    return store;
}

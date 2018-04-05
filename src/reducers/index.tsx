import { combineReducers } from 'redux';
import example from './example.reducer';

export { ExampleState } from './example.reducer';

export const rootReducer = combineReducers({
    example,
});

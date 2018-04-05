import { ExampleAction, ExampleActionTypes } from '@actions/example.actions';

export interface ExampleState {
    readonly example: string;
}

const initialState: ExampleState = {
    example: 'hello',
};

export default function reducer(
    state: ExampleState = initialState,
    action: ExampleAction,
) {
    switch (action.type) {
        case ExampleActionTypes.IS_EXAMPLE: {
            return {
                ...state,
                ...action.payload,
            };
        }
        default: {
            return state;
        }
    }
}

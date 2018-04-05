import { ExampleState } from '@reducers/example.reducer';

export enum ExampleActionTypes {
    IS_EXAMPLE = 'EXAMPLE_IS_EXAMPLE',
}

export interface ExampleAction {
    readonly type: ExampleActionTypes;
    readonly payload: Partial<ExampleState>;
}

export function setExample(example: string): ExampleAction {
    return {
        type: ExampleActionTypes.IS_EXAMPLE,
        payload: { example },
    };
}

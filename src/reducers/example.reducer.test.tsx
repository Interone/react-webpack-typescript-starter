import { ExampleActionTypes } from '@actions/example.actions';
import ExampleReducer from './example.reducer';

describe(`ExampleReducer`, () => {
    it(`should have a default state`, () => {
        const state = ExampleReducer(undefined, {} as any);

        expect(state).toEqual({
            example: 'hello',
        });
    });

    it(`should set an initial state`, () => {
        const state = ExampleReducer(undefined, {
            type: ExampleActionTypes.IS_EXAMPLE,
            payload: {
                example: 'foo',
            },
        } as any);

        expect(state).toEqual({
            example: 'foo',
        });
    });

    it(`should update an existing state`, () => {
        const state = ExampleReducer(
            {
                example: 'bar',
            },
            {
                type: ExampleActionTypes.IS_EXAMPLE,
                payload: {
                    example: 'world',
                },
            } as any,
        );

        expect(state).toEqual({
            example: 'world',
        });
    });
});

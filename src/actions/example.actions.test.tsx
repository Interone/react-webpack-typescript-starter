import { setExample } from './example.actions';

describe(`ExampleActions`, () => {
    it(`should return the listening action with true`, () => {
        const action = setExample('foo');

        expect(action).toEqual({
            type: 'EXAMPLE_IS_EXAMPLE',
            payload: {
                example: 'foo',
            },
        });
    });
});

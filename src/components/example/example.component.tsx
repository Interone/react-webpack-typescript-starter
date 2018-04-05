import * as React from 'react';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { RootStore } from '@src/store';

import { setExample } from '@actions/example.actions';
import { ExampleState } from '@reducers/example.reducer';

export interface ConnectedExampleState extends ExampleState {
    readonly dispatch: Dispatch<() => void>;
}

export class ExampleComponent extends React.Component<
    ConnectedExampleState,
    {}
> {
    public state: { input: string } = { input: '' };

    constructor(props: any) {
        super(props);
        this.send = this.send.bind(this);
        this.inputChange = this.inputChange.bind(this);
    }

    public render() {
        const { example } = this.props;

        return (
            <div>
                <h1>{example}</h1>

                <form onSubmit={this.send}>
                    <input
                        className="input"
                        type="text"
                        value={this.state.input}
                        onChange={this.inputChange}
                    />
                    <input
                        className="button"
                        type="button"
                        onClick={this.send}
                        value="click me"
                    />
                </form>
            </div>
        );
    }

    private send(event: React.FormEvent<HTMLInputElement | HTMLFormElement>) {
        event.preventDefault();
        this.props.dispatch(setExample(this.state.input));
    }

    private inputChange(event: React.FormEvent<HTMLInputElement>) {
        const { value } = event.target as HTMLInputElement;
        this.setState({ input: value });
    }
}

export default connect((store: RootStore): ExampleState => ({
    ...store.example,
}))(ExampleComponent);

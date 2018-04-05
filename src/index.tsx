import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactHotLoader from 'react-hot-loader';
import * as OfflinePluginRuntime from 'offline-plugin/runtime';

import { App } from './app';

const renderRoot = (app: JSX.Element) => {
    ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
    OfflinePluginRuntime.install({
        onUpdateReady: () => OfflinePluginRuntime.applyUpdate(),
        onUpdated: () => window.location.reload(),
    });

    renderRoot(<App />);
} else {
    const HotContainer = ReactHotLoader.AppContainer;
    renderRoot(
        <HotContainer>
            <App />
        </HotContainer>,
    );

    if (module.hot) {
        module.hot.accept('./app', async () => {
            const NextApp = (await import('./app')).App;
            renderRoot(
                <HotContainer>
                    <NextApp />
                </HotContainer>,
            );
        });
    }
}

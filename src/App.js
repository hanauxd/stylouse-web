import React from 'react';

import Root from './modules/Root';
import store from './modules/store';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Root />
    </Provider>
  );
}

export default App;

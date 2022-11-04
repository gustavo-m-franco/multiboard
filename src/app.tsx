import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './modules/navigation';
import { store } from './get-store';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;

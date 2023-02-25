import React from 'react';
import { Provider } from 'react-redux';

import Navigation from './screens/navigation/navigation';
import { store } from './get-store';
import { StatusBar } from 'react-native';

const App: React.FC = () => (
  <Provider store={store}>
    <StatusBar
      animated={true}
      backgroundColor="#61dafb"
      barStyle="light-content"
      showHideTransition="fade"
      translucent={true}
    />
    <Navigation />
  </Provider>
);

export default App;

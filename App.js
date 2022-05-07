// import { StatusBar } from 'expo-status-bar';
import { LogBox, StatusBar } from 'react-native';
import Router from './src/Router';
import { Provider } from 'jotai';
import { QueryClient } from 'react-query';
import { QueryClientProvider } from 'react-query';

import 'react-native-gesture-handler';

StatusBar.setBarStyle('light-content', true);
const queryClient = new QueryClient()
export default function App() {
  LogBox.ignoreAllLogs();
  return (
    <Provider >
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>

  );


}


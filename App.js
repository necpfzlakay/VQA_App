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
  // setTimeout(() => {
  //   return
  //   (
  //     <View style={{ width: 100, height: 200 }}>

  //       <Svg />
  //     </View>
  //   )
  // }, 2000);
  return (
    <Provider >
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </Provider>

  );


}


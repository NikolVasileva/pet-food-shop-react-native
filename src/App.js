import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import RootNavigator from './navigator/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './contexts/auth/AuthProvider';
import "dotenv/config"

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" style="dark" />

        <AuthProvider>
          <RootNavigator />
        </AuthProvider>

      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import RootNavigator from './navigator/RootNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AuthProvider from './contexts/auth/AuthProvider';
import Toast from 'react-native-toast-message';
import CartProvider from './contexts/cart/CartProvider';
import FavouriteProvider, { FavProvider } from './contexts/favourite/FavProvider';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar translucent backgroundColor="transparent" style="dark" />

        <AuthProvider>
          <FavProvider>
            <CartProvider>
              <RootNavigator />
            </CartProvider>
            </FavProvider>
        </AuthProvider>

        <Toast />
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

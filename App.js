import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NativeWindStyleSheet } from "nativewind";
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './screens/AppNavigator';
 
NativeWindStyleSheet.setOutput({
  default: "native",
});

export default function App() {
  return (
    <SafeAreaView className='flex-1'>
       <AppNavigator />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

 
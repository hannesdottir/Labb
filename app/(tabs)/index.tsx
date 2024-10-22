import {StyleSheet, Text, View, TextInput, Button} from 'react-native'
import { useEffect } from 'react';
import { insertName } from '../../components/database/db'



export default function HomeScreen() {
  useEffect(() => {
    insertName('Mary had a little lamb');
  }, []);

  return (
    <View style={styles.outerContainer}>
      <Text>Hello</Text>  
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1, // Takes up the full available height
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  }
});

import NameList from '@/components/NameList';
import {StyleSheet, Text, View, TextInput, Button} from 'react-native'




export default function HomeScreen() {

  return (
    <View style={styles.outerContainer}>
      <NameList/>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    marginTop: 150,
    flex: 1, // Takes up the full available height
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  }
});

import {StyleSheet, Text, View, TextInput, Button} from 'react-native'
import { insertIntoDatabase } from "../components/database/db"
import { useState, useEffect } from 'react';

export function NameList() {
    console.log('Entering NameList');
    const [name, setName] = useState('')


    const handleInsert = async () => {
        try {
            await insertIntoDatabase(name);
            setName(''); // Clear the input field after successful insertion
            alert('Name inserted successfully!');
          } catch (error) {
            console.error('Error inserting name:', error);
            alert('Error inserting name. Please try again.');
          }
    }

  return (
    <View style={styles.outerContainer}>
      <TextInput
        placeholder="Skriv namn"
        value={name}
        onChangeText={setName}
      />
      <Button title="Lägg till namn" onPress={handleInsert}/>
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
export default NameList;
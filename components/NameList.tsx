import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native'
import { insertIntoDatabase, FetchDataFromDatabase, deleteFromDatabase, updateName } from "../components/database/db"
import { useState, useEffect } from 'react';

interface Row {
  id: number,
  value: string;
  name?: string;
  isEditing?: boolean; // Add an optional property to track editing state
}


export function NameList() {
    const [name, setName] = useState('')
    const [data, setData] = useState<Row[]>([]);
    
  

    const handleInsert = async () => {
      console.log('adding name')
        try {
            await insertIntoDatabase(name);
            setName(''); // Clear the input field after successful insertion
           // alert('Name inserted successfully!');

            // Fetch data again after insertion
            const allRows = await FetchDataFromDatabase();
            setData(allRows);
            console.log('Hela listan av namn', allRows)
          } catch (error) {
            console.error('Error inserting name:', error);
            alert('Error inserting name. Please try again.');
          }
          
    }

    const handleDelete = async (id: number) => {
      console.log(id)
      try {
        await deleteFromDatabase(id);
        const allRows = await FetchDataFromDatabase();
        setData(allRows);
        //alert('Name deleted successfully!');
      } catch (error) {
        console.error('Error deleting name:', error);
        alert('Error deleting name. Please try again.');
      }
    };

    const handleNameUpdate = (id: number, name: string) => {
      setData(
        data.map((person) =>
          person.id === id ? { ...person, name: name } : person
        )
      );
    };
  

    useEffect(() => {
      const fetchData = async () => {
        try {
          const allRows = await FetchDataFromDatabase();
          setData(allRows);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData();
    }, []);
   
  return (
    <View style={styles.outerContainer}>
    <TextInput
      placeholder="Skriv namn"
      value={name}
      onChangeText={setName}
    />
    <Button title="Lägg till namn" onPress={handleInsert} />
    

    {data.length > 0 && (
      <ScrollView>
        <Text>Namnlista:</Text>
        {data.slice().reverse().map((row) => (
          <View key={row.id} style={styles.listItem}>
            <View>
              <TextInput>{`ID: ${row.id}, Namn:${row.value}`}</TextInput>
            </View>
           <View>
            <Button title="Uppdatera" onPress={() => handleNameUpdate(row.id, name)} />
            <Button title="Ta bort" onPress={() => handleDelete(row.id)} />
            </View>
          </View>
        ))}
      </ScrollView>
    )}
  </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    justifyContent: 'center', // Centers the content vertically
    alignItems: 'center', // Centers the content horizontally
  },
  listItem: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 10, 
  },
  
});
export default NameList;
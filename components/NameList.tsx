import {StyleSheet, Text, View, TextInput, Button, ScrollView} from 'react-native'
import { insertIntoDatabase, FetchDataFromDatabase, deleteFromDatabase, updateName } from "../components/database/db"
import { useState, useEffect } from 'react';

interface Row {
  id: number;
  value: string;
  intValue: number;
}

export function NameList() {
    const [name, setName] = useState('')
    const [data, setData] = useState<Row[]>([]);
    //const [editingId, setEditingId] = useState(null); // State to track the ID of the name being edited

    const handleInsert = async () => {
      console.log('adding name')
        try {
            await insertIntoDatabase(name);
            setName(''); // Clear the input field after successful insertion
            alert('Name inserted successfully!');

            // Fetch data again after insertion
            const allRows = await FetchDataFromDatabase();
            setData(allRows);
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
        alert('Name deleted successfully!');
      } catch (error) {
        console.error('Error deleting name:', error);
        alert('Error deleting name. Please try again.');
      }
    };

    /*const handleUpdate = async (id: number, newName: string) => {
      try {
        await updateName(id, newName);
  
        // Update the local state
        const updatedData = data.map((row) => {
          if (row.id === id) {
            return { ...row, value: newName };
          }
          return row;
        });
        setData(updatedData);
  
        alert('Name updated successfully!');
      } catch (error) {
        console.error('Error updating name:', error);
        alert('Error updating name. Please try again.');
      }
    };
*/



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
      <Button title="Lägg till namn" onPress={handleInsert}/>

      {data.length > 0 && (
        <ScrollView>
          <Text>Namnlista:</Text>
          {data.slice().reverse().map((row) => (
            <View key={row.id} style={styles.listItem}>
              <Text>{`ID: ${row.id}, Namn: ${row.value}`}</Text>
              <Button title="Ta bort" onPress={() => handleDelete(row.id)} />
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
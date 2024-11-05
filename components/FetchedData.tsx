import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { fetchDataFromDatabase } from '../components/database/db';

interface MyData {
  id: number; // Replace with the actual type of 'id'
  name: string;
}

function FetchedData() {
  const [data, setData] = useState<MyData[]>([]); // Declare data as an array of MyData objects
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true while fetching
      try {
        const fetchedData = await fetchDataFromDatabase();
        setData(fetchedData as MyData[]); // Type assertion for fetched data
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error, e.g., show error message
        setIsLoading(false); // Set loading to false on error
      }
    };

    fetchData();
  }, []);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Text>Loading...</Text>
      ) : (
        <View>
          <Text>Alla namn: </Text>
          {data.map((item) => (
            <View key={item.id || Math.random()}>
              <Text>{item.name}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // Add styles for the container View here (optional)
  },
});

export default FetchedData;
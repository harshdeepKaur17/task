import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {
        setLoading(false);
        setData(responseJson.movies);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }, []);

  if (isLoading) {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>Loading.....</Text>
      </View>
    );
  } else {
    let movies = data.map((item, key) => {
      return (
        <View key={key} style={{width: '100%'}}>
          <Text
            style={{
              fontSize: 18,
              fontWeight: 'bold',
            }}>{`Movie  ${item.id}`}</Text>

          {show && (
            <View>
              <Text>{`Title: ${item.title}`}</Text>
              <Text>{`Year: ${item.releaseYear}`}</Text>
            </View>
          )}
        </View>
      );
    });
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'space-evenly',
          paddingLeft: '20%',
        }}>
        <TouchableOpacity
          onPress={() => setShow(!show)}
          style={{
            height: 50,
            width: '60%',
            borderRadius: 10,
            backgroundColor: '#FF5733',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Press for Details</Text>
        </TouchableOpacity>

        {movies}
      </View>
    );
  }
};

export default HomeScreen;

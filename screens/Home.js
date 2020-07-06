import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Card, FAB, Title } from 'react-native-paper';

const Home = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = () => {
    fetch('http://12df0411852e.ngrok.io')
      .then((res) => res.json())
      .then((results) => {
        setData(results);
        setLoading(false);
      })
      .catch((err) => {
        Alert.alert('Something went wrong');
      });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate('Profile', { item })}
      >
        <View style={styles.cardView}>
          <Image
            style={{
              width: 80,
              height: 80,
              borderRadius: 50,
              borderWidth: 3,
              borderColor: '#00b8ae',
            }}
            source={{
              uri: item.picture,
            }}
          />
          <View style={{ marginLeft: 25, marginTop: 15 }}>
            <Text style={styles.text1}>{item.name}</Text>
            <Text style={styles.text2}>{item.position}</Text>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#e6faf8' }}>
      <FlatList
        style={{ paddingTop: 20 }}
        data={data}
        renderItem={({ item }) => {
          return renderList(item);
        }}
        keyExtractor={(item) => item._id}
        onRefresh={() => fetchData()}
        refreshing={loading}
      />
      <FAB
        style={styles.fab}
        small={false}
        icon='plus'
        theme={{
          colors: { accent: '#00b8ae' },
        }}
        onPress={() => navigation.navigate('Create')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    marginLeft: 30,
    marginRight: 30,
    height: 100,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 5,
  },
  cardView: {
    flexDirection: 'row',
    padding: 10,
  },
  text1: {
    fontSize: 20,
    color: '#0d3330',
  },
  text2: {
    fontSize: 16,
    color: '#99a0a1',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default Home;

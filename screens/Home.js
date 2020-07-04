import React from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import { Card, FAB, Title } from 'react-native-paper';

const Home = ({ navigation }) => {
  const data = [
    {
      id: '1',
      name: 'Saiesh Volvaikar',
      email: 'saiesvolvo@gmail.com',
      salary: '5 LPA',
      phone: '7879334091',
      github: 'https://github.com/saieshvolvo',
      picture: 'https://avatars1.githubusercontent.com/u/17901047?s=460&v=4',
      position: 'UI/UX Designer',
    },

    {
      id: '2',
      name: 'Arpesh Gadekar',
      email: 'arpeshgadekar@gmail.com',
      salary: '8 LPA',
      phone: '8552056578',
      github: 'https://github.com/omkarvaigankar8',
      picture:
        'https://avatars0.githubusercontent.com/u/44309224?s=460&u=54a6f391c5f4be160ee9664b3866b4ca7c135683&v=4',
      position: 'Web Developer',
    },

    {
      id: '3',
      name: 'Omkar Vaigankar',
      email: 'omkarvaigankar02@gmail.com',
      salary: '16 LPA',
      phone: '95620565329',
      github: 'https://github.com/omkarvaigankar8',
      picture:
        'https://image.freepik.com/free-vector/cartoon-happy-frog-white_29190-5560.jpg',
      position: 'Web Developer',
    },
  ];
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
        keyExtractor={(item) => item.id}
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

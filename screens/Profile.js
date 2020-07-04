import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Title, Paragraph, Card, Button } from 'react-native-paper';
import { FontAwesome5, Ionicons, Foundation } from '@expo/vector-icons';

const Profile = (props) => {
  const {
    id,
    name,
    picture,
    salary,
    position,
    github,
    email,
    phone,
  } = props.route.params.item;
  const openDial = () => {
    if (Platform.OS === 'android') {
      Linking.openURL('tel:855292119');
    } else {
      Linking.openURL('telprompt:855201923');
    }
  };
  return (
    <View style={styles.root}>
      <LinearGradient
        colors={['#00b8ae', '#00b8ae']}
        style={{ height: '30%' }}
      />
      <View style={styles.profileCard}>
        <Image
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            borderWidth: 3,
            borderColor: 'white',
          }}
          source={{
            uri: picture,
          }}
        />
        <View style={{ alignItems: 'center', marginTop: 15 }}>
          <Title style={styles.profiletext}>{name}</Title>
          <Text style={styles.profileContent}>{position}</Text>
          <Text style={styles.profileContent}>{salary}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginTop: 20,
          }}
        >
          <FontAwesome5
            name='github'
            style={styles.icons}
            onPress={() => {
              Linking.openURL(github);
            }}
          />
          <FontAwesome5
            name='linkedin'
            style={styles.icons}
            onPress={() => {
              Linking.openURL(
                'https://in.linkedin.com/in/arpesh-gadekar-416378170'
              );
            }}
          />
        </View>
      </View>
      <View style={{ marginLeft: 25, marginRight: 25 }}>
        <Title style={{ color: '#0d3330', marginBottom: 5 }}>About</Title>
        <Paragraph
          style={{
            lineHeight: 25,
            marginTop: 5,
            color: '#0d3330',
            fontSize: 16,
          }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas maxime
          esse dolorum. Modi necessitatibus velit tempore ratione odit eaque
          error.
        </Paragraph>
        <View
          style={{
            marginTop: 20,
          }}
        >
          <Card
            style={[
              styles.cardStyle,
              { borderBottomWidth: 1, borderBottomColor: '#cee0de' },
            ]}
            onPress={() => {
              Linking.openURL('mailto:arpeshgadekar@gmail.com');
            }}
          >
            <View style={styles.cardView}>
              <FontAwesome5
                name='long-arrow-alt-right'
                style={styles.cardArrows}
              />
              <Ionicons name='md-mail-open' style={styles.CardIcons} />
              <Text style={styles.cardText}>{email}</Text>
            </View>
          </Card>
          <Card style={styles.cardStyle} onPress={() => openDial()}>
            <View style={styles.cardView}>
              <FontAwesome5
                name='long-arrow-alt-right'
                style={styles.cardArrows}
              />
              <Foundation name='telephone' style={styles.CardIcons} />
              <Text style={styles.cardText}>{phone}</Text>
            </View>
          </Card>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 30,
          }}
        >
          <Button
            icon='square-edit-outline'
            color='#00b8ae'
            borderColor='#00b8ae'
            mode='outlined'
            onPress={() => console.log('pressed')}
            style={styles.btn}
          >
            Edit
          </Button>
          <Button
            icon='delete-empty'
            mode='contained'
            onPress={() => console.log('pressed')}
            style={styles.buttonextra}
          >
            Fire
          </Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e6faf8',
  },
  profileContent: {
    color: 'white',
    fontSize: 15,
  },
  icons: {
    marginLeft: 30,
    marginRight: 30,
    fontSize: 30,
    color: 'white',
  },
  profiletext: {
    color: 'white',
    fontSize: 25,
    marginBottom: 10,
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#00ccc1',
    margin: 25,
    marginLeft: 40,
    marginRight: 40,
    borderRadius: 30,
    height: 280,
    shadowOpacity: 0.5,
    elevation: 10,
    marginTop: -200,
    padding: 20,
  },
  cardStyle: {
    height: 50,
    marginTop: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 5,
    backgroundColor: 'transparent',
    elevation: 0,
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CardIcons: {
    fontSize: 25,
    width: 30,
    color: '#00b8ae',
    marginRight: 5,
    marginLeft: 5,
  },
  cardText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#0d3330',
    textAlign: 'left',
  },
  btn: {
    width: 150,
    height: 50,
    justifyContent: 'center',
    marginRight: 10,
    borderWidth: 2,
    borderRadius: 30,
    borderColor: '#00b8ae',
  },
  buttonextra: {
    backgroundColor: '#00b8ae',
    justifyContent: 'center',
    height: 50,
    width: 150,
    borderRadius: 30,
    marginLeft: 10,
  },
  cardArrows: {
    color: '#0d3330',
    fontSize: 20,
    marginRight: 20,
  },
});

export default Profile;

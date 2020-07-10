import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Modal, ScrollView } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.phone;
        case 'email':
          return route.params.phone;
        case 'position':
          return route.params.position;
        case 'salary':
          return route.params.salary;
        case 'picture':
          return route.params.picture;
        case 'about':
          return route.params.about;
        case 'github':
          return route.params.github;
        case 'linkedIn':
          return route.params.linkedIn;
      }
    }
    return '';
  };

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [email, setEmail] = useState(getDetails('email'));
  const [position, setPosition] = useState(getDetails('position'));
  const [salary, setSalary] = useState(getDetails('salary'));
  const [picture, setPicture] = useState(getDetails('picture'));
  const [about, setAbout] = useState(getDetails('about'));
  const [github, setGithub] = useState(getDetails('github'));
  const [linkedIn, setLinkedIn] = useState(getDetails('linkedIn'));
  const [modal, setModal] = useState('false');
  const [enableshift, setEnableShift] = useState(false);

  const submitData = () => {
    fetch('http://f6fd40ec69db.ngrok.io/send-data', {
      // Add the ngrok forwarding url here followed by the route '/send-data'
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        salary,
        picture,
        position,
        about,
        github,
        linkedIn,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is added`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Error while uploading');
      });
  };

  const updateDetails = () => {
    fetch('http://f6fd40ec69db.ngrok.io/update', {
      // Add the ngrok forwarding url here followed by the route '/update'
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        id: route.params._id,
        name,
        email,
        phone,
        salary,
        linkedIn,
        github,
        about,
        picture,
        position,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        Alert.alert(`${data.name} is updated`);
        navigation.navigate('Home');
      })
      .catch((err) => {
        Alert.alert('Error while uploading');
      });
  };

  const pickFromGallery = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (granted) {
      let data = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `image/${data.uri.split('.')[1]}`,
          name: `image.${data.uri.split('.'[1])}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert('We need your permission to work');
    }
  };

  const pickFromCamera = async () => {
    const { granted } = await Permissions.askAsync(Permissions.CAMERA);
    if (granted) {
      let data = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.5,
      });
      if (!data.cancelled) {
        let newfile = {
          uri: data.uri,
          type: `image/${data.uri.split('.')[1]}`,
          name: `image.${data.uri.split('.'[1])}`,
        };
        handleUpload(newfile);
      }
    } else {
      Alert.alert('We need your permission to work');
    }
  };

  const handleUpload = (image) => {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'employeeApp');
    data.append('cloud_name', 'arpesh28');

    fetch('https://api.cloudinary.com/v1_1/arpesh28/image/upload', {
      method: 'post',
      body: data,
    })
      .then((res) => res.json())
      .then((data) => {
        setPicture(data.url);
        setModal(false);
      })
      .catch((err) => {
        Alert.alert('error while uploading');
      });
  };

  return (
    <ScrollView>
      <View style={styles.root}>
        <View style={styles.heading}>
          {route.params ? (
            <Title style={styles.head1}>Update</Title>
          ) : (
            <Title style={styles.head1}>New</Title>
          )}

          <Title style={styles.head1}>Employee</Title>
        </View>
        <View style={styles.form}>
          <TextInput
            style={styles.inputstyle}
            placeholder='Name'
            value={name}
            theme={theme}
            mode='flat'
            onFocus={() => setEnableShift(false)}
            onChangeText={(text) => setName(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='Email'
            value={email}
            theme={theme}
            mode='flat'
            onFocus={() => setEnableShift(false)}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='Phone'
            value={phone}
            theme={theme}
            keyboardType='number-pad'
            mode='flat'
            onFocus={() => setEnableShift(true)}
            onChangeText={(text) => setPhone(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='Position'
            value={position}
            theme={theme}
            mode='flat'
            onFocus={() => setEnableShift(true)}
            onChangeText={(text) => setPosition(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='Salary'
            value={salary}
            theme={theme}
            onFocus={() => setEnableShift(true)}
            mode='flat'
            onChangeText={(text) => setSalary(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='Github Link'
            value={github}
            theme={theme}
            onFocus={() => setEnableShift(true)}
            mode='flat'
            onChangeText={(text) => setGithub(text)}
          />
          <TextInput
            style={styles.inputstyle}
            placeholder='LinkedIn Link'
            value={linkedIn}
            theme={theme}
            onFocus={() => setEnableShift(true)}
            mode='flat'
            onChangeText={(text) => setLinkedIn(text)}
          />
          <TextInput
            style={styles.inputstyle1}
            placeholder='About your Employee'
            multiline={true}
            numberOfLines={3}
            value={about}
            theme={theme}
            onFocus={() => setEnableShift(true)}
            mode='outlined'
            onChangeText={(text) => setAbout(text)}
          />
          <Button
            style={styles.btn1style}
            icon={picture == '' ? 'cloud-upload-outline' : 'check-circle'}
            mode='outlined'
            theme={picture == '' ? theme : theme2}
            onPress={() => setModal(true)}
          >
            Upload Image
          </Button>
          {route.params ? (
            <Button
              style={styles.btn2style}
              icon='account-plus-outline'
              mode='contained'
              theme={theme}
              onPress={() => updateDetails()}
            >
              Update
            </Button>
          ) : (
            <Button
              style={styles.btn2style}
              icon='account-plus-outline'
              mode='contained'
              theme={theme}
              onPress={() => submitData()}
            >
              Save
            </Button>
          )}
          <Modal
            animationType='slide'
            transparent={true}
            visible={modal}
            onRequestClose={() => {
              setModal(false);
            }}
          >
            <View style={styles.modalView}>
              <View style={{ alignItems: 'center' }}>
                <Text style={{ fontSize: 22, color: '#b0b0b0' }}>
                  Choose Media
                </Text>
              </View>
              <View style={styles.modalButtonView}>
                <Button
                  icon='camera'
                  mode='contained'
                  theme={theme}
                  onPress={() => pickFromCamera()}
                >
                  Camera
                </Button>
                <Button
                  icon='image-area'
                  mode='contained'
                  theme={theme}
                  onPress={() => pickFromGallery()}
                >
                  Gallery
                </Button>
              </View>
              <Button color='#00b8ae' onPress={() => setModal(false)}>
                Cancel
              </Button>
            </View>
          </Modal>
        </View>
      </View>
    </ScrollView>
  );
};

const theme = {
  colors: {
    primary: '#00b8ae',
  },
};
const theme2 = {
  colors: {
    primary: '#47c900',
  },
};
const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: '#e6faf8',
    padding: 15,
    paddingTop: 15,
  },
  form: {
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 20,
    elevation: 20,
    shadowRadius: 20,
    marginBottom: 20,
  },
  inputstyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    backgroundColor: 'transparent',
  },
  inputstyle1: {
    height: 100,
    backgroundColor: 'transparent',
    textAlignVertical: 'top',
  },
  btn1style: {
    height: 50,
    marginBottom: 25,
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderWidth: 0,
  },
  btn2style: {
    backgroundColor: '#00b8ae',
    justifyContent: 'center',
    height: 50,
    borderRadius: 10,
  },
  modalView: {
    position: 'absolute',
    bottom: -20,
    height: 250,
    width: '100%',
    paddingTop: 40,
    backgroundColor: 'white',
    elevation: 50,
    borderRadius: 40,
  },
  modalButtonView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  heading: {
    marginTop: 10,
    marginBottom: 30,
  },
  head1: {
    paddingTop: 40,
    fontSize: 70,
    fontWeight: 'bold',
    color: '#00b8ae',
  },
});

export default CreateEmployee;

import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert, Modal } from 'react-native';
import { TextInput, Button, Title } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const CreateEmployee = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [picture, setPicture] = useState('');
  const [modal, setModal] = useState('false');

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
      });
  };

  return (
    <View style={styles.root}>
      <View style={styles.heading}>
        <Title style={styles.head1}>New</Title>
        <Title style={styles.head1}>Employee</Title>
      </View>
      <View style={styles.form}>
        <TextInput
          style={styles.inputstyle}
          placeholder='Name'
          value={name}
          theme={theme}
          mode='flat'
          onChangeText={(text) => setName(text)}
        />
        <TextInput
          style={styles.inputstyle}
          placeholder='Email'
          value={email}
          theme={theme}
          mode='flat'
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.inputstyle}
          placeholder='Phone'
          value={phone}
          theme={theme}
          keyboardType='number-pad'
          mode='flat'
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={styles.inputstyle}
          placeholder='Salary'
          value={salary}
          theme={theme}
          mode='flat'
          onChangeText={(text) => setSalary(text)}
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
        <Button
          style={styles.btn2style}
          icon='account-plus-outline'
          mode='contained'
          theme={theme}
          onPress={() => console.log('Saved')}
        >
          Save
        </Button>
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
  },
  inputstyle: {
    marginTop: 20,
    marginBottom: 20,
    height: 40,
    backgroundColor: 'transparent',
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

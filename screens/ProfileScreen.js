import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  AsyncStorage,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import { deviceHeight, deviceWidth } from '../constants/Layout';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class ProfileScreen extends Component {
  state = {
    image: 'https://codehs.com/uploads/3fb254527bfe2f367b433f75a741e2b1',
    name: '',
    username: '',
    email: '',
    phone: '',
    school: '',
    profilePageDisplay: 'block',
    editProfilePageDisplay: 'none',
  };
  componentDidMount = () => {
    this.fetchUserInfo();
  };

  fetchUserInfo = () => {
    AsyncStorage.getItem('name').then((value) =>
      this.setState({ name: value })
    );
    AsyncStorage.getItem('username').then((value) =>
      this.setState({ username: value })
    );
    AsyncStorage.getItem('email').then((value) =>
      this.setState({ email: value })
    );
    AsyncStorage.getItem('phone').then((value) =>
      this.setState({ phone: value })
    );
    AsyncStorage.getItem('school').then((value) =>
      this.setState({ school: value })
    );
    AsyncStorage.getItem('image').then((value) => {
      if (value === null) {
        this.setState({
          image: 'https://codehs.com/uploads/3fb254527bfe2f367b433f75a741e2b1',
        });
      } else {
        this.setState({
          image: value,
        });
      }
    });
  };

  handleProfilePageDisplay = () => {
    this.setState({
      profilePageDisplay: 'block',
      editProfilePageDisplay: 'none',
    });
  };

  handleEditProfilePageDisplay = () => {
    this.setState({
      profilePageDisplay: 'none',
      editProfilePageDisplay: 'block',
    });
  };

  handleSaveEditProfile = () => {
    AsyncStorage.setItem('name', this.state.name);
    AsyncStorage.setItem('username', this.state.username);
    AsyncStorage.setItem('email', this.state.email);
    AsyncStorage.setItem('school', this.state.school);
    AsyncStorage.setItem('image', this.state.image);
    this.fetchUserInfo();
    this.setState({
      profilePageDisplay: 'block',
      editProfilePageDisplay: 'none',
    });
  };

  handleCancelEditProfile = () => {
    this.fetchUserInfo();
    this.setState({
      profilePageDisplay: 'block',
      editProfilePageDisplay: 'none',
    });
  };

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert(
          'Permissions to access camera roll are needed to change profile photo'
        );
      }
    }
  };

  changePhoto = async () => {
    this.getPermissionAsync();
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }

      console.log(result);
    } catch (E) {
      console.log(E);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View
          style={{
            display: this.state.profilePageDisplay,
            width: deviceWidth,
            height: deviceHeight,
          }}
        >
          <View style={styles.profilePhotoContainer}>
            <View style={styles.backgroundContainer}>
              <Image source={{ uri: this.state.image }} style={styles.photo} />
            </View>
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.sectionHeader}>Personal Information</Text>
              <TouchableHighlight onPress={this.handleEditProfilePageDisplay}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Edit</Text>
                </View>
              </TouchableHighlight>
            </View>

            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Name: </Text>
              <Text style={styles.info}>{this.state.name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Username: </Text>
              <Text style={styles.info}>{this.state.username}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Email: </Text>
              <Text style={styles.info}>{this.state.email}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Phone: </Text>
              <Text style={styles.info}>{this.state.phone}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>School: </Text>
              <Text style={styles.info}>{this.state.school}</Text>
            </View>
          </View>
        </View>

        <View
          style={{
            display: this.state.editProfilePageDisplay,
            width: deviceWidth,
            height: deviceHeight,
          }}
        >
          <View style={styles.profilePhotoContainer}>
            <View style={styles.backgroundContainer}>
              <Image source={{ uri: this.state.image }} style={styles.photo} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableHighlight onPress={this.changePhoto}>
              <View style={styles.changePhotoButton}>
                <Text style={styles.buttonText}>Change Profile Photo</Text>
              </View>
            </TouchableHighlight>
          </View>

          <View style={styles.profileInfoContainer}>
            <View style={styles.rowContainer}>
              <Text style={styles.sectionHeader}>Personal Information</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Name</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(name) => this.setState({ name })}
                value={this.state.name}
                placeholder='Name'
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Username</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(username) => this.setState({ username })}
                value={this.state.username}
                placeholder='Username'
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Email</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(email) => this.setState({ email })}
                value={this.state.email}
                placeholder='Email'
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>Phone</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(phone) => this.setState({ phone })}
                value={this.state.phone}
                placeholder='Phone'
              />
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.fieldLabel}>School</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(school) => this.setState({ school })}
                value={this.state.school}
                placeholder='School'
              />
            </View>
            <View style={styles.rowContainer}>
              <TouchableHighlight onPress={this.handleSaveEditProfile}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Save</Text>
                </View>
              </TouchableHighlight>

              <TouchableHighlight onPress={this.handleCancelEditProfile}>
                <View style={styles.button}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  profilePhotoContainer: {
    height: 6 * (deviceHeight / 20),
    width: deviceWidth,
  },
  backgroundContainer: {
    flex: 0.6,
    backgroundColor: '#ef4923',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  photo: {
    marginTop: 1.5 * (deviceHeight / 20),
    height: 4 * (deviceHeight / 20),
    width: 4 * (deviceHeight / 20),
    borderRadius: 100,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  SaveCanclebuttonContainer: {
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
    flexDirection: 'row',
  },

  changePhotoButton: {
    height: 0.7 * (deviceHeight / 20),
    width: 10 * (deviceWidth / 20),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a2e49',
  },
  button: {
    height: 0.7 * (deviceHeight / 20),
    width: 4 * (deviceWidth / 20),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a2e49',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 0.35 * (deviceHeight / 20),
    color: '#ffffff',
  },
  profileInfoContainer: {
    borderTopColor: '#dddddd',
    borderTopWidth: 1,
    flex: 1,
    paddingHorizontal: 1.5 * (deviceWidth / 20),
    paddingVertical: 0.5 * (deviceHeight / 20),
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 0.2 * (deviceHeight / 20),
  },
  sectionHeader: {
    fontWeight: 'bold',
  },
  textInput: {
    width: 11 * (deviceWidth / 20),
    textAlign: 'left',
    borderBottomColor: '#dddddd',
    borderBottomWidth: 1,
  },
  info: {
    width: 11 * (deviceWidth / 20),
    textAlign: 'left',
    marginBottom: 5,
  },
});

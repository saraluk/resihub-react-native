import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import { deviceHeight, deviceWidth } from '../constants/Layout';

export default class HomeScreen extends Component {
  state = {
    ImageArray: [
      'https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1519121785383-3229633bb75b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1429823040067-2c31b1d637ae?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1559782035-4d0ba89c0540?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1562710057-b3a85fa9ba85?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1554193748-bc6c3d1cb3e3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
      'https://images.unsplash.com/photo-1527267207156-3372670819dc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80',
    ],
    backgroundImage:
      'https://images.unsplash.com/photo-1560306843-33986aebaf12?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80',
  };

  componentDidMount() {
    this.generateBackgroundImage();
  }

  generateBackgroundImage = () => {
    const size = this.state.ImageArray.length;
    const randomIdx = Math.floor(Math.random() * size);
    this.setState({
      backgroundImage: this.state.ImageArray[randomIdx],
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.background}
          source={{
            uri: `${this.state.backgroundImage}`,
          }}
        >
          <View style={styles.contentContainer}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleText}>ResiHub</Text>
            </View>
            <View style={styles.subtitleTextContainer}>
              <Text style={styles.subtitleText}>
                Explore Rental Apartment Buildings in New York City
              </Text>
            </View>

            <TouchableHighlight
              onPress={() =>
                this.props.navigation.navigate('SearchScreen', {
                  key: 1,
                })
              }
              style={styles.button}
            >
              <View>
                <Text style={styles.buttonText}>Get Started</Text>
              </View>
            </TouchableHighlight>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width: deviceWidth,
    height: deviceHeight,
  },
  contentContainer: {
    backgroundColor: 'rgba(46, 49, 49, 0.7)',
    width: deviceWidth,
    height: deviceHeight,
    paddingLeft: 2 * (deviceWidth / 20),
  },
  titleTextContainer: {
    marginTop: 9 * (deviceHeight / 20),
    width: deviceWidth,
  },
  titleText: {
    color: '#ffffff',
    fontSize: deviceHeight / 20,
    fontWeight: 'bold',
  },
  subtitleTextContainer: {
    height: 3 * (deviceHeight / 20),
    width: 13 * (deviceWidth / 20),
  },
  subtitleText: {
    color: '#e9e9e9',
    fontSize: 0.55 * (deviceHeight / 20),
  },
  button: {
    height: 1.2 * (deviceHeight / 20),
    width: 6.5 * (deviceWidth / 20),
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ef4923',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 0.5 * (deviceHeight / 20),
    color: '#0a2e49',
  },
});

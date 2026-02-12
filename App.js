import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Routes from './src/navigators/Routes';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export default function App() {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '137096979372-mf8jdl7ge5b3739b4k48u1oifv6n5sr8.apps.googleusercontent.com',
    });
  }, []);

  return <Routes />;
}

const styles = StyleSheet.create({});

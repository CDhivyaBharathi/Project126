import React from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import PickImage from "./camera"

export default function App() {
  return (
    <View style={styles.container}>
      <PickImage></PickImage>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

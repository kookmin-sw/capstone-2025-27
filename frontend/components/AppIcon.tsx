import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { responsiveStyleSheet } from './responsive';

export default function AppIcon() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/CASHQ&A.png')}
        style={styles.image}
        resizeMode="contain" // 'contain', 'stretch'
      />
    </View>
  );
}

const styles = responsiveStyleSheet({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
});

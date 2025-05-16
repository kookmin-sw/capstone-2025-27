import { responsiveStyleSheet } from '@/components/responsive';
import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default function PaymentScreen() {
  const iamportUrl = 'https://service.iamport.kr/payments/...' // your generated payment URL

  const [points, setPoints] = useState(0)
  return (
    <View>
      <Text>구매 포인트</Text>
      <TextInput
        style={styles.pointsInput}
        value={points.toString() || ''}
        onChangeText={(text) => {
          const num = parseInt(text);
          if(isNaN(num)) {
            setPoints(0)
          } else {
            setPoints(num)
          }
        }}
        />
        <Pressable>
          <Text>구매</Text>
        </Pressable>
      {/* <WebView
        source={{ uri: iamportUrl }}
        onNavigationStateChange={(navState) => {
          if (navState.url.includes('success')) {
            // Handle success
          } else if (navState.url.includes('fail')) {
            // Handle failure
          }
        }}
      /> */}
    </View>
  );
}

const styles = responsiveStyleSheet({
  pointsInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
})
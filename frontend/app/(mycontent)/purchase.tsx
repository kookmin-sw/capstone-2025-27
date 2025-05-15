import React from 'react';
import { WebView } from 'react-native-webview';

export default function PaymentScreen() {
  const iamportUrl = 'https://service.iamport.kr/payments/...' // your generated payment URL

  return (
    <WebView
      source={{ uri: iamportUrl }}
      onNavigationStateChange={(navState) => {
        if (navState.url.includes('success')) {
          // Handle success
        } else if (navState.url.includes('fail')) {
          // Handle failure
        }
      }}
    />
  );
}

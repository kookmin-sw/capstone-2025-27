import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView } from 'react-native';

import { cardStyles, pageStyles } from '@/components/styles';
import { CardView } from '@/components/CardView';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text style={pageStyles.titleText}>학습페이지</Text>
      <CardView color='#ffffff'>
        <Text style={cardStyles.titleText}>PROGRESS</Text>
      </CardView>
      <CardView color='#ffffff'>
        <Text style={cardStyles.titleText}>TODO</Text>
      </CardView>
    </ScrollView>
  );
}

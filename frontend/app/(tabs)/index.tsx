import { Image, StyleSheet, Platform, Text, ScrollView, SafeAreaView } from 'react-native';

import { cardStyles, pageStyles } from '@/components/styles';
import Todos from '@/components/homepage/todos';
import Progress from '@/components/homepage/progress';

export default function HomeScreen() {
  return (
    <ScrollView>
      <Text style={pageStyles.titleText}>학습페이지</Text>
      <Progress />
      <Todos />
    </ScrollView>
  );
}

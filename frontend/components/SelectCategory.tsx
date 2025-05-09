import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { Ionicons } from '@expo/vector-icons';
import { responsiveStyleSheet } from './responsive';

interface SelectCategoryProps {
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
  placeholder?: string;
}

const SelectCategory: React.FC<SelectCategoryProps> = ({
  value,
  onValueChange,
  items,
  placeholder = 'Select an option...',
}) => {
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={onValueChange}
        value={value}
        placeholder={{ label: placeholder, value: '' }}
        items={items}
        useNativeAndroidPickerStyle={false}
        Icon={() => <Ionicons name="chevron-down" size={20} color="#555" />}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          iconContainer: { top: 14, right: 12 },
        }}
      />
    </View>
  );
};

export default SelectCategory;

const styles = responsiveStyleSheet({
  container: {
    marginBottom: 40
  },
  label: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#FAFAFA',
    color: '#333',
  },
});

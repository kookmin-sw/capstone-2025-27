import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import { responsiveStyleSheet } from './responsive';

interface DateInputProps {
  date: Date;
  onChange: (date: Date) => void;
  label?: string;
}

const DateInput: React.FC<DateInputProps> = ({ date, onChange, label }) => {
  const [showPicker, setShowPicker] = useState(false);

  const onDateChange = (_event: any, selectedDate?: Date) => {
    setShowPicker(Platform.OS === 'ios'); // iOS stays open
    if (selectedDate) {
      onChange(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.inputBox}
      >
        <Ionicons name="calendar" size={20} color="#555" style={{ marginRight: 8 }} />
        <Text style={styles.dateText}>
          {date.toLocaleDateString()}
        </Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={onDateChange}
        />
      )}
    </View>
  );
};

export default DateInput;

const styles = responsiveStyleSheet({
  container: {
    marginBottom: 30
  },
  label: {
    fontSize: 14,
    color: '#2C3E50',
    marginBottom: 4,
    fontWeight: '600',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#FAFAFA',
  },
  dateText: {
    fontSize: 16,
    color: '#333',
  },
});

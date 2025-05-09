import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Modal from 'react-native-modal';
import { bgColor, primaryColor, secondaryColor } from './styles';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CATEGORIES = ['과학', '가전', '부엌', 'IT', 'All'];

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search...',
  selectedCategory,
  setSelectedCategory,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleSelect = (category: string) => {
    setSelectedCategory(category);
    setModalVisible(false);
  };

  return (
    <>
      <View style={styles.container}>
        <Ionicons name="search" size={20} color={bgColor} />
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={bgColor}
        />
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText}>{selectedCategory}</Text>
          <Ionicons name="chevron-down" size={16} color={secondaryColor} />
        </TouchableOpacity>
      </View>

      <Modal isVisible={modalVisible} onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal}>
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item)} style={styles.modalItem}>
                <Text style={styles.modalItemText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: primaryColor,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 10,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: bgColor,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: bgColor,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 14,
    color: secondaryColor,
    marginRight: 4,
  },
  modal: {
    backgroundColor: bgColor,
    borderRadius: 10,
    paddingVertical: 12,
  },
  modalItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  modalItemText: {
    fontSize: 16,
    color: secondaryColor,
  },
});

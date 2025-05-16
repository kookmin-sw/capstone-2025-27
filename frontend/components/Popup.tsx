// components/Popup.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { responsiveStyleSheet } from './responsive';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { bgColor, primaryColor } from './styles';

export default function Popup({
  visible,
  onClose,
  title,
  children,
  onPurchase,
}: {
  visible: boolean;
  onClose: () => void;
  onPurchase: () => void;
  title: string;
  children?: React.ReactNode;
}) {
  return (
    <View pointerEvents='box-none'>
      <GestureHandlerRootView>
        <Modal
          visible={visible}
          transparent
          animationType="fade"
          onRequestClose={onClose}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            style={styles.overlay}
          >
            {/* Dismiss on tap outside popup */}
            <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />

            <View style={styles.popup}>
              <Text style={styles.title}>{title}</Text>
              {children}
              <View style={styles.buttonRow}>
                <Pressable onPress={onPurchase} style={styles.button}>
                  <Text style={styles.buttonText}>구매하기</Text>
                </Pressable>
                <Pressable onPress={onClose} style={styles.button}>
                  <Text style={styles.buttonText}>닫기</Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </Modal>
      </GestureHandlerRootView>
    </View>
  );
}

const styles = responsiveStyleSheet({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginTop: 16,
  },
  button: {
    backgroundColor: primaryColor,
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: bgColor,
    fontWeight: 'bold',
  },
});

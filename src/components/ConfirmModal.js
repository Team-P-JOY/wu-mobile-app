import React from "react";
import { View, StyleSheet } from "react-native";
import { Modal, Portal, Text, Button } from "react-native-paper";

const ConfirmModal = ({ visible, onClose, onConfirm, message }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={onClose}
        contentContainerStyle={styles.modalContainer}
      >
        <Text style={styles.message}>{message}</Text>
        <View style={styles.buttonContainer}>
          <Button
            mode="contained"
            onPress={onConfirm}
            style={styles.buttonConfirm}
          >
            ตกลง
          </Button>
          <Button mode="outlined" onPress={onClose} style={styles.buttonCancel}>
            ยกเลิก
          </Button>
        </View>
      </Modal>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    marginHorizontal: 30,
    borderRadius: 10,
  },
  message: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonConfirm: {
    flex: 1,
    marginRight: 10,
  },
  buttonCancel: {
    flex: 1,
  },
});

export default ConfirmModal;

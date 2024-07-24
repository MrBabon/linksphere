import { Modal, TextInput, TouchableOpacity } from "react-native";
import { s } from "./ModalContactGroup.style"
import { useState } from "react";


export function ModalContactGroup({ isVisible, onClose, onConfirm }) {
    const [groupName, setGroupName] = useState('');

    const handleConfirm = () => {
      onConfirm(groupName);
      setGroupName('');
    };

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <TouchableOpacity style={s.centeredView} onPress={onClose} activeOpacity={1}>
                <TouchableOpacity style={s.modalView} activeOpacity={1}>
                    <TextInput
                        style={s.input}
                        placeholder="NAME OF GROUP"
                        placeholderTextColor={'#BDBDBD'}
                        value={groupName}
                        onChangeText={setGroupName}
                        onSubmitEditing={handleConfirm}
                    />
                </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    )

}
import { Modal, TouchableOpacity, View } from "react-native";
import { s } from "./ModalEvent.style";
import Close from "../../../assets/icons/Close";


export function ModalEvent({ isVisible, onClose, children }) {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <View style={s.centeredView}>
                <View style={s.modalView}>
                    <View style={s.closeView}>
                        <TouchableOpacity style={s.closeButton} onPress={onClose}>
                            <Close/>
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </View>
        </Modal>
    )

}
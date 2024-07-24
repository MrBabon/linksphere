import { Image, Modal, TouchableOpacity, View } from "react-native";
import { s } from "./ModalContactEntreprise.style";
import Close from "../../../assets/icons/Close";



export function ModalContactEntreprise({ isVisible, onClose, children}) {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <TouchableOpacity style={s.centeredView} activeOpacity={1}>
                <View style={s.modalView}>
                    <View style={s.chevron}>
                        <TouchableOpacity style={s.closeButton} onPress={onClose}>
                            <Close color="#19A9AA"/>
                        </TouchableOpacity>
                    </View>
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    )

}
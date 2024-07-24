import { Modal, TouchableOpacity, View } from "react-native";
import { TxtInria } from "../../TxtInria/TxtInria";
import { s } from "./ModalDelete.style";
import Close from "../../../assets/icons/Close";
import { TxtJost, TxtJostBold } from "../../TxtJost/TxtJost";


export function ModalDelete({ visible, onConfirm, onCancel, children }) {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onCancel}>
            <View style={s.centeredView}>
                <View style={s.modalView}>
                    <TxtJostBold style={s.children}>{children}</TxtJostBold>
                    <View style={s.closeView}>
                        <TouchableOpacity style={s.button} onPress={onConfirm}>
                            <TxtJost style={s.buttonText}>Confirm</TxtJost>
                        </TouchableOpacity>
                        <TouchableOpacity style={s.button} onPress={onCancel}>
                            <TxtJost style={s.buttonText}>Cancel</TxtJost>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )

}
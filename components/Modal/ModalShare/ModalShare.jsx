import { Image, Modal, TouchableOpacity, View } from "react-native";
import { s } from "./ModalShare.style";

import ChevronLeft from "../../../assets/icons/ChevronLeft";


export function ModalShare({ isVisible, onClose, children}) {

    return(
        <Modal
            animationType="slide"
            transparent={true}
            visible={isVisible}
            onRequestClose={onClose}>
            <TouchableOpacity style={s.centeredView} onPress={onClose} activeOpacity={1}>
                <View style={s.modalView}>
                    <View style={s.chevron}>
                        <TouchableOpacity style={s.closeButton} onPress={onClose}>
                            <ChevronLeft/>
                        </TouchableOpacity>
                    </View>
                    <Image source={require('../../../assets/images/paper airplane.png')} style={s.shareImage} />
                    {children}
                </View>
            </TouchableOpacity>
        </Modal>
    )

}
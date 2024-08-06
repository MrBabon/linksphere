import { useContext, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Close from '../../assets/icons/Close';
import { TxtInriaBold } from '../TxtInria/TxtInria';
import { AuthContext } from '../../app/context/AuthContext';
import { s } from './styles';  // Assurez-vous d'importer votre fichier de styles
import { ModalDelete } from '../Modal/ModalDelete/ModalDelete';

const DeleteAccountButton = () => {
    const { deleteAccount } = useContext(AuthContext);
    const [modalVisible, setModalVisible] = useState(false);

    const handleConfirmDelete = () => {
        setModalVisible(false);
        deleteAccount(); // Appelle la fonction pour supprimer le compte
    };

    const handleCancelDelete = () => {
        setModalVisible(false);
    };

    return (
        <View>
            <TouchableOpacity style={s.btn} onPress={() => setModalVisible(true)}>
                <TxtInriaBold style={s.txt}>Delete your account</TxtInriaBold>
                <Close color="#E51818" width={24} height={24} />
            </TouchableOpacity>
            <ModalDelete
                    visible={modalVisible}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}>
                Are you sure you want to delete your account? This action cannot be undone and you will lose all your contacts.
            </ModalDelete>
        </View>
    );
}

export default DeleteAccountButton;

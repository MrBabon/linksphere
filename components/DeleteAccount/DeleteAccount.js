// components/DeleteAccountButton.js

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { showMessage } from 'react-native-flash-message';
import { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import Close from '../../assets/icons/Close';
import { TxtInriaBold } from '../TxtInria/TxtInria';
import { AuthContext } from '../../app/context/AuthContext';
import api from '../../config/config';
import { s } from './styles';  // Assurez-vous d'importer votre fichier de styles

const DeleteAccountButton = () => {
    const { deleteAccount } = useContext(AuthContext);

    

    return (
        <>
            <TouchableOpacity style={s.btn} onPress={deleteAccount}>
                <TxtInriaBold style={s.txt}>Delete your account</TxtInriaBold>
                <Close color="#E51818" width={24} height={24} />
            </TouchableOpacity>
        </>
    );
}

export default DeleteAccountButton;

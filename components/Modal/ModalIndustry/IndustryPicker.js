
import { Modal, ScrollView, TouchableWithoutFeedback, View } from 'react-native';
import Close from '../../../assets/icons/Close';
import { TxtInria } from '../../TxtInria/TxtInria';
import { s } from './styles';
import { TouchableOpacity } from 'react-native';

const IndustryPicker = ({ onValueChange, isVisible, onClose }) => {

    const industries = [
        { label: 'Agriculture', value: 'agriculture' },
        { label: 'Art & Design', value: 'art_design' },
        { label: 'Education', value: 'education' },
        { label: 'Energy', value: 'energy' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Environment', value: 'environment' },
        { label: 'Finance', value: 'finance' },
        { label: 'Healthcare', value: 'health' },
        { label: 'Human Resources', value: 'human_resources' },
        { label: 'Manufacturing', value: 'manufacturing' },
        { label: 'Media', value: 'media' },
        { label: 'Professional Services', value: 'professional_services' },
        { label: 'Public Administration', value: 'public_administration' },
        { label: 'Real Estate', value: 'real_estate' },
        { label: 'Retail', value: 'retail' },
        { label: 'Science', value: 'science' },
        { label: 'Technology', value: 'technology' },
        { label: 'Telecommunications', value: 'telecommunications' },
        { label: 'Tourism', value: 'tourism' },
        { label: 'Transportation', value: 'transportation' },
    ];

    return (
        <Modal
            visible={isVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >         
            <TouchableWithoutFeedback onPress={onClose}>
                <View style={s.centeredView}>
                    <TouchableWithoutFeedback>
                        <View style={s.modalView}>
                            <ScrollView style={{ width: '100%' }}>
                                {industries.map((industry) => (
                                    <TouchableOpacity
                                        key={industry.value}
                                        style={s.industryOption}
                                        onPress={() => {
                                            onValueChange(industry.value);
                                            onClose();
                                        }}
                                    >
                                        <TxtInria style={s.textStyle}>{industry.label}</TxtInria>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TouchableOpacity onPress={onClose} style={s.closeView}>
                                <Close/>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};


export default IndustryPicker;
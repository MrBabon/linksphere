import { View, StyleSheet } from 'react-native';
import { TxtInria } from './TxtInria/TxtInria';
import { BlurView } from 'expo-blur';

const BlurredText = ({ text, style }) => (
    <View style={style}>
        <BlurView intensity={9} tint="light" style={styles.absoluteFill}>
            <TxtInria style={styles.transparentText}>{text}</TxtInria>
        </BlurView>
    </View>
);

const styles = StyleSheet.create({
    
    transparentText: {
        color: "transparent",
        zIndex: 2
    },
});

export default BlurredText;

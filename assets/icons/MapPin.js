import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';




const MapPin = ({ color = "#7F95E4" }) => {
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg" fill="none"><path fill="${color}" d="M3.111 9.525v4.295l.612.905a.336.336 0 0 0 .554 0l.612-.905V9.525A4.946 4.946 0 0 1 4 9.608c-.304 0-.6-.03-.889-.083ZM4 .835c-2.21 0-4 1.768-4 3.948 0 2.18 1.79 3.948 4 3.948s4-1.767 4-3.948C8 2.603 6.21.836 4 .836ZM4 2.92c-1.042 0-1.889.836-1.889 1.864 0 .182-.15.33-.333.33a.331.331 0 0 1-.334-.33c0-1.39 1.147-2.522 2.556-2.522.184 0 .333.148.333.33 0 .18-.15.328-.333.328Z"/></svg>`

    return <SvgXml xml={svgMarkup} style={styles.icon}/> };

const styles = StyleSheet.create({
    icon: {
        marginRight: 9,
        marginLeft: 2,
        width: 13,
        height: 13, 
    }
})

export default MapPin;
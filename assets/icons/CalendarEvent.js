import { StyleSheet } from 'react-native';
import { SvgXml } from 'react-native-svg';




const CalendarEvent = ({ color = "#7F95E4" }) => {
    const svgMarkup =   `<svg xmlns="http://www.w3.org/2000/svg"  fill="none"><path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d="M3.778.903v1.645M8.222.903v1.645M1.278 4.79h9.444"/><path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" stroke-width=".9" d="M11 4.467v4.66c0 1.646-.833 2.742-2.778 2.742H3.778C1.833 11.87 1 10.773 1 9.128v-4.66c0-1.646.833-2.742 2.778-2.742h4.444C10.167 1.726 11 2.822 11 4.467Z"/><path stroke="${color}" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.2" d="M8.053 7.318h.005M8.053 8.963h.005M5.997 7.318h.006M5.997 8.963h.006M3.941 7.319h.005M3.941 8.963h.005"/></svg>`
    return <SvgXml xml={svgMarkup}  style={styles.icon} />; }



const styles = StyleSheet.create({
    icon: {
        marginRight: 10,
        width: 13,
        height: 13, 
    }
})

export default CalendarEvent;
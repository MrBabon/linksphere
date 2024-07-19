import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { s } from './HomeScreen.style';
import { TxtInria, TxtInriaBold } from '../../components/TxtInria/TxtInria';
import { TxtJostSemiBold } from '../../components/TxtJost/TxtJost';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};


interface NavigationProp {
  navigate: (screen: keyof RootStackParamList) => void;
}

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp>();

  return (
    <>
      <ImageBackground source={require('../../assets/images/background.jpg')} style={s.background_img} imageStyle={s.img}>
        <View style={s.container_name}>
          <TxtJostSemiBold style={s.name}>LinkSphere</TxtJostSemiBold>
        </View>
      </ImageBackground>
      <View style={s.btn_container}>
        <View style={s.container_login}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <TxtInriaBold>Login</TxtInriaBold>
          </TouchableOpacity>
        </View>
        <View style={s.container_sign}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <TxtInria style={s.txt_sign}>Sign Up</TxtInria>
          </TouchableOpacity>
        </View>
      </View>
      <View style={s.yellow}></View>
    </>
  );
};

export default HomeScreen;
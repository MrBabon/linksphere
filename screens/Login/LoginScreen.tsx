import { Button, Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { AuthContext } from '../../context/AuthContext';

import { TxtInria, TxtInriaBold } from '../../components/TxtInria/TxtInria';
import { TxtJostSemiBold } from '../../components/TxtJost/TxtJost';
import { StackNavigationProp } from '@react-navigation/stack';
import { useContext, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

type RootStackParamList = {
  Register: undefined;
  // Ajoutez d'autres routes ici si nécessaire
};

interface NavigationProp {
    navigate: (screen: keyof RootStackParamList) => void;
}


const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp>(); 
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const { isLoading, login } = useContext(AuthContext);

  const backButton = (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      {/* <ChevronLeft /> */}
    </TouchableOpacity>
  );

  const header = (
    <View style={s.header}>
      {backButton}
    </View>
  );

  return (
    <Container>
      {header}
      <View style={s.container}>
        <Spinner visible={isLoading} />
        <View style={s.logo}>
          <TxtJostSemiBold style={s.txtlogo}>Linksphere</TxtJostSemiBold>
        </View>
        <View style={s.wrapper}>
          <View style={s.label}>
            <TxtInriaBold style={s.txt}>Email</TxtInriaBold>
          </View>
          <TextInput
            style={s.input}
            value={email || ''}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={s.label}>
            <TxtInriaBold style={s.txt}>Password</TxtInriaBold>
          </View>
          <TextInput
            style={s.input}
            value={password || ''}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        <View style={s.btn}>
          <TouchableOpacity onPress={() => login(email, password)} style={s.log}>
            <TxtInriaBold style={s.logtxt}>Login</TxtInriaBold>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TxtInria>Don't have an account? </TxtInria>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <TxtInria style={s.link}>Sign Up</TxtInria>
          </TouchableOpacity>
        </View>
      </View>
    </Container>
  );
};

export default LoginScreen;
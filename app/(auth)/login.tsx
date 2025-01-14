import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, Switch } from "react-native";
import { ThemedTitle } from '@/components/ThemedTitle';
import { ThemedText } from '@/components/ThemedText';
import InputText from '@/components/ui/InputText'; 
import PasswordInput from '@/components/ui/PasswordInput'; 
import Button from '@/components/ui/Button'; 
import Link from '@/components/ui/Link';
import useSettings from '../../hooks/useSettings'; 
import LottieView from 'lottie-react-native';
import { useAuth } from '../../hooks/useAuth';
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function LoginScreen() {
  const router = useRouter();
  const { handleLogin, loading, error } = useAuth();
  const { language, theme, translation, colors } = useSettings(); 
  const { setItem } = useAsyncStorage('assetToken');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const onLogin = async () => {
    try {
      const data = await handleLogin(email, password);
      console.log('Login Success:', data);

      if (data?.accessToken) {
        await setItem(data.accessToken); 
      }

      router.replace("/home");
    } catch (err) {
      console.error('Login Failed');
      console.error(err);
    }
  };

  const onLoginWithGoogle = () => {
    console.log('Login with Google');
  }

  const onLoginWithFacebook = () => {
    console.log('Login with Facebook');
  }

  const handleSignUp = () => {
    router.replace("/(auth)/register");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <View style={styles.background}>
            <LottieView  
              style={styles.lottie}
              source={require('../../assets/gifs/plant-background.json')} 
              autoPlay 
              loop />
            <ThemedTitle style={[styles.title, { color: colors.title }]}> 
                {translation.loginText || 'Login'}
            </ThemedTitle>
              
            <View style={styles.formContainer}>
                <InputText
                    label={translation.emailLabel || 'Email'}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={translation.emailPlaceholder || 'Enter your email'}
                    lightColor="#333"
                    darkColor="#fff"
                    icon="email" 
                />
                <PasswordInput
                    label={translation.passwordLabel || 'Password'}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={translation.passwordPlaceholder || 'Enter your password'}
                    lightColor="#333"
                    darkColor="#fff"
                />
                <View style={styles.forgetAndRememberContainer}>
                <View style={styles.rememberMeContainer}>
                    <Switch 
                      value={rememberMe} 
                      onValueChange={setRememberMe} 
                      trackColor={{ false: "#767577", true: colors.tabIconSelected }}
                      thumbColor={rememberMe ? colors.tabIconSelected : colors.tabIconDefault} 
                    />
                    <Text style={{ color: colors.text2 }}>
                      {translation.rememberMeText || 'Remember me'}
                    </Text>
                  </View>

                  <Link
                      title={translation.forgetPasswordLabel || 'Forgot password?'}
                      onPress={() => console.log('Forgot password')}
                      textColor={colors.link}
                  />
                </View>

                <Button
                    title={translation.loginButtonText || 'Login'}
                    onPress={onLogin} 
                    color={colors.button} 
                    textColor={colors.text} 
                />
                <Text style={{textAlign: 'center'}}>{translation.or}</Text>
                
                <Button
                    title={translation.googleButtonText || 'Login with Google'}
                    onPress={onLoginWithGoogle} 
                    color={colors.button2} 
                    textColor={colors.text2} 
                    icon={require('../../assets/images/Google.png')}
                />
                
                <Button
                    title={translation.facebookButtonText || 'Login with Facebook'}
                    onPress={onLoginWithFacebook} 
                    color={colors.button2} 
                    textColor={colors.text2} 
                    icon={require('../../assets/images/Facebook.png')}
                />
                <View style={styles.signUpContainer}>
                  <ThemedText style={{ color: colors.text2 }}>
                    {translation.noAccountText || "Don't have an account?"}
                  </ThemedText>
                  <Link
                    title={translation.signUpText || 'Sign up here'}
                    onPress={handleSignUp}
                    textColor={colors.link}
                    style={styles.signUpLink}
                  />
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  container: {
    paddingTop: 60,
    alignItems: 'center',
  },
  lottie: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    bottom: 20,
    marginTop: 120
  },
  formContainer: {
    width: '90%',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff80', 
    marginTop: 30,
    marginBottom: 20,
  },
  forgetAndRememberContainer: {
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', 
    marginVertical: 10,
    marginHorizontal: 15,
  },
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signUpContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signUpLink: {
    marginLeft: 5,
  },
});

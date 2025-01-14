import React, { useState } from "react";
import { useRouter } from "expo-router";
import { View, Text, StyleSheet, SafeAreaView, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { ThemedTitle } from '@/components/ThemedTitle';
import { ThemedText } from '@/components/ThemedText';
import InputText from '@/components/ui/InputText'; 
import PasswordInput from '@/components/ui/PasswordInput'; 
import Button from '@/components/ui/Button'; 
import Link from '@/components/ui/Link';
import useSettings from '../../hooks/useSettings'; 
import LottieView from 'lottie-react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const { language, theme, translation, colors } = useSettings(); 
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    console.log('Email:', email, 'Password:', password);
  };

  const handleSignIn = () => {
    router.replace("/(auth)/login");
  };

  return (
    <SafeAreaView style={styles.safeArea}>
        <LottieView  
          style={styles.lottie}
          source={require('../../assets/gifs/plant-background.json')} 
          autoPlay 
          loop />
        <ScrollView contentContainerStyle={styles.background} showsVerticalScrollIndicator={false}>
              <ThemedTitle style={[styles.title, { color: colors.title }]}> 
                  {translation.registerText || 'Register'}
              </ThemedTitle>
            <View style={styles.formContainer}>
                <InputText
                    label={translation.fullNameLabel || 'Full Name'}
                    value={fullName}
                    onChangeText={setFullName}
                    placeholder={translation.fullNamePlaceholder || 'Enter your full name'}
                    lightColor="#333"
                    darkColor="#fff"
                    icon="person"
                />                
                <InputText
                    label={translation.emailLabel || 'Email'}
                    value={email}
                    onChangeText={setEmail}
                    placeholder={translation.emailPlaceholder || 'Enter your email'}
                    lightColor="#333"
                    darkColor="#fff"
                    icon="email" 
                />
                <InputText
                    label={translation.usernameLabel || 'Username'}
                    value={username}
                    onChangeText={setUsername}
                    placeholder={translation.usernamePlaceholder || 'Enter your username'}
                    lightColor="#333"
                    darkColor="#fff"
                    icon="face"
                />
                <PasswordInput
                    label={translation.passwordLabel || 'Password'}
                    value={password}
                    onChangeText={setPassword}
                    placeholder={translation.passwordPlaceholder || 'Enter your password'}
                    lightColor="#333"
                    darkColor="#fff"
                />
                <PasswordInput
                    label={translation.confirmPasswordLabel || 'Confirm Password'}
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    placeholder={translation.confirmPasswordPlaceholder || 'Enter your password again'}
                    lightColor="#333"
                    darkColor="#fff"
                />
                 <Button
                    title={translation.loginButtonText || 'Login'}
                    onPress={handleRegister} 
                    color={colors.button} 
                    textColor="#fff" 
                />
                <View style={styles.signInContainer}>
                  <ThemedText style={{ color: colors.text2 }}>
                    {translation.haveAccountText || 'Already have an account?'}
                  </ThemedText>
                  <Link
                    title={translation.signInText || 'Sign in here'}
                    onPress={handleSignIn}
                    textColor={colors.link}
                    style={styles.signInLink}
                  />
                </View>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  background: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 20,
  },
  lottie: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 20,
    marginTop: 120
  },
  formContainer: {
    width: '90%',
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#ffffff80', 
    marginTop: 20,
    marginBottom: 30,
    overflow: 'hidden',
  },
  signInContainer: {
    marginVertical: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  signInLink: {
    marginLeft: 5,
  },
});

  import React, { useEffect } from 'react';
  import { useRouter } from "expo-router";
  import { View, Text } from 'react-native';
  import Button from '@/components/ui/Button'; 
  import useSettings from '@/hooks/useSettings'; 
  import { useAuth } from '../hooks/useAuth';
  import Toast from 'react-native-toast-message';
  import ToastHelper from '@/utils/ToastHelper';
import { SafeAreaView } from 'react-native-safe-area-context';

  export default function HomeScreen() {
    const router = useRouter();
    const { language, theme, translation, colors } = useSettings(); 
    const { handleLogout, userInfo} = useAuth();

    useEffect(() => {
      userInfo()
        .then((user) => {
          if (user?.fullName) {
            ToastHelper.showSuccess(
              translation.loginSuccess || 'Login Success',
              translation.welcomeBack + user.fullName || 'Welcome back, ' + user.fullName
            );
          }
        })
        .catch((error) => {
          router.replace("/(auth)/login");
        });
    }, [userInfo, translation]);
    
    const onLogout = async () => {
      try {
        await handleLogout();

        router.replace("/(auth)/login");
      } catch (err) {
        console.error('Logout Failed');
        console.error(err);
      }
    };

    return (
      <SafeAreaView>
        <Text>Home</Text>
        <Button
          title={translation.logoutButtonText || 'Logout'}
          onPress={onLogout} 
          color={colors.button} 
          textColor="#fff"/>
        <Toast/>
      </SafeAreaView>
    );
  }

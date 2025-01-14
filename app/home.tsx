import React from 'react';
import { useRouter } from "expo-router";
import { View, Text } from 'react-native';
import Button from '@/components/ui/Button'; 
import useSettings from '@/hooks/useSettings'; 
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  const router = useRouter();
  const { language, theme, translation, colors } = useSettings(); 
  const { removeItem } = useAsyncStorage('assetToken'); 

  const onLogout = async () => {
    try {
      await removeItem();
      console.log('Logout Success');

      router.replace("/(auth)/login");
    } catch (err) {
      console.error('Logout Failed');
      console.error(err);
    }
  };

  return (
    <View>
      <Text>Home</Text>
      <Button
        title={translation.logoutButtonText || 'Logout'}
        onPress={onLogout} 
        color={colors.button} 
        textColor="#fff" 
    />
    </View>
  );
}

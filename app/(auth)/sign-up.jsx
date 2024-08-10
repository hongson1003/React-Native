import { Alert, Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton'
import { Link, router } from 'expo-router';
import { createUser } from '../../lib/appwrite';

const SignUpScreen = () => {

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleOnPress = async () => {
    // validate
    if (!form.username || !form.email || !form.password) {
      Alert('Please fill all fields');
      return;
    }

    try {
      setIsSubmitting(true);
      const { username, email, password } = form;
      const user = await createUser(email, password, username);
      setIsSubmitting(false);
      if (user)
        router.push('/home');
      else
        Alert('Sign up failed');
    } catch (error) {
      setIsSubmitting(false);
    }
  }

  return (
    <SafeAreaView className="h-full bg-primary px-2">
      <ScrollView contentContainerStyle={{
        height: '100%',
      }}>
        <View className="flex-1 justify-center">
          <Image
            className="w-28"
            source={images.logo}
            resizeMode='contain'
          />
          <Text className="text-white font-pmedium text-xl">Sign up to HongSon</Text>
          <FormField
            title="Username"
            onChangeText={(text) => setForm({ ...form, username: text })}
          />
          <FormField
            title="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <FormField
            title="Password"
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <CustomButton
            title="Sign Up"
            containerStyle="mt-5 rounded-md bg-orange-400"
            isLoading={isSubmitting}
            onPress={handleOnPress}
          />
          <Text className="text-white mt-5 text-center">You have account already <Link href={'/sign-in'} className="text-orange-400">Sign in</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({})
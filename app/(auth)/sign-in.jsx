import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { images } from "../../constants";
import FormField from '../../components/formField';
import CustomButton from '../../components/customButton'
import { Link } from 'expo-router';
import { signIn } from '../../lib/appwrite';

const SignInScreen = () => {

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  const handleOnPress = async () => {
    // validate
    if (!form.email || !form.password) {
      alert('Please fill all fields')
      return
    }

    try {
      setIsSubmitting(true)
      const { email, password } = form
      const session = await signIn(email, password)
      setIsSubmitting(false)
      if (session)
        router.push('/home')
      else
        alert('Sign in failed')
    } catch (error) {
      setIsSubmitting(false)
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
          <Text className="text-white font-pmedium text-xl">Sign in to HongSon</Text>
          <FormField
            title="Email"
            onChangeText={(text) => setForm({ ...form, email: text })}
          />
          <FormField
            title="Password"
            onChangeText={(text) => setForm({ ...form, password: text })}
          />
          <CustomButton
            title="Sign In"
            containerStyle="mt-5 rounded-md bg-orange-400"
            isLoading={isSubmitting}
            onPress={handleOnPress}
          />
          <Text className="text-white mt-5 text-center">Don't have an account? <Link href={'/sign-up'} className="text-orange-400">Sign up</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignInScreen

const styles = StyleSheet.create({})
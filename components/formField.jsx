import React, { useState } from 'react'
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { icons } from '../constants'

const FormField = ({
    title,
    placeholder,
    value,
    onChangeText,
}) => {
    const [isShowPassword, setIsShowPassword] = useState(false)

    const handleOnPress = () => {
        setIsShowPassword(prev => !prev)
    }
    return (
        <View className="mt-7">
            <Text className="text-white">{title}</Text>
            <View className="h-12 mt-2 w-full bg-slate-800 focus:border-orange-400 border rounded-md px-4 flex-row items-center">
                <TextInput
                    placeholder={placeholder}
                    value={value}
                    onChangeText={onChangeText}
                    secureTextEntry={title === 'Password' && !isShowPassword}
                    className="flex-1 text-white bg-bg-slate-800"
                    style={{ outline: 'none' }}
                />
                {title === 'Password' && (
                    <TouchableOpacity onPress={handleOnPress}>
                        <Image
                            source={isShowPassword ? icons.eye : icons.eyeHide}
                            className="w-6 h-6"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    )
}

export default FormField

const styles = StyleSheet.create({})
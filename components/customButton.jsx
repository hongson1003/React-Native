import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

const CustomButton = ({ title, containerStyle, onPress, isLoading }) => {
    return (
        <TouchableOpacity
            className={`w-full h-[50px] justify-center items-center bg-orange-400 ${containerStyle}`}
            onPress={onPress}
            disabled={isLoading}
        >
            <Text className="font-pbold">
                {title}
            </Text>
        </TouchableOpacity >
    )
}

export default CustomButton

const styles = StyleSheet.create({})
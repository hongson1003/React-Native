import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { images } from '../constants'
import CustomButton from './customButton'

const EmptyVideo = ({ title, subTitle }) => {
    return (
        <View className="my-3">
            <Image
                source={images.empty}
                resizeMode='contain'
                className="w-56 h-56 mx-auto"
            />
            <View className="space-y-1">
                <Text className="text-white text-center font-plight text-xl">{title}</Text>
                <Text className="text-white text-center font-pthin text-xs">{subTitle}</Text>
            </View>
            <CustomButton
                title={'Explore'}
                containerStyle={"mt-3 rounded-lg"}
                onPress={() => alert('Explore')}
            />
        </View>
    )
}

export default EmptyVideo;

const styles = StyleSheet.create({})
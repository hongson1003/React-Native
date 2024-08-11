import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { icons } from '../constants'
import { ResizeMode, Video } from 'expo-av'

const VideoCard = ({ data }) => {
    const [isPlaying, setIsPlaying] = React.useState(false)
    return (
        <View className="my-2 gap-y-4">
            <View className="flex-row items-center gap-2">
                <Image
                    source={{
                        uri: data?.creator?.avatar
                    }}
                    className="w-10 h-10 rounded-full"
                    resizeMode='contain'
                />
                <View className="justify-center flex-1">
                    <Text className="text-white font-pbold w-full" numberOfLines={1}>{data?.title}</Text>
                    <Text className="text-gray-500 font-plight">{data?.creator?.username}</Text>
                </View>
            </View>

            {
                isPlaying ? (
                    <Video
                        source={{ uri: data.video }}
                        shouldPlay
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setIsPlaying(false);
                            }
                        }}
                        className="aspect-video"
                    />
                ) : (
                    <TouchableOpacity
                        className="relative"
                        onPress={() => setIsPlaying(true)}
                    >
                        <Image
                            source={{
                                uri: data?.thumbnail
                            }}
                            className="w-full h-48 rounded-xl"
                            resizeMode='contain'
                        />
                        <Image
                            source={icons.play}
                            className="w-12 h-12 left-1/2 top-1/2 absolute transform -translate-x-6 -translate-y-6"
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                )
            }
        </View>
    )
}

export default VideoCard

const styles = StyleSheet.create({})
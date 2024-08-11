import React, { useRef } from 'react';
import { FlatList, Image, ImageBackground, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { icons } from '../constants';
import { ResizeMode, Video } from 'expo-av';

const zoomIn = {
    0: {
        scale: 0.9,
    },
    1: {
        scale: 1.05
    },
}

const zoomOut = {
    0: {
        scale: 1,
    },
    1: {
        scale: 0.9,
    },
}

const TrendingItem = ({ item, activeItem }) => {
    const [isPlaying, setIsPlaying] = React.useState(false);
    return (
        <Animatable.View
            animation={item.$id === activeItem ? zoomIn : zoomOut}
            duration={500}
            style={{ marginHorizontal: 10 }}
        >
            {
                isPlaying ? (
                    <Video
                        source={{ uri: item.video }}
                        style={{ width: 150, height: 200 }}
                        shouldPlay
                        resizeMode={ResizeMode.CONTAIN}
                        useNativeControls
                        onPlaybackStatusUpdate={(status) => {
                            if (status.didJustFinish) {
                                setIsPlaying(false);
                            }
                        }}
                    />
                ) : (
                    <TouchableOpacity onPress={() => setIsPlaying(true)}>
                        <ImageBackground
                            source={{ uri: item.thumbnail }}
                            style={{ width: 150, height: 200 }}
                            className="rounded-2xl overflow-hidden my-3"
                            resizeMode='cover'
                        />

                        <Image
                            source={icons.play}
                            className="absolute top-1/2 left-1/2 transform -translate-x-5 -translate-y-5 w-10 h-10"
                        />
                    </TouchableOpacity>
                )
            }
        </Animatable.View >

    )
}

const TrendingVideo = ({ data }) => {
    const [activeItem, setActiveItem] = React.useState(data[0]);

    const onViewableItemsChanged = useRef(({ viewableItems }) => {
        if (viewableItems.length > 0) {
            setActiveItem(viewableItems[0].item);
        }
    }).current;

    return (
        <FlatList
            data={data}
            horizontal
            keyExtractor={(item) => item.$id}
            renderItem={({ item }) => (
                <TrendingItem item={item} activeItem={activeItem.$id} />
            )}
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={{
                itemVisiblePercentThreshold: 70,
            }}
            contentOffset={{ x: 170 }}
        />
    )
}

export default TrendingVideo;

const styles = StyleSheet.create({});

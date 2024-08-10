import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const TrendingVideo = ({ data }) => {
    return (
        <FlatList
            data={data}
            horizontal
            renderItem={({ item }) => (
                <View>
                    <Text className="text-white">{item.title}</Text>
                </View>
            )}
        />
    )
}

export default TrendingVideo

const styles = StyleSheet.create({})
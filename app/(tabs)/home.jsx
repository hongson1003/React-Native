import { FlatList, Image, RefreshControl, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react';
import { images } from '../../constants'
import { icons } from '../../constants'
import TrendingVideo from '../../components/trendingVideo';
import VideoCard from '../../components/videoCard';
import EmptyVideo from '../../components/emptyVideo';

const data = [
  // {
  //   id: '1',
  //   title: 'First Item',
  // },
  // {
  //   id: '2',
  //   title: 'Second Item',
  // },
  // {
  //   id: '3',
  //   title: 'Third Item',
  // }
]

const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleOnRefresh = () => {

  }

  return (
    <SafeAreaView className="bg-primary px-3 py-6"
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <VideoCard data={item} />
        )}
        keyExtractor={item => item.id}
        ListHeaderComponent={() => (
          <View>
            <View className="flex-row justify-between items-center">
              <View>
                <Text className="text-sm font-plight text-white">Welcome Back</Text>
                <Text className="text-xl font-pblack text-white">JSMastery</Text>
              </View>
              <Image
                source={images.logoSmall}
                className="w-8 h-8"
              />
            </View>
            <View className="h-12 border-zinc-700 border mt-5 rounded-xl px-4 flex-row items-center">
              <TextInput
                placeholder="Search for a video or a playlist"
                placeholderTextColor="text-zinc-400"
                className="bg-secondary text-white rounded-lg flex-1 font-extralight"
                style={{ outline: 'none' }}
              />
              <Image
                source={icons.search}
                className="w-5 h-5"
              />
            </View>
            <Text className="text-white mt-5 font-plight">Lasted Videos</Text>
            <TrendingVideo data={data} />
          </View >
        )}
        ListEmptyComponent={() => (
          <EmptyVideo
            title={'No videos found'}
            subTitle={'Please try again later'}
          />
        )}
        refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={handleOnRefresh} />}
      />
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
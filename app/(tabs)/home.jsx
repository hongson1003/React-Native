import React, { useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, StyleSheet, Text, TextInput, View } from 'react-native';
import EmptyVideo from '../../components/emptyVideo';
import VideoCard from '../../components/videoCard';
import { icons, images } from '../../constants';
import { getAllPosts, getLastedPosts } from '../../lib/appwrite';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrendingVideo from '../../components/trendingVideo';

const HomeScreen = () => {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [data, setData] = useState([])
  const [lastedVideo, setLastedVideo] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = async () => {
    setIsLoading(true)
    try {
      const response = await getAllPosts();
      console.log(response)
      setData(response);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLastedVideos = async () => {
    setIsLoading(true)
    try {
      const response = await getLastedPosts();
      setLastedVideo(response);
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData();
    fetchLastedVideos();
  }, [])

  const handleOnRefresh = () => {
    setIsRefreshing(true)
    fetchData()
    setIsRefreshing(false)
  }

  return (
    <SafeAreaView className="bg-primary px-3 py-6 max-h-full"
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <VideoCard data={item} />
        )}
        showsVerticalScrollIndicator={false}
        keyExtractor={item => item.$id}
        ListHeaderComponent={() => (
          <View className="mb-5">
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
                placeholderTextColor="#ffffff"
                className="bg-secondary text-white rounded-lg flex-1 font-extralight h-full"
                style={{ outline: 'none' }}
              />
              <Image
                source={icons.search}
                className="w-5 h-5"
              />
            </View>
            <Text className="text-white mt-5 mb-2 font-plight">Lasted Videos</Text>
            <TrendingVideo data={lastedVideo} />
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
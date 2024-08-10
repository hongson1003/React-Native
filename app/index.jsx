import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/customButton";
import { images } from "../constants";
import { useGlobalContext } from "../context/GlobalProvider";

const FirstScreen = () => {

    const { isLoading, isLogggedIn } = useGlobalContext();

    const handleOnPress = () => {
        router.push('/sign-in');
    }

    useEffect(() => {
        if (!isLoading && isLogggedIn) {
            router.push('/home');
        }
    }, [isLoading, isLogggedIn]);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{
                height: '100%',
            }}>
                <View className="w-full items-center h-full px-4">
                    <Image
                        source={images.logo}
                        resizeMode="contain"
                        className="w-28 h-28"
                    />
                    <Image
                        source={images.cards}
                        resizeMode="contain"
                        className="w-full max-h-[250px]"
                    />
                    <View className="mt-5">
                        <Text className="text-2xl text-white font-bold text-center">
                            Discover the best events in your city with {''}
                            <Text className="text-2xl text-amber-400">
                                HongSon
                            </Text>
                        </Text>

                        <Image
                            source={images.path}
                            className="w-[120px] h-6 absolute -bottom-4 -right-0"
                            resizeMode="contain"
                        />
                    </View>
                    <Text className="text-white mt-7 text-center font-pthin text-xs">
                        Where creativity and innovation meet. HongSon is a platform for creators to showcase their work and connect with others.
                    </Text>
                    <CustomButton
                        containerStyle="mt-5 w-full rounded-xl"
                        title="Continue with Email"
                        onPress={handleOnPress}
                    />
                </View>
                <StatusBar style="light" />
            </ScrollView>
        </SafeAreaView>
    )
}

export default FirstScreen;

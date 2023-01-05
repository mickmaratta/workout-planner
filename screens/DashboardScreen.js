import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import React from "react";
import { LinearGradient } from "react-native-svg";
import { ArrowLeftOnRectangleIcon, PencilSquareIcon } from "react-native-heroicons/outline";
import { ArrowLeftCircleIcon } from "react-native-heroicons/solid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";

const DashboardScreen = ({navigation}) => {
  const completedWorkouts = useSelector((state) => state.workout.completedWorkouts);
  const [longestWorkout, setLongestWorkout] = useState(0)
  const [averageWorkout, setAverageWorkout] = useState(0)

  useEffect(() => {
    for(let i=0; i<completedWorkouts.length; i++) {
      let time = (completedWorkouts[i].workoutLength.minutes*60) + (completedWorkouts[i].workoutLength.seconds)
      if (time > longestWorkout) {
        setLongestWorkout(time)
      }
      i++;
    };
    setAverageWorkout(completedWorkouts.reduce((a, b) => (((a.workoutLength.minutes*60)+a.workoutLength.seconds)) + ((b.workoutLength.minutes*60)+b.workoutLength.seconds)))
  }, [completedWorkouts]);

  console.log(averageWorkout);

  return (
    <SafeAreaView className="bg-sky-50 flex-1 w-full">
      <View className="items-center justify-center relative mb-3">
      <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}
          className="absolute top-3 left-2"
        >
          <ArrowLeftCircleIcon size={35} color="skyblue" />
        </TouchableOpacity>
        <Text className="text-4xl text-slate-600 m-2  font-bold">
          Dashboard
        </Text>
      </View>
      <View className="bg-white flex-1 pb-3 items-center">
        <Text className="text-3xl my-5 text-center font-bold text-slate-700">Your Stats</Text>
        <View className="items-center mb-26 mb-32 justify-evenly w-[85%] flex-1">
          <View className="bg-sky-200 w-full h-28 rounded-md items-center justify-center my-3">
            <Text className="text-2xl font-bold text-slate-700">Number of Workouts:</Text>
            <Text className="text-xl">{completedWorkouts.length}</Text>
          </View>
          <View className="bg-blue-200 w-full h-28 rounded-md items-center justify-center my-3">
            <Text className="text-2xl font-bold text-slate-700">Longest Workout:</Text>
            <Text className="text-xl">{(longestWorkout - longestWorkout%60) / 60}:{`${longestWorkout%60 > 9 ? longestWorkout%60 : `0${longestWorkout%60}`}`}</Text>
          </View>
          <View className="bg-indigo-200 w-full h-28 rounded-md items-center justify-center my-3">
            <Text className="text-2xl font-bold text-slate-700">Average Workout:</Text>
            <Text className="text-xl">20:33</Text>
          </View>
        </View>
      </View>
       {/* FOOTER */}
      <View className="h-16 bg-sky-50 relative items-center justify-between flex-row px-4">
        <TouchableOpacity onPress={() => signOut(auth)}>
          <ArrowLeftOnRectangleIcon color="skyblue" size={25} />
        </TouchableOpacity>
        <Text className="text-gray-500">
          4Workouts
        </Text>
        <TouchableOpacity onPress={() => navigation.navigate("Add")}>
          <PencilSquareIcon color="skyblue" size={25} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DashboardScreen;

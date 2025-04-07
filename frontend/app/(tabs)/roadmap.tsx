import { defaultUser, getUserRoadmap } from "@/api"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useEffect, useState } from "react"
import { ScrollView, Text, View } from "react-native"
import StepCard from "@/components/StepCard"
import { CardView } from "@/components/CardView"
import { pageStyles } from "@/components/styles"

export default function RoadMap() {
    async function userId() {
        var id = null;
        try {
            id = await AsyncStorage.getItem("id")
        } catch (error) {
            console.log("Error in Retrieving userId at Roadmap Page");
        }
        return id
    }
    const [roadMap, setRoadMap] = useState<ROADMAP>()
    useEffect(() =>{
        const id = Number(userId());
        setRoadMap(getUserRoadmap(id));
    }, [])

    return (
    <ScrollView>
        <Text style={pageStyles.titleText}>로드맵 페이지</Text>
        {roadMap?.steps.map((step) => (
        <View>
            <StepCard step={step} />
        </View>
        ))}
    </ScrollView>
    )
}
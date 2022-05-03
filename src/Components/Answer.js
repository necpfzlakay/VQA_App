import react from "react";
import { Text, View } from "react-native";

const Answer = () => {
    return (
        <View style={{
            flex: 1, backgroundColor: 'silver', margin: 15,
            borderRadius: 25, alignItems: 'center', justifyContent: 'center'
        }}>
            <Text style={{ fontSize: 25 }}>Answers</Text>
            <Text style={{}}>
                Your answers will be here!
            </Text>
        </View>
    )
}

export default Answer;
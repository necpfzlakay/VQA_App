import react from "react";
import { Text, View } from "react-native";

const Question = () => {
    return (
        <View style={{
            flex: 1, backgroundColor: 'silver', margin: 15,
            borderRadius: 25, alignItems: 'center', justifyContent:'center'
        }}>
            <Text style={{ fontSize: 25 }}> Ask a question</Text>
            <Text style={{}}>
                First Upload an image
            </Text>
        </View>
    )
}

export default Question;
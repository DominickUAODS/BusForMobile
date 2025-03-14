import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function RacesScreen({ route }: any): React.ReactElement {
    {console.log(JSON.stringify(route.params))}
    return (
        <SafeAreaView>
            <Text>Params:</Text>
            <Text>{JSON.stringify(route.params)}</Text>
            
        </SafeAreaView>
    );
}

export default RacesScreen;

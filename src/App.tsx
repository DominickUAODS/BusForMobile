import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RacesScreen from "./screens/RacesScreen";

const routeIcons: any = {
  "Search": "search",
  "Tickets": "confirmation-number",
  "Contacts": "headset-mic",
  "Profile": "person"
}

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
const SearchScreens = () => (
  <Stack.Navigator
    screenOptions={({}) => ({
      headerStyle: {
        backgroundColor: "rgb(249, 37, 63)",
      },
      headerTintColor: "white"
    })}>
    <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    <Stack.Screen name="Races" component={RacesScreen} options={{ headerTitle: "Рейси" }} />
  </Stack.Navigator>
)

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name={routeIcons[route.name] ?? "question-mark"} size={size} color={color} />
          },
          statusBarBackgroundColor: "rgb(249, 37, 63)",
          tabBarActiveTintColor: "rgb(249, 37, 63)",
          tabBarInactiveTintColor: "gray",
          headerShown: false
        })}
      >
        <Tab.Screen name="Search" component={SearchScreens} />
        <Tab.Screen name="Tickets" component={() => <Text>todo tickets</Text>} />
        <Tab.Screen name="Contacts" component={() => <Text>todo contacts</Text>} />
        <Tab.Screen name="Profile" component={() => <Text>todo profile</Text>} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

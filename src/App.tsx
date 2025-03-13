import { Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { HomeScreen } from "./screens/HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RacesScreen from "./screens/RacesScreen";
import { PlaceholderScreen } from "./screens/PlaceholderScreen";

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

const TicketsScreens = () => (
  <Stack.Navigator
    screenOptions={({}) => ({
      headerStyle: {
        backgroundColor: "rgb(249, 37, 63)",
      },
      headerTintColor: "white"
    })}>
    <Stack.Screen name="YourTickets" component={PlaceholderScreen} options={{ headerTitle: "Мої поїздки" }} />
  </Stack.Navigator>
)

const ContactsScreens = () => (
  <Stack.Navigator
    screenOptions={({}) => ({
      headerStyle: {
        backgroundColor: "rgb(249, 37, 63)",
      },
      headerTintColor: "white"
    })}>
    <Stack.Screen name="ContactOutContacts" component={PlaceholderScreen} options={{ headerTitle: "Контакти" }} />
  </Stack.Navigator>
)

const ProfileScreens = () => (
  <Stack.Navigator
    screenOptions={({}) => ({
      headerStyle: {
        backgroundColor: "rgb(249, 37, 63)",
      },
      headerTintColor: "white"
    })}>
    <Stack.Screen name="YourProfile" component={PlaceholderScreen} options={{ headerTitle: "Профіль" }} />
  </Stack.Navigator>
)

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          statusBarBackgroundColor: "rgb(249, 37, 63)",
          tabBarIcon: ({ color, size }) => {
            return <MaterialIcons name={routeIcons[route.name] ?? "question-mark"} size={size} color={color} />
          },
          tabBarActiveTintColor: "rgb(249, 37, 63)",
          headerShown: false
        })}
      >
        <Tab.Screen name="Search" component={SearchScreens} options={{ title: "Пошук" }} />
        <Tab.Screen name="Tickets" component={TicketsScreens} options={{ title: "Мої поїздки" }} />
        <Tab.Screen name="Contacts" component={ContactsScreens} options={{ title: "Контакти" }} />
        <Tab.Screen name="Profile" component={ProfileScreens} options={{ title: "Профіль" }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default App;

import { useEffect, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { scale } from "react-native-size-matters";
import Race from "../interfaces/Race";
import { BusforCard } from "../components/BusforCard";
import Page from "../interfaces/Page";
import { API_SERVER } from "@env";
import City from "../interfaces/City";
import CustomLoading from "../components/CustomLoading";
import { useNavigation } from "@react-navigation/native";

interface RouteParams {
    city_from: number,
    city_to: number,
    date: Date,
    passengers: number
}

function RacesScreen({ route }: any): React.ReactElement {
    const { city_from, city_to, date, passengers }: RouteParams = route.params;
    
    const date_start: Date = new Date(date);
    date_start.setHours(0, 0, 0, 0);
    const date_end: Date = new Date(date);
    date_end.setHours(23, 59, 59, 999);

    const [races, setRaces] = useState<Race[]>([]);
    const [cityFrom, setCityFrom] = useState<City>();
    const [cityTo, setCityTo] = useState<City>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const navigation = useNavigation<any>();

    const fetchCities = async () => {
        setIsLoading(true);
        try {
            const response: Response = await fetch(`${API_SERVER}/cities/${city_from}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const city_from_as_obj: City = await response.json();
            setCityFrom(city_from_as_obj);
        } catch (error) {
            console.error(error);
        }
        try{
            const response: Response = await fetch(`${API_SERVER}/cities/${city_to}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const city_to_as_obj: City = await response.json();
            setCityTo(city_to_as_obj);
            navigation.setOptions({ title: `${city_to_as_obj.name_ua} - ${city_to_as_obj.name_ua}` })
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }

    const fetchRaces = async () => {
        try {
            const response: Response = await fetch(
                `${API_SERVER}/races/?${new URLSearchParams({
                    city_from: city_from.toString(),
                    city_to: city_to.toString(),
                    time_start_after: date_start.toISOString(),
                    time_start_until: date_end.toISOString(),
                    min_places: passengers.toString()})
                }`
            );
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const page: Page<Race> = await response.json();
            const newRaces: Race[] = page.results;
            setRaces(newRaces);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchCities();
        fetchRaces();
    }, [route.params])

    return (
        <View style={styles.container}>
            <Text style={styles.introText}>Виїзд та прибуття за місцевим часом</Text>
            <Text style={styles.introText}>ПРЯМІ РЕЙСИ</Text>
            <Text style={{color: 'red', fontWeight: 'bold'}}>IMPORTANT: only 1st page is shown, pagination is to be implemented</Text>
            {isLoading && (
                <View style={{ alignItems: "center", flex: 1 }}>
                    <CustomLoading />
                </View>
            )}
            {cityFrom && cityTo && !isLoading && (
                <FlatList
                    data={races}
                    renderItem={({item}) => (
                        <BusforCard
                            timeFrom={item.time_start}
                            timeTo={item.time_end}
                            locationFrom={cityFrom.name_ua} 
                            locationTo={cityTo.name_ua}
                            cost={item.cost}
                            places={item.places}
                        />
                    )}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.racesContainer}
                />
            )}
        </View>
    );
}

export default RacesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: scale(5),
    padding: scale(5)
  },
  introText: {
    fontSize: scale(12),
    color: 'gray'
  },
  racesContainer: {
    gap: scale(10)
  }
})
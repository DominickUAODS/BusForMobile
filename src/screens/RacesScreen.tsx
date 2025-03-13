import { useEffect, useRef, useState } from "react";
import { Text, StyleSheet, View, FlatList } from "react-native";
import { scale } from "react-native-size-matters";
import Race from "../interfaces/Race";
import { BusforCard } from "../components/BusforCard";
import Page from "../interfaces/Page";
import { API_SERVER } from "@env";
import City from "../interfaces/City";
import CustomLoading from "../components/CustomLoading";
import uaMonthNames from "../ua_localizers/uaMonthNames";
import getUaPassengersCountName from "../ua_localizers/getUaPassengersCountName";

interface RouteParams {
    city_from: number,
    city_to: number,
    date: string,
    passengers: number
}

function RacesScreen({ navigation, route }: any): React.ReactElement {
    const { city_from, city_to, date, passengers }: RouteParams = route.params;

    const date_start: Date = new Date(date);
    date_start.setHours(0, 0, 0, 0);
    const date_end: Date = new Date(date);
    date_end.setHours(23, 59, 59, 999);

    const [pageNum, setPageNum] = useState<number>(1);
    const [allRaces, setAllRaces] = useState<boolean>(false);
    const [races, setRaces] = useState<Race[]>([]);
    const [cityFrom, setCityFrom] = useState<City>();
    const [cityTo, setCityTo] = useState<City>();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const listRef: any = useRef<FlatList>();
    const listScrollPosition = useRef(0);

    const fetchCities = async () => {
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
        try {
            const response: Response = await fetch(`${API_SERVER}/cities/${city_to}`);
            if (!response.ok) {
                const error: Error = await response.json();
                throw error;
            }
            const city_to_as_obj: City = await response.json();
            setCityTo(city_to_as_obj);
        } catch (error) {
            console.error(error);
        }
    }

    const fetchRaces = async () => {
        if (!allRaces) {
            if (races.length === 0) {
                setIsLoading(true);
            }
            try {
                const response: Response = await fetch(
                    `${API_SERVER}/races/?${new URLSearchParams({
                        city_from: city_from.toString(),
                        city_to: city_to.toString(),
                        time_start_after: date_start.toISOString(),
                        time_start_until: date_end.toISOString(),
                        min_places: passengers.toString(),
                        page: pageNum.toString()})
                    }`
                );
                if (!response.ok) {
                    const error: Error = await response.json();
                    throw error;
                }
                const page: Page<Race> = await response.json();
                if (!page.next) {
                    setAllRaces(true);
                }
                const newRaces: Race[] = page.results;
                setRaces((prev) => [...prev, ...newRaces]);
                setPageNum((value) => value + 1);
            } catch (error) {
                setAllRaces(true);
                console.error(error);
            } finally {
                setIsLoading(false);
            }
        }
    };

    useEffect(() => {
        fetchCities();
        fetchRaces();
    }, [])

    useEffect(() => {
        if (cityFrom && cityTo) {
            navigation.setOptions({headerTitle: () => (
                <View>
                    <Text style={styles.headerTitle}>{`${cityFrom.name_ua} - ${cityTo.name_ua}`}</Text>
                    <Text style={styles.headerSubtitle}>{`${date_start.getDate()} ${uaMonthNames[date_start.getMonth()]}, ${passengers} ${getUaPassengersCountName(passengers)}`}</Text>
                </View>
            )});
        }
    }, [cityFrom, cityTo]);

    useEffect(() => {
        if (listRef.current) {
            listRef.current.scrollToOffset({ animated: false, offset: listScrollPosition.current });
        }
    }, [races]);

    return (
        <View style={styles.container}>
            <Text style={styles.introText}>Виїзд та прибуття за місцевим часом</Text>
            <Text style={styles.introText}>ПРЯМІ РЕЙСИ</Text>
            {isLoading && (
                <View style={{ alignItems: "center", width: "100%" }}>
                    <CustomLoading />
                </View>
            )}
            <FlatList
                ref={listRef}
                data={races}
                renderItem={({item}) => (
                    <BusforCard
                        timeFrom={item.time_start}
                        timeTo={item.time_end}
                        locationFrom={cityFrom?.name_ua ?? ""} 
                        locationTo={cityTo?.name_ua ?? ""}
                        cost={item.cost}
                        places={item.places}
                    />
                )}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.racesContainer}
                onEndReached={fetchRaces}
                onEndReachedThreshold={0.5}
                onScroll={(event) => {
                    listScrollPosition.current = event.nativeEvent.contentOffset.y;
                }}
            />
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
  headerTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "white"
  },
  headerSubtitle: {
    fontSize: 12,
    color: "whitesmoke"
  },
  introText: {
    fontSize: scale(12),
    color: 'gray'
  },
  racesContainer: {
    gap: scale(10)
  }
})
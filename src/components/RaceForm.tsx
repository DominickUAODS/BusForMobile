import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { scale } from "react-native-size-matters";
import { useEffect, useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation } from "@react-navigation/native";
import City from "../interfaces/City";
import Page from "../interfaces/Page";
import { API_SERVER } from "@env";

type RaceFormProps = {
    orientation: "landscape" | "portrait";
};

function RaceForm({ orientation }: RaceFormProps): React.ReactElement {
    const [isDatePickerVisible, setDatePickerVisibility] = useState<boolean>(false);
    const [cities, setCities] = useState<City[]>([]);

    const [city_from, setCityFrom] = useState<number>(0);
    const [city_to, setCityTo] = useState<number>(0);
    const [date, setDate] = useState<Date>(new Date(Date.now()));
    const [passengers, setPassengers] = useState<number>(1);
    const navigation = useNavigation<any>();

    const onSubmit = () => {
        navigation.navigate("Races", {city_from, city_to, date, passengers});
    }

    const fetchCities = async () => {
        console.log(API_SERVER)
        try {
			const response: Response = await fetch(`${API_SERVER}/cities/?page_size=100`);
			if (!response.ok) {
				const error: Error = await response.json();
				throw error;
			}
			const page: Page<City> = await response.json();
			const newCities: City[] = page.results;
			setCityFrom(newCities.find(city => city.name_ua === "Київ")?.id ?? 0);
			setCityTo(newCities.find(city => city.name_ua === "Одеса")?.id ?? 0);
			setCities(newCities);
		} catch (error) {
			console.error(error);
		}
    }

    useEffect(() => {
        fetchCities();
    }, []);

    return orientation === "landscape" ? (
        <View style={[styles.form, styles.formHorizontal]}>
            <View style={[styles.inputContainer, styles.inputContainerHorizontal]}>
                <Dropdown
                    data={cities}
                    onChange={(item) => {setCityFrom(item.id)}}
                    labelField="name_ua"
                    valueField="id"
                    placeholder="Звідки"
                    placeholderStyle={styles.placeholder}
                    search={true}
                    searchField="name"
                    searchPlaceholder="Пункт відправлення"
                    renderLeftIcon={() => <MaterialIcons name="logout" color="gray" size={scale(15)} />}
                    style={styles.input}
                    containerStyle={styles.dropdownContainerHorizontal}
                />
                <Dropdown
                    data={cities}
                    onChange={(item) => {setCityTo(item.id)}}
                    labelField="name_ua"
                    valueField="id"
                    placeholder="Куди"
                    placeholderStyle={styles.placeholder}
                    search={true}
                    searchField="name"
                    searchPlaceholder="Пункт прибуття"
                    renderLeftIcon={() => <MaterialIcons name="login" color="gray" size={scale(15)} />}
                    style={styles.input}
                    containerStyle={styles.dropdownContainerHorizontal}
                />
                <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}
                    style={[styles.input, styles.textInput]}
                >   
                    <MaterialIcons name="calendar-today" color="gray" size={scale(15)} />
                    {date && <Text>{date.toLocaleDateString()}</Text>}
                    {!date && <Text style={styles.placeholder}>Дата поїздки</Text>}
                </TouchableOpacity>
                <View style={[styles.input, styles.textInput]}>
                    <MaterialIcons name="person" color="gray" size={scale(15)} />
                    <TextInput
                        placeholder="Пасажири"
                        keyboardType="numeric"
                        value={passengers.toString()}
                        onChangeText={(text) => setPassengers(Math.abs(parseInt(text) ?? 0))}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.submit, styles.submitHorizontal]}
                onPress={onSubmit}
            >
                <Text style={styles.submitText}>Знайти квиток</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date: Date) => {
                    setDate(date);
                    setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </View>
    ) : (
        <View style={[styles.form, styles.formVertical]}>
            <View style={[styles.inputContainer, styles.inputContainerVertical, styles.inputContainerPlaceVertical]}>
                <Dropdown
                    data={cities}
                    onChange={(item) => {setCityFrom(item.id)}}
                    labelField="name_ua"
                    valueField="id"
                    placeholder="Звідки"
                    placeholderStyle={styles.placeholder}
                    search={true}
                    searchField="name"
                    searchPlaceholder="Пункт відправлення"
                    renderLeftIcon={() => <MaterialIcons name="logout" color="gray" size={scale(15)} />}
                    style={styles.input}
                    containerStyle={styles.dropdownContainerVertical}
                />
                <Dropdown
                    data={cities}
                    onChange={(item) => {setCityTo(item.id)}}
                    labelField="name_ua"
                    valueField="id"
                    placeholder="Куди"
                    placeholderStyle={styles.placeholder}
                    search={true}
                    searchField="name"
                    searchPlaceholder="Пункт прибуття"
                    renderLeftIcon={() => <MaterialIcons name="login" color="gray" size={scale(15)} />}
                    style={styles.input}
                    containerStyle={styles.dropdownContainerVertical}
                />
            </View>
            <View style={[styles.inputContainer, styles.inputContainerVertical]}>
                <TouchableOpacity
                    onPress={() => setDatePickerVisibility(true)}
                    style={[styles.input, styles.textInput]}
                >   
                    <MaterialIcons name="calendar-today" color="gray" size={scale(15)} />
                    {date && <Text>{date.toLocaleDateString()}</Text>}
                    {!date && <Text style={styles.placeholder}>Дата поїздки</Text>}
                </TouchableOpacity>
                <View style={[styles.input, styles.textInput]}>
                    <MaterialIcons name="person" color="gray" size={scale(15)} />
                    <TextInput
                        placeholder="Пасажири"
                        keyboardType="numeric"
                        value={passengers.toString()}
                        onChangeText={(text) => setPassengers(Math.abs(parseInt(text) ?? 0))}
                    />
                </View>
            </View>
            <TouchableOpacity
                style={[styles.submit, styles.submitVertical]}
                onPress={onSubmit}
            >
                <Text style={styles.submitText}>Знайти квиток</Text>
            </TouchableOpacity>
            <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="date"
                onConfirm={(date: Date) => {
                    setDate(date);
                    setDatePickerVisibility(false)
                }}
                onCancel={() => setDatePickerVisibility(false)}
            />
        </View>
    );
}

export { RaceForm };

const styles = StyleSheet.create({
    form: {
        alignSelf: "stretch",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    formHorizontal: { },
    formVertical: {
        flexDirection: "column",
        gap: 20
    },
    inputContainer: {
        borderRadius: scale(10),
        borderWidth: scale(1),
        backgroundColor: "white",
        overflow: "hidden",
        borderColor: "gray"
    },
    inputContainerHorizontal: {
        flexDirection: "row",
        width: scale(500)
    },
    inputContainerVertical: {
        flexDirection: "row",
        flexGrow: 1,
    },
    inputContainerPlaceVertical: {
        height: scale(120),
        flexDirection: "column"
    },
    input: {
        padding: scale(10),
        borderWidth: scale(1),
        borderColor: "gray",
        flex: 1
    },
    textInput: {
        flexDirection: "row",
        alignItems: "center"
    },
    placeholder: {
        color: "gray"
    },
    dropdownContainerHorizontal: {
        width: scale(500)
    },
    dropdownContainerVertical: { },
    submit: {
        borderRadius: scale(10),
        backgroundColor: 'rgb(249, 37, 63)',
        justifyContent: "center"
    },
    submitHorizontal: {
        width: scale(150)
    },
    submitVertical: {
        height: scale(50),
        width: "100%"
    },
    submitText: {
        fontSize: scale(15),
        color: "white",
        textAlign: "center"
    }
});

import { Alert, StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from "react-native";
import { scale } from "react-native-size-matters";

type CardParams = {
    timeFrom: Date;
    timeTo: Date;
    locationFrom: string;
    locationTo: string;
    cost: number,
    places: number
}

function BusforCard({timeFrom, timeTo, locationFrom, locationTo, cost, places}: CardParams): React.ReactElement {
    timeFrom = new Date(timeFrom);
    timeTo = new Date(timeTo);
    
    const { width, height } = useWindowDimensions();
    const duration = new Date(timeTo.getTime() - timeFrom.getTime());
    
    return (width < height) ?
        <View style={styles.container}>
            <Text style={styles.textNoPrint}>Можна не роздруковувати</Text>
            <View style={[styles.card, (width > height) ? styles.cardHorizontal : styles.cardVertical]}>
                <View style={styles.cardColumn}>
                    <View style={styles.durationRow}>
                        <Text style={styles.timeDisplay}>{timeFrom.getHours()}:{timeFrom.getMinutes().toString().padStart(2, "0")}</Text>
                        <Text style={styles.durationDisplay}>{duration.getHours() - 1} год. {duration.getMinutes()} хв</Text>
                    </View>
                    <Text style={styles.locationDisplay}>{locationFrom}</Text>
                    <Text style={styles.placesDisplay}>{places} місць</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={styles.timeDisplay}>{timeTo.getHours()}:{timeTo.getMinutes().toString().padStart(2, "0")}</Text>
                    <Text style={styles.locationDisplay}>{locationTo}</Text>
                    <TouchableOpacity
                        style={styles.costDisplay}
                        onPress={() => {
                            Alert.alert("Not implemented", "Тут буде бронювання квитка");
                        }}
                    >
                        <Text style={styles.costDisplay}>{cost} грн</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        :
        <View style={styles.container}>
            <Text style={styles.textNoPrint}>Можна не роздруковувати</Text>
            <View style={styles.card}>
                <View style={styles.cardColumn}>
                    <View style={styles.durationRow}>
                        <Text style={styles.timeDisplay}>{timeFrom.getHours()}:{timeFrom.getMinutes().toString().padStart(2, "0")}</Text>
                        <Text style={styles.durationDisplay}>{duration.getHours() - 1} год. {duration.getMinutes()} хв.</Text>
                    </View>
                    <Text style={styles.locationDisplay}>{locationFrom}</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={styles.timeDisplay}>{timeTo.getHours()}:{timeTo.getMinutes().toString().padStart(2, "0")}</Text>
                    <Text style={styles.locationDisplay}>{locationTo}</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={[styles.placesDisplay, (width > height) && styles.placesDisplayHorizontal]}>{places} місць</Text>
                    <TouchableOpacity
                        style={styles.costDisplay}
                        onPress={() => {
                            Alert.alert("Not implemented", "Тут буде бронювання квитка");
                        }}
                    >
                        <Text style={[styles.costDisplay, (width > height) && styles.costDisplayHorizontal]}>{cost} грн</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    };

const styles = StyleSheet.create({
    container: {
        marginTop: scale(-15)
    },
    card: {
        backgroundColor: "white",
        paddingLeft: scale(20),
        paddingTop: scale(10),
        gap: scale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
        borderWidth: scale(2),
        borderRadius: scale(10),
        borderColor: "#fc8605"
    },
    cardHorizontal: {
        height: scale(80)
    },
    cardVertical: {
        height: scale(150)
    },
    cardColumn: {
        flex: 1
    },
    textNoPrint: {
        backgroundColor: "#fc8605",
        color: "white",
        position: "relative",
        top: scale(15),
        borderRadius: scale(10),
        padding: scale(5),
        paddingBottom: scale(20),
        textAlign: "center",
        width: scale(200),
        fontSize: scale(14),
    },
    timeDisplay: {
        fontWeight: "bold",
        fontSize: scale(30)
    },
    durationRow: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    durationDisplay: {
        textAlignVertical: "center",
        fontSize: scale(14),
        color: "grey"
    },
    locationDisplay: {
        fontSize: scale(14),
        height: scale(50),
        overflow: "hidden"
    },
    placesDisplay: {
        color: "green",
        textAlignVertical: "center",
        flexGrow: 1,
        fontSize: scale(14)
    },
    placesDisplayHorizontal: {
        textAlign: "center",
        fontSize: scale(16)
    },
    costDisplay: {
        backgroundColor: "#f9253e",
        color: "white",
        fontSize: scale(14),
        textAlign: "center",
        textAlignVertical: "center",
        flexGrow: 1,
        borderTopLeftRadius: scale(10)
    },
    costDisplayHorizontal: {
        fontSize: scale(20)
    }
});

export { BusforCard };

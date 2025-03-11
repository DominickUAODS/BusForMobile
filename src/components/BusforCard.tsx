import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { scale } from "react-native-size-matters";

type Race = {
    timeFrom: Date;
    timeTo: Date;
    locationFrom: string;
    locationTo: string;
    cost: number,
    places: number
}

function BusforCard({timeFrom, timeTo, locationFrom, locationTo, cost, places, shouldBePrinted=false}: Race & { shouldBePrinted?: boolean }): React.ReactElement {
    const { width, height } = useWindowDimensions();
    const duration = new Date(timeTo.getTime() - timeFrom.getTime());
    
    return (width < height) ?
        <View style={!shouldBePrinted && {marginTop: scale(-15)}}>
            {!shouldBePrinted && <Text style={styles.textNoPrint}>No need to print</Text>}
            <View style={[styles.card, {width: width - 20}, shouldBePrinted ? styles.cardPrint : styles.cardNoPrint, (width > height) ? {height: scale(95)} : {height: scale(190)}]}>
                <View style={styles.cardColumn}>
                    <View style={styles.durationRow}>
                        <Text style={styles.timeDisplay}>{timeFrom.getHours()}:{timeFrom.getMinutes().toString().padStart(2, "0")}</Text>
                        <Text style={styles.durationDisplay}>{duration.getHours() - 1}h {duration.getMinutes()}m</Text>
                    </View>
                    <Text style={styles.locationDisplay}>{locationFrom}</Text>
                    <Text style={styles.placesDisplay}>{places} places</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={styles.timeDisplay}>{timeTo.getHours()}:{timeTo.getMinutes().toString().padStart(2, "0")}</Text>
                    <Text style={styles.locationDisplay}>{locationTo}</Text>
                    <Text style={styles.costDisplay}>₴{cost}</Text>
                </View>
            </View>
        </View>
        :
        <View style={!shouldBePrinted && {marginTop: scale(-15)}}>
            {!shouldBePrinted && <Text style={styles.textNoPrint}>No need to print</Text>}
            <View style={[styles.card, {width: width - 20}, shouldBePrinted ? styles.cardPrint : styles.cardNoPrint]}>
                <View style={styles.cardColumn}>
                    <View style={styles.durationRow}>
                        <Text style={styles.timeDisplay}>{timeFrom.getHours()}:{timeFrom.getMinutes().toString().padStart(2, "0")}</Text>
                        <Text style={styles.durationDisplay}>{duration.getHours() - 1}h {duration.getMinutes()}m</Text>
                    </View>
                    <Text style={styles.locationDisplay}>{locationFrom}</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={styles.timeDisplay}>{timeTo.getHours()}:{timeTo.getMinutes().toString().padStart(2, "0")}</Text>
                    <Text style={styles.locationDisplay}>{locationTo}</Text>
                </View>
                <View style={styles.cardColumn}>
                    <Text style={[styles.placesDisplay, (width > height) && {textAlign: "center", fontSize: scale(20)}]}>{places} places</Text>
                    <Text style={[styles.costDisplay, (width > height) && {fontSize: scale(25)}]}>₴{cost}</Text>
                </View>
            </View>
        </View>
    };

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        paddingLeft: scale(20),
        paddingTop: scale(10),
        gap: scale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        overflow: "hidden",
        borderWidth: scale(2),
        borderRadius: scale(10)
    },
    cardColumn: {
        flex: 1
    },
    cardPrint: {
        borderColor: "#f9253e"
    },
    cardNoPrint: {
        borderColor: "#fc8605"
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
        width: scale(120),
        fontSize: scale(14),
    },
    timeDisplay: {
        fontWeight: "bold",
        fontSize: scale(38)
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
        height: scale(80),
        overflow: "hidden"
    },
    placesDisplay: {
        color: "#f9253e",
        textAlignVertical: "center",
        flexGrow: 1,
        fontSize: scale(14)
    },
    costDisplay: {
        backgroundColor: "#f9253e",
        color: "white",
        fontSize: scale(14),
        textAlign: "center",
        textAlignVertical: "center",
        flexGrow: 1,
        borderTopLeftRadius: scale(10)
    }
});

export { Race, BusforCard };

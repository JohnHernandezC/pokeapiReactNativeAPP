import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";

export default function Layout() {
    return (
        <View style={styles.container}>
            <Stack
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#222',
                    },
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                    contentStyle: {
                        backgroundColor: '#222',
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#222",
    }
});
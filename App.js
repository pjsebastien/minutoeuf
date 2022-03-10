import { useFonts } from 'expo-font';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import Colors from './constants/Colors';
import AppNavigator from './navigation/Navigators';

export default function App() {
    //fonts
    let [fontsLoaded] = useFonts({
        'Orkney-regular': require('./assets/fonts/OrkneyRegular.ttf'),
        'Orkney-bold': require('./assets/fonts/OrkneyBold.ttf'),
        'Source-serif-bold': require('./assets/fonts/SourceSerifPro-Bold.ttf'),
        'Source-serif-regular': require('./assets/fonts/SourceSerifPro-Regular.ttf'),
    });
    if (!fontsLoaded) {
        return (
            <ActivityIndicator
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
                size="large"
                color={Colors.secondaryYellow}
            />
        );
    }
    return <AppNavigator />;
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

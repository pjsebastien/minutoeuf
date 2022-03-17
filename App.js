import { useFonts } from 'expo-font';
import { ActivityIndicator } from 'react-native';
import Colors from './constants/Colors';
import AppNavigator from './navigation/Navigators';

//Redux
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import appReducer from './store/reducers/App';
import thunk from 'redux-thunk';

const store = createStore(appReducer, applyMiddleware(thunk));

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
    return (
        <Provider store={store}>
            <AppNavigator />
        </Provider>
    );
}

import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: COLORS.primary
            },
            headerTintColor: 'white'
        }
    }
);

export default createAppContainer(ProductsNavigator);
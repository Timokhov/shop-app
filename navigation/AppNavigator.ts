import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackOptions } from 'react-navigation-stack';
import CartScreen from '../screens/shop/CartScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { COLORS } from '../constants/colors';

const ProductsNavigator = createStackNavigator(
    {
        ProductsOverview: ProductsOverviewScreen,
        ProductDetails: ProductDetailsScreen,
        Cart: CartScreen
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: COLORS.primary
            },
            headerTitleStyle: {
                fontFamily: 'open-sans-bold'
            },
            headerTintColor: 'white',
            headerTitleAlign: 'center'
        }
    }
);

export default createAppContainer(ProductsNavigator);

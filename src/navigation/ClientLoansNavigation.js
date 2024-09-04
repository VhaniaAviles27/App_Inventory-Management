import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/client/clientLoans/Home";
import LoansRegistration from "../screens/client/clientLoans/LoansRegistration";
import ReturnRegistration from "../screens/client/clientLoans/ReturnRegistration";
import ProductDetail from "../screens/product/ProductDetail";
import ClientPerfil from "../screens/client/clientLoans/ClientPerfil";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeIcon = ({ color, size }) => (
  <Ionicons name="home" color={color} size={size * 1} />
);

const NotificationsIcon = ({ color, size }) => (
  <FontAwesome5 name="cart-arrow-down" color={color} size={size * 1} />
);

const OrderIcon = ({ color, size }) => (
  <FontAwesome5 name="cart-plus" color={color} size={size * 1} />
);

const PersonIcon = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size * 1} />
);

const ClientLoansNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Prestamos"
        component={LoansRegistration}
        options={{
          tabBarIcon: OrderIcon,
        }}
      />
      <Tab.Screen
        name="Devoluciones"
        component={ReturnRegistration}
        options={{
          tabBarIcon: NotificationsIcon,
        }}
      />
      <Tab.Screen
        name="ClientPerfil"
        component={ClientPerfil}
        options={{
          tabBarIcon: PersonIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const ClientLoansNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ClientLoansNavigator" component={ClientLoansNavigator} />
      <Stack.Screen name="ProductDetail" component={ProductDetail} />
    </Stack.Navigator>
  );
};

export default ClientLoansNavigation;

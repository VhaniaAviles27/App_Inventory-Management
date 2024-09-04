import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/user/LoginComponent/Login";
import Menu from "../screens/user/LoginComponent/Menu";
import Rol from "../screens/user/LoginComponent/Rol";
import Register from "../screens/user/RegisterComponent/Register";
import AdminLoansNavigation from "./AdminLoansNavigation";
import ClientLoansNavigation from "./ClientLoansNavigation";

const Stack = createNativeStackNavigator();

const LoginNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Rol" component={Rol} />
        <Stack.Screen name="ClientLoansNavigation" component={ClientLoansNavigation} />
        <Stack.Screen name="AdminLoansNavigation" component={AdminLoansNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginNavigation;
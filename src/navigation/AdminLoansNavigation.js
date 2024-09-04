import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome5, Ionicons } from '@expo/vector-icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AdminPerfil from "../screens/admin/adminLoans/AdminPerfil";
import Requested from "../screens/admin/adminLoans/Requested";
import ReturnList from "../screens/admin/adminLoans/ReturnList";
import React from 'react'

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const RequestedIcon = ({ color, size }) => (
  <Ionicons name="notifications" color={color} size={size * 1} />
);

const ListIcon = ({ color, size }) => (
  <FontAwesome5 name="clipboard-list" color={color} size={size * 1} />
);

const AdminIcon = ({ color, size }) => (
  <Ionicons name="person" color={color} size={size * 1} />
);

const AdminLoansNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Pedidos"
        component={Requested}
        options={{
          tabBarIcon: RequestedIcon,
        }}
      />
      <Tab.Screen
        name="Devoluciones"
        component={ReturnList}
        options={{
          tabBarIcon: ListIcon,
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={AdminPerfil}
        options={{
          tabBarIcon: AdminIcon,
        }}
      />
    </Tab.Navigator>
  );
};

const AdminLoansNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="AdminLoansNavigator" component={AdminLoansNavigator} />
    </Stack.Navigator>
  );
};

export default AdminLoansNavigation;

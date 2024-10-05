import { useState, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { StyleSheet } from 'react-native'
import { TabRoutesTypes } from '@dtos/TabRoutes'
import { Home } from '@screens/Home'
import { BellIcon, HomeIcon, MessageCircle } from 'lucide-react-native'
import { theme } from 'native-base'
import { Settings } from '@screens/Settings'
import { Notifications } from '@screens/Notifications'
import { BlurView } from 'expo-blur'

const Tab = createBottomTabNavigator<TabRoutesTypes>()

export default function TabRoutes() {
	const [chatBadgeCount, setChatBadgeCount] = useState(0)
	const [notificationsCount, setNotificationsCount] = useState(0)

	useEffect(() => {
		async function fetchChatBadgeCount() {

			setChatBadgeCount(2)
			setNotificationsCount(1)
		}

		fetchChatBadgeCount()
	}, [])

	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					position: 'absolute',
					borderTopLeftRadius: 20,
					borderTopRightRadius: 20,
					borderTopWidth: 0,
				},
				tabBarLabelStyle: {
					fontSize: 14,
					fontWeight: '500',
				},
				tabBarBackground: () => <BlurView intensity={95}
					style={{
						...StyleSheet.absoluteFillObject,
						overflow: 'hidden',
						borderTopLeftRadius: 20,
						borderTopRightRadius: 20,
					}}
				/>
			}}
		>
			<Tab.Screen
				name="homeTab"
				component={Home}
				options={{
					tabBarHideOnKeyboard: true,
					tabBarIcon: ({ focused, size }) => (
						<HomeIcon
							size={size}
							color={focused ? theme.colors.lime[500] : 'gray'}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="chatsTab"
				component={Settings}
				options={{
					tabBarHideOnKeyboard: true,
					tabBarBadge: chatBadgeCount > 0 ? chatBadgeCount : undefined,
					tabBarIcon: ({ focused, size }) => (
						<MessageCircle
							size={size}
							color={focused ? theme.colors.lime[500] : 'gray'}
						/>
					)
				}}
			/>
			<Tab.Screen
				name="notificationsTab"
				component={Notifications}
				options={{
					tabBarHideOnKeyboard: true,
					tabBarBadge: notificationsCount > 0 ? notificationsCount : undefined,
					tabBarIcon: ({ focused, size }) => (
						<BellIcon
							size={size}
							color={focused ? theme.colors.lime[500] : 'gray'}
						/>
					)
				}}
			/>
		</Tab.Navigator>
	)
}

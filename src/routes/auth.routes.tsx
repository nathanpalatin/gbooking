import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/src/types'

import { SignIn } from '@screens/SignIn'
import { SignUp } from '@screens/SignUp'
import { ForgetPassword } from '@screens/ForgetPassword'

import { AuthRoutesTypes } from '@dtos/AuthRoutes'
import { CompleteAccount } from '@screens/CompleteAccount'
import { ResetPassword } from '@screens/ResetPassword'
import { Welcome } from '@screens/Welcome'
import Pricing from '@screens/Pricing'
import { AboutCompany } from '@screens/AboutCompany'
import LocalService from '@screens/LocalService'

export type AuthNavigatorRoutesProps =
	NativeStackNavigationProp<AuthRoutesTypes>

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
	return (
		<Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName='welcome'
		>
			<Screen name="welcome" component={Welcome} />
			<Screen name="signIn" component={SignIn} />
			<Screen name="signUp" component={SignUp} />
			<Screen name="aboutCompany" component={AboutCompany} />
			<Screen name="localService" component={LocalService} />
			<Screen name="pricing" component={Pricing} />
			<Screen name="completeAccount" component={CompleteAccount} />
			<Screen name="forgetPassword" component={ForgetPassword} />
			<Screen name="resetPassword" component={ResetPassword} />
		</Navigator>
	)
}

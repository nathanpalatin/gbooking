import { useState } from 'react'
import {
	Pressable,
	View,
	Text,
	KeyboardAvoidingView,
	Platform,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import { Controller, useForm } from 'react-hook-form'


import { Button } from '@components/Button'
import { Input } from '@components/Input'

import { useAuth } from '@hooks/useAuth'
import { AppError } from '@utils/AppError'
import { ButtonPassword } from '@components/ButtonPassword'
import { FormDataProps } from '@dtos/forms'


export function SignIn() {
	const { singIn } = useAuth()

	const [screen, setScreen] = useState('business')

	const [showPass, setShowPass] = useState(true)

	const toast = useToast()

	const {
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<FormDataProps>()

	const [isLoading, setIsLoading] = useState(false)

	const navigation = useNavigation<AuthNavigatorRoutesProps>()


	async function handleSignIn({ credential, password }: FormDataProps) {
		try {
			setIsLoading(true)
			await singIn(credential, password)
		} catch (error) {
			const isAppError = error instanceof AppError
			const title = isAppError
				? 'Credenciais inválidas.'
				: 'Erro no servidor, tente novamente mais tarde.'

			toast.show({
				title,
				placement: 'bottom',
				bgColor: 'red.800',
				borderRadius: 8,
				marginBottom: 100,
			})

			setIsLoading(false)
		}
	}

	return (
		<KeyboardAvoidingView
			className="flex-1 bg-zinc-900"
			behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
			keyboardVerticalOffset={-120}
		>
			<View className="flex-1 justify-center px-10 py-20">
				<View className="flex-grow justify-center items-center pt-10">
					<View className='flex flex-row items-center gap-4 bg-zinc-800  p-4 rounded-lg mb-10'>
						<Pressable
							className={`${screen === 'business' ? 'bg-primary ' : 'bg-zinc-700'}  rounded-lg flex items-center justify-center  `}
							onPress={() => setScreen('business')}
						>
							<Text className={`text-center ${screen === 'business' ? 'text-zinc-700 ' : 'text-zinc-100'} font-bold  px-8 py-3`}>Empresarial</Text>
						</Pressable>
						<Pressable
							className={`${screen === 'personal' ? 'bg-primary ' : 'bg-zinc-700'}  rounded-lg flex items-center justify-center  `}
							onPress={() => setScreen('personal')}
						>
							<Text className={`text-center ${screen === 'personal' ? 'text-zinc-700 ' : 'text-zinc-100'} font-bold  px-8 py-3`}>Pessoal</Text>
						</Pressable>



					</View>
					<Text className='text-center text-white text-xl mb-4 font-bold'>Acessar sua conta</Text>

					{screen === 'personal' ? (
						<>
							<Controller
								control={control}
								name="credential"
								rules={{ required: 'E-mail inválido' }}
								render={({ field: { onChange } }) => (
									<Input
										placeholder="seu login"
										keyboardAppearance="dark"
										placeholderTextColor={'#ffffff47'}
										onChangeText={onChange}
										errorMessage={errors.credential?.message}
									/>
								)}
							/>

							<Controller
								control={control}
								name="password"
								rules={{ required: 'Senha inválida' }}
								render={({ field: { onChange } }) => (
									<Input
										placeholder="sua senha"
										onChangeText={onChange}
										returnKeyType="send"
										onSubmitEditing={handleSubmit(handleSignIn)}
										InputRightElement={
											<ButtonPassword
												show={showPass}
												onPress={() => setShowPass(!showPass)}
											/>
										}
										placeholderTextColor={'#ffffff56'}
										keyboardAppearance="dark"
										secureTextEntry={showPass}
										errorMessage={errors.password?.message}
									/>
								)}
							/>

						</>
					)
						: (
							<>
								<Controller
									control={control}
									name="credential"
									rules={{ required: 'E-mail inválido' }}
									render={({ field: { onChange } }) => (
										<Input
											placeholder="seu negócio"
											keyboardAppearance="dark"
											placeholderTextColor={'#ffffff47'}
											onChangeText={onChange}
											errorMessage={errors.credential?.message}
										/>
									)}
								/>

								<Controller
									control={control}
									name="password"
									rules={{ required: 'Senha inválida' }}
									render={({ field: { onChange } }) => (
										<Input
											placeholder="sua senha"
											onChangeText={onChange}
											returnKeyType="send"
											onSubmitEditing={handleSubmit(handleSignIn)}
											InputRightElement={
												<ButtonPassword
													show={showPass}
													onPress={() => setShowPass(!showPass)}
												/>
											}
											placeholderTextColor={'#ffffff56'}
											keyboardAppearance="dark"
											secureTextEntry={showPass}
											errorMessage={errors.password?.message}
										/>
									)}
								/>
							</>
						)}




					<Pressable
						onPress={() => { }}
						className="w-full"
					>
						<Text className="  text-zinc-100 text-right font-bold">
							Esqueceu a senha?
						</Text>
					</Pressable>
				</View>

				<Button
					title="Entrar"
					variant="outline"
					isLoading={isLoading}
					disabled={isLoading}

					onPress={handleSubmit(handleSignIn)}
				/>

				<Pressable
					className="mt-10 mb-4"
					onPress={() => navigation.pop()}
				>
					<Text className=" text-zinc-100 font-bold text-center">
						Voltar
					</Text>
				</Pressable>
			</View>
		</KeyboardAvoidingView>
	)
}

import { useState } from 'react'
import {
	Text,
	View,
	FlatList,
	Image,
	Pressable,
} from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { XIcon } from 'lucide-react-native'

export function SignUp() {
	const toast = useToast()

	const [isLoading, setIsLoading] = useState(false)

	const [services, setServices] = useState([
		{ id: 1, service: 'Barbearia', image: require('@assets/barber-service.png'), active: true },
		{ id: 2, service: 'Estética', image: require('@assets/estetica.png'), active: false },
		{ id: 3, service: 'Salão', image: require('@assets/salao.png'), active: false },
	])

	const [selectedService, setSelectedService] = useState<string>('Barbearia')

	const navigation = useNavigation<AuthNavigatorRoutesProps>()

	const handleSelectService = (id: number, serviceName: string) => {
		setServices((prevServices) =>
			prevServices.map((service) =>
				({ ...service, active: service.id === id })
			)
		)
		setSelectedService(serviceName)
	}

	async function handleSignUp() {
		try {
			setIsLoading(true)
			navigation.navigate('aboutCompany', {
				type: selectedService,
			})
		} catch (error) {
			console.log(error)
			setIsLoading(false)
			const isAppError = error instanceof AppError
			const title = isAppError ? error.message : 'Error creating account'
			toast.show({
				title,
				placement: 'top',
				bgColor: 'red.500',
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<View className="flex-grow bg-zinc-900 py-20 px-10">
			<Pressable
				onPress={() => navigation.goBack()}
				className="flex-row items-center justify-end"
			>
				<XIcon color={'white'} size={32} />
			</Pressable>
			<View className="flex-1 justify-center items-start mt-10 ">
				<Text className='text-left text-white text-xl mb-4 font-bold'>Qual é o ramo de atividade da sua empresa?</Text>
				<Text className='text-left text-zinc-400 text-sm mb-10'>Selecione a categoria que você  acha que melhor representa a atividade da sua empresa.</Text>
				<FlatList
					data={services}
					numColumns={3}
					columnWrapperStyle={{ flexGrow: 1, alignItems: 'center', gap: 32 }}
					scrollEnabled={false}
					bounces={false}
					keyExtractor={(item) => 'service' + item.id}
					renderItem={({ item }) => (
						<Pressable onPress={() => handleSelectService(item.id, item.service)} className='mb-6'>
							<Image source={item.image} className={`size-28 ${!item.active ? 'opacity-20' : 'border-primary border-2'} justify-center items-center rounded-full`} />
							<Text className={` ${item.active ? 'text-white' : 'text-zinc-700'} text-center py-2 font-bold`}>{item.service}</Text>
						</Pressable>
					)}
				/>
			</View>
			<Button
				title="Avançar"
				variant="outline"
				isLoading={isLoading}
				disabled={isLoading}
				onPress={handleSignUp}
			/>
		</View>
	)
}

import { useState } from 'react'
import {
  Text,
  View,
  Pressable,
} from 'react-native'


import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'


import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { useForm } from 'react-hook-form'

import { FormDataRegisterBusinesssProps } from '@dtos/FormDataDTO'


export default function LocalService() {
  const toast = useToast()

  const route = useRoute()

  const params = route.params as { type: string, businessName: string, phone: string, description: string, code?: string }

  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormDataRegisterBusinesssProps>()


  const navigation = useNavigation<AuthNavigatorRoutesProps>()

  async function handleSignUp(data: FormDataRegisterBusinesssProps) {
    try {
      setIsLoading(true)

      navigation.navigate('localService', {
        type: params.type,
        businessName: data.businessName,
        description: data.description,
        phone: data.phone,
        code: data.code || ''
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
      <View className=" flex-1 justify-start items-start mt-20 ">
        <Text className='text-left text-white text-xl mb-4 font-bold'>Onde você trabalha?</Text>
        <Text className='text-left text-zinc-400 text-sm mb-10'>Você trabalha em um estabelecimento, vai até os clientes para atendê-los ou ambos?</Text>


      </View>
      <Button
        title="Avançar"
        variant="outline"
        isLoading={isLoading}
        disabled={isLoading}
        onPress={handleSubmit(handleSignUp)}
      />
      <Pressable
        className="mt-10 mb-4"
        onPress={() => navigation.pop()}
      >
        <Text className="text-zinc-100 font-bold text-center">
          Voltar
        </Text>
      </Pressable>
    </View>
  )
}

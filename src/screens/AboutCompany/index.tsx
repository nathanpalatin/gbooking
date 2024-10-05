import { useState } from 'react'
import {
  Text,
  View,
  StyleSheet,
  Pressable,
} from 'react-native'

import { useNavigation, useRoute } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

import { useToast } from 'native-base'

import { TextInputMask } from 'react-native-masked-text'

import { AppError } from '@utils/AppError'

import { Button } from '@components/Button'
import { Controller, useForm } from 'react-hook-form'
import { Input } from '@components/Input'
import { FormDataRegisterBusinesssProps } from '@dtos/FormDataDTO'
import { Textarea } from '@components/Textarea'



export function AboutCompany() {
  const toast = useToast()

  const route = useRoute()

  const params = route.params as { type: string }

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
        <Text className='text-left text-white text-xl mb-4 font-bold'>Sobre você</Text>
        <Text className='text-left text-zinc-400 text-sm mb-10'>Conte-nos mais sobre você e sua empresa.</Text>
        <Controller
          control={control}
          name="businessName"
          rules={{ required: 'Nome inválido' }}
          render={({ field: { onChange } }) => (
            <Input
              placeholder="Nome da empresa"
              keyboardAppearance="dark"
              placeholderTextColor={'#ffffff47'}
              onChangeText={onChange}
              errorMessage={errors.businessName?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="description"
          rules={{ required: 'Descrição inválida' }}
          render={({ field: { onChange } }) => (
            <>
              <Textarea
                placeholder="Descrição"
                h={20}
                keyboardAppearance="dark"
                placeholderTextColor={'#ffffff47'}
                onChangeText={onChange}
              />
              {errors.description && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  {errors.description?.message}
                </Text>
              )}
            </>
          )}
        />

        <Controller
          control={control}
          name="phone"
          rules={{ required: 'Telefone inválido' }}
          render={({ field: { onChange, value } }) => (
            <>
              <TextInputMask
                type="cel-phone"
                value={value}
                onChangeText={onChange}
                placeholder="Telefone"
                keyboardAppearance="dark"
                keyboardType="number-pad"
                placeholderTextColor={'#ffffff47'}
                style={style.inputMaskDate}
              />
              {errors.phone && (
                <Text style={{ color: 'red', marginBottom: 10 }}>
                  {errors.phone?.message}
                </Text>
              )}
            </>
          )}
        />
        <View className='h-px w-full bg-zinc-800 my-4' />
        <Text className='text-left text-zinc-400 text-sm mb-3'>Possui código de indicação? (opcional)</Text>
        <Input
          placeholder="Código"
          keyboardAppearance="dark"
          maxLength={6}
          keyboardType='number-pad'
          placeholderTextColor={'#ffffff47'}
          errorMessage={errors.code?.message}
        />
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
const style = StyleSheet.create({
  inputMaskDate: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: '100%',
    marginBottom: 15,
    fontSize: 14,
    borderRadius: 4,
    color: '#ffffff',
    borderWidth: 1,
    borderColor: '#4d4d4d',
  },
})
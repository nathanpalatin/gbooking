import { ImageBackground, Text, View, Pressable } from 'react-native'

import { Button } from '@components/Button'

import { useNavigation } from '@react-navigation/native'
import { AuthNavigatorRoutesProps } from '@routes/auth.routes'

export function Welcome() {
  const navigation = useNavigation<AuthNavigatorRoutesProps>()
  return (
    <ImageBackground
      source={require('@assets/background.png')}
      className="flex-1 justify-center"
    >
      <View className="justify-center items-center mt-[370px] pb-4 px-10">
        <Text className="text-zinc-100 text-5xl font-extrabold mb-6">
          G-Booking
        </Text>
        <Text className="text-zinc-100 text-lg text-center leading-6 font-medium mb-6">
          Automatize seus atendimentos, realize agendamentos com pagamento
          antecipado e simplifique sua operação!
        </Text>
        <Button
          onPress={() => navigation.navigate('signUp')}
          title="Experimente grátis"
          variant="outline"
        />
        <Text className="text-zinc-400 text-sm text-center mt-4 font-normal mb-6">
          15 dias grátis, depois R$ 269,90/mês.
        </Text>
        <Pressable
          onPress={() => navigation.navigate('pricing')}
        >
          <Text className="text-primary text-lg text-center mt-4 font-semibold mb-6">
            Vejo os planos atuais
          </Text>
        </Pressable>
        <Pressable
          onPress={() => navigation.navigate('signIn')}
        >
          <Text className="text-zinc-400 text-md text-center mt-4 font-normal mb-6">
            Já possui uma conta? <Text className="text-primary">Entrar</Text>
          </Text>
        </Pressable>
      </View>
    </ImageBackground>
  )
}

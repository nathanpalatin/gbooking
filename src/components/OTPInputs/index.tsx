import { View } from 'react-native'
import OTPInput from '@codsod/react-native-otp-input'

import { Header } from '@components/Header'
import { useState } from 'react'

export function OTPInputs() {
  const [_otp, setOTP] = useState('')

  return (
    <View className='flex-1 bg-zinc-900'>
      <Header
        title="Código"
      />
      <View className='flex-1 justify-center items-center'>
        <OTPInput
          length={4}
          style={{ gap: 2, justifyContent: 'space-evenly' }}
          inputStyle={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}
          onOtpComplete={(txt: string) => setOTP(txt)}
        />
      </View>
    </View>
  )
}

import { FormControl, IInputProps, TextArea as NativeBaseTextarea } from 'native-base'

type Props = IInputProps & {
  errorMessage?: string | null
  variant?: boolean
}

export function Textarea({
  variant,
  errorMessage = null,
  isInvalid,
  ...rest
}: Props) {
  const invalid = !!errorMessage || isInvalid

  return (
    <FormControl isInvalid={invalid} mb={'4'}>
      <NativeBaseTextarea
        autoCompleteType={''}
        bg={'gray.900'}
        py={2}
        autoCapitalize={'none'}
        rounded={'sm'}
        fontSize="sm"
        color={'gray.100'}
        placeholderTextColor={'#00000040'}
        isInvalid={invalid}
        borderColor={'gray.700'}
        borderWidth={1}
        _invalid={{
          borderWidth: 2,
          borderColor: 'red.500',
        }}
        _focus={{
          bg: 'gray.790',
          borderColor: 'lime.500',
        }}
        {...rest}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}

import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  BackHandler,
  Platform,
} from "react-native";

const OTPInput = ({
  length = 4,
  onOtpComplete = () => { },
  style,
  inputStyle,
}) => {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    if (text.length > 1) {
      text = text.charAt(0);
    }

    const newOtp = [...otp];

    if (!isNaN(text) && text !== "") {
      newOtp[index] = text;
      setOtp(newOtp);

      if (text && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }

      if (newOtp.every((val) => val !== "")) {
        onOtpComplete(newOtp.join(""));
      }
    } else if (text === "") {
      newOtp[index] = "";
      setOtp(newOtp);
    }
  };

  const handleKeyPress = (event, index) => {
    const { key } = event.nativeEvent;

    if (key === "Backspace") {
      if (otp[index] === "" && index > 0) {
        inputRefs.current[index - 1].focus();
      } else {
        const newOtp = [...otp];
        newOtp[index] = "";
        setOtp(newOtp);
      }
    }
  };

  useEffect(() => {
    const handleBackPress = () => {
      const focusedInputIndex = inputRefs.current.findIndex(
        (ref) => ref && ref.isFocused()
      );

      if (focusedInputIndex > 0) {
        inputRefs.current[focusedInputIndex - 1].focus();
        return true;
      }

      return false;
    };

    if (Platform.OS === "android") {
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        handleBackPress
      );
      return () => backHandler.remove();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Backspace") {
        const focusedInputIndex = inputRefs.current.findIndex(
          (ref) => ref && ref.isFocused()
        );

        if (focusedInputIndex > 0) {
          inputRefs.current[focusedInputIndex - 1].focus();
          event.preventDefault();
        }
      }
    };


  }, []);

  return (
    <View style={[styles.otpContainer, style]}>
      {Array(length)
        .fill(0)
        .map((_, index) => (
          <TextInput
            key={index}
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={[styles.otpInput, inputStyle]}
            value={otp[index]}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={(event) => handleKeyPress(event, index)}
            keyboardType="numeric"
            maxLength={1}
            textAlign="center"
            autoFocus={index === 0}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginHorizontal: 5,
    fontSize: 18,
    textAlign: "center",
  },
});

export default OTPInput;
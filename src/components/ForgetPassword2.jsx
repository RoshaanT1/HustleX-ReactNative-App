import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { useStore } from '../store/Store';

const ForgetPassword2 = ({ navigation }) => {
  const [digits, setDigits] = useState(['', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputRefs = useRef([]);
  const {resetToken, setResetToken} = useStore();
  const [email, setEmail] = useState('');
  
  const resendPassword = () => {
    navigation.navigate("ForgetPassword1");
  }
  const handleDigitChange = (text, index) => {
    if (text.length > 1) {
      return;
    }
    
    const newDigits = [...digits];
    newDigits[index] = text;
    setDigits(newDigits);
    
    // Auto-focus next input if a digit was entered
    if (text && index < 4) {
      inputRefs.current[index + 1].focus();
    }
    
    // Auto-submit if last digit was entered
    if (text && index === 4) {
      handleSubmit();
    }
  };
  
  const handleKeyPress = (e, index) => {
    // Handle backspace to move to previous input
    if (e.nativeEvent.key === 'Backspace' && !digits[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };
  
  const handleSubmit = () => {
    Keyboard.dismiss();
    const code = digits.join('');
    
    if (code.length !== 5) {
      Alert.alert('Incomplete Code', 'Please enter all 5 digits');
      return;
    }
    
    setIsSubmitting(true);
    
    
    // Here you would typically verify the code with your backend
    console.log('Verification code submitted:', code);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      // Navigate to next screen after verification
      console.log(typeof(code), typeof(resetToken))
      if(code==resetToken)
        navigation.navigate("ForgetPassword3")
      else
      Alert.alert('Incorrect Code', 'Please enter again');   
    }, 1500);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verification</Text>
      <Text style={styles.subtitle}>Enter the 5-digit code sent to your email</Text>
      
      <View style={styles.codeContainer}>
        {digits.map((digit, index) => (
          <TextInput
            key={index}
            ref={(ref) => inputRefs.current[index] = ref}
            style={styles.digitInput}
            keyboardType="number-pad"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleDigitChange(text, index)}
            onKeyPress={(e) => handleKeyPress(e, index)}
            selectTextOnFocus
            textContentType="oneTimeCode"
          />
        ))}
      </View>
      
      <TouchableOpacity 
        style={[styles.button, isSubmitting && styles.buttonDisabled]}
        onPress={handleSubmit}
        disabled={isSubmitting}
      >
        <Text style={styles.buttonText}>
          {isSubmitting ? 'Verifying...' : 'Verify Code'}
        </Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.resendLink}>
        <Text style={styles.resendText}>
          Didn't receive code? <Text style={styles.resendBold} onPress={()=>resendPassword()}>Resend</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 40,
    textAlign: 'center',
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  digitInput: {
    width: 50,
    height: 60,
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 8,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  button: {
    backgroundColor: '#000',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendLink: {
    alignSelf: 'center',
  },
  resendText: {
    color: '#555',
  },
  resendBold: {
    fontWeight: 'bold',
    color: '#000',
  },
});

export default ForgetPassword2;
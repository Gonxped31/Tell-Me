import Toast from "react-native-toast-message";

export const validateEmail = (email) => {
    if (email.trim() === ""){
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
export const validateInputs = (username: string, email: string, password: string) => {
    let invalids = 0

    if (password.trim() !== "" && password.length < 8) {
      Toast.show({
        type: 'error',
        text1: 'Password must contains a least 8 characters'
      });
      invalids++;
    }

    if (!validateEmail(email)) {
      Toast.show({
        type: 'error',
        text1: 'Invalid email'
      });
      invalids++;
    }

    if (username.trim() === "") {
      Toast.show({
        type: 'error',
        text1: 'Username cannot be empty'
      });
      invalids++;
    }

    console.log('username', username)
    console.log('email', email)
    console.log('password', password)
    console.log(invalids)

    return invalids === 0;
  }
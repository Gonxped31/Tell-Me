import Toast from "react-native-toast-message";
import { Score } from "../models/scores";

export const validateEmail = (email: string) => {
    if (email.trim() === ""){
        return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};
  
export const validateInputs = (username: string, email: string, password: string) => {
    let invalids = 0

    if (password.trim() === "" || (password.trim() !== "" && password.length < 8)) {
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
    return invalids === 0;
}

export const calculateAverage = (numbers: number[]): number => {
  if (numbers.length === 0) {
    throw new Error("Cannot calculate the average of an empty list");
  }
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return sum / numbers.length;
}

export const findAverageScore = (scoresList: Score[]): number => {
  const scores = scoresList.map((score) => score.score);
  if (scores.length == 1){
    return scores[0] / 1
  }
  return calculateAverage(scores);
}
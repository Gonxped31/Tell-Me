import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RateUserScreen = ({ infos }) => {
  const [rating, setRating] = useState(0);
  const [averageScore, setAverageScore] = useState(4.3); // Mocked average score
  const [isSendDisabled, setIsSendDisabled] = useState(true)

  const handleRating = (value: number) => {
    setIsSendDisabled(false);
    setRating(value); 
  };

  const handleSendDisable = () => {
    if (!isSendDisabled) {
      alert("Rated " + rating + " !");
      setIsSendDisabled(true);
      setRating(0);
    }
  }

  const renderStars = (score: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(score)) {
        stars.push(
          <Icon 
            key={i} 
            name="star" 
            size={25} 
            color="#FFD700" 
            style={styles.star} 
          />
        );
      } else if (i === Math.ceil(score) && score % 1 !== 0) {
        stars.push(
          <Icon
            key={i}
            name="star-half"
            size={25}
            color="#FFD700"
            style={styles.star}
          />
        );
      } else {
        stars.push(
          <Icon
            key={i}
            name="star-outline"
            size={25}
            color="#FFD700"
            style={styles.star}
          />
        );
      }
    }
    return stars;
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => alert("back")} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={30} color="#FFF" />
      </TouchableOpacity>

      {/* Profile and User Info */}
      <View style={styles.profileContainer}>
        <Icon name="person-circle-outline" size={80} color="#FFF" />
        <Text style={styles.userName}>{infos.name}</Text>
      </View>

      {/* Distance */}
      <Text style={styles.distance}>Distance: {infos.distance} m</Text>

      {/* Actual User Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.averageScoreLabel}>Current Score:</Text>
        <View style={styles.scoreRow}>{renderStars(averageScore)}</View>
        <Text style={styles.averageScoreText}>{averageScore.toFixed(1)}</Text>
      </View>

      {/* Rating */}
      <Text style={styles.ratingLabel}>Give a social score:</Text>
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map((value) => (
          <TouchableOpacity key={value} onPress={() => handleRating(value)}>
            <Icon
              name={value <= rating ? 'star' : 'star-outline'}
              size={40}
              color="#FFD700"
              style={styles.star}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View>
        <TouchableOpacity style={
          isSendDisabled ? styles.disabledButton : styles.confirmButton}
          onPress={handleSendDisable}
          >
          {/* <Icon name='send' size={20}></Icon> */}
          <Text style={styles.messageButtonText}>Send rating</Text>
        </TouchableOpacity>
      </View>

      {/* Private Message Button */}
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Private message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RateUserScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    width: "80%"
  },
  backButton: {
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  distance: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
  },
  scoreContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  averageScoreLabel: {
    color: '#FFF',
    fontSize: 18,
    marginBottom: 5,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginHorizontal: 2,
  },
  averageScoreText: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
  },
  ratingLabel: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  confirmButton: {
    flexDirection: "row",
    backgroundColor: '#00cc66',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  disabledButton: {
    flexDirection: "row",
    backgroundColor: '#31684d',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  messageButton: {
    backgroundColor: '#FF007F',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  messageButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

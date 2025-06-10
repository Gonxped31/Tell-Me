import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-toast-message';
import { UserAPI, ConversationAPI } from '@/src/utils/api';
import LoadingScreen from '../utils/loadingScreen';
import { Score } from '@/src/models/scores';
import { useAuth } from '@/src/hooks/useAuth';
import { findAverageScore } from '@/src/constants/functions';

const RateUserScreen = ({ route }) => {
  const [rating, setScore] = useState(0);
  const [averageScore, setAverageScore] = useState(0.0);
  const [isSendDisabled, setIsSendDisabled] = useState(true)
  const [isFetchingInfosLoading, setIsFetchingInfosLoading] = useState(false);
  const [isAddingScoreLoading, setIsAddingScoreLoading] = useState(false);
  const [isLoadingConversationLoading, setIsLoadingConversationLoading] = useState(false);
  const { navigation, infos } = route.params
  const { actualUser } = useAuth();

  const getRaterScoring = (scoresList: Score[]): number => {
    const raterScore = scoresList.filter((score) => score.rated_by == actualUser.username);
    if (raterScore.length > 0) {
      return raterScore[0].score
    }
    return 0
  }

  const handleRating = (value: number) => {
    setIsSendDisabled(false);
    setScore(value); 
  };

  const handleSendDisable = () => {
    if (!isSendDisabled) {
      const data = {
        rated_by: actualUser.username,
        rated_to: infos.username,
        score: rating
      };

      UserAPI.addScore(data, setIsAddingScoreLoading)
      .then((data) => {
        Toast.show({
          type: 'success',
          text1: 'Score sent !'
        });
      })
      .catch((error) => {
        console.error('An error occured', error);
        Toast.show({
          type: 'erro',
          text1: 'Error',
          text2: 'An error occured while sending the score.'
        });
      })
      setIsSendDisabled(true);
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

  useEffect(() => {
    UserAPI.getScores(infos.username, setIsFetchingInfosLoading)
    .then((data) => {
      if (data) {
        if (data.length > 0){
          setAverageScore(findAverageScore(data));
          setScore(getRaterScoring(data));
        } else {
          setAverageScore(0.0);
          setScore(0)
        }
      }
    })
    .catch((error) => {
      console.error('An error occured', error)
      Toast.show({
        type: 'error',
        text1: 'Erreur',
        text2: 'An error occured while fetching user infos'
      })
    })
  }, [])

  const loadConversation = () => {
    setIsLoadingConversationLoading(true);
    ConversationAPI.getConversation(actualUser.username, infos.username)
    .then((res) => {
      setIsLoadingConversationLoading(false);
      navigation.navigate("messaging", {
        navigation: navigation,
        receiverUsername: infos.username,
        conv_id: res.conv_id,
        isAnonymous: res.is_anonymous
      });
    })
    .catch((error) => {
      console.log("Response", error.response.status);
      // console.error('An error occured while loading conv', error);
      if (error.response && error.response.status === 404) {
        const data = {
          initiator_username: actualUser.username,
          recipient_username: infos.username
        }
        ConversationAPI.createNewConversation(data)
        .then((data) => {
          setIsLoadingConversationLoading(false);
          navigation.navigate("messaging", {
            navigation: navigation,
            receiverUsername: infos.username,
            conv_id: data.conv_id,
            isAnonymous: data.is_anonymous
          });
        })
        .catch((error) => {
          setIsLoadingConversationLoading(false);
          console.error('An error occured while creating conv', error);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2: 'An error occured while creating the conversation.'
          });
        });
      } else {
        setIsLoadingConversationLoading(false);
        console.log("Error", error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'An error occured while loading the conversation.'
        });
      }
    });
  }

  return (
    (isFetchingInfosLoading || isLoadingConversationLoading) ? <LoadingScreen message={"Loading..."}/> : 
    <View style={styles.container}>
      {/* Back Button */}
      {/* <TouchableOpacity onPress={() => alert("back")} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={30} color="#FFF" />
      </TouchableOpacity> */}

      {/* Profile and User Info */}
      <View style={styles.profileContainer}>
        <Icon name="person-circle-outline" size={80} color="#FFF" />
        <Text style={styles.userName}>{infos.username}</Text>
      </View>

      {/* Distance */}
      <Text style={styles.distance}>Distance: {infos.distance_m} m</Text>

      {/* Actual User Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.averageScoreLabel}>User average Score:</Text>
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
          disabled={isSendDisabled}
          >
          {/* <Icon name='send' size={20}></Icon> */}
          { isAddingScoreLoading ? <LoadingScreen styles={loadingStyles} loaderSize='small'/> : <Text style={styles.messageButtonText}>Send rating</Text>}
        </TouchableOpacity>
      </View>

      {/* Private Message Button */}
      <TouchableOpacity style={styles.messageButton}
        onPress={loadConversation}
      >
        <Text style={styles.messageButtonText}>Private message</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RateUserScreen;

const loadingStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#31684d',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  loader: {
    marginTop: 0,
  },
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    width: "100%"
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

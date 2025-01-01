import { useState, useEffect } from 'react';
import * as Location from 'expo-location';

const useLocation = (options = {}) => {
  const [location, setLocation] = useState({
    latitude: null, //45.4877,
    longitude: null //-75.2540,
  });
  const [locationStatus, setLocationStatus] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    let locationSubscription = null;

    const requestLocationPermission = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocationStatus('Permission Denied');
          return;
        }

        setLocationStatus('Getting Location...');
        
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
        });
        setLocationStatus('You are Here');

        locationSubscription = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.High,
            timeInterval: options.timeInterval || 5000, // Defaults to 5 seconds
            distanceInterval: options.distanceInterval || 10, // Defaults to 10 meters
          },
          (updatedLocation) => {
            setLocation({
              latitude: updatedLocation.coords.latitude,
              longitude: updatedLocation.coords.longitude,
            });
          }
        );
      } catch (err) {
        setError(err.message);
        setLocationStatus('Error Getting Location');
      }
    };

    requestLocationPermission();

    // Cleanup subscription on component unmount
    return () => {
      if (locationSubscription) {
        locationSubscription.remove();
      }
    };
  }, []);

  return { location, locationStatus, error };
};

export default useLocation;

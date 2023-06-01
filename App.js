import React, { useState, useEffect } from 'react';
import { Text, View, ImageBackground } from 'react-native';
import { Accelerometer } from 'expo-sensors';

const App = () => {
  const [distance, setDistance] = useState(0);
  const [time, setTime] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [kph, setKph] = useState(0);
  const [data, setData] = useState({ x: 0, y: 0, z: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time + 0.1);
      setDistance(distance + ((107208 + 1670) * 0.1));
      setSpeed(distance / time);
    }, 100);
    return () => clearInterval(interval);
  }, [time, distance]);

  useEffect(() => {
    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
    });
    return () => subscription.remove();
  }, []);

  return (
    <View
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: '100%',
      }}>
      <ImageBackground
        source={require('./assets/gif.gif')}
        style={{
          height: '100%',
          width: 'auto',
          flex: 1,
          justifyContent: 'flex-end',
        }}>
        <Text style={{ textAlign: 'center', color: 'white', fontSize: 18, 
        backgroundColor: 'black', padding: 10, paddingBottom: 40}}>
          <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
            Får du nok bevegelse i hverdagen?
          </Text>
            {'\n'}{'\n'}
            <Text style={{ fontSize: 32, fontWeight: 'bold' }}>
              {distance.toFixed()} mil
            </Text>
            {'\n'}
            {'\n'}
            <Text style={{ fontWeight: 'bold' }}>Dette er jo mye lengre enn rådene fra helsedirektoratet! Og det kun på {time.toFixed()} sekunder, gratulerer!{'\n'}
            {'\n'}
            DIN HASTIGHET{'\n'}
            </Text>
            Mobiltelefonens hastighet <Text style={{ fontWeight: 'bold' }}>
            {Math.sqrt(
              data.x * data.x + data.y * data.y + data.z * data.z
            ).toFixed()} km/t</Text>{'\n'}+ Din hastighet i bane rundt sola <Text style={{ fontWeight: 'bold' }}>107208 km/t</Text>{'\n'}+ Din hastighet
            rundt jordas akse <Text style={{ fontWeight: 'bold' }}>1670 km/t</Text>{'\n'}
            <Text style={{ fontSize: 40, fontWeight: 'bold' }}> = {(
              Math.sqrt(data.x * data.x + data.y * data.y + data.z * data.z) +
              speed
            ).toFixed()} km/t</Text>
          </Text>
      </ImageBackground>
    </View>
  );
};

export default App;

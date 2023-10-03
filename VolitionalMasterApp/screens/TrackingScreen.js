import React, { useState, useEffect } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressBar from 'react-native-progress/Bar';

export default function TrackingScreen() {
  const [trackedData, setTrackedData] = useState({});
  const [currentLevel, setCurrentLevel] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('@exerciseDates');
        const level = await AsyncStorage.getItem('@currentLevel');

        if (data) {
          const parsedData = JSON.parse(data);
          console.log("Fetched data from @exerciseDates:", parsedData);
          setTrackedData(parsedData);
        } else {
          console.log("No data found in @exerciseDates");
          setTrackedData({});
        }

        setCurrentLevel(level ? parseInt(level, 10) : 0);
      } catch (e) {
        console.error("Error reading data", e);
        setTrackedData({});
      }
    };

    fetchData();
  }, []);

  const MAX_LEVELS = 11;
  const progress = currentLevel / MAX_LEVELS;

  const dates = Object.keys(trackedData);
  const exerciseCounts = dates.map(date => trackedData[date].length);

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>Прогресс на начальном этапе:</Text>
      <ProgressBar 
        progress={progress} 
        width={Dimensions.get('window').width - 40}
        color="#1E90FF"
        borderWidth={0}
      />

      {dates.length > 0 && exerciseCounts.length > 0 ? (
        <LineChart
          data={{
            labels: dates,
            datasets: [{
              data: exerciseCounts
            }]
          }}
          width={Dimensions.get('window').width - 20}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: '6',
              strokeWidth: '2',
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
      ) : (
        <Text>Недостаточно данных для отображения графика.</Text>
      )}
    </View>
  );
}







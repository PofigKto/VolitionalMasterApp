import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

const TimerScreen = ({ route }) => {
  const { exercise } = route.params;

  const [movement1, setMovement1] = useState(3);
  const [movement2, setMovement2] = useState(3);
  const [pauseTime, setPauseTime] = useState(1);
  const [restTime, setRestTime] = useState(5);

  const [currentTimer, setCurrentTimer] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStage, setCurrentStage] = useState('movement1'); // текущий этап таймера

  const [intervalId, setIntervalId] = useState(null);

  const startTimer = () => {
    if (!isRunning) {
      const id = setInterval(() => {
        setCurrentTimer((prevTime) => prevTime + 1);
      }, 1000);
      setIntervalId(id);
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    pauseTimer();
    setCurrentTimer(0);
    setCurrentStage('movement1');
  };

  useEffect(() => {
    if (isRunning) {
      if (currentStage === 'movement1' && currentTimer >= movement1) {
        setCurrentTimer(0);
        setCurrentStage('movement2');
      } else if (currentStage === 'movement2' && currentTimer >= movement2) {
        setCurrentTimer(0);
        setCurrentStage('pause');
      } else if (currentStage === 'pause' && currentTimer >= pauseTime) {
        setCurrentTimer(0);
        setCurrentStage('rest');
      } else if (currentStage === 'rest' && currentTimer >= restTime) {
        resetTimer(); // закончить цикл и сбросить таймер
      }
    }
  }, [currentTimer, isRunning]);

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>

      <View style={styles.settings}>
        <Text>Движение 1 (сек):</Text>
        <TextInput 
          value={String(movement1)}
          onChangeText={val => setMovement1(Number(val))}
          keyboardType="numeric"
        />
        {/* и так далее для движения 2, паузы и отдыха */}
      </View>

      <Text style={styles.timer}>{currentTimer}</Text>

      <View style={styles.buttons}>
        <Button title="Старт" onPress={startTimer} />
        <Button title="Пауза" onPress={pauseTimer} />
        <Button title="Сброс" onPress={resetTimer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // Ваши стили ...
});

export default TimerScreen;

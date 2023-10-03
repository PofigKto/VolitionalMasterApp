import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const ExerciseDetail = ({ route, navigation }) => {
  const { exercise } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{exercise.name}</Text>
      <Text style={styles.description}>{exercise.description}</Text>
      <Button 
        title="Начать упражнение" 
        onPress={() => navigation.navigate('TimerScreen', { exercise })}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
});

export default ExerciseDetail;

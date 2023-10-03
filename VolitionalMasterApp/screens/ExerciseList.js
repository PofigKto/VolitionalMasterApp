import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { CheckBox } from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

const exercises = [
  {
    id: 1,
    name: "Упражнение 1",
    description: "Подробное описание упражнения 1..."
  },
  {
    id: 2,
    name: "Упражнение 2",
    description: "Подробное описание упражнения 2..."
  },
];

export default function ExerciseList({ navigation }) {
  const [completedExercises, setCompletedExercises] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await AsyncStorage.getItem('@completedExercises');
        if (data && Array.isArray(JSON.parse(data))) {
          setCompletedExercises(JSON.parse(data));
        } else {
          setCompletedExercises([]);
        }
      } catch (e) {
        console.error("Error reading data", e);
        setCompletedExercises([]);
      }
    };

    fetchData();
}, []);

const toggleExerciseCompletion = async (id) => {
  let updatedExercises;

  if (completedExercises.includes(id)) {
    updatedExercises = completedExercises.filter(exerciseId => exerciseId !== id);
  } else {
    updatedExercises = [...completedExercises, id];
  }

  setCompletedExercises(updatedExercises);

  // Сохраняем текущий список выполненных упражнений
  await AsyncStorage.setItem('@completedExercises', JSON.stringify(updatedExercises));

  const today = new Date().toISOString().split('T')[0];
  let exerciseDates = await AsyncStorage.getItem('@exerciseDates');
  if (!exerciseDates) {
    exerciseDates = {};
  } else {
    exerciseDates = JSON.parse(exerciseDates);
  }

  exerciseDates[today] = updatedExercises;
  await AsyncStorage.setItem('@exerciseDates', JSON.stringify(exerciseDates));

  console.log("Updated completed exercises:", updatedExercises);
  console.log("Updated exercise dates:", exerciseDates);
  
};

  return (
    <View style={styles.container}>
      <FlatList
        data={exercises}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.exerciseCard}>
            <TouchableOpacity 
                onPress={() => navigation.navigate('ExerciseDetail', { exercise: item })}
            >
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </TouchableOpacity>
            <CheckBox
              checked={completedExercises.includes(item.id)}
              onPress={() => toggleExerciseCompletion(item.id)}
            />
          </View>
        )}
      />
    </View>
  );
}

// Ваши стили ...


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    exerciseCard: {
        padding: 15,
        backgroundColor: '#f9f9f9',
        marginBottom: 10,
        borderRadius: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 15,
        marginTop: 5,
    },
});

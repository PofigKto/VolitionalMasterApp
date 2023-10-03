import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const ProfileScreen = ({ navigation }) => {
  const [trainingDays, setTrainingDays] = useState(["Понедельник", "Вторник", "Среда", "Четверг", "Пятница"]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Профиль</Text>
      <Text style={styles.label}>Текущий этап: Начальный этап</Text>
      <Text style={styles.label}>Дни тренировок:</Text>
      <Picker
        selectedValue={trainingDays[0]}
        style={styles.picker}
        onValueChange={(itemValue) => setTrainingDays([itemValue])}
      >
        <Picker.Item label="Понедельник" value="Понедельник" />
        <Picker.Item label="Вторник" value="Вторник" />
        <Picker.Item label="Среда" value="Среда" />
        <Picker.Item label="Четверг" value="Четверг" />
        <Picker.Item label="Пятница" value="Пятница" />
        <Picker.Item label="Суббота" value="Суббота" />
        <Picker.Item label="Воскресенье" value="Воскресенье" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ExerciseList')}>
        <Text style={styles.buttonText}>Перейти к упражнениям</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginTop: 10,
  },
  picker: {
    height: 50,
    width: 200, // Увеличьте это значение, например, до 200
    borderColor: 'gray',
    borderWidth: 1,
    marginVertical: 10,
}
,
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
  },
});

export default ProfileScreen;

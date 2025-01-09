import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, KeyboardAvoidingView, Platform, TouchableOpacity, Alert } from 'react-native';
import Task from './components/Task';

export default function App() {

  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([]);
  const [completedTaskItems, setCompletedTaskItems] = useState([]);

  const handleAddTask = () => {
    if (!task || task.trim() === '') {
      if (Platform.OS === 'web') {
        window.alert('Please enter a task before adding!');
      } else {
        Alert.alert(
          "Error",
          "Please enter a task before adding",
          [
            { text: "OK", onPress: () => console.log("OK Pressed") }
          ]
        );
      }
      return;
    }
    setTaskItems([...taskItems, task]);
    setTask('');
  }

  const completeTask = (index) => {
    setCompletedTaskItems([...completedTaskItems, taskItems[index]]);
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <View style={styles.tasksWrapper}>
        <View style={styles.header}>
          <Text style={styles.sectionTitle}>Today's Task</Text>
          <TouchableOpacity style={styles.viewCompletedTasksButton}>
            <Text style={styles.completedTasksText}>View Completed Tasks</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.items}>
          {
            taskItems.map((item, index) => {
              return (
                <TouchableOpacity key={index} onPress={() => completeTask(index)}>
                  <Task text={item} />
                </TouchableOpacity>
              )
            })
          }
        </View>
      </View>

      <View style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}
          onSubmitEditing={handleAddTask}
          blurOnSubmit={false}
          keyboardType="default"
          returnKeyType="done"
          autoCorrect={false}
        />

        <TouchableOpacity onPress={handleAddTask}>
          <View style={styles.addWrapper}>
            <Text style={styles.addTexxt}>+</Text>
          </View>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8EAED',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  viewCompletedTasksButton: {
    backgroundColor: 'green',
    opacity: 0.5,
    padding: 10,
    borderRadius: 10,
  },
  completedTasksText: {
    color: 'white',
    fontSize: 12,
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 30,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 60,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white',
    paddingVertical: 15,
    paddingHorizontal: 15,
    width: 250,
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addWrapper: {
    width: 60,
    height: 60,
    borderRadius: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addTexxt: {},

});

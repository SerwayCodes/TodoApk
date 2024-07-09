import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button, FlatList, TouchableOpacity, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [editText, setEditText] = useState("");

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, { key: Math.random().toString(), text: inputValue }]);
      setInputValue("");
    }
  };

  const deleteTodo = (key) => {
    setTodos(todos.filter(todo => todo.key !== key));
  };

  const openEditModal = (todo) => {
    setSelectedTodo(todo);
    setEditText(todo.text);
    setIsModalVisible(true);
  };

  const editTodo = () => {
    setTodos(todos.map(todo => 
      todo.key === selectedTodo.key ? { ...todo, text: editText } : todo
    ));
    setIsModalVisible(false);
    setSelectedTodo(null);
    setEditText("");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter a new task"
        value={inputValue}
        onChangeText={setInputValue}
      />
      <Button title="Add Task" onPress={addTodo} disabled={!inputValue.trim()} />
      <FlatList
        data={todos}
        renderItem={({ item }) => (
          <View style={styles.todoContainer}>
            <Text style={styles.todo}>{item.text}</Text>
            <View style={styles.iconContainer}>
              <TouchableOpacity onPress={() => deleteTodo(item.key)}>
                <FontAwesome name="trash" size={24} color="red" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openEditModal(item)}>
                <FontAwesome name="edit" size={24} color="blue" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalView}>
          <TextInput
            style={styles.input}
            placeholder="Edit task"
            value={editText}
            onChangeText={setEditText}
          />
          <Button title="Save" onPress={editTodo} />
          <Button title="Cancel" onPress={() => setIsModalVisible(false)} />
        </View>
      </Modal>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: '100%',
  },
  todoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  todo: {
    fontSize: 18,
  },
  iconContainer: {
    flexDirection: 'row',
    width: 60,
    justifyContent: 'space-between',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Task from '../components/Task';

const CompletedTasksScreen = ({ navigation, route }) => {
    const { completedTaskItems } = route.params;

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <View style={styles.header}>
                    <Text style={styles.sectionTitle}>Completed Tasks</Text>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={styles.backButtonText}>Back</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.items}>
                    {completedTaskItems.map((item, index) => (
                        <Task key={index} text={item} />
                    ))}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E8EAED',
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    backButton: {
        backgroundColor: '#55BCF6',
        padding: 5,
        borderRadius: 10,
    },
    backButtonText: {
        color: 'white',
        fontSize: 12,
    },
    items: {
        marginTop: 30,
    },
});

export default CompletedTasksScreen; 
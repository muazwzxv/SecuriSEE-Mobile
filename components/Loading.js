import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';


export default function Loading() {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: -1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});
import React from 'react';
import { View, StyleSheet, Pressable } from "react-native";

import theme from '../theme';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    padding: 10,
    color: "white"
  }
});

const Button = ({ onPress, title }) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        <Text style={styles.text} fontWeight="bold">{title}</Text>
      </View>
    </Pressable>
  );
};

export default Button;
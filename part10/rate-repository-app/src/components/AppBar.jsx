import { View, StyleSheet, Pressable } from 'react-native';
import Constants from 'expo-constants';
import Text from './Text';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e'
  },
  bar: {
    padding: 20,
    fontStyle: 'white'
  },
  tab: {
    color: 'white'
  }
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.bar}>
        <Pressable>
          <Text style={styles.tab}>Repositories</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AppBar;

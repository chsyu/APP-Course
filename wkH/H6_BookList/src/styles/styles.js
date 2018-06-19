import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  leftStyle: {
    flex: 1,
  },
  rightStyle: {
    flex: 2,
  },
  cardStyle: {
    flex: 2,
  },
  itemText: {
    paddingLeft: 30,
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 40,
    fontWeight: 'bold'
  },
  cardDescription: {
    fontSize: 20,
    color: 'gray'
  }
});

export default styles;
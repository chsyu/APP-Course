import { StyleSheet, Text, View } from 'react-native';

export default function Header({ length }) {

  return (
      <View style={styles.header}>
        <Text style={styles.title}>我的日記</Text>
        <Text style={styles.subtitle}>共 {length} 篇日記</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
  },
});


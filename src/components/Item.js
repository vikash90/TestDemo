import {View, StyleSheet, Text} from 'react-native';

export default function Item({id, title}) {
  return (
    <View style={styles.container}>
      <Text style={styles.textObject}>{id}</Text>
      <Text style={styles.textObject}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 325,
    marginRight: 15,
    marginBottom: 15,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 11,
    borderBottomRightRadius: 11,
    borderBottomLeftRadius: 5,
    borderLeftWidth: 8,
    borderLeftColor: '#53A5EC',
  },
  textObject: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
    color: '#2F3247',
    paddingBottom: 5,
    alignSelf: 'flex-start',
  },
});

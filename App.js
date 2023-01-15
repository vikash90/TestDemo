/**
 * Vikash
 * 15/01/2023
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import {StyleSheet, View, StyleSheet, FlatList} from 'react-native';
import ActivityIndicator from './src/components/indicators/ActivityIndicator';
import Item from './src/components/Item';
import {getInstrumentedAxiosInstance} from './src/services/ApiServices';

const App = () => {
  const [dataSource, setDataSource] = useState('');

  useEffect(() => {
    getApi();
  }, []);

  const getApi = () => {
    const url = `/movies.json`;
    getInstrumentedAxiosInstance()
      .get(url)
      .then(res => {
        console.log('res ===================================>', res);
        setDataSource(res.data.movies);
      })
      .catch(err => {
        console.log('err ===================================>', err);
      });
  };
  const renderItem = ({item, index}) => {
    return <Item item={item} index={index} id={item.id} title={item.title} />;
  };

  return (
    <SafeAreaView style={styles.sectionContainer}>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {false && (
          <View>
            <ActivityIndicator size="large" color="#53A5EC" />
          </View>
        )}

        <FlatList
          data={dataSource}
          style={{marginLeft: 15}}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
};
export default App;
const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});
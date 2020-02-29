import React, {useState} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';

import {images} from './images';

const App = () => {
  const [index, setIndex] = useState(0);
  const [imageWidth, setImageWidth] = useState(0);

  const getIndex = i => (i < 0 ? 1 : i);

  const image = images[getIndex(index)];
  const onLayoutImageChange = e => setImageWidth(e.nativeEvent.layout.width);

  const onChangeImage = e => {
    const {locationX} = e.nativeEvent;
    const imageCenter = imageWidth / 2;
    const isXOnCenter = locationX < imageCenter;
    const delta = isXOnCenter ? -1 : +1;
    const nextImageIndex = (index + delta) % images.length;
    setIndex(nextImageIndex);
  };

  return (
    <View style={styles.container}>
      <View style={styles.empty} />
      <TouchableHighlight onPress={onChangeImage} style={styles.image}>
        <View>
          <Image
            source={{uri: image.uri}}
            style={styles.image}
            onLayout={onLayoutImageChange}
          />
          <View styles={styles.labelWrapper}>
            <Text style={styles.imageLabel}>{image.label}</Text>
          </View>
        </View>
      </TouchableHighlight>
      <View style={styles.empty} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7350ff',
  },
  image: {
    flex: 3,
    width: 320,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  imageLabel: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(100, 100, 100, 0.5)',
    color: 'white',
    width: 320,
    fontSize: 18,
  },
  empty: {
    flex: 1,
  },
});

AppRegistry.registerComponent('App', () => App);

export default App;

import React, { Component } from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import Svg from 'react-native-svg-uri';
import {tanhua, near, testSoul} from '../../../../res/fonts/iconSvg';

export default class index extends Component {
  render() {
    return (
      <View>
          <Svg width="40" height="40" fill="#fff" svgXmlData={tanhua}></Svg>
      </View>
    );
  }
}

import React, { Component } from 'react';
import { View, Text, StatusBar } from 'react-native';
import HeaderImageScrollView from 'react-native-image-header-scroll-view';
import {pxToDp} from '../../../utils/styleKits';
import FriendHead from './components/friendHead';

class index extends Component {
  render() {
    return (
      <HeaderImageScrollView
        maxHeight={pxToDp(130)}
        minHeight={pxToDp(44)}
        headerImage={require("../../../res/headfriend.png")}
        renderForeground={() => (
          <View style={{ height: pxToDp(130), justifyContent: "center", alignItems: "center" }} >
            <StatusBar backgroundColor={"transparent"} translucent={true}/>
            <FriendHead/>
          </View>
        )}
      >
        <View style={{ height: 1000 }}>
          <Text>111</Text>
        </View>
      </HeaderImageScrollView>
      // <View style={{ height: 1000 }}>
      //   <Text>111</Text>
      // </View>
    );
  }
}

export default index;

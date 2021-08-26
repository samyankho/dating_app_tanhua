import  React, {Component} from 'react';
import { Button, View, Text, AsyncStorage } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Nav from './src/nav'
import RootStore from "./src/mobx";
import {Provider} from "mobx-react";


class App extends Component {

  async componentDidMount() {
    //获取缓存中的用户数据
    const userInfo = await AsyncStorage.getItem("userinfo");
    info = userInfo ? JSON.parse(userInfo) : {};
    if(info.token){
      RootStore.setUser(info.mobile, info.token, info.userId);
    }
  }

  state = {  }
  render() { 
    return ( 
      <View style={{flex: 1}}>
        <Provider RootStore={RootStore}>
          <Nav></Nav>
        </Provider>
      </View>
     );
  }
}
 
export default App;


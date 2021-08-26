import React, {Component} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/login'
import Demo from './pages/Demo';
import userInfo from './pages/userInfo';
import Tabbar from './tabbar';
import {inject, observer} from 'mobx-react';

const Stack = createStackNavigator();

@inject("RootStore")
@observer
class Nav extends Component {
  
  constructor(props){
    super(props)
    this.state = {
      initialRouteName: this.props.RootStore.token ? "Tabbar": "Login"
    }
  }

  render() { 
    return ( 
      <NavigationContainer> 
        <Stack.Navigator headerMode="none" initialRouteName={this.state.initialRouteName}>
          <Stack.Screen name="Demo" component={Demo} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="UserInfo" component={userInfo} />
          <Stack.Screen name="Tabbar" component={Tabbar} />
        </Stack.Navigator>
      </NavigationContainer>
     );
  }
}
 
export default Nav;


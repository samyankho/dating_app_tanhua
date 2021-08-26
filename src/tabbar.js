import React, { Component } from 'react';
import { View, Text } from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import SvgUri from 'react-native-svg-uri';
import {friend, selectedFriend, group, selectedGroup, message,selectedMessage, my, selectedMy} from './res/fonts/iconSvg';
// import Friend from './pages/friend/home';
import Group from './pages/group/home';
import Message from './pages/message/home';
import My from './pages/my/home';

var Friend = require('./pages/friend/home').default

class index extends Component {

    state = {
        selectedTab: "friend",
        pages: [
            {
                selected: "friend",
                title: "交友",
                renderIcon: () => <SvgUri width="20" height="20" svgXmlData={friend}/>,
                renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedFriend}/>,
                onPress: () => this.setState({ selectedTab: 'friend' }),
                component: <Friend/>
            },
            {
                selected: "group",
                title: "圈子",
                renderIcon: () => <SvgUri width="20" height="20" svgXmlData={group}/>,
                renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedGroup}/>,
                onPress: () => this.setState({ selectedTab: 'group' }),
                component: <Group/>
            },
            {
                selected: "message",
                title: "消息",
                renderIcon: () => <SvgUri width="20" height="20" svgXmlData={message}/>,
                renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedMessage}/>,
                onPress: () => this.setState({ selectedTab: 'message' }),
                component: <Message/>
            },
            {
                selected: "my",
                title: "我的",
                renderIcon: () => <SvgUri width="20" height="20" svgXmlData={my}/>,
                renderSelectedIcon: () => <SvgUri width="20" height="20" svgXmlData={selectedMy}/>,
                onPress: () => this.setState({ selectedTab: 'my' }),
                component: <My/>
            }
        ]
    }

  render() {
    return (
      <View style={{flex:1, backgroundColor:"#fff"}}>
            <TabNavigator>
                {this.state.pages.map((e, i) => <TabNavigator.Item key={i}
                    selected={this.state.selectedTab ===  e.selected}
                    title={e.title}
                    renderIcon={e.renderIcon}
                    renderSelectedIcon={e.renderSelectedIcon}
                    onPress={e.onPress}
                    selectedTitleStyle={{color: "#c863b5"}}
                    tabStyle={{backgroundColor:"#eee", justifyContent:"center"}}
                >{e.component}
                </TabNavigator.Item>)}
            </TabNavigator>
      </View>
    );
  }
}

export default index;
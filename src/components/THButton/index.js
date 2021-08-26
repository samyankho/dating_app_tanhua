import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class index extends Component{

  // constructor(props) {
  //   super(props);
  //   this.state = { count: 0 };
  // }

  static defaultProps={
    style : {},
    textStyle: {},
    disable: false
  }

    render(){
        return(
          <TouchableOpacity
            disabled={this.props.disable}
            style={[styles.button, this.props.style]}
            onPress={this.props.onPress}
          >
            <Text style={[styles.buttonText, this.props.style]}>{this.props.children}</Text>
          </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: "center",
    backgroundColor: "#FC3245",
    borderRadius: 28,
    padding: 10,
    height: 50,
  },
  buttonText:{
    color: '#FFFFFF',
    textAlign: 'center'
  }
});

export default index;
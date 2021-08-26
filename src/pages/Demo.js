import React, {Component} from 'react';
import {SafeAreaView, Text, StyleSheet} from 'react-native';
 
import {
  CodeField,
  Cursor,
} from 'react-native-confirmation-code-field';
 
const styles = StyleSheet.create({
  root: {flex: 1, padding: 20},
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    lineHeight: 38,
    fontSize: 24,
    borderBottomWidth: 2,
    borderColor: '#00000030',
    color: '#7d53ea',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#7d53ea',
    color: '#7d53ea'
  },
});
 
export default class App extends Component {
    state={
        codeText: ""
    }

    codeChange = (codeText)=> {
        this.setState({codeText})
    }

  render() {
    return (
          <CodeField
            value={this.state.codeText}
            onChangeText={this.codeChange}
            cellCount={6}
            rootStyle={styles.codeFiledRoot}
            keyboardType="number-pad"
            renderCell={({index, symbol, isFocused}) => (
              <Text
                key={index}
                style={[styles.cell, isFocused && styles.focusCell]}>
                {symbol || (isFocused ? <Cursor /> : null)}
              </Text>
            )}
          />
      );
  }
}
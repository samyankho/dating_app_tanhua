import React, { Component } from 'react';
import {View, Text, Image, StatusBar, StyleSheet, AsyncStorage} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import { Input } from 'react-native-elements';
import validator from '../../utils/validator';
import request from '../../Api/request';
import {ACCOUNT_LOGIN, ACCOUNT_VALIDATEVCODE} from '../../Api/api';
import THButton from '../../components/THButton';
import Toast from '../../utils/Toast';
import {
    CodeField,
    Cursor,
  } from 'react-native-confirmation-code-field';
import {inject,observer} from "mobx-react";

@inject("RootStore")
@observer
export default class index extends Component {

    state = {
        phoneNumber: "13710641319",
        phoneVaild: true,
        showLogin: true,
        codeText: "",
        btnText: "重新获取",
        beingCountDown: false,
    }

    countDown=() => {
        if(this.state.beingCountDown){
            return;
        }

        this.setState({beingCountDown: true})

        let second = 5;
        this.setState({btnText: `重新获取(${second}s)`})
        let timeID = setInterval(()=>{
            second--; 
            this.setState({btnText: `重新获取(${second}s)`})
            if(second === 0){
                clearInterval(timeID)
                this.setState({btnText: "重新获取", beingCountDown: false})
            }
        }, 2500)
    }

    codeChange = (codeText)=> {
        this.setState({codeText})
    }

    codeFinish = async()=>{
        const {phoneNumber, codeText} = this.state;
        if(codeText.length!==6){
            Toast.message("验证码错误", 3000, "center")
            return;
        }

        const res = await request.post(ACCOUNT_VALIDATEVCODE, {
            phone: phoneNumber,
            vcode: codeText
        });

        if(res.code!=="10000"){
            console.log(res)
            return;
        }

        // 存入mobx
        this.props.RootStore.setUser(phoneNumber, res.data.token, res.data.id)

        // 存入缓存
        AsyncStorage.setItem("userinfo", JSON.stringify({
            mobile: phoneNumber,
            token: res.data.token,
            userId: res.data.id
        }))

        if(res.data.isNew){
            this.props.navigation.navigate("UserInfo")
        }else{
            this.props.navigation.navigate("Tabbar")
        }

    }

    onChangePhoneNum = (phoneNumber) => {
        this.setState({phoneNumber})
        // console.log(phoneNumber);
    }

    onSubmitPhoneNum = async() => {
        let {phoneNumber} = this.state;
        const phoneVaild = validator.validatePhone(phoneNumber);
        if(!phoneVaild){
            this.setState({phoneVaild});
            return;; 
        }

        const res = await request.post(ACCOUNT_LOGIN, {phone: phoneNumber})
        console.log(res)
        if(res.code === "10000"){
            // success
            this.setState({showLogin: false})
            this.countDown()
        }
    }

    renderLogin= () =>{
        let {phoneNumer, phoneVaild} = this.state;
        return(
            <View>
                <View><Text style={{fontSize: pxToDp(25), color: "#888", fontWeight: "bold"}}>手机号登录注册</Text></View>
                <View style={{marginTop: pxToDp(20)}}>
                    <Input
                        placeholder='请输入手机号码'
                        maxLength={11}
                        keyboardType="phone-pad"
                        inputStyle={{color: '#333'}}
                        value = {phoneNumer}
                        onChangeText={this.onChangePhoneNum}
                        onSubmitEditing={this.onSubmitPhoneNum}
                        errorMessage={phoneVaild?"":"请输入正确的手机号码"}
                        leftIcon={{ type: 'font-awesome', name: 'phone', color:'#ccc', size:pxToDp(20) }}
                    />
                </View>

                <View style={{marginTop: pxToDp(20)}}>
                    <THButton style={{width: 300, alignSelf: 'center'}}
                        onPress={this.onSubmitPhoneNum}>获取验证码</THButton>
                </View>
            </View>
        );
    }

    resendCode = ()=>{
        this.countDown()
    }

    renderCode = ()=>{
        let {phoneNumer, btnText} = this.state.phoneNumber;
        return (<View>
            <View><Text style={{fontSize: pxToDp(25), color:"#888", fontWeight:"bold"}}>输入6位验证码</Text></View>
            
            <View style={{marginTop: pxToDp(15)}}>
                <Text style={{color: "#888"}}>已发送到: {phoneNumer}</Text>
            </View>

            <View>
                <CodeField
                value={this.state.codeText}
                onChangeText={this.codeChange}
                onSubmitEditing={this.codeFinish}
                cellCount={6}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}>
                    {symbol||(isFocused?(<Cursor/>):null)}
                </Text>
                )}
            />
            </View>

            <View style={{marginTop: pxToDp(20)}}>
                <THButton onPress={this.resendCode} disable={this.state.beingCountDown}
                style={{width:300, alignSelf: 'center'}}>{this.state.btnText}</THButton>
            </View>
        </View>)
    }
 
  render() {
    return (
      <View>
            <StatusBar backgroundColor="transparent" translucent={true}></StatusBar>

            <Image source={require("../../res/profileBackground.jpg")} style={{width:"100%", height:pxToDp(200)}}></Image>

            <View style={{padding: pxToDp(20)}}>
                {this.state.showLogin ? this.renderLogin() : this.renderCode()}
            </View>

            
      
      </View>
    );
  }
}

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
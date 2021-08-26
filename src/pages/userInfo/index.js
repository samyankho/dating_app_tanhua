import React, { Component } from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, TextInput} from 'react-native';
import {pxToDp} from '../../utils/styleKits';
import DatePicker from 'react-native-datepicker';
import Picker from 'react-native-picker';
import CityJson from '../../res/citys.json';
import THButton from '../../components/THButton';
import Toast from '../../utils/Toast';
import ImagePicker from 'react-native-image-crop-picker';
import {Overlay} from 'teaset';
import {inject, observer} from 'mobx-react';
import request from '../../Api/request';
import {ACCOUNT_CHECKHEADIMAGE, ACCOUNT_REGINFO} from '../../Api/api';

let boy = require("../../res/boy.png");
let boySelected = require("../../res/boy-sel.png");
let girl = require("../../res/girl.png");
let girlSelected = require("../../res/girl-sel.png");

@inject("RootStore")
@observer
export default class index extends Component {

    state={
        "nickname": "",
        "gender": "男",
        "birthday": "",
        "city": "",
        "header": "",
        "lng": "113.2540973",
        "lat": "23.087102",
        "address": "广州"
    }

    componentDidMount() {
        console.log(this.props)
    }

    chooseGender= (gender)=>{
        this.setState({gender})
    }

    // 城市选择器
    showPicker= ()=>{
        Picker.init({
            pickerData: CityJson,
            selectedValue: ["北京", "北京"],
            wheelFlex: [1, 1, 0], // 显示省和市
            pickerConfirmBtnText: "确定",
            pickerCancelBtnText: "取消",
            pickerTitleText: "选择城市",
            onPickerConfirm: data => {
              this.setState({city: data[1]});
            }
          });
        Picker.show();
    }

    // 设置头像
    setAvatar= async()=>{
        const {nickname, birthday, city} = this.state
        if(!nickname||!birthday||!city){
            Toast.sad("请填写合法的信息", 3000, "center")
            return;
        }

        const image = await ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        })
        console.log(image)

        let overlayViewRef = null
        // 扫描的效果
        let overlayView = (
            <Overlay.View
              style={{alignItems: 'center', justifyContent: 'center', flex:1, backgroundColor:"#000"}}
              modal={true}
              overlayOpacity={0}
              ref={v => overlayViewRef = v}
              >
              <View style={style.scanContainer}>
                  <Image style={style.image} source={require("../../res/scan.gif")}/>
                  <Image style={{width:"60%", height: "60%"}} source={{uri:image.path}}/>
              </View>
            </Overlay.View>
        );
        Overlay.show(overlayView);


        // 上传头像
        const uploadResult = await this.uploadAvatar(image)
        console.log(uploadResult)
        if(uploadResult.code !== "10000"){
            return;
        }

        let params = this.state;
        params.header = uploadResult.data.headImgPath;
        console.log(params)

        const res = await request.privatePost(ACCOUNT_REGINFO, params);
        console.log(res)

        // 关闭覆盖层
        overlayViewRef.close()
        Toast.smile("操作成功！", 2000, "center")
        setTimeout(()=>{
            alert("跳转")
            this.props.navigation.navigate("Tabbar")
        },2000)
    }

    uploadAvatar = (image)=>{
        let formData = new FormData();
        formData.append("headPhoto", {
            uri: image.path,
            type: image.mime,
            name: image.path.split("/").pop()
        });

        // 上传头像
        return request.privatePost(ACCOUNT_CHECKHEADIMAGE, formData, {
            headers: {
                "Content-Type": "multipart/form-data"            }
        })
    }

    render() {
        const {gender, nickname, city} = this.state
        const date = new Date();
        const currentDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        return (
            <View style={style.background}>
                <View><Text style={style.text}>填写资料</Text></View>
                <View><Text style={style.text}>提升我的魅力值</Text></View>

                <View style={{marginTop: pxToDp(20)}}>
                    <View style={style.svgContainer}>
                        <TouchableOpacity onPress={this.chooseGender.bind(this, "男")}>
                            <Image source={this.state.gender==="男"?boySelected:boy} style={this.state.gender==="男"?style.svgSelected:style.svg}/>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.chooseGender.bind(this, "女")}>
                            <Image source={this.state.gender==="女" ? girlSelected : girl} style={style.svg}/>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={{marginTop: pxToDp(40)}}>
                    <TextInput value={nickname} placeholder="请填写用户名" 
                    style={style.input} onChangeText={(nickname)=>{this.setState({nickname})}}/>
                </View>

                <DatePicker
                        style={{ width: "100%", marginTop: pxToDp(30)}} 
                        date={this.state.birthday}
                        mode="date"
                        placeholder="请填写生日"
                        format="YYYY-MM-DD"
                        maxDate={currentDate}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        androidMode="spinner"
                        customStyles={{
                            dateIcon:{display:'none'},
                            dateInput: {
                                borderWidth: 0,
                                borderBottomWidth: 2,
                                borderBottomColor: "#eee",
                                alignItems:"flex-start",
                                paddingLeft: 10,
                                textAlign:"left"
                            },
                            placeholderText:{
                                fontSize: pxToDp(20),
                                color:"#afafaf"
                            }
                        }}
                        onDateChange={(date) => { this.setState({ birthday: date }) }}
                />

                <View style={{marginTop: pxToDp(30)}}>
                    <TouchableOpacity onPress={this.showPicker}>
                        <TextInput value={city} placeholder="请填写地址" style={style.input} editable={false}/>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: pxToDp(30)}}>
                    <THButton onPress={this.setAvatar}>完成</THButton>
                </View>

            </View>
        );
    }
}

const style = StyleSheet.create({
    text: {
        color: "#666",
        fontWeight: 'bold',
        fontSize: pxToDp(20)
    },
    background:{
        backgroundColor:"#fff", 
        flex:1, 
        paddingTop: pxToDp(50),
        padding: pxToDp(20)
    },
    svgBackground:{
        width: pxToDp(100),
        height: pxToDp(100),
        borderRadius: pxToDp(30),
        backgroundColor: '#eee',
        justifyContent: 'center',
        alignItems: 'center'
    },
    svgContainer:{
        width: '70%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around',
    },
    svg:{
        width: pxToDp(90),
        height: pxToDp(90),
    },
    svgSelected:{
        width: pxToDp(100),
        height: pxToDp(100),
    },
    input:{
        borderBottomWidth: 2,
        borderBottomColor: '#eee',
        fontSize: pxToDp(20),
        paddingLeft: 10,
    },
    scanContainer:{
        marginTop: pxToDp(30),
        alignSelf: 'center',
        width: pxToDp(334),
        height: pxToDp(334),
        position: "relative",
        justifyContent: 'center',
        alignItems: "center"
    },
    image:{
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0, left: 0, 
        zIndex: 100
    }
})
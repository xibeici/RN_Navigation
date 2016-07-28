/**
 * creat by JaAa
 */
'use strict'
import React, { Component } from 'react';
import Base from './Common/Constant';
import RightItemRender from './Base/BaseView/RightNavItemRender';
import {
    StyleSheet,
    Navigator,
    View,
    TouchableOpacity,
    Image,
    Text,
    Platform
} from 'react-native';

const PAGE_BACK_ICON = require('../resource/page_back_icon.png');

export default class NavHeader extends React.Component {
  propTypes: {
    //右侧item，默认没有
    rightItem: PropTypes.func,
    //是否有中间item，默认title
    middleView: PropTypes.func,
    //左侧item，默认没有
    leftItem: PropTypes.func,
    //nav标题，当设置了middleView后，此标题无效
    title: PropTypes.string,
    //返回方法，
    popFunc: PropTypes.func,
    //导航，必须传
    nav:PropTypes.Object,
  }
  /**
   * 点击默认的返回按钮触发事件
   */
  _pressBack() {
    if (this.props.popFunc) {
      this._backPop();
      this.props.popFunc();
    }else {
      this._backPop();
    }
  }
  /**
   * pop返回
   * @return null
   */
  _backPop() {
    const {nav} = this.props;
    if (nav) {
        nav.pop();
    }
  }
  /**
   * 获取右侧Item组件，没有的时候默认没有
   * @return 组件
   */
  _getNavRightItem() {
    if (this.props.rightItem) {
      return (<RightItemRender
        render={this.props.rightItem}/>)
    }else {
      return(
        <View>
        </View>
      )
    }
  }
  /**
   * 获取中间Item组件，没有的时候默认title
   * @return 组件
   */
  _getNavMiddleView() {
    if (this.props.middleView) {
      return (<RightItemRender style={styles.centerView}
        render={this.props.middleView}/>)
    }else {
      return (<Text style={styles.title}>{this.props.title}</Text>)
    }
  }
  /**
   * 获取左侧Item组件，没有的时候默认返回按钮
   * @return 组件
   */
  _getNavLeftItem(){
    if (this.props.leftItem) {
      return (<RightItemRender styles={styles.leftcontent}
        render={this.props.leftItem}/>)
    }else {
      return(
        <TouchableOpacity onPress={() => this._pressBack()} underlayColor = "#f6f6f6">
            <Image source={PAGE_BACK_ICON} style={styles.leftItem}/>
        </TouchableOpacity>
      )
    }
  }
  render() {
      return (
          <View style={styles.header}>
              <View style={styles.content}>
                <View style={styles.leftcontent}>
                  {this._getNavLeftItem()}
                </View>
                <View style={styles.midcontent}>
                  {this._getNavMiddleView()}
                </View>
                <View style={styles.rightcontent}>
                  {this._getNavRightItem()}
                </View>
              </View>
              <View style={styles.line}/>
          </View>
      )
  }
}
  const styles = StyleSheet.create({
    header: {
        flexDirection: 'column',
        backgroundColor: '#f9f9f9',
        paddingTop: Platform.OS === 'ios' ? 20 : 0,  // 处理iOS状态栏
        height: Platform.OS === 'ios' ? 68 : 48,   // 处理iOS状态栏
    },
    content: {
      flexDirection: 'row',
      flex:1,
      height:47.5,
      alignItems: 'center',
      justifyContent:'space-between',

    },
    leftcontent: {
      width:Base.screenWidth/5,
      flex:1,
      height:47.5,
      alignItems:'center',
      flexDirection: 'row',
    },
    midcontent:{
      width:Base.screenWidth*3/5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'center',
    },
    rightcontent: {
      width:Base.screenWidth/5,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent:'flex-end',
    },
    title: {
        flex: 1,
        fontSize: 17,
        color: '#212121',
        textAlign: 'center',
        alignSelf: 'center',
    },
    centerView: {
      flexDirection: 'row',
      alignSelf: 'center',
    },
    line: {
        height: 0.5,
        width: Base.screenWidth,
        backgroundColor: '#eaeaea',
    },
    leftItem: {
        left: 0,
        width: 50,
        height: 17,
        resizeMode: 'contain',
    }
  });

import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Icon } from 'native-base';
import { Constants } from 'expo';
import { createStackNavigator, createNavigationContainer } from 'react-navigation';
import firebase, { database } from 'firebase';
import BoardList from './BoardList';
import PropTypes from "prop-types";
import { ForceTouchGestureHandler } from 'react-native-gesture-handler';



export default class BoardTab extends Component {

  static navigationOptions = {
    tabBarIcon: ({ tintColor }) => (
      <Icon name='md-list-box' style={{ color: tintColor }} />
    )
  }

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      name: '',
      password: '',
      keyvalue: 0,
      number: 0,
      wholeData: [],
      username: '                                               제목                                                          ',
      dataone: {},
      usernames: [],
      searchText: ''

    };
  }



  componentWillMount() {

    var config = {
      apiKey: "AIzaSyDE01SRVB6g99NCtlYfhgpW-3Ctc4PZdpg",
      authDomain: "reactnativedatabase-e3164.firebaseapp.com",
      databaseURL: "https://reactnativedatabase-e3164.firebaseio.com",
      projectId: "reactnativedatabase-e3164",
      storageBucket: "reactnativedatabase-e3164.appspot.com",
      messagingSenderId: "5654389138",
      appId: "1:5654389138:web:91ada309162d79ce"
    };
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    firebase.database().ref('user').on('value', (data) => {

      // console.log(data.toJSON());

      // this.state.wholeData=data.toJSON();


      //console.log(this.state.wholeData);


    }) //객체 전부다 출력

    firebase.database().ref().on('value', snapshot => {
      this.setState({ wholeData: snapshot.val() });
      // console.log(this.state.wholeData); //wholeData에 객체배열 들어감!!!
    })


  }

  setUsername = (text) => {
    const { username } = this.state;
    this.setState({
      username: text
    });

  }


  callBoardList = () => {
    return (
      <BoardList username={this.state.username} />
    )
  };

  putList = () => {
    const { wholeData, username, usernames } = this.state;

    return (

      Object.values(wholeData).map((info, i) => {
        const dataone = info[i];

        usernames[i] = info[i].username //i가 객체를 다 넣어야 되는데 반복문 한번만 하고 끝남/ 객체의 키값이 문자열이라서 그럴수도

        { this.state.username = dataone.username }

        <BoardList username={this.state.username} />//출력안됨

        { this.callBoardList() }//출력안됨

        console.log(this.state.usernames)


      })
    )



  };


  render() {
    const { wholeData, username } = this.state;
    return (
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }}>


          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />
          <BoardList username={this.state.username} />


        </ScrollView>
      </View>


    );



  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

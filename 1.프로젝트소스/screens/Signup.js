import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import firebase from '../lib/firebase';
export default class SignUp extends Component {
  state = {
    email: '',
    name: '',
    password: '',
    passwordConfirmation: '',
    errors: [],
    isLoading: false,
  }


  handleSignUp() {
    const { passwordConfirmation, email, name, password } = this.state;
    const errors = [];
    Keyboard.dismiss();
    let check = false;

    // 없으면 체크해주는 기능
    if (!email) errors.push('email');
    if (!name) errors.push('name');
    if (!password) errors.push('password');
    if (!passwordConfirmation) errors.push('passwordConfirmation');
    this.setState({ errors, isLoading: false });

    /* //빈 것이 0이어야지 들어간다.
    let userPasswordConfirmation = this.state.passwordConfirmation;
    let userEmail = this.state.email;
    let userPassword = this.state.password;
    let userName = this.state.username;


    console.log('------------------------------------------------------------------------------');
    console.log('에러 갯수: ' + errors.length);
    console.log('passwordConfirmation : ' + this.state.passwordConfirmation);
    console.log('email : ' + this.state.email);
    console.log('name : ' + this.state.username);
    console.log('pass : ' + this.state.password);
 */



    /*  if (errors.length != 0) {
       return;
     }
 
     if (this.state.password.length < 6) {
       Alert.alert(
         '비밀번호 6자 이상이여야 합니다',
         '확인해주세요.');
       return;
 
     }
 
     if (this.state.password != this.state.passwordConfirmation) {
       Alert.alert(
         '비밀번호가 일치하지 않습니다',
         '확인해주세요.');
       return;
     } */




    this.setState({ isLoading: true });

    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        // Add the new user to the users table
        firebase.database().ref()
          .child('users')
          .push({
            email: this.state.email,
            uid: user.uid,
            name: this.state.name,
          });
        this.setState({ isLoading: false });
        console.log("머야엄야ㅓㅁ");
        return this.props.navigation.navigate('Login');
      }).catch((error) => {
        console.log("error :" + error.code);
        console.log("error :" + error);
        Alert.alert(
          error.message
      )
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    const { navigation } = this.props;
    const { loading, errors } = this.state;
    const hasErrors = key => errors.includes(key) ? styles.hasErrors : null;

    return (
      <KeyboardAvoidingView style={styles.signup} behavior="padding" >
        <Block padding={[0, theme.sizes.base * 2]}>
          <Block middle>
            <Text h1 bold>Sign Up</Text>
            <Input
              label="name"
              error={hasErrors('name')}
              style={[styles.input, hasErrors('name')]}
              defaultValue={this.state.name}
              onChangeText={text => this.setState({ name: text })}
            />
            <Input
              email
              label="Email"
              error={hasErrors('email')}
              style={[styles.input, hasErrors('email')]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Input
              secure
              label="Password"
              error={hasErrors('password')}
              style={[styles.input, hasErrors('password')]}
              defaultValue={this.state.password}
              onChangeText={text => this.setState({ password: text })}
            />
            <Input
              secure
              label="passwordConfirmation"
              error={hasErrors('passwordConfirmation')}
              style={[styles.input, hasErrors('passwordConfirmation')]}
              defaultValue={this.state.passwordConfirmation}
              onChangeText={text => this.setState({ passwordConfirmation: text })}
            />
            <Button gradient onPress={() => this.handleSignUp()}>
              {loading ?
                <ActivityIndicator size="small" color="white" /> :
                <Text bold white center>Sign Up</Text>
              }
            </Button>

            <Button onPress={() => navigation.navigate('Login')}>
              <Text gray caption center style={{ textDecorationLine: 'underline' }}>
                Back to Login
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  signup: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent,
  }
})

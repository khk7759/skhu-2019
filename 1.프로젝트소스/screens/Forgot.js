import React, { Component } from 'react';
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native';

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import validateForm from './helpers/validation';
import { showMessage } from 'react-native-flash-message';
import api from './api';
export default class Forgot extends Component {
  state = {
    email: '',
    isLoading: false,
  };

  runValidation = () => {
    const { email } = this.state;

    const fields = [
      {
        value: email,
        verify: [
          {
            type: 'isPopulated',
            message: 'Please enter your email address',
          },
          {
            type: 'isEmail',
            message: 'Please format your email address correctly',
          },
        ],
      },
    ];

    const errorMessage = validateForm(fields);
    if (errorMessage) {
      showMessage({
        message: 'Check your form',
        description: errorMessage,
        type: 'danger',
      });

      return false;
    }

    return true;
  }

  sendPasswordResetEmail = () => {
    const { email } = this.state;

    const isFormValid = this.runValidation();
    if (!isFormValid) {
      return;
    }

    this.setState({ isLoading: true });

    api.sendPasswordResetEmail(email)
      .then(() => {
        this.setState({ isLoading: false });
        Alert.alert('email을 확인해주세요.');
        this.props.navigation.navigate('Login')
      })
      .catch((error) => {
        showMessage({
          message: 'Check your form',
          description: `${error.message} (${error.code})`,
          type: 'danger',
        });
        this.setState({
          isLoading: false,
        });
      });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.forgot} behavior="padding" isLoading={this.state.isLoading}>
        <Block padding={[0, theme.sizes.base * 2]}>
          <Text h1 bold>Forgot</Text>
          <Block middle>
            <Input
              label="Email"
              keyboardType="email-address"
              style={[styles.input]}
              value={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
            <Button gradient onPress={this.sendPasswordResetEmail}>
                <Text bold white center>RESET PASSWORD</Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  forgot: {
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

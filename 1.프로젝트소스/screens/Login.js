import React, { Component } from 'react'
import { Alert, ActivityIndicator, Keyboard, KeyboardAvoidingView, StyleSheet } from 'react-native'

import { Button, Block, Input, Text } from '../components';
import { theme } from '../constants';
import firebase from '../lib/firebase';
//추가  import
import { signInApp } from './auth';

export default class Login extends Component {
    state = {
        email: '',
        password: '',
        isLoading: false,
    }

    // componentDidMount추가
  /*   componentDidMount() {
        const messageProps = get(this.props, 'navigation.state.params.messageProps');
        if (messageProps) {
            const { title, body, type } = messageProps;

            showMessage({
                message: title,
                description: body,
                type,
            });
        }
    } */

    handleLogin() {
        const { navigation } = this.props;
        const { email, password } = this.state;

        Keyboard.dismiss();
    
        let userPassword = password;
        let userEmail = email;
        let loading = false;
        if (1 === 0) {
            navigation.navigate('Browse');
        } else if (userEmail == '') {
            Alert.alert(
                '이메일을 적지 않았습니다',
                '확인해 주세요.'
            )
        } else if (userPassword == "") {
            Alert.alert(
                '비밀번호를 적지 않았습니다',
                '확인해 주세요.'
            )
        } else {
            loading = true;
        }

        if (!loading) {
            return;
        }
        firebase.auth().signInWithEmailAndPassword(email, password).then(() => {
                this.setState({ isLoading: false });
                signInApp().then(() => this.props.navigation.navigate('Browse'));
            })
            .catch(() => {
                Alert.alert(
                    '아이디와 비밀번호가 옳지 않습니다'
                )
                this.setState({
                    isLoading: false,
                });
            });
    }


    render() {
        const { navigation } = this.props;
        const { loading, errors } = this.state;

        return (
            <KeyboardAvoidingView style={styles.login} behavior="padding">
                <Block padding={[0, theme.sizes.base * 2]}>
                    <Text h1 bold>Login</Text>
                    <Block middle>
                        <Input
                            label="email"
                            style={[styles.input]}
                            defaultValue={this.state.email}
                            onChangeText={text => this.setState({ email: text })}
                        />
                        <Input
                            secure
                            label="Password"
                            style={[styles.input]}
                            defaultValue={this.state.password}
                            onChangeText={text => this.setState({ password: text })}
                        />
                        <Button gradient onPress={() => this.handleLogin()}>
                            {loading ?
                                <ActivityIndicator size="small" color="white" /> :
                                <Text bold white center>Login</Text>
                            }
                        </Button>

                        <Button onPress={() => navigation.navigate('Forgot')}>
                            <Text gray caption center style={{ textDecorationLine: 'underline' }}>Forgot your password?</Text>
                        </Button>
                    </Block>
                </Block>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    login: {
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

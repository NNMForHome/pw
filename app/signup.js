import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text, Input, Button, Icon } from 'react-native-elements'
import { ScrollView } from 'react-navigation'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { KeyboardAvoidingView, Dimensions, StyleSheet } from 'react-native'
import signupStore from '../store/signupStore'
import { observer } from 'mobx-react'

@observer
export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Sign Up'
    }

    constructor(props) {
        super(props)
    }

    render() {
        const {
            onChangeEmail,
            onChangePassword,
            onChangeName,
            onChangeRePassword,
            onSignUp,
            errorText,
            isError,
            isLoading,
            isPasswordEqual,
            isCorrectEmail,
            email,
            password,
            repassword,
            name,
            isCorrectName
        } = signupStore

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={50 + getStatusBarHeight()}
                behavior="padding"
            >
                <ScrollView style={{ backgroundColor: '#ecebf2' }}>
                    <View style={styles.block}>
                        <Input
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            leftIcon={
                                <Icon
                                    name="mail"
                                    type="antdesign"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            errorMessage={
                                !isCorrectEmail && email.length > 3
                                    ? 'Invalid Email'
                                    : ''
                            }
                            label="email"
                            placeholder="email@address.com"
                            onChange={e => onChangeEmail(e.nativeEvent.text)}
                        />
                        <Input
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            leftIcon={
                                <Icon
                                    name="user"
                                    type="antdesign"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            label="name"
                            errorMessage={!isCorrectName && name.length > 0 ? 'Invalid Username' : ''}
                            placeholder="name"
                            onChange={e => onChangeName(e.nativeEvent.text)}
                        />
                        <Input
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="entypo"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            errorMessage={
                                isPasswordEqual ? null : 'Passwords not equal'
                            }
                            placeholder="password"
                            secureTextEntry
                            label="password"
                            onChange={e => onChangePassword(e.nativeEvent.text)}
                        />
                        <Input
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            leftIcon={
                                <Icon
                                    name="lock"
                                    type="entypo"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            errorMessage={
                                isPasswordEqual ? null : 'Passwords not equal'
                            }
                            placeholder="password"
                            label="repeat password"
                            secureTextEntry
                            onChange={e =>
                                onChangeRePassword(e.nativeEvent.text)
                            }
                        />

                        {isError && (
                            <Text
                                style={{
                                    textAlign: 'center',
                                    color: 'red',
                                    marginBottom: 8
                                }}
                            >
                                {errorText}
                            </Text>
                        )}
                        <Button
                            loading={isLoading}
                            icon={
                                <Icon
                                    type="antdesign"
                                    name="adduser"
                                    color="white"
                                />
                            }
                            disabled={!isCorrectEmail || password.length == 0 || repassword.length == 0 || !isPasswordEqual || !isCorrectName}
                            containerStyle={{ width: 240 }}
                            title="Sign Up"
                            onPress={onSignUp}
                        />
                        <TouchableOpacity
                            style={{ marginTop: 8 }}
                            onPress={() => this.props.navigation.popToTop()}
                        >
                            <Text style={{ color: 'blue' }}>or Log In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    block: {
        flex: 1,
        alignItems: 'center',
        padding: 4,
        margin: 16,
        width: Dimensions.get('window').width - 32,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,

        elevation: 4
    }
})

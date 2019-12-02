import React from 'react'
import {
    View,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import { Text, Input, Button, Icon } from 'react-native-elements'
import authStore from '../store/authStore'
import { observer } from 'mobx-react'
import { Spinner, Toast } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import loginStore from '../store/loginStore'

@observer
export default class Login extends React.Component {
    static navigationOptions = {
        title: 'Log In'
    }

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true
        }
    }

    async componentDidMount() {
        await authStore.initial()
        this.setState({ isLoading: false })
        if (authStore.id_token) {
            this.props.navigation.replace('main')
        }
    }

    render() {
        if (this.state.isLoading) {
            return (
                <View>
                    <Spinner />
                </View>
            )
        }
        const {onChangeEmail, onChangePassword, onLogIn, isError, errorText, isReqLoading } = loginStore

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={50 + getStatusBarHeight()}
                behavior="padding"
            >
                <ScrollView style={{ backgroundColor: '#ecebf2' }}>
                    <View style={[styles.block]}>
                        <Input
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            label="email"
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            leftIcon={
                                <Icon
                                    type="antdesign"
                                    name="mail"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            onChange={e =>
                                onChangeEmail(e.nativeEvent.text)
                            }
                        />
                        <Input
                            containerStyle={{
                                margin: 16,
                                width: Dimensions.get('window').width * 0.75
                            }}
                            label="password"
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            leftIcon={
                                <Icon
                                    type="entypo"
                                    name="lock"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                    style={{
                                        backgroundColor: 'transparent'
                                    }}
                                />
                            }
                            onChange={e =>
                                onChangePassword(e.nativeEvent.text)
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
                            title="Log In"
                            loading={isReqLoading}
                            containerStyle={{ width: 240 }}
                            onPress={onLogIn}
                            icon={
                                <Icon
                                    type="material-community"
                                    color="white"
                                    name="login"
                                />
                            }
                        />
                        <TouchableOpacity
                            style={{ marginTop: 8 }}
                            onPress={() =>
                                this.props.navigation.navigate('signup')
                            }
                        >
                            <Text style={{ color: 'blue' }}>or Sign Up</Text>
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

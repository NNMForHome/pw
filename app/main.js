import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import { Text, Input, Button, Icon, ListItem } from 'react-native-elements'
import authStore from '../store/authStore'
import mainStore from '../store/mainStore'
import { observer } from 'mobx-react'
import HeaderUser from '../components/HeaderUser'
import { Toast, Spinner } from 'native-base'
import { getStatusBarHeight } from 'react-native-status-bar-height'

@observer
export default class Main extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
        headerTitle: 'Main',
        headerRight: () => (
            <Button
            onPress={() => {
                const {logout} = authStore
                logout()
                Toast.show({
                    text: 'Successful Log out!',
                    buttonText: 'Okay',
                    type: 'warning'
                })
                navigation.replace('login')
            }}
            titleStyle={{ marginLeft: 4, color:'blue' }}
            icon={
                <Icon
                    type="font-awesome"
                    size={20}
                    name="power-off"
                    color="blue"
                />
            }
            buttonStyle={{backgroundColor:'white' }}
            containerStyle={{alignSelf: 'center',}}
            title="Log out"
        />)
    }}

    render() {
        const { user, logout } = authStore
        const {
            getUserList,
            userList,
            newTransaction,
            searchString,
            isLoadingUserList,
            req
        } = mainStore
        let reqL = req.length + 1
        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={50 + getStatusBarHeight()}
                behavior="padding"
            >
                <ScrollView style={{ backgroundColor: '#ecebf2' }}>
                    <HeaderUser />

                    <View style={[styles.block]}>
                        <Text style={{alignSelf:'center', marginVertical:8}}>Create Transaction</Text>
                        <Input
                            label="Username"
                            placeholder='search string...'
                            containerStyle={{
                                alignSelf: 'center',
                                width: Dimensions.get('window').width * 0.8
                            }}
                            leftIcon={
                                <Icon
                                    type="antdesign"
                                    name="user"
                                    color="rgba(0, 0, 0, 0.38)"
                                    size={25}
                                />
                            }
                            leftIconContainerStyle={{
                                marginRight: 8,
                                left: -16
                            }}
                            value={searchString}
                            onChange={(e) => getUserList(e.nativeEvent.text, reqL)}
                        />
                        {isLoadingUserList && (
                            <Spinner style={{ alignSelf: 'center' }} />
                        )}
                        {userList.map(
                            ({ id, name },i) =>
                                id != user.id && (

                                    <ListItem
                                        key={i}
                                        leftAvatar={{ title: `${name[0]}${name[name.length-1]}`}}
                                        title={name}
                                        chevron
                                        onPress={() => {
                                            newTransaction(id, name)
                                            this.props.navigation.navigate(
                                                'transaction'
                                            )
                                        }}
                                        rightTitle='Send PW'
                                        bottomDivider={userList.length-1 != i ? true : false}
                                         />

                                )
                        )}
                    </View>                    
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    block: {
        flex: 1,
        padding: 4,
        margin: 8,
        width: Dimensions.get('window').width - 16,
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

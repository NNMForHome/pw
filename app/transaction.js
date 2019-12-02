import React from 'react'
import {
    View,
    Text,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet,
    Dimensions
} from 'react-native'
import authStore from '../store/authStore'
import mainStore from '../store/mainStore'
import { Button } from 'react-native-elements'
import NumericInput from 'react-native-numeric-input'
import { observer } from 'mobx-react'
import HeaderUser from '../components/HeaderUser'
import { getStatusBarHeight } from 'react-native-status-bar-height'

@observer
export default class Transaction extends React.Component {
    static navigationOptions = {
        title: `Transaction`        
    }

    render() {
        const {
            clearTransaction,
            onPW,
            toName,
            PW,
            createTransaction,
            isSendPW
        } = mainStore
        const { user } = authStore

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={50 + getStatusBarHeight()}
                behavior="padding"
            >
                <ScrollView style={{ backgroundColor: '#ecebf2' }}>
                    <HeaderUser />
                    <View style={styles.block}>
                        <Text style={{ textAlign: 'center' }}>
                            Transaction to {toName}
                        </Text>
                        <View
                            style={{ alignSelf: 'center', marginVertical: 16 }}
                        >
                            <Text style={{color:'green', textAlign:'center'}}>Indicate the amount</Text>
                            <NumericInput
                                valueType="integer"
                                minValue={0}
                                totalWidth={240}
                                totalHeight={40}
                                rounded
                                value={PW}
                                onChange={value => onPW(value)}
                            />
                            {user.balance < PW && (
                                <Text
                                    style={{
                                        color: 'red',
                                        flexWrap: 'wrap'
                                    }}
                                >
                                    insufficient funds in the account
                                </Text>
                            )}
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                marginHorizontal: 12
                            }}
                        >
                            <Button
                                title="cancel"
                                onPress={() => {
                                    clearTransaction()
                                    this.props.navigation.popToTop()
                                }}
                            />
                            <Button
                                disabled={PW == 0 || user.balance < PW}
                                onPress={createTransaction}
                                loading={isSendPW}
                                title="Send PW"
                            />
                        </View>
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

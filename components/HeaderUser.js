import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import authStore from '../store/authStore'

import { observer } from 'mobx-react'
import { Avatar } from 'react-native-elements'

@observer
export default class HeaderUser extends React.Component {
    render() {
        const { user } = authStore
        return (
            <View style={styles.block}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-around'
                    }}
                >
                    <View
                        style={{ flexDirection: 'column', alignSelf: 'center' }}
                    >
                        <Text
                            style={{
                                flexWrap: 'wrap',
                                textAlign: 'center',
                                fontSize: 16
                            }}
                        >
                            Username
                        </Text>
                        <Text
                            style={{
                                flexWrap: 'wrap',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {user.name}
                        </Text>
                    </View>
                    <Avatar
                        rounded
                        title={`${user.name[0]}${
                            user.name[user.name.length - 1]
                        }`}
                        size="large"
                    />
                    <View
                        style={{ flexDirection: 'column', alignSelf: 'center' }}
                    >
                        <Text
                            style={{
                                flexWrap: 'wrap',
                                textAlign: 'center',
                                fontSize: 16
                            }}
                        >
                            Balance
                        </Text>
                        <Text
                            style={{
                                flexWrap: 'wrap',
                                textAlign: 'center',
                                fontSize: 20
                            }}
                        >
                            {user.balance}
                        </Text>
                    </View>
                </View>
            </View>
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

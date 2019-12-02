import React from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView
} from 'react-native'
import { Text, Icon, ListItem } from 'react-native-elements'
import historyStory from '../store/historyStore'
import { observer } from 'mobx-react'
import HeaderUser from '../components/HeaderUser'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { Spinner, Picker } from 'native-base'
import mainStore from '../store/mainStore'

@observer
export default class History extends React.Component {
    static navigationOptions = {
        title: `History transaction`
    }

    async componentDidMount() {
        const { getHistoryList } = historyStory
        await getHistoryList()
    }

    render() {
        const { historyList, isLoadingHistory, onFilter, sort } = historyStory
        const { copyTrans } = mainStore

        return (
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                keyboardVerticalOffset={50 + getStatusBarHeight()}
                behavior="padding"
            >
                <ScrollView style={{ backgroundColor: '#ecebf2' }}>
                    <HeaderUser />
                    {isLoadingHistory ?
                        <Spinner style={{ alignSelf: 'center' }} /> :
                  <>
                    <Picker
                        note
                        mode="dropdown"
                        style={{ width: 200, alignSelf:'flex-end', }}
                        selectedValue={sort}
                        onValueChange={(e) => onFilter(e)}
                    >
                        <Picker.Item label="Sort By: Relevance" value='0' />
                        <Picker.Item label="Correspondent: A-Z" value='1' />
                        <Picker.Item label="Correspondent: Z-A" value='2' />
                        <Picker.Item label="Amount: Low-High" value='4' />
                        <Picker.Item label="Amount: High-Low" value='3' />
                        <Picker.Item label="Date: New" value='6' />
                        <Picker.Item label="Date: Old" value='5' />
                    </Picker>
                    {historyList.map(
                        ({ amount, balance, date, id, username }, i) => (
                            <View key={id} style={styles.block}>
                                <View
                                    style={{ position: 'absolute', right: 8 }}
                                >
                                    <Text style={styles.textDate}>{date}</Text>
                                </View>
                                <View style={styles.oneLine}>
                                    <Text>Correspondent: </Text>
                                    <Text style={styles.bold}>{username}</Text>
                                </View>
                                <View style={styles.oneLine}>
                                    <Text>Transaction amount: </Text>
                                    {amount > 0 ? (
                                        <View style={styles.oneLine}>
                                            <Icon
                                                name="caretup"
                                                size={18}
                                                type="antdesign"
                                                color="green"
                                            />
                                            <Text
                                                style={[
                                                    styles.bold,
                                                    { color: 'green' }
                                                ]}
                                            >
                                                {amount}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.oneLine}>
                                            <Icon
                                                name="caretdown"
                                                size={18}
                                                type="antdesign"
                                                color="red"
                                            />
                                            <Text
                                                style={[
                                                    styles.bold,
                                                    { color: 'red' }
                                                ]}
                                            >
                                                {Math.abs(amount)}
                                            </Text>
                                        </View>
                                    )}
                                </View>
                                <View style={styles.oneLine}>
                                    <Text>Final balance: </Text>
                                    <Text style={styles.bold}>{balance}</Text>
                                </View>
                                {amount < 0 && (
                                    <Icon
                                        containerStyle={{
                                            position: 'absolute',
                                            right: 8,
                                            bottom: 0
                                        }}
                                        onPress={ async () => {
                                            await copyTrans(username, Math.abs(amount))
                                            this.props.navigation.navigate(
                                                'transaction'
                                            )}
                                        }
                                        name="content-copy"
                                        type="material"
                                    />
                                )}
                            </View>
                        )
                    )}</>   }
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    block: {
        flex: 1,
        padding: 12,
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
    },
    textDate: {
        fontWeight: '300',
        fontStyle: 'italic',
        color: '#999',
        textAlign: 'right',
        fontSize: 10
    },
    bold: { fontWeight: '500' },
    oneLine: {
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
})

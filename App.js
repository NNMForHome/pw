import React from 'react'
import { AppLoading } from 'expo'
import * as Font from 'expo-font'
import {  Root, Footer, FooterTab, Button, Text } from 'native-base'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import NavigationService from './components/NavigationService'

import Login from './app/login'
import Signup from './app/signup'
import Main from './app/main'
import History from './app/history'
import Transaction from './app/transaction'

import { observer } from 'mobx-react'

const screenMap = {
    login: Login,
    signup: Signup,
    main: Main,
    history: History,
    transaction: Transaction
}

const transitionConfig = () => {
    return {
        transitionSpec: {
            duration: 500,
            useNativeDriver: true
        },
        screenInterpolator: sceneProps => {
            const { layout, position, scene } = sceneProps

            const thisSceneIndex = scene.index
            const width = layout.initWidth

            const translateX = position.interpolate({
                inputRange: [thisSceneIndex - 1, thisSceneIndex],
                outputRange: [width, 0]
            })

            return { transform: [{ translateX }] }
        }
    }
}
function getActiveRouteName(navigationState) {
  if (!navigationState) {
    return null;
  }
  const route = navigationState.routes[navigationState.index];
  // dive into nested navigators
  if (route.routes) {
    return getActiveRouteName(route);
  }
  return route.routeName;
}
const AppNavigator = createStackNavigator(screenMap, {
    initialRouteName: 'login',
    transitionConfig
})

const AppContainer = createAppContainer(AppNavigator)


@observer
export default class App extends React.Component {
    constructor(props) {
        super(props)
    }

    state = { isReady: false, page: 'login' }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf')
        })
       
    
        this.setState({ isReady: true})
        
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />
        }
        console.log(this.state.page)
        return (
            <Root>
                <AppContainer
                    ref={navigatorRef => {
                        NavigationService.setTopLevelNavigator(navigatorRef)
                    }}
                    onNavigationStateChange={(prevState, currentState, action) => {
                      const currentRouteName = getActiveRouteName(currentState);
                      this.setState({page : currentRouteName || 'login'})

                    }}
                />
               

                {this.state.page != 'login' && this.state.page != 'signup' && (
                    <Footer >
                        <FooterTab  style={{backgroundColor:'#eeeeee'}}>
                            <Button
                                onPress={() => {
                                  NavigationService.navigateReset('history')
                                }}
                                active={this.page == 'history'}
                            >
                                <Text style={{color:'#3ea8ff'}}>History</Text>
                            </Button>
                            <Button
                                onPress={() => {
                                  NavigationService.navigateReset('main')
                                }}
                                active={this.page == 'main'}
                            >
                                <Text style={{color:'#3ea8ff'}}>Main</Text>
                            </Button>
                        </FooterTab>
                    </Footer>
                )}
            </Root>
        )
    }
}

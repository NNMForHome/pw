import { decode } from 'base-64'
import { observable, action, runInAction } from 'mobx';
import * as SecureStore from 'expo-secure-store'

class AuthStore {
    @observable id_token = false
    @observable user = null
    @observable authURL = null



      parseJwt = id_token => {
        try {            
            const base64Url = id_token.split('.')[1]
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
            return JSON.parse(decodeURIComponent(escape(decode(base64))))
        } catch (e) {
            return null
        }
    }

    @action
    initial = async () => {
    const jwt = await SecureStore.getItemAsync('id_token')    
    try {
        if (jwt) {               
            const exp = (await this.parseJwt(jwt)).exp
            if (exp > Math.round(Date.now() / 1000)) {
            this.authURL ='Bearer ' + jwt
            this.id_token = jwt
            await this.getUser()
            }
        }
    } catch (error) {
        console.log(error)
    }
    }

    logout =async () => {
        this.id_token = false
        this.authURL = null
        await SecureStore.deleteItemAsync('id_token')        
    }
    
    @action
    getUser = async () => {
        try {
            const data = await fetch('http://193.124.114.46:3001/api/protected/user-info', {
                method: 'GET',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': authStore.authURL,
                  'Content-Type': 'application/json;charset=utf-8'
                }
              })
              this.user =  (await data.json()).user_info_token
        } catch (error) {
            console.log(error)
        }
    }

    @action
    setAccessToken = async id_token => {      
        this.id_token = id_token
        if (id_token) {
            this.authURL ='Bearer ' + id_token
            await this.getUser()
            SecureStore.setItemAsync('id_token', id_token)
        } else {
            this.user = null
            this.authURL = null
            SecureStore.deleteItemAsync('id_token')
        }

        }
    }

    const authStore = new AuthStore();

    export default authStore;

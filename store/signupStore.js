import { observable, action } from 'mobx'
import authStore from './authStore'
import { Toast } from 'native-base'
import NavigationService from '../components/NavigationService'

class SignUpStore {
    @observable email = ''
    @observable password = ''
    @observable repassword = ''
    @observable name = ''
    @observable errorText = ''
    @observable isError = false
    @observable isPasswordEqual = true
    @observable isLoading = false
    @observable isCorrectEmail = false
    @observable isCorrectName = false

    onChangeEmail = email => {
        this.isCorrectEmail = this.validateEmail(email)
        this.email = email
    }

    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        return re.test(email)
      }

    validateUserName = (name) => {
        const re = /^[a-z0-9А-ЯЁёа-яA-Z ]{1,32}$/
        return re.test(name)
    }

    onChangeName = name => {
        this.isCorrectName = this.validateUserName(name)
        this.name = name
    }

    onChangePassword = async password => {
        this.password = password
        await this.equalPassword()
    }

    onChangeRePassword = async repassword => {
        this.repassword = repassword
        await this.equalPassword()
    }

    equalPassword = () => {
        const p1 = this.password
        const p2 = this.repassword
        if (p1 != p2 && p1.length != 0 && p2.length != 0) {
            this.isPasswordEqual = false 
        } else {
            this.isPasswordEqual = true
        }
    }

    onSignUp = async () => {
        this.isLoading = true 
        try {
            let res = await fetch('http://193.124.114.46:3001/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({
                    username: this.name,
                    password: this.password,
                    email: this.email
                })
            })
            if (res.status === 201) {
                this.isError = false
                const jwt = await res.json()
                await authStore.setAccessToken(jwt.id_token)
                Toast.show({
                    text: 'Successful Sign Up!',
                    buttonText: 'Okay',
                    type: 'success'
                })
                this.isLoading = false
                NavigationService.navigateReset('main')
            } else {
                
                    this.isLoading = false,
                    this.isError = true,
                    this.errorText = await res.text()
                
            }
        } catch (error) {
            this.isLoading = false
            console.log(error)
        }
    }
}
const signupStore = new SignUpStore()

export default signupStore

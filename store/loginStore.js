import { observable, action } from 'mobx'
import authStore from './authStore'
import { Toast } from 'native-base'
import NavigationService from '../components/NavigationService'

class LoginStore {
    @observable email = ''
    @observable password = ''
    @observable errorText = ''
    @observable isError = false
    @observable isReqLoading = false

    onChangeEmail = email => {
        this.email = email
    }

    onChangePassword = password => {
        this.password = password
    }

    onLogIn = async () => {
        this.isReqLoading = true
        try {
            let res = await fetch(
                'http://193.124.114.46:3001/sessions/create',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        password: this.password
                    })
                }
            )

            if (res.status === 201) {
                this.isError = false
                const jwt = await res.json()
                await authStore.setAccessToken(jwt.id_token)
                Toast.show({
                    text: 'Successful Log In!',
                    buttonText: 'Okay',
                    type: 'success'
                })
                this.isReqLoading = false
                NavigationService.navigateReset('main')
            } else {
                this.isReqLoading = false
                this.isError = true
                this.errorText = await res.text()
            }
        } catch (error) {
            this.isReqLoading = false
            console.log(error)
        }
    }
}
const loginStore = new LoginStore()

export default loginStore

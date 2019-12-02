import { observable, action } from 'mobx';
import authStore from './authStore';
import { Toast } from 'native-base';
import NavigationService from '../components/NavigationService';


class MainStore {
    @observable userList = []
    @observable toName = ''
    @observable isLoadingUserList = false
    @observable searchString = ''
    @observable PW =0
    @observable isSendPW = false
    @observable req = []


      clearTransaction = () => {
            this.toName = ''
      }

      newTransaction = async (id, username) => {
            this.userList = []
            this.searchString = ''
            this.toName = username
  
      }

      copyTrans = async (username, amount) => {
        this.toName = username
        this.PW = amount
      }
      
      onPW = (value) => {
          this.PW = value
      }

      @action
      createTransaction = async () => {
          const { user, getUser } = authStore
          if (this.PW > user.balance) return 
          this.isSendPW = true
          try {
            const data = await fetch('http://193.124.114.46:3001/api/protected/transactions', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': authStore.authURL,
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({name:this.toName, amount:this.PW})
              })

              await getUser()
              this.isSendPW = false
              Toast.show({
                text: 'Successful transactions!',
                buttonText: 'Okay',
                type: 'success'
            })
            NavigationService.navigateReset('history')
              
          } catch (error) {
            this.isSendPW = false
          } 
      }


      @action
      getUserList = async (text, reqL) => {        
            this.isLoadingUserList = true

         if (text.length == 0) {
             this.userList = []
             this.searchString = ''
             this.isLoadingUserList = false
             return
         } 
         this.searchString = text
          try {
            this.req.push('')
            const data = await fetch('http://193.124.114.46:3001/api/protected/users/list', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Authorization': authStore.authURL,
                  'Content-Type': 'application/json;charset=utf-8'
                },
                body: JSON.stringify({"filter":text})
              })

              if (reqL == this.req.length) {
                this.userList = await data.json()  
                this.isLoadingUserList = false
              }                  
                if (this.searchString.length == 0) {
                  this.userList = []
                }    
                
          } catch (error) {
            this.isLoadingUserList = false
              console.log(error)
          }
        
      }
     
    }

    const mainStore = new MainStore();

    export default mainStore;

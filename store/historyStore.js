import { observable, action } from 'mobx'
import authStore from './authStore'

class HistoryStore {
    @observable isLoadingHistory = false
    @observable historyList = []
    @observable sort = '0'

    filter = (key, order = 'asc') => {
        return function innerSort(a, b) {
            if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
                return 0
            }

            const varA =
                typeof a[key] === 'string' ? a[key].toUpperCase() : a[key]
            const varB =
                typeof b[key] === 'string' ? b[key].toUpperCase() : b[key]

            let comparison = 0
            if (varA > varB) {
                comparison = 1
            } else if (varA < varB) {
                comparison = -1
            }
            return order === 'desc' ? comparison * -1 : comparison
        }
    }

    @action
    onFilter = async e => {
        const obj = {
            '0': ['id', 'desc'],
            '1': ['username', 'asc'],
            '2': ['username', 'desc'],
            '3': ['amount', 'asc'],
            '4': ['amount', 'desc'],
            '5': ['id', 'asc'],
            '6': ['id', 'desc']
        }
        this.sort = e
        const arr = [...this.historyList]
        arr.sort(this.filter(obj[e][0], obj[e][1]))
        this.historyList = arr
    }

    @action
    getHistoryList = async () => {
        this.isLoadingHistory = true
        try {
            const data = await fetch(
                'http://193.124.114.46:3001/api/protected/transactions',
                {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                        Authorization: authStore.authURL,
                        'Content-Type': 'application/json;charset=utf-8'
                    }
                }
            )
            const arr = (await data.json()).trans_token
            arr.sort(this.filter('id', 'desc'))
            this.historyList = arr
            this.isLoadingHistory = false
        } catch (error) {
            this.isLoadingHistory = false
        }
    }
}

const historyStore = new HistoryStore()

export default historyStore

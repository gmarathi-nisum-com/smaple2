//Broweser storage is not required as we are using jsonwebtoken

const hasLocalStorage = !!typeof(localStorage)
const storagekey = 'netext'
export default {
	set(data) {
		if (hasLocalStorage) {
			const currentData = this.get()

			const newData = Object.assign({}, currentData || {}, data)
				//console.log("JSON.stringify(newData)", JSON.stringify(newData))
			localStorage.setItem(storagekey, JSON.stringify(newData))
		}
	},
	get(key) {
//		console.log(localStorage.getItem(storagekey));
		const data = hasLocalStorage ? JSON.parse(localStorage.getItem(storagekey)) : null

		return key && data ? data[key] : data
	},
	clear() {
		localStorage.removeItem(storagekey)
	}
}
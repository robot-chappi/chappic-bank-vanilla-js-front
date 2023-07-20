import { chapQuery } from '@/core/chap-query/chap-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		// Store
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	main(type, body) {
		const register = type === 'register'
		const login = type === 'login'

		if (!(register || login)) throw new Error('Invalid type!')

		return chapQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			onSuccess: data => {
				// login store
				this.store.login(data.user, data.accessToken)
				this.notificationService.show(
					'success',
					'You have successfully logged in!'
				)
			},
			method: 'POST'
		})
	}
}

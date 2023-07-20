import { chapQuery } from '@/core/chap-query/chap-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class UserService {
	constructor() {
		this.notificationService = new NotificationService()
		this.store = Store.getInstance()
	}

	#BASE_URL = '/users'

	getAll(searchTerm, onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}${
				searchTerm
					? `?${new URLSearchParams({
							searchTerm
					  })}`
					: ''
			}`,
			onSuccess
		})
	}

	getProfile(onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/profile`,
			onSuccess
		})
	}

	updateProfile(body) {
		return chapQuery({
			method: 'PUT',
			path: `${this.#BASE_URL}/profile`,
			body,
			onSuccess: data => {
				this.store.updateProfile(data)
				this.notificationService.show(
					'success',
					'You have successfully updated the profile!'
				)
			}
		})
	}
}

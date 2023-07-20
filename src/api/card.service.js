import { chapQuery } from '@/core/chap-query/chap-query.lib'
import { NotificationService } from '@/core/services/notification.service'
import { Store } from '@/core/store/store'

export class CardService {
	#BASE_URL = '/cards'

	constructor() {
		// Store
		this.store = Store.getInstance().state
		this.notificationService = new NotificationService()
	}

	byUser(onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/by-user`,
			onSuccess
		})
	}

	// create(onSuccess) {
	// 	return chapQuery({
	// 		path: this.#BASE_URL,
	// 		method: 'POST',
	// 		onSuccess
	// 	})
	// }

	/**
	 * Updates the card's data with type.
	 * @param {('MIR'|'VISA'|'MASTERCARD'|'MAESTRO')} type - The type of payment system.
	 * @param {function} onSuccess - The callback function to be executed when the balance update is successful.
	 * @returns {Promise} A Promise object that resolves to the response from the API.
	 */
	reissueCard(type, onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/reissue`,
			method: 'PUT',
			body: { type },
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Card data was successfully changed!'
				),
					onSuccess()
			}
		})
	}

	/**
	 * Updates the user's balance with the specified amount and type.
	 *
	 * @param {number} amount - The amount to be added or withdrawn from the user's balance.
	 * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either "top-up" or "withdrawal".
	 * @param {function} onSuccess - The callback function to be executed when the balance update is successful.
	 * @returns {Promise} A Promise object that resolves to the response from the API.
	 */
	updateBalance(amount, type, onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/balance/${type}`,
			method: 'PATCH',
			body: { amount: +amount },
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Balance successfully changed!'
				)
				onSuccess()
			}
		})
	}

	/**
	 * Updates the card's data.
	 * @param {function} onSuccess - The callback function to be executed when the balance update is successful.
	 * @returns {Promise} A Promise object that resolves to the response from the API.
	 */
	updateCardData(onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/update-card`,
			method: 'PATCH',
			onSuccess: data => {
				this.notificationService.show(
					'success',
					'Card data was successfully changed!'
				),
					onSuccess(data)
			}
		})
	}

	/**
	 * Transfers money between two card numbers.
	 *
	 * @function
	 * @param {Object} body - The transfer details.
	 * @param {number} body.amount - The amount to be transferred.
	 * @param {string} body.toCardNumber - The recipient's card number.
	 * @param {Function} onSuccess - The callback function to be executed upon successful transfer.
	 * @returns {Promise} A promise that resolves with the redQuery response.
	 */
	transfer({ amount, toCardNumber }, onSuccess) {
		return chapQuery({
			path: `${this.#BASE_URL}/transfer-money`,
			method: 'PATCH',
			body: {
				amount: +amount,
				fromCardNumber: this.store.user.card.number,
				toCardNumber
			},
			onSuccess: () => {
				this.notificationService.show(
					'success',
					'Transfer successfully completed!'
				)
				onSuccess()
			}
		})
	}
}

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { BALANCE_UPDATED } from '@/constants/event.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { NotificationService } from '@/core/services/notification.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/core/store/store'
import styles from './actions.module.scss'
import template from './actions.template.html'

export class Actions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.cardService = new CardService()
		this.notificationService = new NotificationService()
	}

	/**
	 * @param {Event} event - The event object from the button click event.
	 * @param {'top-up' | 'withdrawal'} type - The type of the transaction, either "top-up" or "withdrawal".
	 */
	updateBalance(event, type) {
		event.preventDefault()

		if (!this.store.user) {
			this.notificationService.show('error', 'You need authorization!')
		}

		$C(event.target).text('Sending...').attr('disabled', true)

		const inputElement = $C(this.element).find('input')
		const amount = inputElement.value()

		if (!amount) {
			validationService.showError($C(this.element).find('label'))
			return
		}

		const typeTopUp = type === 'top-up'
		const typeWithDrawal = type === 'withdrawal'

		if (!(typeTopUp || typeWithDrawal)) throw new Error('Invalid type!')

		if (typeWithDrawal && this.store.user.card.balance < amount)
			return this.notificationService.show('error', 'Insufficient funds')

		this.cardService.updateBalance(amount, type, () => {
			inputElement.value('')

			const balanceUpdatedEvent = new Event(BALANCE_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)
		})

		$C(event.target).removeAttr('disabled').text(type)
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Field({
					name: 'amount',
					placeholder: 'Enter amount:',
					type: 'number'
				})
			],
			styles
		)

		$C(this.element)
			.find('#action-buttons')
			.append(
				new Button({
					children: 'Top-up',
					variant: 'green',
					onClick: e => this.updateBalance(e, 'top-up')
				}).render()
			)
			.append(
				new Button({
					children: 'Withdrawal',
					variant: 'purple',
					onClick: e => this.updateBalance(e, 'withdrawal')
				}).render()
			)

		return this.element
	}
}

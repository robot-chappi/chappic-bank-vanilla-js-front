import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { Button } from '@/components/ui/button/button.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { Select } from '@/components/ui/select/select.component'
import { CARD_UPDATED } from '@/constants/event.constants'
import { BaseScreen } from '@/core/component/base-screen.component'
import { $C } from '@/core/cquery/cquery.lib'
import formService from '@/core/services/form.service'
import { Store } from '@/core/store/store'
import styles from './card-reissue.module.scss'
import template from './card-reissue.template.html'

export class CardReissue extends BaseScreen {
	constructor() {
		super({ title: 'Reissue Card' })

		this.store = Store.getInstance()
		this.cardService = new CardService()
	}

	#handleSubmit = event => {
		const formValue = formService.getSelectValue(event.target)

		if (!['MIR', 'VISA', 'MASTERCARD', 'MAESTRO'].includes(formValue)) return

		this.cardService.reissueCard(formValue, data => {
			this.store.updateCard(data)
			const balanceUpdatedEvent = new Event(CARD_UPDATED)
			document.dispatchEvent(balanceUpdatedEvent)
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('Card reissue'),
				new Select({
					children: ['MIR', 'VISA', 'MASTERCARD', 'MAESTRO'],
					active: this.store.state.user.card.paymentSystem
				}),
				new Button({
					children: 'Apply',
					variant: 'select'
				})
			],
			styles
		)

		$C(this.element).find('form').submit(this.#handleSubmit)

		return this.element
	}
}

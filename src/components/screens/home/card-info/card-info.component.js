import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { Loader } from '@/components/ui/loader/loader.component'
import { BALANCE_UPDATED, CARD_UPDATED } from '@/constants/event.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import { formatCardNumber } from '@/utils/format/format-card-number'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import styles from './card-info.module.scss'
import template from './card-info.template.html'

const CODE = '*****'

export class CardInfo extends ChildComponent {
	constructor() {
		super()
		this.store = Store.getInstance()
		this.cardService = new CardService()

		this.element = renderService.htmlToElement(template, [], styles)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
		document.addEventListener(CARD_UPDATED, this.#onCardUpdated)
	}

	#removeListeners() {
		document.removeEventListener(BALANCE_UPDATED, this.#onBalanceUpdated)
		document.removeEventListener(CARD_UPDATED, this.#onCardUpdated)
	}

	#onBalanceUpdated = () => {
		this.fetchData()
	}

	#onCardUpdated = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	#copyCardNumber(e) {
		navigator.clipboard.writeText(e.target.innerText).then(() => {
			e.target.innerText = 'Card number copied!'
			setTimeout(() => {
				e.target.innerText = formatCardNumber(this.card.number)
			}, 2000)
		})
	}

	#toggleCvc(cardCvcElement) {
		const text = cardCvcElement.text()
		text === CODE
			? cardCvcElement.text(this.card.cvc)
			: cardCvcElement.text(CODE)
	}

	fillElements() {
		$C(this.element).html(
			renderService.htmlToElement(template, [], styles).innerHTML
		)

		$C(this.element)
			.findAll(':scope > div')
			.forEach(child => {
				child.addClass('fade-in')
			})

		$C(this.element)
			.find('#card-number')
			.text(formatCardNumber(this.card.number))
			.click(this.#copyCardNumber.bind(this))

		$C(this.element).find('#card-expire-date').text(this.card.expireDate)

		const cardCvcElement = $C(this.element).find('#card-cvc')
		cardCvcElement.text(CODE).css('width', '44px')

		$C(this.element)
			.find('#toggle-cvc')
			.click(this.#toggleCvc.bind(this, cardCvcElement))

		$C(this.element)
			.find('#card-balance')
			.text(formatToCurrency(this.card.balance))

		$C(this.element).find('#payment-system').text(this.card.paymentSystem)
	}

	fetchData() {
		this.cardService.byUser(data => {
			if (data?.id) {
				this.card = data
				this.fillElements()
				this.store.updateCard(data)
			} else {
				this.store.updateCard(null)
			}
		})
	}

	render() {
		if (this.store.state.user) {
			$C(this.element).html(new Loader().render().outerHTML)
			setTimeout(() => this.fetchData(), 500)
		}

		return this.element
	}
}

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { TransactionService } from '@/api/transaction.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import { TransactionItem } from './transaction-item/transaction-item.component'
import styles from './transactions.module.scss'
import template from './transactions.template.html'

export class Transactions extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.transactionService = new TransactionService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Recent transactions')],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(TRANSACTION_COMPLETED, this.#onTransactionUpdated)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onTransactionUpdated
		)
	}

	#onTransactionUpdated = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	fetchData() {
		this.transactionService.getAll(data => {
			if (!data) return

			// const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			// if (loaderElement) loaderElement.remove()

			$C(this.element).removeElement(LOADER_SELECTOR)

			const transactionsList = $C(this.element).find('#transactions-list')
			transactionsList.text('')

			if (data.length) {
				for (const transaction of data.transactions) {
					transactionsList.append(new TransactionItem(transaction).render())
				}
			} else {
				transactionsList.text('Transactions not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			$C(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}

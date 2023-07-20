import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserService } from '@/api/user.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { TRANSFER_FIELD_SELECTOR } from '@/constants/card.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import styles from './contacts.module.scss'
import template from './contacts.template.html'
import { TransferField } from './transfer-field/transfer-field.component'

export class Contacts extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.userService = new UserService()
	}

	fetchData() {
		this.userService.getAll(null, data => {
			if (!data) return

			// this.element.querySelector(LOADER_SELECTOR).remove()
			$C(this.element).removeElement(LOADER_SELECTOR)

			for (const user of data) {
				$C(this.element)
					.find('#contacts-list')
					.append(
						new UserItem(user, true, () => {
							$C(TRANSFER_FIELD_SELECTOR).value(
								formatCardNumberWithDashes(user.card.number)
							)
						}).render()
					)
			}

			$C(this.element)
				.find('#contacts-list')
				.findAll('button')
				.forEach(contactElement => {
					contactElement.addClass('fade-in')
				})
		})
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[TransferField, new Heading('Transfer money')],
			styles
		)

		if (this.store.user) {
			$C(this.element)
				.find('#contacts-list')
				.html(new Loader().render().outerHTML)

			setTimeout(() => this.fetchData(), 500)
		}

		return this.element
	}
}

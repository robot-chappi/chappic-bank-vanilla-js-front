import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { CardService } from '@/api/card.service'
import { UserService } from '@/api/user.service'
import { Button } from '@/components/ui/button/button.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { Link } from '@/components/ui/link/link.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { CARD_UPDATED } from '@/constants/event.constants'
import { PROFILE_UPDATED } from '@/constants/user.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import styles from './user-info.module.scss'
import template from './user-info.template.html'

export class UserInfo extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance()
		this.userService = new UserService()
		this.cardService = new CardService()

		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('Profile'),
				new Link({
					children: 'Change Profile',
					link: '/change-profile'
				}),
				new Button({
					children: 'Update Data Card',
					variant: 'purple',
					onClick: () =>
						this.cardService.updateCardData(data => {
							this.store.updateCard(data)
							const balanceUpdatedEvent = new Event(CARD_UPDATED)
							document.dispatchEvent(balanceUpdatedEvent)
						})
				})
			],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(PROFILE_UPDATED, this.#onUserUpdated)
	}

	#removeListeners() {
		document.removeEventListener(PROFILE_UPDATED, this.#onUserUpdated)
	}

	#onUserUpdated = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	#updateFields(name = '', email = '', avatar) {
		$C(this.element).find('#user-profile-name').text(`Name: ${name}`)
		$C(this.element).find('#user-profile-email').text(`Email: ${email}`)
		$C(this.element)
			.find('#user-profile-avatar')
			.removeAttr('src')
			.removeAttr('alt')
		if (avatar) {
			$C(this.element)
				.find('#user-profile-avatar')
				.attr('src', avatar)
				.attr('alt', name)
		}
	}

	fetchData() {
		this.userService.getProfile(data => {
			if (!data) return

			$C(this.element).removeElement(LOADER_SELECTOR)

			this.#updateFields()

			if (data) {
				this.#updateFields(data.name, data.email, data.avatarPath)
			} else {
				this.#updateFields('no data', 'no data', 'no data')
			}
		})
	}

	render() {
		if (this.store.state.user) {
			$C(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}

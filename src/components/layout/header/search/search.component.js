import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserService } from '@/api/user.service'
import { UserItem } from '@/components/ui/user-item/user-item.component'
import { TRANSFER_FIELD_SELECTOR } from '@/constants/card.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { debounce } from '@/utils/debounce.util'
import { formatCardNumberWithDashes } from '@/utils/format/format-card-number'
import styles from './search.module.scss'
import template from './search.template.html'

export class Search extends ChildComponent {
	constructor(router = undefined) {
		super()

		this.router = router

		this.userService = new UserService()
	}

	#handleSearch = async event => {
		const searchTerm = event.target.value

		const searchResultElement = $C(this.element).find('#search-results')

		if (!searchTerm) {
			searchResultElement.html('')
			return
		}

		await this.userService.getAll(searchTerm, users => {
			searchResultElement.html('')
			users.forEach((user, index) => {
				const userItem = new UserItem(user, true, () => {
					if (this.router && this.router?.getCurrentPath() === '/') {
						$C(TRANSFER_FIELD_SELECTOR).value(
							formatCardNumberWithDashes(user.card.number)
						)
					}

					searchResultElement.html('')
				}).render()

				$C(userItem)
					.addClass(styles.item)
					.css('transition-delay', `${index * 0.1}s`)

				searchResultElement.append(userItem)

				setTimeout(() => {
					$C(userItem).addClass(styles.visible)
				}, 50)
			})
		})
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const debouncedHandleSearch = debounce(this.#handleSearch, 300)

		$C(this.element)
			.find('input')
			.input({
				type: 'search',
				name: 'search',
				placeholder: 'Search contacts...'
			})
			.on('input', debouncedHandleSearch)

		return this.element
	}
}

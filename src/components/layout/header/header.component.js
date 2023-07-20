import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { UserItem } from '@/components/ui/user-item/user-item.component'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import styles from './header.module.scss'
import template from './header.template.html'
import { Logo } from './logo/logo.component'
import { LogoutButton } from './logout-button/logout-button.component'
import { Search } from './search/search.component'

export class Header extends ChildComponent {
	constructor({ router }) {
		super()

		this.store = Store.getInstance()

		this.store.addObserver(this)

		this.userItem = new UserItem(
			{
				avatarPath: '/',
				name: 'Daniil'
			},
			false,
			() => {
				router.navigate('/profile')
			}
		)

		this.router = router
	}

	update() {
		this.user = this.store.state.user
		const authSideElement = $C(this.element).find('#auth-side')
		if (this.user) {
			authSideElement.show()
			this.userItem.update(this.user)

			if (this.router.getCurrentPath() === '/auth') this.router.navigate('/')
		} else {
			authSideElement.hide()
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				Logo,
				new LogoutButton({
					router: this.router
				}),
				new Search(this.router),
				this.userItem
			],
			styles
		)

		$C(this.element)
			.find('#menu-toggle')
			.on('click', () => {
				$C(this.element).find('ul').toggle(styles.open)
			})

		this.update()

		return this.element
	}
}

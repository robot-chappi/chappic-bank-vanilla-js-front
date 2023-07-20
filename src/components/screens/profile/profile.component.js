import { BaseScreen } from '@/core/component/base-screen.component'

import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { Link } from '@/components/ui/link/link.component'
import { $C } from '@/core/cquery/cquery.lib'
import renderService from '@/core/services/render.service'
import { Store } from '@/core/store/store'
import { CardInfo } from '../home/card-info/card-info.component'
import styles from './profile.module.scss'
import template from './profile.template.html'
import { UserInfo } from './user-info/user-info.component'

export class Profile extends BaseScreen {
	constructor() {
		super({ title: 'Profile' })

		this.store = Store.getInstance()
		this.store.addObserver(this)

		this.components = {
			cardInfo: null,
			userInfo: null
		}
	}

	createOrUpdateComponent(component, componentName) {
		if (this.components[componentName]) {
			this.components[componentName].destroy()
		}
		this.components[componentName] = new component()
		return this.components[componentName]
	}

	update() {
		this.user = this.store.state.user

		if (!this.user) {
			$C(this.element).html(new AuthRequiredMessage().render().outerHTML)
		}
	}

	render() {
		const componentsToRender = [
			this.createOrUpdateComponent(CardInfo, 'cardInfo'),
			this.createOrUpdateComponent(UserInfo, 'userInfo'),
			new Link({
				children: 'Reissue Card',
				link: '/card-reissue'
			})
		]

		this.element = renderService.htmlToElement(
			template,
			componentsToRender,
			styles
		)

		this.update()

		return this.element
	}
}

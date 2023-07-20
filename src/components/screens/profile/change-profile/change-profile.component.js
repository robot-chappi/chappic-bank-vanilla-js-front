import renderService from '@/core/services/render.service'

import { UserService } from '@/api/user.service'
import { AuthRequiredMessage } from '@/components/ui/auth-required-message/auth-required-message.component'
import { Button } from '@/components/ui/button/button.component'
import { Field } from '@/components/ui/field/field.component'
import { Link } from '@/components/ui/link/link.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import { $C } from '@/core/cquery/cquery.lib'
import formService from '@/core/services/form.service'
import validationService from '@/core/services/validation.service'
import { Store } from '@/core/store/store'
import styles from './change-profile.module.scss'
import template from './change-profile.template.html'

export class ChangeProfile extends BaseScreen {
	constructor() {
		super({ title: 'Change Profile' })

		this.store = Store.getInstance()
		this.user = this.store.state.user
		this.userService = new UserService()
	}

	#validateFields(formValues) {
		const emailLabel = $C(this.element).find('label:nth-child(1)')
		const passwordLabel = $C(this.element).find('label:nth-child(2)')
		const nameLabel = $C(this.element).find('label:nth-child(3)')
		const avatarPathLabel = $C(this.element).find('label:nth-child(4)')

		if (!formValues.email) {
			validationService.showError(emailLabel)
		}

		if (formValues.password) {
			if (formValues.password.length < 6) {
				validationService.showError(passwordLabel)
			}
		}

		if (!formValues.name) {
			validationService.showError(nameLabel)
		}

		if (!formValues.avatarPath) {
			validationService.showError(avatarPathLabel)
		}

		if (formValues.password === '' || formValues.password.length < 6) {
			delete formValues.password

			return formValues.email && formValues.name && formValues.avatarPath
		}

		return (
			formValues.email &&
			formValues.password &&
			formValues.name &&
			formValues.avatarPath
		)
	}

	#handleSubmit = event => {
		const formValues = formService.getFormValues(event.target)

		if (!this.#validateFields(formValues)) return

		this.userService.updateProfile(formValues)
	}

	#updateInputs() {
		if (!this.user) return this.update()

		$C(this.element)
			.find('#user-inputs')
			.append(
				new Field({
					placeholder: 'Enter email',
					name: 'email',
					value: this.user.email,
					type: 'email'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter new password (6 min.)',
					name: 'password',
					type: 'password',
					pattern: '.{6,}'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter name',
					name: 'name',
					value: this.user.name,
					type: 'text'
				}).render()
			)
			.append(
				new Field({
					placeholder: 'Enter avatar (link)',
					name: 'avatarPath',
					value: this.user?.avatarPath ? this.user?.avatarPath : '',
					type: 'text'
				}).render()
			)
	}

	update() {
		if (!this.user) {
			$C(this.element).html(new AuthRequiredMessage().render().outerHTML)
		}
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Button({
					children: 'Submit'
				}),
				new Link({
					children: 'Go back',
					link: '/profile'
				})
			],
			styles
		)

		this.#updateInputs()

		if (this.user?.avatarPath) {
			$C(this.element)
				.find('img')
				.attr('src', this.user.avatarPath)
				.attr('alt', this.user.name)
		}
		$C(this.element).find('form').submit(this.#handleSubmit)

		this.update()

		return this.element
	}
}

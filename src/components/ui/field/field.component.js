import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './field.module.scss'
import template from './field.template.html'

export class Field extends ChildComponent {
	constructor({
		placeholder,
		type = 'text',
		value = '',
		name,
		variant,
		pattern = ''
	}) {
		super()

		if (!name) throw new Error('Please fill field "name"!')

		this.placeholder = placeholder
		this.type = type
		this.value = value
		this.name = name
		this.variant = variant
		this.pattern = pattern
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		const inputElement = $C(this.element).find('input').input({
			placeholder: this.placeholder,
			type: this.type,
			value: this.value,
			name: this.name
		})

		if (this.pattern !== '') {
			inputElement.input({
				pattern: this.pattern
			})
		}

		if (this.type === 'number') {
			inputElement.numberInput()
		}

		const isCreditCard = this.variant === 'credit-card'

		if (isCreditCard) {
			inputElement.creditCardInput()
		}

		return this.element
	}
}

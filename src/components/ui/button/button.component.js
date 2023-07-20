import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './button.module.scss'
import template from './button.template.html'

export class Button extends ChildComponent {
	constructor({ children, onClick, variant }) {
		super()
		if (!children) throw new Error('Children is empty!')

		this.children = children
		this.onClick = onClick
		this.variant = variant
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element).html(this.children).click(this.onClick)

		const green = this.variant === 'green'
		const purple = this.variant === 'purple'
		const select = this.variant === 'select'
		// this.variant && (this.variant === 'green' || this.variant === 'purple')

		if (green || purple || select)
			$C(this.element).addClass(styles[this.variant])

		return this.element
	}
}

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './select.module.scss'
import template from './select.template.html'

export class Select extends ChildComponent {
	constructor({ children, active }) {
		super()
		if (!children) throw new Error('Children is empty!')

		this.children = children
		this.active = active
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element).select(this.children, this.active)

		return this.element
	}
}

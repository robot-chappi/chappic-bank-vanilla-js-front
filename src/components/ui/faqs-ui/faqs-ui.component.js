import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './faqs-ui.module.scss'
import template from './faqs-ui.template.html'

export class FaqsUi extends ChildComponent {
	constructor(children) {
		super()
		if (!children) throw new Error('Children is empty!')

		this.children = children
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element).faqs(this.children)

		return this.element
	}
}

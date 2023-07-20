import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './heading.module.scss'
import template from './heading.template.html'

export class Heading extends ChildComponent {
	constructor(title = '') {
		super()
		if (!title) throw new Error(`Title is empty!`)
		this.title = title
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element).text(this.title)

		return this.element
	}
}

import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './link.module.scss'
import template from './link.template.html'

export class Link extends ChildComponent {
	constructor({ children, link }) {
		super()

		this.children = children
		this.link = link
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element).html(this.children).attr('href', this.link)

		return this.element
	}
}

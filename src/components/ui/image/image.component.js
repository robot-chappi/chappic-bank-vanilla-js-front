import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { $C } from '@/core/cquery/cquery.lib'
import styles from './image.module.scss'
import template from './image.template.html'

export class Image extends ChildComponent {
	constructor({ src, alt, width, height }) {
		super()

		this.src = src
		this.alt = alt
		this.width = width
		this.height = height
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		$C(this.element)
			.attr('src', this.src)
			.attr('alt', this.alt)
			.attr('width', this.width)
			.attr('height', this.height)

		return this.element
	}
}

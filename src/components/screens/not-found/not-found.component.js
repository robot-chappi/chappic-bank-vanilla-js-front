import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import styles from './not-found.module.scss'
import template from './not-found.template.html'

export class NotFound extends BaseScreen {
	constructor() {
		super({ title: 'Not Found' })
	}

	render() {
		this.element = renderService.htmlToElement(template, [], styles)

		return this.element
	}
}

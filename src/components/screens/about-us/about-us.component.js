import { Heading } from '@/components/ui/heading/heading.component'
import { Paragraph } from '@/components/ui/paragraph/paragraph.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import renderService from '@/core/services/render.service'
import styles from './about-us.module.scss'
import template from './about-us.template.html'

export class AboutUs extends BaseScreen {
	constructor() {
		super({ title: 'About us' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('About us | Chappic Bank'),
				new Paragraph([
					{
						text: 'Our private bank is a place where every client feels special. We offer a personalized approach to each client, understanding their unique needs and goals. We value the trust of our clients and strive to provide the highest level of service. Our team of professionals is always ready to help and solve any financial issues.'
					},
					{ text: '"Confidence in every step"' }
				])
			],
			styles
		)

		return this.element
	}
}

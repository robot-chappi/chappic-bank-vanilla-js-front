import renderService from '@/core/services/render.service'

import { Heading } from '@/components/ui/heading/heading.component'
import { Paragraph } from '@/components/ui/paragraph/paragraph.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import styles from './contact.module.scss'
import template from './contact.template.html'

export class Contact extends BaseScreen {
	constructor() {
		super({ title: 'Contact' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('Contact | Chappic Bank'),
				new Paragraph([
					{
						text: 'If you have any questions or need help, please contact us. Below are our contact details:'
					},
					{ text: 'Phone: +7 (915) 123 12-12', isList: true },
					{ text: 'Email: info@chappicbank.com', isList: true },
					{ text: 'Address: Russia, Moscow', isList: true },
					{
						text: 'We are ready to help you at any time and answer all your questions. Feel free to contact us through any of the above methods.'
					}
				])
			],
			styles
		)
		return this.element
	}
}

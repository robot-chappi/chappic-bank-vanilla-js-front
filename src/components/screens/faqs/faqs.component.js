import renderService from '@/core/services/render.service'

import { FaqsUi } from '@/components/ui/faqs-ui/faqs-ui.component'
import { Heading } from '@/components/ui/heading/heading.component'
import { Paragraph } from '@/components/ui/paragraph/paragraph.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import styles from './faqs.module.scss'
import template from './faqs.template.html'

export class Faqs extends BaseScreen {
	constructor() {
		super({ title: 'FAQs' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('FAQs | Chappic Bank'),
				new Paragraph(
					"The FAQs (Frequently Asked Questions) section on our website provides answers to common queries that users may have about our services, products, or policies. This section aims to address the most frequently encountered issues and provide helpful information to users. Here's an overview of what you can expect to find in our FAQs section:"
				),
				new FaqsUi([
					{
						title: 'What documents do I need to open a bank account?',
						description:
							"Typically, you'll need a valid government-issued ID, proof of address, and proof of income."
					},
					{
						title: 'What is the interest rate on my savings account?',
						description:
							"Interest rates can vary depending on the type of account and the bank. You can usually find this information on the bank's website or by contacting customer service."
					},
					{
						title: 'How can I apply for a loan?',
						description:
							'You can usually apply for a loan online or in person at a bank branch. Check with your bank for specific instructions.'
					},
					{
						title: 'How can I access my account online?',
						description:
							'Most banks have an online banking portal that you can access with your account information. Check with your bank for specific instructions.'
					},
					{
						title: 'What should I do if I lose my debit card?',
						description:
							'Contact your bank immediately to report the loss and request a new card.'
					}
				])
			],
			styles
		)
		return this.element
	}
}

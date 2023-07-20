import renderService from '@/core/services/render.service'

import { Heading } from '@/components/ui/heading/heading.component'
import { Paragraph } from '@/components/ui/paragraph/paragraph.component'
import { BaseScreen } from '@/core/component/base-screen.component'
import styles from './documents.module.scss'
import template from './documents.template.html'

export class DocumentsPage extends BaseScreen {
	constructor() {
		super({ title: 'Documents' })
	}

	render() {
		this.element = renderService.htmlToElement(
			template,
			[
				new Heading('Documents | Chappic Bank'),
				new Paragraph([
					{
						text: 'Welcome to our site!'
					},
					{
						text: 'Below are the user agreements that you agree to when using our website. Please read these terms carefully as they govern the relationship between you and us and set out the rules and restrictions on your use of our site.'
					},
					{
						text: "User obligations: you agree to use our site only for lawful purposes and not to violate the rights of other users. You will not upload or transmit through our site illegal, offensive, defamatory, pornographic or otherwise prohibited content. You also agree not to hack or attempt to gain unauthorized access to our site or other users' data.",
						isList: true
					},
					{
						text: 'Disclaimer: we strive to provide our users with accurate and useful information. However, we are not responsible for any loss suffered by you or third parties as a result of using our site or relying on the information posted on it. We reserve the right to make changes to the content of the site or discontinue its operation at any time without prior notice.',
						isList: true
					},
					{
						text: 'User Privacy: we respect your privacy and strictly comply with data protection laws. Please see our privacy policy for information about how we collect, use and protect your personal information.',
						isList: true
					},
					{
						text: 'User agreement changes: we reserve the right to make changes to these user agreements as necessary. If we make material changes, we will notify you by posting a notice on our site or by sending a notice to the email address you provided.',
						isList: true
					},
					{
						text: 'Please note that your use of our site constitutes your full acceptance of these terms of use. If you have any questions or require additional information, feel free to contact us. Thank you for trusting and using our site!'
					}
				])
			],
			styles
		)
		return this.element
	}
}

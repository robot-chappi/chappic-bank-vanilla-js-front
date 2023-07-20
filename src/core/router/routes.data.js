import { AboutUs } from '@/components/screens/about-us/about-us.component'
import { Auth } from '@/components/screens/auth/auth.component'
import { Contact } from '@/components/screens/contact/contact.component'
import { DocumentsPage } from '@/components/screens/documents/documents.component'
import { Faqs } from '@/components/screens/faqs/faqs.component'
import { Home } from '@/components/screens/home/home.component'
import { CardReissue } from '@/components/screens/profile/card-reissue/card-reissue.component'
import { ChangeProfile } from '@/components/screens/profile/change-profile/change-profile.component'
import { Profile } from '@/components/screens/profile/profile.component'

export const ROUTES = [
	{
		path: '/',
		component: Home
	},
	{
		path: '/profile',
		component: Profile
	},
	{
		path: '/change-profile',
		component: ChangeProfile
	},
	{
		path: '/card-reissue',
		component: CardReissue
	},
	{
		path: '/auth',
		component: Auth
	},
	{
		path: '/about-us',
		component: AboutUs
	},
	{
		path: '/contact',
		component: Contact
	},
	{
		path: '/documents',
		component: DocumentsPage
	},
	{
		path: '/faqs',
		component: Faqs
	}
]

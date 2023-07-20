import { chapQuery } from '@/core/chap-query/chap-query.lib'

export class StatisticService {
	#BASE_URL = '/statistics'

	main(onSuccess) {
		return chapQuery({
			path: this.#BASE_URL,
			onSuccess
		})
	}
}

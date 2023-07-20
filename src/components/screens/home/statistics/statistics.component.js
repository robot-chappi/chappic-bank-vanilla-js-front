import ChildComponent from '@/core/component/child.component'
import renderService from '@/core/services/render.service'

import { StatisticService } from '@/api/statistic.service'
import { Heading } from '@/components/ui/heading/heading.component'
import {
	LOADER_SELECTOR,
	Loader
} from '@/components/ui/loader/loader.component'
import { TRANSACTION_COMPLETED } from '@/constants/event.constants'
import { $C } from '@/core/cquery/cquery.lib'
import { Store } from '@/core/store/store'
import { formatToCurrency } from '@/utils/format/format-to-currency'
import { CircleChart } from './circle-chart/circle-chart.component'
import { StatisticItem } from './statistic-item/statistic-item.component'
import styles from './statistics.module.scss'
import template from './statistics.template.html'

export class Statistics extends ChildComponent {
	constructor() {
		super()

		this.store = Store.getInstance().state
		this.statisticService = new StatisticService()

		this.element = renderService.htmlToElement(
			template,
			[new Heading('Statistics')],
			styles
		)

		this.#addListeners()
	}

	#addListeners() {
		document.addEventListener(TRANSACTION_COMPLETED, this.#onStatisticsUpdated)
	}

	#removeListeners() {
		document.removeEventListener(
			TRANSACTION_COMPLETED,
			this.#onStatisticsUpdated
		)
	}

	#onStatisticsUpdated = () => {
		this.fetchData()
	}

	destroy() {
		this.#removeListeners()
	}

	renderChart(income, expense) {
		const total = income + expense
		let incomePercent = (income * 100) / total,
			expensePercent = 100 - incomePercent

		if (income && !expense) {
			incomePercent = 100
			expensePercent = 0.1
		}

		if (!income && expense) {
			incomePercent = 0.1
			expensePercent = 100
		}

		return new CircleChart(incomePercent, expensePercent).render()
	}

	fetchData() {
		this.statisticService.main(data => {
			if (!data) return

			// const loaderElement = this.element.querySelector(LOADER_SELECTOR)
			// if (loaderElement) loaderElement.remove()
			$C(this.element).removeElement(LOADER_SELECTOR)

			const statisticsItemsElement = $C(this.element).find('#statistics-items')
			statisticsItemsElement.text('')

			const circleChartElement = $C(this.element).find('#circle-chart')
			circleChartElement.text('')
			if (data.length) {
				statisticsItemsElement
					.append(
						new StatisticItem(
							'Income:',
							formatToCurrency(data[0].value),
							'green'
						).render()
					)
					.append(
						new StatisticItem(
							'Expense:',
							formatToCurrency(data[1].value),
							'purple'
						).render()
					)

				circleChartElement.append(
					this.renderChart(data[0].value, data[1].value)
				)
			} else {
				statisticsItemsElement.text('Statistics not found!')
			}
		})
	}

	render() {
		if (this.store.user) {
			$C(this.element).append(new Loader().render())
			setTimeout(() => this.fetchData(), 500)
		}
		return this.element
	}
}

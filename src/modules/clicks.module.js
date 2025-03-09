import { Module } from '../core/module'

export class ClicksModule extends Module {
	trigger() {
		let clickCount = 0

		const clickHandler = event => {
			event.stopImmediatePropagation()
			clickCount++
		}

		const showStatistics = count => {
			alert(`За указанное время совершено кликов: ${count}`)
		}

		document.addEventListener('click', clickHandler, true)

		setTimeout(() => {
			document.removeEventListener('click', clickHandler, true)
			showStatistics(clickCount)
		}, 3000)
	}

	defaultValue() {}
}

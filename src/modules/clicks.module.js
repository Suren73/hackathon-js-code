import { Module } from '../core/module'

export class ClicksModule extends Module {
	constructor(type, text) {
		super(type, text)

		this.clickCount = 0

		this.clickHandler = this.clickHandler.bind(this)
	}
	trigger() {
		this.resetClickCounter()
		this.registerClickHandler()
		this.startTimeOut()
	}

	startTimeOut() {
		setTimeout(() => {
			this.unregisterClickHandler()
			this.showStatistics(this.clickCount)
		}, 3000)
	}

	resetClickCounter() {
		this.clickCount = 0
	}

	registerClickHandler() {
		document.addEventListener('click', this.clickHandler, true)
	}

	unregisterClickHandler() {
		document.removeEventListener('click', this.clickHandler, true)
	}

	showStatistics(count) {
		alert(`За указанное время совершено кликов: ${count}`)
	}

	clickHandler(event) {
		event.stopImmediatePropagation()
		this.clickCount++
	}
}

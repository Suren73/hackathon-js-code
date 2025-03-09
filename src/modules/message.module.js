import { Module } from '../core/module'
import { getRandomMessage } from '../utils'

export class MessageModule extends Module {
	constructor(type, text) {
		super(type, text)
		this.config = {
			corners: [
				{ top: '20px', left: '20px' },
				{ top: '20px', right: '20px' },
				{ bottom: '20px', left: '20px' },
				{ bottom: '20px', right: '20px' },
			],
			displayTime: 3000,
			className: 'message',
		}
	}
	trigger() {
		const element = this.createMessageElement()
		this.applyRandomPosition(element)
		this.showMessage(element)
		this.scheduleRemoval(element)
	}

	createMessageElement() {
		const element = document.createElement('div')
		element.className = this.config.className
		element.textContent = getRandomMessage()
		return element
	}

	applyRandomPosition(element) {
		const position =
			this.config.corners[
				Math.floor(Math.random() * this.config.corners.length)
			]
		Object.assign(element.style, position)
	}

	showMessage(element) {
		document.body.appendChild(element)
	}

	scheduleRemoval(element) {
		setTimeout(() => {
			element.remove()
		}, this.config.displayTime)
	}
}

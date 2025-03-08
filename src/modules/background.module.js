import { Module } from '../core/module'

export class BackgroundModule extends Module {
	constructor(type, text) {
		super(type, text)
		document.addEventListener('click', event => {
			const { target } = event

			if (target.dataset.type === 'background') {
				document.body.style.background = this.getRandomColor()
			}
		})
	}

	getRandomColor() {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		const a = Math.random().toFixed(2)
		const color = `rgba(${r}, ${g}, ${b}, ${a})`
		return color
	}
}

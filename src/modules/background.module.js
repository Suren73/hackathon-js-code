import { Module } from '../core/module'

export class BackgroundModule extends Module {
	trigger() {
		document.body.style.background = this.getRandomColor()
	}

	getRandomColor() {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		const a = Math.random().toFixed(2)
		const color = `rgba(${r}, ${g}, ${b}, ${a})`
		return color
	}
	defaultValue() {
		document.body.style.background = 'inherit'
	}
}

import { Module } from '../core/module'
import { random } from '../utils'

export class ShapeModule extends Module {
	trigger() {
		this.defaultValue()

		this.figure = document.createElement('div')
		const color = this.getRandomColor()
		const { width, height } = this.getRandomSize()
		const { left, top } = this.getRandomPosition(width, height)
		const isCircle = this.getRandomShape()

		this.figure.style.position = 'absolute'
		this.figure.style.width = `${width}px`
		this.figure.style.height = `${height}px`
		this.figure.style.backgroundColor = color
		this.figure.style.left = `${left}px`
		this.figure.style.top = `${top}px`

		if (isCircle) {
			this.figure.style.borderRadius = '50%'
		}

		document.body.appendChild(this.figure)
	}

	getRandomColor() {
		const r = Math.floor(Math.random() * 256)
		const g = Math.floor(Math.random() * 256)
		const b = Math.floor(Math.random() * 256)
		const a = Math.random().toFixed(2)
		const color = `rgba(${r}, ${g}, ${b}, ${a})`
		return color
	}

	getRandomSize() {
		const minSize = 50
		const maxSize = 200
		const width = random(minSize, maxSize)
		const height = random(minSize, maxSize)

		// const width = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize
		// const height = Math.floor(Math.random() * (maxSize - minSize + 1)) + minSize

		return { width, height }
	}

	getRandomPosition(width, height) {
		const maxLeft = Math.max(window.innerWidth - width, 0)
		const maxTop = Math.max(window.innerHeight - height, 0)
		const left = Math.floor(Math.random() * maxLeft)
		const top = Math.floor(Math.random() * maxTop)

		return { left, top }
	}

	getRandomShape() {
		const isCircle = Math.random() > 0.5

		return isCircle
	}

	defaultValue() {
		this.figure ? this.figure.remove() : null
	}
}

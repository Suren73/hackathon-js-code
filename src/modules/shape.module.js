import { Module } from '../core/module'
import { getRandomColor, random } from '../utils'

export class ShapeModule extends Module {
	trigger() {
		this.defaultValue()

		this.figure = document.createElement('div')
		const color = getRandomColor()
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

	getRandomSize() {
		const minSize = 50
		const maxSize = 200
		const width = random(minSize, maxSize)
		const height = random(minSize, maxSize)

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

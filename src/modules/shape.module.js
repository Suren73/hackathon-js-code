import { Module } from '../core/module'
import { getRandomColor, random } from '../utils'

export class ShapeModule extends Module {
	constructor(type, text) {
		super(type, text)

		this.currentShape = null
	}
	trigger() {
		this.defaultValue()
		this.#createNewShape()
	}

	#createNewShape() {
		// Генерация параметров
		const size = this.#getRandomSize()
		const position = this.#getRandomPosition(size.width, size.height)
		const isCircle = Math.random() > 0.5

		// Создание элемента
		this.currentShape = document.createElement('div')

		// Базовые стили
		Object.assign(this.currentShape.style, {
			position: 'absolute',
			width: `${size.width}px`,
			height: `${size.height}px`,
			backgroundColor: getRandomColor(),
			left: `${position.left}px`,
			top: `${position.top}px`,
		})

		// Форма
		if (isCircle) {
			this.currentShape.style.borderRadius = '50%'
		}

		document.body.append(this.currentShape)
	}

	#getRandomSize(min = 50, max = 200) {
		return {
			width: random(min, max),
			height: random(min, max),
		}
	}

	#getRandomPosition(width, height) {
		return {
			left: random(0, window.innerWidth - width),
			top: random(0, window.innerHeight - height),
		}
	}

	defaultValue() {
		if (this.currentShape) {
			this.currentShape.remove()
			this.currentShape = null
		}
	}
}

import { Menu } from './core/menu'
import { Module } from './core/module'

export class ContextMenu extends Menu {
	constructor(selector) {
		super(selector)
		this.modules = []
		document.addEventListener('contextmenu', this.handlerContextMenu.bind(this))
		document.addEventListener('click', this.handlerElementMenu.bind(this))
	}

	handlerContextMenu(event) {
		event.preventDefault()
		const viewportWidth = window.innerWidth
		const viewportHeight = window.innerHeight

		let left = event.clientX
		let top = event.clientY

		if (left + this.el.offsetWidth > viewportWidth) {
			left = viewportWidth - this.el.offsetWidth
		}

		if (top + this.el.offsetHeight > viewportHeight) {
			top = viewportHeight - this.el.offsetHeight
		}

		this.el.style.top = `${top}px`
		this.el.style.left = `${left}px`

		this.open()
	}

	handlerElementMenu(event) {
		this.clearValue()
		const { target } = event

		const type = target.dataset.type
		if (type) {
			this.modules.forEach(module => {
				module.type === type ? module.trigger() : null
			})
		}
	}

	open() {
		if (this.modules.length !== 0) {
			this.el.classList.add('open')
		}
	}

	close() {
		this.el.classList.remove('open')
	}

	add(module) {
		if (module instanceof Module) {
			this.modules.push(module)

			this.el.innerHTML = this.modules.map(module => module.toHTML()).join('')
		}
	}

	clearValue() {
		this.modules.forEach(module =>
			module.defaultValue ? module.defaultValue() : null
		)
	}
}

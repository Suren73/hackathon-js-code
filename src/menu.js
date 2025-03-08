import { Menu } from './core/menu'
import { Module } from './core/module'

export class ContextMenu extends Menu {
    constructor(selector) {
        super(selector)
        this.items = []
        document.addEventListener('contextmenu', event => {
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
        })

        // adjustPosition() {

        // }
    }

    open() {
        if (this.items.length !== 0) {
            this.el.classList.add('open')
        }
    }

    close() {
        this.el.classList.remove('open')
    }

    add(module) {
        if (module instanceof Module) {
            this.items.push(module.toHTML())
            this.el.innerHTML = this.items.join('')
        }
    }
}

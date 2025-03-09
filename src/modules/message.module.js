import { Module } from '../core/module'
import { getRandomMessage, random } from '../utils'

export class MessageModule extends Module {
	trigger() {
		// Создаем элемент сообщения
		const message = document.createElement('div')
		message.className = 'message'
		message.textContent = getRandomMessage()

		// Выбираем случайный угол
		const corners = [
			{ top: '20px', left: '20px' }, // верхний-левый
			{ top: '20px', right: '20px' }, // верхний-правый
			{ bottom: '20px', left: '20px' }, // нижний-левый
			{ bottom: '20px', right: '20px' }, // нижний-правый
		]

		// Применяем случайное позиционирование
		const position = corners[random(0, corners.length)]
		Object.assign(message.style, position)

		// Добавляем сообщение на страницу
		document.body.appendChild(message)

		// Удаляем сообщение через 3 секунды
		setTimeout(() => {
			message.remove()
		}, 3000)
	}

	defaultValue() {}
}

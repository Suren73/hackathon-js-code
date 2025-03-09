export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
	const r = random(0, 256)
	const g = random(0, 256)
	const b = random(0, 256)
	const a = Math.random().toFixed(2)
	const color = `rgba(${r}, ${g}, ${b}, ${a})`
	return color
}

export function getRandomMessage() {
	const messages = [
		'С Новым годом!',
		'С 23 февраля',
		'С 8 марта',
		'С Рождеством!',
		'Добро пожаловать!',
	]
	return messages[random(0, messages.length - 1)]
}

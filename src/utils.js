export function random(min, max) {
	return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}

export function getRandomColor() {
	const r = Math.floor(Math.random() * 256)
	const g = Math.floor(Math.random() * 256)
	const b = Math.floor(Math.random() * 256)
	const a = Math.random().toFixed(2)
	const color = `rgba(${r}, ${g}, ${b}, ${a})`
	return color
}

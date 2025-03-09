import { Module } from '../core/module'
import { random } from '../utils'

export class SoundModule extends Module {
	trigger() {
		const audioContext = new (window.AudioContext ||
			window.webkitAudioContext)()
		const types = ['sine', 'square', 'sawtooth', 'triangle', 'noise']

		// Случайные параметры
		const params = {
			type: types[Math.floor(Math.random() * 5)],
			// freq: Math.random() * 1900 + 100,
			freq: random(100, 2000),
			duration: random(1, 20) / 10,
			volume: random(2, 7) / 10,
		}

		// Генерация звука
		if (params.type === 'noise') {
			const bufferSize = audioContext.sampleRate * params.duration
			const buffer = audioContext.createBuffer(
				1,
				bufferSize,
				audioContext.sampleRate
			)
			const data = buffer.getChannelData(0)
			for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1
			const source = audioContext.createBufferSource()
			source.buffer = buffer
			source.connect(audioContext.destination)
			source.start()
			source.stop(audioContext.currentTime + params.duration)
		} else {
			const osc = audioContext.createOscillator()
			const gain = audioContext.createGain()
			osc.type = params.type
			osc.frequency.value = params.freq
			gain.gain.value = params.volume
			osc.connect(gain).connect(audioContext.destination)
			osc.start()
			osc.stop(audioContext.currentTime + params.duration)
		}
	}

	defaultValue() {}
}

import { Module } from '../core/module'
import { random } from '../utils'

export class SoundModule extends Module {
	#audioContext
	#types = ['sine', 'square', 'sawtooth', 'triangle', 'noise']

	trigger() {
		this.#initializeAudioContext()
		const params = this.#generateSoundParams()
		this.#playSound(params)
	}

	#initializeAudioContext() {
		this.#audioContext = new (window.AudioContext ||
			window.webkitAudioContext)()
	}

	#generateSoundParams() {
		return {
			type: this.#types[Math.floor(Math.random() * this.#types.length)],
			frequency: random(100, 2000),
			duration: random(1, 20) / 10,
			volume: random(2, 7) / 10,
		}
	}

	#playSound(params) {
		if (params.type === 'noise') {
			this.#playNoise(params)
		} else {
			this.#playOscillator(params)
		}
	}

	#playOscillator({ type, frequency, duration, volume }) {
		const oscillator = this.#audioContext.createOscillator()
		const gainNode = this.#audioContext.createGain()

		oscillator.type = type
		oscillator.frequency.value = frequency
		gainNode.gain.value = volume

		this.#connectAndStart(oscillator, gainNode, duration)
	}

	#playNoise({ duration }) {
		const bufferSize = this.#audioContext.sampleRate * duration
		const buffer = this.#audioContext.createBuffer(
			1,
			bufferSize,
			this.#audioContext.sampleRate
		)
		const data = buffer.getChannelData(0)

		for (let i = 0; i < bufferSize; i++) {
			data[i] = Math.random() * 2 - 1
		}

		const source = this.#audioContext.createBufferSource()
		source.buffer = buffer
		source.connect(this.#audioContext.destination)
		source.start()
		source.stop(this.#audioContext.currentTime + duration)
	}

	#connectAndStart(oscillator, gainNode, duration) {
		oscillator.connect(gainNode).connect(this.#audioContext.destination)
		oscillator.start()
		oscillator.stop(this.#audioContext.currentTime + duration)
	}
}

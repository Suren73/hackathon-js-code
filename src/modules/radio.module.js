import { Module } from '../core/module'
import { ContextMenu } from '../menu'

import backImg from '../images/back.jpg';
import startImg from '../images/start.jpg';
import stopImg from '../images/stop.jpg';
import forvImg from '../images/forv.jpg';

//import helloAudio from '../audio/Hello.mp3';

export class RadioModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.audio = null; //для управления музыкой
        this.currentTrack = 0; //текущий трек из списка
        this.radioList = [
            //{"Приветствие ",helloAudio},
            { name: "Русское радио", path: 'https://rusradio.hostingradio.ru/rusradio128.mp3' },
            { name: "Мое радио 24 ", path: 'http://listen1.myradio24.com:9000/5967' },
            { name: "Ретро радио", path: 'http://air.volna.top/Retro' }
        ];

        document.addEventListener('click', event => {
            const { target } = event

            if (target.dataset.type === 'RunAudio') {
                this.createPlayer();
            }
        })
    }

    createPlayer() {
        const contextMenu = new ContextMenu('#menu');
        contextMenu.close();

        const existingPlayer = document.querySelector('.radioPlayer');

        if (existingPlayer) {
            existingPlayer.remove();
        }

        const $divPlayer = document.createElement("div");
        $divPlayer.className = 'radioPlayer';

        const zagolovok = document.createElement("h2");
        zagolovok.innerText = 'РАДИО';
        zagolovok.className = 'radioTitle';
        $divPlayer.appendChild(zagolovok);

        const $radioButtons = document.createElement("div");
        $radioButtons.className = 'radioButtons';

        // //кнопки+++
        //1
        const radioButton1 = document.createElement("button");
        radioButton1.id = 'back';
        radioButton1.className = 'radioButton';

        let image = document.createElement("img");
        image.src = '../images/back.jpg';
        image.alt = 'Back';

        radioButton1.appendChild(image);
        $radioButtons.appendChild(radioButton1);
        //2
        const radioButton2 = document.createElement("button");
        radioButton2.id = 'start';
        radioButton2.className = 'radioButton';

        image = document.createElement("img");
        image.src = './images/start.jpg';
        //image.src = startImg;//
        image.alt = 'PlayStart';

        radioButton2.appendChild(image);
        $radioButtons.appendChild(radioButton2);
        //3
        const radioButton3 = document.createElement("button");
        radioButton3.id = 'stop';
        radioButton3.className = 'radioButton';

        image = document.createElement("img");
        image.src = '../images/stop.jpg';
        image.alt = 'Stop';

        radioButton3.appendChild(image);
        $radioButtons.appendChild(radioButton3);
        //4
        const radioButton4 = document.createElement("button");
        radioButton4.id = 'forv';
        radioButton4.className = 'radioButton';

        image = document.createElement("img");
        image.src = '../images/forv.jpg';
        image.alt = 'Forvard';

        radioButton4.appendChild(image);
        $radioButtons.appendChild(radioButton4);

        $divPlayer.appendChild($radioButtons);
        document.body.appendChild($divPlayer);
        //кнопки---

        $radioButtons.addEventListener('click', event => {
            const ourButton = event.target.closest(".radioButton");
            if (ourButton) {
                this.controlSound(ourButton.id);
            }

        })

    }

    controlSound(typeControl) {

        if (typeControl == 'stop' && this.audio) {

            this.audio.pause();
            this.audio.currentTime = 0;

            const currentRadioTitle = document.querySelector(".radioTitle");
            currentRadioTitle.textContent = "РАДИО остановлено ";

        }
        else if (typeControl == 'start') {
            let tekRadio = this.radioList[this.currentTrack];

            const currentRadioTitle = document.querySelector(".radioTitle");
            currentRadioTitle.textContent = "РАДИО : " + tekRadio.name;

            this.audio = new Audio(tekRadio.path);

            this.audio.play().then(() => {
                console.log('Радио Радио запущено');
            }).catch((error) => {
                console.error('Ошибка при воспроизведении:', error);
            });
        }
        else if (typeControl == 'back') {

            this.currentTrack -= 1;
            if (this.currentTrack <= 0) this.currentTrack = this.radioList.length;
            if (this.audio && !this.audio.paused) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }

            let tekRadio = this.radioList[this.currentTrack];
            const currentRadioTitle = document.querySelector(".radioTitle");
            currentRadioTitle.textContent = "РАДИО : " + tekRadio.name;
            this.audio = new Audio(tekRadio.path);

            this.audio.play().then(() => {
                console.log('Радио запущено');
            }).catch((error) => {
                console.error('Ошибка при воспроизведении:', error);
            });
        }
        else if (typeControl == 'forv') {
            this.currentTrack += 1;
            if (this.currentTrack >= this.radioList.length) this.currentTrack = 0;
            if (this.audio && !this.audio.paused) {
                this.audio.pause();
                this.audio.currentTime = 0;
            }

            let tekRadio = this.radioList[this.currentTrack];
            const currentRadioTitle = document.querySelector(".radioTitle");
            currentRadioTitle.textContent = "РАДИО : " + tekRadio.name;
            this.audio = new Audio(tekRadio.path);

            this.audio.play().then(() => {
                console.log('Радио Радио запущено');
            }).catch((error) => {
                console.error('Ошибка при воспроизведении:', error);
            });
        }

    }

}
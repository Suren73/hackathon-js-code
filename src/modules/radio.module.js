import { Module } from '../core/module'
import { ContextMenu } from '../menu'

export class RadioModule extends Module {
    constructor(type, text) {
        super(type, text);
        this.audio = null; //для управления музыкой
        this.currentTrack = 0; //текущий трек из списка
        this.radioList = [
            //'здесь первая лок. запись',
            'https://rusradio.hostingradio.ru/rusradio128.mp3',
            'http://listen1.myradio24.com:9000/5967',
            'http://air.volna.top/Retro'
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

        const $divPlayer = document.createElement("div");
        $divPlayer.className = 'radioPlayer';
        $divPlayer.style.background = '#582314';

        const $radioButtons = document.createElement("div");
        $radioButtons.className = 'radioButtons';

        // //кнопки+++
        //1
        const radioButton1 = document.createElement("button");
        radioButton1.id = 'back';
        radioButton1.className = 'radioButton';

        let image = document.createElement("img");
        image.src = '../pic/back.jpg';
        image.alt = 'PlayStart Button';

        radioButton1.appendChild(image);
        $radioButtons.appendChild(radioButton1);
        //2
        const radioButton2 = document.createElement("button");
        radioButton2.id = 'start';
        radioButton2.className = 'radioButton';

        image = document.createElement("img");
        image.src = '../pic/start.jpg';
        image.alt = 'PlayStart Button';

        radioButton2.appendChild(image);
        $radioButtons.appendChild(radioButton2);
        //3
        const radioButton3 = document.createElement("button");
        radioButton3.id = 'stop';
        radioButton3.className = 'radioButton';

        image = document.createElement("img");
        image.src = '../pic/stop.jpg';
        image.alt = 'Stop Button';

        radioButton3.appendChild(image);
        $radioButtons.appendChild(radioButton3);
        //4
        const radioButton4 = document.createElement("button");
        radioButton4.id = 'forv';
        radioButton4.className = 'radioButton';

        image = document.createElement("img");
        image.src = '../pic/forv.jpg';
        image.alt = 'Forvard Button';

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
        }
        else if (typeControl == 'start') {
            let tekRadio = this.radioList[this.currentTrack];
            this.audio = new Audio(tekRadio);

            this.audio.play().then(() => {
                console.log('Радио Радио запущено');
            }).catch((error) => {
                console.error('Ошибка при воспроизведении:', error);
            });
        }

    }

}
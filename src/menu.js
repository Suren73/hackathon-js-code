import { Menu } from './core/menu'

export class ContextMenu extends Menu {

    constructor() {
        super();
        this.modules = []; //пункты меню
    }

    // открытие списка меню с координатами мышки
    open(x, y) {
        this.$rootElement = document.createElement('div');


        for (let punktMenu of this.modules) {
            const $punktMenu = document.createElement('li');
            $punktMenu.className = 'menu-item';
            $punktMenu.innerText = punktMenu.name;
            this.$rootElement.appendChild($punktMenu);
        }

        const idMenu = document.querySelector("#menu");
        if (!idMenu.classList.contains("open")) {
            idMenu.classList.add("open");
        }

        while (idMenu.firstChild) {
            idMenu.removeChild(idMenu.firstChild);
        }

        idMenu.appendChild(this.$rootElement);
        idMenu.style.left = `${x}px`;
        idMenu.style.top = `${y}px`;

        if (this.modules.length != 0) {
            const ourMenu = document.querySelector(".menu");
            ourMenu.addEventListener('click', (event) => {
                const nameMenu = event.target.closest(".menu-item");
                if (nameMenu) {
                    this.trigger(nameMenu.innerText);
                }

            })

        }

    }

    //закрытие меню ???
    close() {
        const idMenu = document.querySelector("#menu");
        if (idMenu.classList.contains("open")) {
            idMenu.classList.remove("open");
        }
    }

    //добавление пункта меню
    addModule(module) {

        const exists = this.modules.some(el => el.name === module.name);

        if (!exists) {
            this.modules.push(module);
        }
    }

    //отработка функции в зависимости от выбора пункта
    trigger(action) {

        //найти название процедуры по наименованию
        const punctesMenu = this.modules.find(m => m.name.trim() === action.trim());
        if (punctesMenu) {

            //запустить процедуру
            //module.trigger();

            import(`./modules/${punctesMenu.trigger}`) // Укажите путь относительно HTML-документа
                .then((module) => {
                    // Используйте экспортируемый класс
                    const clicksModule = new module.ClicksModule();
                    console.log(clicksModule);
                })
                .catch((error) => {
                    console.error('Ошибка при загрузке модуля:', error);
                });

        }
    }



}
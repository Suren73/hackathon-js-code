import { ContextMenu } from './menu';

document.addEventListener('DOMContentLoaded', function () {
    const menu = new ContextMenu();

    document.body.addEventListener('contextmenu', function (event) {

        event.preventDefault();
        //пункты по умолчанию 
        menu.addModule({ name: "Считать Клики за 3 секунды ", trigger: 'clicks.module.js' });
        menu.addModule({ name: "Создать фигуру ", trigger: 'shape.module.js' });
        menu.addModule({ name: "Поменять цвет ", trigger: 'background.module.js' });
        //menu.addModule({ name: "Вызвать сообщение ", trigger: 'ReturnMessage.js' });

        menu.open(event.pageX, event.pageY);
    });

    document.body.addEventListener('click', function (event) {
        event.preventDefault();
        const idMenu = document.querySelector("#menu");
        if (!idMenu.contains(event.target)) {
            menu.close();
        } else {
            if (!idMenu.classList.contains("open")) {
                idMenu.classList.add("open");
            }
        }
    });

});
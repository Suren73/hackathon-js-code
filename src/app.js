import './styles.css'
import { ContextMenu } from './menu'
import { BackgroundModule } from './modules/background.module'
import { RadioModule } from './modules/radio.module'

const contextMenu = new ContextMenu('#menu');

const backgroundModule = new BackgroundModule('background', 'Поменять цвет фона');
const radioModule = new RadioModule('RunAudio', 'Запустить радио');

contextMenu.add(backgroundModule);
contextMenu.add(radioModule);


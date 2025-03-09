import { ContextMenu } from './menu'
import { BackgroundModule } from './modules/background.module'
import { ClicksModule } from './modules/clicks.module'
import { ShapeModule } from './modules/shape.module'
import { SoundModule } from './modules/sound.module'
import './styles.css'

const contextMenu = new ContextMenu('#menu')

const backgroundModule = new BackgroundModule('background', 'Поменять цвет')
const shapeModule = new ShapeModule('shape', 'Создать фигуру')
const clickModule = new ClicksModule('click', 'Считать клики (за 3 секунды)')
const soundModule = new SoundModule('sound', 'Случайный звук')

contextMenu.add(backgroundModule)
contextMenu.add(shapeModule)
contextMenu.add(clickModule)
contextMenu.add(soundModule)

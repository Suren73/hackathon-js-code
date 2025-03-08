import { ContextMenu } from './menu'
import { BackgroundModule } from './modules/background.module'
import { ShapeModule } from './modules/shape.module'
import './styles.css'

const contextMenu = new ContextMenu('#menu')

const backgroundModule = new BackgroundModule('background', 'Поменять цвет')
const shapeModule = new ShapeModule('shape', 'Создать фигуру')

contextMenu.add(backgroundModule)
contextMenu.add(shapeModule)

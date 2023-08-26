# globeModel

## install
`
npm install
`

`
npx vite
`
Или можно просто открыть html файл

## Запуск отрисовки

Из ` index.js ` импортировать функцию ` globeDraw `, которую можно либо вставлять как есть, либо можно передать как аргумент объект опций с необходимыми значениями, не обязательно указывать все. Значения по умолчанию:
```
{
    sceneWidth = window.innerWidth,                                  ширина сцены
    sceneHeight = window.innerHeight,                                высота сцены
    backgroundColor = '#2f3035',                                     цвет задника, можно словом типа red
    modelColor = 0xFFFFFF,                                           цвет модельки, обязательно шестнадцатеричным и не строкой
    objectPosition = { x: 0, y: 0, z: 0 },                           позиция объекта в пространстве
    objectRotation = { x: Math.PI * 1.3, y: Math.PI / 1.8, z: 0 },   изначальное положение относительно собственных осей объекта
    mouseDrag = false,                                               можно ли тягать глобус мышкой
    dragSpeed = 0.001,                                               скорость вращения
    autoSpeed = 0,                                                   скорость автоматического вращения
    zoom = 180,                                                      зум
    pathToObj = '/globus/Severin earth model (1) (1).obj'            откуда взять объект
}
```

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
    container = document.querySelector('body'),                      контейнер в который встраивается сцена (ширина/высота автоматически подбирается под контейнер)
    sceneWidth = container.offsetWidth,                              ширина сцены
    sceneHeight = container.offsetHeight,                            высота сцены
    backgroundColor = '#2f3035',                                     цвет задника, можно словом типа red
    rotationAngles = {                                               углы вращения объекта
            left: -Math.PI / 6,
            right: Math.PI / 6
        },
    modelColor = 0xFFFFFF,                                           цвет модельки, обязательно шестнадцатеричным и не строкой
    objectPosition = {                                               позиция объекта в пространстве
        x: 0, 
        y: 0, 
        z: 0 
    },                           
    objectRotation = { x: Math.PI * 1.3, y: Math.PI / 1.8, z: 0 },   изначальное положение относительно собственных осей объекта
    mouseDrag = false,                                               можно ли тягать/зумить глобус мышкой
    dragSpeed = 0.001,                                               скорость вращения
    autoSpeed = 0,                                                   скорость автоматического вращения
    cameraPosition = {                                               положение камеры
        x: 100,
        y: 120,
        z: 300
    },                                                      
    pathToObj = '/globus/Severin earth model (1) (1).obj'            откуда взять объект
}
```

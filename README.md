# Valli.js (в разработке | &alpha;-версия)

## Содержание
- [Описание](#Описание)
- [Quick start](#quick-start)
- [Описание типов](#Описание-типов)

## Описание
Небольшая библиотека для описания и проверки типов данных в объектах. Вдохновленная библиотеками `is.js` и `PropTypes`.

## Quick start
Подключение в браузере:
```html
<script src="path/to/yourCopyOf/valli.js"></script>
```
Node.js:
```javascript
const Valli = require('path/to/yourCopyOf/valli.js');
```
> Пока не опубликован в npm

Пример использования:
```javascript
const { is, checkTypes, valli } = require('valli.js');

// описание интерфейса объекта
const interfaceUser = {
  name: is.string.required,
  age: is.number,
}

const correctUser = {
  name: 'Vasya',
  age: 32,
}

checkTypes(interfaceUser, correctUser) // -> true

const wrongUser = {
  name: 'Vasya',
  age: '?',
}

checkTypes(interfaceUser, wrongUser) // -> false

// Можно создать функцию для проверки конкретного интерфейса
// с помощью функции valli
const isUser = valli(interfaceUser);

isUser(correctUser) //-> true
isUser(wrongUser) //-> false
```

## Описание типов
Описание интерфейса производится в виде js объекта с описанием типа значений для каждого свойства.

Пример:
```javascript
const { is } = require('valli.js');

const interfaceUser = {
  name: is.string.required,
  age: is.number,
  hobby: is.array.of.string,
  family: is.shape({
    children: is.array.of.string
    ...
  })
}
```
 ### Функции проверки:

 |функция|описание|
 |:--|:--|
 |`is.string`| проверяет, является ли переданное значение типом `string` |
 |`is.number`| проверяет, является ли переданное значение типом `number` |
 |`is.bool`| проверяет, является ли переданное значение типом `boolean` |
 |`is.null`| проверяет, является ли переданное значение типом `null` |
 |`is.nan`| проверяет, является ли переданное значение типом `NaN` |
 |`is.undefined`| проверяет, является ли переданное значение типом `undefined` |
 |`is.object`| проверяет, является ли переданное значение типом `object` |
 |`is.empty`| проверяет, является ли переданное значение пустым|
 |`is.function`| проверяет, является ли переданное значение функцией|
 |`is.date`| проверяет, является ли переданное значение датой|
 |`is.array`| проверяет, является ли переданное значение массивом|
 |`is.shape(objectInterface)`| проверяет, соответствует ли переданное значение интерфейсу описанному в `objectInterface`|
 |`is.instance(classObject)`| проверяет, что переданное значение это экземпляр класса `classObject`|

 ## Дополнительные функции проверки массивов

 |функция|описание|
 |:--|:--|
 |`is.array.of(type)`| проверяет на наличие в массиве типа указанного в `type` |
 |`is.array.oneOf(types)`| проверяет на наличие в массиве типов указанных в `types` |

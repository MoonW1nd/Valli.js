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
 ### Описание валидации примитивных типов:

 |функция|описание|
 |:--|:--|
 |`is.string`| проверяет на тип `string` |
 |`is.number`| проверяет на тип `number` |
 |`is.bool`| проверяет на тип `boolean` |
 |`is.null`| проверяет на тип `null` |
 |`is.nan`| проверяет на тип `NaN` |
 |`is.undefined`| проверяет на `undefined` |
 |`is.object`| проверяет на тип `object` |

### Описание валидации объектных типов:

 |функция|описание|
 |:--|:--|
 |`is.function`| проверяет на наличие в значении функции |
 |`is.date`| проверяет на наличие в значении Даты|
 |`is.array`| проверяет на наличие в значении массива|
 |`is.shape(objectInterface)`| проверяет на наличие в значении объекта с интерфейсом переданном в функцию|
 |`is.instance(instance)`| проверяет что значение это экземпляр класса переданного в `instance`|

 ## Функции валидации масивов

 |функция|описание|
 |:--|:--|
 |`is.array.of(type)`| проверяет на наличие в масcиве типа указанного в `type` |
 |`is.array.oneOf(types)`| проверяет на наличие в масcиве типов указаных в `types` |
 |`is.date`| проверяет на наличие в значении Даты|
 |`is.array`| проверяет на наличие в значении массива|
 |`is.shape`| проверяет на наличие в значении объекта с интерфейсом переданном в функцию|

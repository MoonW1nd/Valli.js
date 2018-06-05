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
<script src="path/to/yourCopyOf/Valli.js"></script>
```
Node.js:
```javascript
const Valli = require('path/to/yourCopyOf/Valli.js');
```
> Пока не опубликован в npm

Пример использования:
```javascript
const { is, validate } = require('Valli.js');

// описание интерфейса объекта
const interfaceUser = {
  name: is.string.required,
  age: is.number,
}

const correctUser = {
  name: 'Vasya',
  age: 32,
}

validate(correctUser, interfaceUser) // -> true

const wrongUser = {
  name: 'Vasya',
  age: '?',
}

validate(wrongUser, interfaceUser) // -> false
```

## Описание типов
Описание интерфейса производится в виде js объекта с описанием типа значений для каждого свойства.

Пример:
```javascript
const { is } = require('Valli.js');

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


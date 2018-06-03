# Valli.js
## Содержание
## Описание
Небольшая библиотека для описания и проверки типов данных в объектах. Вдохнавленная библиотеками `is.js` и `PropTypes`.

## Quik start
### Описание типов объекта
Описание интерфейса производится в виде js объекта с описанием типа значений для каждого свойства.

Пример:
```javascript
const { is } = require('Valli.js');

const interfaceUser = {
  name: is.srting.requred,
  age: is.number.requreed,
  hobby: is.array.of.string,
  family: is.shape({
    children: is.array.of.string
    ...
  })
}
```
 Описание валидации примитивных типов:
 |функиция|описание|
 |:--:|:--|
 |`is.stirng`| проверяет на тип `string` |
 |`is.number`| проверяет на тип `number` |
 |`is.bool`| проверяет на тип `boolean` |
 |`is.null`| проверяет на тип `null` |
 |`is.nan`| проверяет на тип `NaN` |
 |`is.undefined`| проверяет на `undefined` |
 |`is.object`| проверяет на тип `object` |

Описание валидации объектных типов:
 |функиция|описание|
 |:--:|:--|
 |`is.function`| проверяет на наличие в значении функции |
 |`is.date`| проверяет на наличие в занчении Даты|
 |`is.array`| проверяет на наличие в занчении массива|

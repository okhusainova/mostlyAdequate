'use strict';

var _ = require('ramda');
var accounting = require('accounting');
var curry = require('lodash.curry');

var compose = function(f,g) {
    return function(x) {
        return f(g(x));
    };
};

var trace = curry(function(tag, x){
    console.log('tag', tag, 'x', x);
    return x;
});

// Тестовые данные
var CARS = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-S", horsepower: 550, dollar_value: 132000, in_stock: false},
    {name: "Audi R8", horsepower: 525, dollar_value: 114200, in_stock: false},
    {name: "Aston Martin One-77", horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower: 700, dollar_value: 1300000, in_stock: false}
  ];

// Упражнение 1:
// ============
// используйте _.compose() для того чтобы переписать функцию снизу. Подсказка: _.prop() каррируемая.
var isLastInStock = function(cars) {
  var last_car = _.last(cars);
  return _.prop('in_stock', last_car);
};

//Решение Упражнения 1:
var myFunc = compose(_.last, _.map(_.prop('in_stock')));
//Конец решения Упражнения 1

// Упражнение 2:
// ============
// используйте _.compose(), _.prop() and _.head() чтобы получить название первой машины
var nameOfFirstCar = undefined;

//Решение Упражнения 2:
var nameOfFirstCar = _.compose(_.head(), _.map(_.prop('name')));
//Конец решения Упражнения 2


// Упражнение 3:
// ============
// используйте функцию _average для того чтобы отрефакторить averageDollarValue с помощью композиции
var _average = function(xs) {
    return _.reduce(_.add, 0, xs) / xs.length; }; // <- оставьте эту функцию

var averageDollarValue = function(cars) {
    var dollar_values = _.map(function(c) { return c.dollar_value; }, cars);
    return _average(dollar_values);
};

//Решение Упражнения 3:
var myAverageDollarValue = _.compose(_average, _.map(_.prop('dollar_value')));
var my = _.map(_.prop('dollar_value'));
//Конец решения Упражнения 3

// Упражнение 4:
// ============
// Напишите функцию: sanitizeNames() используя композицию которая возвращает список имён в нижнем регистре и заменяя все пробелы на _, пример: sanitizeNames(["Hello World"]) //=> ["hello_world"].

var _underscore = _.replace(/\W+/g, '_'); //<-- не изменяйте эту функцию

var sanitizeNames = undefined;

//Решение Упражнения 4:
// var sanitizeNames = _.compose(_.toLower, _.map(_.prop('name')));

let mySanitizeNames = cars =>  {
    let newNames ='',
        carsNames = _.map(_.prop('name')),
        changedNames = carsNames(cars);
    for (let i = 0; i < changedNames.length; i++) {
         newNames += _underscore(changedNames[i]).toLowerCase() + '\n';
    }
    return newNames;
};
//Конец решения Упражнения 4



// Бонус 1:
// ============
// Отрефакторьте availablePrices с помощью композиции.

var availablePrices = function(cars) {
    var available_cars = _.filter(_.prop('in_stock'), cars);
    return available_cars.map(function(x){
        return accounting.formatMoney(x.dollar_value);
    }).join(', ');
};


// Решение Бонуса 1
const myAvailablePrices = _.compose(accounting.formatMoney, _.map(_.prop('dollar_value')), _.filter(_.prop('in_stock')));
// Конец решения Бонуса 1

// Бонус 2:
// ============
// Отрефакторьте в стиле отсутствия ссылок. Подсказка: вы можете использовать _.flip()

var fastestCar = function(cars) {
    var sorted = _.sortBy(function(car){ return car.horsepower }, cars);
    var fastest = _.last(sorted);
    return fastest.name + ' is the fastest';
};

// Решение Бонуса 2
const myFastestCar = _.compose(_.last, _.map(_.prop('horsepower')));
// Конец решения Бонуса 2

mySanitizeNames(CARS); //?????????? :(
myFastestCar(CARS);  //?????????? :(

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
var lst = _.prop('in_stock');
var myFunc = compose(_.last, _.map(lst));
//Конец решения Упражнения 1:

isLastInStock(CARS);
myFunc(CARS);


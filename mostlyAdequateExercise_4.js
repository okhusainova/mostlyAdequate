'use strict';

var _ = require('ramda');

// Упражнение 1
//==============
// Проведите рефакторинг и избавьтесь от всех аргументов путём частичного применения функции.

var words = function(str) {
    return _.split(' ', str);
};


const myWord = _.split(' ');

// Упражнение 1a
//==============
// Воспользуйтесь функцией map, чтобы создать новую функцию words, которая будет работать с массивами строк.

var sentences = undefined;

// Упражнение 1a
var sentences = _.map(words);
// Конец решения Упражнения 1a


// Упражнение 2
//==============
// Проведите рефакторинг и избавьтесь от всех аргументов путём частичного применения функции.

var filterQs = function(xs) {
    return _.filter(function(x){ return match(/q/i, x);  }, xs);
};

//Решение Упражнение 2
const myfilterQs = _.filter(match(/q/i)); //???????
// Конец решения Упражнения 2

// Упражнение 3
//==============
// Воспользуйтесь функцией _keepHighest чтобы отрефакторить функцию max.
// Функция max не должна принимать аргументов.

// Не меняйте:
var _keepHighest = function(x,y){ return x >= y ? x : y; };

// Проведите рефакторинг:
var max = function(xs) {
    return _.reduce(function(acc, x){
        return _keepHighest(acc, x);
    }, -Infinity, xs);
};


//Решение Упражнение 3
const myMax = _.reduce(_keepHighest, -Infinity);
// Конец решения Упражнения 3

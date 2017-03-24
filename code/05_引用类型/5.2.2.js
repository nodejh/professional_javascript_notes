var person1 = {
  toLocaleString: function () {
    return '1-toLocaleString';
  },
  toString: function () {
    return '1-toString';
  },
  valueOf: function () {
    return '1-valueOf';
  }
}

var person2 = {
  toLocaleString: function () {
    return '2-toLocaleString';
  },
  toString: function() {
    return '2-toString';
  },
  valueOf: function () {
    return '2-valueOf';
  }
}

var person = [person1, person2];
console.log('person.toString(): ', person.toString());
console.log('person.toLocaleString(): ', person.toLocaleString());
console.log('person.valueOf(): ', person.valueOf());

console.log('person.join(\'||\'): ', person.join('||'));


// person.toString():  1-toString,2-toString
// person.toLocaleString():  1-toLocaleString,2-toLocaleString
// person.valueOf():  [ { [String: '1-valueOf']
//     toLocaleString: [Function: toLocaleString],
//     toString: [Function: toString],
//     valueOf: [Function: valueOf] },
//   { [String: '2-valueOf']
//     toLocaleString: [Function: toLocaleString],
//     toString: [Function: toString],
//
//     valueOf: [Function: valueOf] } ]

// 1-toString||2-toString

function compare(key) {
  return function (a, b) {
    var value1 = a[key];
    var value2 = b[key];
    return value1 - value2;
  }
}

var data = [{a: '2'}, {a: '1'}, {a: '10'}];
console.log(data.sort(compare('a')));

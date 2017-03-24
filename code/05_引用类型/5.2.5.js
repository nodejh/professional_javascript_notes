var arr = [1, 2, 15, 10, 20];

// 反转
console.log(arr.reverse());
// [20, 10, 15, 2, 1]

// `toString() 之后` 升序
console.log(arr.sort());
// [1, 10, 15, 2, 10]

// 数字升序
// sort() 之后再调用 compare 重排序
console.log(arr.sort(compare));
// [1, 2, 10, 15, 20]

console.log(arr.sort(compare2));



/**
 * 数字升序
 * @param  {number} a 第一个值
 * @param  {number} b 第二个值
 * @return {number}   -1 不交互位置  1 交换位置
 */
function compare(a, b) {
  console.log('------');
  console.log('a: ', a);
  console.log('b: ', b);
  if (a < b) {
    // 不交换位置
    return -1;
  } else if (a > b) {
    // 交换位置
    return 1;
  } else {
    return 0;
  }
}


function compare2(a, b) {
  return a - b;
}

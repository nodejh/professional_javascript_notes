# 第八章 BOM

BOM 即浏览器对象模型。


## 8.1 window 对象

window 对象是浏览器的一个实例：

+ JavaScript 访问浏览器的接口。
+ ECMAScript 的 Global 对象。网页中的任何一个对象、变量和函数都以 window 作为其 Global 对象，如 `parseInt === window.parseInt`

> 注意，`parseInt() === window.parseInt()` 的值是 false，因为 parseInt() 的值是 `NaN`，等号运算符（== 和 ===） 不能被用来判断一个值是否是 NaN。必须使用 Number.isNaN() 或 isNaN() 函数。[https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/NaN)

### 8.1.1 全局作用域

在全局作用域中声明的变量、函数都会变成 window 对象的属性和方法：

```
var age = 29;
function sayAge() {
  alert(this.age);
  // sayAge 存在于全局作用域中，
  // 所以 this.age 被映射到 window.age
}
alert(window.age);  // 29
sayAge();           // 29
window.sayAge();    // 29
```

全局变量不能通过 delete 操作符删除，定义在 window 对象上的属性可以：

```
var age = 29;
window.color = "red";

// 在 IE < 9 时抛出错误，其他浏览器返回 false
delete window.age;  // false

// 在 IE < 9 时抛出错误，其他浏览器返回 true
delete window.color;  // true
```

> 对于 IE9 以下浏览器的情况，我也没有测试过。不过 《天猫即将不支持IE8》[https://github.com/tmallfe/tmallfe.github.io/issues/40]，所以以后一般也不用太在意了（?)。

访问未声明的变量会抛出错误，使用 window 可以知道某个变量是否存在：

```
// 抛出错误，因为 old 未定义
var new = old;

// 不会抛出错误，因为 window.oldValue 是 undefined
var newValue = window.oldValue; // undefined
```

再来看一个例子：

```
var b = 2;
console.log(window.b);  // 2
console.log(delete window.b);  // false
console.log(window.b);  // 2

c = 3;
console.log(window.c);  // 3
console.log(delete window.c);  // true
console.log(window.c);  // undefined
```

至于其原理及更详细内容，可查看文章[《js中的内部属性与delete操作符》](http://log.fyscu.com/index.php/archives/303/)。

### 8.1.2 窗口关系及框架

如果页面包含框架，则每个框架都拥有自己的 window 对象，并且保存着 frames 集合中。

### 8.1.3 窗口位置

IE,Safari,Chrome, Opera/Firefox:

+ screenLeft/screenX 窗口相对于屏幕左边的位置
+ screenTop/screenY 窗口相对于屏幕上边的位置

```
// 跨浏览器获取窗口左边和上边位置
var leftPos = (typeof window.screenLeft == 'number') ?
                window.screenLeft : window.screenX;
var leftPos = (typeof window.screenTop == 'number') ?
                window.screenTop : window.screenY;    
```

```
// 将窗口移到屏幕最左上角
window.moveTo(0, 0);

// 将窗口向下移动100像素
window.moveBy(0, 100);

// 将窗口移到(200, 300)
window.moveTo(200, 300);

// 将窗口向左移动50像素
window.moveBy(-50, 0);
```

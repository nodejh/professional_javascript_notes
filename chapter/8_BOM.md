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

### 8.1.4 窗口大小

> TODO 这里书上感觉写得也不清楚。待完善。

不同浏览器确定窗口大小的属性很不一样。

IE9+/Firefox/Safari/Chrome/Opera 均定义了四个属性 `innerWidth/innerHeight/outerWidth/outerHeight`。

+ IE9+／Safari/Firefox 中，outerWidth/outerHeight 返回浏览器窗口的本身尺寸（无论是从最外层的window对象还是某个框架访问）
+ Opera 中，outerWidth/outerHeight 返回页面视图容器的大小（单个标签页对应的浏览器窗口）

#### 8.1.5  导航和打开窗口

**1. 弹出窗口**

[MDN: window.open](https://developer.mozilla.org/zh-CN/docs/Web/API/Window/open)

`window.open(strUrl, strWindowName, [strWindowFeatures]);`：

+ `strUrl` 新窗口需要载入的url地址。strUrl可以是web上的html页面也可以是图片文件或者其他任何浏览器支持的文件格式。
+ `strWindowName` 新窗口的名称。该字符串可以用来作为超链接 <a> 或表单 <form> 元素的目标属性值。字符串中不能含有空白字符。注意：strWindowName 并不是新窗口的标题。
+ `strWindowFeatures` 可选参数。是一个字符串值，这个值列出了将要打开的窗口的一些特性(窗口功能和工具栏) 。 字符串中不能包含任何空白字符，特性之间用逗号分隔开。

|设置|值|说明|
|:--:|:--:|:--:|
|fullscreen|yes/no|浏览器窗口是否最大化。仅限IE|
|height|number|新窗口的高度。不能小于100|
|left|number|新窗口的左坐标。不能是负值|
|location|yes/no|浏览器窗口是否显示地址栏。不同浏览器的默认值不同。如果设置为no，地址栏可能会隐藏，也可能会被禁用|
|menubar|yes/no|是否在浏览器中显示菜单栏。默认为no|
|resizable|yes/no|是否可以通过拖动浏览器窗口的边框改变其大小。默认为no|
|scrollbars|yes/no|内容在视口中显示不下，是否运行滚动。默认为no|
|status|yes/no|是否在浏览器窗口中显示状态栏。默认为no|
|toolbar|yes/no|是否在浏览器窗口中显示工具栏。默认为no|
|top|number|新窗口的上坐标。不能是负值|
|top|number|新窗口的宽度。不能小于100|

```
var windowObjectReference = window.open('http://nodejh.com', 'height=400,width=400,top=100,left=0,resizable=yes');
// 调整大小
windowObjectReference.resizeTo(500, 500);
// 移动位置
windowObjectReference.moveTo(100, 100);
// 关闭窗口
windowObjectReference.close();

console.log(windowObjectReference.opener == window); // true
```

**2. 安全限制**

为了避免弹出窗口的恶意利用，有些浏览器在弹出窗口方面增加了限制。

**3. 弹出窗口屏蔽程序**

大多数浏览器都内置有弹出窗口屏蔽程序。

```
var blocked = false;
try {
  var wroxWin = window.open('http://www.rox.com', '_blank');
  if (wroxWin == null) {
    blocked = true;
  }
} catch (ex) {
  blocked = true;
}

if (blocked) {
  alert('The popup was blocked!');
}
```

### 8.1.6 间歇调用和超时调用

JavaScript 是单线程语言，但它可以在特定时刻执行执行代码。

**超时调用**

```
// 不建议传递字符串
// 性能不好
setTimeout('alert("Hello World")', 1000);

// 推荐的调用方式
var timeoutId = setTimeout(function() {
  alert('Hello World!');
}, 1000);

// 不是在 1000ms 执行代码
// 而是在等待 1000ms 将任务添加到队列中
// 如果队列为空
//     代码立即执行
// 如果队列不为空
//     代码在前面的队列任务完成后执行

// 取消尚未执行的超时调用
clearTimeout(timeoutId);
```

超时调用的代码是在全局作用域中执行的，因此函数中的 `this` ：

+ 在非严格模式下指向 `window` 对象
+ 在严格模式下指向 `undefined`

**间歇调用**

```
// 不建议传递字符串
// 性能不好
setInterval('alert("Hello World")', 1000);

// 推荐的调用方式
var intervalId = setInterval(function() {
  alert('Hello World!');
}, 1000);

// 取消间歇调用
clearInterval(intervalId);
```

**实例**

实现变量 num 每秒递增一次，当达到最大值时取消递增。

```
// 方法一
var num = 0;
var max = 10;

function incrementNumber() {
  num++;

  if (num == max) {
    clearInterval(intervalId);
    alert('Done');
  }
}

var intervalId = setInterval(incrementNumber, 1000);
```

```
// 方法二
var num = 0;
var max = 10;

function incrementNumber() {
  num++;

  if (num < 10) {
    setTimeout(incrementNumber, 1000);
  } else {
    alert('Done');
  }
}

setTimeout(incrementNumber, 1000);
```

可见，使用超时调用的时候，不需要跟踪超时 ID。所以使用超时调用模拟间歇调用是一种最佳模式。

### 8.1.7 系统对话框


|函数|返回值|
|:--:|:--:|
|alert('Info')|没有返回值|
|confirm('Info')|点击“确定”返回 true；点击取消返回 false|
|prompt('Info')|点击“确定”返回 ''/输入的字符串；点击取消返回 null|
|prompt('Info', 'default')|点击“确定”返回 ''/输入的字符串；点击取消返回 default|

`alert()` `confirm()` `prompt()` 都是同步和模态的，会中止代码的执行。

```
// 显示打印对话框
window.print();

// “查找”
//    找到返回 true；未找到返回 false
window.find('string');
```

> 书上写 window.find(); 显示查找对话框，但通过实践并不是这样。
> Chrome 55/Safari 10 是查找给定的字符串。
> Firefox 是显示“查找对话框”

## 8.2 location 对象

location 既是 window 对象的属性，也是 document 对象的属性；换句话说，window.location 和 document.location 引用的是同一个对象。

|属性名|例子|说明|
|:---:|:---:|:---:|
|hash|#contents|返回URL中的hash。如果URL不包含散列值，则返回''|
|host|www.wrox.com:80|返回服务器名称和端口号（如果有）|
|hostname|www.wrox.com|返回不带端口号的服务器名称|
|href|http://www.wrox.com/WileyCDA|返回当前页面的完整URL|
|pathname|/WileyCDA|返回URL中的文件或目录名|
|port|8080|返回URL中的端口。如果不包含端口则返回''|
|protocol|https:|返回使用的协议|
|search|?q=javascript|返回URL的查询字符串。以问号开头|

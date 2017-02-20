# 《JavaScript高级程序设计读书笔记》


## TODO

+ 8.1.4 窗口大小，书上讲得不够清楚


## ISSUE


### P72 [已解决]

主要是 JS 传递参数的方式。

[https://github.com/nodejh/nodejh.github.io/issues/32](https://github.com/nodejh/nodejh.github.io/issues/32)

```
function setName(obj) {
  obj.name = 'nodejh';
  obj = new Object();
  obj.name = 'jh';
}

var person = new Object();
setName(person);
alert(person.name); // nodejh
```

为什么是 nodejh？

```
function addTen(num) {
  num += 10;
  return num;
}

var count = 20;
var result = addTen(count);
alert(count); // 20, 没有变化
alert(result); // 30
```


## 知识点

#### 闭包

+ [js闭包,垃圾回收,内存泄漏](https://segmentfault.com/a/1190000004682028)

```
function f1() {
    var res = new Array();
    for(var i=0;i<10;i++){
        res[i] = function() {
            alert(i);
        };
    }
    return res;
}
var f2 = f1();
var f2 = f1();
f2[0]();//alert 10
//并不会返回一次弹出0-9的函数数组，而是弹出10个10的函数数组,因为res中每个函数的作用域中都保存着f1()的活动对象，引用的是同一个变量i，当f1()返回后i的值为10
```

```
function f1() {
    var res = new Array();
    for(var i=0;i<10;i++){
        res[i] = (function(num) {
            return function (){
                alert(num);
            }
        })(i);//函数参数按值传递
    }
    return res;
}
var f2 = f1();
var f2 = f1();
f2[0]();//alert 0

```

#### 内存回收

```
window.onload = function(){
    var ele = document.getElementById("id");
    ele.onclick = function(){
        alert(ele.id);
    }
}
```

循环引用。

```
ele.onclick = function(){
  alert(ele.id);
}
```


解决办法：

```
window.onload = function(){
    var ele = document.getElementById("id");
    var id = ele.id; //解除循环引用
    ele.onclick = function(){
        alert(id);
    }
    ele = null; // 将闭包引用的外部函数中活动对象清除
}
```

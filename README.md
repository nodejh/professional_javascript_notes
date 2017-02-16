# 《JavaScript高级程序设计读书笔记》


## TODO

+ 8.1.4 窗口大小，书上讲得不够清楚


## ISSUE


### P72

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

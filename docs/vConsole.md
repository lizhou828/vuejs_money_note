# VUE项目如何在移动端查看打印日志（console.log）
      
    在项目中发现，由于移动端无法看到打印的信息，所以很难进行调试，也不知道问题出在哪里，后来找到了一个好用的插件：vConsole。

## 1.安装
    npm install vconsole

## 2、在main.js中引入

    import Vconsole from 'vconsole';
    let vConsole = new Vconsole();
    export default vConsole
    
    （注意：正式上线之后就可以去掉这三行代码啦，不然产品投入使用还会带着这个小工具的。）


## 原文链接

    https://www.cnblogs.com/fanqiuzhuji/p/12697061.html

## Modal 
### 安装
```
yarn add @dengyongchao/modal

```

### 引入
```
import Modal from "@dengyongchao/modal";
import "@dengyongchao/modal/modal.css";
```

### 参数介绍
```
名称                类型                函数
open                boolean         是否打开对话框  默认： false
size                object          设置宽高 默认：{width: 520, height: 400}
drapHeader          boolean         是否支持拖动 默认：true
showHeader          boolean         是否显示标题 默认：true
showMask            boolean         是否显示遮罩 默认：true
close               func            支持关闭函数，内部调用
closeOnDcumentClick boolean         是否支持点击文档关闭 默认： false
closeOnEsc          boolean         是否支持Esc关闭  默认：true
footer              any             footer内容

```

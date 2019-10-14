## styled-components使用
如何定义一个有样式的组件
1. 基本使用
const HeaderWrapper = styled.div`
  /*样式代码*/
`;
2. 嵌入变量
import logoPic from '../../statics/logo.png';
export const Logo = styled.a`
  background: url(${logoPic});
`;
3. 为a标签添加属性
export const Logo = styled.a.attrs({
	href: "/"（根路径）
})`
	
`;	
4. 组件的className属性使用
使用：
```
import { NavItem } from "./style.js"; 
<NavItem className="left"></NavItem>
定义：
export const NavItem = styled.div`
	&.left {
	//&.left 表示当前div 的className为left 时的样式
		....
	}
	.sonLeft { //表示当前div下子元素中类名为 sonLeft 的元素的样式
		....
	}
`;	
```
5. 设置input 的placeholder 样式
```
export const Input = styled.input({
	placeholder: "搜索"
})`
	placeholder
`;
```
6. 
注意：border-sizing: border-box，表示元素的宽度以width+padding为准。
另外：现今 injectGlobal 的API 已经不能使用，换为 createGlobalStyle 代替，其用法：
```
export const GlobalStyle = styled.createGlobalStyle`
/*样式代码*/
`;
```
在 app.js 的入口文件中，将 GlobalStyle 作为一个组件引入
```
<GlobalStyle></GlobalStyle>
```
-----

## IconFont的使用
1 https://www.iconfont.cn/ 上选好要用的图标并下载，选择 .eot .svg .ttf .woff iconfont.css 的文件保留
2 在根目录的 static 文件下创建iconfont 文件夹，将上述的文件复制进去
3 iconfont.css 文件@font-face下对引入的 .eot .ttf .svg 文件的路径添加 ./ （当前路径）。
4 实现iconfont.css 的样式文件全局注入，使用 styled-components 的方法注入
```
import { styled } from "styled-componets";
export const GlobalIconFont = styled.createGlobalStyle`
	/*样式代码*/
`; 
```
5 引入图标
```
<i className="iconfont">unicode 码</i>
```
注意：react 中尽量不要直接操作dom，而是应该依据数据，数据引起dom改变。、
例子： input框的focus样式实现；
```
javascript
constructor(props) {
	super(props);
	this.state = {
		'focused': false
	};
}
render() {
	return (
		<div className="{this.state.focused ? 'focused' : '' }"></div>
	);
}
```
-----

## react 动画组件-react-transition-group
1. CSSTransition
将 CSSTransition 包裹在需要动画效果的组件外边，
```
<CSSTransition
	in={flag} //如果flag由false变为true，则动画入场，反之out出场
	timeout={200};延时200ms
	classNames="slide"; //自定义的class名
>
	/*需要添加动画的组件*/
</CSSTransition>
```
一旦动画入场，插件会自动为包裹住的标签添加很多css样式，所以我们需要给CSSTransition标签添加上classNames，
入场时： 添加 .slide-enter .slide-enter-active
出厂时： 添加 .slide-exit .slide-exit-active
2. TransitionGroup 如果需要为多个dom元素添加动画效果，需要使用 TransitionGroup
-----------------------------

## redux 的使用
1. 所有数据只要能存到redux 里边就使用redux 对其进行状态的管理，这对后期的维护性工作便利
2. 先创建 store 对象
3. 在App.js 中引入store，并使用 provider 将store 分享给 Provider 下所有的子组件
4. 子组件 使用 connect 建立与store 的连接
5. 中间件的使用，使 Chrome 的redux-extension 调试插件可以监视页面数据的变化
6. combineReducers 拆分reducer 的使用
	随着应用程序功能的增加，应该将每个组件的reducer拆分出去（分类管理），建议：
		common
		   |-----header
					|------index.js
					|------style.js
					|------store
							 |------reducer.js
		store
		  |-----index.js
		  |-----reducer.js
	其中header 下的reducer 只用管理header 下的状态：
		actionOfHeader + reducers = actionOfHeader_new;
	然后将 reducer 暴露给 combineReducers ，组装成整个reducers
        ```
		import { combineReducers } from 'redux';
		import headerReducer from './common/header/store/reducer';
		
		export default combineReducers({
			header: headerReducer,

		});
        ```
	注意：当使用 combineReducers 并传入 “header: headerReducer” redux 会自动将store 对象分级，即将与 header 有关的数据都被放在了 header 为键的对象下。
	另外：别名的使用： import { reducer as headerReducer } from './comon/header' 
7. actionType与constants actionCreator 的使用
	在 constants 中定义 action.type 的常量字符串并导出；
	在 actionCreator 中导出产生不同 action 的actionCreator 函数；
	由于 使用了 constants 来管理 actionType 对actionType 和actionCreator 进行了代码解耦；
	因此：header 下 store 的文件结构是：
		header
		   |-----index.js 导出所有外部文件用到的变量和方法（reducer、constants、actionCreators）
		   |-----reducer.js
		   reducer 函数定义的地方
		   |-----actionCreators.js
		    创建action对象的地方
		   |-----constants.js
		   存放整个 header 组件下所有的常量
------------------------

## immutable.js 的使用
问题：如果不适用 immutable.js 需要手动保证 state 不被修改，而使用 immutable.js 则会帮助开发者保证 state 是不被修改的。
1. 安装 immutable.js 库
2. 将state 转为一个 immutable 的对象
    ```
        import { fromJS } from "immutable";

        const defaultState = fromJS({
            ....
        });
        export default (state=defaultState, action) => {
            if (action.type === actionType.SEARCH_FOCUSED) {
                //immutable 的set 方法会结合之前的immutable对象的值，如果发生变化，则会返回一个新的对象
                return state.set(....);
            }
            ....
        }
    ```
3. 取数据 state.header.get("focused")。
    
4. redux-immutable 库的使用
    为了统一 state.header.get(...); 即将store 也当做一个immutable对象。
    需将根目录下组装 reducer 的combineReducers 方法替换为 redux-immutable库的combineReducers 方法；
    取数据变为：state.get('header').get('focused'),或者简写为：取深度过深的数据，state.getIn(['header', 'focused']);
----------------
## 组件按条件显示的实现
1. 函数返回值形式实现组件按条件显示
以搜索框的 下拉搜索（热门搜索）为例，热门搜索在搜索框获得焦点的时候才会显示，所以可以这么写：
```
    getSearchInfoArea = (show) => {
        if (show) {
            return (
                <searchInfo>
                    ...
                </searchInfo>
            );
        } else {
            return;
        }
    }

    ...
    render() {
        return (
            ...
                getSearchInfoArea(props.focused);
            ...
        );

    }
```
--------------

## redux-thunk 的异步分发action
1. redux-thunk 提供了 thunk 的中间件，它可以建立 异步action 与store 的连接
    ```
        import thunk from "redux-thunk";
        import {applyMiddleWare} from "redux";

        export const store = 
    ```
2. redux-thunk 允许 dispatch 一个函数，这个函数接受 dispatch 这个方法作为参数。
    ```
    export const function getHotList = () => {
        return (dispatch) => {
            //异步操作
        };
    ```
3. 使用 axios 的第三方 ajax 模块
4. 使用假数据测试 ajax 模块的功能
    create-react-app 的底层也是使用node 实现的，可以在 public 目录创建 api 假数据，当请求 api 数据的时候，先在工程目录文件看是否有相应的路由，如果有就去相应的路由界面，如果没有，就回去public目录下的api目录下找相应的文件，通过这个特性，我们可以在 api 下放一些假数据，在软件上线后与后端联调时，删除pubic 目录下的api文件夹，这样软件会自动向真实的 api 接口索取数据。
    因此，public 目录，
        public
          |-----api
                 |------headerList.json
                 |------otherList.json
                 ....
          |-----index.html
          |-----manifest.json
5. immutable 下接受ajax 传递过来的数据时注意转化 js -> immutable对象
由于从后端传递过来的数据是json数据，转化为原生的js 对象，如果直接将这个获取的js对象使用set方法保存在 store 对象（immutable类型）上，就会出现错误。因此在创建 action 时，应事先将action 的data 用fromJS 转化为 immutable 下的对象。
--------

## 代码优化
1. 使用 es6 结构赋值
2. switch case
------------

## 换一批
1. pageNum 与 totalPageNum使用
    关键：每次点击“换一批”时，都是切换当前的页码，从1到Math.ceil(list.length/pageSize)再回到1以此循环。因此，需要给 header 下的state 添加 pageNum和totalPageNum的状态。
    header 组件下，获取当前页码pageNum和list，然后由pageSize和pageNum获取当前应该显示的条目索引范围，进而获取应该显示的条目。
2. 问题：指定索引范围条目显示问题。
    应该显示的条目保存在一个 const 类型的数组中，而要在 immutable 对象下，获取指定索引范围的条目，视频上通过 toJS 方法将 list 转为一个 普通js对象，在再通过普通数组截取slice方法。
3. 点击“换一批”时，因为也是在 input 外点击，会使input 丧失焦点，下拉的热门搜索条目都会消失，从而“换一批”的点击效果不会被触发。
 解决：为下拉的热门搜索条目添加 mouseIn 和 mouseOut 的事件处理。
4. 关于：点击“换一批”时，事件处理。
   处理：由当前页码和总页数推算出下一次点击“下一批”时的页码
5. 问题：有的时候需要一次性改变 immutable 对象下多个内容，那么需要链式调用 set 方法，这样不利于性能提升。
   解决：immutable对象的 merge 方法可以同时设置多个数据内容
6. 问题：当初始化页面时，list 是空数组，那么对应的 for 循环会出错
   解决：if(list.length)
7. 换一批上 spin 图标的动画效果。
   (1)非数字的正则表达式 /[^0-9]/ig
   (2)ref 的使用：ref={(spin) => {this.spinIcon = spin;}}
      ref 可以让我们获取组件真实的dom节点，首先获取spin节点对象，然后将spin挂载在this上
8. 问题：避免没必要的ajax 请求
   解决：将从state中获取的list传递给 inputFocusHandler 处理函数，这样就可以根据list长度控制是否发送ajax请求。
9. 鼠标放在换一批上会出现手型，cursor: pointer; 

-------------
## 实际操作出现的问题：
1.关于 如何调整background-image 的大小：https://www.w3school.com.cn/cssref/pr_background-size.asp
background-size: contain; //背景图片锁在内部延伸（可以布铺满元素），直至宽或者高与元素宽或者高相同。
background-size: cover; //背景图片全部铺满整个元素，直至宽或者高与元素宽或者高相同。

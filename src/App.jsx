/* eslint-disable react/display-name */
// import { Routes, Route } from "react-router-dom";
// import MainLayout from "./components/MainLayout";
// import Mine from "./pages/Home";
// import Follow from "./pages/Follow";
// import Square from "./pages/Square";
// import Personal from "./pages/Personal";
// import MyTimeline from "./pages/Home/MyTimeline";
// import MyThoughts from "./pages/Home/MyThoughts";
// import TodoList from "./pages/Home";
// import FollowTimeline from "./pages/Follow/FollowTimeline";
// import FollowThoughts from "./pages/Follow/FollowThoughts";
// import SquareTimeline from "./pages/Square/SquareTimeline";
// import SquareThoughts from "./pages/Square/SquareTimeline";
// import TimelineDetail from "./components/Timeline/TimelineDetail";
// import "./App.scss";

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/" element={<MainLayout />}>
//           <Route path="/" element={<Mine />}>
//             <Route path="timeline" element={<MyTimeline />} />
//             <Route path="thoughts" element={<MyThoughts />} />
//             <Route path="todos" element={<TodoList />} />
//           </Route>
//           <Route path="/follow" element={<Follow />}>
//             <Route path="timeline" element={<FollowTimeline />} />
//             <Route path="thoughts" element={<FollowThoughts />} />
//           </Route>
//           <Route path="/square" element={<Square />}>
//             <Route path="timeline" element={<SquareTimeline />} />
//             <Route path="thoughts" element={<SquareThoughts />} />
//           </Route>
//           <Route path="/personal" element={<Personal />} />
//         </Route>
//         <Route path="/timelineDetail/:id" element={<TimelineDetail />} />
//       </Routes>
//     </>
//   );
// }

// import { useEffect, useState } from "react";

// const ConCounter = () => {
//   // 使用 React 的 state 来存储 Redux 的状态
//   const [count, setCount] = useState(store.getState().count);

//   // 在组件挂载时订阅 Redux store 的变化
//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       // 当 Redux store 的状态发生变化时，更新组件的状态
//       setCount(store.getState().count);
//     });

//     // 在组件卸载时取消订阅
//     return () => {
//       unsubscribe();
//     };
//   }, []);

//   // 定义 dispatch 函数
//   const increment = () => {
//     store.dispatch({ type: "INCREMENT" });
//   };

//   const decrement = () => {
//     store.dispatch({ type: "DECREMENT" });
//   };

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//     </div>
//   );
// };

import { Provider } from "../my_library/react-redux/provider";
import store from "../my_library/react-redux/store";
import { connect } from "../my_library/react-redux/connect.jsx";
// import {
//   useSelector,
//   useDispatch,
// } from "../my_library/react-redux/connect.jsx";

// const ConCounter = () => {
//   // 使用 useSelector 获取 count 状态
//   const count = useSelector((state) => state.count);

//   // 使用 useDispatch 获取 dispatch 方法
//   const dispatch = useDispatch();

//   return (
//     <div>
//       <h1>Count: {count}</h1>
//       <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
//       <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
//     </div>
//   );
// };
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  memo,
  useCallback,
} from "react";

// const Counter = () => {
// 1. 以下为connect例子
// const { count, increment, decrement } = props;
// return (
//   <div>
//     <h1>Count: {count}</h1>
//     <button onClick={increment}>Increment</button>
//     <button onClick={decrement}>Decrement</button>
//   </div>
// 2. 以下为useEffect例子
// const [positions, setPositions] = useState({ x: 0, y: 0 });
// const refState = useRef(0);
// useEffect(() => {
//   const updateMouse = (e) => {
//     console.log(refState.current);
//     refState.current++;
//     setPositions({ x: e.clientX, y: e.clientY });
//   };
//   document.addEventListener("click", updateMouse); //  添加绑定方法事件(要修改依赖，绑定到依赖上)
//   return () => {
//     //  在每次执行useEffect之前都会执行上一次return中内容
//     document.removeEventListener("click", updateMouse);
//     // //  移除绑定方法事件(要修改依赖，绑定到依赖上)
//     console.log("销毁");
//   };
// });
// return (
//   <div>
//     <h1>Count: {count}</h1>
//     <button onClick={increment}>Increment</button>
//     <button onClick={decrement}>Decrement</button>
//     <div>
//       <p>x:{positions.x}</p>
//       <p>y:{positions.y}</p>
//     </div>
//   </div>
// );
/** 每次重新渲染都会生成新的effect，替换掉之前的，确保effect中获取的值是最新的，不用担心过期。
 * 如下，设置的3000毫秒内连续点击三次，那么将会一共打印4次，分别是0、1、2、3.
 * 0是第一次渲染结束之后自动触发的，剩下1、2、3则是点击三次每次触发时的count值
 */
// const [count, setCount] = useState(0);

// useEffect(() => {
//   setTimeout(() => {
//     console.log(`${count}`);
//   }, 3000);
// });

// return (
//   <div>
//     <p>你点击了{count}次</p>
//     <button onClick={() => setCount(count + 1)}>点击我</button>
//   </div>
// );
// }

/**
 * 类组件共用一个num，打印4、4、4、4
 */
// class Counter extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       num: 0,
//     };
//   }

//   componentDidMount() {
//     setTimeout(() => {
//       console.log(this.state.num);
//     }, 3000);
//   }

//   componentDidUpdate() {
//     setTimeout(() => {
//       console.log(this.state.num);
//     }, 3000);
//   }

//   render() {
//     return <div onClick={this.setNum}>这是一个类组件————{this.state.num}</div>;
//   }

//   setNum = () => {
//     this.setState({
//       num: this.state.num + 1,
//     });
//   };
// }

// 3.useMemo例子
//   const [num, setNum] = useState(1);
//   const [age, setAge] = useState(18);
//   const getDoubleNum = useMemo(() => {
//     console.log(`获取双倍Num${num}`);
//     return 2 * num; //	假设为复杂计算逻辑
//   }, [num]);
//   console.log("age更新");
//   return (
//     <div
//       onClick={() => {
//         setAge((age) => age + 1);
//       }}
//     >
//       <br></br>
//       {/* 得到的是一个返回值getDoubleNum */}
//       这是一个函数式组件————{getDoubleNum}
//       <br></br>
//       age的值为————{age}
//       <br></br>
//     </div>
//   );
//

// useMemo优化子组件重复渲染
// const Child = memo(({ info }) => {
//   console.log("我是子组件", info);
//   return <p>我是子组件</p>;
// });
// function Counter() {
//   const [show, setShow] = useState(true);
//   // const info = "info";
//   // 这样每次渲染得到的info就是同一个,不然每次会重新生成对象，地址不同
//   const info = useMemo(() => {
//     return {
//       name: "Even",
//       age: 22,
//     };
//   }, []);
//   return (
//     <div>
//       <Child info={info} />
//       <button onClick={() => setShow(!show)}>点击更新状态</button>
//     </div>
//   );
// }

// 4.useCallback
// 复杂计算逻辑的场景不适合使用useCallback来缓存，因为传入的函数内容会不断执行。
// useMemo(() => Fn,deps)相当于useCallback(Fn,deps)
// 在子组件不需要父组件的值和函数的情况下，只需要使用memo函数包裹子组件即可
// 如果有函数传递给子组件，使用useCallback
// 缓存一个组件内的复杂计算逻辑需要返回值时，使用useMemo
// const set = new Set();
// function Counter() {
//   const [num, setNum] = useState(1);
//   const [age, setAge] = useState(18);

//   // useMemo缓存值
//   // const getDoubleNum = useMemo(
//   //   () => () => {
//   //     console.log(`获取双倍Num${num}`);
//   //     return 2 * num; //	①假设为复杂计算逻辑
//   //   },
//   //   []
//   // );

//   // useCallback缓存函数;
//   const getDoubleNum = useCallback(() => {
//     console.log(`获取双倍Num${num}`);
//     return 2 * num; //	②假设为复杂计算逻辑
//   }, []);

//   // const getDoubleNum = useCallback(() => {
//   //   console.log(`获取双倍Num${num}`);
//   //   return 2 * num; //	②假设为复杂计算逻辑
//   // }, []);

//   set.add(getDoubleNum()); //	③注意set打印的长度变化（设置Callback的依赖为[]、[num]进行对比）
//   console.log("set.size：", set.size);

//   return (
//     <div
//       onClick={() => {
//         setNum((num) => num + 1);
//       }}
//     >
//       <br></br>
//       {/* // ①useMemo情况下 */}
//       这是一个函数式组件————num：{getDoubleNum}
//       {/* //②useCallback情况下 */}
//       {/* 这是一个函数式组件————num：{getDoubleNum()} */}
//       <br></br>
//       age的值为————{age}
//       <br></br>
//     </div>
//   );
// }

// // 5.useRef
// // 重新赋值ref.current不会主动触发页面重新渲染
// const Counter = () => {
//   const [num, setNum] = useState(0);

//   let a = useRef();
//   const timer = useRef();
//   // let timer;
//   useEffect(() => {
//     a.current = "1";
//     timer.current = setInterval(() => {
//       setNum((num) => num + 1);
//     }, 400);
//   }, []);

//   // 不用ref会是undefined，因为每次useEffect是在渲染完成后执行，外部取不到所赋的值，下一次渲染赋值又被清除掉了，还是拿不到
//   console.log("a", a);
//   useEffect(() => {
//     if (num > 10) {
//       console.log("大于10了，清除定时器");
//       console.log("timer：", timer);
//       //  不用ref时，获取不到timer
//       // clearTimeout(timer);

//       clearTimeout(timer.current);
//     }
//   }, [num]);

//   return <div>这是一个函数式组件————num:{num}</div>;
// };

// 6.useContetx
// 需要引入useContetx，createContext两个内容
// 通过createContext创建一个context句柄
// Context.Provider来确定数据共享范围
// //上层组件
// const Context = createContext(null);
// // 下层组件
// const num = useContext(Context);

// 将 state 和 dispatch 映射到组件的 props
const mapStateToProps = (state) => ({
  count: state.count,
});

// const mapDispatchToProps = (dispatch) => ({
//   increment: () => dispatch({ type: "INCREMENT" }),
//   decrement: () => dispatch({ type: "DECREMENT" }),
// });

const mapDispatchToProps = {
  increment: () => ({ type: "INCREMENT" }),
  decrement: () => ({ type: "DECREMENT" }),
};

const ConCounter = connect(mapStateToProps, mapDispatchToProps)(Counter);

const App = () => {
  return (
    <Provider store={store}>
      <ConCounter />
    </Provider>
  );
};

export default App;

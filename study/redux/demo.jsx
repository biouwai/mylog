import { useEffect, useState } from "react";
import { createStore } from "./index";

const initState = {
  count: 100,
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "INCREMENT":
      return {
        ...state,
        count: state.count++,
      };
    case "DECREMENT":
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

export const Counter = () => {
  // 使用 React 的 state 来存储 Redux 的状态
  const [count, setCount] = useState(store.getState().count);

  // 在组件挂载时订阅 Redux store 的变化
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      // 当 Redux store 的状态发生变化时，更新组件的状态
      setCount(store.getState().count);
    });

    // 在组件卸载时取消订阅
    return () => {
      unsubscribe();
    };
  }, []);

  // 定义 dispatch 函数
  const increment = () => {
    store.dispatch({ type: "INCREMENT" });
  };

  const decrement = () => {
    store.dispatch({ type: "DECREMENT" });
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};

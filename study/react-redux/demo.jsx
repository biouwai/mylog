import { Provider } from "./provider";
import store from "./store";
import { connect } from "./connect";
import { useSelector, useDispatch } from "./connect";

const Counter = () => {
  // 使用 useSelector 获取 count 状态
  const count = useSelector((state) => state.count);

  // 使用 useDispatch 获取 dispatch 方法
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
};

const Counter2 = () => {
  // 使用 useSelector 获取 count 状态
  const count = useSelector((state) => state.count);

  // 使用 useDispatch 获取 dispatch 方法
  const dispatch = useDispatch();

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={() => dispatch({ type: "INCREMENT" })}>Increment</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>Decrement</button>
    </div>
  );
};
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

const ConCounter = connect(mapStateToProps, mapDispatchToProps)(Counter2);

export const ReactRedux = (
  <div>
    <Provider store={store}>
      <Counter />
      <ConCounter />
    </Provider>
  </div>
);

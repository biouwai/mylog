import { useEffect, useState } from "react";
import { useStore } from "./provider";
import { bindActionCreators } from "redux";

// useSelector Hook
export const useSelector = (selector) => {
  const store = useStore();
  const [state, setState] = useState(selector(store.getState()));

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      setState(selector(store.getState()));
    });

    return () => {
      unsubscribe();
    };
  }, [store, selector]);

  return state;
};

// useDispatch Hook
export const useDispatch = () => {
  const store = useStore();
  return store.dispatch;
};

// connect 函数
export const connect =
  (mapStateToProps, mapDispatchToProps) => (WrappedComponent) => {
    const ConnectedComponent = (props) => {
      const store = useStore();
      const [state, setState] = useState(store.getState());

      // 订阅 store 的变化
      useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          setState(store.getState());
        });

        // 清理订阅
        return () => {
          unsubscribe();
        };
      }, [store]);

      // 将 state 映射到 props
      const stateProps = mapStateToProps ? mapStateToProps(state) : {};

      // 类似bindActionCreators
      const bindAction = (actions) => {
        const boundAction = {};
        for (const key in actions) {
          boundAction[key] = (...args) => store.dispatch(actions[key](...args));
        }
        return boundAction;
      };
      // 将 dispatch 映射到 props
      const dispatchProps = mapDispatchToProps
        ? typeof mapDispatchToProps === "function"
          ? mapDispatchToProps(store.dispatch)
          : bindAction(mapDispatchToProps) // bindActionCreators(mapDispatchToProps)
        : {};

      return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />;
    };
    return ConnectedComponent;
  };

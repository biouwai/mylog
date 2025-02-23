/** redux原理 */
export const createStore = (reducer) => {
  let currentState;
  currentState = reducer(currentState, { type: "init" });
  const listenerList = [];

  const getState = () => {
    return currentState;
  };

  const dispatch = (action) => {
    // 调用reducer更新state
    currentState = reducer(currentState, action);
    // 调用listener
    listenerList.forEach((listener) => {
      listener();
    });
  };

  const subscribe = (listener) => {
    listenerList.push(listener);

    return function unsubscribe() {
      const index = listenerList.indexOf(listener);
      listenerList.splice(index, 1);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

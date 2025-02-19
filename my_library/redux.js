export const createStore = (reducer) => {
  let currentState;
  currentState = reducer(currentState, { type: "init" });
  const lisenterList = [];

  const getState = () => {
    return currentState;
  };

  const dispatch = (action) => {
    // 调用reducer更新state
    currentState = reducer(currentState, action);
    // 调用lisenter
    lisenterList.forEach((lisenter) => {
      lisenter();
    });
  };

  const subscribe = (listenter) => {
    lisenterList.push(listenter);

    return function unsubscribe() {
      const index = lisenterList.indexOf(listenter);
      lisenterList.splice(index, 1);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

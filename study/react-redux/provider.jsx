import { createContext, useContext } from "react";

// 创建一个 Context 对象
const StoreContext = createContext();

// Provider 组件
export const Provider = ({ store, children }) => {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
};

// 自定义 Hook，方便在组件中获取 store
export const useStore = () => {
  return useContext(StoreContext);
};

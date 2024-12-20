import { useState } from "react";
import { TabBar } from "antd-mobile";
import { Link } from "react-router-dom";
import {
  TravelOutline,
  UserCircleOutline,
  UserOutline,
  UserSetOutline,
} from "antd-mobile-icons";
import "./index.scss";

const MainTabs = () => {
  // 下列key值对应路由，需对照着修改
  const tabs = [
    {
      key: "",
      title: "我的",
      icon: <UserOutline />,
    },
    {
      key: "follow",
      title: "关注",
      icon: <UserCircleOutline />,
    },
    {
      key: "square",
      title: "广场",
      icon: <TravelOutline />,
    },
    {
      key: "personal",
      title: "设置",
      icon: <UserSetOutline />,
    },
  ];

  const [activeKey, setActiveKey] = useState("");

  return (
    <div className="main-tabs">
      <TabBar activeKey={activeKey} onChange={setActiveKey}>
        {tabs.map((item) => (
          <TabBar.Item
            key={item.key}
            icon={<Link to={`/${item.key}`}>{item.icon}</Link>}
            title={<Link to={`/${item.key}`}>{item.title}</Link>}
          />
        ))}
      </TabBar>
    </div>
  );
};

export default MainTabs;

import { Tabs } from "antd-mobile";

const TopTabs = () => {
  return (
    <>
      <Tabs>
        <Tabs.Tab title="时间轴" key="timeline">
          时间轴
        </Tabs.Tab>
        <Tabs.Tab title="随想录" key="thoughts">
          随想录
        </Tabs.Tab>
        <Tabs.Tab title="待办" key="todos">
          待办
        </Tabs.Tab>
      </Tabs>
    </>
  );
};

export default TopTabs;

import { Tabs } from "antd-mobile";
import Timeline from "../../components/Timeline";
import Thoughts from "../../components/Thoughts";
import TodoList from "./TodoList";

const mock = [
  {
    id: 1,
    title: "前端",
    description: "一段说明",
    body: [
      {
        content: "今天表现不错",
        dateTime: "2024-12-20",
      },
      {
        content: "今天开始学node,加油",
        dateTime: "2024-12-1",
      },
      {
        content: "今天开始学前端了",
        dateTime: "2024-3-1",
      },
    ],
  },
  {
    id: 2,
    title: "毕设",
    description: "一段说明",
    body: [
      {
        content: "今天表现不错",
        dateTime: "2024-12-20",
      },
      {
        content: "今天开始学SVD,加油",
        dateTime: "2024-12-1",
      },
      {
        content: "今天开始搞毕设了",
        dateTime: "2024-3-1",
      },
    ],
  },
];

const Follow = () => {
  return (
    <div>
      <Tabs>
        <Tabs.Tab title="时间轴" key="timeline">
          <Timeline timelineData={mock} />
        </Tabs.Tab>
        <Tabs.Tab title="随想录" key="thoughts">
          <Thoughts />
        </Tabs.Tab>
        <Tabs.Tab title="待办" key="todos">
          <TodoList />
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};

export default Follow;

import { List } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";

const Timeline = ({ timelineData }) => {
  return (
    <>
      <List>
        {timelineData.map((item) => {
          <List.Item
            key={item.id}
            prefix={<UnorderedListOutline />}
            onClick={() => {}}
          >
            账单
          </List.Item>;
        })}
      </List>
    </>
  );
};

export default Timeline;

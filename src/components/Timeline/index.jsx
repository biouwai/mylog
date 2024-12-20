/* eslint-disable react/prop-types */
import { List } from "antd-mobile";
import { UnorderedListOutline } from "antd-mobile-icons";
import { useNavigate } from "react-router-dom";

const Timeline = ({ timelineData }) => {
  const navgate = useNavigate();

  const viewDetail = (id) => {
    navgate(`/timelineDetail/${id}`);
  };

  return (
    <>
      <List>
        {timelineData.map((item) => {
          return (
            <List.Item
              key={item.id}
              prefix={<UnorderedListOutline />}
              onClick={() => viewDetail(item.id)}
            >
              {item.title}
            </List.Item>
          );
        })}
      </List>
    </>
  );
};

export default Timeline;

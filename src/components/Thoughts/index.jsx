const data = [
  {
    title: "标题是否要有",
    content:
      "在随想录里是否要有标题呢，我觉得大多没有，但如果内容太多，标题也可以起到归纳作用",
    picture: "url",
    author: "比欧外",
    avatar: "头像",
    dateTime: "2024-12-23",
  },
  {
    title: "标题是否要有",
    content:
      "在随想录里是否要有标题呢，我觉得大多没有，但如果内容太多，标题也可以起到归纳作用",
    picture: "url",
    author: "比欧外",
    avatar: "头像",
    dateTime: "2024-12-23",
  },
  {
    content:
      "在随想录里是否要有标题呢，我觉得大多没有，但如果内容太多，标题也可以起到归纳作用",
    picture: "url",
    author: "比欧外",
    avatar: "头像",
    dateTime: "2024-12-23",
  },
  {
    content:
      "在随想录里是否要有标题呢，我觉得大多没有，但如果内容太多，标题也可以起到归纳作用",
    picture: "url",
    author: "比欧外",
    avatar: "头像",
    dateTime: "2024-12-23",
  },
  {
    content:
      "在随想录里是否要有标题呢，我觉得大多没有，但如果内容太多，标题也可以起到归纳作用",
    picture: "url",
    author: "比欧外",
    avatar: "头像",
    dateTime: "2024-12-23",
  },
];

import "./index.scss";
const Thoughts = () => {
  return (
    <div className="thoughts">
      {data.map((item) => (
        <div key={item.id} className="thoughts-item">
          <div className="thoughts-item-user">
            <div className="thoughts-item-user-author">{item.author}</div>
            <img src={item.avatar} className="thoughts-item-user-avatar" />
            <div className="thoughts-item-main-dateTime">{item.dateTime}</div>
          </div>
          <div className="thoughts-item-main">
            {item.title && (
              <div className="thoughts-item-main-title">{item.title}</div>
            )}
            <div className="thoughts-item-main-content">{item.content}</div>
            <img src={item.picture} className="thoughts-item-main-picture" />
          </div>
        </div>
      ))}
    </div>
  );
};
export default Thoughts;

import "./TimelineDetail.scss";
const mock = {
  title: "毕设",
  description: "一段说明",
  body: [
    {
      id: 1,
      content: "今天表现不错",
      dateTime: "2024-12-20",
    },
    {
      id: 2,
      content: "今天开始学SVD,加油",
      dateTime: "2024-12-1",
    },
    {
      id: 3,
      content: "今天开始搞毕设了",
      dateTime: "2024-3-1",
    },
    {
      id: 1,
      content: "今天表现不错",
      dateTime: "2024-12-20",
    },
    {
      id: 2,
      content: "今天开始学SVD,加油",
      dateTime: "2024-12-1",
    },
    {
      id: 3,
      content:
        "从我实习的低效工作中，应该学到，不要一直在一个错误中钻，到发现一条路走不通时，及时放弃，思考另一条通路（注意是思考寻找另一条通路，而不是盲目去其他地方钻）",
      dateTime: "2024-3-1",
    },
    {
      id: 1,
      content:
        "从我实习的低效工作中，应该学到，不要一直在一个错误中钻，到发现一条路走不通时，及时放弃，思考另一条通路（注意是思考寻找另一条通路，而不是盲目去其他地方钻）",
      dateTime: "2024-12-20",
    },
    {
      id: 2,
      content: "今天开始学SVD,加油",
      dateTime: "2024-12-1",
    },
    {
      id: 3,
      content:
        "从我实习的低效工作中，应该学到，不要一直在一个错误中钻，到发现一条路走不通时，及时放弃，思考另一条通路（注意是思考寻找另一条通路，而不是盲目去其他地方钻）",
      dateTime: "2024-3-1",
    },
  ],
};

const TimelineDeatil = () => {
  //   const { id } = useParams();
  return (
    <div className="timeline-detail">
      <h1 className="timeline-detail-title">{mock.title}</h1>
      <div className="timeline-detail-desciption">{mock.description}</div>
      {mock.body.map((item) => (
        <div key={item.id} className="timeline-detail-body">
          <div className="timeline-detail-body-content">{item.content}</div>
          <div className="timeline-detail-body-dateTime">{item.dateTime}</div>
        </div>
      ))}
    </div>
  );
};
export default TimelineDeatil;

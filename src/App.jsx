import MainTabs from "./components/MainTabs";
import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Mine from "./pages/Mine";
import Follow from "./pages/Follow";
import Square from "./pages/Square";
import Personal from "./pages/Personal";
import MyTimeline from "./pages/Mine/MyTimeline";
import MyThoughts from "./pages/Mine/MyThoughts";
import FollowTimeline from "./pages/Follow/FollowTimeline";
import FollowThoughts from "./pages/Follow/FollowThoughts";
import SquareTimeline from "./pages/Square/SquareTimeline";
import SquareThoughts from "./pages/Square/SquareTimeline";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Mine />}>
          <Route path="timeline" element={<MyTimeline />} />
          <Route path="thoughts" element={<MyThoughts />} />
        </Route>
        <Route path="/follow" element={<Follow />}>
          <Route path="timeline" element={<FollowTimeline />} />
          <Route path="thoughts" element={<FollowThoughts />} />
        </Route>
        <Route path="/square" element={<Square />}>
          <Route path="timeline" element={<SquareTimeline />} />
          <Route path="thoughts" element={<SquareThoughts />} />
        </Route>
        <Route path="/personal" element={<Personal />}></Route>
      </Routes>
      <div className="main-tabs">
        <MainTabs />
      </div>
    </>
  );
}

export default App;

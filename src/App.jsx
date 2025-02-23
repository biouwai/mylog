/* eslint-disable react/display-name */
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/MainLayout";
import Mine from "./pages/Home";
import Follow from "./pages/Follow";
import Square from "./pages/Square";
import Personal from "./pages/Personal";
import MyTimeline from "./pages/Home/MyTimeline";
import MyThoughts from "./pages/Home/MyThoughts";
import TodoList from "./pages/Home";
import FollowTimeline from "./pages/Follow/FollowTimeline";
import FollowThoughts from "./pages/Follow/FollowThoughts";
import SquareTimeline from "./pages/Square/SquareTimeline";
import SquareThoughts from "./pages/Square/SquareTimeline";
import TimelineDetail from "./components/Timeline/TimelineDetail";
import "./App.scss";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Mine />}>
            <Route path="timeline" element={<MyTimeline />} />
            <Route path="thoughts" element={<MyThoughts />} />
            <Route path="todos" element={<TodoList />} />
          </Route>
          <Route path="/follow" element={<Follow />}>
            <Route path="timeline" element={<FollowTimeline />} />
            <Route path="thoughts" element={<FollowThoughts />} />
          </Route>
          <Route path="/square" element={<Square />}>
            <Route path="timeline" element={<SquareTimeline />} />
            <Route path="thoughts" element={<SquareThoughts />} />
          </Route>
          <Route path="/personal" element={<Personal />} />
        </Route>
        <Route path="/timelineDetail/:id" element={<TimelineDetail />} />
      </Routes>
    </>
  );
}

export default App;

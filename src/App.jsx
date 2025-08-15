// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Landing from "./pages/Landing";
// import CreateGame from "./pages/CreateGame";
// import Rewards from "./pages/Rewards";
// import Publish from "./pages/Publish";
// import SpinGame from "./pages/SpinGame";
// import NotFound from "./pages/NotFound";
// function App() {
//     const [count, setCount] = useState(0);
//
//     return (
//         <>
//
//
//             export default function App() {
//                        return (
//                        <Router>
//                        <Routes>
//                        <Route path="/" element={<Landing />} />
//     <Route path="/create-game" element={<CreateGame />} />
//     <Route path="/rewards" element={<Rewards />} />
//     <Route path="/publish" element={<Publish />} />
//     <Route path="/spin-game" element={<SpinGame />} />
//     <Route path="*" element={<NotFound />} />
// </Routes>
// </Router>
// );
// }
//
// </>
//     );
// }
//
// export default App;


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import CreateGame from "./pages/CreateGame.jsx";
import Rewards from "./pages/Rewards";
import Publish from "./pages/Publish";
import SpinGame from "./pages/SpinGame";
import NotFound from "./pages/NotFound";

export default function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/create-game" element={<CreateGame />} />
                <Route path="/rewards" element={<Rewards />} />
                <Route path="/publish" element={<Publish />} />
                <Route path="/spin-game" element={<SpinGame />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
}

import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Repo from "./pages/Repo";

function App() {


    return (
        <main className=" min-w-screen">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path=":owner/:repoName/:branch" element={<Repo />} />
            </Routes>
        </main>
    );
}

export default App;

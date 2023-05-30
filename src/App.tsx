import { Route, Routes } from "react-router-dom";

function App() {


    return (
        <div>
            <Routes>
                <Route path="/dashboard" element={<div><h1>Hello</h1></div>} />
            </Routes>

        </div>
    );
}

export default App;

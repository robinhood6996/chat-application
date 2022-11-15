import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useAuthCheck } from "./hooks/useAuthCheck";
import Conversation from "./pages/Conversation";
import Inbox from "./pages/Inbox";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
    const authChecked = useAuthCheck();
    return !authChecked ? <div>Loading...</div> :<Router>
    <Routes>
        <Route path="/" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="/inbox" element={<PrivateRoute><Conversation /></PrivateRoute>} />
        <Route path="/inbox/:id" element={<PrivateRoute><Inbox /></PrivateRoute>} />
    </Routes>
</Router>
}

export default App;

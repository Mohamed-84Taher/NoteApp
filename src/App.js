import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import { ConfirmProvider } from "material-ui-confirm";
function App() {
  return (
    <Router>
      <ConfirmProvider>
        <Routes>
          <Route path='/notes' element={<Notes />} />
          <Route path='/create' element={<CreateNote />} />
        </Routes>
      </ConfirmProvider>
    </Router>
  );
}

export default App;

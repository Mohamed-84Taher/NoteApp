import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./pages/Notes";
import CreateNote from "./pages/CreateNote";
import { ConfirmProvider } from "material-ui-confirm";
import Layout from "./components/Layout";
function App() {
  return (
    <Router>
      <ConfirmProvider>
        <Layout>
          <Routes>
            <Route path='/' element={<Notes />} />
            <Route path='/create' element={<CreateNote />} />
          </Routes>
        </Layout>
      </ConfirmProvider>
    </Router>
  );
}

export default App;

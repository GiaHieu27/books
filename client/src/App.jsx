import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Books from './pages';
import Add from './pages/Add';
import Update from './pages/Update';
import './style.scss';

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Books />} />
          <Route path="/add" element={<Add />} />
          <Route path="/update/:id" element={<Update />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

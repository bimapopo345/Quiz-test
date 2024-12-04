import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { quizData } from './data/questions';
import HomePage from './components/HomePage';
import QuizSection from './components/QuizSection';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage sections={quizData} />} />
        <Route path="/section/:sectionIndex" element={<QuizSection quizData={quizData} />} />
      </Routes>
    </Router>
  );
}

export default App;
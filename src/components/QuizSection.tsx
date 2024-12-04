import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { QuizSection as QuizSectionType } from '../types';
import QuizCard from './QuizCard';
import QuizResult from './QuizResult';
import { ArrowLeft } from 'lucide-react';

interface QuizSectionProps {
  quizData: QuizSectionType[];
}

export default function QuizSection({ quizData }: QuizSectionProps) {
  const { sectionIndex } = useParams();
  const navigate = useNavigate();
  const section = quizData[Number(sectionIndex)];
  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);

  if (!section) {
    navigate('/');
    return null;
  }

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);

    if (answer === section.questions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswers(prev => prev + 1);
    }

    setTimeout(() => {
      if (currentQuestionIndex < section.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowFeedback(false);
      } else {
        setQuizComplete(true);
      }
    }, 1500);
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setQuizComplete(false);
  };

  const handleBack = () => {
    navigate('/');
  };

  if (quizComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <QuizResult
          correctAnswers={correctAnswers}
          totalQuestions={section.questions.length}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto w-full">
        <button
          onClick={handleBack}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Kembali
        </button>

        <div className="w-full mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{section.title}</h1>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold">
              Pertanyaan {currentQuestionIndex + 1} dari {section.questions.length}
            </span>
            <span className="text-lg font-semibold">
              Skor: {correctAnswers}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all"
              style={{ width: `${((currentQuestionIndex + 1) / section.questions.length) * 100}%` }}
            />
          </div>
        </div>

        <QuizCard
          question={section.questions[currentQuestionIndex]}
          onAnswer={handleAnswer}
          showFeedback={showFeedback}
          selectedAnswer={selectedAnswer}
        />
      </div>
    </div>
  );
}
import { Question } from '../types';
import { Check, X } from 'lucide-react';

interface QuizCardProps {
  question: Question;
  onAnswer: (answer: string) => void;
  showFeedback: boolean;
  selectedAnswer: string | null;
}

export default function QuizCard({ question, onAnswer, showFeedback, selectedAnswer }: QuizCardProps) {
  return (
    <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{question.question}</h2>
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = question.correctAnswer === option;
          const showCorrect = showFeedback && isCorrect;
          const showIncorrect = showFeedback && isSelected && !isCorrect;

          return (
            <button
              key={index}
              onClick={() => !showFeedback && onAnswer(option)}
              disabled={showFeedback}
              className={`w-full p-4 text-left rounded-lg transition-all
                ${isSelected ? 'border-2' : 'border'}
                ${showCorrect ? 'bg-green-100 border-green-500' : ''}
                ${showIncorrect ? 'bg-red-100 border-red-500' : ''}
                ${!showFeedback ? 'hover:bg-gray-50 border-gray-200' : ''}
                ${!showFeedback && !isSelected ? 'hover:border-blue-500' : ''}
              `}
            >
              <div className="flex items-center justify-between">
                <span>{option}</span>
                {showCorrect && <Check className="text-green-600" />}
                {showIncorrect && <X className="text-red-600" />}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
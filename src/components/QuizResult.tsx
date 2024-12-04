interface QuizResultProps {
  correctAnswers: number;
  totalQuestions: number;
  onRetry: () => void;
}

export default function QuizResult({ correctAnswers, totalQuestions, onRetry }: QuizResultProps) {
  const percentage = Math.round((correctAnswers / totalQuestions) * 100);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Quiz Selesai!</h2>
      <div className="text-6xl font-bold text-blue-600 mb-4">{percentage}%</div>
      <p className="text-gray-600 mb-6">
        Kamu menjawab {correctAnswers} dari {totalQuestions} pertanyaan dengan benar
      </p>
      <button
        onClick={onRetry}
        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Coba Lagi
      </button>
    </div>
  );
}
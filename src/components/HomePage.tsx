import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { QuizSection } from '../types';

interface HomePageProps {
  sections: QuizSection[];
}

export default function HomePage({ sections }: HomePageProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Quiz Legal ITE</h1>
        <div className="space-y-4">
          {sections.map((section, index) => (
            <Link
              key={index}
              to={`/section/${index}`}
              className="block bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">{section.title}</h2>
                  <p className="text-gray-500 mt-1">{section.questions.length} pertanyaan</p>
                </div>
                <ChevronRight className="text-gray-400" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
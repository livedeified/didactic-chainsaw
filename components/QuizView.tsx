
import React, { useState, useEffect, useCallback } from 'react';
import { QuizQuestion } from '../types';
import LoadingSpinner from './LoadingSpinner';
import Alert from './Alert';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface QuizViewProps {
  topicTitle: string;
  questions: QuizQuestion[];
  onBack: () => void;
  isLoading: boolean;
}

const QuizView: React.FC<QuizViewProps> = ({ topicTitle, questions, onBack, isLoading }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    // Reset state if questions change (e.g., new quiz generated)
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  }, [questions]);

  const handleAnswerSelect = useCallback((questionIndex: number, answer: string) => {
    setSelectedAnswers(prev => ({ ...prev, [questionIndex]: answer }));
  }, []);

  const handleSubmitQuiz = useCallback(() => {
    let currentScore = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        currentScore++;
      }
    });
    setScore(currentScore);
    setShowResults(true);
  }, [questions, selectedAnswers]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleSubmitQuiz();
    }
  }, [currentQuestionIndex, questions.length, handleSubmitQuiz]);
  
  const handleRetakeQuiz = useCallback(() => {
     // This would ideally trigger a new quiz generation in App.tsx
     // For now, it just resets the current quiz view.
     // To truly retake with new questions, onBack() should be called,
     // and then the user selects "Generate Quiz" again.
     // For simplicity here, we'll reset the current questions.
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  }, []);


  if (isLoading && questions.length === 0) {
    return (
      <div className="text-center py-10">
        <LoadingSpinner />
        <p className="text-slate-300 mt-4">Generating quiz questions...</p>
      </div>
    );
  }

  if (questions.length === 0 && !isLoading) {
    return (
        <div className="text-center py-10 bg-slate-800/50 p-6 rounded-xl shadow-2xl">
            <Alert type="info" message="No quiz questions available for this topic yet, or quiz generation failed." />
            <button
                onClick={onBack}
                className="mt-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
            >
             <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Topic Details
            </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  if (showResults) {
    return (
      <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl text-center">
        <SparklesIcon className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-3xl font-bold text-sky-300 mb-4">Quiz Results for {topicTitle}</h2>
        <p className="text-2xl text-slate-100 mb-6">
          You scored {score} out of {questions.length}!
        </p>
        <div className="space-y-4 mb-8 max-h-96 overflow-y-auto pr-2">
            {questions.map((q, index) => (
                <div key={index} className={`p-4 rounded-lg text-left ${selectedAnswers[index] === q.correctAnswer ? 'bg-green-700/30 border-green-500' : 'bg-red-700/30 border-red-500'} border`}>
                    <p className="font-semibold text-slate-100">{index + 1}. {q.question}</p>
                    <p className="text-sm text-slate-300 mt-1">Your answer: {selectedAnswers[index] || "Not answered"}</p>
                    <p className={`text-sm mt-1 ${selectedAnswers[index] === q.correctAnswer ? 'text-green-300' : 'text-red-300'}`}>
                        Correct answer: {q.correctAnswer}
                    </p>
                </div>
            ))}
        </div>
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
             <button
                onClick={handleRetakeQuiz}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 transition-colors"
            >
                Retake This Quiz
            </button>
            <button
                onClick={onBack}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-slate-500 text-base font-medium rounded-md shadow-sm text-slate-100 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-colors"
            >
                <ArrowLeftIcon className="h-5 w-5 mr-2" />
                Back to Topic
            </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-sky-300 mb-2">Quiz: {topicTitle}</h2>
      <p className="text-slate-400 mb-6 text-sm sm:text-base">Question {currentQuestionIndex + 1} of {questions.length}</p>
      
      <div className="mb-8">
        <p className="text-lg sm:text-xl text-slate-100 font-medium mb-6 leading-relaxed">{currentQuestion.question}</p>
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ease-in-out
                ${selectedAnswers[currentQuestionIndex] === option 
                  ? 'bg-sky-500 border-sky-400 text-white shadow-lg scale-105' 
                  : 'bg-slate-700 border-slate-600 hover:bg-slate-600/70 hover:border-sky-500 text-slate-200'}`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
            onClick={onBack} // Or go to previous question if implementing that
            className="px-6 py-3 border border-slate-500 text-sm font-medium rounded-md shadow-sm text-slate-100 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-slate-500 transition-colors"
        >
            <ArrowLeftIcon className="h-5 w-5 inline mr-1" />
            Exit Quiz
        </button>
        <button
          onClick={handleNextQuestion}
          disabled={!selectedAnswers[currentQuestionIndex]}
          className="px-8 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-green-500 disabled:opacity-50 transition-colors"
        >
          {currentQuestionIndex < questions.length - 1 ? 'Next Question' : 'Submit Quiz'}
        </button>
      </div>
    </div>
  );
};

export default QuizView;

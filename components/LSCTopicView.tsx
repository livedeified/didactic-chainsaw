
import React from 'react';
import { LSCTopicItem } from '../types';
import LoadingSpinner from './LoadingSpinner';
import { ArrowLeftIcon, LightBulbIcon, QuestionMarkCircleIcon } from '@heroicons/react/24/outline';

interface LSCTopicViewProps {
  topic: LSCTopicItem;
  aiExplanation: string | null;
  onBack: () => void;
  onFetchExplanation: () => void;
  onGenerateQuiz: () => void;
  isLoading: boolean;
}

const LSCTopicView: React.FC<LSCTopicViewProps> = ({
  topic,
  aiExplanation,
  onBack,
  onFetchExplanation,
  onGenerateQuiz,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800/50 p-6 sm:p-8 rounded-xl shadow-2xl">
      <button
        onClick={onBack}
        className="mb-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-sky-500 transition-colors"
      >
        <ArrowLeftIcon className="h-5 w-5 mr-2" />
        Back to Topics
      </button>

      <div className="flex items-center space-x-4 mb-6">
        {topic.icon && <topic.icon className="h-12 w-12 text-sky-400 flex-shrink-0" />}
        <h2 className="text-3xl font-bold text-sky-300">{topic.title}</h2>
      </div>
      
      <p className="text-slate-300 mb-6 text-lg leading-relaxed">{topic.shortDescription}</p>

      <div className="space-y-4 mb-8">
        <button
          onClick={onFetchExplanation}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-teal-500 disabled:opacity-50 transition-colors"
        >
          <LightBulbIcon className="h-5 w-5 mr-2" />
          {isLoading && !aiExplanation ? 'Loading Explanation...' : 'Get AI Explanation'}
        </button>
        <button
          onClick={onGenerateQuiz}
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
        >
          <QuestionMarkCircleIcon className="h-5 w-5 mr-2" />
          {isLoading && aiExplanation ? 'Generating Quiz...' : 'Generate Quiz on this Topic'}
        </button>
      </div>

      {isLoading && !aiExplanation && (
        <div className="my-6 text-center">
          <LoadingSpinner />
          <p className="text-slate-300 mt-2">Fetching explanation from AI...</p>
        </div>
      )}

      {aiExplanation && (
        <div className="mt-8 p-6 bg-slate-700/60 rounded-lg prose prose-invert prose-sm sm:prose-base max-w-none prose-p:text-slate-300 prose-headings:text-sky-400">
          <h3 className="text-2xl font-semibold text-sky-400 mb-4">AI Explanation:</h3>
          <div dangerouslySetInnerHTML={{ __html: aiExplanation.replace(/\n/g, '<br />') }} />
        </div>
      )}
    </div>
  );
};

export default LSCTopicView;

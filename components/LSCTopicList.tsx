
import React from 'react';
import { LSCTopicItem } from '../types';
import { ChevronRightIcon } from '@heroicons/react/24/solid';

interface LSCTopicListProps {
  topics: LSCTopicItem[];
  onSelectTopic: (topic: LSCTopicItem) => void;
}

const LSCTopicList: React.FC<LSCTopicListProps> = ({ topics, onSelectTopic }) => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-semibold text-sky-300 mb-6 text-center">Life Safety Code Topics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {topics.map((topic) => (
          <button
            key={topic.id}
            onClick={() => onSelectTopic(topic)}
            className="bg-slate-700/70 hover:bg-slate-600/90 p-6 rounded-xl shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-opacity-75 text-left"
          >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {topic.icon && <topic.icon className="h-10 w-10 text-sky-400 flex-shrink-0" />}
                    <h3 className="text-xl font-medium text-slate-100">{topic.title}</h3>
                </div>
                <ChevronRightIcon className="h-6 w-6 text-slate-400 group-hover:text-sky-400 transition-colors" />
            </div>
            <p className="mt-3 text-sm text-slate-300 leading-relaxed">
              {topic.shortDescription}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LSCTopicList;

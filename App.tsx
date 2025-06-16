
import React, { useState, useCallback } from 'react';
import { LSCTopicItem, QuizQuestion, ViewState } from './types';
import { INITIAL_LSC_TOPICS, GEMINI_MODEL_NAME } from './constants';
import Header from './components/Header';
import Footer from './components/Footer';
import LSCTopicList from './components/LSCTopicList';
import LSCTopicView from './components/LSCTopicView';
import QuizView from './components/QuizView';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import Alert from './components/Alert';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.TOPIC_LIST);
  const [selectedTopic, setSelectedTopic] = useState<LSCTopicItem | null>(null);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = process.env.API_KEY;
  const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

  const handleSelectTopic = useCallback((topic: LSCTopicItem) => {
    setSelectedTopic(topic);
    setCurrentView(ViewState.TOPIC_DETAIL);
    setAiExplanation(null); // Reset explanation when new topic selected
    setQuizQuestions([]); // Reset quiz questions
    setError(null);
  }, []);

  const handleBackToList = useCallback(() => {
    setCurrentView(ViewState.TOPIC_LIST);
    setSelectedTopic(null);
    setAiExplanation(null);
    setQuizQuestions([]);
    setError(null);
  }, []);

  const fetchAIExplanation = useCallback(async () => {
    if (!selectedTopic || !ai) {
      setError("AI Service not available or topic not selected.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setAiExplanation(null);

    try {
      const prompt = `Provide a detailed explanation of the Life Safety Code requirements for "${selectedTopic.title}" as it applies to nursing homes. Focus on key compliance points, common challenges, and best practices. Structure the explanation for easy understanding by facility staff.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
      });
      setAiExplanation(response.text);
    } catch (err) {
      console.error("Error fetching AI explanation:", err);
      setError("Failed to fetch explanation from AI. Please ensure your API key is correctly configured and try again.");
      setAiExplanation(null);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, ai]);

  const generateQuiz = useCallback(async () => {
    if (!selectedTopic || !ai) {
      setError("AI Service not available or topic not selected.");
      return;
    }
    setIsLoading(true);
    setError(null);
    setQuizQuestions([]);

    try {
      const prompt = `Generate 5 multiple-choice quiz questions about Life Safety Code section: "${selectedTopic.title}" for nursing homes. For each question, provide one correct answer and three plausible incorrect distractors. Format the output as a JSON array of objects. Each object should have the following properties: "question" (string), "options" (array of 4 strings), and "correctAnswer" (string, which must be one of the provided options). Ensure the JSON is valid.`;
      
      const response: GenerateContentResponse = await ai.models.generateContent({
        model: GEMINI_MODEL_NAME,
        contents: prompt,
        config: { responseMimeType: "application/json" },
      });

      let jsonStr = response.text.trim();
      const fenceRegex = /^```(\w*)?\s*\n?(.*?)\n?\s*```$/s;
      const match = jsonStr.match(fenceRegex);
      if (match && match[2]) {
        jsonStr = match[2].trim();
      }
      
      const parsedQuestions = JSON.parse(jsonStr);
      if (Array.isArray(parsedQuestions) && parsedQuestions.every(q => q.question && q.options && q.correctAnswer)) {
        setQuizQuestions(parsedQuestions);
        setCurrentView(ViewState.QUIZ);
      } else {
        throw new Error("Generated quiz data is not in the expected format.");
      }
    } catch (err) {
      console.error("Error generating quiz:", err);
      setError("Failed to generate quiz. The AI may have returned an unexpected format. Please try again.");
      setQuizQuestions([]);
    } finally {
      setIsLoading(false);
    }
  }, [selectedTopic, ai]);
  
  const renderContent = () => {
    if (!apiKey) {
        return <Alert type="error" message="API Key for Gemini AI is not configured. Please set the process.env.API_KEY environment variable." />;
    }
    switch (currentView) {
      case ViewState.TOPIC_LIST:
        return <LSCTopicList topics={INITIAL_LSC_TOPICS} onSelectTopic={handleSelectTopic} />;
      case ViewState.TOPIC_DETAIL:
        if (!selectedTopic) return <LSCTopicList topics={INITIAL_LSC_TOPICS} onSelectTopic={handleSelectTopic} />;
        return (
          <LSCTopicView
            topic={selectedTopic}
            aiExplanation={aiExplanation}
            onBack={handleBackToList}
            onFetchExplanation={fetchAIExplanation}
            onGenerateQuiz={generateQuiz}
            isLoading={isLoading}
          />
        );
      case ViewState.QUIZ:
        if (!selectedTopic) return <LSCTopicList topics={INITIAL_LSC_TOPICS} onSelectTopic={handleSelectTopic} />;
        return (
          <QuizView
            topicTitle={selectedTopic.title}
            questions={quizQuestions}
            onBack={() => setCurrentView(ViewState.TOPIC_DETAIL)} 
            isLoading={isLoading}
          />
        );
      default:
        return <LSCTopicList topics={INITIAL_LSC_TOPICS} onSelectTopic={handleSelectTopic} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-slate-900 via-slate-800 to-sky-900 text-slate-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
};

export default App;

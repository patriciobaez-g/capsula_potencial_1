
import React, { useState, useEffect, useCallback } from 'react';
import { Section, UserData, QuizResults, MetacognitiveAnswers } from './types';
import LoginForm from './sections/LoginForm';
import Cover from './sections/Cover';
import Introduction from './sections/Introduction';
import Activation from './sections/Activation';
import Development from './sections/Development';
import FormativeEvaluation from './sections/FormativeEvaluation';
import SummativeEvaluation from './sections/SummativeEvaluation';
import Synthesis from './sections/Synthesis';
import Closure from './sections/Closure';
import Certificate from './sections/Certificate';
import FloatingMenu from './components/FloatingMenu';
import ProgressBar from './components/ProgressBar';
import Chatbot from './components/Chatbot';

const App: React.FC = () => {
    const [currentSection, setCurrentSection] = useState<Section>(Section.Login);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [quizResults, setQuizResults] = useState<QuizResults>({ development: [], summative: [] });
    const [summativeScore, setSummativeScore] = useState<number | null>(null);
    const [metacognitiveAnswers, setMetacognitiveAnswers] = useState<MetacognitiveAnswers>({ q1: '', q2: '', q3: '' });

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            setUserData(JSON.parse(storedUserData));
            setCurrentSection(Section.Cover);
        }
    }, []);

    const handleLogin = (data: UserData) => {
        setUserData(data);
        localStorage.setItem('userData', JSON.stringify(data));
        setCurrentSection(Section.Cover);
    };

    const handleLogout = useCallback(() => {
        localStorage.clear();
        setUserData(null);
        setQuizResults({ development: [], summative: [] });
        setSummativeScore(null);
        setMetacognitiveAnswers({ q1: '', q2: '', q3: '' });
        setCurrentSection(Section.Login);
    }, []);
    
    const renderSection = () => {
        switch (currentSection) {
            case Section.Login:
                return <LoginForm onLogin={handleLogin} />;
            case Section.Cover:
                return <Cover onStart={() => setCurrentSection(Section.Introduction)} />;
            case Section.Introduction:
                return <Introduction />;
            case Section.Activation:
                return <Activation />;
            case Section.Development:
                return <Development quizResults={quizResults} setQuizResults={setQuizResults} />;
            case Section.FormativeEvaluation:
                return <FormativeEvaluation />;
            case Section.SummativeEvaluation:
                return <SummativeEvaluation setScore={setSummativeScore} quizResults={quizResults} setQuizResults={setQuizResults} />;
            case Section.Synthesis:
                return <Synthesis />;
            case Section.Closure:
                return <Closure 
                            metacognitiveAnswers={metacognitiveAnswers} 
                            setMetacognitiveAnswers={setMetacognitiveAnswers}
                            quizResults={quizResults}
                            userData={userData}
                        />;
            case Section.Certificate:
                return <Certificate userData={userData} score={summativeScore} />;
            default:
                return <LoginForm onLogin={handleLogin} />;
        }
    };

    const isMenuVisible = currentSection !== Section.Login && userData;

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-purple-900 font-sans antialiased text-gray-200">
             {isMenuVisible && (
                <>
                    <ProgressBar currentSection={currentSection} />
                    <FloatingMenu currentSection={currentSection} setCurrentSection={setCurrentSection} handleLogout={handleLogout} />
                    <Chatbot />
                </>
            )}
            <div className={`transition-all duration-300 ${isMenuVisible ? 'pl-64' : ''}`}>
                <main className="container mx-auto px-4 py-16 sm:py-24 relative z-10">
                    {renderSection()}
                </main>
            </div>
        </div>
    );
};

export default App;
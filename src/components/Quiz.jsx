import React, { useState, useEffect, useRef } from 'react';
import { useQuizLogic } from '../hooks/useQuizLogic';

const Quiz = ({ settings, userData, onFinish }) => {
  const { 
    currentQuestion, 
    currentIndex, 
    totalQuestions, 
    isLoading, 
    error, 
    checkAnswer, 
    goToNextQuestion,
    timeLeft = 15,
    maxTime = 15,
    isTimeOut,
    stopTimer
  } = useQuizLogic(settings, userData, onFinish);

  const [selectedOptIndex, setSelectedOptIndex] = useState(null); 
  const [writingInput, setWritingInput] = useState(""); 
  const [isAnswered, setIsAnswered] = useState(false); 
  const [isCorrectState, setIsCorrectState] = useState(null); 
  const [feedbackMsg, setFeedbackMsg] = useState(""); 
  
  const inputRef = useRef(null);

  useEffect(() => {
    setSelectedOptIndex(null);
    setWritingInput("");
    setIsAnswered(false);
    setIsCorrectState(null);
    setFeedbackMsg("");
    
    if (currentQuestion?.type === 'writing' && inputRef.current) {
        setTimeout(() => inputRef.current.focus(), 300);
    }
  }, [currentIndex, currentQuestion]);

  useEffect(() => {
    if (isTimeOut && !isAnswered) {
        handleTimeOut();
    }
  }, [isTimeOut]);

  const handleTimeOut = () => {
    stopTimer();
    setIsAnswered(true);
    setIsCorrectState(false);
    setFeedbackMsg("⏰ Hết thời gian rồi!");
    checkAnswer(null); 
  };

  const handleSpeak = () => {
    if (!currentQuestion.audioScript) return;

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(currentQuestion.audioScript);
    
    let voices = window.speechSynthesis.getVoices();

    const findBestVoice = () => {
      const lang = currentQuestion.langCode || 'en-US';
      
      return voices.find(v => v.lang.includes(lang) && v.name.includes('Natural')) ||
             voices.find(v => v.lang.includes(lang) && v.name.includes('Google')) ||
             voices.find(v => v.lang.includes(lang) && v.name.includes('Premium')) ||
             voices.find(v => v.lang.includes(lang));
    };

    const play = () => {
      const selectedVoice = findBestVoice();
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      
      utterance.lang = currentQuestion.langCode || 'en-US';
      utterance.rate = 0.85; 
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      window.speechSynthesis.speak(utterance);
    };

    if (voices.length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        voices = window.speechSynthesis.getVoices();
        play();
      };
    } else {
      play();
    }
  };

  const handleSubmit = () => {
    stopTimer();
    let answerData = null;
    if (currentQuestion.type === 'writing') {
        if (!writingInput.trim()) return;
        answerData = writingInput;
    } else {
        if (selectedOptIndex === null) return;
        answerData = selectedOptIndex;
    }

    const isCorrect = checkAnswer(answerData);
    setIsAnswered(true);
    setIsCorrectState(isCorrect);
    
    if (isCorrect) {
        setFeedbackMsg(`🎉 Chính xác!`);
    } else {
        const correctText = currentQuestion.type === 'writing' 
            ? currentQuestion.correctAnswer 
            : currentQuestion.options[currentQuestion.correct];
        setFeedbackMsg(`❌ Sai rồi! Đáp án là: ${correctText}`);
    }
  };

  const handleNext = () => {
      goToNextQuestion();
  };

  const totalProgressPercent = totalQuestions > 0 ? ((currentIndex + 1) / totalQuestions) * 100 : 0;
  const timeProgressPercent = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0;

  const optionGradients = [
    'from-blue-400 to-blue-600 shadow-blue-400/40',       
    'from-purple-400 to-purple-600 shadow-purple-400/40', 
    'from-pink-400 to-pink-600 shadow-pink-400/40',       
    'from-amber-400 to-orange-500 shadow-orange-400/40'   
  ];

  if (isLoading) return <div className="mt-20 text-center text-white animate-pulse">Đang tải dữ liệu...</div>;
  if (error) return <div className="mt-20 text-center text-red-200">{error}</div>;
  if (!currentQuestion) return null;

  return (
    <div className="relative flex flex-col w-full h-full max-w-2xl mx-auto font-sans">
      
      {/* HEADER */}
      <div className="relative z-20 flex-shrink-0 w-full px-4 pt-4 pb-2 bg-transparent"> 
        <div className="flex items-center justify-between w-full p-2 mb-2 text-white border shadow-sm bg-black/10 backdrop-blur-md rounded-xl border-white/10">
          <span className="px-3 py-1 text-xs font-bold tracking-wider uppercase border rounded-lg bg-white/20 border-white/20">
            Câu <span>{currentIndex + 1}</span> <span className="opacity-60">/</span> <span>{totalQuestions}</span>
          </span> 
          
          <div className={`flex items-center gap-1 font-black text-sm px-3 py-1 rounded-lg transition-colors ${timeLeft < 5 ? 'bg-red-500/20 text-red-300 animate-pulse' : 'bg-yellow-500/20 text-yellow-300'}`}>
             <span>⏱</span>
             <span>{Math.ceil(timeLeft || 0)}s</span>
          </div>
        </div>
        
        <div className="w-full h-1.5 overflow-hidden rounded-full bg-gray-900/30 backdrop-blur-sm mb-1.5 border border-white/10 relative">
          <div 
            className="h-full transition-all duration-100 ease-linear bg-gradient-to-r from-yellow-400 to-orange-500 shadow-[0_0_8px_rgba(250,204,21,0.6)]" 
            style={{ width: `${timeProgressPercent}%` }}
          ></div>
        </div>

        <div className="w-full h-1 overflow-hidden rounded-full bg-white/10">
          <div 
            className="h-full transition-all duration-500 bg-green-400/60" 
            style={{ width: `${totalProgressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* NỘI DUNG */}
      <div className="relative z-10 flex-grow px-4 pb-20 overflow-y-auto no-scrollbar">
        <div className={`relative z-10 p-5 mt-2 bg-white shadow-2xl rounded-3xl md:p-8 transition-all duration-300 ${isTimeOut && !isAnswered ? 'grayscale opacity-90' : ''}`}>
            
            <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
            <div className="flex items-center justify-center w-10 h-10 text-lg font-black text-white shadow-lg rounded-xl bg-gradient-to-br from-blue-500 to-blue-600">
                Q<span>{currentIndex + 1}</span>
            </div>
            <div className="flex-1">
                <span className="inline-block px-2 py-0.5 text-[10px] font-extrabold tracking-widest text-blue-600 uppercase bg-blue-100 rounded">
                {currentQuestion.category || 'QUIZ'}
                </span>
            </div>
            </div>

            <h2 className="mb-6 text-xl font-bold leading-relaxed text-gray-800 break-words">
            {currentQuestion.question}
            </h2>

            {currentQuestion.type === 'listening' && (
                <div className="mb-6 text-center">
                    <button 
                        onClick={handleSpeak}
                        className="inline-flex items-center gap-2 px-8 py-4 font-black text-white transition-all transform bg-blue-600 shadow-xl rounded-2xl hover:bg-blue-700 active:scale-95 hover:shadow-blue-500/40"
                    >
                        <span className="text-xl">🔊</span> Bấm để nghe rõ
                    </button>
                </div>
            )}

            {currentQuestion.type === 'writing' && (
                <div className="mb-6">
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={writingInput}
                        onChange={(e) => setWritingInput(e.target.value)}
                        disabled={isAnswered || isTimeOut} 
                        placeholder={isTimeOut ? "Hết giờ!" : "Nhập câu trả lời..."}
                        className={`
                            w-full p-4 text-lg font-bold text-center border-2 rounded-xl outline-none transition-all
                            ${isAnswered 
                                ? (isCorrectState ? 'border-green-500 bg-green-50 text-green-700' : 'border-red-500 bg-red-50 text-red-700')
                                : 'border-gray-200 focus:border-blue-500 focus:shadow-lg'
                            }
                        `}
                    />
                </div>
            )}

            {(!currentQuestion.type || currentQuestion.type === 'multiple' || currentQuestion.type === 'listening') && (
                <div className="flex flex-col gap-3 mb-6">
                {currentQuestion.options && currentQuestion.options.map((opt, idx) => {
                    const baseGradient = optionGradients[idx % 4];
                    let btnStateClass = `bg-gradient-to-r ${baseGradient} text-white shadow-md transform hover:scale-[1.01] active:scale-95`; 
                    let icon = null;

                    if (isAnswered) {
                        btnStateClass = `bg-gradient-to-r ${baseGradient} text-white cursor-default opacity-50 grayscale`; 
                        if (idx === currentQuestion.correct) {
                            icon = <span className="flex items-center justify-center w-6 h-6 ml-auto text-sm text-green-600 bg-white rounded-full shadow-sm">✓</span>;
                            btnStateClass = `bg-gradient-to-r ${baseGradient} text-white ring-2 ring-green-400 scale-[1.02] z-10 opacity-100 grayscale-0 shadow-xl`; 
                        } else if (idx === selectedOptIndex && !isCorrectState && !isTimeOut) {
                            icon = <span className="flex items-center justify-center w-6 h-6 ml-auto text-sm text-red-600 bg-white rounded-full shadow-sm">✕</span>;
                            btnStateClass = `bg-gradient-to-r ${baseGradient} text-white opacity-90 ring-2 ring-red-400 grayscale-0`;
                        }
                    } else {
                        if (selectedOptIndex === idx) {
                            btnStateClass += " ring-4 ring-blue-200 scale-[1.02] shadow-xl"; 
                        } else if (selectedOptIndex !== null) {
                            btnStateClass += " opacity-70 scale-95";
                        }
                    }

                    return (
                    <button 
                        key={idx}
                        disabled={isAnswered || isTimeOut}
                        onClick={() => setSelectedOptIndex(idx)}
                        className={`w-full p-3.5 text-left rounded-xl transition-all duration-300 font-bold flex items-center relative overflow-hidden ${btnStateClass}`}
                    >
                        <span className="flex items-center justify-center flex-shrink-0 mr-3 text-sm font-black rounded-lg shadow-inner w-7 h-7 bg-white/20 backdrop-blur-sm">
                            {String.fromCharCode(65 + idx)}
                        </span> 
                        <span className="flex-1 text-sm leading-snug break-words md:text-base">{opt}</span>
                        <div className="flex-shrink-0 ml-2">
                            {icon}
                        </div>
                    </button>
                    );
                })}
                </div>
            )}

            {isAnswered && (
                <div className={`p-3 mb-4 text-center rounded-xl font-bold text-sm shadow-inner animate-pulse ${isCorrectState ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {feedbackMsg}
                </div>
            )}

            {!isAnswered ? (
                <button 
                    onClick={handleSubmit}
                    disabled={isTimeOut || (currentQuestion.type === 'writing' && !writingInput) || (currentQuestion.type !== 'writing' && selectedOptIndex === null)}
                    className="w-full py-4 text-base font-bold text-white transition-all bg-orange-600 shadow-xl rounded-2xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-orange-500"
                > 
                    Chốt đáp án 🔒
                </button>
            ) : (
                <button 
                    onClick={handleNext}
                    className="w-full py-4 text-base font-bold text-white transition-all shadow-xl rounded-2xl bg-gradient-to-r from-blue-600 to-blue-500 hover:scale-[1.02] active:scale-95"
                > 
                    {currentIndex === totalQuestions - 1 ? 'Xem kết quả 🏆' : 'Câu tiếp theo ➡️'}
                </button>
            )}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
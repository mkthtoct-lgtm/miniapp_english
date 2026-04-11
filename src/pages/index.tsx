import React, { useEffect, useState } from 'react';
import { Page, SnackbarProvider as ZMPSnackbarProvider } from 'zmp-ui'; 
import { openWebview, openChat } from 'zmp-sdk';

// Fix lỗi TypeScript cho SnackbarProvider
const SnackbarProvider = ZMPSnackbarProvider as unknown as React.ComponentType<any>;

// --- IMPORT COMPONENTS ---
import Background from '../components/Background';
import Welcome from '../components/Welcome';
import Form from '../components/Form';
import LanguageSelect from '../components/LanguageSelect';
import LevelSelect from '../components/LevelSelect';
import Quiz from '../components/Quiz';
import Result from '../components/Result';
import Wheel from '../components/Wheel';

// --- TÊN KHÓA LƯU TRỮ (KEY) ---
const STORAGE_KEY = 'global_citizen_user_v1';

const HomePage = () => {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [userData, setUserData] = useState(null);
  
  // --- STATE MỚI: Lưu dữ liệu tạm thời lấy từ Zalo ở màn hình Welcome ---
  const [zaloData, setZaloData] = useState(null); 

  const [quizSettings, setQuizSettings] = useState({ lang: 'en', level: 'easy' });
  const [resultData, setResultData] = useState({ score: 0, analysis: null });

  // --- 1. TỰ ĐỘNG CHECK SESSION KHI MỞ APP ---
  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("✅ Tìm thấy dữ liệu cũ:", parsedData);
        setUserData(parsedData);
      }
    } catch (e) {
      console.error("Lỗi đọc cache:", e);
    }
  }, []);

  // --- 2. LOGIC ĐIỀU HƯỚNG ---
  
  // Nhận dữ liệu (Tên, SĐT) từ Welcome truyền vào callback onStart
  const handleStart = (dataFromZalo) => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    if (savedData) {
        console.log("👉 Đã có thông tin lưu trữ, bỏ qua Form.");
        if (!userData) setUserData(JSON.parse(savedData));
        setCurrentScreen('language');
    } else {
        console.log("👉 Chưa có thông tin, lưu dữ liệu Zalo và hiện Form.");
        // Lưu dữ liệu lấy được từ Zalo vào state tạm để truyền cho Form
        setZaloData(dataFromZalo); 
        setCurrentScreen('form');
    }
  };

  // Khi Submit Form -> LƯU VÀO STORAGE
  const handleFormSubmit = (data) => {
    console.log("💾 Đang lưu thông tin mới...", data);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setUserData(data); 
    setCurrentScreen('language');
  };

  const handleResetInfo = () => {
      localStorage.removeItem(STORAGE_KEY);
      setUserData(null);
      setZaloData(null); // Xóa luôn dữ liệu tạm
      setCurrentScreen('form');
  };

  const handleLanguageSelect = (langCode) => {
    setQuizSettings(prev => ({ ...prev, lang: langCode }));
    setCurrentScreen('level');
  };

  const handleLevelSelect = (levelCode) => {
    setQuizSettings(prev => ({ ...prev, level: levelCode }));
    setCurrentScreen('quiz');
  };

  const handleQuizFinish = (score, analysis) => {
    setResultData({ score, analysis });
    setCurrentScreen('result');
  };

  const handleGoToWheel = () => setCurrentScreen('wheel');
  const handleRestart = () => {
    setResultData({ score: 0, analysis: null });
    setCurrentScreen('welcome');
  };

  const handleBackToResult = () => setCurrentScreen('result');

  // --- 3. LIÊN HỆ ---
  const openMessenger = () => {
    openWebview({
      url: "https://m.me/100083047195100",
      config: { style: "bottomSheet", leftButton: "back" },
    });
  };

  const openZaloOA = async () => {
    try {
      await openChat({
        type: "oa",
        id: "2112176407138597287",
        message: "Xin chào, tôi cần tư vấn!",
      });
    } catch (error) {
      openWebview({ url: "https://zalo.me/2112176407138597287" });
    }
  };

  // --- 4. RENDER ---
  return (
    <Page className="page">
      <SnackbarProvider>
        <div className="relative w-full h-[100vh] bg-glossy flex flex-col overflow-hidden font-sans text-gray-800">
          <Background />

          <main className="relative z-10 flex-grow w-full p-4 overflow-x-hidden overflow-y-auto pb-safe no-scrollbar">
            <div className="flex flex-col items-center justify-center min-h-full py-6 ">
              
              {/* Màn hình Welcome: onStart sẽ nhận data từ Zalo trả về */}
              {currentScreen === 'welcome' && (
                <Welcome onStart={handleStart} />
              )}
              
              {/* Màn hình Form: Nhận dữ liệu Zalo thông qua prop initialData */}
              {currentScreen === 'form' && (
                <Form 
                  onSubmit={handleFormSubmit} 
                  initialData={zaloData} 
                />
              )}
              
              {currentScreen === 'language' && (
                  <div className="flex flex-col items-center w-full">
                      <LanguageSelect onSelect={handleLanguageSelect} />
                      <button 
                        onClick={handleResetInfo}
                        className="mt-4 text-xs underline text-white/50 hover:text-white"
                      >
                        (Nhập lại thông tin cá nhân)
                      </button>
                  </div>
              )}
              
              {currentScreen === 'level' && <LevelSelect onSelect={handleLevelSelect} />}
              
              {currentScreen === 'quiz' && (
                <Quiz 
                  settings={quizSettings} 
                  userData={userData} 
                  onFinish={handleQuizFinish} 
                />
              )}
              
              {currentScreen === 'result' && (
                <Result 
                  score={resultData.score} 
                  analysis={resultData.analysis} 
                  onSpin={handleGoToWheel}
                  onRestart={handleRestart}
                />
              )}
              
              {currentScreen === 'wheel' && <Wheel onBack={handleBackToResult} />}

            </div>
          </main>
        </div>
      </SnackbarProvider>
    </Page>
  );
};

export default HomePage;
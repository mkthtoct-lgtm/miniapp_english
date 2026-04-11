import { useState, useEffect, useRef } from 'react';
// Import data model
import { getQuestionsByLanguageAndLevel } from '@/public/models/DataModel';

// --- URL GOOGLE APPS SCRIPT ---
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbycz2_EG_IEIKrqAqawsCC-RtX0V_XATAgZXyCGadzxA1oN9D8GN9j639CVZ7q6PbL5Zg/exec';

// --- MAPPING CHỨNG CHỈ (CẬP NHẬT: Chia theo Level để dự đoán chính xác) ---
const CERTIFICATE_MAPPING = {
    en: {
        easy: [
            { min: 0, label: "Mất gốc (Band 0 - 2.0)", advice: "Cần học lại bảng chữ cái và từ vựng sơ cấp.", course: "Tiếng Anh Vỡ Lòng" },
            { min: 50, label: "Sơ cấp (Band 2.5 - 3.0)", advice: "Đã có từ vựng cơ bản, cần học ngữ pháp.", course: "Tiếng Anh Căn Bản" },
            { min: 80, label: "Tiền Trung cấp (Band 3.5)", advice: "Nền tảng tốt! Hãy chuyển sang mức Medium.", course: "IELTS Foundation" }
        ],
        medium: [
            { min: 0, label: "Sơ cấp (Band 3.5 - 4.0)", advice: "Cần củng cố ngữ pháp nâng cao hơn.", course: "IELTS Foundation" },
            { min: 50, label: "Trung cấp (Band 4.5 - 5.0)", advice: "Khá tốt. Cần luyện kỹ năng làm bài thi.", course: "IELTS Intensive" },
            { min: 80, label: "Trung cao cấp (Band 5.5 - 6.0)", advice: "Rất tốt! Bạn đã sẵn sàng cho mức Hard.", course: "IELTS Advanced" }
        ],
        hard: [
            { min: 0, label: "Trung cấp (Band 5.5)", advice: "Từ vựng học thuật còn thiếu sót.", course: "IELTS Advanced" },
            { min: 50, label: "Cao cấp (Band 6.5 - 7.0)", advice: "Tuyệt vời! Đủ điều kiện du học.", course: "Mentoring Học Bổng" },
            { min: 80, label: "Thành thạo (Band 7.5 - 8.0+)", advice: "Xuất sắc! Trình độ bản ngữ.", course: "Mentoring Học Bổng VIP" }
        ]
    },
    zh: {
        easy: [
            { min: 0, label: "Nhập môn (HSK 1)", advice: "Tập trung Pinyin và nét chữ.", course: "Tiếng Trung Sơ Cấp 1" },
            { min: 80, label: "Sơ cấp (HSK 2)", advice: "Tốt! Hãy học thêm Hán tự.", course: "Tiếng Trung Sơ Cấp 2" }
        ],
        medium: [
            { min: 0, label: "Trung cấp (HSK 3)", advice: "Cần luyện nghe nói phản xạ.", course: "Tiếng Trung Trung Cấp 1" },
            { min: 80, label: "Trung cấp (HSK 4)", advice: "Đủ trình độ giao tiếp văn phòng.", course: "Tiếng Trung Trung Cấp 2" }
        ],
        hard: [
            { min: 0, label: "Cao cấp (HSK 5)", advice: "Đọc hiểu báo chí và tin tức.", course: "Tiếng Trung Cao Cấp" },
            { min: 80, label: "Cao cấp (HSK 6)", advice: "Biên phiên dịch chuyên nghiệp.", course: "Tiếng Trung Biên Phiên Dịch" }
        ]
    },
    // Fallback cho ngôn ngữ khác hoặc lỗi
    default: [
        { min: 0, label: "Sơ cấp", advice: "Hãy bắt đầu từ cơ bản.", course: "Khóa Sơ Cấp" },
        { min: 50, label: "Trung cấp", advice: "Khá tốt.", course: "Khóa Trung Cấp" },
        { min: 80, label: "Cao cấp", advice: "Rất tốt.", course: "Khóa Cao Cấp" }
    ]
};

const SKILL_NAME_MAP = {
    'LISTENING': 'Nghe hiểu', 'READING': 'Đọc hiểu', 'WRITING': 'Viết', 
    'SPEAKING': 'Nói', 'GRAMMAR': 'Ngữ pháp', 'VOCABULARY': 'Từ vựng'
};

export const useQuizLogic = (settings, userData, onFinish) => {
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [rawCorrectCount, setRawCorrectCount] = useState(0); 
    const [currentScoreDisplay, setCurrentScoreDisplay] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // --- STATE TIMER ---
    const [timeLeft, setTimeLeft] = useState(15);
    const [isTimeOut, setIsTimeOut] = useState(false);
    
    const skillMetricsRef = useRef({});
    const userResponsesRef = useRef([]);
    const timerRef = useRef(null); 
    
    const MAX_TIME = 15; 

    // ============================================================
    // LOGIC ĐẾM NGƯỢC
    // ============================================================
    useEffect(() => {
        if (questions.length > 0 && !isLoading) {
            setTimeLeft(MAX_TIME);
            setIsTimeOut(false);
            
            if (timerRef.current) clearInterval(timerRef.current);

            timerRef.current = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 0.1) {
                        clearInterval(timerRef.current);
                        setIsTimeOut(true); 
                        return 0;
                    }
                    return prev - 0.1;
                });
            }, 100);
        }

        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [currentIndex, questions, isLoading]);

    // Auto next sau timeout (fix: tự động chuyển câu nếu hết giờ)
    useEffect(() => {
        if (isTimeOut) {
            checkAnswer(null); // Xử lý timeout như sai
            setTimeout(goToNextQuestion, 1000); // Delay 1s để user thấy timeout
        }
    }, [isTimeOut]);

    const stopTimer = () => {
        if (timerRef.current) clearInterval(timerRef.current);
    };

    // ============================================================
    // 2. HÀM TÍNH ĐIỂM (THANG 100)
    // ============================================================
    const calculateScore100 = (correctCount, totalQuestions) => {
        if (totalQuestions === 0) return 0;
        // Công thức: (Số câu đúng / Tổng số câu thực tế) * 100
        const score = (correctCount / totalQuestions) * 100;
        return Math.round(score); 
    };

    // --- 1. LOAD DATA ---
    useEffect(() => {
        setIsLoading(true);
        setRawCorrectCount(0);
        setCurrentScoreDisplay(0);
        setCurrentIndex(0);
        userResponsesRef.current = [];
        skillMetricsRef.current = {};

        try {
            // Lấy câu hỏi dựa trên Ngôn ngữ và Level
            const data = getQuestionsByLanguageAndLevel(settings.lang, settings.level);
            
            if (data && data.length > 0) {
                setQuestions(data);
                // Khởi tạo metrics kỹ năng
                data.forEach(q => {
                    const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
                    if (!skillMetricsRef.current[cat]) {
                        skillMetricsRef.current[cat] = { correct: 0, total: 0 }; 
                    }
                    skillMetricsRef.current[cat].total += 1;
                });
                setIsLoading(false);
            } else {
                setError("Dữ liệu đang cập nhật!"); 
                setIsLoading(false);
            }
        } catch (err) {
            console.error(err); 
            setError("Lỗi: " + err.message); 
            setIsLoading(false);
        }
    }, [settings]);

    // --- 2. CHECK ANSWER ---
    const checkAnswer = (answerData) => {
        stopTimer();

        if (!questions[currentIndex]) return false;
        const q = questions[currentIndex];
        const cat = q.category ? q.category.toUpperCase() : 'GENERAL';
        
        let isCorrect = false;
        
        if (answerData === null) {
            isCorrect = false;
            userResponsesRef.current.push(`Q${currentIndex + 1}: [TIMEOUT] (Đáp án: ${q.correctAnswer || q.options[q.correct]})`);
        } 
        else if (q.type === 'writing') {
            const userAns = String(answerData).trim().toLowerCase();
            const correctAns = q.correctAnswer ? q.correctAnswer.trim().toLowerCase() : "";
            isCorrect = (userAns === correctAns);
            userResponsesRef.current.push(`Q${currentIndex + 1}: ${answerData} (Đáp án: ${q.correctAnswer})`);
        } else {
            isCorrect = (answerData === q.correct);
        }

        if (isCorrect) {
            const newCorrectCount = rawCorrectCount + 1;
            setRawCorrectCount(newCorrectCount);
            
            if (skillMetricsRef.current[cat]) {
                skillMetricsRef.current[cat].correct += 1;
            }

            // Cập nhật điểm hiển thị realtime (Thang 100)
            const realtimeScore = calculateScore100(newCorrectCount, questions.length);
            setCurrentScoreDisplay(realtimeScore);
        }
        
        return isCorrect;
    };

    // --- 3. NEXT QUESTION ---
    const goToNextQuestion = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
        } else {
            finishQuiz(); 
        }
    };

    // --- 4. FINISH QUIZ ---
    const finishQuiz = (customData = null) => {
        stopTimer();
        setIsLoading(true);
        
        const finalUser = customData || userData; 
        
        // 1. TÍNH ĐIỂM CUỐI CÙNG (Thang 100)
        const finalScore = calculateScore100(rawCorrectCount, questions.length);
        
        // 2. TÌM XẾP HẠNG (RANK) DỰA TRÊN LEVEL & ĐIỂM 100
        // FIX: Lấy đúng bảng mapping theo level đã chọn
        const langCode = settings.lang || 'en';
        const userLevel = settings.level || 'easy'; // Mặc định là easy nếu không có

        const langConfig = CERTIFICATE_MAPPING[langCode] || CERTIFICATE_MAPPING['default'];
        
        // Kiểm tra xem config có chia level không (vì default không chia level)
        let levelMapping = [];
        if (Array.isArray(langConfig)) {
            levelMapping = langConfig; // Trường hợp default
        } else {
            levelMapping = langConfig[userLevel] || langConfig['easy']; // Lấy mảng easy/medium/hard
        }
        
        // Tìm rank phù hợp (sắp xếp giảm dần min để tìm ngưỡng cao nhất đạt được)
        const rankInfo = levelMapping.sort((a, b) => b.min - a.min).find(item => finalScore >= item.min) || levelMapping[0]; // Fallback rank thấp nhất (min:0)
        
        // 3. TÌM KỸ NĂNG YẾU NHẤT
        let weakestSkillName = "Chưa xác định";
        let minPercent = 101;
        for (const [key, val] of Object.entries(skillMetricsRef.current)) {
             if (val.total > 0) {
                 const percent = (val.correct / val.total) * 100;
                 if (percent < minPercent) {
                     minPercent = percent;
                     weakestSkillName = SKILL_NAME_MAP[key] || key;
                 }
             }
         }

        // Logic trúng thưởng: Ví dụ >= 50 điểm
        const isWinner = finalScore >= 50;

        const dataToSend = {
            zalo_user_id: finalUser?.zalo_user_id || finalUser?.id || `guest-${Date.now()}`,
            full_name: finalUser?.full_name || finalUser?.fullName || "Guest",
            phone_number: finalUser?.phone_number || finalUser?.phoneNumber || "",
            email: finalUser?.email || finalUser?.userEmail || "",
            school_name: finalUser?.school_name || finalUser?.schoolName || "", 
            phone_consent: finalUser?.phone_consent || finalUser?.phoneConsent || false,
            
            score: finalScore, // Điểm thang 100
            
            language: settings.lang,
            level: settings.level,
            rank: rankInfo.label, // Rank hiển thị đúng theo level (VD: Band 3.5 nếu Easy)
            ai_advice: rankInfo.course || rankInfo.advice, 
            weak_skill: weakestSkillName, 
            weak_percent: Math.round(minPercent),
            prize_won: isWinner ? "Đủ điều kiện quay" : "Chưa đủ điểm",
            writing_responses: userResponsesRef.current,
            completed_at: new Date().toISOString()
        };

        sendDataToGoogleSheet(dataToSend);

        if (onFinish) {
            onFinish(finalScore, {
                rankInfo: rankInfo,
                skills: skillMetricsRef.current,
                weakestSkill: weakestSkillName,
                rawCorrect: rawCorrectCount,
                totalQuestions: questions.length
            });
        }
        setIsLoading(false);
    };  

    // --- 5. SEND TO SHEET ---
    const sendDataToGoogleSheet = async (data) => {
        console.log("🚀 Sending Data:", data);
        const formData = new FormData();
        formData.append("id", data.zalo_user_id);
        formData.append("fullname", data.full_name);
        formData.append("phone", data.phone_number);
        formData.append("email", data.email);
        formData.append("school_name", data.school_name);
        formData.append("score", data.score); 
        formData.append("language", data.language);
        formData.append("level", data.level);
        formData.append("rank", data.rank);
        formData.append("consent", data.phone_consent ? "Có" : "Không");
        formData.append("qr_code", window.location.href);

        let noteInfo = [];
        noteInfo.push(`🏆 Rank: ${data.rank} (Điểm: ${data.score}/100)`);
        if (data.weak_skill && data.weak_skill !== "Chưa xác định") {
            noteInfo.push(`📉 Yếu: ${data.weak_skill} (${data.weak_percent}%)`);
        }
        noteInfo.push(`💡 Gợi ý: ${data.ai_advice}`);
        formData.append("ghi_chu", noteInfo.join("\n"));

        try {
            await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST', body: formData, mode: 'no-cors' 
            });
        } catch (e) {
            console.error("❌ Lỗi gửi sheet:", e);
        }
    };

    return {
        questions,
        currentQuestion: questions[currentIndex],
        currentIndex,
        totalQuestions: questions.length,
        currentScore: currentScoreDisplay, 
        isLoading,
        error,
        checkAnswer,
        goToNextQuestion,
        finishQuiz,
        timeLeft, 
        maxTime: MAX_TIME,
        isTimeOut, 
        stopTimer
    };
};
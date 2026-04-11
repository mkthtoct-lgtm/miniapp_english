import React, { useMemo, useEffect, useRef, useState } from 'react';
import { openChat, getUserInfo } from 'zmp-sdk/apis';

const Result = ({ score, analysis, onRestart, totalQuestions = 20 }) => {
  const OA_ID = "2112176407138597287"; // ID Zalo OA của HTO Group
  const BACKEND_API_URL = "https://api.hto.edu.vn/send-oa-message";
  
  // Ref để đảm bảo tin nhắn chỉ gửi tự động 1 lần duy nhất khi vào trang
  const hasAutoSent = useRef(false);

  // State quản lý popup quà tặng
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  // 1. Khởi tạo dữ liệu từ analysis props
  const rankInfo = analysis?.rankInfo || { 
      label: 'Hoàn thành', 
      message: 'Bạn đã làm tốt!', 
      course: 'Tư vấn thêm',
      advice: 'Hãy tiếp tục cố gắng!' 
  };
  
  const skills = analysis?.skills || {};
  const weakestSkill = analysis?.weakestSkill || "Chưa xác định";
  const actualCorrect = analysis?.rawCorrect ?? 0;
  const score100 = analysis?.score100 ?? Math.round((actualCorrect / totalQuestions) * 100);

  // Logic quà tặng
  const isGiftEligible = score100 >= 80;
  const pointsNeeded = 80 - score100;

  // 2. Mapping tên kỹ năng
  const skillNames = {
    'LISTENING': '🎧 Nghe Hiểu',
    'READING': '📖 Đọc Hiểu',
    'GRAMMAR': '✍️ Ngữ Pháp',
    'VOCABULARY': '🔤 Từ Vựng',
    'WRITING': '📝 Viết',
    'SPEAKING': '🗣️ Phản Xạ',
    'NUMBERS': '🔢 Số Học',
    'GREETING': '👋 Giao Tiếp',
    'GENERAL': '📚 Tổng quát'
  };

  // 3. Logic xác định thế mạnh
  const strongestSkill = useMemo(() => {
    let best = "Chưa xác định";
    let maxPercent = -1;
    for (const [key, val] of Object.entries(skills)) {
      if (val.total > 0) {
        const percent = (val.correct / val.total) * 100;
        if (percent > maxPercent) {
          maxPercent = percent;
          best = skillNames[key] || key;
        }
      }
    }
    return best;
  }, [skills]);

  // 4. Lấy nhãn hiển thị Band/HSK
  const getBandDisplay = (fullLabel) => {
    const match = fullLabel.match(/\(Band\s+(.+)\)/i);
    if (match) return { band: `Band ${match[1]}`, title: fullLabel.replace(/\(Band.+\)/i, '').trim() };
    const hskMatch = fullLabel.match(/\((HSK\s+\d+)\)/i);
    if (hskMatch) return { band: hskMatch[1], title: fullLabel.replace(/\(HSK.+\)/i, '').trim() };
    return { band: fullLabel, title: 'Trình độ AI đánh giá' };
  };

  const { band: displayBand, title: displayTitle } = getBandDisplay(rankInfo.label);

  // 5. Lời khuyên cải thiện
  const improvementAdvice = {
    'Nghe hiểu': 'Tăng cường nghe thụ động (Podcast, Nhạc) và chủ động (Chép chính tả). Tập trung bắt Keyword.',
    'Đọc hiểu': 'Luyện kỹ năng Skimming và Scanning. Đọc báo chí song ngữ hàng ngày.',
    'Ngữ pháp': 'Hệ thống hóa cấu trúc câu phức. Áp dụng viết nhật ký ngắn mỗi ngày.',
    'Từ vựng': 'Học từ vựng theo cụm (Collocations). Sử dụng Flashcard để ghi nhớ dài hạn.',
    'Viết': 'Luyện tập Paraphrase. Tham khảo các bài mẫu Band cao để học cách phát triển ý.',
    'Phản xạ': 'Thực hành Shadowing. Tự nói chuyện trước gương để tăng cường sự tự tin.',
    'Tổng quát': 'Bạn cần xây dựng lại lộ trình từ nền tảng, kết hợp học đều đặn 4 kỹ năng mỗi ngày.'
  };

  const rawWeakestSkillName = weakestSkill.replace(/^(🎧|📖|✍️|🔤|📝|🗣️|🔢|👋|📚)\s*/, '');
  const specificAdvice = improvementAdvice[rawWeakestSkillName] || improvementAdvice['Tổng quát'];

  // 6. Hàm gọi API gửi tin nhắn tự động
  const sendAutoNotification = async () => {
    if (hasAutoSent.current) return;
    try {
      const { userInfo } = await getUserInfo({}).catch(() => ({ userInfo: { id: "Guest", name: "Người dùng" } }));
      
      await fetch(BACKEND_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userInfo.id,
          userName: userInfo.name,
          score: score100,
          strongestSkill,
          weakestSkill,
          actionUrl: `https://zalo.me/${OA_ID}`
        }),
      });
      hasAutoSent.current = true;
    } catch (err) {
      console.error("Lỗi gửi tin nhắn tự động:", err);
    }
  };

  // Tự động kích hoạt khi vừa hiện màn hình kết quả
  useEffect(() => {
    sendAutoNotification();
  }, []);

  // 7. Hàm mở chat thủ công
  const handleOpenZaloChat = async () => {
    const courseName = rankInfo.course || rankInfo.course_recommend || "lộ trình chuyên sâu";
    try {
      await openChat({
        type: "oa",
        id: OA_ID,
        message: `Chào Admin, mình vừa đạt ${score100}/100 điểm. Tư vấn giúp mình khóa: ${courseName}`,
      });
    } catch (error) {
      window.open(`https://zalo.me/${OA_ID}`, '_blank');
    }
  };

  return (
    <div className="w-full max-w-lg px-4 pb-12 mx-auto fade-in">
      <div className="relative overflow-hidden bg-white border border-gray-100 shadow-2xl rounded-[2.5rem] shadow-blue-900/10">
        
        {/* Header - Score Card */}
        <div className="relative p-8 text-center text-white bg-gradient-to-b from-[#0f172a] to-[#1e3a8a]">
          <div className="absolute top-0 right-0 w-40 h-40 -mt-10 -mr-10 bg-blue-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 -mb-10 -ml-10 rounded-full bg-cyan-400 opacity-20 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-[10px] font-black tracking-widest text-blue-200 uppercase border rounded-full bg-white/10 border-white/20">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Báo cáo năng lực tự động
            </div>
            
            <div className="flex items-end justify-center gap-1 mb-2">
              <span className="text-7xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-200 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                {score100}
              </span>
              <span className="pb-2 text-2xl font-bold text-blue-300/80">/100</span>
            </div>
            
            <div className="mb-5 text-sm font-medium text-blue-100/80">
              Trả lời đúng <strong className="text-white">{actualCorrect}/{totalQuestions}</strong> câu hỏi
            </div>

            <div className="flex flex-col items-center justify-center p-4 border bg-white/10 backdrop-blur-md border-white/20 rounded-2xl">
              <div className="mb-1 text-[10px] font-bold tracking-widest text-cyan-300 uppercase">Hệ thống AI đánh giá</div>
              <div className="text-3xl font-black text-yellow-400 drop-shadow-md">{displayBand}</div>
              <div className="mt-1 text-xs font-semibold tracking-wide text-blue-100 uppercase opacity-90">{displayTitle}</div>
            </div>
          </div>
        </div>

        {/* Analysis Section */}
        <div className="px-6 py-6 border-b border-gray-100 bg-slate-50">
          <h3 className="mb-4 text-xs font-black tracking-widest text-gray-400 uppercase">Phân tích chuyên sâu</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-white border border-green-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-green-600">
                <span className="text-[10px] font-bold uppercase tracking-wider">Thế mạnh</span>
              </div>
              <div className="text-sm font-bold text-gray-800">{strongestSkill}</div>
            </div>
            <div className="p-4 bg-white border border-red-100 shadow-sm rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <span className="text-[10px] font-bold uppercase tracking-wider">Cần cải thiện</span>
              </div>
              <div className="text-sm font-bold text-gray-800">{weakestSkill}</div>
            </div>
          </div>
        </div>

        {/* Detailed Skills Bar */}
        {Object.keys(skills).length > 0 && (
          <div className="px-6 pt-6 pb-4">
            <h3 className="mb-4 text-xs font-black tracking-widest text-gray-400 uppercase">Phổ điểm chi tiết</h3>
            <div className="p-5 space-y-4 bg-white border border-gray-100 shadow-sm rounded-2xl">
              {Object.entries(skills).map(([key, val]) => {
                if (!val || val.total === 0) return null;
                const percent = Math.round((val.correct / val.total) * 100);
                const barColor = percent >= 80 ? "from-green-400 to-green-500" : (percent >= 50 ? "from-blue-400 to-indigo-500" : "from-red-400 to-red-500");
                return (
                  <div key={key}>
                    <div className="flex justify-between mb-2 text-xs font-bold">
                      <span className="text-gray-700">{skillNames[key] || key}</span>
                      <span className="text-gray-500">{val.correct}/{val.total} ({percent}%)</span>
                    </div>
                    <div className="w-full h-2 overflow-hidden bg-gray-100 rounded-full">
                      <div className={`h-full transition-all duration-1000 bg-gradient-to-r ${barColor}`} style={{ width: `${percent}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Advice Section */}
        <div className="px-6 pb-6">
          <div className="p-5 border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-50/50 rounded-2xl">
            <h4 className="mb-3 text-xs font-black tracking-widest text-blue-900 uppercase">Kế hoạch cải thiện</h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-500 shrink-0">❖</span>
                <div><strong className="block text-blue-900">Đánh giá chung:</strong>{rankInfo.advice || rankInfo.message}</div>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-blue-500 shrink-0">❖</span>
                <div><strong className="block text-blue-900">Chiến lược cho {rawWeakestSkillName}:</strong>{specificAdvice}</div>
              </li>
            </ul>
          </div>
        </div>

        {/* 🎁 QUÀ TẶNG SECTION */}
        <div className="px-6 pb-6">
          {isGiftEligible ? (
            <div className="p-5 border shadow-lg bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-xl border-yellow-400/50 rounded-[28px] text-center">
              <h3 className="mb-2 text-lg font-black tracking-widest text-yellow-600 uppercase">🎉 PHẦN THƯỞNG ĐẶC BIỆT</h3>
              <p className="mb-4 text-sm font-semibold text-gray-700">Xuất sắc đạt {score100} điểm. Bạn nhận được quà tặng độc quyền!</p>
              <div className="flex justify-center mb-4">
                  <img src="/path/to/mockhoa_hto.jpg" alt="Móc khóa cá heo" className="object-contain w-24 h-auto drop-shadow-lg rounded-xl" />
              </div>
              <button 
                  onClick={() => setIsGiftModalOpen(true)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-none shadow-[0_5px_15px_rgba(250,204,21,0.4)] rounded-full py-3 text-base font-black uppercase tracking-widest active:scale-95 transition-transform"
              >
                  🎁 Xem phần thưởng
              </button>
            </div>
          ) : (
            <div className="p-5 border shadow-sm bg-gray-50 border-gray-200 rounded-[28px] text-center">
              <h3 className="mb-2 text-sm font-bold tracking-widest text-gray-500 uppercase">TIẾN ĐỘ NHẬN QUÀ</h3>
              <p className="text-sm font-medium text-gray-600">
                  Bạn cần thêm <span className="text-lg font-black text-red-500">{pointsNeeded}</span> điểm nữa để nhận quà tặng độc quyền từ HTO. Hãy cố lên nhé!
              </p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="px-6 pb-6">
          <div className="relative p-1 overflow-hidden rounded-2xl bg-gradient-to-r from-orange-400 via-red-500 to-pink-500">
            <div className="relative p-4 bg-white rounded-xl">
              <div className="text-[10px] font-black text-orange-600 uppercase mb-2 tracking-widest">Lộ trình thiết kế riêng cho bạn</div>
              <div onClick={handleOpenZaloChat} className="flex items-center justify-between p-3.5 text-white rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 cursor-pointer active:scale-95 transition-transform">
                <div className="flex items-center gap-3">
                  <span className="text-lg">💬</span>
                  <span className="text-sm font-bold truncate">{rankInfo.course || "Nhận tư vấn lộ trình VIP"}</span>
                </div>
                <span className="flex items-center justify-center w-8 h-8 text-sm font-bold text-blue-900 bg-white rounded-full">➔</span>
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-8">
          <button onClick={onRestart} className="flex items-center justify-center w-full gap-2 py-4 text-sm font-bold tracking-wide uppercase transition-all bg-white border-2 text-slate-600 border-slate-200 rounded-2xl hover:bg-slate-50">
            Thực hiện lại bài Test
          </button>
        </div>

      </div>

      {/* 🎁 GIFT MODAL */}
      {isGiftModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0a1930]/90 backdrop-blur-sm fade-in">
          <div className="relative w-full max-w-sm p-6 text-center border bg-gradient-to-b from-[#0f172a] to-[#1e3a8a] border-yellow-400/50 rounded-3xl shadow-[0_15px_50px_rgba(0,0,0,0.6)]">
            
            <button 
              onClick={() => setIsGiftModalOpen(false)}
              className="absolute flex items-center justify-center w-10 h-10 text-2xl border rounded-full top-4 right-4 text-white/60 hover:text-white border-white/20 bg-black/20"
            >
              ✕
            </button>

            <h3 className="mt-4 mb-4 text-2xl font-black tracking-widest text-yellow-400 uppercase drop-shadow-md">
              XÁC NHẬN PHẦN THƯỞNG
            </h3>

            <div className="flex justify-center mb-4">
               <img src="https://i.ibb.co/fzs0c4j9/Thi-t-k-ch-a-c-t-n-1.png" alt="Móc khóa cá heo HTO" className="object-contain w-48 h-auto p-2 border rounded-xl bg-white/5 border-white/10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" />
            </div>

            <p className="mb-6 text-sm font-medium leading-relaxed text-white/90">
              Móc khóa Cá heo HTO Graduate. Chụp ảnh màn hình giao diện này và gửi bộ phận tư vấn để nhận.
            </p>

            <div className="p-4 mb-6 border bg-black/30 rounded-xl border-white/10">
              <p className="mb-1 text-xs font-bold tracking-widest uppercase text-cyan-200">Mã Nhận Quà</p>
              <p className="text-2xl font-black tracking-widest text-white">HTO-{score100}</p>
            </div>

            <button 
              onClick={() => setIsGiftModalOpen(false)}
              className="w-full py-3 text-sm font-black tracking-widest text-white uppercase transition-transform border rounded-full bg-white/10 border-white/20 hover:bg-white/20 active:scale-95"
            >
              Đóng
            </button>

          </div>
        </div>
      )}

    </div>
  );
};

export default Result;
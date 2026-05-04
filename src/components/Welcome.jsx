import React, { useState } from 'react';
import { getPhoneNumber, getAccessToken, getUserInfo, followOA } from "zmp-sdk/apis";
import { appConfig } from '../public/models/DataModel';

// Đã cập nhật sang API lấy SĐT mới
const BACKEND_URL = "https://api.hto.edu.vn/get-phone-new";
const OA_ID = "2112176407138597287";

const HITO_STICKERS = [
  { id: 1, src: "https://i.ibb.co/mrKmFPd0/sticker-hito-07-removebg-preview.png", className: "absolute top-4 left-4 w-16 h-16 md:w-20 md:h-20 animate-bounce rotate-[-12deg]" },
  { id: 2, src: "https://i.ibb.co/Bp593Dq/sticker-hito-11-removebg-preview.png", className: "absolute top-10 right-2 w-14 h-14 md:w-16 md:h-16 animate-pulse rotate-[15deg]" },
];

const Welcome = ({ onStart }) => {
  const [showTerms, setShowTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleMainStartClick = async () => {
    console.log("[ZaloSDK] Bắt đầu gọi API followOA - Chuẩn bị hiển thị menu/popup OA...");
    try {
      await followOA({ id: OA_ID });
      console.log("[ZaloSDK] Thành công: Popup OA đã hiển thị và xử lý xong.");
    } catch (e) {
      console.log("[ZaloSDK] Thất bại hoặc Bỏ qua: Không hiển thị được popup OA (Lý do: lỗi, từ chối, hoặc đã quan tâm):", e?.message || String(e));
    }
    setShowTerms(true);
  };

  const handleAgreeAndStart = async () => {
    setIsLoading(true);
    let userData = { fullName: '', phoneNumber: '' };

    try {
      console.log("🚀 [WELCOME] Đang khởi tạo lấy thông tin Zalo...");

      try {
        const info = await getUserInfo({ avatarType: "normal" });
        if (info.userInfo?.name) {
          userData.fullName = info.userInfo.name;
          console.log("✅ Lấy được tên:", userData.fullName);
        }
      } catch (err) {
        console.warn("⚠️ Không lấy được tên:", err);
      }

      try {
        const { token: phoneToken } = await getPhoneNumber();
        const accessToken = await getAccessToken({});

        const response = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ accessToken, code: phoneToken }),
        });
        
        const data = await response.json();

        // Áp dụng logic bóc tách SĐT linh hoạt mà bạn cung cấp
        let fetchedPhone =
          data?.phoneNumber ||
          data?.data?.number ||
          data?.data?.phone_number ||
          data?.number ||
          "";

        if (fetchedPhone) {
          // Vẫn giữ logic cũ: đổi đầu số 84 thành 0 cho thân thiện
          userData.phoneNumber = fetchedPhone.replace(/^84/, '0');          
          console.log("✅ Lấy SĐT thành công:", userData.phoneNumber);
        } else {
          console.warn("⚠️ Không tìm thấy SĐT trong dữ liệu trả về:", data);
        }
      } catch (err) {
        console.error("❌ Lỗi lấy SĐT (User từ chối hoặc lỗi mạng):", err);
      }

    } catch (error) {
      console.error("🔥 Lỗi hệ thống:", error);
    } finally {
      setIsLoading(false);
      setShowTerms(false);
      // Trả object có cả tên và SĐT về cho trang index.tsx
      onStart(userData); 
    }
  };

  return (
    <>
      <div className={`w-full max-w-lg text-center fade-in relative z-10 transition-all duration-500 pb-10 ${showTerms ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
        
        {HITO_STICKERS.map((sticker) => (
          <img 
            key={sticker.id}
            src={sticker.src}
            alt={`Hito Dolphin ${sticker.id}`}
            className={sticker.className}
          />
        ))}

        <div className="mb-6">
          <div className="flex flex-col items-center justify-center gap-4 mb-8">
            <div className="relative group">
              <div className="absolute inset-0 transition-opacity duration-500 opacity-40 bg-gradient-to-tr from-blue-400 to-yellow-300 rounded-3xl blur-xl group-hover:opacity-60 animate-pulse"></div>
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTm7HUnJUL6xrjaDLzRCuX52QsIenMbtVh9g&s" 
                alt="Hallo Saigon" 
                className="relative z-10 object-contain p-3 transition-all duration-500 bg-white shadow-2xl w-28 h-28 rounded-3xl group-hover:scale-110 group-hover:rotate-3 ring-4 ring-white/30" 
              />
            </div>
            <div className="flex flex-col items-center gap-2.5">
              <p className="text-sm font-bold tracking-wider text-white uppercase drop-shadow-md">
                Một sản phẩm thuộc về HTO GROUP
              </p>
              <a href="tel:18009078" className="flex items-center gap-2 px-5 py-2 text-sm font-bold text-white transition-all duration-300 border rounded-full shadow-lg bg-white/10 backdrop-blur-md border-white/30 hover:bg-white/20 hover:scale-105 hover:shadow-blue-500/30">
                <span className="text-base animate-bounce">📞</span> CSKH: 1800 9078
              </a>
            </div>
          </div>

          <h1 className="mb-3 text-4xl font-black leading-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-blue-50 drop-shadow-lg md:text-5xl">
            {appConfig.quiz_title}
          </h1>
          <p className="mb-8 text-base font-semibold text-white md:text-lg drop-shadow-md">
            {appConfig.quiz_subtitle}
          </p>

          {/* CẤU TRÚC BÀI KIỂM TRA */}
          <div className="relative p-5 mb-6 overflow-hidden border shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border-white/20">
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500 rounded-full opacity-30 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-500 rounded-full opacity-30 blur-3xl"></div>
            <p className="mb-4 text-xs font-bold tracking-widest text-white uppercase drop-shadow-md">Cấu trúc bài kiểm tra</p>
            <div className="relative z-10 grid grid-cols-2 gap-3">
              <div className="flex items-center gap-3 p-3 transition-colors border bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 hover:border-blue-400/50">
                <div className="flex items-center justify-center w-12 h-12 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-blue-500/30">
                  <img src="https://i.ibb.co/nqrmkvSf/image-removebg-preview.png" alt="Listening" className="object-contain w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white drop-shadow-sm">Listening</div>
                  <div className="text-xs text-white drop-shadow-sm">Nghe hiểu</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 transition-colors border bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 hover:border-green-400/50">
                <div className="flex items-center justify-center w-12 h-12 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-green-500/30">
                  <img src="https://i.ibb.co/CKqPDCGJ/unnamed-2-removebg-preview.png" alt="Reading" className="object-contain w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white drop-shadow-sm">Reading</div>
                  <div className="text-xs text-white drop-shadow-sm">Đọc hiểu</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 transition-colors border bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 hover:border-pink-400/50">
                <div className="flex items-center justify-center w-12 h-12 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-pink-500/30">
                  <img src="https://i.ibb.co/nMBrgbBX/unname3.png" alt="Vocabulary" className="object-contain w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white drop-shadow-sm">Vocabulary</div>
                  <div className="text-xs text-white drop-shadow-sm">Từ vựng</div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 transition-colors border bg-white/5 border-white/10 rounded-2xl hover:bg-white/10 hover:border-orange-400/50">
                <div className="flex items-center justify-center w-12 h-12 overflow-hidden shadow-lg bg-white/10 rounded-xl shadow-orange-500/30">
                  <img src="https://i.ibb.co/KprrXSSz/sticker-hito-16-removebg-preview.png" alt="Speaking" className="object-contain w-full h-full" />
                </div>
                <div className="text-left">
                  <div className="text-sm font-bold text-white drop-shadow-sm">Speaking</div>
                  <div className="text-xs text-white drop-shadow-sm">Phản xạ</div>
                </div>
              </div>
            </div>
          </div>

          {/* QUYỀN LỢI - KHI CHƠI SẼ ĐƯỢC GÌ? */}
          <div className="relative p-5 mb-6 overflow-hidden text-left border shadow-2xl bg-white/10 backdrop-blur-xl rounded-3xl border-white/20">
            <p className="mb-4 text-xs font-bold tracking-widest text-center text-white uppercase drop-shadow-md">Hoàn thành bài test, bạn được gì?</p>
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-start gap-3 p-3 border bg-white/5 border-white/10 rounded-2xl">
                <span className="flex items-center justify-center w-10 h-10 text-xl text-orange-300 rounded-full bg-orange-400/20 shrink-0">🎁</span>
                <div>
                  <h3 className="text-sm font-bold text-white drop-shadow-sm">Cơ hội quay thưởng</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Đạt điểm cao để mở khóa Vòng Quay May Mắn (Nhận quà HITO).</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 border bg-white/5 border-white/10 rounded-2xl">
                <span className="flex items-center justify-center w-10 h-10 text-xl text-green-300 rounded-full bg-green-400/20 shrink-0">📊</span>
                <div>
                  <h3 className="text-sm font-bold text-white drop-shadow-sm">Đánh giá Năng lực</h3>
                  <p className="text-xs text-blue-100 mt-0.5">Dự đoán trình độ tương đương IELTS/HSK và phân tích kỹ năng yếu bằng AI.</p>
                </div>
              </div>
            </div>
          </div>

          {/* LỘ TRÌNH VƯỢT ẢI */}
          <div className="relative p-5 mb-8 overflow-hidden text-left border shadow-2xl bg-black/20 backdrop-blur-xl rounded-3xl border-white/10">
            <p className="mb-4 text-xs font-bold tracking-widest text-center text-white uppercase drop-shadow-md">Lộ trình vượt ải</p>
            <div className="relative ml-4 space-y-5 border-l-2 border-white/20">
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-blue-400 border-4 border-blue-900 shadow-[0_0_8px_rgba(96,165,250,0.8)]"></div>
                <h3 className="text-sm font-bold text-white">1. Chuẩn bị</h3>
                <p className="mt-1 text-xs text-gray-300">Hệ thống trộn ngẫu nhiên các câu hỏi theo cấp độ.</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-orange-400 border-4 border-orange-900 shadow-[0_0_8px_rgba(251,146,60,0.8)]"></div>
                <h3 className="text-sm font-bold text-white">2. Trả lời thần tốc</h3>
                <p className="mt-1 text-xs text-gray-300">Mỗi câu hỏi có <span className="font-bold text-orange-300">15 giây</span>. Cần nhanh tay, lẹ mắt!</p>
              </div>
              <div className="relative pl-6">
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-green-400 border-4 border-green-900 shadow-[0_0_8px_rgba(74,222,128,0.8)]"></div>
                <h3 className="text-sm font-bold text-white">3. Nhận báo cáo & Quà</h3>
                <p className="mt-1 text-xs text-gray-300">Xem kết quả phân tích và chuyển sang Vòng Quay May Mắn.</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={handleMainStartClick} 
              className="relative w-full py-4 overflow-hidden text-xl font-black text-blue-900 transition-all duration-300 bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)] group rounded-2xl hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-blue-100 to-white group-hover:opacity-100"></div>
              <span className="relative z-10 flex items-center justify-center gap-3">
                <span>{appConfig.start_button_text}</span>
                <img src="https://i.ibb.co/fG98Gd8F/sticker-hito-02-removebg-preview.png" alt="Hito" className="w-8 h-8 transition-transform duration-300 md:w-10 md:h-10 group-hover:translate-x-2 group-hover:-translate-y-1" />
              </span>
            </button>
          </div>
        </div>
      </div>

      {showTerms && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 transition-opacity bg-slate-900/80 backdrop-blur-md"
            onClick={() => !isLoading && setShowTerms(false)}
          ></div>

          <div className="relative w-full max-w-md h-[80vh] flex flex-col bg-white shadow-2xl rounded-3xl animate-bounce-in overflow-hidden">
             <div className="px-6 py-4 bg-gradient-to-r from-blue-700 to-blue-500 shrink-0">
                <h3 className="flex items-center gap-2 text-lg font-bold text-white uppercase">
                    <span>🛡️</span> Chính sách & Bảo mật
                </h3>
             </div>

             <div className="flex-1 p-6 overflow-y-auto text-left bg-slate-50">
                <div className="space-y-4 prose-sm prose prose-blue text-slate-700">
                    <div className="p-3 border border-blue-200 rounded-lg bg-blue-50">
                        <p className="text-sm font-bold text-blue-800">
                            🔔 Thông báo: <span className="font-normal">Bằng việc nhấn "Đồng ý", bạn cho phép ứng dụng truy cập Tên và SĐT Zalo để tự động điền hồ sơ.</span>
                        </p>
                    </div>
                    <div>
                        <h4 className="mb-1 font-bold text-blue-800">1. Mục đích thu thập dữ liệu</h4>
                        <p className="mb-2 text-xs text-slate-500">Ứng dụng thu thập các thông tin bao gồm Họ tên, Số điện thoại và Email nhằm:</p>
                        <ul className="pl-5 space-y-1 text-xs list-disc">
                            <li>Xác thực danh tính người dùng khi sử dụng Mini App HT Đại Dương.</li>
                            <li>Cung cấp kết quả đánh giá năng lực ngoại ngữ.</li>
                            <li>Tư vấn lộ trình học tập và định hướng phù hợp cho người dùng.</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-1 font-bold text-blue-800">2. Phạm vi sử dụng thông tin</h4>
                        <p className="text-xs">
                            Thông tin cá nhân chỉ được sử dụng trong phạm vi nội bộ hệ thống của HT Đại Dương (Hallo Sài Gòn).
                            Chúng tôi cam kết <strong>không chia sẻ, mua bán hoặc cung cấp</strong> dữ liệu cho bên thứ ba khi chưa có sự đồng ý, trừ trường hợp pháp luật yêu cầu.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-1 font-bold text-blue-800">3. Lưu trữ và bảo mật</h4>
                        <p className="text-xs">
                            Dữ liệu được lưu trữ an toàn trên máy chủ của HT Đại Dương, được bảo vệ bằng các biện pháp kỹ thuật tiêu chuẩn nhằm ngăn chặn truy cập trái phép.
                        </p>
                    </div>

                    <div>
                        <h4 className="mb-1 font-bold text-blue-800">4. Quyền của người dùng</h4>
                        <ul className="pl-5 mb-2 space-y-1 text-xs list-disc">
                            <li>Kiểm tra và cập nhật thông tin cá nhân.</li>
                            <li>Yêu cầu chỉnh sửa hoặc xóa dữ liệu cá nhân.</li>
                            <li>Rút lại sự đồng ý cho phép xử lý dữ liệu.</li>
                        </ul>
                        <p className="text-[10px] italic text-slate-500">
                            * Người dùng có thể thực hiện quyền rút lại sự đồng ý qua giao diện quản lý của Zalo hoặc liên hệ HT Đại Dương.
                        </p>
                    </div>

                    <div className="p-3 border border-red-100 rounded-lg bg-red-50">
                        <h4 className="mb-1 font-bold text-red-600">5. Cam kết xóa dữ liệu</h4>
                        <p className="text-xs text-red-800">
                            Khi nhận yêu cầu từ Webhook Zalo, chúng tôi cam kết xóa toàn bộ dữ liệu người dùng trên hệ thống trong vòng <strong>24 giờ làm việc</strong> (trừ trường hợp pháp luật yêu cầu lưu trữ lâu hơn).
                        </p>
                    </div>

                    <div>
                         <h4 className="mb-1 font-bold text-blue-800">6. Điều khoản đồng ý</h4>
                         <p className="text-xs">
                            Khi nhấn nút <strong>“Đồng ý & Bắt đầu”</strong>, bạn xác nhận đã đọc, hiểu và đồng ý với Chính sách của HT Đại Dương.
                         </p>
                    </div>
                </div>
             </div>

             <div className="p-4 bg-white border-t border-slate-200 shrink-0 flex gap-3 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
                 <button 
                    disabled={isLoading}
                    onClick={() => setShowTerms(false)}
                    className="w-1/3 py-3 text-sm font-bold transition-colors bg-white border text-slate-500 border-slate-200 rounded-xl hover:bg-slate-50 disabled:opacity-50"
                 >
                    Không đồng ý
                 </button>
                 
                 <button 
                    onClick={handleAgreeAndStart}
                    disabled={isLoading}
                    className="flex items-center justify-center flex-1 gap-2 py-3 text-sm font-bold text-white transition-colors bg-blue-600 shadow-lg shadow-blue-500/30 rounded-xl hover:bg-blue-700 disabled:bg-blue-400"
                 >
                    {isLoading ? (
                        <>
                            <span className="w-5 h-5 border-2 border-white rounded-full border-t-transparent animate-spin"></span>
                            <span>Đang xử lý...</span>
                        </>
                    ) : (
                        <span>Đồng ý & Bắt đầu</span>
                    )}
                 </button>
             </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Welcome;
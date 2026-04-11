import React from 'react';

const LevelSelect = ({ onSelect }) => {
  const levels = [
    { code: 'easy', emoji: '🌱', title: 'Cơ Bản (Beginner)', sub: 'Dành cho người mới bắt đầu', color: 'green' },
    { code: 'medium', emoji: '🌿', title: 'Trung Cấp (Intermediate)', sub: 'Đã có kiến thức nền tảng', color: 'blue' },
    { code: 'hard', emoji: '🌳', title: 'Nâng Cao (Advanced)', sub: 'Thử thách chuyên sâu', color: 'red' },
  ];

  return (
    <div className="w-full max-w-md fade-in">
      <div className="p-6 bg-white shadow-2xl rounded-3xl md:p-8 card-3d">
        <div className="mb-6 text-center">
          <div className="inline-block mb-4">
            <span className="text-5xl">📊</span>
          </div>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">Chọn cấp độ</h2>
          <p className="text-gray-600">Hãy chọn trình độ phù hợp với bạn</p>
        </div>

        <div className="grid grid-cols-1 gap-4 mb-6">
          {levels.map((lvl) => (
            <button 
              key={lvl.code}
              onClick={() => onSelect(lvl.code)}
              className={`flex items-center w-full gap-3 p-4 transition-all border-2 border-gray-200 rounded-xl hover:border-${lvl.color}-500 hover:bg-${lvl.color}-50 group`}
            >
              <span className="text-2xl">{lvl.emoji}</span>
              <div className="text-left">
                <div className={`font-bold text-gray-700 group-hover:text-${lvl.color}-600`}>{lvl.title}</div>
                <div className="text-xs text-gray-500">{lvl.sub}</div>
              </div>
            </button>
          ))}
        </div>

        {/* Nút quay lại (Logic này có thể handle ở App.jsx hoặc bỏ qua nếu dùng ZMP Router back button) */}
        {/* <button className="w-full py-3 font-bold text-gray-500 transition-all rounded-2xl hover:bg-gray-100">
          ⬅️ Quay lại
        </button> */}
      </div>
    </div>
  );
};

export default LevelSelect;
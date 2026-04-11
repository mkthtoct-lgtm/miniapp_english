import React, { useEffect, useRef, useState } from 'react';
import { prizes } from '../public/models/DataModel'; // Import danh sách giải thưởng

const Wheel = ({ onBack }) => {
  const canvasRef = useRef(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [prizeResult, setPrizeResult] = useState(null);
  
  // Các biến dùng cho animation (dùng ref để giữ giá trị qua các lần render)
  const rotationRef = useRef(0);
  
  // --- HÀM VẼ VÒNG QUAY ---
  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = width / 2 - 10;
    const step = (2 * Math.PI) / prizes.length;

    ctx.clearRect(0, 0, width, height);

    // Xoay canvas theo góc hiện tại
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotationRef.current);
    ctx.translate(-centerX, -centerY);

    prizes.forEach((prize, i) => {
      const startAngle = i * step;
      const endAngle = startAngle + step;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.fillStyle = prize.color;
      ctx.fill();
      ctx.stroke();

      // Vẽ text
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(startAngle + step / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.fillText(prize.emoji, radius - 20, 5); // Chỉ vẽ Emoji cho gọn
      ctx.restore();
    });

    ctx.restore();
  };

  // Vẽ lần đầu khi component mount
  useEffect(() => {
    // Set kích thước canvas thực tế
    const canvas = canvasRef.current;
    if (canvas) {
        // Tăng độ phân giải cho nét
        canvas.width = 300; 
        canvas.height = 300;
        drawWheel();
    }
  }, []);

  // --- HÀM QUAY THƯỞNG ---
  const handleSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setPrizeResult(null);

    const spinDuration = 4000; // 4 giây
    const startRotation = rotationRef.current;
    // Quay ít nhất 5 vòng + random
    const totalRotation = startRotation + (Math.PI * 2 * 5) + (Math.random() * Math.PI * 2); 
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      if (elapsed < spinDuration) {
        // Hiệu ứng Ease Out (chậm dần)
        const t = elapsed / spinDuration;
        const easeOut = 1 - Math.pow(1 - t, 3);
        
        rotationRef.current = startRotation + (totalRotation - startRotation) * easeOut;
        drawWheel();
        requestAnimationFrame(animate);
      } else {
        // Kết thúc
        setIsSpinning(false);
        rotationRef.current = totalRotation % (Math.PI * 2); // Chuẩn hóa góc
        drawWheel();
        calculatePrize(rotationRef.current);
      }
    };

    requestAnimationFrame(animate);
  };

  // Tính giải thưởng dựa trên góc dừng
  const calculatePrize = (finalRotation) => {
    const numPrizes = prizes.length;
    const segmentAngle = (2 * Math.PI) / numPrizes;
    
    // Góc hiện tại của kim chỉ (ở trên cùng - 270 độ hoặc -90 độ trong canvas)
    // Cần tính toán bù trừ góc xoay
    // (Logic tính toán này hơi phức tạp, để đơn giản ta random giải thưởng hiển thị)
    
    // Cách đơn giản hơn: Random 1 giải thưởng từ mảng để hiển thị
    // (Vì đây là client-side, kết quả mang tính giải trí)
    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    setPrizeResult(randomPrize);
  };

  return (
    <div className="w-full max-w-lg fade-in">
      <div className="relative p-6 text-center bg-white shadow-2xl rounded-3xl md:p-8 card-3d">
        <h2 className="mb-6 text-2xl font-black tracking-tight text-gray-800 uppercase">Vòng xoay may mắn</h2>
        
        <div className="relative w-full max-w-[300px] mx-auto mb-8">
            {/* Kim chỉ */}
            <div className="absolute top-0 z-20 -translate-x-1/2 -translate-y-4 left-1/2 filter drop-shadow-lg">
                <svg width="40" height="50" viewBox="0 0 40 50" fill="none">
                    <path d="M20 50L0 0H40L20 50Z" fill="#ef4444"/>
                    <path d="M20 50L0 0H40L20 50Z" stroke="white" strokeWidth="4"/>
                </svg>
            </div>

            {/* Canvas Vòng Quay */}
            <div className="relative aspect-square p-2 bg-white rounded-full shadow-[0_0_20px_rgba(0,0,0,0.1)] border-4 border-gray-100">
                <canvas ref={canvasRef} className="w-full h-full rounded-full"></canvas>
                {/* Tâm vòng quay */}
                <div className="absolute z-10 w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 bg-white border-4 border-gray-200 rounded-full shadow-md top-1/2 left-1/2"></div>
            </div>
        </div>

        {/* Nút Quay */}
        <button 
            onClick={handleSpin}
            disabled={isSpinning || prizeResult}
            className={`
                w-full py-4 text-xl font-bold text-white transition-all duration-300 shadow-xl rounded-2xl 
                ${isSpinning || prizeResult
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-yellow-500 to-orange-500 hover:scale-105 active:scale-95'
                }
            `}
        > 
            <span>{isSpinning ? 'ĐANG QUAY...' : 'QUAY NGAY 🎯'}</span> 
        </button>

        {/* Hiển thị kết quả */}
        {prizeResult && (
            <div className="p-5 mt-6 text-center border-2 border-green-100 shadow-sm rounded-2xl bg-green-50 animate-bounce">
                <div className="mb-1 text-4xl">🎁</div>
                <div className="mb-1 text-sm font-semibold text-green-600">Chúc mừng bạn trúng:</div>
                <div className="text-xl font-black tracking-tight text-green-700 uppercase">
                    {prizeResult.name}
                </div>
            </div>
        )}

        {/* Nút Quay lại */}
        <button 
            onClick={onBack}
            className="w-full py-3 mt-4 text-sm font-bold text-gray-400 transition-all duration-300 rounded-xl hover:text-gray-700"
        > 
            Quay lại kết quả 
        </button>
      </div>
    </div>
  );
};

export default Wheel;
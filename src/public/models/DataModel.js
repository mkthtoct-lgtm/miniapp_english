// src/models/DataModel.js

// ============================================================
// 1. CẤU HÌNH APP (CONFIG)
// ============================================================
export const appConfig = {
    quiz_title: 'Global Citizen Challenge',
    quiz_subtitle: 'Kiểm tra trình độ chuẩn quốc tế: IELTS - TOPIK - HSK - JLPT',
    start_button_text: 'Bắt Đầu Test Ngay',
    consent_text: 'Tôi đồng ý cung cấp thông tin để nhận lộ trình du học phù hợp',
    congratulations_text: 'Xuất sắc! Bạn đã mở khóa học bổng du học!',
    background_color: '#1e3a8a',
    card_color: '#ffffff',
    text_color: '#1f2937',
    primary_action_color: '#2563eb',
    font_family: 'Be Vietnam Pro',
    questions_per_turn: 20// Số câu hỏi lấy ra mỗi lần chơi
};

// ============================================================
// 2. DANH SÁCH GIẢI THƯỞNG (Vòng quay may mắn)
// ============================================================
export const prizes = [
    { name: 'Giảm 10% Phí Tư Vấn', color: '#FF6B6B', emoji: '💰' },
    { name: 'Sách Cẩm Nang Du Học', color: '#4ECDC4', emoji: '📚' },
    { name: 'Voucher Hồ Sơ $20', color: '#FFD93D', emoji: '🎫' },
    { name: 'Gói Tư Vấn Cao Cấp', color: '#95E1D3', emoji: '⭐' },
    { name: 'Cẩm Nang Chọn Trường', color: '#F38181', emoji: '🎓' },
    { name: 'Ưu Đãi Làm Visa', color: '#AA96DA', emoji: '✈️' },
    { name: 'Voucher Tài Liệu $50', color: '#FCBAD3', emoji: '🎁' },
    { name: 'Tư Vấn 1-1 Hướng Nghiệp', color: '#A8D8EA', emoji: '💼' }
];

// ============================================================
// 3. NGÂN HÀNG CÂU HỎI (DATA - ĐÃ BỔ SUNG ĐẦY ĐỦ)
// ============================================================
const questionsData = {
    // --- TIẾNG ANH (IELTS Foundation) ---
    en: {
        easy: [
            { type: 'multiple', category: 'GRAMMAR', question: 'I ___ a student.', options: ['is', 'are', 'am', 'be'], correct: 2 },
            { type: 'multiple', category: 'GRAMMAR', question: 'She ___ to school everyday.', options: ['go', 'goes', 'going', 'went'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Which animal says "Meow"?', options: ['Dog', 'Cat', 'Cow', 'Pig'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Listen and choose the number:', audioScript: 'Twenty-five', langCode: 'en-US', options: ['15', '25', '35', '55'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Điền từ còn thiếu: G__d M__ning (Chào buổi sáng)', correctAnswer: 'Good Morning' },
            { type: 'multiple', category: 'NUMBERS', question: 'Five + Seven = ?', options: ['Eleven', 'Twelve', 'Thirteen', 'Ten'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'They ___ playing football now.', options: ['is', 'am', 'are', 'be'], correct: 2 },
            { type: 'writing', category: 'VOCABULARY', question: 'Trái nghĩa với "Hot" là "C..."', correctAnswer: 'Cold' },
            { type: 'listening', category: 'LISTENING', question: 'What color is mentioned?', audioScript: 'My favorite color is Blue.', langCode: 'en-US', options: ['Red', 'Blue', 'Green', 'Yellow'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'We sleep in the ___.', options: ['Kitchen', 'Bathroom', 'Bedroom', 'Garage'], correct: 2 },
            { type: 'multiple', category: 'GRAMMAR', question: '___ do you live?', options: ['What', 'Who', 'Where', 'When'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Apple is a ___.', options: ['Fruit', 'Vegetable', 'Meat', 'Drink'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Yesterday, I ___ to the park.', options: ['go', 'goes', 'went', 'gone'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: 'My mother’s sister is my ___.', options: ['uncle', 'aunt', 'cousin', 'niece'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Which direction?', audioScript: 'Turn left at the traffic light.', langCode: 'en-US', options: ['Go straight', 'Turn right', 'Turn left', 'Stop'], correct: 2 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết số 12 bằng chữ: T...', correctAnswer: 'Twelve' },
            { type: 'multiple', category: 'GRAMMAR', question: 'He is ___ than his brother.', options: ['tall', 'taller', 'tallest', 'more tall'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'We eat breakfast in the ___.', options: ['morning', 'afternoon', 'evening', 'night'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Can you ___ swim?', options: ['to', 'ing', '(no word)', 'at'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'How is the weather?', audioScript: "It's rainy today.", langCode: 'en-US', options: ['Sunny', 'Rainy', 'Cloudy', 'Snowy'], correct: 1 }
        ],
        medium: [
            { type: 'multiple', category: 'GRAMMAR', question: 'I have lived here ___ 2010.', options: ['since', 'for', 'in', 'at'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Synonym of "Happy"?', options: ['Sad', 'Angry', 'Joyful', 'Tired'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Listen and choose the word:', audioScript: 'University', langCode: 'en-US', options: ['Universal', 'University', 'Universe', 'Unity'], correct: 1 },
            { type: 'writing', category: 'GRAMMAR', question: 'Chia động từ: If I (be) ___ you, I would go.', correctAnswer: 'were' },
            { type: 'multiple', category: 'VOCABULARY', question: 'The flight takes ___ at 9:00 PM.', options: ['off', 'up', 'on', 'in'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Unless you hurry, you ___ the bus.', options: ['will miss', 'miss', 'missed', 'missing'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'He is responsible ___ the sales department.', options: ['of', 'for', 'to', 'in'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Past participle of "Buy" is "B..."', correctAnswer: 'Bought' },
            { type: 'listening', category: 'LISTENING', question: 'What does it mean?', audioScript: 'We are out of stock.', langCode: 'en-US', options: ['Full stock', 'No items left', 'Discount', 'New items'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'If I ___ you, I would accept the offer.', options: ['was', 'were', 'am', 'been'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'The meeting was called ___ due to bad weather.', options: ['in', 'out', 'off', 'up'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Where is the speaker?', audioScript: 'Can I have the check, please?', langCode: 'en-US', options: ['Park', 'School', 'Restaurant', 'Gym'], correct: 2 },
            { type: 'writing', category: 'VOCABULARY', question: 'Complete idiom: "Piece of ..."', correctAnswer: 'Cake' },
            { type: 'multiple', category: 'GRAMMAR', question: 'She suggests ___ a new plan.', options: ['create', 'to create', 'creating', 'created'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: 'A person who flies a plane is a ___.', options: ['driver', 'pilot', 'sailor', 'artist'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'This house ___ in 1990.', options: ['built', 'was built', 'is built', 'has built'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Context?', audioScript: "I'd like to book a flight to Paris.", langCode: 'en-US', options: ['Hotel', 'Restaurant', 'Airport', 'Hospital'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Please ___ your shoes before entering.', options: ['take off', 'put on', 'get up', 'look for'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'I look forward to ___ from you.', options: ['hear', 'hearing', 'heard', 'hears'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Noun form of "Happy" is "Happi..."', correctAnswer: 'Happiness' }
        ],
        hard: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Scarcely had he entered the room ___ the phone rang.', options: ['than', 'when', 'then', 'after'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'What does "break the ice" mean?', options: ['To destroy ice', 'To start a conversation', 'To drink water', 'To feel cold'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Listen to the idiom:', audioScript: 'Piece of cake', langCode: 'en-US', options: ['Very easy', 'Very delicious', 'Very hard', 'A real cake'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'The contract is ___ upon signature.', options: ['binding', 'bounding', 'bending', 'biding'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'It is essential that he ___ informed immediately.', options: ['be', 'is', 'was', 'were'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Synonym of "Decrease" starting with D.', correctAnswer: 'Diminish' },
            { type: 'listening', category: 'LISTENING', question: 'Status of the merger?', audioScript: 'The merger has been called off indefinitely.', langCode: 'en-US', options: ['Completed', 'Delayed', 'Cancelled', 'Started'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: 'His explanation was completely ___ .', options: ['plausible', 'plastic', 'plentiful', 'playful'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '___ he been more careful, the accident wouldn\'t have happened.', options: ['Has', 'Had', 'If', 'Should'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Idiom: "Don\'t judge a book by its ..."', correctAnswer: 'Cover' },
            { type: 'listening', category: 'LISTENING', question: 'Meaning?', audioScript: "He's always pulling my leg.", langCode: 'en-US', options: ['Hurting me', 'Joking', 'Massage', 'Helping'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'The board of directors ___ the proposal yesterday.', options: ['approve', 'approved', 'approves', 'approving'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'The sudden change in policy caught everyone off ___ .', options: ['guard', 'hand', 'foot', 'balance'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Not until the movie ended ___ realize he had lost his keys.', options: ['he did', 'did he', 'he was', 'was he'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'She has a ___ for learning languages.', options: ['knack', 'knock', 'knee', 'knot'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Meaning of "ubiquitous"?', audioScript: 'The ubiquitous nature of smartphones.', langCode: 'en-US', options: ['Rare', 'Expensive', 'Everywhere', 'Dangerous'], correct: 2 },
            { type: 'multiple', category: 'GRAMMAR', question: 'I’d rather you ___ smoke in here.', options: ['don\'t', 'didn\'t', 'won\'t', 'not'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'A person who studies rocks is a "Geo..."', correctAnswer: 'Geologist' },
            { type: 'multiple', category: 'VOCABULARY', question: 'The company is on the ___ of bankruptcy.', options: ['edge', 'verge', 'rim', 'side'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Only by working hard ___ achieve your goals.', options: ['you can', 'can you', 'you will', 'will you'], correct: 1 }
        ]
    },

    // --- TIẾNG TRUNG (HSK) ---
    zh: {
        easy: [
            { type: 'multiple', category: 'VOCABULARY', question: '你好 (Nǐ hǎo) nghĩa là gì?', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'multiple', category: 'NUMBERS', question: 'Số 8 trong tiếng Trung là?', options: ['七 (Qī)', '八 (Bā)', '九 (Jiǔ)', '十 (Shí)'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Nghe và chọn từ đúng:', audioScript: 'Xièxiè', langCode: 'zh-CN', options: ['Chào', 'Cảm ơn', 'Đi', 'Ăn'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết phiên âm Pinyin của "Wo" (Tôi):', correctAnswer: 'wo' },
            { type: 'multiple', category: 'VOCABULARY', question: '“再见” (Zàijiàn) nghĩa là?', options: ['Xin chào', 'Tạm biệt', 'Cảm ơn', 'Xin lỗi'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '我 ___ 越南人。 (Tôi LÀ người VN)', options: ['是 (shì)', '有 (yǒu)', '在 (zài)', '去 (qù)'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Mấy giờ?', audioScript: '现在是九点。', langCode: 'zh-CN', options: ['8:00', '9:00', '10:00', '7:00'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '“爸爸” (Bàba) là ai?', options: ['Mẹ', 'Bố', 'Anh trai', 'Em gái'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '他 ___ 哪儿？ (Anh ấy Ở đâu?)', options: ['去', '在', '是', '有'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '“明天” (Míngtiān) là khi nào?', options: ['Hôm qua', 'Hôm nay', 'Ngày mai', 'Năm sau'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Thích ăn gì?', audioScript: '我喜欢吃苹果。', langCode: 'zh-CN', options: ['Chuối', 'Táo', 'Cam', 'Nho'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '这是___的书？(Sách CỦA ai)', options: ['什么', '谁', '哪', '几'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '“高兴” (Gāoxìng) nghĩa là gì?', options: ['Buồn', 'Vui vẻ', 'Tức giận', 'Mệt'], correct: 1 },
            { type: 'multiple', category: 'NUMBERS', question: 'Số 10 tiếng Trung?', options: ['八 (Bā)', '九 (Jiǔ)', '十 (Shí)', '七 (Qī)'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Người nói đang làm gì?', audioScript: '他对不起。', langCode: 'zh-CN', options: ['Cảm ơn', 'Xin lỗi', 'Tạm biệt', 'Chúc mừng'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết chữ Hán số 5.', correctAnswer: '五' },
            { type: 'multiple', category: 'GRAMMAR', question: '你___吗？ (Bạn bận KHÔNG)', options: ['不', '没', '吗', '呢'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: '“学校” (Xuéxiào) là gì?', options: ['Bệnh viện', 'Trường học', 'Nhà hàng', 'Công ty'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '我有___个姐姐。 (Ba - Số lượng)', options: ['三', '第三', '三十', '十三'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Điền từ: 中国 (Trung ...)', correctAnswer: 'quoc' }
        ],
        medium: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Chọn lượng từ đúng: 一___书 (Một quyển sách)', options: ['个 (gè)', '本 (běn)', '只 (zhī)', '条 (tiáo)'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Từ nào trái nghĩa với "大" (To)?', options: ['多', '少', '小', '高'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Nghe giờ:', audioScript: 'Liǎng diǎn', langCode: 'zh-CN', options: ['12:00', '2:00', '10:00', '6:00'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '你 ___ 去哪儿？ (Bạn MUỐN đi đâu)', options: ['想', '喜欢', '爱', '看'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '他一边吃饭，___看电视。', options: ['一边', '一起', '一直', '一旦'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '服务员，请给我一___水。', options: ['杯', '本', '个', '只'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '虽然今天下雨，___他还是来了。', options: ['所以', '但是', '因为', '而且'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Hướng dẫn?', audioScript: '前面左转就到了。', langCode: 'zh-CN', options: ['Đi thẳng', 'Rẽ trái', 'Rẽ phải', 'Quay lại'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết chữ Hán: "Bắc Kinh" (Běijīng).', correctAnswer: '北京' },
            { type: 'multiple', category: 'VOCABULARY', question: '请把护照和机票___给我。', options: ['出示', '出现', '出发', '出来'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '这本书我___看完了。 (Bổ ngữ kết quả)', options: ['已经', '正在', '一边', '就'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Thời tiết?', audioScript: '今天太热了。', langCode: 'zh-CN', options: ['Lạnh', 'Mát', 'Nóng', 'Mưa'], correct: 2 },
            { type: 'writing', category: 'VOCABULARY', question: 'Điền từ: 因___ (Bởi vì - yīnwèi).', correctAnswer: '为' },
            { type: 'multiple', category: 'GRAMMAR', question: '除了英语以外，他___会说法语。', options: ['都', '还', '就', '才'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '我对中国的历史很感___。 (Hứng thú)', options: ['兴趣', '有趣', '爱好', '意思'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '这件衣服___便宜___好看。', options: ['又...又', '虽然...但是', '因为...所以', '不但...而且'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Hành động?', audioScript: '这件衣服有点儿贵，能不能便宜一点？', langCode: 'zh-CN', options: ['Mua', 'Mặc cả', 'Trả lại', 'Thử đồ'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '我们要___保护环境。', options: ['注意', '愿意', '满意', '同意'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '你看___那个穿红裙子的女孩了吗？ (Bổ ngữ)', options: ['见', '看', '视', '望'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Dịp nào?', audioScript: '祝你生日快乐。', langCode: 'zh-CN', options: ['Năm mới', 'Sinh nhật', 'Giáng sinh', 'Tốt nghiệp'], correct: 1 }
        ],
        hard: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Câu chữ "把" (Bǎ): 我把苹果___。', options: ['吃了', '吃饭', '去', '好'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Điền từ: Běijīng (Thủ đô TQ)', correctAnswer: 'Beijing' },
            { type: 'multiple', category: 'VOCABULARY', question: '这次考试对他来说是小菜一___。 (Dễ như ăn bánh)', options: ['盘', '碟', '碗', '杯'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '___下雨，我们也要去。', options: ['即使', '虽然', '但是', '因为'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '由于天气原因，航班被___了。', options: ['取消', '举行', '开始', '结束'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '与其在家里睡觉，___出去走走。', options: ['不如', '不然', '不过', '不只'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '我们需要___解决这个问题。', options: ['彻底', '到底', '根本', '基本'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Thành ngữ: "Mã đáo thành..." (Viết chữ Hán)', correctAnswer: '功' },
            { type: 'listening', category: 'LISTENING', question: 'Ý kiến?', audioScript: '在这个问题上，我们的看法是一致的。', langCode: 'zh-CN', options: ['Khác nhau', 'Giống nhau', 'Đối lập', 'Không rõ'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '无论发生什么，我___支持你。', options: ['都', '却', '才', '就'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Thái độ?', audioScript: '不论发生什么，我都支持你。', langCode: 'zh-CN', options: ['Phản đối', 'Ủng hộ', 'Thờ ơ', 'Lo lắng'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết từ: "Kinh tế" (Jīngjì)', correctAnswer: '经济' },
            { type: 'multiple', category: 'VOCABULARY', question: '他的表现让大家感到非常___。 (Ngạc nhiên)', options: ['惊讶', '害怕', '生气', '高兴'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '既然你已经决定了，___就别后悔。', options: ['那么', '但是', '所以', '而且'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '我们要养成良好的生活___。', options: ['习惯', '惯例', '习俗', '风俗'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Hiện tượng này?', audioScript: '这种现象在现代社会非常普遍。', langCode: 'zh-CN', options: ['Hiếm', 'Phổ biến', 'Kỳ lạ', 'Mới'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '不但...而且... biểu thị quan hệ gì?', options: ['Chuyển ý', 'Tăng tiến', 'Nguyên nhân', 'Điều kiện'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '随着科技的发展，人们的生活发生了巨大的___。', options: ['变化', '变成', '变动', '变通'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Thành ngữ: "Nhập gia tùy..." (Súi)', correctAnswer: '俗' },
            { type: 'multiple', category: 'GRAMMAR', question: '只有努力学习，___能取得好成绩。', options: ['才', '就', '都', '也'], correct: 0 }
        ]
    },

    // --- TIẾNG HÀN (TOPIK) ---
    kr: {
        easy: [
            { type: 'multiple', category: 'GREETING', question: '안녕하세요 (Annyeonghaseyo) là gì?', options: ['Xin lỗi', 'Cảm ơn', 'Xin chào', 'Tạm biệt'], correct: 2 },
            { type: 'multiple', category: 'VOCABULARY', question: '사과 (Sagwa) nghĩa là?', options: ['Táo', 'Nho', 'Dưa hấu', 'Cam'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Nghe từ vựng:', audioScript: 'Gamsahamnida', langCode: 'ko-KR', options: ['Xin lỗi', 'Cảm ơn', 'Yêu', 'Ghét'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '저는 학생___ (Là học sinh).', options: ['입니다', '입니까', '이', '가'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“가다” (Gada) nghĩa là?', options: ['Đi', 'Đến', 'Ăn', 'Ngủ'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '이것___ 무엇입니까? (Cái này LÀ cái gì?)', options: ['은', '을', '도', '로'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Số 1 (Thuần Hàn)?', options: ['하나 (Hana)', '둘 (Dul)', '셋 (Set)', '일 (Il)'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Kimchi" bằng tiếng Hàn.', correctAnswer: '김치' },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Sữa" (Uyu) bằng tiếng Hàn.', correctAnswer: '우유' },
            { type: 'listening', category: 'LISTENING', question: 'Tình huống?', audioScript: '안녕히 가세요.', langCode: 'ko-KR', options: ['Gặp mặt', 'Tạm biệt (Người ở lại nói)', 'Tạm biệt (Người đi nói)', 'Xin lỗi'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Muốn gì?', audioScript: '물 주세요.', langCode: 'ko-KR', options: ['Cơm', 'Nước', 'Rượu', 'Kim chi'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '“학교” (Hakgyo) nghĩa là?', options: ['Bệnh viện', 'Trường học', 'Nhà', 'Công ty'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '어디에 ___? (Đi đâu)', options: ['가요', '봐요', '사요', '먹어요'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“감사합니다” dùng khi nào?', options: ['Xin lỗi', 'Cảm ơn', 'Chào hỏi', 'Ngủ'], correct: 1 },
            { type: 'multiple', category: 'NUMBERS', question: 'Số 2 (Hán Hàn)?', options: ['일', '이', '삼', '사'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Hỏi về?', audioScript: '이름이 뭐예요?', langCode: 'ko-KR', options: ['Tên', 'Tuổi', 'Nghề nghiệp', 'Quốc tịch'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Mẹ" (Eomma).', correctAnswer: '엄마' },
            { type: 'multiple', category: 'GRAMMAR', question: '무엇을 ___? (Làm gì)', options: ['해요', '가요', '와요', '자요'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“친구” (Chingu) là ai?', options: ['Bạn bè', 'Gia đình', 'Thầy giáo', 'Bác sĩ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Cảm xúc?', audioScript: '사랑해요.', langCode: 'ko-KR', options: ['Ghét', 'Yêu', 'Sợ', 'Buồn'], correct: 1 }
        ],
        medium: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Trợ từ chủ ngữ là?', options: ['을/를', '이/가', '에', '에서'], correct: 1 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết phiên âm Romanji của "김치" (Món ăn HQ)', correctAnswer: 'kimchi' },
            { type: 'multiple', category: 'GRAMMAR', question: '밥을 ___ (Ăn - Quá khứ).', options: ['먹어요', '먹었습니다', '먹을 거예요', '먹고'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '친구를 ___ (Gặp).', options: ['만납니다', '마십니다', '봅니다', '갑니다'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '비가 ___ 우산을 씁니다. (Vì...nên)', options: ['오고', '와서', '오지만', '오면'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '병원에 ___ (Đi đến bệnh viện).', options: ['가요', '봐요', '사요', '입어요'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '영화를 ___ 싶어요. (Muốn)', options: ['보고', '보', '봐', '봅'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết đuôi câu kính trọng của "하다" -> "합..."', correctAnswer: '니다' },
            { type: 'writing', category: 'VOCABULARY', question: 'Điền từ: "Hàn..." (Quốc - Hanguk)', correctAnswer: '국' },
            { type: 'listening', category: 'LISTENING', question: 'Địa điểm?', audioScript: '어디 아프세요?', langCode: 'ko-KR', options: ['Trường học', 'Bệnh viện', 'Nhà hàng', 'Công viên'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Hỏi về?', audioScript: '몇 시에 만날까요?', langCode: 'ko-KR', options: ['Địa điểm', 'Thời gian', 'Giá tiền', 'Phương tiện'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '제주도에 ___ 적이 있어요. (Đã từng)', options: ['가 본', '가는', '갈', '가서'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '시험에 ___ 기분이 좋아요. (Đỗ)', options: ['합격해서', '떨어져서', '실패해서', '공부해서'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '밥을 먹는 ___ 전화를 받았어요. (Trong khi)', options: ['동안', '후에', '전에', '때'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Khi nào nói?', audioScript: '맛있게 드세요.', langCode: 'ko-KR', options: ['Trước khi ăn', 'Sau khi ăn', 'Khi ngủ', 'Khi đi làm'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '주말에 보통 ___ 해요? (Làm gì)', options: ['무엇을', '어디를', '누구를', '언제를'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '날씨가 ___ 같아요. (Có vẻ lạnh)', options: ['추울 것', '춥', '추운', '추워서'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '매일 운동을 ___ 건강해져요. (Nếu)', options: ['하면', '해서', '하고', '하지만'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Quá khứ của "가다" (đã đi) -> "갔..."', correctAnswer: '어요' },
            { type: 'multiple', category: 'GRAMMAR', question: '한국어를 ___ 어렵지 않아요. (Học thì)', options: ['배우면', '배워서', '배우고', '배우지만'], correct: 0 }
        ],
        hard: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Cấu trúc "Đang làm gì" là?', options: ['-고 싶다', '-고 있다', '-ㄹ 수 있다', '-지 않다'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '비가 ___ 우산을 썼어요.', options: ['와서', '오면', '오지만', '오려고'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '한국에 ___ 적이 있어요. (Đã từng)', options: ['가 본', '가는', '갈', '가서'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '회의가 ___되었습니다. (Bị hủy)', options: ['취소', '시작', '계속', '예약'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '아무리 ___ 성공할 수 없어요. (Dù cố gắng)', options: ['노력해도', '노력해서', '노력하면', '노력하고'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '환경 ___을 해야 합니다. (Bảo vệ)', options: ['보호', '오염', '개발', '파괴'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '친구가 올 ___ 기다렸어요. (Đến khi)', options: ['때까지', '때문에', '때', '면서'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết: "Cảm ơn" (Gomawo - Bạn bè)', correctAnswer: '고마워' },
            { type: 'writing', category: 'VOCABULARY', question: 'Thủ đô Hàn Quốc: "Seo..."', correctAnswer: '울' },
            { type: 'listening', category: 'LISTENING', question: 'Yêu cầu?', audioScript: '잠시만 기다려 주십시오.', langCode: 'ko-KR', options: ['Đi ngay', 'Chờ một chút', 'Nói to lên', 'Im lặng'], correct: 1 },
            { type: 'listening', category: 'LISTENING', question: 'Vấn đề?', audioScript: '전화번호를 잘못 누르셨습니다.', langCode: 'ko-KR', options: ['Nhầm số', 'Hết pin', 'Mất sóng', 'Hỏng máy'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý kiến?', audioScript: '제 생각에는 반대입니다.', langCode: 'ko-KR', options: ['Đồng ý', 'Phản đối', 'Không biết', 'Thắc mắc'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: '그 사람은 알면 ___ 좋은 사람이에요. (Càng...càng)', options: ['알수록', '알니까', '알지만', '알려고'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '스트레스를 ___ 합니다. (Giải tỏa)', options: ['해소해야', '받아야', '주어야', '쌓아야'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '비가 올 ___ 우산을 가져가세요. (Phòng khi)', options: ['까 봐', '줄 알았다', '수 있다', '지 모른다'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '경제 ___이 중요합니다. (Phát triển)', options: ['발전', '발생', '발견', '발명'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '공부하___ 잠이 들었어요. (Đang...thì)', options: ['다가', '면서', '자마자', '고'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Kính ngữ của "Ăn" (Meokda) -> "Deu..."', correctAnswer: 'sida' },
            { type: 'listening', category: 'LISTENING', question: 'Tính cách?', audioScript: '성격이 활발한 편이에요.', langCode: 'ko-KR', options: ['Hoạt bát', 'Trầm tính', 'Nóng nảy', 'Lười biếng'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '바쁘실 ___ 참석해 주셔서 감사합니다. (Tuy...nhưng)', options: ['텐데', '테니까', '테지만', '텐데요'], correct: 0 }
        ]
    },
    
    // --- TIẾNG ĐỨC (Goethe) ---
    de: {
        easy: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Giống của từ "Auto" (Ô tô)?', options: ['Der', 'Die', 'Das', 'Den'], correct: 2 },
            { type: 'listening', category: 'LISTENING', question: 'Nghe số đếm:', audioScript: 'Zehn', langCode: 'de-DE', options: ['5', '8', '10', '12'], correct: 2 },
            { type: 'writing', category: 'GREETING', question: 'Điền từ: G_ten Tag', correctAnswer: 'Guten' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Ich ___ aus Vietnam.', options: ['komme', 'kommt', 'kommen', 'kam'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“Guten Morgen” nghĩa là?', options: ['Chào buổi sáng', 'Chào buổi tối', 'Chúc ngủ ngon', 'Tạm biệt'], correct: 0 },
            { type: 'multiple', category: 'NUMBERS', question: 'Eins, Zwei, ___', options: ['Drei', 'Vier', 'Fünf', 'Sechs'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Das ist ___ Auto.', options: ['ein', 'eine', 'einen', 'einer'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Wasser ist ___.', options: ['Blau', 'Rot', 'Gelb', 'Grün'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Er ___ Fußball.', options: ['spielt', 'spielen', 'spiele', 'spielst'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Ja oder ___ (Yes or No)', correctAnswer: 'nein' },
            { type: 'writing', category: 'VOCABULARY', question: 'Danke ___ (Thank you very much)', correctAnswer: 'schon' },
            { type: 'listening', category: 'LISTENING', question: 'Tên cô ấy?', audioScript: 'Mein Name ist Lisa.', langCode: 'de-DE', options: ['Lisa', 'Lena', 'Laura', 'Lara'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: 'Auf Wiedersehen!', langCode: 'de-DE', options: ['Xin chào', 'Hẹn gặp lại', 'Xin lỗi', 'Cảm ơn'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Wir ___ Deutsch.', options: ['lernen', 'lernt', 'lernst', 'lerne'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Der Apfel ist ___. (Đỏ)', options: ['rot', 'blau', 'grün', 'gelb'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Hast du ___ Bruder?', options: ['einen', 'ein', 'eine', 'einem'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“Mutter” nghĩa là?', options: ['Mẹ', 'Bố', 'Anh', 'Chị'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Sống ở đâu?', audioScript: 'Ich wohne in Berlin.', langCode: 'de-DE', options: ['Berlin', 'Munich', 'Hamburg', 'Frankfurt'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Số 10 trong tiếng Đức?', correctAnswer: 'zehn' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Sie ___ sehr nett.', options: ['ist', 'sind', 'seid', 'bin'], correct: 0 }
        ],
        medium: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Ich komme ___ Vietnam.', options: ['aus', 'in', 'nach', 'zu'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Ich habe das Buch ___. (đã đọc)', options: ['gelesen', 'lese', 'liest', 'las'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Wir fahren mit dem ___. (Tàu hỏa)', options: ['Zug', 'Auto', 'Flugzeug', 'Fahrrad'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Weil es regnet, ___ ich zu Hause.', options: ['bleibe', 'bleiben', 'geblieben', 'bleibst'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Ich gehe zum ___. (Bác sĩ)', options: ['Arzt', 'Lehrer', 'Bäcker', 'Fahrer'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Das ist der Mann, ___ ich gesehen habe.', options: ['den', 'der', 'dem', 'des'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Ich möchte ein Konto ___.', options: ['eröffnen', 'machen', 'tun', 'schließen'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Thủ đô Đức: B...', correctAnswer: 'berlin' },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết số 100 (Hundert)', correctAnswer: 'hundert' },
            { type: 'listening', category: 'LISTENING', question: 'Đang ở đâu?', audioScript: 'Ein Bier, bitte.', langCode: 'de-DE', options: ['Quán bar/nhà hàng', 'Trường học', 'Bệnh viện', 'Nhà thờ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Hỏi về?', audioScript: 'Wie spät ist es?', langCode: 'de-DE', options: ['Giờ', 'Tiền', 'Tuổi', 'Tên'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Wenn ich Zeit habe, ___ ich dich.', options: ['besuche', 'besuchen', 'besucht', 'besuchst'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Kannst du mir helfen? Ich habe ein ___.', options: ['Problem', 'Glück', 'Spaß', 'Witz'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Ich interessiere mich ___ Musik.', options: ['für', 'über', 'an', 'auf'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Der Zug hat ___ . (Trễ)', options: ['Verspätung', 'Pünktlichkeit', 'Zeit', 'Pause'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Muốn gì?', audioScript: 'Ich hätte gern das Menü.', langCode: 'de-DE', options: ['Thực đơn', 'Thanh toán', 'Nước', 'Bàn'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Cảm ơn" (Danke).', correctAnswer: 'danke' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Obwohl er krank ist, ___ er zur Arbeit.', options: ['geht', 'gehen', 'ging', 'gegangen'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Am Wochenende gehe ich ins ___ .', options: ['Kino', 'Arbeit', 'Schule', 'Büro'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Das Auto, ___ dort steht, ist neu.', options: ['das', 'der', 'die', 'den'], correct: 0 }
        ],
        hard: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Quá khứ phân từ của "gehen" (đi)?', options: ['gegangen', 'ging', 'geht', 'gehst'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Ich habe ___ meinen Schlüssel vergessen.', options: ['schon wieder', 'erst', 'bereits', 'damals'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Hätte ich Zeit, ___ ich kommen.', options: ['würde', 'werde', 'wurde', 'wird'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Wir müssen eine Entscheidung ___.', options: ['treffen', 'machen', 'tun', 'nehmen'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Je mehr man lernt, ___ mehr weiß man.', options: ['desto', 'umso', 'so', 'dann'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Er wurde auf frischer ___ ertappt.', options: ['Tat', 'Hand', 'Fuß', 'Weg'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Es lohnt sich nicht, darüber ___ streiten.', options: ['zu', 'um', 'über', 'mit'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Từ trái nghĩa của "Schnell" (Nhanh) là "L..."', correctAnswer: 'langsam' },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết từ: "Bệnh viện" (Kranken...)', correctAnswer: 'haus' },
            { type: 'listening', category: 'LISTENING', question: 'Tình trạng cuộc họp?', audioScript: 'Die Sitzung wurde verschoben.', langCode: 'de-DE', options: ['Bị hoãn', 'Đang diễn ra', 'Kết thúc', 'Hủy bỏ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: 'Ich drücke dir die Daumen.', langCode: 'de-DE', options: ['Chúc may mắn', 'Đừng lo', 'Cố lên', 'Tạm biệt'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Thái độ?', audioScript: 'Das kommt nicht in Frage.', langCode: 'de-DE', options: ['Từ chối dứt khoát', 'Đồng ý', 'Xem xét', 'Có thể'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Er hat den Nagel auf den ___ getroffen.', options: ['Kopf', 'Fuß', 'Hand', 'Wand'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Indem man viel liest, ___ man seinen Wortschatz.', options: ['erweitert', 'erweitern', 'erweiterte', 'erweiterten'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Diese Maßnahme ist völlig ___ . (Vô nghĩa)', options: ['sinnlos', 'sinnvoll', 'sinnlich', 'gesinnt'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Kaum hatte er das Haus verlassen, ___ es zu regnen an.', options: ['fing', 'fang', 'fangen', 'fängt'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Wir müssen den Gürtel enger ___ . (Tiết kiệm)', options: ['schnallen', 'binden', 'machen', 'ziehen'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Danh từ của "Frei" (Tự do) là "Frei..."', correctAnswer: 'heit' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Er tut so, als ob er alles ___ .', options: ['wüsste', 'weiß', 'gewusst', 'wissen'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Cảm giác?', audioScript: 'Ich bin fix und fertig.', langCode: 'de-DE', options: ['Kiệt sức', 'Vui vẻ', 'Hào hứng', 'Buồn chán'], correct: 0 }
        ]
    },

    // --- TIẾNG NHẬT (JLPT) ---
    jp: {
        easy: [
            { type: 'multiple', category: 'VOCABULARY', question: 'ありがとう (Arigatou) là gì?', options: ['Xin chào', 'Cảm ơn', 'Xin lỗi', 'Tạm biệt'], correct: 1 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Trợ từ chỉ chủ ngữ?', options: ['は (wa)', 'を (o)', 'に (ni)', 'で (de)'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Nghe số:', audioScript: 'San', langCode: 'ja-JP', options: ['1', '2', '3', '4'], correct: 2 },
            { type: 'multiple', category: 'GREETING', question: 'Konnichiwa (こんにちは) nghĩa là?', options: ['Chào buổi trưa', 'Chào buổi sáng', 'Chào buổi tối', 'Tạm biệt'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Watashi (私) nghĩa là?', options: ['Tôi', 'Bạn', 'Anh ấy', 'Cô ấy'], correct: 0 },
            { type: 'multiple', category: 'NUMBERS', question: 'Ichi, Ni, ___', options: ['San', 'Yon', 'Go', 'Roku'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Kore ___ pen desu. (Đây LÀ bút)', options: ['wa', 'ga', 'wo', 'ni'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Neko (猫) là con gì?', options: ['Mèo', 'Chó', 'Cá', 'Chim'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Gakkou ___ ikimasu. (Đi ĐẾN trường)', options: ['e', 'ni', 'de', 'wo'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Arigatou nghĩa là "Cảm..."', correctAnswer: 'on' },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết số 4 (Yon/Shi) bằng Romaji.', correctAnswer: 'yon' },
            { type: 'listening', category: 'LISTENING', question: 'Khi nào nói?', audioScript: 'Ohayou Gozaimasu.', langCode: 'ja-JP', options: ['Buổi sáng', 'Buổi trưa', 'Buổi tối', 'Khi đi ngủ'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: 'Sumimasen.', langCode: 'ja-JP', options: ['Xin lỗi/Xin hỏi', 'Cảm ơn', 'Tạm biệt', 'Chúc mừng'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Inu (犬) là con gì?', options: ['Chó', 'Mèo', 'Lợn', 'Gà'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Kore wa ___ desu ka? (Cái GÌ)', options: ['nan', 'doko', 'dare', 'itsu'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“Sensei” (先生) là ai?', options: ['Giáo viên', 'Học sinh', 'Bác sĩ', 'Nhân viên'], correct: 0 },
            { type: 'multiple', category: 'NUMBERS', question: 'Số 10 tiếng Nhật?', options: ['Jyuu', 'Kyuu', 'Hachi', 'Nana'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: 'Sayounara.', langCode: 'ja-JP', options: ['Tạm biệt', 'Xin chào', 'Cảm ơn', 'Xin lỗi'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Sách" (Hon).', correctAnswer: 'hon' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Watashi ___ gakusei desu. (Cũng)', options: ['mo', 'wa', 'ga', 'no'], correct: 0 }
        ],
        medium: [
            { type: 'multiple', category: 'VOCABULARY', question: 'Kanji của "Nhật Bản"?', options: ['日本', '日語', '日本人', '今日'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết phiên âm của "Sushi"', correctAnswer: 'sushi' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Gohan wo ___ kudasai. (Hãy ăn cơm)', options: ['tabete', 'taberu', 'tabeta', 'tabemasu'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Ashita (明日) là khi nào?', options: ['Ngày mai', 'Hôm qua', 'Hôm nay', 'Năm ngoái'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Eiga wo ___ koto ga arimasu. (Đã từng xem)', options: ['mita', 'miru', 'mite', 'minai'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Sensei (先生) là ai?', options: ['Giáo viên', 'Học sinh', 'Bác sĩ', 'Nhân viên'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Ame ga ___ sou desu. (Có vẻ sắp mưa)', options: ['furi', 'furu', 'futte', 'futta'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'Oishii (おいしい) nghĩa là?', options: ['Ngon', 'Dở', 'Đắt', 'Rẻ'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Sakura" (Hoa anh đào).', correctAnswer: 'sakura' },
            { type: 'writing', category: 'VOCABULARY', question: 'Sayounara nghĩa là "Tạm..."', correctAnswer: 'biet' },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: 'Wakarimashita.', langCode: 'ja-JP', options: ['Đã hiểu', 'Không hiểu', 'Đã quên', 'Không biết'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Hỏi về?', audioScript: 'Kore wa ikura desu ka?', langCode: 'ja-JP', options: ['Giá tiền', 'Thời gian', 'Địa điểm', 'Người'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Mado wo ___ kudasai. (Hãy mở)', options: ['akete', 'akeru', 'aketa', 'akemasu'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“Yasumi” (休み) nghĩa là?', options: ['Nghỉ ngơi', 'Làm việc', 'Học tập', 'Du lịch'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Nihongo ga ___ desu. (Giỏi)', options: ['jouzu', 'heta', 'suki', 'kirai'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '“Tomodachi” (友達) là ai?', options: ['Bạn bè', 'Gia đình', 'Người yêu', 'Đồng nghiệp'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Yêu cầu?', audioScript: 'Mou ichido onegaishimasu.', langCode: 'ja-JP', options: ['Nhắc lại lần nữa', 'Nói chậm lại', 'Viết ra', 'Đi chỗ khác'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Viết "Núi" (Yama).', correctAnswer: 'yama' },
            { type: 'multiple', category: 'GRAMMAR', question: 'Mainichi 7-ji ni ___ . (Thức dậy)', options: ['okimasu', 'okite', 'okita', 'okiru'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'Kono hon wa ___ desu. (Thú vị)', options: ['omoshiroi', 'tsumaranai', 'muzukashii', 'yasashii'], correct: 0 }
        ],
        hard: [
            { type: 'multiple', category: 'GRAMMAR', question: 'Thể Te (て) của động từ "Tabemasu" (Ăn)?', options: ['Tabete', 'Tabeta', 'Tabenai', 'Taberu'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: 'この本は読み___です。', options: ['やすい', 'にくい', 'たい', 'すぎ'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '行け___よかったです。 (Nếu đi thì tốt rồi)', options: ['ba', 'tara', 'nara', 'te'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '彼に連絡を___。 (Giữ liên lạc)', options: ['とる', 'やる', 'する', 'いく'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '日本語を勉強すれば___ほど難しいです。 (Càng...càng)', options: ['suru', 'sureba', 'shite', 'shita'], correct: 1 },
            { type: 'multiple', category: 'VOCABULARY', question: '会議の準備が___しました。 (Hoàn thành)', options: ['完了', '完成', '完全', '完結'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '雨にも___、風にも負けず。 (Dù mưa...dù gió)', options: ['makezu', 'makete', 'makenai', 'make'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Thủ đô Nhật Bản (Tokyo).', correctAnswer: 'tokyo' },
            { type: 'writing', category: 'VOCABULARY', question: 'Núi Phú Sĩ (Fuji...)', correctAnswer: 'san' },
            { type: 'listening', category: 'LISTENING', question: 'Khi nào dùng?', audioScript: 'お世話になります。', langCode: 'ja-JP', options: ['Cảm ơn sự giúp đỡ', 'Khi tức giận', 'Khi đi ngủ', 'Khi ăn cơm'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Yêu cầu gì?', audioScript: 'ご検討ください。', langCode: 'ja-JP', options: ['Xem xét', 'Hủy bỏ', 'Đồng ý ngay', 'Từ chối'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Thái độ?', audioScript: '仕方がない。', langCode: 'ja-JP', options: ['Đành chịu thôi (Bó tay)', 'Rất vui', 'Rất buồn', 'Tức giận'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '努力した___、試験に合格した。 (Nhờ...)', options: ['かいがあって', 'せいで', 'おかげで', 'ために'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: '彼の態度は___できない。 (Không thể hiểu nổi)', options: ['理解', '解決', '説明', '納得'], correct: 3 }, 
            { type: 'multiple', category: 'GRAMMAR', question: '行く___行かない___、連絡してください。 (Dù đi hay không)', options: ['にしろ...にしろ', 'とか...とか', 'やら...やら', 'だの...だの'], correct: 0 },
            { type: 'multiple', category: 'VOCABULARY', question: 'この機会を___利用すべきだ。 (Tận dụng)', options: ['有効', '有利', '有益', '有名'], correct: 0 },
            { type: 'writing', category: 'VOCABULARY', question: 'Thành ngữ: "Nhất kỳ nhất..." (Ichi-go Ichi-e)', correctAnswer: 'e' },
            { type: 'multiple', category: 'GRAMMAR', question: '彼は来る___ない。 (Chắc chắn không)', options: ['はずが', 'わけが', 'ことが', 'ものが'], correct: 0 },
            { type: 'listening', category: 'LISTENING', question: 'Ý nghĩa?', audioScript: '申し訳ございません。', langCode: 'ja-JP', options: ['Xin lỗi (Trang trọng)', 'Cảm ơn', 'Chúc mừng', 'Tạm biệt'], correct: 0 },
            { type: 'multiple', category: 'GRAMMAR', question: '日本人___、漢字が書けるとは限らない。', options: ['だからといって', 'ながら', 'ものの', 'うえに'], correct: 0 }
        ]
    }
};

// ============================================================
// 4. LOGIC XỬ LÝ DỮ LIỆU (FUNCTIONS)
// ============================================================

/**
 * Hàm xáo trộn mảng (Shuffle)
 */
const shuffleArray = (array) => {
    let newArray = [...array]; 
    let currentIndex = newArray.length, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
    }
    return newArray;
};

/**
 * Hàm lấy câu hỏi theo ngôn ngữ và cấp độ
 */
export const getQuestionsByLanguageAndLevel = (langCode, level) => {
    // Fallback nếu không truyền level
    const selectedLevel = level || 'easy';
    const selectedLang = langCode || 'en';

    // Kiểm tra data
    if (!questionsData[selectedLang] || !questionsData[selectedLang][selectedLevel]) {
        console.warn(`⚠️ Không tìm thấy dữ liệu cho: ${selectedLang} -> ${selectedLevel}`);
        // Fallback về tiếng Anh easy nếu lỗi
        return questionsData['en']['easy']; 
    }

    const originalList = questionsData[selectedLang][selectedLevel];
    
    // Nếu danh sách trống
    if (originalList.length === 0) return [];

    // Xáo trộn
    const shuffledList = shuffleArray(originalList);

    // Cắt lấy số lượng theo config
    const limit = appConfig.questions_per_turn || 20;
    
    return shuffledList.slice(0, limit);
};  
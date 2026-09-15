import { Novel, Announcement, PasswordHint, VisitorStats } from '../types';

export const INITIAL_VISITOR_STATS: VisitorStats = {
  onlineCount: 1,
  todayViews: 0,
  totalViews: 0,
};

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 'ann-1',
    title: '🌸 Lịch đăng chương & Lưu ý bản quyền',
    date: '14/09/2026',
    badge: 'Ghim',
    badgeColor: 'bg-rose-100 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300',
    content: 'Chào mừng các cậu đến với bến đỗ nhỏ của Mellifluous! Lịch đăng truyện dự kiến vào tối Thứ Tư và Thứ Bảy hàng tuần. Vui lòng không reup hoặc mang bản dịch đi nơi khác.',
    isPinned: true,
  },
  {
    id: 'ann-2',
    title: '✉️ Quy ước giải mã Password các chương H / Ngoại truyện',
    date: '10/09/2026',
    badge: 'Mật khẩu',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300',
    content: 'Tất cả mật khẩu đều viết thường, không dấu, không cách. Gợi ý chi tiết nằm ở mục [Password] trên những cánh thư.',
    isPinned: false,
  },
  {
    id: 'ann-3',
    title: '🍃 Tuyển bạn cùng beta & đồng hành dịch truyện mùa hè',
    date: '02/09/2026',
    badge: 'Tuyển dụng',
    badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300',
    content: 'Tớ cần tìm thêm một bạn beta yêu mến giọng văn dịu dàng, hỗ trợ rà soát chính tả tiếng Việt. Nhắn tin qua fanpage nhé!',
    isPinned: false,
  },
];

export const PASSWORD_HINTS: PasswordHint[] = [
  {
    id: 'pass-1',
    novelId: 'novel-1',
    novelTitle: 'Hạ Nhật Phong Ngâm (Khúc Gió Mùa Hạ)',
    chapterRange: 'Chương 12 - 15 (Chương kết & Ngoại truyện)',
    question: 'Tên con thú cưng mà Chu Tự Hằng và Khương Noãn cùng nuôi trong ký túc xá thời đại học là gì? (Gợi ý: một chú mèo màu cam tròn trịa, 5 chữ cái)',
    formatNotice: 'Viết thường, không dấu, không hoa, không dấu cách. Ví dụ: meocon',
    hint: 'Xuất hiện ở cuối chương 8 khi Khương Noãn nhặt được dưới gốc anh đào ngày mưa.',
    solvedKey: 'laclac',
  },
  {
    id: 'pass-2',
    novelId: 'novel-2',
    novelTitle: 'Bức Thư Tình Gửi Vào Năm Mười Bảy Tuổi',
    chapterRange: 'Chương 18 - 25',
    question: 'Điểm thi đại học môn Vật Lý mà Giang Trì đã kèm cho Hứa Niệm đạt bao nhiêu điểm? (Gồm 2 chữ số)',
    formatNotice: 'Gồm 2 chữ số viết liền. Ví dụ: 95',
    hint: 'Xem lại lời hứa ở sân bóng rổ cuối kỳ thi thử lần hai.',
    solvedKey: '98',
  },
  {
    id: 'pass-3',
    novelId: 'novel-3',
    novelTitle: 'Mưa Rào Mùa Hạ Dưới Tán Anh Đào',
    chapterRange: 'Ngoại truyện 01 & 02',
    question: 'Loại kem mà Hạ Mạt thích ăn nhất khi đi cùng Cố Niên vào chiều tan trường tháng sáu là vị gì?',
    formatNotice: 'Tên vị kem tiếng Việt không hoa không dấu. Gồm 5 chữ cái.',
    hint: 'Màu xanh lục thanh mát dịu ngọt, giải nhiệt mùa hè.',
    solvedKey: 'matcha',
  },
];

export const NOVELS: Novel[] = [
  {
    id: 'novel-6',
    title: 'Khắc tên anh lên bia mộ của em',
    originalTitle: '以你名我的碑 (Dĩ Nhĩ Danh Ngã Đích Bi)',
    author: 'Khúc Tiểu Khúc',
    translator: 'Mellifluous',
    status: 'ongoing',
    category: 'Cứu rỗi, chữa lành',
    tags: ['Cứu rỗi', 'Chữa lành', 'Trưởng thành', 'Đô thị'],
    coverColor: 'from-rose-100 via-stone-100 to-amber-100',
    summary: `Năm 14 tuổi, Hà Ỷ Nguyệt tự tay giết một người, đem chôn dưới gốc cây quýt. Trong suốt 10 năm, linh hồn ấy chưa từng rời bỏ cô.

*— 《Sổ tay trưởng thành và chữa lành của Ma nữ tâm thần》*

[center-bold]Kẻ dã tâm dịu dàng nhưng lạnh máu x Tiểu thư “Ma nữ”[/center-bold]

[center-bold]BẢN DỊCH ĐÃ CÓ SỰ CHO PHÉP CỦA TÁC GIẢ VỚI MỤC ĐÍCH PHI LỢI NHUẬN[/center-bold]`,
    totalChapters: 68,
    completedChapters: 1,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: '15/09/2026',
    passwordNotice: 'Bản dịch phi lợi nhuận thuộc về Mellifluous.',
    chapters: [
      {
        id: 'c6-1',
        number: 1,
        title: 'Chương 1: Cây quýt trong khu vườn cũ',
        releaseDate: '15/09/2026',
        isLocked: false,
        wordCount: 3600,
        views: 0,
        likes: 0,
        rating: 0,
        type: 'main',
        content: `Tháng Mười, sương mù bao phủ khắp thành phố phía Nam ẩm ướt.

Hà Ỷ Nguyệt đứng bên khung cửa sổ sát đất của căn biệt thự họ Hà, nhìn xuống góc vườn phía đông. Nơi đó từng có một cây quýt nhỏ, cành lá xanh um tùm, quả đơm trĩu cành mỗi độ đông về.

Nhưng mười năm trước, sau một đêm mưa bão gầm rít, gốc cây quýt ấy đã vĩnh viễn bị chôn vùi dưới lớp xi măng lạnh buốt.

Và cùng với nó, là một linh hồn chưa từng siêu thoát.

Người bên ngoài đồn rằng đại tiểu thư nhà họ Hà là một kẻ điên, một "ma nữ" tính khí thất thường, lãnh đạm với tất cả mọi người. Không ai dám đến gần cô, trừ những kẻ có dã tâm thèm muốn gia sản họ Hà.

Cho đến khi người đàn ông ấy xuất hiện.

Anh mỉm cười dịu dàng, đôi mắt sâu thẳm giấu đi lưỡi dao sắc bén và dòng máu lạnh lùng của kẻ săn mồi. Anh bước từng bước vào thế giới u tối của cô, gõ nhẹ lên cánh cửa phong kín mười năm...`,
      },
      {
        id: 'c6-pn1',
        number: 1,
        title: 'Phiên ngoại 1: Mùa đông năm mười bốn tuổi',
        releaseDate: '15/09/2026',
        isLocked: false,
        wordCount: 3200,
        views: 0,
        likes: 0,
        rating: 0,
        type: 'extra',
        content: `Mùa đông năm mười bốn tuổi, tuyết rơi dày đặc khắp thành phố.

Hà Ỷ Nguyệt cuộn tròn người trong chiếc áo khoác dạ xám cũ kỹ, ngón tay đỏ ửng vì buốt giá. Cô nhìn những nhánh cây quýt trơ trụi khẳng khiu trong gió lạnh, khẽ thì thầm một điều ước chưa từng ai lắng nghe.

Gió bấc rít qua từng kẽ lá, mang theo hương thơm ngai ngái của đất ẩm và sự cô độc thăm thẳm. Nhưng cô biết, dù mùa đông có dài đến đâu, hạt mầm của sự phục thù và cứu rỗi vẫn đang âm thầm bén rễ...`,
      },
      {
        id: 'c6-pn2',
        number: 2,
        title: 'Phiên ngoại 2: Bức thư viết trong bóng tối',
        releaseDate: '15/09/2026',
        isLocked: true,
        passwordHint: 'Mật khẩu là "laclac"',
        passwordAnswer: 'laclac',
        wordCount: 2900,
        views: 0,
        likes: 0,
        rating: 0,
        type: 'extra',
        content: `Gửi người chưa từng nhìn thấy ánh sáng mặt trời của tôi,

Nếu một ngày anh nghe thấy tiếng chuông gió ngoài hiên rung lên, xin anh hãy nhớ rằng trên thế giới này, từng có một người vì anh mà khắc tên lên bia đá lạnh giá nhất...`,
      },
    ],
  },
  {
    id: 'novel-1',
    title: 'Hạ Nhật Phong Ngâm',
    originalTitle: '夏日风吟 (Khúc Gió Mùa Hạ)',
    author: 'Trúc Dĩ Lâm Miên',
    translator: 'Mellifluous',
    status: 'completed',
    category: 'Thanh xuân vườn trường',
    tags: ['Thanh xuân', 'Học đường', 'Ngọt sủng', 'Chữa lành', 'HE'],
    coverColor: 'from-rose-100 via-amber-50 to-pink-100',
    summary: 'Năm mười bảy tuổi ấy, mùa hè dài bất tận như tiếng ve sầu vang vọng góc hành lang lớp học. Chu Tự Hằng là học thần lạnh lùng của lớp chọn một, còn Khương Noãn là cô gái bàn bên luôn lén giấu những viên kẹo dâu vào ngăn bàn anh. Một cơn gió mùa hạ thổi qua, thổi rung rinh tà áo đồng phục trắng và kết thành câu chuyện mười năm không phai.',
    totalChapters: 15,
    completedChapters: 15,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: '12/09/2026',
    passwordNotice: 'Chương 12 đến 15 có mật khẩu bảo vệ công sức tác giả.',
    chapters: [
      {
        id: 'c1-1',
        number: 1,
        title: 'Chương 1: Viên kẹo dâu trên bậu cửa sổ tháng Năm',
        releaseDate: '15/07/2026',
        isLocked: false,
        wordCount: 3200,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Mùa hè năm ấy đến sớm hơn mọi năm.

Khi tiếng ve sầu đầu tiên bắt đầu râm ran trên những tán hoa anh đào già ngoài sân trường Nhất Trung, nắng đã nhuộm vàng những ô gạch men hành lang lớp 11-A.

Khương Noãn ôm một chồng tập vở bài tập ngữ văn nặng trĩu, bước chân có chút vội vã. Gió luồn qua khung cửa sổ sổ mở hé, thổi bay vài sợi tóc mai mềm mại vương trên gò má ửng hồng vì nóng.

"Chu Tự Hằng, bài tập của cậu này."

Cậu thiếu niên ngồi sát cửa sổ cuối lớp khẽ nâng mi mắt. Nắng sớm phủ lên góc nghiêng tuấn tú, đường nét sống mũi cao thẳng cùng hàng mi đen rậm. Anh đeo một bên tai nghe màu trắng, ngón tay thon dài đang xoay chiếc bút bi đen quen thuộc.

"Ừm. Cảm ơn."

Giọng anh trong trẻo, trầm ấm như tiếng gió xao động qua tán lá mùa hạ. Khương Noãn mím môi, lặng lẽ đặt thêm một viên kẹo dâu nhỏ nhắn màu hồng nhạt lên góc bàn anh, rồi vội vã quay về chỗ ngồi của mình.

Cô không nhìn thấy, phía sau lưng mình, khóe môi chàng thiếu niên luôn nổi tiếng lạnh lùng của khối tự nhiên khẽ cong lên một nụ cười nhạt vô cùng dung túng.`,
      },
      {
        id: 'c1-2',
        number: 2,
        title: 'Chương 2: Cùng chung một chiếc ô dưới cơn mưa rào',
        releaseDate: '20/07/2026',
        isLocked: false,
        wordCount: 3450,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Cơn mưa rào mùa hạ đến bất chợt như một cái chớp mắt.

Tan học, trời đã đổ mưa tầm tã. Những giọt nước mưa đập vào mái hiên tôn kêu lộp độp, hòa cùng hương đất ngai ngái và mùi cỏ tươi ẩm ướt đặc trưng của tháng Sáu.

Các bạn học ai có ô thì rủ nhau ra về, ai không có thì đứng túm năm tụm ba chờ người nhà tới đón. Khương Noãn đứng ngơ ngác ở bậc thềm sảnh chính, hai tay ôm chặt balo trước ngực. Sáng nay dự báo thời tiết bảo trời nắng đẹp, cô đâu ngờ ông trời lại đổi tính nhanh như vậy.

"Không đem ô à?"

Một giọng nói quen thuộc vang lên bên tai. Khương Noãn giật mình quay sang, thấy Chu Tự Hằng đã đứng bên cạnh tự bao giờ. Anh mặc đồng phục sơ mi trắng thẳng thớm, trên tay cầm một chiếc ô màu xanh ngọc mát mắt.

"Tớ... tớ quên mang mất."

Chu Tự Hằng bật bung tán ô, tiếng lách cách thanh giòn vang lên: "Đi thôi, tớ đưa cậu ra trạm xe buýt."

"Nhưng mà... cậu có tiện đường không?"

"Tiện. Rất tiện." Anh bước xuống bậc thang, nghiêng tán ô về phía cô hơn một nửa, che đi những hạt mưa xiên xẹo. "Mau lên kẻo ướt tóc."

Suốt dọc đoạn đường ngắn từ cổng trường ra trạm xe buýt, bờ vai bên phải của Chu Tự Hằng đã ướt đẫm nước mưa, nhưng Khương Noãn bên cạnh lại khô ráo vẹn nguyên, trong lòng tựa như có ngàn cánh hoa anh đào cùng nhau nở rộ.`,
      },
      {
        id: 'c1-3',
        number: 3,
        title: 'Chương 3: Tiếng ve sầu và trang giấy nháp giấu kín',
        releaseDate: '28/07/2026',
        isLocked: false,
        wordCount: 2980,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Tiết tự học buổi chiều yên ắng đến lạ kỳ. Chỉ có tiếng quạt trần quay kẽo kẹt trên đỉnh đầu và tiếng ngòi bút sột soạt trên giấy kiểm tra.

Khương Noãn cắn cắn đầu bút chì, nhíu mày trước câu hỏi khó của đề thi thử môn Toán. Đột nhiên, một mẩu giấy gấp hình trái tim nhỏ được truyền từ bàn sau lên.

Mở ra, nét chữ cứng cáp, dứt khoát quen thuộc của Chu Tự Hằng hiện lên:
"Đặt x là số mũ tự nhiên, dùng bất đẳng thức Cauchy ở dòng thứ ba. Tan học chờ tớ ở phòng thư viện, tớ giảng lại cho."

Bên dưới còn vẽ thêm một hình mặt mèo con đang ngoan ngoãn chớp mắt.
Khương Noãn khẽ che miệng cười thầm, trái tim đập thình thịch như đánh trống trường. Mùa hè năm mười bảy tuổi, bài toán khó đến đâu dường như cũng có lời giải dịu dàng nhất.`,
      },
      {
        id: 'c1-12',
        number: 12,
        title: 'Chương 12: Đêm tốt nghiệp và lời tỏ tình dưới ánh sao [Có Pass]',
        releaseDate: '15/08/2026',
        isLocked: true,
        passwordHint: 'Tên chú mèo cam của hai người (Xem ở mục Gợi ý Pass)',
        passwordAnswer: 'laclac',
        wordCount: 4100,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Đêm hội tốt nghiệp cấp ba rực rỡ ánh đèn và tiếng cười nói. Khi mọi người đang mải mê chụp ảnh kỷ yếu quanh sân trường, Chu Tự Hằng đã kéo Khương Noãn lên sân thượng tầng bốn của khu phòng học cũ.

Gió đêm mùa hạ mang theo hơi mát mơn man, xa xa là ánh đèn thành phố lung linh như dải ngân hà.

Chu Tự Hằng lấy từ trong túi áo ra một chiếc hộp nhỏ bằng nhung màu hồng phấn, cùng một phong thư màu kem được niêm phong bằng sáp đỏ hình cánh hoa đào.

"Khương Noãn, bức thư này tớ đã viết từ ngày đầu tiên nhìn thấy viên kẹo dâu của cậu năm lớp 10."

Anh nhìn sâu vào mắt cô, trong đáy mắt phản chiếu trọn vẹn bóng hình cô gái nhỏ:
"Mười bảy tuổi tớ thầm thích cậu, mười tám tuổi tớ muốn chính thức được nắm tay cậu đi hết thanh xuân này. Cậu có đồng ý làm bạn gái của tớ không?"

Nước mắt Khương Noãn rơi xuống vì xúc động, cô gật đầu thật mạnh, rơi trọn vào cái ôm ấm áp và tràn ngập hương cỏ xanh của anh.`,
      },
    ],
  },
  {
    id: 'novel-2',
    title: 'Bức Thư Tình Gửi Vào Năm Mười Bảy Tuổi',
    originalTitle: '致十七岁的告白信 (Chuyện tình thanh xuân)',
    author: 'Khinh Khinh Nhất Tiếu',
    translator: 'Mellifluous',
    status: 'ongoing',
    category: 'Thanh xuân vườn trường',
    tags: ['Song hướng yêu thầm', 'Oan gia ngõ hẹp', 'Ngọt ngào', 'Mùa hè'],
    coverColor: 'from-amber-100 via-sky-50 to-emerald-100',
    summary: 'Giang Trì là đội trưởng đội bóng rổ kiêm trùm trường ngỗ nghịch nhưng lại sợ nhất là nước mắt của Hứa Niệm. Một bức thư tình gửi nhầm ngăn bàn năm lớp 11 đã trói chặt vận mệnh của hai người qua bao mùa hoa nở.',
    totalChapters: 45,
    completedChapters: 28,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: 'Hôm nay 09:30',
    passwordNotice: 'Chương 25 trở đi áp dụng mật khẩu giải đố.',
    chapters: [
      {
        id: 'c2-1',
        number: 1,
        title: 'Chương 1: Bức thư tình đặt nhầm ngăn bàn',
        releaseDate: '01/08/2026',
        isLocked: false,
        wordCount: 3100,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Hứa Niệm thề rằng, nếu biết trước ngăn bàn số 3 dãy ngoài là của Giang Trì - tên đầu gấu nổi danh khắp trường, cô có chết cũng không nhận lời cô bạn thân để nhét phong thư tình giùm!

Giờ thì hay rồi, phong thư hồng phấn thơm mùi hoa linh lan đang nằm chễm chệ giữa hai ngón tay thon dài của Giang Trì.

"Hứa Niệm? Cậu viết thư tình cho tôi?" Giang Trì nhếch môi, ánh mắt mang theo sự trêu chọc sáng rực như ánh mặt trời ban trưa.

"Không phải! Cậu đừng có mà tự luyến!" Mặt Hứa Niệm đỏ bừng đến tận mang tai, cuống cuồng muốn giật lại nhưng vì chênh lệch chiều cao một cái đầu nên chỉ đành bất lực dậm chân.

Giang Trì thong thả cất phong thư vào túi áo đồng phục bên ngực trái, áp sát lại gần thì thầm: "Muộn rồi nhóc con. Đã vào tay tôi thì chính là của tôi."`,
      },
      {
        id: 'c2-2',
        number: 2,
        title: 'Chương 2: Sân bóng rổ nhuộm màu hoàng hôn',
        releaseDate: '08/08/2026',
        isLocked: false,
        wordCount: 3350,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Hoàng hôn buông xuống, nhuộm đỏ cả khoảng trời phía tây sân vận động.

Hứa Niệm cầm chai nước khoáng ướp lạnh, ngập ngừng đứng bên ngoài hàng rào lưới thép. Trên sân, Giang Trì vừa thực hiện một cú úp rổ ngoạn mục, tiếng hò reo của đám bạn học vang dội cả một góc trường.

Cậu thiếu niên lau mồ hôi trên trán, ánh mắt lập tức quét qua đám đông và dừng lại chính xác tại bóng hình nhỏ nhắn đang lúng túng kia.

Chẳng thèm để ý đến những lời gọi của đồng đội, anh sải bước dài tiến lại gần, cách một lớp lưới rào cúi đầu nhìn cô:
"Đến cổ vũ cho tôi à?"

"Không có... Cô giáo nhờ tớ đưa bài kiểm tra cho cậu thôi!"

Giang Trì đưa tay qua khe lưới, nhận lấy chai nước rồi tiện tay xoa nhẹ mái tóc mềm của cô: "Nói dối không chớp mắt. Nhưng mà nước mát lắm, cảm ơn cô bạn cùng bàn."`,
      },
    ],
  },
  {
    id: 'novel-3',
    title: 'Mưa Rào Mùa Hạ Dưới Tán Anh Đào',
    originalTitle: '樱花树下的夏日暴雨 (Chữa lành tâm hồn)',
    author: 'Lam Bạch Sắc',
    translator: 'Mellifluous',
    status: 'completed',
    category: 'Thanh mai trúc mã',
    tags: ['Thanh mai trúc mã', 'Ấm áp', 'Chữa lành', 'Đơn thuần', 'HE'],
    coverColor: 'from-emerald-100 via-teal-50 to-pink-100',
    summary: 'Hạ Mạt và Cố Niên lớn lên bên nhau từ khi còn là hai đứa trẻ bi bô tập nói dưới gốc cây hoa anh đào đầu ngõ. Tuổi thơ có kem mát, có tiếng ve sầu, có xe đạp cọc cạch và có người luôn chờ cô ở ngã rẽ cuộc đời.',
    totalChapters: 20,
    completedChapters: 20,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: '05/09/2026',
    passwordNotice: 'Bộ truyện đã hoàn thành toàn văn. Ngoại truyện có pass ngọt ngào.',
    chapters: [
      {
        id: 'c3-1',
        number: 1,
        title: 'Chương 1: Ngã rẽ tuổi thơ và chiếc xe đạp cũ',
        releaseDate: '10/06/2026',
        isLocked: false,
        wordCount: 3600,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Trước hiên nhà Hạ Mạt có trồng một cây anh đào dại. Mỗi độ cuối xuân đầu hạ, hoa tàn kết trái nhỏ màu đỏ thẫm, rợp bóng mát cả một khoảng sân rêu phong.

Cố Niên hơn cô nửa tuổi, nhà ngay bên cạnh. Từ nhỏ đến lớn, chiếc xe đạp Phượng Hoàng màu xám của anh luôn có thêm một chiếc đệm êm màu xanh bơ ở yên sau – chỗ ngồi độc quyền của riêng cô bé Hạ Mạt.

"Cố Niên ơi, hôm nay tớ muốn ăn kem dưa lưới!"

"Không được, hôm qua cậu mới bị ho, mẹ Hạ dặn tớ phải quản cậu."

"Đi mà... Cố Niên là tốt nhất trên đời luôn đó!"

Cố Niên bóp nhẹ phanh xe, ngoái đầu nhìn cô gái nhỏ đang túm chặt góc áo mình mè nheo, ánh mắt bất lực nhưng tràn đầy chiều chuộng:
"Chỉ được ăn nửa cây thôi đấy. Nửa còn lại tớ ăn giúp."`,
      },
    ],
  },
  {
    id: 'novel-4',
    title: 'Chiếc Thuyền Giấy Ngược Dòng Ký Ức',
    originalTitle: '折纸小船逆流而行 (Hồi ức mùa hè)',
    author: 'Mặc Bảo Phi Bảo phong',
    translator: 'Mellifluous',
    status: 'ongoing',
    category: 'Gương vỡ lại lành',
    tags: ['Tình hữu độc chung', 'Đô thị', 'Gương vỡ lại lành', 'HE'],
    coverColor: 'from-sky-100 via-indigo-50 to-purple-100',
    summary: 'Năm năm xa cách, Trình Cẩm Ngôn quay trở lại thành phố ven biển này với tư cách kiến trúc sư trưởng. Trong căn phòng lưu niệm trường cũ, anh tìm thấy chiếc thuyền giấy gấp bằng vé tàu năm xưa của Ôn Tuyền, bên trong viết vỏn vẹn sáu chữ: “Mùa hè này, em nhớ anh”.',
    totalChapters: 30,
    completedChapters: 14,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: '11/09/2026',
    passwordNotice: 'Cập nhật đều đặn mỗi tuần một chương.',
    chapters: [
      {
        id: 'c4-1',
        number: 1,
        title: 'Chương 1: Gặp lại người xưa nơi góc quán quen',
        releaseDate: '20/08/2026',
        isLocked: false,
        wordCount: 3800,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Gió biển thổi tung tấm rèm voan màu trắng của quán cà phê Thời Gian.

Ôn Tuyền đang cắm cúi vẽ phác thảo bìa sách mới thì một bóng người cao ráo khẽ che khuất ánh nắng chiều trước mặt. Hương nước hoa gỗ tuyết tùng quen thuộc thoảng qua cánh mũi khiến ngón tay cô bỗng chốc cứng đờ.

"Xin chào, bàn này còn chỗ trống không?"

Giọng nói ấy... năm năm qua cô chưa từng dám quên dù chỉ một giây trong giấc mơ.`,
      },
    ],
  },
  {
    id: 'novel-5',
    title: 'Ve Sầu Kêu Dưới Nắng Tháng Sáu',
    originalTitle: '六月的蝉鸣 (Khúc ca thanh xuân)',
    author: 'Hà Phong Mộng',
    translator: 'Mellifluous',
    status: 'completed',
    category: 'Thanh xuân vườn trường',
    tags: ['Học thần', 'Nữ sinh chuyên văn', 'Nhiệt huyết', 'Ngọt ngào', 'HE'],
    coverColor: 'from-yellow-100 via-rose-50 to-amber-100',
    summary: 'Một câu chuyện thanh xuân ấm áp về những ngày ôn thi đại học cùng nhau tiến bước. Tình cảm trong sáng như viên pha lê dưới nắng rực rỡ của những tháng năm tươi đẹp nhất cuộc đời.',
    totalChapters: 10,
    completedChapters: 10,
    rating: 0,
    ratingCount: 0,
    views: 0,
    favorites: 0,
    lastUpdated: '01/09/2026',
    passwordNotice: 'Toàn văn công khai không pass.',
    chapters: [
      {
        id: 'c5-1',
        number: 1,
        title: 'Chương 1: Giảng bài lúc năm giờ chiều',
        releaseDate: '12/07/2026',
        isLocked: false,
        wordCount: 2800,
        views: 0,
        likes: 0,
        rating: 0,
        content: `Ánh nắng năm giờ chiều xuyên qua rèm cửa màu kem, nhuộm sáng một nửa bàn học của hai người. Tiếng ve kêu râm ran như bản hòa ca của tuổi mười tám...`,
      },
    ],
  },
];

export const BLOGGER_TEMPLATE_SNIPPET = `<!-- 
========================================================================
BLOGGER THEME / WIDGET CODE DÀNH CHO BLOGGER BẢN MIỄN PHÍ (FREE)
Concept: "better and better - Mellifluous"
Style: Thanh xuân, học đường, mùa hè lãng mạn & hoa anh đào rơi
========================================================================
Hướng dẫn cài đặt nhanh:
1. Vào trang quản trị Blogger (Blogger.com) -> Chọn Blog của bạn
2. Vào mục "Bố cục" (Layout) -> Chọn "Thêm tiện ích" (Add a Gadget)
3. Chọn loại tiện ích "HTML/JavaScript"
4. Dán toàn bộ đoạn code dưới đây vào và bấm "Lưu" (Save)!
-->

<div id="mellifluous-summer-blog" class="melli-theme">
  <!-- STYLE CSS CHUẨN ĐẸP TƯƠNG THÍCH BLOGGER -->
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Playfair+Display:ital,wght@0,600;1,400&family=Patrick+Hand&display=swap');
    
    .melli-theme {
      font-family: 'Lora', Georgia, serif;
      background: linear-gradient(180deg, #fff5f7 0%, #fffbf0 50%, #f0fdf4 100%);
      color: #4a383b;
      padding: 25px 20px;
      border-radius: 20px;
      border: 2px dashed #fbcfe8;
      box-shadow: 0 10px 30px rgba(244, 114, 182, 0.12);
      max-width: 900px;
      margin: 20px auto;
      position: relative;
      overflow: hidden;
    }
    
    /* Header blog */
    .melli-header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px dotted #f472b6;
      margin-bottom: 25px;
    }
    .melli-title {
      font-family: 'Playfair Display', serif;
      font-size: 2.2rem;
      color: #db2777;
      margin: 0 0 8px 0;
      letter-spacing: 1px;
    }
    .melli-intro-title {
      font-size: 1.25rem;
      font-weight: 600;
      color: #9d174d;
      margin: 8px 0 4px 0;
    }
    .melli-subtitle {
      font-size: 1.05rem;
      color: #be185d;
      font-style: italic;
      margin-bottom: 12px;
    }
    .melli-desc {
      font-size: 0.98rem;
      line-height: 1.7;
      color: #4b5563;
      max-width: 680px;
      margin: 0 auto 10px auto;
    }
    .melli-notice {
      font-style: italic;
      color: #e11d48;
      font-size: 0.92rem;
      background: #ffe4e6;
      padding: 8px 16px;
      border-radius: 999px;
      display: inline-block;
      margin-top: 6px;
    }
    
    /* Navigation Lá Thư Tình Bay Bay */
    .melli-letters-nav {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 16px;
      margin: 30px 0;
    }
    .melli-letter-item {
      background: #ffffff;
      padding: 18px 24px;
      border-radius: 12px;
      border: 1px solid #fed7aa;
      box-shadow: 0 4px 12px rgba(0,0,0,0.06);
      text-decoration: none;
      color: #7c2d12;
      font-family: 'Patrick Hand', cursive;
      font-size: 1.25rem;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .melli-letter-item:nth-child(1) { transform: rotate(-3deg); background: #fdf2f8; border-color: #fbcfe8; }
    .melli-letter-item:nth-child(2) { transform: rotate(2deg); background: #f0fdf4; border-color: #bbf7d0; }
    .melli-letter-item:nth-child(3) { transform: rotate(-2deg); background: #eff6ff; border-color: #bfdbfe; }
    .melli-letter-item:nth-child(4) { transform: rotate(4deg); background: #fefce8; border-color: #fef08a; }
    .melli-letter-item:hover {
      transform: translateY(-5px) scale(1.05) rotate(0deg);
      box-shadow: 0 8px 20px rgba(244, 114, 182, 0.25);
    }
    
    /* Cánh hoa anh đào rơi hiệu ứng nhẹ */
    .sakura-petal {
      position: absolute;
      background: #fbcfe8;
      border-radius: 150% 0 150% 0;
      opacity: 0.7;
      pointer-events: none;
      animation: fallDown 8s linear infinite;
    }
    @keyframes fallDown {
      0% { top: -10%; transform: translateX(0) rotate(0deg); }
      100% { top: 110%; transform: translateX(80px) rotate(360deg); }
    }
    
    /* Footer */
    .melli-footer {
      text-align: center;
      margin-top: 30px;
      padding-top: 15px;
      border-top: 1px dashed #fbcfe8;
      font-size: 0.85rem;
      color: #6b7280;
    }
    .melli-socials {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-bottom: 10px;
    }
    .melli-socials a {
      color: #ec4899;
      text-decoration: none;
      font-weight: bold;
    }
  </style>

  <!-- NỘI DUNG GIỚI THIỆU BLOG -->
  <div class="melli-header">
    <h1 class="melli-title">better and better</h1>
    <div class="melli-intro-title">Xin chào, tớ là Mellifluous</div>
    <div class="melli-subtitle">━ Một chiếc thuyền nhỏ lênh đênh ngược gió</div>
    <p class="melli-desc">
      Đây là trang phụ của tớ, đăng linh ta linh tinh. Đăng truyện song song với trang chính, cập nhật muộn và không thường xuyên, phòng ngừa trang chính bị khóa.
    </p>
    <div class="melli-notice">
      Truyện trong nhà được chuyển ngữ dưới sự cho phép của tác giả với mục đích phi lợi nhuận, sẽ có mật khẩu để đảm bảo công sức của tác giả lẫn dịch giả.
    </div>
  </div>

  <!-- CÁC LÁ THƯ CHUYỂN HƯỚNG NGHÊNH NGHIÊNG -->
  <div class="melli-letters-nav">
    <a href="#truyen-hoan" class="melli-letter-item">🌸 Truyện đã hoàn thành</a>
    <a href="#truyen-chua-hoan" class="melli-letter-item">🍃 Truyện chưa hoàn thành</a>
    <a href="#password" class="melli-letter-item">🔑 Password gợi ý</a>
    <a href="#tam-su" class="melli-letter-item">💌 Một số mục khác</a>
  </div>

  <div class="melli-footer">
    <div class="melli-socials">
      <a href="https://facebook.com" target="_blank">Facebook</a> •
      <a href="https://wordpress.com" target="_blank">WordPress</a> •
      <a href="https://wattpad.com" target="_blank">Wattpad</a>
    </div>
    <div>Lượt xem hôm nay: 0 | Đang online: 1 bạn đọc</div>
    <div>© 2026 better and better - Mellifluous. Bản chuyển ngữ phi thương mại.</div>
  </div>
</div>
`;



// 載入婚紗照片
function loadPhotos() {
	// 婚紗照片資料
	const photos = [];

	for (let i = 1; i <= 80; i++) {
		// 使用 padStart 來確保數字格式是兩位數
		const paddedIndex = String(i).padStart(2, '0'); 
		photos.push({
			src: `images/PGG_${paddedIndex}.jpg`,
			alt: `婚紗照片${paddedIndex}`,
			index: i
		});
	}
	
	const galleryElement = document.getElementById('gallery-container');
	const photoSlide = document.getElementById('slides-container');
	
    photos.forEach(photo => {
        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.alt;
		img.loading = "lazy";
        img.onclick = () => openLightbox(photo.index);
        galleryElement.appendChild(img);
		
		const slideDiv = document.createElement("div");
		slideDiv.className = "mySlides";
		const slideImg = document.createElement("img");
        slideImg.src = photo.src;
        slideImg.alt = photo.alt;
		slideImg.loading = "lazy";
        slideDiv.appendChild(slideImg);
        photoSlide.appendChild(slideDiv);
		
    });
}

let slideIndex = 1;

// 開啟 Lightbox
function openLightbox(index) {
	currentSlide(index);
    document.getElementById("lightbox").style.display = "flex";
    showSlides(slideIndex);
}

// 關閉 Lightbox
function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

// 切換幻燈片
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// 顯示當前幻燈片
function currentSlide(n) {
    showSlides(slideIndex = n);
}

// 顯示指定的幻燈片
function showSlides(n) {
    let i;
    const slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
}

// 鍵盤導航
document.addEventListener('keydown', function(event) {
    const lightbox = document.getElementById("lightbox");
    if (lightbox.style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            plusSlides(-1);
        } else if (event.key === "ArrowRight") {
            plusSlides(1);
        }
    }
});

// 設定婚宴時間
const weddingDate = new Date("2024-11-02T12:00:00").getTime();

// 倒數計時函數
const countdownFunction = () => {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    // 計算天、時、分、秒
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // 更新倒數顯示
    document.getElementById("countdown").innerHTML = `${days}天 ${hours}小時 ${minutes}分鐘 ${seconds}秒`;

    // 如果倒數結束
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "婚宴開始！";
    }
};

// 每秒更新倒數
const x = setInterval(countdownFunction, 1000);

// 加入 Google 行事曆的函數
const addToGoogleCalendar = () => {
    const event = {
        'summary': 'JunLin & ShuFei 婚宴',
        'location': '幸福莊園 House Wedding',
        'description': '婚宴邀請函',
        'start': {
            'dateTime': '2024-11-02T12:00:00',
            'timeZone': 'Asia/Taipei'
        },
        'end': {
            'dateTime': '2024-11-02T14:00:00',
            'timeZone': 'Asia/Taipei'
        },
    };

    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.summary)}&dates=${event.start.dateTime.replace(/-|:|\.\d{3}/g, '')}/${event.end.dateTime.replace(/-|:|\.\d{3}/g, '')}&details=${encodeURIComponent(event.description)}&location=${encodeURIComponent(event.location)}`;

    window.open(calendarUrl, '_blank');
};

// 綁定按鈕事件
document.getElementById("add-to-calendar").onclick = addToGoogleCalendar;

// 切換各個 section 的顯示狀態
function toggleSection(sectionId) {
    const sections = document.querySelectorAll('.panel');
    
    // 關閉所有其他sections
    sections.forEach(section => {
        if (section.id !== sectionId) {
            section.style.display = "none";
        }
    });

    // 切換當前section的顯示狀態
    const panel = document.getElementById(sectionId);
    if (panel.style.display === "none" || panel.style.display === "") {
        panel.style.display = "block";
    } else {
        panel.style.display = "none";
    }
}

// 確保在 DOM 加載完成後執行
document.addEventListener("DOMContentLoaded", function() {
	loadPhotos();
	
    // 歡迎畫面在頁面加載後立即顯示
    document.getElementById("welcome-screen").style.display = "flex";
	document.getElementById("main-content").classList.add("hidden");
});

// 關閉歡迎畫面
function closeWelcome() {
    document.getElementById("welcome-screen").style.display = "none";
	document.getElementById("main-content").classList.remove("hidden"); 
}
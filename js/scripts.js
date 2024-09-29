let slideIndex = 1;

function openLightbox() {
    document.getElementById("lightbox").style.display = "flex";
    showSlides(slideIndex);
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slides[slideIndex - 1].style.display = "block";  
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    if (document.getElementById("lightbox").style.display === "flex") {
        if (event.key === "Escape") {
            closeLightbox();
        } else if (event.key === "ArrowLeft") {
            plusSlides(-1);
        } else if (event.key === "ArrowRight") {
            plusSlides(1);
        }
    }
});

let currentSlide = 0;

const slides = document.querySelectorAll(".slide");
const progress = document.querySelector(".progress span");

function showSlide(index) {

    slides.forEach((slide) => {
        slide.classList.remove("active");
    });

    slides[index].classList.add("active");

    currentSlide = index;

    const percentage =
        ((index + 1) / slides.length) * 100;

    progress.style.width = percentage + "%";
}

function nextSlide() {

    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    }
}

function restart() {
    showSlide(0);
}

function openGift() {

    const gift = document.querySelector(".gift");
    const giftText = document.getElementById("giftText");
    const giftButton = document.getElementById("giftButton");

    if (!gift.classList.contains("open")) {

        gift.classList.add("open");

        giftText.innerHTML =
            "✨ Surprise! You found a tiny reminder...";

        giftButton.innerHTML =
            "Continue 💗";

        giftButton.onclick = nextSlide;

    } else {

        nextSlide();

    }
}


/* Keyboard navigation */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowRight") {
        nextSlide();
    }

    if (event.key === "ArrowLeft") {

        if (currentSlide > 0) {
            showSlide(currentSlide - 1);
        }

    }

});


/* Swipe support for mobile */

let touchStartX = 0;

document.addEventListener("touchstart", function(event) {

    touchStartX = event.touches[0].clientX;

});

document.addEventListener("touchend", function(event) {

    const touchEndX = event.changedTouches[0].clientX;

    const difference = touchStartX - touchEndX;

    if (difference > 60) {
        nextSlide();
    }

    if (difference < -60 && currentSlide > 0) {
        showSlide(currentSlide - 1);
    }

});


/* Small cursor glow */

const glow = document.createElement("div");

glow.style.position = "fixed";
glow.style.width = "180px";
glow.style.height = "180px";
glow.style.borderRadius = "50%";
glow.style.pointerEvents = "none";
glow.style.zIndex = "5";
glow.style.background =
    "radial-gradient(circle, rgba(255,255,255,0.08), transparent 70%)";
glow.style.transform = "translate(-50%, -50%)";

document.body.appendChild(glow);

document.addEventListener("mousemove", function(event) {

    glow.style.left = event.clientX + "px";
    glow.style.top = event.clientY + "px";

});


/* Initial state */

showSlide(0);
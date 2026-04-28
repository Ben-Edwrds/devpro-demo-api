// slider.js
// Maakt een eenvoudige slider/karrousel voor de .slider-container

document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const slider = document.querySelector('.slider');
    if (!slider || slides.length === 0) return;

    let current = 0;

    // Maak navigatieknoppen
    const prevBtn = document.createElement('button');
    prevBtn.textContent = '⟨';
    prevBtn.className = 'slider-btn slider-prev';
    const nextBtn = document.createElement('button');
    nextBtn.textContent = '⟩';
    nextBtn.className = 'slider-btn slider-next';
    slider.parentElement.appendChild(prevBtn);
    slider.parentElement.appendChild(nextBtn);

    function showSlide(idx) {
        slides.forEach((slide, i) => {
            slide.classList.toggle('active', i === idx);
        });
    }

    prevBtn.addEventListener('click', function () {
        current = (current - 1 + slides.length) % slides.length;
        showSlide(current);
    });
    nextBtn.addEventListener('click', function () {
        current = (current + 1) % slides.length;
        showSlide(current);
    });

    // Swipe support (optioneel)
    let startX = 0;
    slider.addEventListener('touchstart', e => {
        startX = e.touches[0].clientX;
    });
    slider.addEventListener('touchend', e => {
        let endX = e.changedTouches[0].clientX;
        if (endX - startX > 50) prevBtn.click();
        else if (startX - endX > 50) nextBtn.click();
    });

    showSlide(current);
});

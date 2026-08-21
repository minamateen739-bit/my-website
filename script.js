// 1. Navbar Logic
const menuOpenButton = document.querySelector("#menu-open-button");
const menuCloseButton = document.querySelector("#menu-close-button");
const navLinks = document.querySelectorAll(".nav-menu .nav-link"); // Optional: links click krne pr menu band ho jaye

if (menuOpenButton && menuCloseButton) {
    menuOpenButton.addEventListener("click", () => {
        document.body.classList.add("show-mobile-menu");
    });

    menuCloseButton.addEventListener("click", () => {
        document.body.classList.remove("show-mobile-menu");
    });

    // Links pr click krne se menu band ho jaye (Best for Mobile)
    navLinks.forEach(link => {
        link.addEventListener("click", () => menuCloseButton.click());
    });
}


const cards = document.querySelectorAll('.testimonial-card');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
let currentIndex = 0;

function showCard(index) {
    cards.forEach(card => card.classList.remove('active'));
    cards[index].classList.add('active');
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    showCard(currentIndex);
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    showCard(currentIndex);
});

// Optional: Auto-slide every 5 seconds
setInterval(() => {
    nextBtn.click();
}, 5000);


// Gellery
document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('galleryTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const cards = document.querySelectorAll('.gallery-card');

    if (!track || !prevBtn || !nextBtn || cards.length === 0) return;

    let currentIndex = 0;

    // Screen size ke hisab se kitni cards nazar ayengi calculate karna
    function getVisibleCards() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 992) return 2;
        return 3;
    }

    // Slider position update function
    function updateSlider() {
        const visibleCards = getVisibleCards();
        const maxIndex = cards.length - visibleCards;

        // Boundary safety check
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;

        const cardWidth = cards[0].getBoundingClientRect().width;
        const gap = 20; // CSS me set kiya gaya gap
        const moveAmount = (cardWidth + gap) * currentIndex;

        track.style.transform = `translateX(-${moveAmount}px)`;

        // Button State Update (Disable at ends)
        prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'auto';

        nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
        nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'auto';
    }

    // Next Button Click Event
    nextBtn.addEventListener('click', () => {
        const maxIndex = cards.length - getVisibleCards();
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    });

    // Previous Button Click Event
    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    });

    // Mobile Swipe Support (Touch Events)
    let startX = 0;
    let endX = 0;

    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    track.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        if (startX - endX > 50) {
            // Swipe Left -> Next
            nextBtn.click();
        } else if (endX - startX > 50) {
            // Swipe Right -> Prev
            prevBtn.click();
        }
    });

    // Window Resize Handler
    window.addEventListener('resize', updateSlider);

    // Initial Trigger
    updateSlider();
});



// Menu Open/Close Button Logic
function filterMenu(category) {
    const items = document.querySelectorAll('.menu-item');
    const buttons = document.querySelectorAll('.tab-btn');

    // Button Active State Switch
    buttons.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');

    // Menu Filter Logic
    items.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}
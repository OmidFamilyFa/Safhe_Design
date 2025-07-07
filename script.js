document.addEventListener('DOMContentLoaded', function() {

    const slider = document.getElementById('slider');

    const nextBtn = document.getElementById('nextBtn');

    const prevBtn = document.getElementById('prevBtn');

    

    if (!slider || !nextBtn || !prevBtn) return;

    const slides = Array.from(slider.children);

    const totalSlides = slides.length;

    if (totalSlides === 0) return;

    let currentSlideIndex = 0;

    let autoSlideInterval;

    function goToSlide(index) {

        currentSlideIndex = index;

        const slideWidth = slider.clientWidth;

        slider.scrollTo({

            left: currentSlideIndex * slideWidth,

            behavior: 'smooth'

        });

    }

    function startAutoSlide() {

        clearInterval(autoSlideInterval);

        autoSlideInterval = setInterval(() => {

            const nextIndex = (currentSlideIndex + 1) % totalSlides;

            goToSlide(nextIndex);

        }, 5000);

    }

    nextBtn.addEventListener('click', () => {

        const nextIndex = (currentSlideIndex + 1) % totalSlides;

        goToSlide(nextIndex);

        startAutoSlide();

    });

    prevBtn.addEventListener('click', () => {

        const prevIndex = (currentSlideIndex - 1 + totalSlides) % totalSlides;

        goToSlide(prevIndex);

        startAutoSlide();

    });

    

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                const newIndex = slides.indexOf(entry.target);

                if (newIndex !== currentSlideIndex) {

                   currentSlideIndex = newIndex;

                   startAutoSlide();

                }

            }

        });

    }, { threshold: 0.7 });

    slides.forEach(slide => observer.observe(slide));

    window.addEventListener('resize', () => {

        const slideWidth = slider.clientWidth;

        slider.scrollTo({

            left: currentSlideIndex * slideWidth,

            behavior: 'instant' 

        });

    });

    startAutoSlide();

});

import { Swiper, Navigation, Pagination } from 'swiper/js/swiper.esm.js';

Swiper.use([Navigation, Pagination]);

class initSwiper {
    constructor(container, pagination, prevEl, nextEl) {
        this.$container = document.querySelector(container);
        this.$pagination = document.querySelector(pagination);
        this.$prevEl = document.querySelector(prevEl);
        this.$nextEl = document.querySelector(nextEl);
    }

    init() {
        if (!this.$container) {
            return;
        }
        const swiperAbout = new Swiper(this.$container, {
            speed: 500,
            navigation: {
                nextEl: this.$nextEl,
                prevEl: this.$prevEl,
            },
            pagination: {
                el: this.$pagination,
                clickable: true,
            },
            breakpoints: {
                320: {
                    centeredSlides: true,
                    centeredSlidesBounds: true,
                    slidesPerView: 'auto',
                    spaceBetween: 20,
                    slidesPerGroup: 1,
                },
                767: {
                    slidesPerView: 2,
                    slidesPerGroup: 2,
                    centeredSlides: false,
                    spaceBetween: 30,
                    centeredSlidesBounds: false,
                },
                1300: {
                    slidesPerView: 3,
                    slidesPerGroup: 3,
                    spaceBetween: 30,
                }
            }
        });
    }
}

const aboutSlider = new initSwiper('.js-about-slider', '.about__pagination', '.about__prev', '.about__next');

export default aboutSlider;
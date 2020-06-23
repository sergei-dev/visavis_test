import initNav from './modules/initMenu';
import initAboutSlider from './modules/initSwiper';

document.addEventListener('DOMContentLoaded', function () {

    const preloader = document.querySelector('.js-preloader');
    if (preloader) {
        preloader.classList.add('hide');
        preloader.classList.remove('show');
    }

    //burger
    initNav.init();

    initAboutSlider.init();


});
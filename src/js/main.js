import WOW from 'wow.js';
import initAboutSlider from './modules/initSwiper';
import toggleFooterMenu from './modules/toggleMenu';
import scrollLinks from './modules/scrollLinks';
import vueInit from './modules/vueInit';
import validationContactsForm from './modules/contactForm';

document.addEventListener('DOMContentLoaded', function () {

    const $preloader = document.querySelector('.js-preloader');
    $preloader.classList.add('hide');
    $preloader.classList.remove('show');


    const toggleMenu = () => {
        const $headerBurger = document.querySelector('.js-burger');
        const $headerMenu = document.querySelector('.js-menu');
        $headerBurger.addEventListener('click', function () {
            if ($headerBurger.classList.contains('open')) {
                $headerBurger.classList.remove('open');
                $headerMenu.classList.remove('open');
                document.body.classList.remove('body-overflow');
            }

            else {
                $headerBurger.classList.add('open');
                $headerMenu.classList.add('open');
                document.body.classList.add('body-overflow');
            }
        });
    }

    // init about swiper slider
    initAboutSlider.init();

    // validation contacts form
    // validationContactsForm.init();

    // lines animation init
    new WOW().init();

    vueInit();

    toggleFooterMenu();

    toggleMenu();

    scrollLinks();

    validationContactsForm.init();
});
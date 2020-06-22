document.addEventListener('DOMContentLoaded', function () {

    const preloader = document.querySelector('.js-preloader');
    if (preloader) {
        preloader.classList.add('hide');
        preloader.classList.remove('show');
    }

    //svg inliner
    new SVGInliner(document.querySelectorAll(".svg-to-inline"), function () { });


    //burger
    const toggleMenu = () => {
        headerBurger.addEventListener('click', () => {
            const headerMenu = document.querySelector('.js-menu');
            if (headerBurger.classList.contains('open')) {
                headerBurger.classList.remove('open');
                headerMenu.classList.remove('open');
                document.body.classList.remove('body-overflow');
            }

            else {
                headerBurger.classList.add('open');
                headerMenu.classList.add('open');
                document.body.classList.add('body-overflow');
            }
        });
    }

    const headerBurger = document.querySelector('.js-burger');
    if (headerBurger) {
        toggleMenu();
    }

    const initSlider = () => {

    }

    initSlider();

});
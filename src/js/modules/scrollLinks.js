export default function scrollLinks() {
    const $headerBurger = document.querySelector('.js-burger');
    const $headerMenu = document.querySelector('.js-menu');
    const linkNav = document.querySelectorAll('[href^="#"]');
    const speed = 0.2;
    for (let i = 0; i < linkNav.length; i++) {
        linkNav[i].addEventListener('click', function (e) {
            e.preventDefault();
            if ($headerBurger.classList.contains('open')) {
                $headerBurger.classList.remove('open');
                $headerMenu.classList.remove('open');
                document.body.classList.remove('body-overflow');
            }
            let offset = window.pageYOffset,
                hash = this.href.replace(/[^#]*(.*)/, '$1');
            let top = document.querySelector(hash).getBoundingClientRect().top,
                start = null;
            requestAnimationFrame(step);
            function step(time) {
                if (start === null) start = time;
                let progress = time - start,
                    coords = (top < 0 ? Math.max(offset - progress / speed, offset + top) : Math.min(offset + progress / speed, offset + top));
                window.scrollTo(0, coords);
                if (coords != offset + top) {
                    requestAnimationFrame(step);
                } else {
                    location.hash = hash;
                }
            }
        }, false);
    }
}
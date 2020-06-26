export default function toggleFooterMenu() {
    const menuWrap = document.querySelector('.footer__wrap');
    menuWrap.addEventListener('click', toggleMenu);

    function toggleMenu(event) {
        const targ = event.target;
        if (targ.className !== 'footer__toggle-btn js-toggle-menu') {
            return;
        };
        if (targ.classList.contains('active')) {
            hideAll();
        } else {
            hideAll();
            targ.classList.add('active');
            showMenu(targ.nextElementSibling);
        }
    }

    const hideAll = () => {
        const toggleBtn = menuWrap.querySelectorAll('.js-toggle-menu');
        const togglesSub = menuWrap.querySelectorAll('.js-sub-menu');
        for (let i = 0; i < toggleBtn.length; i++) {
            toggleBtn[i].classList.remove('active');
        }
        for (let i = 0; i < togglesSub.length; i++) {
            togglesSub[i].style.maxHeight = '0';
            togglesSub[i].classList.remove('active');
        }
    }

    const showMenu = (list) => {
        list.style.maxHeight = list.scrollHeight + 'px';
        list.classList.add('active');
    }
}
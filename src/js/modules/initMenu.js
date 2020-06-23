class initMenu {
    constructor() {
        this.headerBurger = document.querySelector('.js-burger');
        this.headerMenu = document.querySelector('.js-menu');
    }

    init() {
        if (!this.headerBurger) {
            return;
        }
        this.toggleMenu();
    }

    toggleMenu() {
        this.headerBurger.addEventListener('click', () => {
            if (this.headerBurger.classList.contains('open')) {
                this.headerBurger.classList.remove('open');
                this.headerMenu.classList.remove('open');
                document.body.classList.remove('body-overflow');
            }

            else {
                this.headerBurger.classList.add('open');
                this.headerMenu.classList.add('open');
                document.body.classList.add('body-overflow');
            }
        });
    }
}

const initNav = new initMenu();

export default initNav;
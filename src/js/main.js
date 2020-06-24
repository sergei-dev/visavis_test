import inlineSVG from 'inline-svg'
import WOW from 'wow.js';
import initNav from './modules/initMenu';
import initAboutSlider from './modules/initSwiper';
import validationContactsForm from './modules/contactForm';

document.addEventListener('DOMContentLoaded', function () {

	const preloader = document.querySelector('.js-preloader');
	if (preloader) {
		preloader.classList.add('hide');
		preloader.classList.remove('show');
	}


	inlineSVG.init({
		svgSelector: 'img.svg', // the class attached to all images that should be inlined
		initClass: 'js-inlinesvg', // class added to <html>
	});

	// burger toggle menu
	initNav.init();

	// init about swiper slider
	initAboutSlider.init();

	// validation contacts form
	validationContactsForm.init();
	
	// lines animation init
	new WOW().init();
});
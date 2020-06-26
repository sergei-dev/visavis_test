class contactForm {
    constructor() {
        this.$form = document.querySelector('.js-contacts-form');
        this.$inputs = document.querySelectorAll('.site-form__input');
        this.$name = this.$form.querySelector('.site-form__input[name="name"]');
        this.$phone = this.$form.querySelector('.site-form__input[name="phone"]');
        this.$email = this.$form.querySelector('.site-form__input[name="email"]');
        this.$checkbox = document.querySelector('.site-form__check');
        this.$range = document.querySelector('.site-form__range');
        this.name = '';
        this.phone = '';
        this.email = '';
        this.amount = '';
        this.check = '';
        this.validCounter = 0;
    }

    init() {
        this.validateHandlers();
    }

    validateHandlers() {
        this.$form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.$inputs.forEach((item) => {
                this.validateForm(item);
            });
            if (this.$name.value && this.$phone.value && this.$email.value) {
                this.requestForm();
            }
        });

        this.$inputs.forEach((item) => {
            item.addEventListener('input', () => {
                this.validateForm(item);
            });
        });
    }

    validateForm(el) {
        if (el.value != '') {
            el.parentElement.querySelector('.site-form__error').style.display = 'none';
            el.parentElement.querySelector('.site-form__input-text').style.display = 'none';
            if (el.name == 'name') {
                this.name = el.value;
            }

            if (el.name == 'phone') {
                this.phone = el.value;

            }

            if (el.name == 'email') {
                this.email = el.value;
            }
        }

        else {
            el.parentElement.querySelector('.site-form__error').style.display = 'block';
            el.parentElement.querySelector('.site-form__input-text').style.display = 'block';
        }
    }

    requestForm() {
        const request = new XMLHttpRequest();
        const url = "/form-sending";
        this.amount = this.$range.value;
        this.check = this.$checkbox.checked ? this.$checkbox.value : '';
        const params = "name=" + this.name + "&phone=" + this.phone + "&email=" + this.email + "&amount=" + this.amount + "&check=" + this.check;

        request.responseType = "json";
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        request.onload = function () {
            if (this.status >= 200 && this.status < 400) {
                alert('succes');
            } else {
                alert('error');
            }
        };

        request.onerror = function () {
            alert('error');
        };

        request.send(params);
    }

}
const validationContactsForm = new contactForm();

export default validationContactsForm;
export default {
    props: ['progress'],
    template: `
            <div class="progress__item">
                <div class="progress__head">
                    <div class="progress__img-wrap">
                        <img :src="progress.avatar" alt class="progress__img" />
                    </div>
                    <h3 class="progress__title">{{ progress.title }}</h3>
                </div>
                <p class="progress__text">{{ progress.text }}</p>
                <ul class="progress__list">
                    <li class="progress__list-item" v-for="item in progress.sublist">{{ item }}</li>
                </ul>
            </div>`,
}
import progressList from './components/progressList';
import progressItem from './components/progressItem';
import VueSlideBar from 'vue-slide-bar'

export default function progressInit() {

    Vue.component('vue-range', VueSlideBar);

    new Vue({
        el: '#progress',
        data: {
            progressItems: [
                {
                    id: 0,
                    avatar: 'img/circle.svg',
                    title: '0 Lorem Ipsum is simply dummy text',
                    text: `It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout.`,
                    sublist: [
                        'Lorem Ipsum has been the industry',
                        'Standard dummy text ever since',
                        'But also the leap into electronic typesetting'
                    ]
                },
                {
                    id: 1,
                    avatar: 'img/circle.svg',
                    title: '1 Lorem Ipsum is simply dummy text',
                    text: `It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout.`,
                    sublist: [
                        'Lorem Ipsum has been the industry',
                        'Standard dummy text ever since',
                        'But also the leap into electronic typesetting',
                        'It was popularised in the 1960s'
                    ]
                },
                {
                    id: 2,
                    avatar: 'img/circle.svg',
                    title: '2 Lorem Ipsum is simply dummy text',
                    text: `It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout.`,
                    sublist: [
                        'Lorem Ipsum has been the industry',
                        'Standard dummy text ever since',
                        'But also the leap into electronic typesetting'
                    ]
                },
                {
                    id: 3,
                    avatar: 'img/circle.svg',
                    title: '3 Lorem Ipsum is simply dummy text',
                    text: `It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout.`,
                    sublist: [
                        'Lorem Ipsum has been the industry',
                        'Standard dummy text ever since',
                        'But also the leap into electronic typesetting'
                    ]
                },
                {
                    id: 4,
                    avatar: 'img/circle.svg',
                    title: '4 Lorem Ipsum is simply dummy text',
                    text: `It is a long established fact that a reader will be distracted by the
                    readable content of a page when looking at its layout.`,
                    sublist: [
                        'Lorem Ipsum has been the industry',
                        'Standard dummy text ever since',
                        'But also the leap into electronic typesetting'
                    ]
                }
            ],
        },
        mounted() {
            this.$nextTick(() => {
                this.randomItems();
                const loaderHtml = `
                    <div class="progress__anim-rotate">
                        <img src="/img/circle-rotate.svg" alt="" />
                    </div>`;
                document.querySelectorAll('.progress__item')[0].querySelector('.progress__img-wrap').insertAdjacentHTML('beforeend', loaderHtml);
            })
        },
        methods: {
            randomItems() {
                let blocks = null;
                let items = document.querySelectorAll('.progress__item');
                for (let i = 0; i < items.length; i++) {
                    blocks = document.createElement("div");
                    let random = Math.floor(Math.random() * items.length),
                        index = items[i],
                        indexParent = index.parentNode,
                        randomTwo = items[random],
                        randomParent = randomTwo.parentNode;
                    indexParent.insertBefore(blocks, index);
                    randomParent.insertBefore(index, randomTwo);
                    indexParent.insertBefore(randomTwo, blocks);
                    blocks.remove();
                }
            },
        },
        components: {
            'progress-list': progressList,
            'progress-item': progressItem,
        },
    })

    new Vue({
        el: '#vue-range',
        data: {
            slider: {
                value: 3000,
                data: [
                    500,
                    1500,
                    2500,
                    3500,
                    4500,
                    5500,
                    6500
                ],
                range: [
                    {
                        label: '500 грн'
                    },
                    {
                        label: '1500 грн',
                    },
                    {
                        label: '2500 грн'
                    },
                    {
                        label: '3500 грн',
                    },
                    {
                        label: '4500 грн'
                    },
                    {
                        label: '5500 грн',
                    },
                    {
                        label: '6500 грн'
                    }
                ],
            },
        },
        methods: {
            callbackRange(val) {
              this.slider.value = val;
            }
          }
    })
}
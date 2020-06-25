import progressItem from './progressItem'

export default {
    template: '<div class="progress__wrap"><slot></slot></div>',
    components: {
        'progress-item': progressItem
    }
}
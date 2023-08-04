import { ref, computed } from 'vue'


/*
const count = ref(0)
export const getClickCount = computed(() => count.value)
export const incrementClicks = () => count.value += 1
*/

class Store {
    count = ref(0);
    getClickCount = computed(() => this.count.value)
    incrementClicks = () => this.count.value += 1
}

export default Store;
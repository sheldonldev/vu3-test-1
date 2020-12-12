import {ref} from 'vue'
const useDebounce = () => {
  const timeout = ref("")
    debounce(func, wait = 1000) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(func, wait);
    }
}

export default useDebounce;

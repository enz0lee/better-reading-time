export default defineContentScript({
  registration: 'runtime',
  main() {
    const fabButton = document.getElementById('readinger-fab-button')
    return fabButton ? fabButton.innerText : undefined
  },
})

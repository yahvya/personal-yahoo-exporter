import { createApp } from 'vue'
import App from './views/App.vue'
import "./global/styles/app.css";

createApp(App).mount('#app').$nextTick(() => {
  // Use contextBridge
  window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
  })
})

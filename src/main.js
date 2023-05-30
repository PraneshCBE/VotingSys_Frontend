import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
const app = createApp(App)
app.config.globalProperties.$url = 'http://3.216.4.3:3000/'
app.use(router).mount('#app')

app.config.globalProperties.$contractAddress = "0x0d9455F35Fc243dE68a1a4231022E8573a8c913e"
app.config.globalProperties.$abi = JSON.parse(
    `[
{
    "inputs": [
        {
            "internalType": "string",
            "name": "_message",
            "type": "string"
        }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
},
{
    "inputs": [],
    "name": "getMessage",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [],
    "name": "message",
    "outputs": [
        {
            "internalType": "string",
            "name": "",
            "type": "string"
        }
    ],
    "stateMutability": "view",
    "type": "function"
},
{
    "inputs": [
        {
            "internalType": "string",
            "name": "_message",
            "type": "string"
        }
    ],
    "name": "setMessage",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
}
]`
)
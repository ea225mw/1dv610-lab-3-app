import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'

const sw = stringWorks
const p = document.querySelector('p')
const str = p.textContent
console.log(sw.findLongestWord(str))
console.log(sw.findShortestWord(str))
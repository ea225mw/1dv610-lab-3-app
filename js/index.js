
import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'

const sw = stringWorks

const textArea = document.querySelector('textarea')
const longestWordsTD = document.querySelector('#longestWordsTD')
const longestLettersTD = document.querySelector('#longestLettersTD')
const shortestWordsTD = document.querySelector('#shortestWordsTD')
const shortestLettersTD = document.querySelector('#shortestLettersTD')
let textProvidedByUser

textArea.addEventListener('input', () => {
  textProvidedByUser = textArea.value
  findShortestWord()
  findLongestWord()
})

function findShortestWord() {
  const shortestWord = sw.findShortestWord(textProvidedByUser)
  shortestWordsTD.textContent = shortestWord.words
  shortestLettersTD.textContent = shortestWord.numberOfLetters
}

function findLongestWord() {
  const longestWord = sw.findLongestWord(textProvidedByUser)
  longestWordsTD.textContent = longestWord.words
  longestLettersTD.textContent = longestWord.numberOfLetters
}

/**
 * Formattering av text
 * Markdown
 * En visualisering av utvalda ord
 * News article checker + LLM, få ut mer ur texten, vad den signalerar
 */
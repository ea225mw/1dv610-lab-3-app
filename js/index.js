
import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'

const sw = stringWorks

const textArea = document.querySelector('textarea')
const longestWordsTD = document.querySelector('#longestWordsTD')
const longestLettersTD = document.querySelector('#longestLettersTD')
const shortestWordsTD = document.querySelector('#shortestWordsTD')
const shortestLettersTD = document.querySelector('#shortestLettersTD')
let textProvidedByUser
const mostFrequentLetterTD = document.querySelector('#mostFrequentLetterTD')
const mostFrequentLetterAmountTD = document.querySelector('#mostFrequentLetterAmountTD')


textArea.addEventListener('input', () => {
  textProvidedByUser = textArea.value
  if (textProvidedByUser === '') {
    resetTable()
  }
  findShortestWord()
  findLongestWord()
  findMostFrequentLetter()
})

function findShortestWord() {
  const shortestWord = sw.findShortestWord(textProvidedByUser)
  let newString = ''
  for (const word of shortestWord.words) {
    newString += word + ', '
  }
  shortestWordsTD.textContent = newString.slice(0, -2)
  if (shortestWord.numberOfLetters > 0) {
    shortestLettersTD.textContent = shortestWord.numberOfLetters
  }
}

function findLongestWord() {
  const longestWord = sw.findLongestWord(textProvidedByUser)
  let newString = ''
  for (const word of longestWord.words) {
    newString += word + ', '
  }
  longestWordsTD.textContent = newString.slice(0, -2)
  if (longestWord.numberOfLetters > 0) {
    longestLettersTD.textContent = longestWord.numberOfLetters
  }

}

function findMostFrequentLetter() {
  const mostFrequentLetter = sw.mostFrequentLetter(textProvidedByUser)
  if (mostFrequentLetter.length > 0) {
    for (const [key, value] of Object.entries(mostFrequentLetter[0])) {
      mostFrequentLetterTD.textContent = key
      mostFrequentLetterAmountTD.textContent = value
    }
  }
}

function resetTable() {
  const allDataHolders = document.querySelectorAll('td.dataholder')
  allDataHolders.forEach((td) => td.textContent = '')
}

/**
 * Formattering av text
 * Markdown
 * En visualisering av utvalda ord
 * News article checker + LLM, få ut mer ur texten, vad den signalerar
 */
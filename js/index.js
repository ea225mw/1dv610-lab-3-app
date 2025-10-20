import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'

const stringAnalyzer = new StringAnalyzer
const viewHandler = new ViewHandler
let ascendingOrder = true

// ---------- DOM References ----------
export const longestWordsTD = document.querySelector('#longestWordsTD')
export const longestLettersTD = document.querySelector('#longestLettersTD')

export const shortestWordsTD = document.querySelector('#shortestWordsTD')
export const shortestLettersTD = document.querySelector('#shortestLettersTD')

export const mostFrequentLetterTD = document.querySelector('#mostFrequentLetterTD')
export const mostFrequentLetterAmountTD = document.querySelector('#mostFrequentLetterAmountTD')

export const mostFrequentLetterCS_TD = document.querySelector('#mostFrequentLetterCS_TD')
export const mostFrequentLetterAmountCS_TD = document.querySelector('#mostFrequentLetterAmountCS_TD')

export const sortedWordsDiv = document.querySelector('#sortedWordsDiv')

export const numberOfWordsDiv = document.querySelector('#numberOfWordsDiv')
export const numberOfLettersDiv = document.querySelector('#numberOfLettersDiv')

const editArea = document.querySelector('#editArea')

const radioButtonsDiv = document.querySelector('#radioButtonsDiv')
const updateSortedWordsButton = document.querySelector('#updateSortedWordsButton')

export const skipDuplicatesCheckbox = document.querySelector('#skipDuplicates')

const phraseCountForm = document.querySelector('#phraseCountForm')
const phraseInput = document.querySelector('#phraseInput')
export const phraseCountResultDiv = document.querySelector('#phraseCountResultDiv')

let cleanedTextToAnalyze = ''

/* --------------- EVENT LISTENERS ----------------- */
editArea.addEventListener('input', () => {
  cleanedTextToAnalyze = removeHtmlAndKeepPureText()

  if (cleanedTextToAnalyze === '' || editArea.textContent === '') {
    resetStatistics()
    editArea.innerHTML = ''
  }
  mainFunction()
})

phraseCountForm.addEventListener('submit', (event) => {
  event.preventDefault()

  if (cleanedTextToAnalyze !== '' || editArea.textContent !== '') {
    const phrase = phraseInput.value
    const numberOfOccurances = stringAnalyzer.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
    viewHandler.updatePhraseCountResult(numberOfOccurances, phrase)
  }
})

radioButtonsDiv.addEventListener('click', (event) => {
  const target = event.target.closest('input')
  if (target !== null) {
    setSortOrder(target.value)
  }
})

updateSortedWordsButton.addEventListener('click', () => {
  getSortedWords()
})

/* --------------- FUNCTIONS --------------- */

function mainFunction() {
  const shortestWordObject = stringAnalyzer.findShortestWord(cleanedTextToAnalyze)
  viewHandler.updateShortestWordInTable(shortestWordObject)

  const longestWordObject = stringAnalyzer.findLongestWord(cleanedTextToAnalyze)
  viewHandler.updateLongestWordInTable(longestWordObject)

  const mostFrequentLetterObject = stringAnalyzer.findMostFrequentLetter(cleanedTextToAnalyze)
  viewHandler.updateMostFrequentLetterInTable(mostFrequentLetterObject)

  const mostFrequentLetterCaseSensObject = stringAnalyzer.findMostFrequentLetterCaseSens(cleanedTextToAnalyze)
  viewHandler.updateMostFrequentLetterCaseSensInTable(mostFrequentLetterCaseSensObject)

  const numberOfWords = stringAnalyzer.countWords(cleanedTextToAnalyze)
  viewHandler.updateWordCount(numberOfWords)

  const numberOfTotalLetters = stringAnalyzer.countTotalLetters(cleanedTextToAnalyze)
  viewHandler.updateTotalLetterCount(numberOfTotalLetters)
}

function setSortOrder(value) {
  if (value === 'ascending' && ascendingOrder === false) {
    ascendingOrder = true
    getSortedWords()
  } else if (value === 'descending' && ascendingOrder === true) {
    ascendingOrder = false
    getSortedWords()
  }
}

function getSortedWords() {
  let sortedWords
  if (ascendingOrder) {
    sortedWords = stringAnalyzer.sortWordsAscending(cleanedTextToAnalyze)
  } else {
    sortedWords = stringAnalyzer.sortWordsDescending(cleanedTextToAnalyze)
  }
  viewHandler.updateSortedWords(sortedWords)
}

function removeHtmlAndKeepPureText() {
  const textWithHtmlTags = editArea.innerHTML
  return textWithHtmlTags
    .replace(/<div><br><\/div>/g, '\n')
    .replace(/<div>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/div>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp/g, '')
}

function resetStatistics() {
  resetDataholders()
  phraseCountResultDiv.textContent = ''
  sortedWordsDiv.innerHTML = ''
  numberOfWordsDiv.textContent = ''
  numberOfLettersDiv.textContent = ''
}

function resetDataholders() {
  const allDataHolders = document.querySelectorAll('td.dataholder')
  allDataHolders.forEach((dataholder) => dataholder.textContent = '')
}


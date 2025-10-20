import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'
import * as DOM_Ref from './DOM_References.js'

const stringAnalyzer = new StringAnalyzer
const viewHandler = new ViewHandler
let ascendingOrder = true
let cleanedTextToAnalyze = ''

/* --------------- EVENT LISTENERS ----------------- */
DOM_Ref.editArea.addEventListener('input', () => {
  cleanedTextToAnalyze = removeHtmlAndKeepPureText()

  if (cleanedTextToAnalyze === '' || DOM_Ref.editArea.textContent === '') {
    resetStatistics()
    DOM_Ref.editArea.innerHTML = ''
  }
  mainFunction()
})

DOM_Ref.phraseCountForm.addEventListener('submit', (event) => {
  event.preventDefault()

  if (cleanedTextToAnalyze !== '' || editArea.textContent !== '') {
    const phrase = DOM_Ref.phraseInput.value
    const numberOfOccurances = stringAnalyzer.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
    viewHandler.updatePhraseCountResult(numberOfOccurances, phrase)
  }
})

DOM_Ref.sortChoicesDiv.addEventListener('click', (event) => {
  const target = event.target.closest('input')
  if (target !== null && target.value !== 'skipDuplicates') {
    setSortOrder(target.value)
  } else if (target !== null && target.value === 'skipDuplicates') {
    getSortedWords()
  }
})

DOM_Ref.updateSortedWordsButton.addEventListener('click', () => {
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
  const textWithHtmlTags = DOM_Ref.editArea.innerHTML
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
  DOM_Ref.phraseCountResultDiv.textContent = ''
  DOM_Ref.sortedWordsDiv.innerHTML = ''
  DOM_Ref.numberOfWordsDiv.textContent = ''
  DOM_Ref.numberOfLettersDiv.textContent = ''
}

function resetDataholders() {
  const allDataHolders = document.querySelectorAll('td.dataholder')
  allDataHolders.forEach((dataholder) => dataholder.textContent = '')
}
import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'
import { Resetter } from './Resetter.js'
import * as DOM_Ref from './DOM_References.js'

const stringAnalyzer = new StringAnalyzer()
const viewHandler = new ViewHandler()
const resetter = new Resetter()

let ascendingOrder = true
let cleanedTextToAnalyze = ''
export const allDataHolders = document.querySelectorAll('td.dataholder')

/* --------------- EVENT LISTENERS ----------------- */
DOM_Ref.editArea.addEventListener('input', () => {
  try {
    updateCleanedTextToAnalyze()
    updateHTMLElementsInRealtime()
    getAndDisplaySortedWords()
  } catch (error) {
    console.log(error)
    return error
  }
})

DOM_Ref.phraseCountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  submitPhraseCountForm()
})

DOM_Ref.sortOrderChoicesDiv.addEventListener('click', (event) => {
  const sortOrder = extractSortOrderValue(event)
  setSortOrder(sortOrder)
  getAndDisplaySortedWords()
})

DOM_Ref.skipDuplicatesDiv.addEventListener('click', () => {
  getAndDisplaySortedWords()
})

/* --------------- FUNCTIONS --------------- */

export function setCleanedTextToAnalyzeToEmptyString() {
  cleanedTextToAnalyze = ''
}

function updateCleanedTextToAnalyze() {
  const onlyEmptyElements = hasEditAreaOnlyEmptyElements()
  if (onlyEmptyElements) {
    resetter.emptyEditAreaAndCleanedString()
    resetter.resetStatistics()
  } else {
    cleanedTextToAnalyze = removeHtmlAndKeepPureText().trim()
  }
}

function updateHTMLElementsInRealtime() {
  const shortestWordObject = stringAnalyzer.findShortestWord(cleanedTextToAnalyze)
  viewHandler.updateShortestWordInTable(shortestWordObject)

  const longestWordObject = stringAnalyzer.findLongestWord(cleanedTextToAnalyze)
  viewHandler.updateLongestWordInTable(longestWordObject)

  const mostFrequentLetterObject = stringAnalyzer.findMostFrequentLetter(cleanedTextToAnalyze)
  viewHandler.updateMostFrequentLetterInTable(mostFrequentLetterObject)

  const mostFrequentLetterCaseSensObject = stringAnalyzer.findMostFrequentLetterCaseSens(cleanedTextToAnalyze)
  viewHandler.updateMostFrequentLetterCaseSensInTable(mostFrequentLetterCaseSensObject)

  const numberOfWords = stringAnalyzer.countWords(cleanedTextToAnalyze.trim())
  viewHandler.updateWordCount(numberOfWords)

  const numberOfTotalLetters = stringAnalyzer.countTotalLetters(cleanedTextToAnalyze)
  viewHandler.updateTotalLetterCount(numberOfTotalLetters)
}

function hasEditAreaOnlyEmptyElements() {
  const possibleHtmlLeftovers = ['<br>', '<br/>', '<div><br></div>', '<p><br></p>']
  const contentInEditArea = DOM_Ref.editArea.innerHTML.trim()
  return possibleHtmlLeftovers.some((element) => element === contentInEditArea)
}

function submitPhraseCountForm() {
  if (cleanedTextToAnalyze !== '' || editArea.textContent !== '') {
    const phrase = DOM_Ref.phraseInput.value
    const numberOfOccurances = stringAnalyzer.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
    viewHandler.updatePhraseCountResult(numberOfOccurances, phrase)
  }
}

function extractSortOrderValue(event) {
  const targetDiv = event.target.closest('div')
  if (targetDiv !== null) {
    return targetDiv.querySelector('input').value
  }
}

function setSortOrder(value) {
  if (value === 'ascending' && ascendingOrder === false) {
    ascendingOrder = true
  } else if (value === 'descending' && ascendingOrder === true) {
    ascendingOrder = false
  }
}

export function isSkipDuplicatesChecked() {
  if (DOM_Ref.skipDuplicatesCheckbox.checked) return true
  else return false
}

function getAndDisplaySortedWords() {
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

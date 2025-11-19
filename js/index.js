import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'
import { Resetter } from './Resetter.js'
import { SortingOptionsHandler } from './SortingOptionsHandler.js'
import { DOMReferencer } from './DOMReferencer.js'

const DOM_Ref = new DOMReferencer()
const viewHandler = new ViewHandler(DOM_Ref)
const resetter = new Resetter(DOM_Ref)
const sortingOptionsHandler = new SortingOptionsHandler(DOM_Ref)
const stringAnalyzer = new StringAnalyzer()

let shortestWordObject
let longestWordObject
let mostFrequentLetterObject
let mostFrequentLetterCaseSensObject
let numberOfWords
let numberOfTotalLetters

let cleanedTextToAnalyze = ''
export let ascendingOrder = true
export const allDataHolders = document.querySelectorAll('td.dataholder')

/* --------------- EVENT LISTENERS ----------------- */
DOM_Ref.editArea.addEventListener('input', () => {
  try {
    updateCleanedTextToAnalyze()
    analyzeTextInRealtime()
    updateHTMLElementsInRealtime()
    getAndDisplaySortedWords()
  } catch (error) {
    console.log(error)
  }
})

DOM_Ref.phraseCountForm.addEventListener('submit', (event) => {
  try {
    event.preventDefault()
    submitPhraseCountForm()
  } catch (error) {
    console.log(error)
  }
})

DOM_Ref.sortOrderChoicesDiv.addEventListener('click', (event) => {
  try {
    const sortOrder = sortingOptionsHandler.extractSortOrderValue(event)
    sortingOptionsHandler.setSortOrder(sortOrder)
    getAndDisplaySortedWords()
  } catch (error) {
    console.log(error)
  }
})

DOM_Ref.skipDuplicatesDiv.addEventListener('click', () => {
  try {
    getAndDisplaySortedWords()
  } catch (error) {
    console.log(error)
  }
})

/* --------------- EXPORTED FUNCTIONS --------------- */
export function setCleanedTextToAnalyzeToEmptyString() {
  cleanedTextToAnalyze = ''
}

export function setAscendingOrder(boolean) {
  ascendingOrder = boolean
}

export function isSkipDuplicatesChecked() {
  return sortingOptionsHandler.isSkipDuplicatesChecked()
}

/* --------------- FUNCTIONS --------------- */
function updateCleanedTextToAnalyze() {
  const onlyEmptyElements = hasEditAreaOnlyEmptyElements()
  if (onlyEmptyElements) {
    resetter.emptyEditAreaAndCleanedString()
    resetter.resetStatistics()
  } else {
    cleanedTextToAnalyze = removeHtmlAndKeepPureText().trim()
  }
}

function hasEditAreaOnlyEmptyElements() {
  const possibleHtmlLeftovers = ['<br>', '<br/>', '<div><br></div>', '<p><br></p>']
  const contentInEditArea = DOM_Ref.editArea.innerHTML.trim()
  return possibleHtmlLeftovers.some((element) => element === contentInEditArea)
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

function analyzeTextInRealtime() {
  shortestWordObject = stringAnalyzer.findShortestWord(cleanedTextToAnalyze)
  longestWordObject = stringAnalyzer.findLongestWord(cleanedTextToAnalyze)
  mostFrequentLetterObject = stringAnalyzer.findMostFrequentLetter(cleanedTextToAnalyze)
  mostFrequentLetterCaseSensObject = stringAnalyzer.findMostFrequentLetterCaseSens(cleanedTextToAnalyze)
  numberOfWords = stringAnalyzer.countWords(cleanedTextToAnalyze.trim())
  numberOfTotalLetters = stringAnalyzer.countTotalLetters(cleanedTextToAnalyze)
}

function updateHTMLElementsInRealtime() {
  viewHandler.updateShortestWordInTable(shortestWordObject)
  viewHandler.updateLongestWordInTable(longestWordObject)
  viewHandler.updateMostFrequentLetterInTable(mostFrequentLetterObject)
  viewHandler.updateMostFrequentLetterCaseSensInTable(mostFrequentLetterCaseSensObject)
  viewHandler.updateWordCount(numberOfWords)
  viewHandler.updateTotalLetterCount(numberOfTotalLetters)
}

function submitPhraseCountForm() {
  if (cleanedTextToAnalyze !== '' || editArea.textContent !== '') {
    const phrase = DOM_Ref.phraseInput.value
    const numberOfOccurrences = stringAnalyzer.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
    viewHandler.updatePhraseCountResult(numberOfOccurrences, phrase)
  }
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

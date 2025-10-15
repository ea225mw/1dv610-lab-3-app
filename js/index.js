import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'
import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'

const sw = stringWorks
const stringAnalyzer = new StringAnalyzer
const viewHandler = new ViewHandler

// ---------- DOM References ----------
export const longestWordsTD = document.querySelector('#longestWordsTD')
export const longestLettersTD = document.querySelector('#longestLettersTD')
export const shortestWordsTD = document.querySelector('#shortestWordsTD')
export const shortestLettersTD = document.querySelector('#shortestLettersTD')
export const mostFrequentLetterTD = document.querySelector('#mostFrequentLetterTD')
export const mostFrequentLetterAmountTD = document.querySelector('#mostFrequentLetterAmountTD')
const editArea = document.querySelector('#editArea')
const phraseCountForm = document.querySelector('#phraseCountForm')
const phraseInput = document.querySelector('#phraseInput')
export const phraseCountResultDiv = document.querySelector('#phraseCountResultDiv')

let cleanedTextToAnalyze = ''
let shortestWordObject
let longestWordObject
let mostFrequentLetterObject
let phrase = ''

/* --------------- EVENT LISTENERS ----------------- */
editArea.addEventListener('input', () => {
  cleanedTextToAnalyze = removeHtmlAndKeepPureText()

  if (cleanedTextToAnalyze === '' || editArea.textContent === '') {
    resetTable()
    editArea.innerHTML = ''
  }

  shortestWordObject = stringAnalyzer.findShortestWord(cleanedTextToAnalyze)
  viewHandler.updateShortestWordInTable(shortestWordObject)

  longestWordObject = stringAnalyzer.findLongestWord(cleanedTextToAnalyze)
  viewHandler.updateLongestWordInTable(longestWordObject)

  mostFrequentLetterObject = stringAnalyzer.findMostFrequentLetter(cleanedTextToAnalyze)
  viewHandler.updateMostFrequentLetterInTable(mostFrequentLetterObject)
})

phraseCountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  const phrase = phraseInput.value
  // cleanedTextToAnalyze = removeHtmlAndKeepPureText()
  const numberOfOccurances = stringAnalyzer.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
  viewHandler.updatePhraseCountResult(numberOfOccurances, phrase)


})

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

function resetTable() {
  const allDataHolders = document.querySelectorAll('td.dataholder')
  allDataHolders.forEach((dataholder) => dataholder.textContent = '')
}



/*
function colorizeLongestWord() {
  const treeWalker = document.createTreeWalker(editArea, NodeFilter.SHOW_TEXT)
  const longestWordRegExp = new RegExp(`\\b(${longestWordObject.words[0]}) \\b`, "gi")
  console.log(longestWordRegExp);

  const textNodes = []
  while (treeWalker.nextNode()) {
    textNodes.push(treeWalker.currentNode)
  }

  for (const node of textNodes) {
    if (longestWordRegExp.test(node.textContent)) {
      const span = document.createElement('span')
      span.innerHTML = node.textContent.replace(longestWordRegExp, `<span class="longestWord">$1</span>`)
      node.replaceWith(...span.childNodes)
    }
  }
}
*/

/**
 * Formattering av text
 * Markdown
 * En visualisering av utvalda ord
 * News article checker + LLM, få ut mer ur texten, vad den signalerar
 */
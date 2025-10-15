import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'

const sw = stringWorks

// ---------- DOM References ----------
const textArea = document.querySelector('textarea')
const longestWordsTD = document.querySelector('#longestWordsTD')
const longestLettersTD = document.querySelector('#longestLettersTD')
const shortestWordsTD = document.querySelector('#shortestWordsTD')
const shortestLettersTD = document.querySelector('#shortestLettersTD')
const mostFrequentLetterTD = document.querySelector('#mostFrequentLetterTD')
const mostFrequentLetterAmountTD = document.querySelector('#mostFrequentLetterAmountTD')
const editArea = document.querySelector('#editArea')
const phraseCountForm = document.querySelector('#phraseCountForm')
const phraseInput = document.querySelector('#phraseInput')
const phraseCountResultDiv = document.querySelector('#phraseCountResultDiv')

let cleanedTextToAnalyze = ''
let shortestWordObject
let longestWordObject
let phrase = ''

/* --------------- EVENT LISTENERS ----------------- */
editArea.addEventListener('input', () => {
  cleanedTextToAnalyze = removeHtmlAndKeepPureText()

  if (cleanedTextToAnalyze === '' || editArea.textContent === '') {
    resetTable()
    editArea.innerHTML = ''
  }

  findShortestWord()
  findLongestWord()
  findMostFrequentLetter()
})

phraseCountForm.addEventListener('submit', (event) => {
  event.preventDefault()
  cleanedTextToAnalyze = removeHtmlAndKeepPureText()
  const numberOfOccurances = countSpecifiedPhrase()

  phraseCountResultDiv.textContent = `The phrase \"${phrase}\" occurs ${numberOfOccurances} times.`
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

function findShortestWord() {
  shortestWordObject = sw.findShortestWord(cleanedTextToAnalyze)
  shortestWordsTD.textContent = prepareTableText(shortestWordObject.words)

  if (shortestWordObject.numberOfLetters > 0) {
    shortestLettersTD.textContent = shortestWordObject.numberOfLetters
  }
}

function findLongestWord() {
  longestWordObject = sw.findLongestWord(cleanedTextToAnalyze)
  longestWordsTD.textContent = prepareTableText(longestWordObject.words)

  if (longestWordObject.numberOfLetters > 0) {
    longestLettersTD.textContent = longestWordObject.numberOfLetters
  }
}

function prepareTableText(array) {
  let concatinatedString = ''
  for (const word of array) {
    concatinatedString += word + ', '
  }
  return concatinatedString.slice(0, -2)
}

function findMostFrequentLetter() {
  const mostFrequentLetter = sw.mostFrequentLetter(cleanedTextToAnalyze)
  if (mostFrequentLetter.length > 0) {
    for (const [key, value] of Object.entries(mostFrequentLetter[0])) {
      mostFrequentLetterTD.textContent = key
      mostFrequentLetterAmountTD.textContent = value
    }
  }
}

function resetTable() {
  const allDataHolders = document.querySelectorAll('td.dataholder')
  allDataHolders.forEach((dataholder) => dataholder.textContent = '')
}

function countSpecifiedPhrase() {
  phrase = phraseInput.value
  return sw.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
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
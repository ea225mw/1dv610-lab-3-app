export class DOMReferencer {
  longestWordsTD = document.querySelector('#longestWordsTD')
  longestLettersTD = document.querySelector('#longestLettersTD')

  shortestWordsTD = document.querySelector('#shortestWordsTD')
  shortestLettersTD = document.querySelector('#shortestLettersTD')

  mostFrequentLetterTD = document.querySelector('#mostFrequentLetterTD')
  mostFrequentLetterAmountTD = document.querySelector('#mostFrequentLetterAmountTD')

  mostFrequentLetterCS_TD = document.querySelector('#mostFrequentLetterCS_TD')
  mostFrequentLetterAmountCS_TD = document.querySelector('#mostFrequentLetterAmountCS_TD')

  numberOfWordsDiv = document.querySelector('#numberOfWordsDiv')
  numberOfLettersDiv = document.querySelector('#numberOfLettersDiv')

  editArea = document.querySelector('#editArea')

  sortedWordsDiv = document.querySelector('#sortedWordsDiv')
  sortOrderChoicesDiv = document.querySelector('#sortChoicesDiv')
  updateSortedWordsButton = document.querySelector('#updateSortedWordsButton')

  skipDuplicatesCheckbox = document.querySelector('#skipDuplicates')
  skipDuplicatesDiv = document.querySelector('#skipDuplicatesDiv')

  phraseCountForm = document.querySelector('#phraseCountForm')
  phraseInput = document.querySelector('#phraseInput')
  phraseCountResultDiv = document.querySelector('#phraseCountResultDiv')

  allDataHolders = document.querySelectorAll('td.dataholder')
}

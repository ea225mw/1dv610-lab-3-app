import { shortestWordsTD, shortestLettersTD, longestWordsTD, longestLettersTD, mostFrequentLetterTD, mostFrequentLetterAmountTD, phraseCountResultDiv } from "./index.js";

export class ViewHandler {

  updateShortestWordInTable(shortestWordObject) {
    shortestWordsTD.textContent = this.#prepareTableText(shortestWordObject.words)

    if (shortestWordObject.numberOfLetters > 0) {
      shortestLettersTD.textContent = shortestWordObject.numberOfLetters
    }
  }

  updateLongestWordInTable(longestWordObject) {
    longestWordsTD.textContent = this.#prepareTableText(longestWordObject.words)

    if (longestWordObject.numberOfLetters > 0) {
      longestLettersTD.textContent = longestWordObject.numberOfLetters
    }
  }

  updateMostFrequentLetterInTable(mostFrequentLetterObject) {
    if (mostFrequentLetterObject.length > 0) {
      for (const [key, value] of Object.entries(mostFrequentLetterObject[0])) {
        mostFrequentLetterTD.textContent = key
        mostFrequentLetterAmountTD.textContent = value
      }
    }
  }

  updatePhraseCountResult(numberOfOccurances, phrase) {
    phraseCountResultDiv.textContent = `The phrase \"${phrase}\" occurs ${numberOfOccurances} times.`
  }

  #prepareTableText(array) {
    let concatinatedString = ''
    for (const word of array) {
      concatinatedString += word + ', '
    }
    return concatinatedString.slice(0, -2)
  }
}
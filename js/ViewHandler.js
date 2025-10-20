// Import HTML element referencess from index.js
import {
  shortestWordsTD, shortestLettersTD,
  longestWordsTD, longestLettersTD,
  mostFrequentLetterTD, mostFrequentLetterAmountTD,
  mostFrequentLetterCS_TD, mostFrequentLetterAmountCS_TD,
  phraseCountResultDiv,
  sortedWordsDiv,
  numberOfWordsDiv, numberOfLettersDiv
}
  from "./index.js"

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
      const preparedObjectData = this.#prepareFrequentLetterData(mostFrequentLetterObject)
      mostFrequentLetterTD.textContent = preparedObjectData.concatString
      mostFrequentLetterAmountTD.textContent = preparedObjectData.occurances
    }
  }

  updateMostFrequentLetterCaseSensInTable(mostFrequentLetterCaseSensObject) {
    if (mostFrequentLetterCaseSensObject.length > 0) {
      const preparedObjectData = this.#prepareFrequentLetterData(mostFrequentLetterCaseSensObject)
      mostFrequentLetterCS_TD.textContent = preparedObjectData.concatString
      mostFrequentLetterAmountCS_TD.textContent = preparedObjectData.occurances
    }
  }

  updatePhraseCountResult(numberOfOccurances, phrase) {
    phraseCountResultDiv.textContent = `The phrase \"${phrase}\" occurs ${numberOfOccurances} times.`
  }

  updateSortedWords(sortedWordsArray) {
    sortedWordsDiv.innerHTML = ''
    const allCreatedPTags = []
    sortedWordsArray.forEach((element) => {
      const p = document.createElement('p')
      p.textContent = element
      allCreatedPTags.push(p)
    })
    this.organizePTags(allCreatedPTags)
  }

  organizePTags(allCreatedPTags) {
    let maximumPTagsInDiv = 15
    const div = document.createElement('div')

    allCreatedPTags.forEach((pTag) => {
      div.append(pTag)
      if (div.childElementCount === maximumPTagsInDiv) {
        sortedWordsDiv.append(div.cloneNode(true))
        div.innerHTML = ''
      }
    })
    sortedWordsDiv.append(div)
  }

  updateWordCount(numberOfWords) {
    numberOfWordsDiv.textContent = numberOfWords
  }

  updateTotalLetterCount(numberOfLetters) {
    numberOfLettersDiv.textContent = numberOfLetters
  }

  #prepareFrequentLetterData(object) {
    let concatString = ''
    let occurances

    object.forEach((element) => {
      for (const [key, value] of Object.entries(element)) {
        concatString += key + ', '
        occurances = value
      }
    })
    return { concatString: concatString.slice(0, -2), occurances: occurances }
  }

  #prepareTableText(array) {
    let concatinatedString = ''
    for (const word of array) {
      concatinatedString += word + ', '
    }
    return concatinatedString.slice(0, -2)
  }
}
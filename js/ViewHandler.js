// Import HTML element references.
import * as DOM_Ref from './DOM_References.js'

export class ViewHandler {

  updateShortestWordInTable(shortestWordObject) {
    DOM_Ref.shortestWordsTD.textContent = this.#prepareTableText(shortestWordObject.words)

    if (shortestWordObject.numberOfLetters > 0) {
      DOM_Ref.shortestLettersTD.textContent = shortestWordObject.numberOfLetters
    }
  }

  updateLongestWordInTable(longestWordObject) {
    DOM_Ref.longestWordsTD.textContent = this.#prepareTableText(longestWordObject.words)

    if (longestWordObject.numberOfLetters > 0) {
      DOM_Ref.longestLettersTD.textContent = longestWordObject.numberOfLetters
    }
  }

  updateMostFrequentLetterInTable(mostFrequentLetterObject) {
    if (mostFrequentLetterObject.length > 0) {
      const preparedObjectData = this.#prepareFrequentLetterData(mostFrequentLetterObject)
      DOM_Ref.mostFrequentLetterTD.textContent = preparedObjectData.concatString
      DOM_Ref.mostFrequentLetterAmountTD.textContent = preparedObjectData.occurances
    }
  }

  updateMostFrequentLetterCaseSensInTable(mostFrequentLetterCaseSensObject) {
    if (mostFrequentLetterCaseSensObject.length > 0) {
      const preparedObjectData = this.#prepareFrequentLetterData(mostFrequentLetterCaseSensObject)
      DOM_Ref.mostFrequentLetterCS_TD.textContent = preparedObjectData.concatString
      DOM_Ref.mostFrequentLetterAmountCS_TD.textContent = preparedObjectData.occurances
    }
  }

  updatePhraseCountResult(numberOfOccurances, phrase) {
    DOM_Ref.phraseCountResultDiv.textContent = `The phrase \"${phrase}\" occurs ${numberOfOccurances} times.`
  }

  updateSortedWords(sortedWordsArray) {
    DOM_Ref.sortedWordsDiv.innerHTML = ''
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
    DOM_Ref.sortedWordsDiv.append(div)
  }

  updateWordCount(numberOfWords) {
    DOM_Ref.numberOfWordsDiv.textContent = numberOfWords
  }

  updateTotalLetterCount(numberOfLetters) {
    DOM_Ref.numberOfLettersDiv.textContent = numberOfLetters
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
import { setCleanedTextToAnalyzeToEmptyString } from './index.js'
import { allDataHolders } from './index.js'

export class Resetter {
  #DOM_Ref
  constructor(DOM_Ref) {
    this.#DOM_Ref = DOM_Ref
  }

  emptyEditAreaAndCleanedString() {
    this.#DOM_Ref.editArea.innerHTML = ''
    setCleanedTextToAnalyzeToEmptyString()
  }

  resetStatistics() {
    this.#resetDataholders()
    this.#DOM_Ref.phraseCountResultDiv.textContent = ''
    this.#DOM_Ref.sortedWordsDiv.innerHTML = ''
    this.#DOM_Ref.numberOfWordsDiv.textContent = ''
    this.#DOM_Ref.numberOfLettersDiv.textContent = ''
    this.#DOM_Ref.phraseCountResultDiv.textContent = ''
    this.#DOM_Ref.phraseInput.value = ''
  }

  #resetDataholders() {
    allDataHolders.forEach((dataholder) => (dataholder.textContent = ''))
  }
}

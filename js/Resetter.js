import * as DOM_Ref from './DOM_References.js'
import { setCleanedTextToAnalyzeToEmptyString } from './index.js'
import { allDataHolders } from './index.js'

export class Resetter {
  emptyEditAreaAndCleanedString() {
    DOM_Ref.editArea.innerHTML = ''
    setCleanedTextToAnalyzeToEmptyString()
  }

  resetStatistics() {
    this.#resetDataholders()
    DOM_Ref.phraseCountResultDiv.textContent = ''
    DOM_Ref.sortedWordsDiv.innerHTML = ''
    DOM_Ref.numberOfWordsDiv.textContent = ''
    DOM_Ref.numberOfLettersDiv.textContent = ''
    DOM_Ref.phraseCountResultDiv.textContent = ''
    DOM_Ref.phraseInput.value = ''
  }

  #resetDataholders() {
    allDataHolders.forEach((dataholder) => (dataholder.textContent = ''))
  }
}

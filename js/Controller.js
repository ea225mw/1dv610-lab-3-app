export class Controller {
  #DOM_Ref
  #view
  #resetter
  #sortingOptions
  #analyzer

  #shortestWordObject
  #longestWordObject
  #mostFrequentLetterObject
  #mostFrequentLetterCaseSensObject
  #numberOfWords
  #numberOfTotalLetters

  #cleanedTextToAnalyze = ''

  constructor(DOM_Ref, view, resetter, sortingOptions, analyzer) {
    this.#DOM_Ref = DOM_Ref
    this.#view = view
    this.#resetter = resetter
    this.#sortingOptions = sortingOptions
    this.#analyzer = analyzer

    this.#setupEventListeners()
  }

  #setupEventListeners() {
    this.#DOM_Ref.editArea.addEventListener('input', () => {
      try {
        this.#updateCleanedTextToAnalyze()
        this.#analyzeTextInRealtime()
        this.#updateHTMLElementsInRealtime()
        this.#getAndDisplaySortedWords()
      } catch (error) {
        console.log(error)
      }
    })

    this.#DOM_Ref.phraseCountForm.addEventListener('submit', (event) => {
      try {
        event.preventDefault()
        this.#submitPhraseCountForm()
      } catch (error) {
        console.log(error)
      }
    })

    this.#DOM_Ref.sortOrderChoicesDiv.addEventListener('click', (event) => {
      try {
        const sortOrder = this.#sortingOptions.extractSortOrderValue(event)
        this.#sortingOptions.setSortOrder(sortOrder)
        this.#getAndDisplaySortedWords()
      } catch (error) {
        console.log(error)
      }
    })

    this.#DOM_Ref.skipDuplicatesDiv.addEventListener('click', () => {
      try {
        let skipDuplicates = this.#sortingOptions.isSkipDuplicatesChecked()
        this.#analyzer.skipDuplicates = skipDuplicates
        this.#getAndDisplaySortedWords()
      } catch (error) {
        console.log(error)
      }
    })
  }

  #updateCleanedTextToAnalyze() {
    const onlyEmptyElements = this.#hasEditAreaOnlyEmptyElements()
    if (onlyEmptyElements) {
      this.#resetter.emptyEditAreaAndCleanedString()
      this.#cleanedTextToAnalyze = ''
      this.#resetter.resetStatistics()
    } else {
      this.#cleanedTextToAnalyze = this.#removeHtmlAndKeepPureText().trim()
    }
  }

  #hasEditAreaOnlyEmptyElements() {
    const possibleHtmlLeftovers = ['<br>', '<br/>', '<div><br></div>', '<p><br></p>']
    const contentInEditArea = this.#DOM_Ref.editArea.innerHTML.trim()
    return possibleHtmlLeftovers.some((element) => element === contentInEditArea)
  }

  #removeHtmlAndKeepPureText() {
    const textWithHtmlTags = this.#DOM_Ref.editArea.innerHTML
    return textWithHtmlTags
      .replace(/<div><br><\/div>/g, '\n')
      .replace(/<div>/g, '\n')
      .replace(/<br\s*\/?>/g, '\n')
      .replace(/<\/div>/g, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&nbsp/g, '')
  }

  #analyzeTextInRealtime() {
    this.#shortestWordObject = this.#analyzer.findShortestWord(this.#cleanedTextToAnalyze)
    this.#longestWordObject = this.#analyzer.findLongestWord(this.#cleanedTextToAnalyze)
    this.#mostFrequentLetterObject = this.#analyzer.findMostFrequentLetter(this.#cleanedTextToAnalyze)
    this.#mostFrequentLetterCaseSensObject = this.#analyzer.findMostFrequentLetterCaseSens(this.#cleanedTextToAnalyze)
    this.#numberOfWords = this.#analyzer.countWords(this.#cleanedTextToAnalyze.trim())
    this.#numberOfTotalLetters = this.#analyzer.countTotalLetters(this.#cleanedTextToAnalyze)
  }

  #updateHTMLElementsInRealtime() {
    this.#view.updateShortestWordInTable(this.#shortestWordObject)
    this.#view.updateLongestWordInTable(this.#longestWordObject)
    this.#view.updateMostFrequentLetterInTable(this.#mostFrequentLetterObject)
    this.#view.updateMostFrequentLetterCaseSensInTable(this.#mostFrequentLetterCaseSensObject)
    this.#view.updateWordCount(this.#numberOfWords)
    this.#view.updateTotalLetterCount(this.#numberOfTotalLetters)
  }

  #submitPhraseCountForm() {
    if (this.#cleanedTextToAnalyze !== '' || this.#DOM_Ref.editArea.textContent !== '') {
      const phrase = this.#DOM_Ref.phraseInput.value
      const numberOfOccurrences = this.#analyzer.countSpecifiedPhrase(this.#cleanedTextToAnalyze, phrase)
      this.#view.updatePhraseCountResult(numberOfOccurrences, phrase)
    }
  }

  #getAndDisplaySortedWords() {
    let sortedWords
    if (this.#sortingOptions.ascendingOrder) {
      sortedWords = this.#analyzer.sortWordsAscending(this.#cleanedTextToAnalyze)
    } else {
      sortedWords = this.#analyzer.sortWordsDescending(this.#cleanedTextToAnalyze)
    }
    this.#view.updateSortedWords(sortedWords)
  }
}

export class StringAnalyzer {
  #sw
  skipDuplicates = true

  constructor() {
    this.#loadStringWorksModule()
  }

  async #loadStringWorksModule() {
    try {
      const module = await import('https://cdn.jsdelivr.net/npm/string-works@0.1.6/+esm')
      this.#sw = module.stringWorks
    } catch (error) {
      console.log(error)
    }
  }

  findShortestWord(cleanedTextToAnalyze) {
    return this.#sw.findShortestWord(cleanedTextToAnalyze)
  }

  findLongestWord(cleanedTextToAnalyze) {
    return this.#sw.findLongestWord(cleanedTextToAnalyze)
  }

  findMostFrequentLetter(cleanedTextToAnalyze) {
    return this.#sw.mostFrequentLetter(cleanedTextToAnalyze)
  }

  findMostFrequentLetterCaseSens(cleanedTextToAnalyze) {
    return this.#sw.mostFrequentLetterCS(cleanedTextToAnalyze)
  }

  countSpecifiedPhrase(cleanedTextToAnalyze, phrase) {
    phrase = phraseInput.value
    return this.#sw.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
  }

  sortWordsAscending(cleanedTextToAnalyze) {
    if (this.skipDuplicates) {
      const uniqueWords = new Set()
      const sortedWords = this.#sw.sortWordsAscending(cleanedTextToAnalyze)
      for (const word of sortedWords) {
        uniqueWords.add(word)
      }
      return Array.from(uniqueWords)
    }
    return this.#sw.sortWordsAscending(cleanedTextToAnalyze)
  }

  sortWordsDescending(cleanedTextToAnalyze) {
    if (this.skipDuplicates) {
      const uniqueWords = new Set()
      const sortedWords = this.#sw.sortWordsDescending(cleanedTextToAnalyze)
      for (const word of sortedWords) {
        uniqueWords.add(word)
      }
      return Array.from(uniqueWords)
    }
    return this.#sw.sortWordsDescending(cleanedTextToAnalyze)
  }

  countWords(cleanedTextToAnalyze) {
    return this.#sw.countWords(cleanedTextToAnalyze)
  }

  countTotalLetters(cleanedTextToAnalyze) {
    return this.#sw.countLetters(cleanedTextToAnalyze)
  }
}

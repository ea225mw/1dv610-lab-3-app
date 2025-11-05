// import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.5/+esm'
import { stringWorks } from './src/LocalTestIndex.js'
import { isSkipDuplicatesChecked } from './index.js'

const sw = stringWorks

export class StringAnalyzer {
  findShortestWord(cleanedTextToAnalyze) {
    return sw.findShortestWord(cleanedTextToAnalyze)
  }

  findLongestWord(cleanedTextToAnalyze) {
    return sw.findLongestWord(cleanedTextToAnalyze)
  }

  findMostFrequentLetter(cleanedTextToAnalyze) {
    return sw.mostFrequentLetter(cleanedTextToAnalyze)
  }

  findMostFrequentLetterCaseSens(cleanedTextToAnalyze) {
    return sw.mostFrequentLetterCS(cleanedTextToAnalyze)
  }

  countSpecifiedPhrase(cleanedTextToAnalyze, phrase) {
    phrase = phraseInput.value
    return sw.countSpecifiedPhrase(cleanedTextToAnalyze, phrase)
  }

  sortWordsAscending(cleanedTextToAnalyze) {
    const skipDuplicates = isSkipDuplicatesChecked()
    if (skipDuplicates) {
      const uniqueWords = new Set()
      const sortedWords = sw.sortWordsAscending(cleanedTextToAnalyze)
      for (const word of sortedWords) {
        uniqueWords.add(word)
      }
      return Array.from(uniqueWords)
    }
    return sw.sortWordsAscending(cleanedTextToAnalyze)
  }

  sortWordsDescending(cleanedTextToAnalyze) {
    const skipDuplicates = isSkipDuplicatesChecked()
    if (skipDuplicates) {
      const uniqueWords = new Set()
      const sortedWords = sw.sortWordsDescending(cleanedTextToAnalyze)
      for (const word of sortedWords) {
        uniqueWords.add(word)
      }
      return Array.from(uniqueWords)
    }
    return sw.sortWordsDescending(cleanedTextToAnalyze)
  }

  countWords(cleanedTextToAnalyze) {
    return sw.countWords(cleanedTextToAnalyze)
  }

  countTotalLetters(cleanedTextToAnalyze) {
    return sw.countLetters(cleanedTextToAnalyze)
  }
}

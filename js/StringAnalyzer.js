import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.3/+esm'
import * as DOM_Ref from './DOM_References.js'

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
    if (DOM_Ref.skipDuplicatesCheckbox.checked) {
      const uniqueWords = new Set
      const sortedWords = sw.sortWordsAscending(cleanedTextToAnalyze)
      for (const word of sortedWords) {
        uniqueWords.add(word)
      }
      return Array.from(uniqueWords)
    }
    return sw.sortWordsAscending(cleanedTextToAnalyze)
  }

  sortWordsDescending(cleanedTextToAnalyze) {
    if (DOM_Ref.skipDuplicatesCheckbox.checked) {
      const uniqueWords = new Set
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
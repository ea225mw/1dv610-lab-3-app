import { stringWorks } from 'https://cdn.jsdelivr.net/npm/string-works@0.1.2/+esm'
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
    return sw.sortWordsAscending(cleanedTextToAnalyze)
  }

  sortWordsDescending(cleanedTextToAnalyze) {
    return sw.sortWordsDescending(cleanedTextToAnalyze)
  }
}
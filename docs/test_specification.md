# Test specification for String Works Editor

All tests requires access to https://stringworkseditor.netlify.app/ and that the application is loaded.

## Testcases

| ID    | Description                                                          |
| ----- | -------------------------------------------------------------------- |
| TC1   | Type text in text area.                                              |
|  TC2  | Paste text in text area.                                             |
|  TC3  | Shortest word is presented.                                          |
|  TC4  | Longest word is presented.                                           |
|  TC5  |  Most frequent letter is presented.                                  |
|  TC6  |  Most frequent letter (case-sensitive) is presented.                 |
|  TC7  | Total number of words is presented.                                  |
|  TC8  | Total number of letters is presented.                                |
|  TC9  | Test of the phrase count feature.                                    |
|  TC10 |  Sorted words are presented (ascending order, default).              |
|  TC11 | Change sort order to descending.                                     |
|  TC12 |  Duplicate words are presented in "Sorted words".                    |
| TC13  |  Statistics and sorted words are resetted when text area is emptied. |

## TC1:

Test connected to requirement R1: _It should be possible to type text and paste text in a textarea._

**Pre-requisites** <br>
The user is on the website of the application and it has loaded correctly. The caret for typing in the textarea are visible and blinking. The textarea is empty.

**Test steps:** <br>

1. User types on the keyboard and writes the sentence: _Last Christmas I gave you my heart_

**Expected output:** <br>

<img src="../images/exp_output_TC1.png" width="50%">

## TC2:

Test connected to requirement R1: _It should be possible to type text and paste text in a textarea._

**Pre-requisites** <br>
Same as testcase 1.

**Test steps:** <br>

1. User marks the informational text about String Works Editor to the left of the page
2. User copies the text
3. User pastes the text in the textarea

**Expected output:** <br>

<img src="../images/exp_output_TC2.png" width="50%">

## TC3:

Test connected to requirement R2: _The shortest word in the text is shown in a table along with the number of letters in that word._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", under "Word lengths", the following should be displayed: <br>

<img src="../images/exp_output_TC3.png" width="50%">

## TC4:

Test connected to requirement R3: _The longest word in the text is shown in a table along with the number of letters in that word._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", under "Word lengths", the following should be displayed: <br>

<img src="../images/exp_output_TC4.png" width="50%">

## TC5:

Test connected to requirement R4: _The most frequently used letter in the text is shown in a table along with the number of occurrences of that letter._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", under "Letter occurrences", the following should be displayed: <br>

<img src="../images/exp_output_TC5.png" width="50%">

## TC6:

Test connected to requirement R5: _The most frequently used letter (CASE SENSITIVE) in the text is shown in a table along with the number of occurrences of that letter._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", under "Letter occurrences", the following should be displayed: <br>

<img src="../images/exp_output_TC6.png" width="50%">

## TC7:

Test connected to requirement R6: _The total number of words in the text should be presented._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", by "Word count", the following should be displayed: <br>

<img src="../images/exp_output_TC7.png" width="40%">

## TC8:

Test connected to requirement R7: _The total number of letters in the text should be presented._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>
In the area called "Words and Letters", by "Letter count, total", the following should be displayed: <br>

<img src="../images/exp_output_TC8.png" width="40%">

## TC9:

Test connected to requirement R8: _It should be possible to pass a phrase (word or single letter) and get the number of occurrences of that phrase._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Test steps:** <br>

1. In the input field of the area called "Count specified phrase" the user types the word _text_ and presses Enter.

**Expected output:** <br>

<img src="../images/exp_output_TC9.png" width="40%">

## TC10:

Test connected to requirement R9: _It should be possible to sort the words in the text in alphabetically order (ascending or descending)._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there.

**Expected output:** <br>

<img src="../images/exp_output_TC10.png" width="60%">

## TC11:

Test connected to requirement R9: _It should be possible to sort the words in the text in alphabetically order (ascending or descending)._

**Pre-requisites** <br>
The text that was pasted to the textarea in testcase 2 are still there. The radio button "Ascending" in "Sorted words" area is checked.

**Test steps:** <br>

1. The user clicks on the "Descending" radio button in "Sorted words" area.

**Expected output:** <br>
The words should now be sorted in descending alphabetically order. <br>
<img src="../images/exp_output_TC11.png" width="60%">

## TC12:

Test connected to requirement R9: _It should be possible to sort the words in the text in alphabetically order (ascending or descending)._

**Pre-requisites** <br>
Everything should be as it was after testcase 11 was executed (words should be sorted in descending order).

**Test steps:** <br>

1. The user clicks on the "Skip duplicates" checkbox in "Sorted words" area.

**Expected output:** <br>
The words should now be sorted in descending alphabetically order but with duplicate words present. <br>

<img src="../images/exp_output_TC12.png" width="60%">

## TC13:

Test connected to requirement R10: _When all text in the text area is removed all statistics counters should be resetted._

**Pre-requisites** <br>
There is some text present in the text area.

**Test steps:** <br>

1. The user deletes all text in the text area.

**Expected output:** <br>
All statistics should be resetted and all sorted words should be gone. <br>

<img src="../images/exp_output_TC13.png" width="70%">

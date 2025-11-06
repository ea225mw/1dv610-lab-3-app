import { skipDuplicatesCheckbox } from './DOM_References.js'
import { setAscendingOrder } from './index.js'
import { ascendingOrder } from './index.js'

export class SortingOptionsHandler {
  extractSortOrderValue(event) {
    const targetDiv = event.target.closest('div')
    if (targetDiv !== null) {
      return targetDiv.querySelector('input').value
    }
  }

  setSortOrder(value) {
    if (value === 'ascending' && ascendingOrder === false) {
      setAscendingOrder(true)
    } else if (value === 'descending' && ascendingOrder === true) {
      setAscendingOrder(false)
    }
  }

  isSkipDuplicatesChecked() {
    if (skipDuplicatesCheckbox.checked) return true
    else return false
  }
}

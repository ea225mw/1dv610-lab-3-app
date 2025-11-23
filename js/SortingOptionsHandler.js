export class SortingOptionsHandler {
  #DOM_Ref
  ascendingOrder = true

  constructor(DOM_Ref) {
    this.#DOM_Ref = DOM_Ref
  }

  extractSortOrderValue(event) {
    const targetDiv = event.target.closest('div')
    if (targetDiv !== null) {
      return targetDiv.querySelector('input').value
    }
  }

  setSortOrder(value) {
    if (value === 'ascending' && this.ascendingOrder === false) {
      this.ascendingOrder = true
    } else if (value === 'descending' && this.ascendingOrder === true) {
      this.ascendingOrder = false
    }
  }

  isSkipDuplicatesChecked() {
    if (this.#DOM_Ref.skipDuplicatesCheckbox.checked) return true
    else return false
  }
}

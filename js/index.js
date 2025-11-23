import { StringAnalyzer } from './StringAnalyzer.js'
import { ViewHandler } from './ViewHandler.js'
import { Resetter } from './Resetter.js'
import { SortingOptionsHandler } from './SortingOptionsHandler.js'
import { DOMReferencer } from './DOMReferencer.js'
import { Controller } from './Controller.js'

const DOM_Ref = new DOMReferencer()
const view = new ViewHandler(DOM_Ref)
const resetter = new Resetter(DOM_Ref)
const sortingOptionsHandler = new SortingOptionsHandler(DOM_Ref)
const analyzer = new StringAnalyzer()

const controller = new Controller(DOM_Ref, view, resetter, sortingOptionsHandler, analyzer)

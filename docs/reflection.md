# Kapitelreflektioner L3, Emanuel Andersen (ea225mw)

## Meaningful Names

Av alla kapitel i bokan är detta med namngivning är det som har varit lättast att ta till sig, och jag har märkt stor skillnad i min förståelse av min egen kod efter att ha övat ett tag. Jag har blivit mindre rädd för att använda mig av långa namn på variabler och funktioner under denna kurs. Jag lägger relativt mycket tid på namngivningen och ändrar ofta när jag kommer på bättre alternativ. Namnen är i hög grad sökbara och lätta att uttala. Funktioner som returnerar en boolean startar med orden _is_ eller _has_.

```javascript
// Examples of my naming of variables and methods:
#hasEditAreaOnlyEmptyElements()
#setupSortOrderChoiceDivEventListener()
#cleanedTextToAnalyze
isSkipDuplicatesChecked()
```

## Functions

Det har varit en utmaning att få till så små funktioner som boken föreskriver men jag tycler ändå jag lyckats ganska bra. Som längst är funktionerna i appen runt 10-11 rader men oftast kortare. Jag har bättre förstått detta med olika abstraktionsnivåer och försöker att hålla samma nivå i metoderna, som i denna:

```javascript
 #setupEditAreaEventListener() {
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
  }
```

Att en funktion bara ska göra en sak blir ofta en defenitionsfråga. Jag har denna funktion som återställer olika HTML-element. Jag tycker de känns naturliga att ha i en och samma funktion eftersom de hör ihop på ett naturligt sätt. Att dela upp de enskilda elementens återställning i egna funktioner hade bara blivit rörigt.

```javascript
// Resetter.js
  resetStatistics() {
    this.#resetDataholders()
    this.#DOM_Ref.phraseCountResultDiv.textContent = ''
    this.#DOM_Ref.sortedWordsDiv.innerHTML = ''
    this.#DOM_Ref.numberOfWordsDiv.textContent = '0'
    this.#DOM_Ref.numberOfLettersDiv.textContent = '0'
    this.#DOM_Ref.phraseCountResultDiv.textContent = ''
    this.#DOM_Ref.phraseInput.value = ''
  }
```

## Comments

Jag upptäckte att jag hade en kommentar som ljög, vilket boken menar är den stora faran med kommentarer. Kommentaren beskrev import av objekt från en viss fil men under kodandets gång hade de importerade objekten flyttat till en annan fil utan att kommentaren hade uppdaterats.

<img src="../images/Skärmavbild 2025-10-22 kl. 10.28.30.png" width="70%"><br>

En intressant iakttagelse jag gör är att kodstandarden i några av första årets kurser bryter mot **Mandated Comments**.

## Formatting

Efter att ha läst stycket om **Breaking Indentation** ändrade jag i min modulkod enligt koden nedan. Författaren brukar undvika att göra denna ändring men i mitt exempel där returvärdet endast är ett nummer tycker jag att det blir bättre och mer lättläst att ha `return` på samma rad. Jag lade till ett `else` för att öka tydligheten, även om det inte behövs.

**Innan ändring:**

```javascript
// WordSorter.js in the module code
#sortInDescendingOrder(array) {
  return array.sort((a, b) => {
	const wordA = a.toUpperCase()
    const wordB = b.toUpperCase()

	if (wordA < wordB) {
	  return 1
    }
    if (wordA > wordB) {
	  return -1
    }
    return 0
  })
}
```

**Efter ändring:**

```javascript
// WordSorter.js in the module code
#sortInDescendingOrder(array) {
  return array.sort((a, b) => {
	const wordA = a.toUpperCase()
	const wordB = b.toUpperCase()

	if (wordA < wordB) return 1
	if (wordA > wordB) return -1
	else return 0
  })
}
```

Om funktioner anropar andra funktioner bör dessa ligga nära varandra. I appens ViewHandler.js har jag istället delat upp det så att alla publika metoder ligger överst och de privata längst ner. Några av de publika metoderna använder sig av de privata, men ligger inte i direkt anslutning till varandra vilket kan sägas bryta mot **Dependent Functions** men främja **Conceptual Affinity**. I modulens Helper.js flyttade jag däremot om ordningen på metoderna för att de skulle hamna i den ordning de anropas i `validateAndPrepareString()`.

## Objects and Data Structures

Vad jag kan se så bryter jag inte mot **Law of Demeter** i min modulkod. Klasserna anropar bara med sina egna metoder samt metoder från Helper.js som finns med som en instansvariabel i övriga klasser.

I appens Controller.js har jag ett ganska rejält **train wreck** i metoden `#removeHtmlAndKeepPureText()`. De olika `replace`-anropen tvättar bort alla HTML-element inför analys och bearbetning av strängen. Strängen är att betrakta som en datastruktur och därför är inte Law of Demeter tillämplig här och eftersom alla `replace` står på egen rad så blir det någorlunda lättläst.

```javascript
// js/Controller.js in the app code
#removeHtmlAndKeepPureText() {
  const textWithHtmlTags = DOM_Ref.editArea.innerHTML
  return textWithHtmlTags
    .replace(/<div><br><\/div>/g, '\n')
    .replace(/<div>/g, '\n')
    .replace(/<br\s*\/?>/g, '\n')
    .replace(/<\/div>/g, '')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp/g, '')
}
```

## Error Handling

Jag har `try/catch`-block i de publika metoderna i min modul. I Helper.js kastas undantag i två metoder och de har specifikt skrivna felmeddelanden, så som boken beskriver i **Provide Context with Exceptions**.

```javascript
// Helper.js in the module code
checkPhraseArgument(phrase) {
if (typeof phrase !== "string")
  throw new Error("Second argument must be a string.")
}
```

Jag tyckte det var svårt att veta var i appens kod jag behövde ha felhantering. Jag ville inte bara sätta ut `try/catch` överallt bara för säkerhets skull utan göra medvetna val. Jag har nu felhantering vid importen av min modul som sker från ett CDN-nätverk och i eventlyssnarna som är viktiga för appens funktion. I dagsläget gör de inget mer än skriver ut felet i konsolen vilket inte är att betrakta som tillräckligt ur användarsynpunkt.

```javascript
// StringAnalyzer.js in the app code
async #loadStringWorksModule() {
  try {
	const module = await import('https://cdn.jsdelivr.net/npm/string-works@0.1.6/+esm')
	this.#sw = module.stringWorks
  } catch (error) {
	console.log(error)
  }
}
```

## Boundaries

Jag använder inget externt bibliotek i appen förutom min egen modul så mina "boundaries" är begränsade i denna kodbas. All kod körs på klientsidan och min erfarenhet är att externa bibliotek används mindre där än på serversidan. Jag följer bokens regel kring att använda "gränsnära" kod på så få ställen som möjligt, i mitt fall endast i appens StringAnalyzer.js där min egen modul hämtas.

## Unit Tests

Min kunskap om framtagande av automatiska enhetstester är väldigt begränsad och jag har endast 13 test i min modulkod. De är väldigt små och gör inte mycket mer än att ta en sträng, utföra en operation och jämföra resultatet med förväntat utfall. I och med att Jest låter en skriva ett utförligt namn på testet så får man nästan som en kommentar till varje test:

```javascript
// StringTransformer.test.js in the module code
test('capatilize first letter of every word', () => {
  expect(stringTransformer.makeFirstLetterCapital(string)).toBe(expected)
})
```

Efter att ha läst kapitlet och begrundat skräckexemplet med utvecklarna som slarvade med sin testkod gick jag tillbaka och ändrade mina variabelnamn i testfilerna. Från början gav jag dem namn såsom `mflf` istället för `mostFrequentLetterFinder`. Jag tänkte att det inte gjorde så mycket att de hette obegripligheter eftersom det "bara" är testkod och att man ändå skulle kunna förstå. Men bättre att göra rätt från början om koden skulle växa i framtiden.

## Classes

Jag tycker det är svårt att tänka i klasser i frontend på det sätt jag gjorde applikationen nu (en enda html-fil som importerar index.js). Jag började skriva all kod i index.js och allt eftersom bröt jag ut funktioner och variabler till egna klasser. Men under hela applikationens framväxt funderade jag på vad en egen klass har för fördelar i aktuell design jämfört med att bara lägga funktionalitet som hör ihop i egna JS-filer, utan att skapa en klass. Fördelen med en klass är att man kan styra inkapslingen enkelt med `#` men samma sak går ju att uppnå i en JS-fil genom att inte sätta ut `export` framför variabler och funktioner.<br><br> Från början hade jag alla referenser till DOM-element som exporterade variabler i en vanlig JS-fil men gjorde sedan om det till en `DOMReferencer`-klass.
De sex klasser som applikationen använder har ett avgränsat ansvarsområde (**high cohesion**) och i de flesta fall **low coupling** till varandra. Controller har beroenden till alla andra klasser men det är rimligt för en controller.

## Systems

Jag vet inte hur mycket av ett system min lilla app är när den innehåller sex klasser, en modul och index.js. Men jag gör en variant på **Separation of Main** i index.js där alla objekt som används i applikationen skapas. Jag använder mig också av **Dependency Injection** där jag skickar med skapade instanser till konstruktorerna av de objekt som är beroende av varandra.
Jag gick också tillbaka till min modulkod och ändrade även där beroenden till Dependency Injection.

```javascript
// index.js in the app code
const DOM_Ref = new DOMReferencer()
const view = new ViewHandler(DOM_Ref)
const resetter = new Resetter(DOM_Ref)
const sortingOptionsHandler = new SortingOptionsHandler(DOM_Ref)
const analyzer = new StringAnalyzer()

const controller = new Controller(DOM_Ref, view, resetter, sortingOptionsHandler, analyzer)
```

```javascript
//Resetter.js in the app code
export class Resetter {
  #DOM_Ref

  constructor(DOM_Ref) {
    this.#DOM_Ref = DOM_Ref
  }
}
```

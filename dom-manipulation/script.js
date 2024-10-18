

// fetch data from API and store at local storage

async function getQuoates() {
    const response = await fetch('quotes.json')
    const data = await response.json()

    // store quotes at local storage

    localStorage.setItem('quotes', JSON.stringify(data))
}


function getAllQuoates(){

    let myData = JSON.parse(localStorage.getItem('quotes'))
    let myQuoates = Object.values(myData)
    let allQuoates = []
    for(let quote of myQuoates){
        for (let quoteText of quote){
            allQuoates.push(quoteText)
        }
    }
    return allQuoates
}


function showRandomQuote(){

    const quoteBtn  = document.getElementById('newQuote')
    const diplayQuoat = document.getElementById('quoteDisplay')
    const allQuoates = getAllQuoates()
    
    const blockQoate = document.createElement('p')
    const cited = document.createElement('cite')

    // add to div container
    diplayQuoat.appendChild(blockQoate)
    diplayQuoat.appendChild(cited)

    quoteBtn.addEventListener('click' , (event) => {
        const randomQuote = allQuoates[(Math.floor(Math.random() * allQuoates.length))]    
        // add new text

        blockQoate.textContent = `"${randomQuote['quote']}"`
        cited.textContent = randomQuote['author']      
    })

    blockQoate.textContent = ' '
    cited.textContent = ' '

}

function addQuote(){

    // take user inputs for the newQuote
    let quoteText = document.getElementById('newQuoteText').value
    let quoteCategory= document.getElementById('newQuoteCategory').value
    let quoteAuthor = document.getElementById('newQuoteAuthor').value
    
    // upload data from local storage

    let qoutes = JSON.parse(localStorage.getItem('quotes'))

    // adding new element
    if (quoteAuthor && quoteCategory && quoteText){
        qoutes[quoteCategory].push([{
            quote: quoteText,
            author: quoteAuthor
        }])
    }

    // store quotes again
    localStorage.setItem('quotes', JSON.stringify(qoutes))


}



showRandomQuote()


function downloadJson(quotes, filename){

    let fileToSave = new Blob([JSON.stringify(quotes)], {
        type: 'application/json'
    });

    let url = URL.createObjectURL(fileToSave)

    let link = document.createElement('a')
    link.setAttribute('download',filename)

    link.href = url
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    URL.revokeObjectURL(url)

}

const quotes = JSON.parse(localStorage.getItem('quotes'))


const downloadBtn = document.getElementById('download-data')
downloadBtn.addEventListener('click', function(){
    downloadJson(quotes, 'myFile')
})





function importFromJsonFile(event){
    const fileReader = new FileReader()

    fileReader.onload = function(event) {
        const importedQuotes = JSON.parse(event.target.result)
        qoutes.push(...importedQuotes);
        saveQuotes();

    }
}
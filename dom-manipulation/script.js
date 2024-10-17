



// fetch data from API and store at local storage

async function getQuoates() {
    const response = await fetch('quotes.json')
    const data = await response.json()

    // store quotes at local storage

    localStorage.setItem('quotes', JSON.stringify(data))
}


function getAllQuoates(){
    let quoates = {
        text:quoteText,
        category:quoteCategory
    }

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

        blockQoate.innerHTML = `"${randomQuote['quote']}"`
        cited.innerHTML = randomQuote['author']      
    })

    blockQoate.textContent = ' '
    cited.textContent = ' '

}

function createAddQuoteForm(){

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

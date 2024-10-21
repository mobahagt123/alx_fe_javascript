
function fetchQuotesFromServer(){

    // fetch data from API and store at local storage
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then(() =>  json);

}






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


function createAddQuoteForm(){

    // take user inputs for the newQuote
    let quoteText = document.getElementById('newQuoteText').value
    let quoteCategory= document.getElementById('newQuoteCategory').value
    let quoteAuthor = document.getElementById('newQuoteAuthor').value
    
    // upload data from local storage

    let qoutes = JSON.parse(localStorage.getItem('quotes'))

    // adding new element
    if (quoteAuthor && quoteCategory && quoteText){
        qoutes[quoteCategory].map([{
            quote: quoteText,
            author: quoteAuthor
        }])
    }

    // store quotes again
    localStorage.setItem('quotes', JSON.stringify(qoutes))


}

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
        alert('Quotes imported successfully!')
    }
    fileReader.readAsText(event.target.files[0])
}




// adding categories options
function populateCategories(){

    // get parent element
    const options = document.getElementById('categoryFilter')

    // get quotes 
    let quotes = JSON.parse(localStorage.getItem('quotes'))
    let categories = Object.keys(quotes)

    // create option element for each category
    for(let category of categories){
        const option = document.createElement('option')
        options.appendChild(option)
        option.setAttribute('value', category)
        option.textContent = category
    }
}

populateCategories()




function filterQuotes(){

    // get user caytegory choice
    let selectedCategory = document.getElementById('categoryFilter').value

    // filter quotes

    let quotes = JSON.parse(localStorage.getItem('quotes'))
    

    let allQuoates = []
    if(selectedCategory === 'all'){
        let myQuoates = Object.values(quotes)
        for(let quote of myQuoates){
            for (let quoteText of quote){
                allQuoates.push(quoteText)
            }
        }

    } else {
        let filteredQuotes = quotes[selectedCategory]
    
        let myQuoates = Object.values(filteredQuotes)
        for(let quote of myQuoates){
            allQuoates.push(quote)
            }
        }
    
    return allQuoates
    
}  
   


function showRandomQuote(){

    const quoteBtn  = document.getElementById('newQuote')
    const diplayQuoat = document.getElementById('quoteDisplay')
    
    const blockQoate = document.createElement('p')
    const cited = document.createElement('cite')

    // add to div container
    diplayQuoat.appendChild(blockQoate)
    diplayQuoat.appendChild(cited)

    quoteBtn.addEventListener('click' , (event) => {

        const allQuoates = filterQuotes()
        const randomQuote = allQuoates[(Math.floor(Math.random() * allQuoates.length))]    
        // add new text

        blockQoate.innerHTML = `"${randomQuote['quote']}"`
        cited.innerHTML= randomQuote['author'] 
        
        // save filtered quoates
    })

    blockQoate.textContent = ' '
    cited.textContent = ' '
    
}

showRandomQuote()


// sync data 

// JSON placeholder fake API to 

function fetchingData(){

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(quotes),
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => response.json())
        .then((json) => console.log(json));

}


// create div container for sync 
const syncDiv  = document.createElement('div')
const syncBtn = document.createElement('button')
syncBtn.setAttribute("onclick","syncQuotes()")
document.body.appendChild(syncDiv)
syncDiv.appendChild(syncBtn)
syncBtn.textContent = 'Sync Quotes'

function syncQuotes(quotes){

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=UTF-8',
        },
      })
        .then((response) => {
            if(!response.ok){
                alert('Data not Fetched successfuly')
            }
})
        .then((json) => quotes = json)
        .then(() => alert('Quotes synced with server!'))
}  

setInterval(syncQuotes(), 500, 'Quotes synced with server!')


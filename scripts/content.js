// Hides the youtube reccommendations
document.querySelector('#contents.ytd-rich-grid-renderer').style.visibility = "hidden"


const getQuote = async () => {
    // Retrieval type [quotes, today, author, random]. Required.
    var mode = 'quotes'
    fetch(`https://zenquotes.io/api${mode}` , {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    }).then(async response => {       
        return await response.json()   
    })
}
alert(getQuote())
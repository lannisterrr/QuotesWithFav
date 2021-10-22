// Get Quote From API
// https://medium.com/@dtkatz/3-ways-to-fix-the-cors-error-and-how-access-control-allow-origin-works-d97d55946d9

const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const favBtn = document.getElementById('favorite');
const lsOutput = document.getElementById('lsoutput');
const loader = document.getElementById('loader');
const dev = '@siddhant4real';

// show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true; // show our loader and hide our quote container
}

// hide loader

function complete() {
  if (!loader.hidden) {
    // false
    quoteContainer.hidden = false;
    loader.hidden = true;
  }
}

async function getQuote() {
  loading();

  // using a proxy API to fix CORS issue

  const apiUrl = 'https://api.quotable.io/random';

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data.content);
    // if author is blank

    if (data.author === '') {
      authorText.innerText = 'Unknown';
    } else {
      authorText.innerText = data.author;
    }

    // request fontsize for long text

    if (data.length > 120) {
      quoteText.classList.add('long-quote');
    } else {
      quoteText.classList.remove('long-quote');
    }

    quoteText.innerText = data.content; // data coming from api

    // stop loader , show quote
    complete();
  } catch (e) {
    console.log(e);
  }
}

function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author} - ${dev}(developer) `;
  window.open(twitterUrl, '_blank');
}

function addfav() {
  const key = quoteText.innerText;
  const value = authorText.innerText;

  if (key && value) {
    localStorage.setItem(key, value);
    location.reload();
  }
}

for (let i = 0; i < localStorage.length; i++) {
  const key = localStorage.key(i);
  const value = localStorage.getItem(key);

  lsOutput.innerHTML += `${key} : ${value}<br /> <br />`;
}

//Event Listners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);
favBtn.addEventListener('click', addfav);

// on load
getQuote();

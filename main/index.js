const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";

const API_URL_FAVOURITES = "https://api.thecatapi.com/v1/favourites?limit=2&api_key=live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9"

const spanError = document.getElementById("error")
const btn = document.querySelector(".load");

btn.addEventListener("click", reloadRandom);

// function reload() {
//     fetch(URL)
//         .then(res => res.json())
//         .then(data => {
//             const img = document.querySelector("img")
//             img.src = data[0].url
//         })

// }
async function reloadRandom() {
  const res = await fetch(API_URL_RANDOM);
  const data = await res.json();
  console.log("random")
  console.log(data);

  if(res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    img1.src = data[0].url
    img2.src = data[1].url
  }

}

async function reloadFavourites() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  console.log("favoritos")
  console.log(data);

  if(res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError
  }
}



reloadRandom();
reloadFavourites();

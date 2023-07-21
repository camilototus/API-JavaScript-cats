const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=2";

const API_URL_FAVOURITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9";

const spanError = document.getElementById("error");
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
  console.log("random");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError + data.message;
  } else {
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");

    img1.src = data[0].url;
    img2.src = data[1].url;

    btn1.onclick = () => addFavourite(data[0].id)
    btn2.onclick = () => addFavourite(data[1].id)
  }
}

async function reloadFavourites() {
  const res = await fetch(API_URL_FAVOURITES);
  const data = await res.json();
  console.log("favoritos");
  console.log(data);

  if (res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError;
  } else {
    data.forEach(cat => {
      const section = document.getElementById("Favourite")
      const article = document.createElement("article")
      const img = document.createElement("img")
      const btn = document.createElement("button")
      const btnText = document.createTextNode("Delete Cat")

      btn.appendChild(btnText)
      img.src = cat.image.url
      img.width = 300
      article.appendChild(img)
      article.appendChild(btn)
      section.appendChild(article)

      console.log("que paso "+data)
    });
  }
}

async function addFavourite(id) {
  const res = await fetch(API_URL_FAVOURITES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      image_id: id,
    }),
  });

  const data = await res.json();

  console.log("save");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError + data.message;
  }
}

reloadRandom();
reloadFavourites();

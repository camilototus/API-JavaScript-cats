const API_URL_RANDOM = "https://api.thecatapi.com/v1/images/search?limit=4";
const API_URL_FAVOURITES =
  "https://api.thecatapi.com/v1/favourites?api_key=live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9";
const API_URL_UPLOAD = "https://api.thecatapi.com/v1/images/upload?api_key=live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9";
const API_URL_FAVOURITES_DELETE = (id) =>
  `https://api.thecatapi.com/v1/favourites/${id}?api_key=live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9`;

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
    const img3 = document.getElementById("img3");
    const img4 = document.getElementById("img4");
    const btn1 = document.getElementById("btn1");
    const btn2 = document.getElementById("btn2");
    const btn3 = document.getElementById("btn3");
    const btn4 = document.getElementById("btn4");

    img1.src = data[0].url;
    img2.src = data[1].url;
    img3.src = data[2].url;
    img4.src = data[3].url;

    btn1.onclick = () => addFavourite(data[0].id);
    btn2.onclick = () => addFavourite(data[1].id);
    btn3.onclick = () => addFavourite(data[2].id);
    btn4.onclick = () => addFavourite(data[3].id);
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
    const section = document.getElementById("Favourite");
    section.innerHTML = "";
    const h2 = document.createElement("h2");
    const textH2 = document.createTextNode("Gatos fAVORITOS");
    h2.appendChild(textH2);
    section.appendChild(h2);
    data.forEach((cat) => {
      const article = document.createElement("article");
      const img = document.createElement("img");
      const btn = document.createElement("button");
      // const btnText = document.createTextNode("Delete Cat");
      const iconDelete = document.createElement("i")
      
      btn.appendChild(iconDelete);
      iconDelete.classList += "fa-solid fa-trash-can"
      // btn.appendChild(btnText);
      btn.onclick = () => deleteFavourite(cat.id);
      img.src = cat.image.url;
      img.width = 300;
      article.appendChild(img);
      article.appendChild(btn);
      section.appendChild(article);

      console.log("que paso " + data);
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
  } else {
    console.log("cat guardado");
    reloadFavourites();
  }
}

async function deleteFavourite(id) {
  const res = await fetch(API_URL_FAVOURITES_DELETE(id), {
    method: "DELETE",
  });

  const data = await res.json();

  console.log("delete");
  console.log(res);

  if (res.status !== 200) {
    spanError.innerHTML = "hubo en Error " + spanError + data.message;
  } else {
    console.log("cat delete of favourite");
    reloadFavourites();
  }
}

async function upLoadingFile() {
  const form = document.getElementById("upLoadingForm");
  const formData = new FormData(form);

  console.log(formData.get("file"));

  const res = await fetch(API_URL_UPLOAD, {
    method: "POST",
    headers: {
      "X-API-KEY":
        "live_mb8YiaKtFcQuQDAa2eYb8bWJ8mfZbV5XtGuxJ2A693pqvTpHzpfBmOv7KuyStRd9",
    },
    body: formData,
  });

  const data = await res.json();

  if (res.status !== 201) {
    spanError.innerHTML = `Hubo un error al subir michi: ${res.status} ${data.message}`;
  } else {
    console.log("Foto de michi cargada :)");
    console.log({ data });
    console.log(data.url);
    addFavourite(data.id);
  }
}

reloadRandom();
reloadFavourites();

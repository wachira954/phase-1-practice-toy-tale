let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  // others
  getToys();

  // add toy
  let add_toy = document.querySelector(".add-toy-form");
  add_toy.addEventListener("submit", (e) => {
    //  e.preventDefault();
    let name = document.querySelectorAll(".input-text")[0].value;
    let image = document.querySelectorAll(".input-text")[1].value;

    if (name === "" || image === "") {
      alert("Fill the fields");
      return;
    }
    post(name, image);
  });

  // end
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

// let id;

function getToys() {
  fetch("http://localhost:3000/toys")
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // console.log(data);
      for (let i = 0; i < data.length; i++) {
        const toy_collection = document.getElementById("toy-collection");
        const card = document.createElement("div");
        card.className = "card";

        const h2 = document.createElement("h2");
        h2.innerText = data[i].name;

        const img = document.createElement("img");
        img.className = "toy-avatar";
        img.src = data[i].image;

        const p = document.createElement("p");
        p.innerText = data[i].likes + " Likes";

        const buttonLike = document.createElement("button");
        buttonLike.classList = "like-btn";
        buttonLike.id = "btnLike";
        buttonLike.innerText = "Like";

        card.appendChild(h2);
        card.appendChild(img);
        card.appendChild(p);
        card.appendChild(buttonLike);
        toy_collection.appendChild(card);

        buttonLike.addEventListener("click", (e) => {
          //e.preventDefault();
          let id = data[i].id;
          let likes = data[i].likes;
          let new_like = likes + 1;
          // alert(id)
          // toy_collection.innerHTML = ''

          p.innerText = new_like + " Likes";

          updateLikes(new_like, id);
        });
      }
    });
}

function updateLikes(new_like, id) {
  fetch("http://localhost:3000/toys/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      id: id,
      likes: new_like,
    }),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {});

  location.reload();
}

function post(name, image) {
  fetch("http://localhost:3000/toys/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      name: name,
      image: image,
      likes: 0,
    }),
  });
}
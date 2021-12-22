let githubProfile = [];
let githubRepositories = [];
let starredRepo = [];
let repositoriesLength = document.querySelector(".repositories-length");
let starsLength = document.querySelector(".stars-length");

let login = document.querySelectorAll(".login");
let name = document.querySelector(".name");
let biyografi = document.querySelector(".biyografi");
let followers = document.querySelector(".followers");
let following = document.querySelector(".following");
let locationText = document.querySelector(".location");
let shareText = document.querySelector(".share");
let row = document.querySelector(".rowspapen");

// Profile
function getAllGithubsProfile() {
  fetch("https://api.github.com/users/zehraikizler").then(res => {
    res.json().then(response => {
      githubProfile = response;

      // login - zehraikizler
      logIn = githubProfile.login;
      login.forEach(el => {
        el.innerHTML = logIn;
      });
      login.innerHTML = logIn;

      // name - Zehra İkizler
      name.innerHTML = githubProfile.name;

      // biyografi - jr. frontend developer
      biyografi.innerHTML = githubProfile.bio;

      // followers-following
      followers.innerHTML = githubProfile.followers;
      following.innerHTML = githubProfile.following;

      // location-share
      locationText.innerHTML = githubProfile.location;
      shareText.innerHTML = githubProfile.blog;
      console.log(githubProfile);
    });
  });
}

// Repositories
function githubAllRepositories() {
  fetch("https://api.github.com/users/zehraikizler/repos").then(repo => {
    repo.json().then(repositories => {
      githubRepositories = repositories;

      // repositories sayısı
      repositoriesLength.innerHTML = githubRepositories.length;

      // repositoriesleri yıldız sayısına göre sıralama
      githubRepositories.sort((a, b) => {
        return b.stargazers_count - a.stargazers_count;
      });

      // yıldız sayısına göre repoları oluşturma

      for (let i = 0; i < 6; i++) {
        if (githubRepositories[i].description == null) {
          githubRepositories[i].description = "";
        }

        let div = document.createElement("div");
        div.innerHTML = `<div class="card d-flex flex-column mb-2 me-2 p-3">
                                    <div class="d-flex justify-content-between mb-2">
                                        <a class="card-title text-primary fw-bold" href="${
                                          githubRepositories[i].html_url
                                        }" target="_blank">${
                                          githubRepositories[i].name
                                        }</a>
                                        <span class="conditions ms-auto rounded-pill">${
                                          githubRepositories[i].visibility
                                        }</span>
                                    </div>
                                    <p class="card-desc">${
                                      githubRepositories[i].description
                                    }</p>
                                    <div class="card-footer mt-auto p-0">
                                        <span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" fill="currentColor" class="mb-1 bi bi-circle-fill" viewBox="0 0 16 16">
                                                    <circle cx="8" cy="8" r="8"/>
                                                </svg>
                                            </span>
                                            <span class="language me-3">${
                                              githubRepositories[i].language
                                            }</span>
                                        </span>
                                        <span>
                                            <span>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1 bi bi-star" viewBox="0 0 16 16">
                                                    <path d="M2.866 14.85c-.078.444.36.791.746.593l4.39-2.256 4.389 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8.465.792a.513.513 0 0 0-.927 0L5.354 5.12l-4.898.696c-.441.062-.612.636-.283.95l3.523 3.356-.83 4.73zm4.905-2.767-3.686 1.894.694-3.957a.565.565 0 0 0-.163-.505L1.71 6.745l4.052-.576a.525.525 0 0 0 .393-.288L8 2.223l1.847 3.658a.525.525 0 0 0 .393.288l4.052.575-2.906 2.77a.565.565 0 0 0-.163.506l.694 3.957-3.686-1.894a.503.503 0 0 0-.461 0z"/>
                                                </svg>
                                            </span>
                                            <span class="stars me-3">${
                                              githubRepositories[i]
                                                .stargazers_count
                                            }</span>
                                        </span>
                                        ${`${
                                          githubRepositories[i].forks_count > 0
                                            ? `<span class="forks-count">
                                        <span>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" class="mb-1 bi bi-share" viewBox="0 0 16 16">
                                                <path d="M13.5 1a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zM11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5zm-8.5 4a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3zm11 5.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
                                            </svg>
                                        </span>
                                        <span class="forks">${githubRepositories[i].forks_count}</span>
                                    </span>`
                                            : ""
                                        }`}
                                    </div>
                                 </div> `;
        row.appendChild(div);
      }
    });
  });
}

// Starred
function starred() {
  fetch("https://api.github.com/users/zehraikizler/starred").then(star => {
    star.json().then(stars => {
      starredRepo = stars;
      starsLength.innerHTML = starredRepo.length;
    });
  });
}

getAllGithubsProfile();
githubAllRepositories();
starred();

// Navbar
window.onscroll = function() {
  scrollFunction();
};

let nav = document.getElementById("nav");

function scrollFunction() {
  if (
    document.body.scrollTop > 300 ||
    document.documentElement.scrollTop > 300
  ) {
    nav.style.position = "fixed";
    nav.style.width = "100%";
    nav.style.top = "0";
    nav.style.backgroundColor = "rgb(13, 17, 23)";
    nav.style.marginTop = "0px";
    document.querySelector(".profil-logo").style.display = "block";
  } else {
    nav.style.position = "relative";
    document.querySelector(".profil-logo").style.display = "none";
  }
}

// tablo oluşturma

let colors = [
  {
    color: "rgb(22, 27, 34)"
  },
  {
    color: "rgb(14, 68, 41)"
  },
  {
    color: "rgb(0, 109, 50)"
  },
  {
    color: "rgb(38, 166, 65)"
  },
  {
    color: "rgb(57, 211, 83)"
  }
];

let table = document.createElement("table");
for (let i = 0; i < 7; i++) {
  let tr = document.createElement("tr");
  table.appendChild(tr);

  for (let j = 0; j < 52; j++) {
    let td = document.createElement("td");
    let rndmSayi = Math.floor(Math.random() * 100);
    if (rndmSayi % 3 == 0) {
      let rndmSayi2 = Math.floor(Math.random() * 5);
      td.style.backgroundColor = colors[rndmSayi2].color;
    }
    tr.appendChild(td);
  }
}
let boxs = document.getElementById("boxs");
boxs.innerHTML = "";
boxs.appendChild(table);

let fiveBox = document.createElement("span");
for (let i = 0; i < 5; i++) {
  let span = document.createElement("span");
  span.classList.add("five-boxs");
  span.innerHTML = "z";
  span.style.color = "transparent";
  span.style.backgroundColor = colors[i].color;
  fiveBox.appendChild(span);
}

let box = document.getElementById("box");
box.appendChild(fiveBox);

// footer tarih alma

let date = document.querySelector(".date");

let year = new Date();
date.innerHTML = year.getFullYear();

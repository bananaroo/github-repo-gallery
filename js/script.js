//profile info
const overview = document.querySelector(".overview");
const username = "bananaroo";
const listSelection = document.querySelector(".repo-list");
const repoSelection = document.querySelector(".repos");
const repoData = document.querySelector(".repo-data");
const galleryReturn = document.querySelector(".view-repos");
const filterInput = document.querySelector(".filter-repos");

const infoFetch = async function () {
    const myInfo = await fetch (`https://api.github.com/users/${username}`);
    const data = await myInfo.json();
    displayInfo(data);
};

infoFetch();

const displayInfo = function (data) {
    const div = document.createElement("div");
    div.classList.add("user-info");
    div.innerHTML = `<figure>
    <img alt="user avatar" src=${data.avatar_url} />
  </figure>
  <div>
    <p><strong>Name:</strong> ${data.name}</p>
    <p><strong>Bio:</strong> ${data.bio}</p>
    <p><strong>Location:</strong> ${data.location}</p>
    <p><strong>Number of public repos:</strong> ${data.public_repos}</p>
  </div> `;
  overview.append(div);
  repoFetch();
};

const repoFetch = async function () {
    const gitRepos = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
    const gitData = await gitRepos.json();
    displayRepo(gitData);
};

    const displayRepo = function (repos) {
        filterInput.classList.remove("hide");
        for (const repo of repos) {
            const repoItem = document.createElement("li");
            repoItem.classList.add("repo");
            repoItem.innerHTML = `<h3>${repo.name}</h3>`;
            listSelection.append(repoItem);
        }
    };

    listSelection.addEventListener("click", function (e) {
        if (e.target.matches("h3")) {
            const repoName = e.target.innerText;
            repoInfoTarget(repoName);
        }
    });

    const repoInfoTarget = async function (repoName) {
        const repoInfoFetch = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        const repoInfo = await repoInfoFetch.json();
        console.log(repoInfo);
        const fetchLanguages = await fetch(repoInfo.languages_url);
        const languageData = await fetchLanguages.json();
        console.log(languageData);

        const languages = [];
        for (const language in languageData) {
            languages.push(language);
            console.log(languages);
        }
        repoInfoDisplay(repoInfo, languages);
    };

    const repoInfoDisplay = function (repoInfo, languages) {
        repoData.innerHTML = "";
        repoData.classList.remove("hide");
        repoSelection.classList.add("hide");
        galleryReturn.classList.remove("hide");

        const div = document.createElement("div");
        div.innerHTML = `
            <h3>Name: ${repoInfo.name}</h3>
            <p>Description: ${repoInfo.description}</p>
            <p>Default Branch: ${repoInfo.default_branch}</p>
            <p>Languages: ${languages.join(", ")}</p>
            <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>
        `;
        repoData.append(div);
    };

    galleryReturn.addEventListener("click", function () {
        repoSelection.classList.remove("hide");
        repoData.classList.add("hide");
        galleryReturn.classList.add("hide");
    });

filterInput.addEventListener("input", function (e){
    const searchText = e.target.value;
    //console.log(searchText);
    const repos = document.querySelectorAll(".repo");
    const lowerCaseValue = searchText.toLowerCase();
    
    for (const repo of repos) {
        const repoLowerText = repo.innerText.toLowerCase();
        if (repoLowerText.includes(lowerCaseValue)) {
            repo.classList.remove("hide");
        } else {
            repo.classList.add("hide");
        }
    }
});
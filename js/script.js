//profile info
const overview = document.querySelector(".overview");
const username = "bananaroo";
const listSelection = document.querySelector(".repo-list");

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
        for (const repo of repos) {
            const repoItem = document.createElement("li");
            repoItem.classList.add("repo");
            repoItem.innerHTML = `<h3>${repo.name}</h3>`;
            listSelection.append(repoItem);
        }
    };
interface Repo {
  name: string;
  html_url: string;
}
const APIURL = 'https://api.github.com/users/';
const main = document.querySelector<HTMLDivElement>('#main');

const getUser = async (username: string) => {
  const response = await fetch(APIURL + username);
  const data = await response.json();
  console.log('Response', data);
  const card = `
        <div class="card">
            <div>
                <img class="avatar" src="${data.avatar_url}" alt="Florin Pop">
            </div>
            <div class="user-info">
                <h2>${data.name}</h2>
                <p>${data.bio}</p>

                <ul class="info">
                    <li>${data.followers}<strong>Followers</strong></li>
                    <li>${data.following}<strong>Following</strong></li>
                    <li>${data.public_repos}<strong>Repos</strong></li>
                </ul>

                <div id="repos">
                    
                </div>
            </div>
        </div>`;
  if (main) main.innerHTML = card;
  getRepos(username);
};

// init call
getUser('joankirui');

const getRepos = async (username: string) => {
  const repos = document.querySelector<HTMLDivElement>('#repos');
  const response = await fetch(APIURL + username + '/repos');
  const data: Repo[] = await response.json();
  console.log(typeof data);
  data.forEach((item) => {
    console.log(item);
    const elem = document.createElement('a');
    elem.classList.add('repo');
    elem.href = item.html_url;
    elem.innerText = item.name;
    elem.target = '_blank';
    if (repos) repos.appendChild(elem);
  });
};

const formSubmit = () => {
  const searchBox = document.querySelector<HTMLInputElement>('#search');
  if (searchBox) {
    if (searchBox.value !== '') {
      getUser(searchBox.value);
      searchBox.value = ''; // This line sets the value of the searchBox input field to an empty string, effectively clearing it after the form submission.
    }
    return false;
  }
};

const searchBox = document.querySelector<HTMLInputElement>('#search');
if (searchBox) {
  searchBox.addEventListener('focusout', function () {
    formSubmit();
  });
}

  /* <a class="repo" href="#" target="_blank">Repo 1</a>
                    <a class="repo" href="#" target="_blank">Repo 2</a>
                    <a class="repo" href="#" target="_blank">Repo 3</a> */


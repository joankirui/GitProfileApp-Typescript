interface Repo {
  name: string;
  html_url: string;
}
interface User {
  avatar_url: string;
  name: string;
  bio: string;
  followers: number;
  following: number;
  public_repos: number;
}
const APIURL = 'https://api.github.com/users/';
const main = document.querySelector<HTMLDivElement>('#main');

const getUser = async (username: string) => {
  try {
    console.log(`Fetching user: ${username}`);
    const response = await fetch(APIURL + username);
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data: User = await response.json();
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
    if (main) {
      main.innerHTML = card;
      getRepos(username);
    } else {
      console.error('Main element not found');
    }
  } catch (error) {
    console.error('Failed to fetch user:', error);
  }
};

// init call
getUser('joankirui');

const getRepos = async (username: string) => {
  const repos = document.querySelector<HTMLDivElement>('#repos');
  try {
    console.log(`Fetching repos for user: ${username}`);
    const response = await fetch(APIURL + username + '/repos');
    if (!response.ok) throw new Error(`Error: ${response.status}`);
    const data: Repo[] = await response.json();
    console.log(typeof data);
    data.forEach((item) => {
      console.log(item);
      const elem = document.createElement('a');
      elem.classList.add('repo');
      elem.href = item.html_url;
      elem.innerText = item.name;
      elem.target = '_blank';
      if (repos) {
        repos.appendChild(elem);
      } else {
        console.error("Repos element not found");
      }
    });
  } catch (error) {
    console.error('Failed to fetch repos:', error);
  }
};

const formSubmit = () => {
  const searchBox = document.querySelector<HTMLInputElement>('#search');
  if (searchBox)
    if (searchBox.value !== '') {
      getUser(searchBox.value);
      console.log('Error',searchBox.value)
      searchBox.value = ''; // This line sets the value of the searchBox input field to an empty string, effectively clearing it after the form submission.
    }
  return false;
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

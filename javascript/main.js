'use strict'

function main (){
    const searchButtonElement = document.getElementById('search-btn');
    const usernameInputElement = document.getElementById('search');
    const mainContainerElement = document.getElementById('container');

    // --- User Info Elements --- //
    const userInfoElement = document.getElementById('user-info');
    const userImageElement = document.getElementById('user-image');
    const userLoginElement = document.getElementById('user-login');
    const userFullNameElement = document.getElementById('user-full-name');
    const userBioElement = document.getElementById('user-bio');

    // --- Repos Info Elements --- //
    const repoElement = document.getElementById('repos-list');
    const repoListElement = document.getElementById('user-repos');

    function getUserData(url){
        return fetch(url)
        .then((resp) => {
            if(!resp.ok){
                throw Error(resp.statusText);
            }
            return resp;
        })
        .then((resp) => resp.json())
    }

    function displayUserData(data){
        userInfoElement.style = "display: flex";
        userImageElement.src = data.avatar_url;
        userLoginElement.innerText = "@" + data.login;
        userFullNameElement.innerText = data.name ? data.name : "Full Name";
        userBioElement.innerText = data.bio ? data.bio : "this is the bio...";
    }

    function removeReposList(){
        while (repoListElement.firstChild) {
            repoListElement.removeChild(repoListElement.firstChild);
        }
    }

    function createReposList(data){
        repoElement.style = "display: block";
        for (let i = 0; i < data.length; i++) {
            console.log(data[i].name);
            const repoInfoElement = document.createElement('li');
            const repoLeftContainerElement = document.createElement('div');
            const repoRightContainerElement = document.createElement('div');
            const repoNameElement = document.createElement('span');
            const starCountImageElement = document.createElement('img');
            const repoStarCountElement = document.createElement('span');
            const forkCountImageElement = document.createElement('img');
            const repoForkCountElement = document.createElement('span');
            repoNameElement.innerText = data[i].name;
            starCountImageElement.src = "./images/star.png";
            repoStarCountElement.innerText = data[i].stargazers_count;
            forkCountImageElement.src = "./images/fork.png";
            repoForkCountElement.innerText = data[i].forks_count;
            repoListElement.appendChild(repoInfoElement);
            repoInfoElement.appendChild(repoLeftContainerElement);
            repoInfoElement.appendChild(repoRightContainerElement);
            repoLeftContainerElement.appendChild(repoNameElement);
            repoRightContainerElement.appendChild(starCountImageElement);
            repoRightContainerElement.appendChild(repoStarCountElement);
            repoRightContainerElement.appendChild(forkCountImageElement);
            repoRightContainerElement.appendChild(repoForkCountElement);
        }
    }

    function displayReposData(data){
        removeReposList();
        createReposList(data);
    }
    
    function handleClick(){
        const username = usernameInputElement.value;
        const userUrl = `https://api.github.com/users/${username}`;
        const repoUrl = userUrl + '/repos';
        getUserData(userUrl)
        .then(data => {
            displayUserData(data);
        })
        .catch((err) => {
            if(err.toString().includes("Not Found")){
                const errorElement = document.getElementById('error-message');
                errorElement.style = "display: block";
                const errorMessageElement = document.getElementById('error');
                errorMessageElement.innerText = "Does not exist";
            }
        });
        getUserData(repoUrl)
        .then(data =>{
            displayReposData(data);
        })
        .catch((err) => {});
        
    }



    searchButtonElement.addEventListener('click', handleClick);

}

document.addEventListener('DOMContentLoaded', main);



// variables refrence form and input elements
var userFormEl = document.querySelector('#user-form');
var nameInputEl = document.querySelector('#username');

// variables to refrence repo search terms
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");

// fetches info from github repositories
let getUserRepos = function(user) {
    // format the github api url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    
    // make a request to the url
    fetch(apiUrl)
        .then(function(response) {
            // ensure there is not a 404 error and the username actually exists
            if (response.ok) {
                response.json().then(function(data) {
                    //when response data is converted to JSON, go to displayRepos function
                    displayRepos(data, user);
                });
            } else {
                alert("Error: " + response.statusText);
            }
        })
        //catching internet connection errors
        .catch(function(error) {
            //chained to the end of then method
            alert('Unable to connect to GitHub')
        });
};

// executed upon a form submission browser event
var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var username = nameInputEl.value.trim();

    if(username) {
        getUserRepos(username);
        nameInputEl.value = "";
    } else {
        alert('Please enter a GitHub username')
    }
};

// function to display repos
var displayRepos = function(repos, searchTerm) {

    // check if api returned any repos
    if (repos.length === 0) {
        repoContainerEl.textContent = "No repositories found.";
        return;
    }

    // clear old content from searches
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;

    // loop over repos
    for (var i = 0; i < repos.length; i++) {
        // format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        // create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";

        // create a span element to hold repository name
        var titleEl = document.createElement("div");
        titleEl.textContent = repoName;

        // append to container
        repoEl.appendChild(titleEl);

        // create a status element to display issues
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center"

        // check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =
            "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
            statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }

        // append issues to container
        repoEl.appendChild(statusEl)

        // append container to the DOM
        repoContainerEl.appendChild(repoEl);
    }
}

// event listener for the form
userFormEl.addEventListener("submit", formSubmitHandler);
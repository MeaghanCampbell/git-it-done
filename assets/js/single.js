// refrence to the issue container
var issueContainerEl = document.querySelector("#issues-container");

// get repo issues takes repo name as a parameter
var getRepoIssues = function(repo) {
    // API endpoint and variable to define the query
    var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";
    // HTTP request to hit the endpoint and check the info returned in the response
    fetch(apiUrl).then(function(response) {
        // request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to the DOM function
                displayIssues(data);
            });
        } else {
            alert("There was a problem with your request!");
        }
    });
}

// Turning github issue data into DOM element
var displayIssues = function(issues) {
    //check for no issues
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!";
        return;
    }
    
    // loop over response data
    for (var i = 0; i < issues.length; i++) {
        // create a link element to take users to the issue on github
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        // create span to hold issue title
        var titleEl = document.createElement("span");
        titleEl.textContent = issues[i].title;

        // append to container
        issueEl.appendChild(titleEl);

        // create a type element
        var typeEl = document.createElement("span");

        // check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull Request)";
        } else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl)

        // append elements to page
        issueContainerEl.appendChild(issueEl);
    }
}

getRepoIssues("facebook/react");
// createElemWithText function
function createElemWithText(stringName = "p", textContent = "", className) {
    // Create the HTML element defined by the stringName.
    const name = document.createElement(stringName);
    // Set its text content.
    name.textContent = textContent;
    
    // Check if class name is provided and then assign it to the element.
    if(className) {
        name.className = className;
    }
    // Return the created element.
    return name;
}

// createSelectOptions function
function createSelectOptions(allUsers) {
    const selectors = [];

    // if allUsers parameter isn't provided, return undefined.
    if(!allUsers){
        return undefined;
    }
    // Loop through the allUsers array and create an option for each user in it.
    for (const user of allUsers) {
        const option = document.createElement('option');

        option.value = user.id;

        option.textContent = user.name;

        selectors.push(option);
    }
    // Return the array of created option elements.
    return selectors;
}

// toggleCommentSection function
function toggleCommentSection(postId) {
    commSect = document.querySelector(`section[data-post-id="${postId}"]`);
    if(commSect) {
        // Toggle 'hide' class on the comment section.
        commSect.classList.toggle('hide')
        return commSect;
    }
    if(!postId) {
        return undefined;
    }
    if(!commSect) {
        return null
    }
}

// toggleCommentButton function
function toggleCommentButton(postId) {
    const commButton = document.querySelector(`button[data-post-id="${postId}"]`);
    if (!postId) {
        return undefined
    }
    if (commButton) {
        // Change button text.
        commButton.textContent = commButton.textContent.trim() === 'Show Comments' ? 'Hide Comments' : 'Show Comments';
    }
    // Return the button element.
    return commButton
}

// deleteChildElements function
function deleteChildElements(parentElement) {

    // Return undefined if input is invalid.
    if (!parentElement || !(parentElement instanceof HTMLElement)) {
        return undefined;
    }

    // Start with the last child element.
    let childVar = parentElement.lastElementChild;

    // Loop while childVar is valid and remove every child from the parent element.
    while (childVar) {
        parentElement.removeChild(childVar);
        childVar =  parentElement.lastElementChild;
    }
    // Return the parent element.
    return parentElement;
}
    
    ///////////////////////////////////////////////////////////////////////
    
   // toggleComments function
function toggleComments(event, postId) {
    // If no event or postId, return undefined
    if(!event && !postId){
        return undefined
    }
    // Set the listener property of the event.target to true
    event.target.listener = true;

    // Toggle the comment section and button for the given postId
    const section = toggleCommentSection(postId);
    const button = toggleCommentButton(postId);

    // Return the created section and button
    return [section, button];
}

// addButtonListeners function
function addButtonListeners() {
    // Get all buttons inside the main element
    const buttons = document.querySelectorAll('main button');
    if (buttons) {
        // For each button, add a click event listener that toggles comments
        buttons.forEach(button => {
            const postId = button.dataset.postId;
            if (postId) {
                button.addEventListener('click', (event) => toggleComments(event, postId));
            }
        });
    }
    // Return all the buttons
    return buttons;
}

// removeButtonListeners function
function removeButtonListeners() {
    // Get all buttons inside the main element
    const buttons = document.querySelectorAll('main button');
    if (buttons) {
        // For each button, remove the click event listener that toggles comments
        buttons.forEach(button => {
            const postId = button.dataset.postId;
            if (postId) {
                button.removeEventListener('click', (event) => toggleComments(event, postId));
            }
        });
    }
    // Return all the buttons
    return buttons;
}

// createComments function
function createComments(commentsData) {
    // Create a document fragment to hold the comments
    const fragment = document.createDocumentFragment();
    if (!commentsData) {
        return undefined;
    }
    // For each comment in commentsData, create an article containing the comment and append it to the fragment
    commentsData.forEach(comment => {
        const article = document.createElement('article');
        const h3 = createElemWithText('h3', comment.name);
        const p1 = createElemWithText('p', comment.body);
        const p2 = createElemWithText('p', `From: ${comment.email}`);
        article.append(h3, p1, p2);
        fragment.appendChild(article);
    });
    // Return the fragment containing all the comments
    return fragment;
}

// populateSelectMenu function
function populateSelectMenu(usersData) {
    if(!usersData) {
        // If no usersData, return undefined
        return undefined;
    }
    // Get the selectMenu element
    const selectMenu = document.getElementById('selectMenu');
    // Create options for each user in usersData
    const options = createSelectOptions(usersData);
    // Append each option to the selectMenu
    options.forEach(option => selectMenu.appendChild(option));
    // Return the selectMenu
    return selectMenu;
}
    
    ///////////////////////////////////////////////////////
    
    // getUsers function
async function getUsers() {
    try {
        // Use fetch API to request all users
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        // Await the users data response and parse it as JSON
        const data = await response.json();
        // Return the JSON data
        return data;
    } catch (error) {
        // Log errors that occurred during the fetch operation
        console.error(error);
    }
}

// getUserPosts function
async function getUserPosts(userId) {
    if (!userId) {
        // If the userId is not provided, return undefined 
        return undefined;
    }
    try {
        // Use fetch API to request all posts for a specific user id by appending the userId in the URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
        // Await the posts data response and parse it as JSON
        const data = await response.json();
        // Return the JSON data
        return data;
    } catch (error) {
        // Log any error that occurred during the fetch operation
        console.error(error);
    }
}

// getUser function
async function getUser(userId) {
    if (!userId) {
        // If the userId is not provided, return undefined immediately
        return undefined;
    }
    try {
        // Use fetch API to request a specific user id by appending the userId in the URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
        // Await the user data response and parse it as JSON
        const data = await response.json();
        // Return the JSON data
        return data;
    } catch (error) {
        // Log any error that occurred during the fetch operation
        console.error(error);
    }
}

// getPostComments function
async function getPostComments(postId) {
    if(!postId) {
        // If the postId is not provided, return undefined 
        return undefined;
    }
    try {
        // Use fetch API to request all comments for a specific post id by appending the postId in the URL
        const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
        // Await the comments data response and parse it as JSON
        const data = await response.json();
        // Return the JSON data
        return data;
    } catch (error) {
        // Log errors that occurred during the fetch operation
        console.error(error);
    }
}
    /////////////////////////////////////////////////////////////////
    
    // displayComments function
async function displayComments(postId) {
    if(!postId) {
        // If the postId is not provided, return undefined 
        return undefined;
    }
    // Create a new section element
    const section = document.createElement('section');
    // Set the data attribute of the section to the postId
    section.dataset.postId = postId;
    // Add the 'comments' and 'hide' classes to the section
    section.classList.add('comments', 'hide');

    // Wait for the comments of the post  to be fetched
    const comments = await getPostComments(postId);
    
    const fragment = createComments(comments);

    // Append the created comments to the section
    section.appendChild(fragment);

    // Return the created section
    return section;
}

// Asynchronously creates posts given the post data. 
async function createPosts(postsData) {
    if(!postsData) { // If posts data is not present,  return undefined
        return undefined;
    }
    const fragment = document.createDocumentFragment(); // Creates a document fragment to append each post

    for (const post of postsData) { 
        const article = document.createElement('article');
        // Creating elements to hold different post data
        const h2 = createElemWithText('h2', post.title);
        const p1 = createElemWithText('p', post.body);
        const p2 = createElemWithText('p', `Post ID: ${post.id}`);
        const author = await getUser(post.userId);
        const p3 = createElemWithText('p', `Author: ${author.name} with ${author.company.name}`);
        const p4 = createElemWithText('p', author.company.catchPhrase);

        const button = document.createElement('button'); // Creating a button for each post that will show comments
        button.textContent = 'Show Comments';
        button.dataset.postId = post.id;

        article.append(h2, p1, p2, p3, p4, button); // Appending elements to the article

        const section = await displayComments(post.id); // Display comments for the post
        article.appendChild(section);

        fragment.appendChild(article); // Appending the article to the fragment
    }

    return fragment;
}

// Asynchronously displays posts given the post data.
async function displayPosts(postsData) {
    const main = document.querySelector('main'); // Main section where posts will be displayed

    let element;
    if (postsData) { 
        element = await createPosts(postsData); // Case when we have posts data
    }
    else {
        element = createElemWithText('p', 'Select an Employee to display their posts.'); // Default text when no employee is selected
        element.classList.add('default-text');
    }
    main.appendChild(element); // Appending the element to the main section

    return element; // Returning the element for further use
}

async function refreshPosts(postsData) {
    // Function to refresh posts
    if(!postsData) { 
        return undefined; //If no post data, return undefined
    }
    const removeButtons = removeButtonListeners(); // Removing button listeners
    const main = deleteChildElements(document.querySelector('main')); // Removing previous elements
    const fragment = await displayPosts(postsData); // Displaying posts based on new data
    const addButtons = addButtonListeners(); //Adding listeners to new buttons

    const refreshPostsArray = [removeButtons, main, fragment, addButtons]; // Array of these elements   

    return refreshPostsArray; // Return this array for future operations
}

// Event handler for when dropdown selection changes
async function selectMenuChangeEventHandler(event) {

    // The usual initialization and cleansing operations
    if (!event || !event.target) {
        userId = 1;
        posts = [];
        refreshPostsArray = [];
    } else {
        selectMenu = event.target;
        selectMenu.disabled = true;
        userId = selectMenu.value || 1;
        // Fetching posts and refreshing based on the selected user
        posts = await getUserPosts(userId);
        posts = Array.isArray(posts) ? posts : [];
        refreshPostsArray = await refreshPosts(posts);
        refreshPostsArray = Array.isArray(refreshPostsArray) ? refreshPostsArray : [];
        selectMenu.disabled = false;
    }

    const result = [userId, posts, refreshPostsArray];

    // Return these operations for future uses
    return result;
}

// The function to initialize the page
async function initPage() {
    const users = await getUsers();
    const select = populateSelectMenu(users);
    // Return these operations for future use
    return [users, select];
}

//InitApp function
function initApp() {
    initPage().then(() => {
        const selectMenu = document.querySelector('#selectMenu');
        selectMenu.addEventListener('change', async (event) => {
            const result = await selectMenuChangeEventHandler(event);
            if (result && result.length === 3) {
                await refreshPosts(result[1]);
            }
        });
    });
}

// listens for the HTML to load before running the initApp function
document.addEventListener('DOMContentLoaded', initApp);
const API_ENDPOINT = 'https://65e77e4d53d564627a8ee812.mockapi.io/api/v1';


/**
 * Deletes a task for a specific user.
 * @param {string} taskId - The ID of the task to be deleted.
 * @param {string} userID - The ID of the user who owns the task.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response of the DELETE request.
 */
export const deleteItem = async (taskId, userID) => {
    const res =  await fetch(`${API_ENDPOINT}/users/${userID}/tasks/${taskId}`, {
        method: 'DELETE',
    });

    return res.json();
}

/**
 * Retrieves all users from the API.
 * @returns {Promise<Array>} - A Promise that resolves to an array of users.
 */
export const getAllUsers = async ()=> {
    const res = await fetch(`${API_ENDPOINT}/users`);
    return await res.json();
}

/**
 * Creates a new user in the API.
 * @param {Object} data - The user data to be created.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response of the POST request.
 */
export const createNewUser = async (data)=> {

    const res= await fetch(`${API_ENDPOINT}/users`, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(data)
    });

    return await res.json();
}

/**
 * Checks if a user with specific data already exists in the API.
 * @param {Object} data - The user data to check for existence.
 * @returns {Promise<Object>} - A Promise that resolves to the found user or an empty object if not found.
 */
export const checkExistingUser = async (data)=> {

    const allUsers = await getAllUsers();
    let singleUser = {};

    if ( allUsers.length ) {
        singleUser = allUsers.filter( singleUser => {

            return ( singleUser.name
                     && singleUser.name.trim() === data.name.trim()
                     && singleUser.firstName
                     && singleUser.firstName.trim() === data.firstName.trim()
            );
        })
    }

    return singleUser;
}

/**
 * Edits the content of a task for a specific user.
 * @param {string|number} userID - The ID of the user who owns the task.
 * @param {string} taskId - The ID of the task to be edited.
 * @param {string} newTitle - The new content/title for the task.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response of the PUT request.
 */
export const editItem = async (userID, taskId, newTitle) => {
    const newTask = {
        content: newTitle,
        completed: false,
    };

    const res = await fetch(`${API_ENDPOINT}/users/${userID}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTask)
    })

    return res.json();

}

/**
 * Retrieves tasks for a specific user from the API.
 * @param {string} userId - The ID of the user whose tasks are to be retrieved.
 * @returns {Promise<Array>} - A Promise that resolves to an array of tasks for the specified user.
 */
export const getUserTasks = async (userId) => {
    const res = await fetch(`${API_ENDPOINT}/users/${userId}/tasks`, {
        method: 'GET',
        headers: {'content-type':'application/json'},
    });
    const dataTasks = await res.json();
    return dataTasks.map(item => {
        return {
            id: item.id,
            content: item.content,
        }
    });
}

/**
 * Adds a new task for a specific user in the API.
 * @param {string} userId - The ID of the user for whom the task is added.
 * @param {Object} newTask - The task data to be added.
 * @returns {Promise<Object>} - A Promise that resolves to the JSON response of the POST request.
 */
export const addNewUserTask = async (userId, newTask) => {
    const res = await fetch(`${API_ENDPOINT}/users/${userId}/tasks`, {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(newTask)
    });
    return await res.json();

}
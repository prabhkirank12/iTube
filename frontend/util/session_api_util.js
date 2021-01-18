//creates a new user
export const signup = (user) => {
    return $.ajax({
        method: "POST",
        url: "/api/users",
        data: { user }
    })
}

//logs in a user
export const login = (user) => {
    return $.ajax({
        method: "POST",
        url: "/api/session",
        data: { user }
    })
}

//logs out a user
export const logout = () => {
    return $.ajax({
        method: "DELETE",
        url: "/api/session",
    })
}

//retrieves a user by the user id
export const fetchUser = (userId) => {
    if (userId) {
        return $.ajax({
            method: "GET",
            url: `api/users/${userId}`
        })
    }
}


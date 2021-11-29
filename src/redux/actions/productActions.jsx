

export const setProducts = (products) => {
    return {
        type: "SET_PRODUCTS",
        payload: products,
    }
}

export const setRecipeProducts = (products) => {
    return {
        type: "SET_RECIPE_PRODUCTS",
        payload: products,
    }
}

export const setDishes = (dishes) => {
    return {
        type: "SET_DISHES",
        payload: dishes,
    }
}

export const setBranches = (dishes) => {
    return {
        type: "SET_BRANCHES",
        payload: dishes,
    }
}

export const setCategories = (categories) => {
    return {
        type: "SET_CATEGORIES",
        payload: categories,
    }
}

export const setEmployees = (employees) => {
    return {
        type: "SET_EMPLOYEES",
        payload: employees
    }
}

export const setNotification = (data) => {
    return {
        type: "SET_NOTIFICATION",
        payload: data
    }
}


export const selectedProduct = (products) => {
    return {
        type: "SELECTED_PRODUCT",
        payload: products,
    }
}

export const setSelectedBranch = (branch) => {
    return {
        type: "SET_SELECTED_BRANCH",
        payload: branch,
    }
}

export const setSelectedDish = (dish) => {
    return {
        type: "SET_SELECTED_DISH",
        payload: dish,
    }
}

export const setSelectedProduct = (product) => {
    return {
        type: "SET_SELECTED_PRODUCT",
        payload: product,
    }
}

export const setSelectedEmployee = (data) => {
    return {
        type: "SET_SELECTED_EMPLOYEE",
        payload: data,
    }
}

export const setLogin = (token) => {
    return {
        type: "SET_LOGIN",
        payload: token
    }
}

export const setToken = (token) => {
    return {
        type: "SET_TOKEN",
        payload: token
    }
}

export const login = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}
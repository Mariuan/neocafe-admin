

export const setProducts = (products) => {
    return {
        type: "SET_PRODUCTS",
        payload: products,
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

export const removeBranch = (id) => {
    return {
        type: "SET_EMPLOYEES",
        payload: id
    }
}

export const selectedProduct = (products) => {
    return {
        type: "SELECTED_PRODUCT",
        payload: products,
    }
}

export const setLogin = (token) => {
    return {
        type: "SET_LOGIN",
        payload: token
    }
}

export const login = (data) => {
    return {
        type: "LOGIN",
        payload: data
    }
}
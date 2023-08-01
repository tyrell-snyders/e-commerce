import Cookies from "js-cookie";
const URL = 'http://localhost:3000'

export const addNewProduct = async (formData) => {
    try {
        const res = await fetch('/api/admin/add-product', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()
        console.log(data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const getAllProducts = async() => {
    
    try {
        const res = await fetch(`${URL}/api/admin/all-products`, {
            method: 'GET',
            cache: 'no-store'
        })
        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);      
    }
}

export const updateProduct = async(formData) => {
    try {
        const res = await fetch('/api/admin/update', {
            method: 'PUT',
            cache: 'no-store',
            headers: {
                'content-type': 'application/json',
                Authorization: `Bearer ${Cookies.get('token')}`
            },
            body: JSON.stringify(formData)
        })

        const data = await res.json()

        return data

    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async(id) => {
    try {
        const res = await fetch(`/api/admin/delete?id=${id}`, {
            method: 'DELETE',
            cache: 'no-store',
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        })

        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);
    }
}

export const categoryProduct = async(id) => {
    try {
        const res = await fetch(`${URL}/api/client/category?id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        })
        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);
    }
}

export const getProduct = async(id) => {
    try {
        const res = await fetch(`${URL}/api/client/product-id?id=${id}`, {
            method: 'GET',
            cache: 'no-store'
        })
        const data = await res.json()

        return data
    } catch (err) {
        console.log(err);
    }
}
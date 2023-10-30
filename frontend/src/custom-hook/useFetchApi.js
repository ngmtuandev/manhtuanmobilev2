import fetchApiLogin from "../api/fetchApiLogin"

export function useFetchApi() {
    const apiLogin = async (data) => {
        console.log('testttt >>>>', data)
        const login = await fetchApiLogin(data)
        return login
    }
    return {
        apiLogin
    }
}


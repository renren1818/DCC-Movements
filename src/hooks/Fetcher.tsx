import axios from 'axios';

export function useFetcher() {

    const fetcher = axios.create({
        baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}/api`
    });

    fetcher.interceptors.request.use(async (request) => {

        /*
        const session = await getSession();

        if (session) request.headers['Authorization'] = `Bearer ${session?.user.token.accessToken}`;
        */

        return request;

    });

    fetcher.interceptors.response.use(response => response, async error => {

        /*
        const session = await getSession();

        if (session) {

            const originalRequest = error.config;

            if (error.response.status === 401 && !originalRequest._retry) {

                originalRequest._retry = true;

                try {

                    const result = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/token/refresh`, session?.user.token);

                    await update({
                        ...session?.user,
                        token: result.data
                    });

                    fetcher.defaults.headers.common.Authorization = `Bearer ${result.data.accessToken}`;
                    
                    return fetcher.request(originalRequest);

                } catch (refreshError) {

                    await signOut();

                    return Promise.reject(refreshError);
                }

            }

        }
        */

        return Promise.reject(error);

    });

    async function GET(endpoint: string) {
        return fetcher.get(endpoint);
    }

    async function POST(endpoint: string, data: object | string | number)  {

        return fetcher.post(endpoint, data, {
            headers: {
                'Content-Type': 
                    (typeof data === "string")  ? 'text/plain' :
                    (data instanceof FormData) ? 'multipart/form-data' : 
                    'application/json'
            }
        });
        
    }

    async function PATCH(endpoint: string, data: object) {
        return fetcher.patch(endpoint, data)
    }

    async function PUT(endpoint: string, data: object) {
        return fetcher.put(endpoint, data)
    }

    async function DELETE(endpoint: string) {
        return fetcher.delete(endpoint)
    }

    return {
        GET,
        POST,
        PATCH,
        PUT,
        DELETE
    }

}
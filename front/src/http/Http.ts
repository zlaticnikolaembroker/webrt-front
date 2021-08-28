import { Endpoint } from ".";

const baseUrl = "http://localhost:8080";

export interface PostResponse {
    error?: string,
    data?: any,
}

const post = (async (endpointUrl: Endpoint, body: string) => {
    const response = await window.fetch(baseUrl + endpointUrl, {
        method: 'POST',
        body: body,
    });

    return {
        data: await response.text(),
        error: response.ok ? undefined : 'error',
    } as PostResponse;
});

export default post;
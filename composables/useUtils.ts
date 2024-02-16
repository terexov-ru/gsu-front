export const useUtils = () => {

    function getTokenCookie(): string | undefined {
        return useCookie('token')?.value;
    }

    function setTokenCookie(token: string): void {
        const tokenRef = useCookie('token');
        tokenRef.value = token;
    }

    function deleteTokenCookie(token: string): void {
        const tokenRef = useCookie('token');
        tokenRef.value = undefined;
    }

    return {
        getTokenCookie,
        setTokenCookie,
        deleteTokenCookie,
    }
}

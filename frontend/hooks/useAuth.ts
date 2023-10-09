import {useCookies} from "react-cookie";

export const useAuth = () => {
    const [cookies, setCookie, removeCookie] = useCookies(['auth'])
    const cookie: any = Object.values(useCookies(["auth"]))
    const uid = cookie[0]?.auth?.uid;
    const token = cookie[0]?.auth?.auth_token;
    const saveToken = (uid: string, token: string) => {
        setCookie("auth", {uid, token}, {path: '/', secure: true});
    }
    return {
        uid, saveToken
    }
}
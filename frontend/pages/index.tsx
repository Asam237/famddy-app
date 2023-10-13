import {useAuth} from "../hooks/useAuth";
import {useEffect} from "react";
import {useRouter} from "next/router";

export default function Index() {

    const {uid} = useAuth();
    const {push} = useRouter();
    useEffect(() => {
        if (uid) {
            push("/dashboard");
        } else {
            push("/home");
        }
    }, []);

}


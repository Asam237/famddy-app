import {toast} from "react-toastify";

export const useCopy = (id: string) => {
    const copyText: any = window.document.getElementById(id);
    copyText?.select();
    copyText?.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText?.value);
    toast.success("Copy to clipboard");
};


import {DropdownMenu, Flex} from "@radix-ui/themes";
import {useCookies} from "react-cookie";
import {useRouter} from "next/router";

const DropDown = ({name}: { name: String }) => {
    const [cookies, setCookie, removeCookie] = useCookies(["auth"]);
    const router = useRouter();
    const toLogout = () => {
        removeCookie("auth");
        router.push("/");

    }
    return (
        <Flex gap="3" align="center">
            <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                    <div className={'flex justify-center cursor-pointer hover:underline underline-offset-4'}>
                        <h1 className={'text-gray-700 text-sm font-semibold'}>{name}</h1>
                    </div>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content size="2">
                    <DropdownMenu.Item>Profile</DropdownMenu.Item>
                    <DropdownMenu.Separator/>
                    <DropdownMenu.Item onClick={toLogout}>Deconnexion</DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Flex>
    );
}

export default DropDown;
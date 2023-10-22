import {AlertDialog, Button, Flex} from "@radix-ui/themes"
import {cleanText} from "../../utils/helpers";
import {useDeleteShortener} from "../../hooks/requests/mutations/useDeleteShortener";
import {toast} from "react-toastify";
import {FaTrash} from "react-icons/fa";

type RemoveDialogInput = {
    id: string
    title: string
}

const RemoveDialog = ({id, title}: RemoveDialogInput) => {

    const deleteShortenerMutation = useDeleteShortener();
    const handlerDeleteShortener = (e: any) => {
        e.preventDefault();
        deleteShortenerMutation.mutate(id);
        toast.success("Delete link success !!!");
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <FaTrash className={'text-red-500 cursor-pointer'}/>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{maxWidth: 450}}>
                <AlertDialog.Title>{cleanText(title, 30)}</AlertDialog.Title>
                <AlertDialog.Description size="2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At, quaerat!
                </AlertDialog.Description>
                <Flex gap="3" mt="4" justify="end">
                    <AlertDialog.Cancel>
                        <Button variant="soft" color="gray">
                            Cancel
                        </Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <form onSubmit={handlerDeleteShortener}>
                            <Button variant="solid" color="red" type="submit">
                                Delete
                            </Button>
                        </form>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default RemoveDialog
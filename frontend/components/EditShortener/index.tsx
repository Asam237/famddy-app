import {AlertDialog, Button, Flex, TextField} from "@radix-ui/themes";
import {FaEdit} from "react-icons/fa";
import {useEditShortener} from "../../hooks/requests/mutations/useEditShortener";
import {SubmitHandler, useForm} from "react-hook-form";

export type EditShortenerInput = {
    id: string
    longUrl: string
}

const EditShortener = ({id, longUrl}: EditShortenerInput) => {

    const {handleSubmit, register, formState: {errors}} = useForm<EditShortenerInput>();
    const edithShortener = useEditShortener(id);
    const handlerEditShortener: SubmitHandler<EditShortenerInput> = (data: EditShortenerInput) => {
        edithShortener.mutate({...data})
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <FaEdit className={'text-blue-500 cursor-pointer'}/>
            </AlertDialog.Trigger>
            <AlertDialog.Content style={{maxWidth: 450}}>
                <AlertDialog.Title>Edit link</AlertDialog.Title>
                <form onSubmit={handleSubmit(handlerEditShortener)}>
                    <TextField.Root size="3">
                        <TextField.Input pattern="https?://.*" {...register("longUrl")} placeholder="Enter link here..."
                                         required title="Enter a link starting with http or https"/>
                    </TextField.Root>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="blue" type={"submit"}>
                                Edit
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </form>
            </AlertDialog.Content>
        </AlertDialog.Root>
    );
}

export default EditShortener;
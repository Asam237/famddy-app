import {Button, Dialog, Flex, Text, TextField} from "@radix-ui/themes";
import {useCreateShortener} from "../../hooks/requests/mutations/useCreateShortener";
import {SubmitHandler, useForm} from "react-hook-form";
import {ShortenerUserInput} from "../../typings";


type DialogType = {
    title: string
    description: string
    label: string
};

const DialogComponent = ({title, description, label}: DialogType) => {

    const {handleSubmit, formState: {errors}, register} = useForm<ShortenerUserInput>();
    const createShortenerUser = useCreateShortener();
    const handlerShortener: SubmitHandler<ShortenerUserInput> = (data: ShortenerUserInput) => {
        createShortenerUser.mutate({...data});
    }

    return (
        <Dialog.Root>
            <Dialog.Trigger>
                <Button size="3" className={'bg-violet-700 w-full xl:w-1/6'}
                        style={{margin: '14px 0', background: "#6D28D9"}}>
                    {title}
                </Button>
            </Dialog.Trigger>
            <Dialog.Content style={{maxWidth: 450}}>
                <form onSubmit={handleSubmit(handlerShortener)}>
                    <Dialog.Title>{title}</Dialog.Title>
                    <Dialog.Description size="2" mb="4">
                        {description}
                    </Dialog.Description>
                    <Flex direction="column" gap="3">
                        <label>
                            <Text as="div" size="2" mb="1" weight="bold">
                                {label}
                            </Text>
                            <TextField.Input
                                {...register("longUrl")}
                                defaultValue=""
                                pattern="https?://.*"
                                required
                                placeholder="Enter your link"
                            />
                        </label>
                    </Flex>
                    <Flex gap="3" mt="4" justify="end">
                        <Dialog.Close>
                            <Button variant="soft" color="gray">
                                Annuler
                            </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                            <Button type="submit">Ajouter</Button>
                        </Dialog.Close>
                    </Flex>
                </form>
            </Dialog.Content>
        </Dialog.Root>
    );
}

export default DialogComponent;
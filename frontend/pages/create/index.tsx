import Head from "next/head";
import {FaMagic} from "react-icons/fa";
import {Button, Heading, Text, TextField} from '@radix-ui/themes'
import {useRouter} from "next/router";
import {SubmitHandler, useForm} from "react-hook-form";
import {CreateUserInput} from "../../typings";
import {useRegisterUser} from "../../hooks/requests/mutations/useCreateUser";
import Link from "next/link";


const Create = () => {

    const router = useRouter();
    const {register, handleSubmit, formState: {errors}} = useForm<CreateUserInput>();
    const createUser = useRegisterUser();

    const handleRegister: SubmitHandler<CreateUserInput> = (data: CreateUserInput) => {
        createUser.mutate({...data});
        if (createUser.isSuccess) {
            router.push("/create");
        }
    }

    return (
        <div className={"bg-gray-100 h-screen"}>
            <Head>
                <title>Signin</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={'flex justify-center items-center h-screen'}>
                <div className={'w-full mx-4 md:mx-0 md:w-3/4 flex md:h-1/2 border-2 border-gray-300'}>
                    <div className={'hidden md:flex md:w-1/2 bg-violet-700 h-full'}>
                        <div className={'flex justify-center items-center flex-col px-8'}>
                            <FaMagic size={80} color={'white'}/>
                            <Text size="3" weight="medium" align="center" style={{color: 'white', marginTop: '10px'}}>
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, deleniti dolore et
                                ipsam reprehenderit sed.
                            </Text>
                        </div>
                    </div>


                    <div
                        className={'flex flex-col w-full md:w-1/2 h-full justify-center p-4 md:px-12 bg-white'}>
                        <Heading>S&apos;inscrire</Heading>
                        <Text size="2" style={{margin: '14px 0'}}>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.</Text>
                        <form onSubmit={handleSubmit(handleRegister)}>
                            <TextField.Root size="3">
                                <TextField.Input {...register("full_name")} placeholder="Full Name"/>
                            </TextField.Root>
                            <TextField.Root size="3" style={{marginTop: '14px'}}>
                                <TextField.Input {...register("email")} placeholder="Email"/>
                            </TextField.Root>
                            <TextField.Root size="3" style={{marginTop: '14px'}}>
                                <TextField.Input {...register("password")} type={"password"}
                                                 placeholder="Password"/>
                            </TextField.Root>
                            {
                                createUser.isError &&
                                <p className={"text-center text-sm pt-2 text-red-500 font-semibold"}>Server
                                    Error !</p>
                            }
                            <Button size="3" type="submit" className={'bg-violet-700 w-full xl:w-1/4'}
                                    style={{margin: '14px 0', background: "#6D28D9"}}>
                                {createUser.isLoading ? "Loading.." : "Sign Up"}
                            </Button>
                        </form>
                        <Text size="2" style={{margin: '6px 0'}} className={'text-center'}>Vous avez un
                            compte ? <Link href={"/signin"}
                                           className={'font-semibold text-violet-700 cursor-pointer'}>Connectez-vous.</Link></Text>
                    </div>
                </div>
            </div>
        </div>
    )
        ;
}

export default Create;
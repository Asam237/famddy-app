import Head from "next/head";
import {FaMagic} from "react-icons/fa";
import {Button, Heading, Text, TextField} from '@radix-ui/themes'


const Signin = () => {
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
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, deleniti dolore et ipsam reprehenderit sed.
                            </Text>
                        </div>
                    </div>
                    <div className={'flex flex-col w-full md:w-1/2 h-full justify-center p-4 md:px-12 bg-white'}>
                        <Heading>Se connecter</Heading>
                        <Text size="2" style={{margin: '14px 0'}}>Lorem ipsum dolor sit amet,
                            consectetur adipisicing elit.</Text>
                        <TextField.Root size="3">
                            <TextField.Input placeholder="Email"/>
                        </TextField.Root>
                        <TextField.Root size="3" style={{marginTop: '14px'}}>
                            <TextField.Input placeholder="Mot de passe"/>
                        </TextField.Root>
                        <Button size="3" className={'bg-violet-700'} style={{margin: '14px 0', background: "#6D28D9"}}>
                            Connexion
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;
import Head from "next/head";
import DashboardHeader from "../../components/Header/dashboard";

const DashboardLayout = ({children}: any) => {
    return (
        <>
            <Head>
                <title>Free URL Shortener</title>
                <meta name="description" content=""/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <DashboardHeader/>
            {children}
        </>
    );
}

export default DashboardLayout;
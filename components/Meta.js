import Head from 'next/head';

export default () => (
    <div>
        <Head>
            <meta name="viewport" content="width=device-width, init-scale=1" />
            <meta charSet="utf-8" />
            <link href="https://fonts.googleapis.com/css?family=Montserrat:400|Open+Sans:300,400" rel="stylesheet" />
        </Head>
        <style jsx global>{`
            body {
                margin: 0;
                font-family: 'Open Sans';
                font-weight: 400;
                font-size: 14px;
            }

            h1, h2, h3, h4, h5 {
                font-family: 'Montserrat';
                font-weight: 500;
                margin: 0;
            }

            a {
                text-decoration: none;
                color: black;
                outline: 0;
            }

            h1 {
                font-size: 24px;
            }

            h2 {
                font-size: 20px;
            }
        `}</style>
    </div>
);
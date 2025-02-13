import { Layout } from 'components';
import { Intro } from 'components';
import type { NextPage } from 'next';

const Home: NextPage = () => {
    return (
        <Layout>
            <Intro />
        </Layout>
    );
};

export default Home;

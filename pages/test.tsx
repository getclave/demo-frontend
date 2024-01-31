import { Layout } from 'components';
import type { NextPage } from 'next';
import { useState } from 'react';
import { rustMultiply } from 'rust/pkg/hello';

const Test: NextPage = () => {
    const [testValue, setTestValue] = useState<string>('');
    const handleTest = async (): Promise<void> => {
        console.log('her', rustMultiply(2, 123));
        setTestValue((value: string) => (Number(value) + 1).toString());
    };
    return (
        <Layout>
            <div style={{ margin: '25px', width: '75%' }}>
                <button onClick={handleTest}>Test it something!</button>
                <div>{testValue}</div>
            </div>
        </Layout>
    );
};

export default Test;

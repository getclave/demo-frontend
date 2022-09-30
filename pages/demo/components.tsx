import { Container } from '@ethylene/components';
import { NextPage } from 'next';
import { useRef } from 'react';

const Components: NextPage = () => {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div>
      <Container forwardedRef={ref}>components</Container>
    </div>
  );
};

export default Components;

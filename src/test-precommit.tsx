import { useState } from 'react';

const TestComponent = () => {
  const [count] = useState(0);
  return <div>Count: {count}</div>;
};
export default TestComponent;

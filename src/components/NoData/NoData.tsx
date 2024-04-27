import { FC } from 'react';

interface IProps {
  text: string;
}

const NoData: FC<IProps> = ({ text }) => {
  return <div className='w-full h-full flex items-center justify-center text-xl'>{text}</div>;
};

export default NoData;

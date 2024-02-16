import { FC, ChangeEvent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, CardBody, CardFooter, CardHeader, Input } from '@nextui-org/react';
import { Eye, EyeSlash } from '@phosphor-icons/react';

interface IForm {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IProps {
  title: string;
  onClick?: (state: IForm) => void; //* Şu anlık optional.
}

const Form: FC<IProps> = ({ title }) => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [form, setForm] = useState<IForm>({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const toggleEyeIcon = (): void => {
    setShowPassword((preValue: boolean) => !preValue);
  };

  const handleChangeFormState = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setForm((preValue: IForm) => ({ ...preValue, [name]: value }));
  };

  return (
    <form
      onSubmit={e => {
        e.preventDefault();
        console.log(form);
        //* back-end bağlantısı ileride yapılacak.
        //* onClick(form);
      }}
    >
      <Card className='w-full max-w-[400px] m-auto mt-5' shadow='sm'>
        <CardHeader>{title}</CardHeader>
        <CardBody>
          <Input
            name='username'
            className='mb-2'
            label={t('form.username')}
            size='sm'
            variant='faded'
            color='default'
            isRequired
            value={form.username}
            onChange={handleChangeFormState}
          />
          <Input
            name='email'
            className='mb-2'
            label={t('form.email')}
            size='sm'
            variant='faded'
            color='default'
            isRequired
            value={form.email}
            onChange={handleChangeFormState}
          />
          <Input
            name='password'
            className='mb-2'
            label={t('form.password')}
            endContent={
              showPassword ? (
                <EyeSlash className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              ) : (
                <Eye className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              )
            }
            size='sm'
            variant='faded'
            color='default'
            type={showPassword ? 'text' : 'password'}
            isRequired
            value={form.password}
            onChange={handleChangeFormState}
          />
          <Input
            name='confirmPassword'
            className='mb-2'
            label={t('form.confirmPassword')}
            endContent={
              showPassword ? (
                <EyeSlash className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              ) : (
                <Eye className='hover:cursor-pointer' onClick={toggleEyeIcon} />
              )
            }
            size={'sm'}
            variant='faded'
            color='default'
            type={showPassword ? 'text' : 'password'}
            isRequired
            value={form.confirmPassword}
            onChange={handleChangeFormState}
          />
        </CardBody>
        <CardFooter>
          <Button size='sm' fullWidth type='submit'>
            {title}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default Form;

import { FC, forwardRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';

interface IForm {
  location: string;
  startDate: string;
  endDate: string;
}

interface IEvent {
  value?: string;
  onClick?: () => null;
}

const RentForm: FC = () => {
  const { t } = useTranslation();
  const [startDatePicker, setStartDatePicker] = useState<Date | null>(null);

  const today: Date = new Date();
  const _nextYear: Date = new Date();
  _nextYear.setFullYear(_nextYear.getFullYear() + 1);
  const nextYear: Date = _nextYear;

  const schema = yup.object().shape({
    location: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      location: '',
      startDate: '',
      endDate: '',
    },
    mode: 'onBlur',
  });

  const onSubmit = (data: IForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    console.log(data);
  };

  const handleCustomDatePickerChange = (e: Date): void => {
    console.log(e.toLocaleDateString());

    setStartDatePicker(e);
    setValue('startDate', startDatePicker?.toLocaleDateString() ?? '');
  };

  const createCustomInput = (type: 'start' | 'end'): JSX.Element => {
    const typeDate = `${type}Date` as const;

    const CustomDatePickerInput = forwardRef<HTMLInputElement, IEvent>(({ onClick }, ref) => (
      <Input
        {...register(typeDate)}
        ref={ref}
        value={startDatePicker?.toLocaleDateString()}
        onClick={onClick}
        onFocus={onClick}
        label={t(`form.${type}`)}
        placeholder={t('form.inputDatePlaceholder')}
        labelPlacement='inside'
        variant='bordered'
        color={errors[typeDate]?.message ? 'danger' : 'default'}
        errorMessage={errors[typeDate]?.message}
        isInvalid={!!errors[typeDate]?.message}
        className={!errors[typeDate]?.message ? 'mb-6' : ''}
        classNames={{
          errorMessage: 'text-left',
        }}
        autoComplete='off'
      />
    ));

    return <CustomDatePickerInput />;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-4 py-8 bg-neutral-900 overflow-visible'>
        <div className='flex items-center justify-center gap-4'>
          <Select
            {...register('location')}
            labelPlacement='inside'
            label={t('form.location')}
            color={errors.location?.message ? 'danger' : 'default'}
            variant='bordered'
            errorMessage={errors.location?.message}
            isInvalid={!!errors.location?.message}
            className={!errors.location?.message ? 'mb-6' : ''}
            classNames={{
              errorMessage: 'text-left',
            }}
          >
            <SelectItem key={'İstanbul'} value={'İstanbul'}>
              {'İstanbul'}
            </SelectItem>
          </Select>
          <CustomDatePicker
            selected={startDatePicker}
            onChange={handleCustomDatePickerChange}
            // dateFormat='dd.mm.yyyy'
            minDate={today}
            maxDate={nextYear}
            customInput={createCustomInput('start')}
          />
          <CustomDatePicker
            selected={startDatePicker}
            onChange={handleCustomDatePickerChange}
            // dateFormat='dd.mm.yyyy'
            minDate={today}
            maxDate={nextYear}
            customInput={createCustomInput('end')}
          />
        </div>
        <div className='w-full flex items-center justify-end mt-4'>
          <div className='w-40'>
            <Button className='bg-neutral-200 text-neutral-900' fullWidth type='submit'>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default RentForm;

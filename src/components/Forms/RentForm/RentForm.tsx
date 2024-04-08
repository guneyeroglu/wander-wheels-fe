import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from '@tanstack/react-router';
import { Button, Card, Input, Select, SelectItem } from '@nextui-org/react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import moment from 'moment';

import { IRentForm } from '../../../global/interfaces';
import { ICity } from '../../../global/interfaces/services/cities';
import { GetAllCities } from '../../../global/services/cities';
import CustomDatePicker from '../../CustomDatePicker/CustomDatePicker';

const RentForm: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { data, isFetching } = GetAllCities();

  const today: Date = moment().toDate();
  const tomorrow: Date = moment(today).add(1, 'day').toDate();
  const nextYear: Date = moment(today).add(1, 'year').toDate();
  const nextYearForTomorrow: Date = moment(tomorrow).add(1, 'year').toDate();

  const schema = yup.object().shape({
    location: yup.string().required(),
    startDate: yup.string().required(),
    endDate: yup.string().required(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm<IRentForm>({
    resolver: yupResolver(schema),
    defaultValues: {
      location: '',
      startDate: '',
      endDate: '',
    },
    mode: 'all',
  });

  const [startDate, endDate] = watch(['startDate', 'endDate']);

  const onSubmit = (data: IRentForm): void => {
    //* back-end bağlantısı ileride yapılacak.
    //* onClick();

    const _location: string = data.location;
    const _startDate: string = moment(new Date(data.startDate)).format('YYYY-MM-DD');
    const _endDate: string = moment(new Date(data.endDate)).format('YYYY-MM-DD');

    navigate({
      to: '/car-list',
      search: {
        location: _location,
        startDate: _startDate,
        endDate: _endDate,
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card className='px-4 py-8 bg-neutral-900 overflow-visible' shadow='sm'>
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
            isLoading={isFetching}
            isDisabled={isFetching}
          >
            {data ? (
              data.data.map((city: ICity) => (
                <SelectItem key={city.name} value={city.name}>
                  {city.name}
                </SelectItem>
              ))
            ) : (
              <SelectItem key={t('common.noData')} value={t('common.noData')}>
                {t('common.noData')}
              </SelectItem>
            )}
          </Select>
          <Controller
            control={control}
            name='startDate'
            render={({ field }) => (
              <CustomDatePicker
                name={field.name}
                placeholderText={t('form.inputDatePlaceholder')}
                minDate={today}
                maxDate={endDate ? moment(endDate).add(-1, 'day').toDate() : nextYear}
                value={field.value ? moment(field.value).format('DD.MM.YYYY') : ''}
                selected={field.value ? moment(field.value).toDate() : null}
                onChange={(date: Date) => field.onChange(date ? moment(date).toDate() : null)}
                onBlur={field.onBlur}
                autoComplete='off'
                customInput={
                  <Input
                    labelPlacement='inside'
                    label={t('form.start')}
                    color={errors.startDate?.message ? 'danger' : 'default'}
                    variant='bordered'
                    errorMessage={errors.startDate?.message}
                    isInvalid={!!errors.startDate?.message}
                    className={!errors.startDate?.message ? 'mb-6' : ''}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                  />
                }
              />
            )}
          />
          <Controller
            control={control}
            name='endDate'
            render={({ field }) => (
              <CustomDatePicker
                name={field.name}
                placeholderText={t('form.inputDatePlaceholder')}
                minDate={startDate ? moment(startDate).add(1, 'day').toDate() : tomorrow}
                maxDate={nextYearForTomorrow}
                value={field.value ? moment(field.value).format('DD.MM.YYYY') : ''}
                selected={field.value ? moment(field.value).toDate() : null}
                onChange={(date: Date) => field.onChange(date ? moment(date).toDate() : null)}
                onBlur={field.onBlur}
                autoComplete='off'
                customInput={
                  <Input
                    labelPlacement='inside'
                    label={t('form.end')}
                    color={errors.endDate?.message ? 'danger' : 'default'}
                    variant='bordered'
                    errorMessage={errors.endDate?.message}
                    isInvalid={!!errors.endDate?.message}
                    className={!errors.endDate?.message ? 'mb-6' : ''}
                    classNames={{
                      errorMessage: 'text-left',
                    }}
                    autoComplete='off'
                  />
                }
              />
            )}
          />
        </div>
        <div className='w-full flex items-center justify-end mt-4'>
          <div className='w-40'>
            <Button color='primary' fullWidth type='submit'>
              {t('common.search')}
            </Button>
          </div>
        </div>
      </Card>
    </form>
  );
};

export default RentForm;

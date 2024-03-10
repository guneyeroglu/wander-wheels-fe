import { FC } from 'react';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import './CustomDatePicker.scss';

const CustomDatePicker: FC<ReactDatePickerProps> = props => {
  return <DatePicker {...props} />;
};

export default CustomDatePicker;

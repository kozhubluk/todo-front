import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers';
import colors from '../../styles/colors.scss';
import dayjs from 'dayjs';

const Calendar = ({ value, setValue }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateCalendar', 'DateCalendar']}>
        <DateCalendar
          minDate={dayjs()}
          sx={{
            '.MuiDayCalendar-weekDayLabel': { color: colors.lightGrey },
            path: { color: colors.blue },
          }}
          slotProps={{
            day: {
              sx: {
                color: colors.white,
                '&.Mui-selected': {
                  backgroundColor: colors.blue,
                  '&:hover': { filter: 'brightness(1.3)' },
                },
              },
            },
          }}
          value={value}
          onChange={(newValue) => setValue(newValue)}
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Calendar;

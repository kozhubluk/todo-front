import dayjs from 'dayjs';

export const groupByDeadline = (items) => {
  const groupedItems = {};

  const today = dayjs().startOf('day');
  const tomorrow = today.add(1, 'day');
  const yesterday = today.add(-1, 'day');

  items.forEach((item) => {
    const deadline = item?.deadline;
    const date = dayjs(deadline);

    if (!groupedItems[deadline]) {
      groupedItems[deadline] = {
        items: [],
      };
      if (date.isSame(yesterday, 'day')) {
        groupedItems[deadline].date = 'Вчера';
      } else if (date.isSame(today, 'day')) {
        groupedItems[deadline].date = 'Сегодня';
      } else if (date.isSame(tomorrow, 'day')) {
        groupedItems[deadline].date = 'Завтра';
      } else {
        groupedItems[deadline].date = date.format(
          `DD.MM${today.year() !== date.year() ? '.YYYY' : ''}`,
        );
      }

      groupedItems[deadline].items.push(item);
    }
  });
  return groupedItems;
};

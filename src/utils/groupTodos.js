import dayjs from 'dayjs';

export const groupByDeadline = (items, showOverdue = false) => {
  const groupedItems = { overdue: { date: 'Просрочено', items: [] } };

  const today = dayjs().startOf('day');
  const tomorrow = today.add(1, 'day');
  const yesterday = today.add(-1, 'day');

  items.forEach((item) => {
    const deadline = item?.deadline;
    const date = dayjs(deadline);

    if (showOverdue && date.isBefore(today) && !item.completed) {
      groupedItems.overdue.items.push(item); // добавляем просроченные задачи
    } else {
      if (!groupedItems[deadline]) {
        // если такой даты еще нет в объекте, заводим для нее массив
        groupedItems[deadline] = {
          items: [],
        };
      }
      if (date.isSame(yesterday, 'day') && !showOverdue) {
        groupedItems[deadline].date = 'Вчера';
      } else if (date.isSame(today, 'day')) {
        groupedItems[deadline].date = 'Сегодня';
      } else if (date.isSame(tomorrow, 'day')) {
        groupedItems[deadline].date = 'Завтра';
      } else if ((date.isBefore(today) && !showOverdue) || date.isAfter(tomorrow)) {
        groupedItems[deadline].date = date.format(
          `DD.MM${today.year() !== date.year() ? '.YYYY' : ''}`,
        );
      }

      if (groupedItems[deadline].date) groupedItems[deadline].items.push(item);
    }
  });
  return groupedItems;
};

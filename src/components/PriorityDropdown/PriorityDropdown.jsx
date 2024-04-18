import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';

const priorities = [
  { className: 'default', title: 'Обычный' },
  { className: 'low', title: 'Низкий' },
  { className: 'medium', title: 'Средний' },
  { className: 'high', title: 'Высокий' },
];

const PriorityDropdown = (props) => {
  return (
    <Dropdown {...props}>
      {priorities.map((item) => (
        <DropdownItem key={item.color} iconLeft={<FlagIcon className={item.className} />}>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default PriorityDropdown;

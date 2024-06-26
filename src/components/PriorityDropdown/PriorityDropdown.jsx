import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { priorities } from '../../assets/priorities';

const PriorityDropdown = (props) => {
  return (
    <Dropdown {...props}>
      {priorities.map((item, i) => (
        <DropdownItem
          actionHandler={() => {
            props.setPriority(i);
          }}
          key={item.className}
          iconLeft={<FlagIcon className={item.className} />}>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default PriorityDropdown;

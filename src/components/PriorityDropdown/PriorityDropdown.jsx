import { Dropdown, DropdownItem } from '../Dropdown/Dropdown';
import { ReactComponent as FlagIcon } from '../../assets/svg/flag.svg';
import { priorities } from '../../assets/priorities';

const PriorityDropdown = (props) => {
  return (
    <Dropdown {...props}>
      {priorities.map((item, i) => (
        <DropdownItem
          key={item.color}
          iconLeft={
            <FlagIcon
              className={item.className}
              onClick={() => {
                props.setPriority(i);
                console.log(props.priority);
              }}
            />
          }>
          {item.title}
        </DropdownItem>
      ))}
    </Dropdown>
  );
};

export default PriorityDropdown;

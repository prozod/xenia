import Select, { GroupBase, Props } from "react-select";
import Creatable from "react-select/creatable";

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <Select {...props} />;
}

function CreateSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <Creatable {...props} />;
}

export { CreateSelect, CustomSelect };
// options={options}
// styles={selectMenuStyles}
// onValueChange={onValueChange}
// isMulti
// name={name}
// placeholder={placeholder}

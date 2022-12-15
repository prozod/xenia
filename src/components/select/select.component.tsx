import Select, { GroupBase, Props } from "react-select";
import { selectMenuStyles } from "./select.styles";

function CustomSelect<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>
>(props: Props<Option, IsMulti, Group>) {
  return <Select {...props} />;
}
export default CustomSelect;
// options={options}
// styles={selectMenuStyles}
// onValueChange={onValueChange}
// isMulti
// name={name}
// placeholder={placeholder}

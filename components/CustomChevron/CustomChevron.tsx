import { components, DropdownIndicatorProps } from "react-select";
import { SelectOption } from "../CarSearchForm/CarSearchForm";
import css from "./CustomChevron.module.css";
import Svg from "../Svg/Svg";

const CustomChevron = (props: DropdownIndicatorProps<SelectOption, false>) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <Svg
        id={"arrow-default"}
        className={`${css.chevron} ${menuIsOpen ? css["chevron-open"] : ""}`}
      />
    </components.DropdownIndicator>
  );
};

export default CustomChevron;

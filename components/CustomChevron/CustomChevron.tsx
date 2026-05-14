import { components, DropdownIndicatorProps } from "react-select";
import { SelectOption } from "../CarSearchForm/CarSearchForm";
import css from "./CustomChevron.module.css";

const CustomChevron = (props: DropdownIndicatorProps<SelectOption, false>) => {
  const { menuIsOpen } = props.selectProps;

  return (
    <components.DropdownIndicator {...props}>
      <svg
        width={16}
        height={16}
        className={`${css.chevron} ${menuIsOpen ? css["chevron-open"] : ""}`}
      >
        <use href="/sprite.svg#icon-arrow-default" />
      </svg>
    </components.DropdownIndicator>
  );
};

export default CustomChevron;

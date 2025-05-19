import { SimpleDate } from "@/models/simpleDate/simpleDate";
import simpleDateToDateString from "@/models/simpleDate/simpleDateToDateString";
import { FC } from "react";

interface DatePickerProps {
  required?: boolean;
  name?: string;
  defaultValue?: SimpleDate;
}

const DatePicker: FC<DatePickerProps> = (props) => {
  const { required, name, defaultValue } = props;

  let defaultDateDateString: string | undefined;

  if (defaultValue !== undefined) {
    defaultDateDateString = simpleDateToDateString(defaultValue);
  }

  return (
    <input
      type="date"
      className="text-base font-medium bg-primary-bg hover:bg-primary-bg-hover active:bg-primary-bg-active motion-safe:active:scale-95 motion-safe:transition focus-visible:outline-2 outline-outline outline-offset-2 text-primary-text py-3 px-6 rounded-2xl [&::-webkit-calendar-picker-indicator]:[color-scheme:dark]"
      required={required}
      name={name}
      defaultValue={defaultDateDateString}
    />
  );
};

export default DatePicker;

import H1 from "@/components/h1";
import { FieldComponent } from "./fieldComponent";
import DatePicker from "@/components/datePicker";
import ButtonSubmit from "@/components/buttonSumbit";
import updateEntryDateAndRevalidate from "@/actions/updateEntryDateAndRevalidate";
import estimateUserDate from "@/utils/estimateUserDate";

const Date: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryDate = updateEntryDateAndRevalidate.bind(null, entryId);
  const defaultValue = (await estimateUserDate()) ?? undefined;

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>choose entry date</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryDate}>
          <DatePicker name="date" required defaultValue={defaultValue} />
          <ButtonSubmit>confirm entry date</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default Date;

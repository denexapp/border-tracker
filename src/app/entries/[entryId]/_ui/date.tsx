import updateEntryDateAndRevalidate from "@/app/entries/[entryId]/_api/updateEntryDateAndRevalidate";
import estimateUserDate from "@/shared/model/simpleDate/estimateUserDate";
import ButtonSubmit from "@/shared/ui/button/buttonSumbit";
import DatePicker from "@/shared/ui/datePicker";
import H1 from "@/shared/ui/text/h1";
import { formDataDateFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Date: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryDate = updateEntryDateAndRevalidate.bind(null, entry.id);
  const defaultValue = entry.fillableFields.date.value ?? (await estimateUserDate()) ?? undefined;

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>specify entry date</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryDate}>
          <DatePicker name={formDataDateFieldName} required defaultValue={defaultValue} />
          <ButtonSubmit>confirm entry date</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default Date;

import updateEntryDateAndRevalidate from "@/app/entries/[entryId]/_api/updateEntryDateAndRevalidate";
import ButtonSubmit from "@/shared/ui/buttonSumbit";
import DatePicker from "@/shared/ui/datePicker";
import H1 from "@/shared/ui/h1";
import estimateUserDate from "@/shared/model/simpleDate/estimateUserDate";
import { formDataDateFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Date: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryDate = updateEntryDateAndRevalidate.bind(null, entryId);
  const defaultValue = (await estimateUserDate()) ?? undefined;

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>choose entry date</H1>
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

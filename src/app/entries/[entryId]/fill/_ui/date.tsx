import estimateUserDate from "@/shared/model/simpleDate/estimateUserDate";
import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import DatePicker from "@/shared/ui/components/datePicker";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryDateAndRevalidate from "../_api/updateEntryDateAndRevalidate";
import { formDataDateFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Date: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryDate = updateEntryDateAndRevalidate.bind(null, entry.id);
  const defaultValue = entry.fillableFields.date.value ?? (await estimateUserDate()) ?? undefined;

  return (
    <div className="flex flex-col gap-6 items-center">
      <ViewTransition name={"h1-transition"}>
        <H1>specify entry date</H1>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryDate}>
          <DatePicker name={formDataDateFieldName} required defaultValue={defaultValue} />
          <ViewTransition name={"action-button-1-transition"}>
            <ButtonSubmit>confirm entry date</ButtonSubmit>
          </ViewTransition>
        </form>
      </div>
    </div>
  );
};

export default Date;

import { getLastEntry } from "@/entities/entry/api/getLastEntry";
import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import NumberInput from "@/shared/ui/components/numberInput";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryNumberAndRevalidate from "../_api/updateEntryNumberAndRevalidate";
import { formDataNumberFieldName, startingEntryNumber } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Number: FieldComponent = async (props) => {
  const { entry } = props;
  const setEntryNumber = updateEntryNumberAndRevalidate.bind(null, entry.id);
  let defaultValue: number;

  if (entry.fillableFields.number.value !== null) {
    defaultValue = entry.fillableFields.number.value;
  } else {
    const lastEntry = await getLastEntry();
    const lastEntryNumber = lastEntry?.fillableFields.number.value ?? null;
    defaultValue = lastEntryNumber !== null ? lastEntryNumber + 1 : startingEntryNumber;
  }

  return (
    <div className="flex flex-col gap-6 items-center">
      <ViewTransition name={"h1-transition"}>
        <H1>specify entry number</H1>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryNumber}>
          <NumberInput min={startingEntryNumber} name={formDataNumberFieldName} required defaultValue={defaultValue} />
          <ViewTransition name={"action-button-1-transition"}>
            <ButtonSubmit>confirm entry number</ButtonSubmit>
          </ViewTransition>
        </form>
      </div>
    </div>
  );
};

export default Number;

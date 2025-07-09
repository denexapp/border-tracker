import { getLastEntry } from "@/entities/entry/api/getLastEntry";
import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import NumberInput from "@/shared/ui/components/numberInput";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryNumberAndRevalidate from "../_api/updateEntryNumberAndRevalidate";
import { formDataNumberFieldName, startingEntryNumber } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";
import FieldComponentContent from "./fieldComponentContent";
import FieldComponentWrapper from "./fieldComponentWrapper";

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
    <FieldComponentWrapper>
      <ViewTransition name={"h1-transition"}>
        <H1>specify entry number</H1>
      </ViewTransition>
      <form className="contents" action={setEntryNumber}>
        <FieldComponentContent>
          <NumberInput min={startingEntryNumber} name={formDataNumberFieldName} required defaultValue={defaultValue} />
        </FieldComponentContent>
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonSubmit>confirm entry number</ButtonSubmit>
        </ViewTransition>
      </form>
    </FieldComponentWrapper>
  );
};

export default Number;

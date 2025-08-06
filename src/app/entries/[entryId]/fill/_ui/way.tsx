import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import RadioButton from "@/shared/ui/components/radioButton";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryWayAndRevalidate from "../_api/updateEntryWayAndRevalidate";
import { formDataWayFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";
import FieldComponentContent from "./fieldComponentContent";
import FieldComponentWrapper from "./fieldComponentWrapper";
import { getEntryByNumber } from "@/entities/entry/api/getEntryByNumber";

const Way: FieldComponent = async (props) => {
  const { entry } = props;
  const entryNumber = entry.fillableFields.number.value;
  const entryWay = entry.fillableFields.way.value;
  const setEntryWay = updateEntryWayAndRevalidate.bind(null, entry.id);

  let preselectedWay: string | null;

  if (entryWay !== null) {
    preselectedWay = entryWay;
  } else if (entryNumber !== null) {
    const previousEntry = await getEntryByNumber(entryNumber - 1);
    preselectedWay = previousEntry?.fillableFields.way.value ?? null;
  }

  const ways = entry.fillableFields.way.meta.map(({ id, name }) => (
    <RadioButton name={formDataWayFieldName} value={id} key={id} defaultValue={preselectedWay === id}>
      {name}
    </RadioButton>
  ));

  return (
    <FieldComponentWrapper>
      <ViewTransition name={"h1-transition"}>
        <H1>choose way</H1>
      </ViewTransition>
      <form className="contents" action={setEntryWay}>
        <FieldComponentContent>{ways}</FieldComponentContent>
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonSubmit>confirm way</ButtonSubmit>
        </ViewTransition>
      </form>
    </FieldComponentWrapper>
  );
};

export default Way;

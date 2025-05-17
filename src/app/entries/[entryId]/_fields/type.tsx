import updateEntryType from "@/actions/updateEntryTypeAndRevalidate";
import ButtonForm from "@/components/buttonForm";
import H1 from "@/components/h1";
import { FieldComponent } from "./fieldComponent";

const Type: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryTypeArrival = updateEntryType.bind(null, entryId, "arrival");
  const setEntryTypeDeparture = updateEntryType.bind(null, entryId, "departure");

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>select entry type</H1>
      <div className="flex flex-col gap-4">
        <ButtonForm onClick={setEntryTypeArrival}>arrival</ButtonForm>
        <ButtonForm onClick={setEntryTypeDeparture}>departure</ButtonForm>
      </div>
    </div>
  );
};

export default Type;

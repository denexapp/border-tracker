import updateEntryDirection from "@/actions/updateEntryDirectionAndRevalidate";
import ButtonForm from "@/components/buttonForm";
import H1 from "@/components/h1";
import { FieldComponent } from "./fieldComponent";

const Direction: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryDirectionArrival = updateEntryDirection.bind(null, entryId, "arrival");
  const setEntryDirectionDeparture = updateEntryDirection.bind(null, entryId, "departure");

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>select entry direction</H1>
      <div className="flex flex-col gap-4">
        <ButtonForm onClick={setEntryDirectionArrival}>arrival</ButtonForm>
        <ButtonForm onClick={setEntryDirectionDeparture}>departure</ButtonForm>
      </div>
    </div>
  );
};

export default Direction;

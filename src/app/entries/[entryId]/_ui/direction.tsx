import updateEntryDirectionAndRevalidate from "@/app/entries/[entryId]/_api/updateEntryDirectionAndRevalidate";
import ButtonForm from "@/shared/ui/buttonForm";
import H1 from "@/shared/ui/h1";
import { FieldComponent } from "../_lib/fieldComponent";

const Direction: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryDirectionArrival = updateEntryDirectionAndRevalidate.bind(null, entryId, "arrival");
  const setEntryDirectionDeparture = updateEntryDirectionAndRevalidate.bind(null, entryId, "departure");

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

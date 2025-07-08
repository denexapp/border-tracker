import ButtonForm from "@/shared/ui/button/buttonForm";
import H1 from "@/shared/ui/text/h1";
import updateEntryDirectionAndRevalidate from "../_api/updateEntryDirectionAndRevalidate";
import { FieldComponent } from "../_lib/fieldComponent";

const Direction: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryDirectionArrival = updateEntryDirectionAndRevalidate.bind(null, entry.id, "arrival");
  const setEntryDirectionDeparture = updateEntryDirectionAndRevalidate.bind(null, entry.id, "departure");

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

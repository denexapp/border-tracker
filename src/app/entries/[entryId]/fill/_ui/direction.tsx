import { getLastEntry } from "@/entities/entry/api/getLastEntry";
import {
  Direction as DirectionType,
  directionArrival,
  directionDeparture,
  directions,
} from "@/entities/entry/model/direction/direction";
import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import RadioButton from "@/shared/ui/components/radioButton";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryDirectionAndRevalidate from "../_api/updateEntryDirectionAndRevalidate";
import { defaultDirection, formDataDirectionFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Direction: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryDirection = updateEntryDirectionAndRevalidate.bind(null, entry.id);

  const entryDirection = entry.fillableFields.direction.value;
  let preselectedDirection: DirectionType;

  if (entryDirection !== null) {
    preselectedDirection = entryDirection;
  } else {
    const lastEntry = await getLastEntry();
    const lastEntryDirection = lastEntry?.fillableFields.direction.value ?? null;

    if (lastEntryDirection === "arrival") {
      preselectedDirection = directionDeparture;
    } else if (lastEntryDirection === "departure") {
      preselectedDirection = directionArrival;
    } else {
      preselectedDirection = defaultDirection;
    }
  }

  const radioButtons = directions.map((direction) => (
    <RadioButton
      key={direction}
      name={formDataDirectionFieldName}
      value={directionArrival}
      defaultValue={preselectedDirection === direction}
    >
      {direction === directionArrival ? "arrival" : "departure"}
    </RadioButton>
  ));

  return (
    <div className="flex flex-col gap-6 items-center">
      <ViewTransition name={"h1-transition"}>
        <H1>choose entry direction</H1>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryDirection}>
          {radioButtons}
          <ViewTransition name={"action-button-1-transition"}>
            <ButtonSubmit>confirm direction</ButtonSubmit>
          </ViewTransition>
        </form>
      </div>
    </div>
  );
};

export default Direction;

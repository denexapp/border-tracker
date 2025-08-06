import { getEntryByNumber } from "@/entities/entry/api/getEntryByNumber";
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
import FieldComponentContent from "./fieldComponentContent";
import FieldComponentWrapper from "./fieldComponentWrapper";

const Direction: FieldComponent = async (props) => {
  const { entry } = props;
  const setEntryDirection = updateEntryDirectionAndRevalidate.bind(null, entry.id);
  const entryNumber = entry.fillableFields.number.value;
  const entryDirection = entry.fillableFields.direction.value;
  let preselectedDirection: DirectionType;

  if (entryDirection !== null) {
    preselectedDirection = entryDirection;
  } else if (entryNumber !== null) {
    const previousEntry = await getEntryByNumber(entryNumber - 1);
    const previousEntryDirection = previousEntry?.fillableFields.direction.value ?? null;

    if (previousEntryDirection === "arrival") {
      preselectedDirection = directionDeparture;
    } else if (previousEntryDirection === "departure") {
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
    <FieldComponentWrapper>
      <ViewTransition name={"h1-transition"}>
        <H1>choose entry direction</H1>
      </ViewTransition>
      <form className="contents" action={setEntryDirection}>
        <FieldComponentContent>{radioButtons}</FieldComponentContent>
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonSubmit>confirm direction</ButtonSubmit>
        </ViewTransition>
      </form>
    </FieldComponentWrapper>
  );
};

export default Direction;

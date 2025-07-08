import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import RadioButton from "@/shared/ui/components/radioButton";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryWayAndRevalidate from "../_api/updateEntryWayAndRevalidate";
import { formDataWayFieldName } from "../_lib/consts";
import { FieldComponent } from "../_lib/fieldComponent";

const Way: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryWay = updateEntryWayAndRevalidate.bind(null, entry.id);
  const selectedWay = entry.fillableFields.way.value;

  const ways = entry.fillableFields.way.meta.map(({ id, name }) => (
    <RadioButton name={formDataWayFieldName} value={id} key={id} defaultValue={selectedWay === id}>
      {name}
    </RadioButton>
  ));

  return (
    <div className="flex flex-col gap-6 items-center">
      <ViewTransition name={"h1-transition"}>
        <H1>choose way</H1>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryWay}>
          {ways}
          <ViewTransition name={"action-button-1-transition"}>
            <ButtonSubmit>confirm way</ButtonSubmit>
          </ViewTransition>
        </form>
      </div>
    </div>
  );
};

export default Way;

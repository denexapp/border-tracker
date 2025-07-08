import ButtonSubmit from "@/shared/ui/button/buttonSumbit";
import H1 from "@/shared/ui/text/h1";
import RadioButton from "@/shared/ui/radioButton";
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
      <H1>select way</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryWay}>
          {ways}
          <ButtonSubmit>confirm way</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default Way;

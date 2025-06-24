import ButtonSubmit from "@/shared/ui/buttonSumbit";
import Checkbox from "@/shared/ui/checkbox";
import H1 from "@/shared/ui/h1";
import updateEntryAdditionalStatusesAndRevalidate from "../_api/updateEntryAdditionalStatusesAndRevalidate";
import { FieldComponent } from "../_lib/fieldComponent";

const AdditionalStatuses: FieldComponent = async (props) => {
  const { entryId, entry } = props;

  const setEntryAdditionalStatuses = updateEntryAdditionalStatusesAndRevalidate.bind(null, entryId);
  const selectedStatuses = new Set(entry.additionalStatuses.value);

  const statuses = entry.additionalStatuses.meta.map(({ id, name }) => (
    <Checkbox name={id} key={id} defaultValue={selectedStatuses.has(id)}>
      {name}
    </Checkbox>
  ));

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>select additional statuses</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryAdditionalStatuses}>
          {statuses}
          <ButtonSubmit>confirm additional statuses</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default AdditionalStatuses;

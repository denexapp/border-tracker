import ButtonSubmit from "@/shared/ui/button/buttonSumbit";
import Checkbox from "@/shared/ui/checkbox";
import H1 from "@/shared/ui/text/h1";
import updateEntryAdditionalStatusesAndRevalidate from "../_api/updateEntryAdditionalStatusesAndRedirectToEntry";
import { FieldComponent } from "../_lib/fieldComponent";

const AdditionalStatuses: FieldComponent = async (props) => {
  const { entry } = props;

  const setEntryAdditionalStatuses = updateEntryAdditionalStatusesAndRevalidate.bind(null, entry.id);
  const selectedStatuses = new Set(entry.fillableFields.additionalStatuses.value);

  const statuses = entry.fillableFields.additionalStatuses.meta.map(({ id, name }) => (
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

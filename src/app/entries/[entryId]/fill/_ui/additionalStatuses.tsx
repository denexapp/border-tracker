import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import Checkbox from "@/shared/ui/components/checkbox";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryAdditionalStatusesAndRevalidate from "../_api/updateEntryAdditionalStatusesAndRedirectToEntry";
import { FieldComponent } from "../_lib/fieldComponent";
import FieldComponentContent from "./fieldComponentContent";
import FieldComponentWrapper from "./fieldComponentWrapper";

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
    <FieldComponentWrapper>
      <ViewTransition name={"h1-transition"}>
        <H1>select additional statuses</H1>
      </ViewTransition>
      <form className="contents" action={setEntryAdditionalStatuses}>
        <FieldComponentContent>{statuses}</FieldComponentContent>
        <ViewTransition name={"action-button-1-transition"}>
          <ButtonSubmit>confirm additional statuses</ButtonSubmit>
        </ViewTransition>
      </form>
    </FieldComponentWrapper>
  );
};

export default AdditionalStatuses;

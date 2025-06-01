import { formDataFieldName } from "@/actions/updateEntryRegionAndRevalidate/consts";
import updateEntryRegionAndRevalidate from "@/actions/updateEntryRegionAndRevalidate/updateEntryRegionAndRevalidate";
import ButtonSubmit from "@/components/buttonSumbit";
import H1 from "@/components/h1";
import Select, { SelectEntry } from "@/components/select";
import { locale } from "@/consts";
import { SimpleRegion } from "@/models/simpleRegion/simpleRegion";
import estimateUserRegion from "@/utils/estimateUserRegion";
import getAllRegions from "@/utils/getAllRegions";
import { FieldComponent } from "./fieldComponent";

const Region: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryRegion = updateEntryRegionAndRevalidate.bind(null, entryId);
  const estimatedUserRegion = await estimateUserRegion();
  const defaultValue = estimatedUserRegion?.code ?? undefined;
  const entries = getAllRegions()
    .sort((a, b) => a.name.localeCompare(b.name, locale))
    .map<SelectEntry>(
      ({ code, name, emoji }: SimpleRegion): SelectEntry => ({
        value: code,
        label: `${emoji} ${name}`,
      })
    );

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>choose region</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryRegion}>
          <Select name={formDataFieldName} required defaultValue={defaultValue} entries={entries} />
          <ButtonSubmit>confirm region</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default Region;

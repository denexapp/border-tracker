import updateEntryRegionAndRevalidate from "@/app/entries/[entryId]/_api/updateEntryRegionAndRevalidate";
import { formDataRegionFieldName } from "@/app/entries/[entryId]/_lib/consts";
import { locale } from "@/shared/config/consts";
import estimateUserRegion from "@/shared/model/region/estimateUserRegion";
import getAllRegions from "@/shared/model/region/getAllRegions";
import { Region as RegionModel } from "@/shared/model/region/region";
import ButtonSubmit from "@/shared/ui/buttonSumbit";
import H1 from "@/shared/ui/h1";
import Select, { SelectEntry } from "@/shared/ui/select";
import { FieldComponent } from "../_lib/fieldComponent";

const Region: FieldComponent = async (props) => {
  const { entryId, entry } = props;
  const setEntryRegion = updateEntryRegionAndRevalidate.bind(null, entryId);
  const defaultValue = entry.region.value?.code ?? (await estimateUserRegion())?.code;
  const entries = getAllRegions()
    .sort((a, b) => a.name.localeCompare(b.name, locale))
    .map<SelectEntry>(
      ({ code, name, emoji }: RegionModel): SelectEntry => ({
        value: code,
        label: `${emoji} ${name}`,
      })
    );

  return (
    <div className="flex flex-col gap-6 items-center">
      <H1>choose region</H1>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryRegion}>
          <Select name={formDataRegionFieldName} required defaultValue={defaultValue} entries={entries} />
          <ButtonSubmit>confirm region</ButtonSubmit>
        </form>
      </div>
    </div>
  );
};

export default Region;

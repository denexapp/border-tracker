import { formDataRegionFieldName } from "@/app/entries/[entryId]/_lib/consts";
import updateEntryRegionAndRevalidate from "@/app/entries/[entryId]/_api/updateEntryRegionAndRevalidate";
import ButtonSubmit from "@/shared/ui/buttonSumbit";
import H1 from "@/shared/ui/h1";
import Select, { SelectEntry } from "@/shared/ui/select";
import { Region as RegionModel } from "@/shared/model/region/region";
import estimateUserRegion from "@/shared/model/region/estimateUserRegion";
import getAllRegions from "@/shared/model/region/getAllRegions";
import { FieldComponent } from "../_lib/fieldComponent";
import { locale } from "@/shared/config/consts";

const Region: FieldComponent = async (props) => {
  const { entryId } = props;

  const setEntryRegion = updateEntryRegionAndRevalidate.bind(null, entryId);
  const estimatedUserRegion = await estimateUserRegion();
  const defaultValue = estimatedUserRegion?.code ?? undefined;
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

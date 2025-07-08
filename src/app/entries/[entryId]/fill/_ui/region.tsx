import { formDataRegionFieldName } from "@/app/entries/[entryId]/fill/_lib/consts";
import { locale } from "@/shared/config/consts";
import estimateUserRegion from "@/shared/model/region/estimateUserRegion";
import getAllRegions from "@/shared/model/region/getAllRegions";
import { Region as RegionModel } from "@/shared/model/region/region";
import ButtonSubmit from "@/shared/ui/components/button/buttonSumbit";
import Select, { SelectEntry } from "@/shared/ui/components/select";
import H1 from "@/shared/ui/components/text/h1";
import ViewTransition from "@/shared/ui/components/viewTransition";
import updateEntryRegionAndRevalidate from "../_api/updateEntryRegionAndRevalidate";
import { FieldComponent } from "../_lib/fieldComponent";

const Region: FieldComponent = async (props) => {
  const { entry } = props;
  const setEntryRegion = updateEntryRegionAndRevalidate.bind(null, entry.id);
  const defaultValue = entry.fillableFields.region.value?.code ?? (await estimateUserRegion())?.code;
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
      <ViewTransition name={"h1-transition"}>
        <H1>choose region</H1>
      </ViewTransition>
      <div className="flex flex-col gap-4">
        <form className="contents" action={setEntryRegion}>
          <Select name={formDataRegionFieldName} required defaultValue={defaultValue} entries={entries} />
          <ViewTransition name={"action-button-1-transition"}>
            <ButtonSubmit>confirm region</ButtonSubmit>
          </ViewTransition>
        </form>
      </div>
    </div>
  );
};

export default Region;

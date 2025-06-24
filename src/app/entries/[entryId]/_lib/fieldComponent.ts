import { Entry } from "@/entities/entry/model/entry/entry";
import { FC } from "react";

interface FieldComponentProps {
  entryId: string;
  entry: Entry;
}

export type FieldComponent = FC<FieldComponentProps>;

import { parseAsString, useQueryState } from "nuqs";
import { diff } from "radash";

type ArgumentType = {
  fieldId: string;
  fieldValue: string;
  preFieldValue: string;
};

export const useQueryParamsV2 = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [parentFieldId, setParentFieldId] = useQueryState(
    "parent_field_id",
    parseAsString.withDefault("")
  );

  const [subFieldId, setSubFieldId] = useQueryState(
    "sub_field_id",
    parseAsString.withDefault("")
  );

  const [parentFieldValues, setParentFieldValues] = useQueryState(
    "parent_field_values",
    parseAsString.withDefault("")
  );

  const [subFieldValues, setSubFieldValues] = useQueryState(
    "sub_field_values",
    parseAsString.withDefault("")
  );

  //-- Mutate search
  const updateSearch = (search: string) => {
    setSearch(search);
  };

  //-- Mutate sub(field_id , field_value)
  const updateParentFieldValues = (args: ArgumentType) => {
    const { fieldId, fieldValue, preFieldValue } = args;

    if (!parentFieldValues) {
      setParentFieldId(fieldId);
      setParentFieldValues(fieldValue);
      return;
    }
    const breakFieldValues = (parentFieldValues || "")?.split(",");
    const takeOutPreValues = diff(breakFieldValues, [preFieldValue]);
    const parentValues = [...new Set([...takeOutPreValues, fieldValue])];

    setParentFieldId(fieldId);
    setParentFieldValues(parentValues.join(",").toString());
  };

  //-- Remove parent filed values;
  const removeParentFieldValues = (fieldValue: string) => {
    const breakFieldValues = (parentFieldValues || "")?.split(",");

    //-- Do nothing when no fieldValues
    if (!breakFieldValues?.length) return;

    const removedFieldValues = diff(breakFieldValues, [fieldValue]);

    //!!Explicitly remove field_id from query string onto the url
    if (!removedFieldValues?.length) {
      setParentFieldId("");
      setParentFieldValues("");
      return;
    }
    setParentFieldValues(removedFieldValues.join(",").toString());
  };

  //-- Mutate sub(field_id , fieldValue)
  const updateSubFieldValues = (args: ArgumentType) => {
    const { fieldId, fieldValue, preFieldValue } = args;

    if (!subFieldValues) {
      setSubFieldId(fieldId);
      setSubFieldValues(fieldValue);
      return;
    }
    const breakFieldValues = (subFieldValues || "")?.split(",");
    const takeOutPreValues = diff(breakFieldValues, [preFieldValue]);
    const subValues = [...new Set([...takeOutPreValues, fieldValue])];

    setSubFieldId(fieldId);
    setSubFieldValues(subValues.join(",").toString());
  };

  //-- Remove sub field value
  const removeSubFieldValue = (fieldValue: string) => {
    const breakFieldValues = (subFieldValues || "")?.split(",");

    //-- Do nothing when no fieldValues
    if (!breakFieldValues?.length) return;

    const removedFieldValues = diff(breakFieldValues, [fieldValue]);

    //!!Explicitly remove field_id from query string onto the url
    if (!removedFieldValues?.length) {
      setSubFieldId("");
      setSubFieldValues("");
      return;
    }
    setSubFieldValues(removedFieldValues.join(",").toString());
  };

  //-- Remove all filter
  const removeAll = () => {
    setParentFieldId("");
    setSubFieldId("");
    setParentFieldValues("");
    setSubFieldValues("");
  };

  return {
    search,
    parentFieldId,
    subFieldId,
    parentFieldValues,
    subFieldValues,
    updateSearch,
    updateParentFieldValues,
    updateSubFieldValues,
    removeParentFieldValues,
    removeSubFieldValue,
    removeAll,
  };
};

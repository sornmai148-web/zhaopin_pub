import { useQueryState, parseAsString } from "nuqs";

/**
 * @description : Currently not used
 */
export const useQueryParams = () => {
  const [search, setSearch] = useQueryState(
    "search",
    parseAsString.withDefault("")
  );

  const [field_id, setField_id] = useQueryState(
    "field_id",
    parseAsString.withDefault("")
  );

  const [location, setLocation] = useQueryState(
    "location",
    parseAsString.withDefault("")
  );

  const [position, setPosition] = useQueryState(
    "position",
    parseAsString.withDefault("")
  );

  const [jobType, setJobType] = useQueryState(
    "job_type",
    parseAsString.withDefault("")
  );

  const [experience, setExperience] = useQueryState(
    "job_experience",
    parseAsString.withDefault("")
  );

  const [positionLevel, setPositionLevel] = useQueryState(
    "job_position_level",
    parseAsString.withDefault("")
  );

  const [qualification, setQualification] = useQueryState(
    "qualification",
    parseAsString.withDefault("")
  );

  //-- Update search params
  function updateSearch(search: string) {
    setSearch(search);
  }

  //-- Update field Id
  function updateFieldId(fieldId: string) {
    setField_id(fieldId);
  }

  //-- Update location
  function updateLocation(location: string) {
    setLocation(location);
  }

  //-- Update position
  function updatePosition(position: string) {
    setPosition(position);
  }

  //-- Update job type
  function updateJobType(jobType: string) {
    setJobType(jobType);
  }

  //-- Update job experience
  function updateJobExperience(jobExp: string) {
    setExperience(jobExp);
  }

  //-- Update job level
  function updateJobLevel(jobLevel: string) {
    setPositionLevel(jobLevel);
  }

  //-- Update qualification
  function updateQualification(qualification: string) {
    setQualification(qualification);
  }

  const hasNoQueryParams = [
    Boolean(location),
    Boolean(position),
    Boolean(jobType),
    Boolean(experience),
    Boolean(positionLevel),
    Boolean(qualification),
  ];

  return {
    isEmptyParams: hasNoQueryParams?.filter((x) => x == true)?.length <= 1,
    search,
    field_id,
    location,
    position,
    jobType,
    experience,
    positionLevel,
    qualification,
    updateSearch,
    updateFieldId,
    updatePosition,
    updateLocation,
    updateJobExperience,
    updateJobType,
    updateJobLevel,
    updateQualification,
  };
};

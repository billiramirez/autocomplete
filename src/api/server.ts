import { Country } from "../types/Countries";
import { searchCountriesByName } from "./services";

export const findCountriesByName = async (name: string): Promise<Country[]> => {
  return searchCountriesByName(name);
};

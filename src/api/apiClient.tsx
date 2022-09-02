import { Country } from "../types/Countries";
import { findCountriesByName } from "./server";

/**
 * Since we are abstracting the layers of this app, we could replace any server-method
 * with the hit of an endpoint and will work the same
 */
export const searchCountryByName = async (name: string): Promise<Country[]> => {
  return findCountriesByName(name);
};

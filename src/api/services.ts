import { Country } from "../types/Countries";
import countries from "./mock-data.json";

export const searchCountriesByName = async (
  name: string
): Promise<Country[]> => {
  return new Promise((resolve, reject) => {
    resolve(countries);
  });
};

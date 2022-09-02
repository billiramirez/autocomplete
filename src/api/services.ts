import { Country } from "../types/Countries";
import countries from "./mock-data.json";

export const searchCountriesByName = async (
  name: string
): Promise<Country[]> => {
  return new Promise((resolve, _reject) => {
    const entries = countries.filter((country) =>
      country.label
        .trim()
        .toLocaleLowerCase()
        .includes(name.trim().toLocaleLowerCase())
    );

    resolve(entries);
  });
};

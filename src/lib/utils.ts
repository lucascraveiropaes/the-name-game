import ENV from "@/env";

export const getRandomProfiles = async () => {
  const profiles = await fetch(ENV.API_URL + "/profiles").then(res => res.json());
  const selected = profiles.sort(() => 0.5 - Math.random()).slice(0, 6);
  const target = selected[Math.floor(Math.random() * selected.length)];
  return { selected, target };
}



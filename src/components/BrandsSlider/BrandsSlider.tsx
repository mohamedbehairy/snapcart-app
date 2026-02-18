import { BrandsResponse } from "@/interfaces/BrandsInterfaces";
import BrandsMarquee from "../BrandsMarquee/BrandsMarquee";

export default async function BrandsSlider() {
  const response = await fetch(`${process.env.API_URL}/api/v1/brands`, {
    cache: "force-cache",
  });

  const data: BrandsResponse = await response.json();

  return <BrandsMarquee brands={data} />;
}

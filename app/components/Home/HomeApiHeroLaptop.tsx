import ApiHeroLaptop from "~/assets/images/apihero-laptop.png";

export type IconProps = {
  className?: string;
};

export function HomeApiHeroLaptop({ className }: IconProps) {
  return <img src={ApiHeroLaptop} className={className} />;
}

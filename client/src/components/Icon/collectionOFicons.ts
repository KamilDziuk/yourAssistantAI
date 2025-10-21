import * as IconsFA from "react-icons/fa";
import * as IconsRI from "react-icons/ri";
import * as IconsMD from "react-icons/md";
import * as IconsIO5 from "react-icons/io5";
import * as IconsFI from "react-icons/fi";
import * as IconsGO from "react-icons/go";
import * as IconsCI from "react-icons/ci";
import * as IconsLU from "react-icons/lu";
export default function collectionOFicons(iconName: string) {
  const iconLibraries: any = {
    fa: IconsFA,
    ri: IconsRI,
    md: IconsMD,
    io5: IconsIO5,
    fi: IconsFI,
    go: IconsGO,
    ci: IconsCI,
    lu: IconsLU,
  };

  const [libKey, iconKey] = iconName.split(":");
  const library = iconLibraries[libKey];
  const IconComponent = library?.[iconKey];
  return IconComponent;
}

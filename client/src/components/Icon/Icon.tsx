import collectionOFicons from "./collectionOFicons";

export default function Icon({
  iconName,
  iconStyle,
}: {
  iconName: string;
  iconStyle: any;
}) {
  const IconComponent = collectionOFicons(iconName);
  return IconComponent ? (
    <i className={iconStyle}>
      <IconComponent />
    </i>
  ) : null;
}

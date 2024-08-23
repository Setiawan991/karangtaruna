import ListTransaction from "../components/(page1)/ListTransaction";

export default function Page() {
  return (
    <div className="w-full overflow-hidden">
      <ListTransaction initialPage={1} />
    </div>
  );
}

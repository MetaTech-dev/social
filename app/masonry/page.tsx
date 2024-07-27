import { MasonryGrid } from "@/components/MasonryGrid";

export default function Page() {
  return (
    <MasonryGrid columnCount={3} gap={2}>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
      <div className="bg-green-500 w-80 h-40">Item 2</div>
      <div className="bg-red-500 w-80 h-20">Item 1</div>
      <div className="bg-blue-500 w-80 h-10">Item 3</div>
    </MasonryGrid>
  );
}


export default function InputForm({inputText}:{inputText:string | undefined}) {
  return (
    <>
      <div className="flex items-center space-x-4">
  <div className="bg-white h-[6rem] w-[10rem] flex justify-center items-center rounded-2xl">
    <h1 className="text-green-700">{inputText ?? ""}</h1>
  </div>
  
</div>

    </>
  );
}

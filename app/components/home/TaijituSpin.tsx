import taijitu from "/public/taijitu.svg";

export function TaijituSpin() {
  return (
    <div className="flex justify-center items-center mt-4 mb-4">
      <img
        src={taijitu}
        // style={{ height: "96px" }}
        alt="Rotating Taijitu"
        className="animate-spin origin-center h-32 md:h-48"
      />
    </div>
  );
}

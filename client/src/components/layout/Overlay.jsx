const Overlay = ({ closer }) => {
  return (
    <div
      className="fixed top-0 left-0 w-[100vw] h-[100vh] bg-black/30 z-10"
      onClick={closer}
    ></div>
  );
};

export default Overlay;

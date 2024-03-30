const BaseButton = ({ title, onClick, ...children }) => {
  return (
    <div className="mx-auto my-3">
      <button
        className="bg-primary w-fit hover:bg-secondary text-white hover:text-black font-bold lg:py-3 
        lg:px-5 md:px-4 md:py-2 py-1 px-3 rounded-md text-sm md:text-base lg:text-lg"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
export default BaseButton;

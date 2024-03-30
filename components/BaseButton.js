const BaseButton = ({ title, onClick, ...children }) => {
  return (
    <div className="mx-auto my-3">
      <button
        className="bg-primary w-fit hover:bg-secondary text-white hover:text-black font-bold py-3 px-5 rounded-md"
        onClick={onClick}
      >
        {title}
      </button>
    </div>
  );
};
export default BaseButton;

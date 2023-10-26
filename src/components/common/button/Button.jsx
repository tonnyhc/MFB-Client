function getButtonClassNamesFromShape(shape) {
  switch (shape) {
    case "rectangular":
      return "py-2.5 px-4 rounded-lg";
    case "circle":
      return "w-9 h-9 rounded-full";

    default:
      return "py-2.5 px-4 rounded-lg";
  }
}
function getButtonClassNamesFromType(type) {
  switch (type) {
    case "delete":
      return "text-red-600";

    default:
      return "text-white";
  }
}

function getButtonClassNamesFromWidth(size) {
  switch (size) {
    case "full":
      return "w-full";
    default:
      return "unset";
  }
}

function getButtonClassNamesFromColor(color) {
  return `bg-button-${color}`;
}

const Button = ({
  text,
  color,
  onClick,
  id,
  icon,
  reverseOrder,
  shape,
  type,
  width,
  disabled,
}) => {
  const shapeClassNames = getButtonClassNamesFromShape(shape);
  const typeClassNames = getButtonClassNamesFromType(type);
  const widthClassNames = getButtonClassNamesFromWidth(width);
  const colorClassNames = getButtonClassNamesFromColor(color);
  const disabledClassNames = disabled ? "opacity-60" : "";
  const hoverClassNames = disabled
    ? ""
    : "transform transition-transform duration-100 hover:scale-110";

  return (
    <button
      id={id}
      disabled={disabled ? true : false}
      onClick={onClick}
      className={`flex justify-center items-center  ${hoverClassNames}
      ${colorClassNames} ${disabledClassNames} ${shapeClassNames} ${typeClassNames} ${widthClassNames} 
      `}
    >
      {reverseOrder ? (
        <>
          {icon && <p>{icon}</p>}
          <p>{text}</p>
        </>
      ) : (
        <>
          <p>{text}</p>
          {icon && <p>{icon}</p>}
        </>
      )}
    </button>
  );
};

export default Button;

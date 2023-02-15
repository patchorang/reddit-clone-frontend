function Button({ children, primary, secondary, tertiary, small, ...rest }) {
  const primaryClasses =
    "rounded-full bg-orange-600 text-white text-md font-medium py-1 px-4 hover:bg-orange-500";

  const smallClasses =
    "rounded-full bg-orange-600 text-white text-xs font-medium py-1 px-2 hover:bg-orange-500";

  const tertiaryClasses =
    "rounded-full text-orange-600 text-xs font-bold py-1 px-2 hover:text-orange-500";

  let classes = primaryClasses;
  if (small) classes = smallClasses;
  if (tertiary) classes = tertiaryClasses;

  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}

export default Button;

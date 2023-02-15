function Panel({ children, className }) {
  const classes = `${className} rounded-md bg-white border shadow-sm`;

  return <div className={classes}>{children}</div>;
}

export default Panel;

function Badge(props) {
  return <span className="badge bg-dark text-white ms-1 rounded-pill">
    {props.value}
  </span>;
}
export default Badge;

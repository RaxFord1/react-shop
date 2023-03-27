function Body(props) {
  return (
    <>
      rendered = {props.rendered}
      <br />
      displated = {props.cardsToShow.length}
      <section className="py-5">{props.children}</section>
    </>
  );
}

export default Body;

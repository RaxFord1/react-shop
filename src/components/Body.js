function Body(props) {
  return (
    <>
      rendered = {props.rendered}
      <br />
      displated = {props.cardsToShow}
      <section className="py-5">{props.children}</section>
    </>
  );
}

export default Body;

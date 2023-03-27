import Card from "./Card";

function CardList(props) {
  return (
    <div className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 justify-content-center">
      {props.cards.map((item) => (
        <Card
          key={item.id}
          id={item.id}
          image={item.image}
          price={item.price}
          sale={item.sale}
          name={item.name}
          category={item.category}
          onRender={props.onRender}
          onSelect={props.onSelect}
        />
      ))}
      <div />
    </div>
  );
}

export default CardList;

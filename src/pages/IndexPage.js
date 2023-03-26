import Template from "../layout/Template";
import Header from "../components/Header";
import Body from "../components/Body";
import CardList from "../components/CardList";

//orig: https://startbootstrap.github.io/startbootstrap-shop-homepage/?

const CardsList = [
  {
    id: "card1",
    name: "First Product",
    price: "$80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
  },
  {
    id: "card2",
    name: "Second Product",
    price: "$40.00 ",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
  },
  {
    id: "card3",
    name: "Third Product",
    price: "$40.00 ",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
    sale: true,
  },
  {
    id: "card4",
    name: "Fourth Product",
    price: "$40.00 - $80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
  },
  {
    id: "card5",
    name: "Fifth Product",
    price: "$40.00 - $80.00",
    image: "https://dummyimage.com/450x300/dee2e6/6c757d.jpg",
  },
];

function IndexPage() {
  return (
    <Template>
      <Header
        title="Buy any file you want"
        description="With our website u can achieve anything!"
      />
      <Body>
        <div className="container px-4 px-lg-5 mt-5">
          <CardList cards={CardsList} />
        </div>
      </Body>
    </Template>
  );
}

export default IndexPage;

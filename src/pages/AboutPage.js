import { useEffect, useState } from "react";
import Template from "../layout/Template";

const CustomHeading = ({ children }) => {
  return (
    <h1 className="custom-heading" style={headingStyles}>
      {children}
    </h1>
  );
};

const CustomParagraph = ({ children }) => {
  return (
    <p className="custom-paragraph" style={paragraphStyles}>
      {children}
    </p>
  );
};

const headingStyles = {
  fontSize: "3rem",
  fontWeight: "bold",
  color: "#333",
  marginBottom: "20px",
};

const paragraphStyles = {
  fontSize: "1.5rem",
  lineHeight: "1.5",
  color: "#666",
  marginBottom: "30px",
};

const backgroundImages = [
  "blue_slime_dark_background_5e792fce-ecdd-4e25-a2d9-b1203ca3e333.png",
  "blue_slime_dark_background.png",
  "blue_slime_dark_background_8e09bc85-205d-43f6-9cf7-c869e3911c0e.png",
  "blue_slime_2a6c7085-7c79-461a-8cbe-c89760c148c0.png",
  "blue_slime_pattern_56570c53-6e85-459b-a682-85fb49811361.png",
  "blue_slime_pattern_88404631-c792-4e94-80ec-8f8e9d071748.png",
];

const logoImages = [
  "blue_slime_boy_0_25657774-776e-4c0c-9b62-0c080c40ba6f.png",
  "blue_slime_boy_1_25657774-776e-4c0c-9b62-0c080c40ba6f.png",
  "blue_slime_boy_2_25657774-776e-4c0c-9b62-0c080c40ba6f.png",
  "blue_slime_boy_3_25657774-776e-4c0c-9b62-0c080c40ba6f.png",

  "blue_slime_boy_0_ba61e277-3e59-441a-8918-60e9f627e546.png",
  "blue_slime_boy_1_ba61e277-3e59-441a-8918-60e9f627e546.png",
  "blue_slime_boy_2_ba61e277-3e59-441a-8918-60e9f627e546.png",
  "blue_slime_boy_3_ba61e277-3e59-441a-8918-60e9f627e546.png",
];

const AboutPage = () => {
  const [randomImageBackground, setRandomImageBackground] = useState("");
  const [randomImageLogo, setRandomImageLogo] = useState("");

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    const selectedImage = backgroundImages[randomIndex];
    const timestamp = Date.now();
    const imageUrl = `${selectedImage}?v=${timestamp}`;
    setRandomImageBackground(imageUrl);
  }, []);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * logoImages.length);
    const selectedImage = logoImages[randomIndex];
    setRandomImageLogo(selectedImage);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url('${randomImageBackground}')`,
        // backgroundSize: "cover",
        backgroundRepeat: "repeat",
      }}
    >
      <Template>
        <div
          className="text-center p-3 mb-2  text-dark border rounded"
          style={{
            margin: "0 auto",
            marginTop: "20px",
            marginBottom: "20px",
            maxWidth: "80%",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
          }}
        >
          <img
            src={randomImageLogo}
            alt="Rimuru Shop Logo"
            className="rounded-circle my-4"
            style={{ width: "300px", height: "300px" }}
          />
          <CustomHeading>About Rimuru Shop</CustomHeading>
          <CustomParagraph>
            My name is Dima Dzundza, the creator of Rimuru Shop. Here, you can
            register and log in, explore items by categories and price, select
            items to add to your cart or as favorite, and checkout your selected
            items. Each item comes with a detailed description for your
            convenience.
          </CustomParagraph>
          <CustomParagraph>
            Rimuru Shop also includes an admin panel where you can add, edit, or
            delete items, as well as manage categories.
          </CustomParagraph>
          <CustomParagraph>
            The frontend of this application is built with React and Axios for
            API requests. You can find the source code{" "}
            <a
              href="https://github.com/RaxFord1/react-shop"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </CustomParagraph>
          <CustomParagraph>
            The backend is powered by Python, Flask, and SQLAlchemy. The source
            code for the backend is available{" "}
            <a
              href="https://github.com/RaxFord1/react-shop-backend"
              target="_blank"
              rel="noopener noreferrer"
            >
              here
            </a>
            .
          </CustomParagraph>
          <CustomParagraph>
            The application is hosted on Vercel.com, using PostgreSQL for the
            database, which includes tables for Category, Item, User, Order,
            Order Items, and Favorites.
          </CustomParagraph>
          <img
            src="screenshot.png"
            alt="Rimuru Shop Screenshot"
            className="img-fluid rounded my-4"
          />
        </div>
      </Template>
    </div>
  );
};
export default AboutPage;

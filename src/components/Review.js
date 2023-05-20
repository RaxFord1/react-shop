import { Avatar } from "@mui/material";

const randomBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

function getLetters(text) {
  const words = text.split(" ");
  let result = "";
  for (let i = 0; i < words.length && result.length < 2; i++) {
    const word = words[i];
    if (word.length > 0) {
      result += word.charAt(0);
    }
  }
  result.toUpperCase();
  if (result.length > 0) {
    return result;
  }
  return undefined;
}

function Review(props) {
  return (
    <div className="col-md-4">
      <div className="card p-3 text-center px-4">
        <div
          className="user-image"
          style={{ justifyContent: "center", display: "flex" }}
        >
          <Avatar
            // src="https://i.imgur.com/PKHvlRS.jpg"
            alt=""
            sx={{ width: 80, height: 80, bgcolor: randomBg() }}
          >
            {getLetters(props.author)}
          </Avatar>
        </div>

        <div className="user-content">
          <h5 className="mb-0 mt-2">{props.author}</h5>
          <span>{props.position}</span>
          <p>
            <span
              style={{
                display: "flex",
                minHeight: 120,
                maxHeight: 110,
                justifyContent: "center",
                flexDirection: "column",
                lineHeight: 1
              }}
            >
              {props.message}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Review;

import { Avatar } from "@mui/material";

const randomBg = () => {
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  return "#" + randomColor;
};

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
            N
          </Avatar>
        </div>

        <div className="user-content">
          <h5 className="mb-0">{props.author}</h5>
          <span>{props.position}</span>
          <p>
            <span
              style={{
                display: "flex",
                minHeight: 120,
                maxHeight: 110,
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              {props.message}
            </span>
          </p>
        </div>

        <div className="ratings">
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
          <i className="bi bi-star-fill"></i>
        </div>
      </div>
    </div>
  );
}

export default Review;

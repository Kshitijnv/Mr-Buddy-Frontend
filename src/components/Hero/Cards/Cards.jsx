import "./cards.css";
function Cards(props) {
  return (
    <div className="grid-container">
      <div className="card">
        <div className="image-container-card">
          <img src={props.image} alt={props.altmsg}></img>
        </div>
        <div className="card-content">
          <h3>{props.title}</h3>
          <p>{props.desc}</p>
        </div>
      </div>
    </div>
  );
}

export default Cards;

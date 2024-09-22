import "./TestimonialCard.css";
function TestimonialCard() {
  return (
    <>
      <div className="container mt-5">
        <div className="card">
          <div className="card-body">
            <div className="text-center mb-3">
              <img
                src="./Images/apj.jpg"
                alt="Person"
                className="rounded-circle w-25 h-auto"
              />
            </div>
            <div className=" swiper-client-msg">
              <img src="./Images/invertedComma.png" alt="" />
              <span className="mb-0 text-sm ">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                vehicula gravida odio, a vulputate elit condimentum nec.
              </span>
              <img
                src="./Images/invertedComma.png"
                alt=""
                className="img-fluid rotate-image"
              />
              <p className="mb-0 font-weight-bold text-md">John Doe</p>
              <p className="text-muted mb-0 text-sm">January 20, 2023</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TestimonialCard;

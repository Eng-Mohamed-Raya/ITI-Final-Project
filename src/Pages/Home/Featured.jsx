function Featured() {
  return (
    <div className="container p-0 p-lg-3 my-5">
      <div className="row g-4">
        {/* col1 */}
        <div className="col-12 col-md-6 position-relative feat">
          <img
            src="/homeImg/ps5-slim-goedkope-playstation_large 1.svg" alt="PS5" className="img-fluid w-100 h-100 object-fit-cover rounded-3"style={{ minHeight: "300px" }} />
          <div className="position-absolute text-white bottom-0 start-0 p-4 w-100">
            <p className="fs-2 fw-bold mb-2">PlayStation 5</p>
            <p className="mb-2">Play Has No Limits™</p>
            <a href="#" className="text-light fw-semibold">
              Shop Now
            </a>
          </div>
        </div>
        {/* col2 */}
        <div className="col-12 col-md-6 d-flex flex-column gap-4">
          {/* col2 row1 */}
          <div className="position-relative flex-grow-1 feat">
            <img src="/homeImg/attractive-woman-wearing-hat-posing-black-background 1.svg" alt="Fashion" className="img-fluid w-100 h-100 object-fit-cover rounded-3" style={{ minHeight: "200px" }}/>
            <div className="position-absolute text-white bottom-0 start-0 p-4 w-100">
              <p className="fs-4 fw-bold mb-2">Women’s Collections</p>
              <p className="mb-2 small">
                Featured woman collections that give you another vibe.
              </p>
              <a href="#" className="text-light fw-semibold">
                Shop Now
              </a>
            </div>
          </div>
          {/* col2 row2 */}
          <div className="d-flex flex-column flex-md-row gap-4 flex-grow-1">
            {/* col2 row2 col1*/}
            <div className="position-relative w-100 w-md-50 feat">
              <img src="/homeImg/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.svg" alt="Echo 1" className="img-fluid w-100 h-100 object-fit-cover rounded-3" style={{ minHeight: "180px"}} />
              <div className="position-absolute text-white bottom-0 start-0 p-3 w-100">
                <p className="fs-5 fw-bold mb-1">Speakers</p>
                <p className="small mb-1">Amazon wireless speakers</p>
                <a href="#" className="text-light fw-semibold">
                  Shop Now
                </a>
              </div>
            </div>
            {/* col2 row2 col2*/}
            <div className="position-relative w-100 w-md-50 feat">
              <img src="/homeImg/69-694768_amazon-echo-png-clipart-transparent-amazon-echo-png 1.svg" alt="Echo 2" className="img-fluid w-100 h-100 object-fit-cover rounded-3" style={{ minHeight: "180px" }}/>
              <div className="position-absolute text-white bottom-0 start-0 p-3 w-100">
                <p className="fs-5 fw-bold mb-1">PlayStation 5</p>
                <p className="small mb-1">Play Has No Limits™</p>
                <a href="#" className="text-light fw-semibold">
                  Shop Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Featured;

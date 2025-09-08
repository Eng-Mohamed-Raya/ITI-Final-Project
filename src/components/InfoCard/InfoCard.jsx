
function InfoCard({ img, value, text, style ,className=""}) {
  return (
    <div
      className={`border-1  d-flex align-items-center flex-column justify-content-around rounded-5 my-3 gap-2 ${className}`}
      style={{ height: "220px", width: "300px", ...style }}
    >
      <img src={img} alt={text} />
      <p className="fs-4 fw-medium">{value}</p>
      <p>{text}</p>
    </div>
  );
}

export default InfoCard;


function TeamCard({ img, name, role, socials }) {
  return (
    <div className="card shadow-sm border-0 rounded-4" style={{ height: "520px" }}>
      <div className="bg-body-tertiary" style={{ height: "70%" }}>
        <img src={img} className="card-img-top h-100 " alt={name} />
      </div>
      <div className="card-body text-center p-3">
        <h4 className="fw-bold">{name}</h4>
        <p className="text-muted">{role}</p>
        <div className="d-flex justify-content-center gap-3">
          {socials.facebook && (
            <a href={socials.facebook} className="text-dark">
              <i className="fa-brands fa-facebook-f fs-5"></i>
            </a>
          )}
          {socials.linkedin && (
            <a href={socials.linkedin} className="text-dark">
              <i className="fa-brands fa-linkedin-in fs-5"></i>
            </a>
          )}
          {socials.github && (
            <a href={socials.github} className="text-dark">
              <i className="fa-brands fa-github fs-5"></i>
            </a>
          )}
          {socials.whatsapp && (
            <a href={socials.whatsapp} className="text-dark">
              <i className="fa-brands fa-whatsapp fs-5"></i>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamCard;

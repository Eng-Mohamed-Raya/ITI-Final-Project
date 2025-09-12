

function RatingStars({ rate }) {
  const stars = [];
  const fullStars = Math.ceil(rate); 
  const emptyStars = 5 - fullStars;

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <i className="fa-solid fa-star gold"></i>
    );
  }
  for (let i = 0; i < emptyStars; i++) {
    stars.push(
       <i className="fa-solid fa-star gray"></i>
    );
  }

  return <>{stars}</>;
}

export default RatingStars;

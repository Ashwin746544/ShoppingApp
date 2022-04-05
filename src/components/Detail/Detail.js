import "./Detail.css";


const Detail = ({ title, children, isOpen }) => {

  return (
    <details open={isOpen}>
      <summary className="mb-3">{title}</summary>
      {children}
    </details>
  );
}

export default Detail;
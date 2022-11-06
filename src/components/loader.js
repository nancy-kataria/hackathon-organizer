const Loader = ({ message }) => {
  return (
    <div className="overlay">
      <div className="overlay-content">
        <div class="loader"></div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default Loader;

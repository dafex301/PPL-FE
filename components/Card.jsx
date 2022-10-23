import PropTypes from "prop-types";

function Card(props) {
  const propsColor = props.color;
  let color = "";
  if (propsColor === "cyan") {
    color = "bg-cyan-500 hover:bg-cyan-600";
  } else if (propsColor === "sky") {
    color = "bg-sky-500 hover:bg-sky-600";
  } else if (propsColor === "blue") {
    color = "bg-blue-500 hover:bg-blue-600";
  } else if (propsColor === "indigo") {
    color = "bg-indigo-500 hover:bg-indigo-600";
  }

  return (
    <>
      <div
        className={
          `flex flex-col gap-2 cursor-pointer rounded-xl p-5 items-center text-white transition-all duration-100 ` +
          (props.status ? color : "bg-gray-200 hover:bg-gray-300 text-gray-500")
        }
        onClick={props.handleStatus}
      >
        <p>{props.name ? props.name : "-"}</p>
        <p className="text-6xl font-bold">{props.data ? props.data : 0}</p>
        <p>berkas</p>
      </div>
    </>
  );
}

Card.propTypes = {
  name: PropTypes.string.isRequired,
  data: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  status: PropTypes.bool.isRequired,
  handleStatus: PropTypes.func.isRequired,
};

export default Card;

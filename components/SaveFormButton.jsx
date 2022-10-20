export default function SaveFormButton(props) {
  return (
    <div className="flex justify-center mt-5">
      <button
        disabled={props.status === "sudah"}
        type="submit"
        className="disabled:bg-violet-300 disabled:cursor-not-allowed mb-2 px-10 h-10 text-white transition-colors duration-150 bg-violet-500 rounded-full shadow-lg focus:shadow-outline hover:bg-violet-600"
        onClick={props.handleSubmit}
      >
        Simpan
      </button>
    </div>
  );
}

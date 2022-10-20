export default function SubmitMessage(props) {
  return (
    <>
      {props.success && (
        <div
          className="mx-5 p-4 mt-5 border border-green-500 text-md text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800"
          role="alert"
        >
          <span className="font-medium">Berhasil</span> mengupdate {props.name}
        </div>
      )}

      {/* Error Message */}
      {!props.success && props.success !== null && (
        <div
          className="mx-5 p-4 mt-5 border border-red-500 text-md text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800"
          role="alert"
        >
          <span className="font-medium">Gagal</span> mengupdate {props.name}
        </div>
      )}
    </>
  );
}

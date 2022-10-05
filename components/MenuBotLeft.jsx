export default function MenuBotLeft(params) {
  return (
    <div className="bg-white rounded-lg shadow-lg mt-4 flex flex-col">
      <div>
        <div className="flex items-center flex-row py-3 pl-3 hover:bg-gray-100 rounded-t-lg">
          <i className="fa-solid fa-house pr-2"></i>
          <p className="">Home</p>
        </div>
        <div className="flex items-center flex-row py-3 pl-3 hover:bg-gray-100">
          <i className="fa-solid fa-user pr-3"></i>
          <p>Manajemen Akun</p>
        </div>
        <div className="flex items-center flex-row py-3 pl-3 hover:bg-gray-100">
          <i className="fa-solid fa-user-group pr-2"></i>
          <p>Data Mahasiswa</p>
        </div>
      </div>
    </div>
  );
}

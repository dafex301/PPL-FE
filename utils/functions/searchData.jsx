// Search function
export const searchData = (data, kategori, search) => {
  if (kategori === "nama") {
    return data.filter((item) => {
      return item.name.toLowerCase().includes(search.toLowerCase());
    });
  } else {
    return data.filter((item) => {
      return item.nim.toLowerCase().includes(search.toLowerCase());
    });
  }
};

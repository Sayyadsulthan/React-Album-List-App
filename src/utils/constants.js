const API_ROOT = "https://jsonplaceholder.typicode.com/albums";

export const API_URLS = {
  getAlbums: () => {
    return `${API_ROOT}`;
  },
  addToAlbum: () => {
    return `${API_ROOT}`;
  },
  updateAlbum: (id) => {
    return `${API_ROOT}/${id}`;
  },
  removeAlbum: (id) => `${API_ROOT}/${id}`,
};

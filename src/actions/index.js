/** Libraries */
import Axios from 'axios';

/** Initialisation */
const axiosInstance = Axios.create({
	baseURL: 'https://itunes.apple.com',
});

export const searchForAlbums = term =>
	axiosInstance.get(`search?term=${term}&entity=album`);

export const searchForSongs = albumId =>
	axiosInstance.get(`lookup?id=${albumId}&entity=song`);

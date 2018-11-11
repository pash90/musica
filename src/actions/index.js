/** Libraries */
import Axios from 'axios';

/** Initialisation */
const axiosInstance = Axios.create({
	baseURL: 'https://itunes.apple.com',
});

export const searchForAlbums = term => {
	if (!term || term.length === 0) {
		return Promise.resolve({
			data: {
				results: [],
			},
		});
	}

	return axiosInstance.get(
		`search?term=${term.replace(new RegExp(' ', 'g'), '+')}&entity=album`
	);
};

export const searchForSongs = albumId =>
	axiosInstance.get(`lookup?id=${albumId}&entity=song`);

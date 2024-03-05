// auth.js

import { Api } from '@/lib/common';
import { Await } from 'react-router-dom';

export const loginUserFn = async (user) => {
	const response = await Api.post('login', user);
	return response.data;
};

export const logoutUserFn = async () => {
	const response = await Api.post('logout');
	return response.data;
};

export const currentUserFn = async () => {
	const response = await Api.get('me');
	return response.data;
};

export const currenUserDataFn = async (id) => {
	const response = await Api.get(`pesertas/${id}`);
	return response.data;
};

export const currentUserContent = async () => {
	const response = await Api.get('userContent');
	return response.data;
}



// auth.js

// import { Api } from '@/lib/common';

// export const loginUserFn = async (user) => {
//   try {
//     const response = await Api.post('login', user);
//     const userData = response.data;

//     // Pastikan respons dari login menyertakan URL gambar profil dan batch
//     if (!userData.url || !userData.batch_id) {
//       throw new Error('Profile image URL or batch not found in response');
//     }

//     return userData;
//   } catch (error) {
//     throw error;
//   }
// };

// export const logoutUserFn = async () => {
//   const response = await Api.post('logout');
//   return response.data;
// };

// export const currentUserFn = async () => {
//   const response = await Api.get('me');
//   return response.data;
// };

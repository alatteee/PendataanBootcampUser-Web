import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Setup buat make react-query
//  Dari dokumentasi


const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: 5 * (60 * 1000), // 5 mins // hasil permintaan data akan dianggap tidak lagi berlaku setelah 5 menit.
			cacheTime: 10 * (60 * 1000), // 10 mins //hasil permintaan data akan disimpan dalam memori komputer selama 10 menit.
			retry: 0, //Jika permintaan data gagal, ini berarti kita tidak akan mencoba lagi permintaan data itu.
		},
	},
})

//"data" yang dimaksud adalah hasil dari permintaan query atau permintaan data spesifik yang dibuat dalam aplikasi 
//yang menggunakan pustaka React Query atau alat serupa. 

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<ToastContainer />
			<App />
		</QueryClientProvider>
	</React.StrictMode>
)

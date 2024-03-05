import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../Navigation/Sidebar'
import useStore from '@/store'


export default function AuthorizeLayout(props) {
	const { content } = props

	const store = useStore ()
	const navigate = useNavigate ()

	const handleLogout = () => {
		store.setUserToken(null)
		navigate("/login")
	}
	

	return (
		<main>
			<Sidebar>
				<div>
					<div>{content ?? <Outlet />}</div> 
				</div>
			</Sidebar>
		</main>
	)
}

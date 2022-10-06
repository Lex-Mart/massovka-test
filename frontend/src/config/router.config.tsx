import { createBrowserRouter } from 'react-router-dom'
import { MainLayout } from '../components/Layouts/MainLayout/MainLayout'

import { Cabinet } from '../components/pages/Cabinet/Cabinet'
import { NotFound } from '../components/pages/NotFound/NotFound'
import { Signin } from '../components/pages/Signin/Signin'
import { ProtectedRoute } from '../components/ProtectedRoute/ProtectedRoute'
import routes from './routes.config'

export const routerConfig = createBrowserRouter([
	{
		path: routes.root,
		element: <MainLayout />,
		children: [
			{ path: routes.login, element: <Signin /> },
			{
				path: routes.cabinet,
				element: (
					<ProtectedRoute>
						<Cabinet />
					</ProtectedRoute>
				),
			},
		],
		errorElement: <NotFound />,
	},
])

export default routerConfig

import { Route, Routes } from 'react-router-dom';
import HomeContainer from '@/containers/screens/HomeContainer';
import FavoritesContainer from '@/containers/screens/FavoritesContainer';
import OrdersContainer from '@/containers/screens/OrdersContainer';
export const Routing = () => {
	return (
		<Routes>
			<Route path='/'>
				<Route index element={<HomeContainer />} />
				<Route path='favorites' element={<FavoritesContainer />} />
				<Route path='orders' element={<OrdersContainer />} />
			</Route>
		</Routes>
	);
};

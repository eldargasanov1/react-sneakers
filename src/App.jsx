import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './App.scss';
import { requestAllItems } from './redux/store';
import { Layout } from '@/components/Layout/Layout';

function App() {
	const dispatch = useDispatch();

	useEffect(() => {
		requestAllItems(dispatch);
	}, []);

	return <Layout />;
}

export default App;

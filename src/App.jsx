import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContextProvider } from './context/user.context';
import { useState } from 'react';

function mapItems(items) {
	if (!items) {
		return [];
	}

	return items.map((i) => ({
		...i,
		date: new Date(i.date),
	}));
}

function App() {
	const [items, setItems] = useLocalStorage('data');
	const [selectedItem, setSelectedItem] = useState({});

	const addItemToJournalData = (newItem) => {
		if (!newItem.id) {
			setItems([
				...mapItems(items),
				{
					...newItem,
					date: new Date(newItem.date),
					id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
				},
			]);
		} else {
			setItems([
				...mapItems(items).map((i) => {
					if (i.id === newItem.id) {
						return {
							...newItem,
						};
					} else {
						return i;
					}
				}),
			]);
		}
	};

	return (
		<UserContextProvider>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournalList journalData={mapItems(items)} setSelectedItem={setSelectedItem} />
				</LeftPanel>
				<Body>
					<JournalForm addItemToJournalData={addItemToJournalData} selectedItem={selectedItem} />
				</Body>
			</div>
		</UserContextProvider>
	);
}

export default App;

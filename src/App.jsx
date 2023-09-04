import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';
import { useLocalStorage } from './hooks/use-localstorage.hook';
import { UserContext } from './context/user.context';
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
	const [userId, setUserId] = useState(1);
	const [items, setItems] = useLocalStorage('data');

	const addItemToJournalData = (newItem) => {
		setItems([
			...mapItems(items),
			{
				text: newItem.text,
				title: newItem.title,
				date: new Date(newItem.date),
				id: items.length > 0 ? Math.max(...items.map((item) => item.id)) + 1 : 1,
			},
		]);
	};

	return (
		<UserContext.Provider value={{ userId, setUserId }}>
			<div className="app">
				<LeftPanel>
					<Header />
					<JournalAddButton />
					<JournalList journalData={mapItems(items)} />
				</LeftPanel>
				<Body>
					<JournalForm addItemToJournalData={addItemToJournalData} />
				</Body>
			</div>
		</UserContext.Provider>
	);
}

export default App;

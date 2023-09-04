import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

function App() {
	const [journalData, setJournalData] = useState([]);

	useEffect(() => {
		const data = JSON.parse(localStorage.getItem('data'));
		if (data) {
			setJournalData(
				data.map((item) => ({
					...item,
					date: new Date(item.date),
				}))
			);
		}
	}, []);

	useEffect(() => {
		if (journalData.length) {
			localStorage.setItem('data', JSON.stringify(journalData));
		}
	}, [journalData]);

	const addItemToJournalData = (newItem) => {
		setJournalData((prev) => [
			...prev,
			{
				text: newItem.text,
				title: newItem.title,
				date: new Date(newItem.date),
				id: prev.length > 0 ? Math.max(...prev.map((item) => item.id)) + 1 : 1,
			},
		]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList journalData={journalData} />
			</LeftPanel>
			<Body>
				<JournalForm addItemToJournalData={addItemToJournalData} />
			</Body>
		</div>
	);
}

export default App;

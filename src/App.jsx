import { useState } from 'react';
import './App.css';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

const INITIAL_DATA = [
	{
		id: 1,
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date(),
	},
	{
		id: 2,
		title: 'Поход в горы',
		text: 'Думал, что-то очень долго ...',
		date: new Date(),
	},
];

function App() {
	const [journalData, setJournalData] = useState(INITIAL_DATA);

	const addItemToJournalData = (newItem) => {
		setJournalData((prev) => [
			...prev,
			{
				text: newItem.text,
				title: newItem.title,
				date: new Date(newItem.date),
				id: Math.max(...prev.map((item) => item.id)) + 1,
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

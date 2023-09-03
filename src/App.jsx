import { useState } from 'react';
import './App.css';
import CardButton from './components/CardButton/CardButton';
import Header from './components/Header/Header';
import JournalAddButton from './components/JournalAddButton/JournalAddButton';
import JournalForm from './components/JournalForm/JournalForm';
import JournalItem from './components/JournalItem/JournalItem';
import JournalList from './components/JournalList/JournalList';
import Body from './layouts/Body/Body';
import LeftPanel from './layouts/LeftPanel/LeftPanel';

const INITIAL_DATA = [
	{
		title: 'Подготовка к обновлению курсов',
		text: 'Горные походы открывают удивительные природные ландшафты',
		date: new Date(),
	},
	{
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
			},
		]);
	};

	return (
		<div className="app">
			<LeftPanel>
				<Header />
				<JournalAddButton />
				<JournalList>
					{journalData.map((element) => (
						<CardButton key={element.text}>
							<JournalItem title={element.title} text={element.text} date={element.date} />
						</CardButton>
					))}
				</JournalList>
			</LeftPanel>
			<Body>
				<JournalForm addItemToJournalData={addItemToJournalData} />
			</Body>
		</div>
	);
}

export default App;

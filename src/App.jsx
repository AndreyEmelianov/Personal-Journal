import './App.css';
import Button from './components/Button/Button';
import CardButton from './components/CardButton/CardButton';
import JournalItem from './components/JournalItem/JournalItem';

function App() {
	const data = [
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
	return (
		<div>
			<Button></Button>
			<CardButton>
				<JournalItem title={data[0].title} text={data[0].text} date={data[0].date} />
			</CardButton>
		</div>
	);
}

export default App;

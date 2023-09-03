import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';

const JournalList = ({ journalData }) => {
	if (journalData.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};

	return (
		<>
			{journalData.sort(sortItems).map((element) => (
				<CardButton key={element.id}>
					<JournalItem title={element.title} text={element.text} date={element.date} />
				</CardButton>
			))}
		</>
	);
};
export default JournalList;

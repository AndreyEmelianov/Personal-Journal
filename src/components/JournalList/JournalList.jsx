import { useContext, useMemo } from 'react';
import CardButton from '../CardButton/CardButton';
import JournalItem from '../JournalItem/JournalItem';
import './JournalList.css';
import { UserContext } from '../../context/user.context';

const JournalList = ({ journalData, setSelectedItem }) => {
	const { userId } = useContext(UserContext);

	const sortItems = (a, b) => {
		if (a.date < b.date) {
			return 1;
		} else {
			return -1;
		}
	};
	const filteredJournalData = useMemo(
		() => journalData.filter((el) => el.userId === userId).sort(sortItems),
		[journalData, userId]
	);

	if (journalData.length === 0) {
		return <p>Записей пока нет, добавьте первую</p>;
	}

	return (
		<>
			{filteredJournalData.map((element) => (
				<CardButton key={element.id} onClick={() => setSelectedItem(element)}>
					<JournalItem title={element.title} text={element.text} date={element.date} />
				</CardButton>
			))}
		</>
	);
};
export default JournalList;

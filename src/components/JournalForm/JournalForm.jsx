import './JournalForm.css';
import Button from '../Button/Button';

const JournalForm = () => {
	const addJournalItem = (event) => {
		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);

		event.preventDefault();
	};

	return (
		<form onSubmit={addJournalItem} className="journal-form">
			<input type="text" name="title" />
			<input type="date" name="date" />
			<input type="text" name="tag" />
			<textarea name="post"></textarea>
			<Button text="Сохранить" />
		</form>
	);
};
export default JournalForm;

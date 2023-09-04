import './JournalForm.css';
import Button from '../Button/Button';
import { useState } from 'react';

const JournalForm = ({ addItemToJournalData }) => {
	const [formValidState, setFormValidState] = useState({
		title: true,
		text: true,
		date: true,
	});

	const addJournalItem = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);
		const formProps = Object.fromEntries(formData);

		let isFormValid = true;
		if (!formProps.title?.trim().length) {
			setFormValidState((prev) => ({ ...prev, title: false }));
			isFormValid = false;
		} else {
			setFormValidState((prev) => ({ ...prev, title: true }));
		}
		if (!formProps.text?.trim().length) {
			setFormValidState((prev) => ({ ...prev, text: false }));
			isFormValid = false;
		} else {
			setFormValidState((prev) => ({ ...prev, text: true }));
		}
		if (!formProps.date) {
			setFormValidState((prev) => ({ ...prev, date: false }));
			isFormValid = false;
		} else {
			setFormValidState((prev) => ({ ...prev, date: true }));
		}
		if (!isFormValid) {
			return;
		}

		addItemToJournalData(formProps);
	};

	return (
		<form onSubmit={addJournalItem} className="journal-form">
			<input
				type="text"
				name="title"
				className={`input ${formValidState.title ? '' : 'invalid'}`}
			/>
			<input type="date" name="date" className={`input ${formValidState.date ? '' : 'invalid'}`} />
			<input type="text" name="tag" />
			<textarea name="text" className={`input ${formValidState.text ? '' : 'invalid'}`}></textarea>
			<Button text="Сохранить" />
		</form>
	);
};
export default JournalForm;

import { useState } from 'react';
import cn from 'classnames';

import Button from '../Button/Button';

import styles from './JournalForm.module.css';

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
		<form onSubmit={addJournalItem} className={styles['journal-form']}>
			<div>
				<input
					type="text"
					name="title"
					className={cn(styles['input-title'], {
						[styles.invalid]: !formValidState.title,
					})}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<input
					type="date"
					name="date"
					id="date"
					className={cn(styles.input, {
						[styles.invalid]: !formValidState.date,
					})}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<input type="text" id="tag" name="tag" className={styles.input} />
			</div>

			<textarea
				name="text"
				cols="30"
				rows="10"
				className={cn(styles.input, {
					[styles.invalid]: !formValidState.text,
				})}
			></textarea>
			<Button text="Сохранить" />
		</form>
	);
};
export default JournalForm;

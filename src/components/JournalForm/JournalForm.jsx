import { useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';

import Button from '../Button/Button';

import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';

const JournalForm = ({ addItemToJournalData }) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const focusError = (isValid) => {
		switch (true) {
			case !isValid.title:
				titleRef.current.focus();
				break;
			case !isValid.date:
				dateRef.current.focus();
				break;
			case !isValid.text:
				textRef.current.focus();
				break;
		}
	};

	useEffect(() => {
		let timerId;
		if (!isValid.date || !isValid.title || !isValid.text) {
			focusError(isValid);
			timerId = setTimeout(() => {
				dispatchForm({ type: 'RESET_VALIDITY' });
			}, 2000);
		}

		return () => {
			clearTimeout(timerId);
		};
	}, [isValid]);

	useEffect(() => {
		if (isFormReadyToSubmit) {
			addItemToJournalData(values);
			dispatchForm({ type: 'CLEAR' });
		}
	}, [isFormReadyToSubmit, values, addItemToJournalData]);

	const onChange = (event) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [event.target.name]: event.target.value } });
	};

	const addJournalItem = (event) => {
		event.preventDefault();

		dispatchForm({ type: 'SUBMIT' });
	};

	return (
		<form onSubmit={addJournalItem} className={styles['journal-form']}>
			<div>
				<input
					type="text"
					value={values.title}
					onChange={onChange}
					ref={titleRef}
					name="title"
					className={cn(styles['input-title'], {
						[styles.invalid]: !isValid.title,
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
					value={values.date}
					onChange={onChange}
					ref={dateRef}
					name="date"
					id="date"
					className={cn(styles.input, {
						[styles.invalid]: !isValid.date,
					})}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<input
					type="text"
					id="tag"
					name="tag"
					className={styles.input}
					value={values.tag}
					onChange={onChange}
				/>
			</div>

			<textarea
				value={values.text}
				onChange={onChange}
				ref={textRef}
				name="text"
				cols="30"
				rows="10"
				className={cn(styles.input, {
					[styles.invalid]: !isValid.text,
				})}
			></textarea>
			<Button text="Сохранить" />
		</form>
	);
};
export default JournalForm;

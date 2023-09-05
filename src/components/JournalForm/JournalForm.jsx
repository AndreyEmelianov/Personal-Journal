import { useContext, useEffect, useReducer, useRef } from 'react';
import cn from 'classnames';

import Button from '../Button/Button';

import styles from './JournalForm.module.css';
import { INITIAL_STATE, formReducer } from './JournalForm.state';
import Input from '../Input/Input';
import { UserContext } from '../../context/user.context';

const JournalForm = ({ addItemToJournalData, selectedItem, onDelete }) => {
	const [formState, dispatchForm] = useReducer(formReducer, INITIAL_STATE);
	const { isValid, isFormReadyToSubmit, values } = formState;

	const titleRef = useRef();
	const dateRef = useRef();
	const textRef = useRef();

	const { userId } = useContext(UserContext);

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
		dispatchForm({ type: 'SET_VALUE', payload: { ...selectedItem } });
	}, [selectedItem]);

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
			dispatchForm({ type: 'SET_VALUE', payload: { userId } });
		}
	}, [isFormReadyToSubmit, values, addItemToJournalData, userId]);

	useEffect(() => {
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	}, [userId]);

	const onChange = (event) => {
		dispatchForm({ type: 'SET_VALUE', payload: { [event.target.name]: event.target.value } });
	};

	const addJournalItem = (event) => {
		event.preventDefault();

		dispatchForm({ type: 'SUBMIT' });
	};

	const deleteJournalItem = () => {
		onDelete(selectedItem.id);
		dispatchForm({ type: 'CLEAR' });
		dispatchForm({ type: 'SET_VALUE', payload: { userId } });
	};

	return (
		<form onSubmit={addJournalItem} className={styles['journal-form']}>
			<div className={styles['form-row']}>
				<Input
					type="text"
					value={values.title}
					onChange={onChange}
					ref={titleRef}
					name="title"
					appearance="title"
					isValid={isValid.title}
				/>
				{selectedItem.id && (
					<button className={styles.delete} type="button" onClick={deleteJournalItem}>
						<img src="/archive.svg" alt="Иконка удаления" />
					</button>
				)}
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="date" className={styles['form-label']}>
					<img src="/calendar.svg" alt="Иконка календаря" />
					<span>Дата</span>
				</label>
				<Input
					type="date"
					value={values.date ? new Date(values.date).toISOString().slice(0, 10) : ''}
					onChange={onChange}
					ref={dateRef}
					name="date"
					id="date"
					isValid={isValid.date}
				/>
			</div>

			<div className={styles['form-row']}>
				<label htmlFor="tag" className={styles['form-label']}>
					<img src="/folder.svg" alt="Иконка папки" />
					<span>Метки</span>
				</label>
				<Input type="text" id="tag" name="tag" value={values.tag} onChange={onChange} />
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
			<Button>Сохранить</Button>
		</form>
	);
};
export default JournalForm;

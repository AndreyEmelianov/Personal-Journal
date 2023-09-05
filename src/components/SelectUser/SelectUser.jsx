import { useContext } from 'react';
import { UserContext } from '../../context/user.context';

import styles from './SelectUser.module.css';

const SelectUser = () => {
	const { userId, setUserId } = useContext(UserContext);

	const changeUser = (e) => {
		setUserId(Number(e.target.value));
	};

	return (
		<select name="user" id="user" value={userId} onChange={changeUser} className={styles.select}>
			<option value="1" className={styles.option}>
				Андрей
			</option>
			<option value="2" className={styles.option}>
				Лидия
			</option>
		</select>
	);
};
export default SelectUser;

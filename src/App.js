import { useEffect, useState } from 'react';
import './App.css';
import ExpenseItem from './components/Expenses/ExpenseItem';
import useFetch from './components/helpers/hooks/useFetch';
import Modal from './components/Modal/Modal';
import AddExpense from './components/NewExpense/AddExpense';

// const expenses = [
// 	{
// 		id: 'e1',
// 		title: 'Toilet Paper',
// 		amount: 94.12,
// 		date: new Date(2020, 7, 14),
// 	},
// 	{
// 		id: 'e2',
// 		title: 'New TV',
// 		amount: 799.49,
// 		date: new Date(2021, 2, 12),
// 	},
// 	{
// 		id: 'e3',
// 		title: 'Car Insurance',
// 		amount: 294.67,
// 		date: new Date(2021, 2, 28),
// 	},
// 	{
// 		id: 'e4',
// 		title: 'New Desk (Wooden)',
// 		amount: 450,
// 		date: new Date(2022, 5, 12),
// 	},
// ];

function App() {
	const [expensesData, setExpensesData] = useState([]);
	const [active, setActve] = useState(false);

	const { postHandler, getHanler } = useFetch();
	async function saveDatatoArrayHandler(formData) {
		await postHandler('/todo-data.json', formData);
		setActve(true);
		getDataFromBackend();
	}

	async function getDataFromBackend() {
		const data = await getHanler('/todo-data.json');

		const loadedData = [];
		for (const key in data) {
			loadedData.push({
				amount: data[key].amount,
				id: key,
				title: data[key].title,
				date: data[key].date,
			});
		}

		setExpensesData(loadedData);
		setActve(false);
	}

	useEffect(() => {
		getDataFromBackend();
	}, []);

	return (
		<div className='app-main-block'>
			<AddExpense onSaveDtaToArray={saveDatatoArrayHandler} />
			<Modal setActve={setActve} active={active} />
			{expensesData.map((element) => {
				return (
					<ExpenseItem
						key={element.id}
						date={element.date}
						text={element.title}
						amount={element.amount}
					/>
				);
			})}
		</div>
	);
}

export default App;

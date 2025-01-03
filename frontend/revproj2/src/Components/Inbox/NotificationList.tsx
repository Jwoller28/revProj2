import {useEffect, useState, MouseEventHandler} from 'react';
import {getGoalsbyUserId, usernameifAuthorized, getUserByUsername} from '../../API/Axios';
import {useNavigate} from 'react-router-dom';
import {Exercise, Nutrition, Goal} from './Inbox';


interface NotiListProp {
	handleClick : MouseEventHandler<HTMLDivElement>;
}
function NotificationList(prop : NotiListProp)
{
	const [goals, setGoals] = useState<Goal[]>([]);
	const today = new Date();
	const navigate = useNavigate();

	const todayRes = new Date(today.getFullYear(), today.getMonth(), today.getDay());

	const getGoalsBeforeToday = async () => {
		let username = await usernameifAuthorized();
		let user = await getUserByUsername(username);
		let goalList = await getGoalsbyUserId(user.id);

		return await goalList.filter(beforeDate);

		function beforeDate (goal : Goal)
		{
			let goalDate = new Date(goal.waterDate);
			let diff = todayRes.getTime() - goalDate.getTime();
			if(diff >= 0)
				{
					return goal;
				}
		}

	}
		
	useEffect( () => {
		console.log(getGoalsBeforeToday());
		
		getGoalsBeforeToday().then( (data) => {setGoals(data)})
	},[])

	return (
		<div>
		{goals.map((goal : Goal, index : number) => (
		<div a-key = {goal.id} onClick = {prop.handleClick}>
			<h5> Goal ID : {goal.id} </h5>
			<h5> Goal Date : {(goal.waterDate).toString()} </h5>
		</div>
		)
		)
		}
		</div>
	)
}
export default NotificationList;

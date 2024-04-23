import { useEffect,useState } from "react";
import styles from "./styles.module.css";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'

const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};
	const [users,setUsers] = useState([])
	useEffect(()=>{
		axios.get('http://localhost:8080/getUser')
		.then(users => setUsers(users.data))
		.catch(err => console.log(err))

	},[])

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Login Succesfully</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
             <div className=" w-100 vh-100 d-flex justify-content-center align-items-top"> 
			 <div className="w-50">
			<table className="table">
				<thead>
					<tr>
						<th>
							First Name
						</th>
						<th>
							Last Name
						</th>
						<th>
							DOB
						</th>
                        <th>
							Email
						</th>
					</tr>
				</thead>
				<tbody>
				
				{
					users.map(user =>{
						<tr>
							<td>{user.firstName}</td>
							<td>{user.lastName}</td>
							<td>{user.dob}</td>
							<td>{user.email}</td>
						</tr>
					})
				}
				</tbody>
			</table>
			</div>
			</div>
		</div>
	);
};

export default Main;
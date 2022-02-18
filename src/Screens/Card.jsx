import React from "react";
import { Link } from "react-router-dom";

const Card = ({ name, email, createdAt, profilePiceture, id }) => {
	return (
		// <div className='container col-md-4'>
		// 	<div className='cardcontainer'>
		// 		<div className='photo'>
		// 			{" "}
		// 			<img
		// 				src='https://images.pexels.com/photos/2346006/pexels-photo-2346006.jpeg?auto=format%2Ccompress&cs=tinysrgb&dpr=1&w=500'
		// 				alt='img'
		// 			/>
		// 			<div className='photos'>Photos</div>
		// 		</div>
		// 		<div className='content'>
		// 			<p className='txt4'>City Lights In Newyork</p>
		// 			<p className='txt5'>A city that never sleeps</p>
		// 			<p className='txt2'>
		// 				New York, the largest city in the U.S., is an architectural marvel
		// 				with plenty of historic monuments, magnificent buildings and
		// 				countless dazzling skyscrapers.
		// 			</p>
		// 		</div>
		// 		<div className='footer'>
		// 			<p>
		// 				<a className='waves-effect waves-light btn' href='#'>
		// 					Read More
		// 				</a>
		// 				<a id='heart'>
		// 					<span className='like'>
		// 						<i className='fab fa-gratipay'></i>Like
		// 					</span>
		// 				</a>
		// 			</p>
		// 			<p className='txt3'>
		// 				<i className='far fa-clock'></i>10 Minutes Ago{" "}
		// 				<span className='comments'>
		// 					<i className='fas fa-comments'></i>45 Comments
		// 				</span>
		// 			</p>
		// 		</div>
		// 	</div>
		// </div>
		<div className='card col-md-3 m-2'>
			<img
				src={
					profilePiceture
						? "https://ui-avatars.com/api/?name=John+Doe"
						: "https://images.pexels.com/photos/10162332/pexels-photo-10162332.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
				}
				className='card-img-top'
				alt='...'
			/>
			<div className='card-body'>
				<h5 className='card-title'>{name}</h5>
				<p className='card-text'>{email}</p>
				<p className='card-text'>
					{`joined ` + new Date(createdAt).toLocaleDateString()}
				</p>
				<Link to={`/user/${id}`} className='btn btn-raised btn-primary m-2'>
					view profile
				</Link>
			</div>
		</div>
	);
};

export default Card;

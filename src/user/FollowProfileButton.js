import React from "react";

const FollowProfileButton = ({
	checkFollow,
	user,
	clickFollowButton,
	following,
	unFollowButton,
}) => {
	return (
		<div className='d-inline-block mt-2'>
			{!following ? (
				<button
					className='btn btn-outline-light mr-3'
					onClick={() => clickFollowButton()}
				>
					Follow
				</button>
			) : (
				<button className='btn btn-outline-info' onClick={unFollowButton}>
					Unfollow
				</button>
			)}
			{/* <button className='btn btn-outline-light mr-3'>Follow</button>
			<button className='btn btn-outline-info'>Unfollow</button> */}
		</div>
	);
};

export default FollowProfileButton;

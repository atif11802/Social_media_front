import React from "react";
import { Link } from "react-router-dom";

const ProfileTabs = ({ user, posts }) => {
	const { following, followers } = user;
	console.log(followers, following);
	return (
		<div>
			<div className='row'>
				<div className='col-md-4'>
					<h3 className='text-primary'>followers</h3>
					<hr />
					{followers?.map((follower, index) => (
						<div key={index}>
							<div>
								<Link
									to={`/user/${follower._id}`}
									className='text-primary'
									style={{ textDecoration: "none" }}
								>
									<img
										style={{ borderRadius: "50%", border: "1px solid black" }}
										src='https://image.shutterstock.com/image-vector/hipster-crown-icon-beard-mustache-260nw-718564288.jpg'
										alt={follower.name}
										className='float-left mr-2'
										height='30px'
										width='30px'
									/>
									<div>
										<p className='lead'>{follower.name}</p>
										{/* <p>{follower.about}</p> */}
									</div>
								</Link>
								<p style={{ clear: "both" }}>{follower.about}</p>
							</div>
						</div>
					))}
				</div>
				<div className='col-md-4'>
					<h3 className='text-primary'>following</h3>
					<hr />
					{following?.map((following, index) => (
						<div key={index}>
							<div>
								<Link
									to={`/user/${following._id}`}
									className='text-primary'
									style={{ textDecoration: "none" }}
								>
									<img
										style={{ borderRadius: "50%", border: "1px solid black" }}
										src='https://image.shutterstock.com/image-vector/hipster-crown-icon-beard-mustache-260nw-718564288.jpg'
										alt={following.name}
										className='float-left mr-2'
										height='30px'
										width='30px'
									/>
									<div>
										<p className='lead'>{following.name}</p>
										{/* <p>{following.about}</p> */}
									</div>
								</Link>
								<p style={{ clear: "both" }}>{following.about}</p>
							</div>
						</div>
					))}
				</div>
				<div className='col-md-4'>
					<h3 className='text-primary'>posts</h3>
					<hr />
					{posts?.map((post, index) => (
						<div key={index}>
							<div>
								<Link
									to={`/post/${post._id}`}
									className='text-primary'
									style={{ textDecoration: "none" }}
								>
									<div>
										<p className='lead'>{post.title}</p>
									</div>
								</Link>
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ProfileTabs;

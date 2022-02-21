import React from "react";
import { Carousel } from "react-bootstrap";

const Slider = ({ postPictures }) => {
	return (
		<Carousel>
			{postPictures.map((image, index) => (
				<Carousel.Item interval={1000} key={index}>
					<img
						style={{ width: "100%", height: "200px" }}
						className='d-block w-100'
						src={image.res}
						alt='First slide'
					/>
				</Carousel.Item>
			))}
		</Carousel>
	);
};

export default Slider;

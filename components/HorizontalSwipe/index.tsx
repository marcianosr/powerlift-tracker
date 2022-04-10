import React, { FC, useState } from "react";

export type Direction = "left" | "right";

type HorizontalSwipeProps = {
	action: (direction: Direction) => void;
};

const HorizontalSwipe: FC<HorizontalSwipeProps> = ({ children, action }) => {
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);

	// the required distance between touchStart and touchEnd to be detected as a swipe
	const minSwipeDistance = 50;

	const onTouchStart = (e: React.TouchEvent) => {
		setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
		setTouchStart(e.targetTouches[0].clientX);
	};

	const onTouchMove = (e: React.TouchEvent) =>
		setTouchEnd(e.targetTouches[0].clientX);

	const onTouchEnd = () => {
		if (!touchStart || !touchEnd) return;
		const distance = touchStart - touchEnd;
		const isLeftSwipe = distance > minSwipeDistance;
		const isRightSwipe = distance < -minSwipeDistance;
		if (isLeftSwipe || isRightSwipe) {
			console.log("swipe", isLeftSwipe ? "left" : "right");
			action(isLeftSwipe ? "left" : "right");
		}
		// add your conditional logic here
	};

	return (
		<div
			onTouchStart={onTouchStart}
			onTouchMove={onTouchMove}
			onTouchEnd={onTouchEnd}
		>
			{children}
		</div>
	);
};

export default HorizontalSwipe;

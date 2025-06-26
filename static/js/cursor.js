let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;
const speed = 0.2;
const latency = 10;

const cursorFollower = document.querySelector('.cursor-follower');
const headFollower1 = document.querySelector('.head-follower-1');
const headFollower2 = document.querySelector('.head-follower-2');
const headFollower3 = document.querySelector('.head-follower-3');

document.addEventListener('mousemove', (e) => {
	cursorFollower.style.left = `${e.clientX}px`;
	cursorFollower.style.top = `${e.clientY}px`;

	setTimeout(() => {
		headFollower1.style.left = `${e.clientX}px`;
		headFollower1.style.top = `${e.clientY}px`;
	}, latency);

	setTimeout(() => {
		headFollower2.style.left = `${e.clientX}px`;
		headFollower2.style.top = `${e.clientY}px`;
	}, latency * 2);

	setTimeout(() => {
		headFollower3.style.left = `${e.clientX}px`;
		headFollower3.style.top = `${e.clientY}px`;
	}, latency * 3);
});

document.addEventListener('click', () => {
	cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
	setTimeout(() => {
		cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
		headFollower1.style.transform = 'translate(-50%, -50%) scale(1.5)';
		setTimeout(() => {
			headFollower1.style.transform = 'translate(-50%, -50%) scale(1)';
			headFollower2.style.transform = 'translate(-50%, -50%) scale(1.5)';
			setTimeout(() => {
				headFollower2.style.transform = 'translate(-50%, -50%) scale(1)';
				headFollower3.style.transform = 'translate(-50%, -50%) scale(1.5)';
				setTimeout(() => {
					headFollower3.style.transform = 'translate(-50%, -50%) scale(1)';
				}, 50);
			}, 50);
		}, 100);
	}, 200);
  
});

function animate() {
	cfollowerX += (mouseX - followerX) * speed;
	cfollowerY += (mouseY - followerY) * speed;

	h1followerX += (mouseX - followerX) * (speed - 0.1);
	h1followerY += (mouseY - followerY) * (speed - 0.1);

	h2followerX += (mouseX - followerX) * (speed - 0.2);
	h2followerY += (mouseY - followerY) * (speed - 0.2);

	h3followerX += (mouseX - followerX) * (speed - 0.3);
	h3followerY += (mouseY - followerY) * (speed - 0.3);

	cursorFollower.style.left = `${cfollowerX}px`;
	cursorFollower.style.top = `${cfollowerY}px`;

	headFollower1.style.left = `${h1followerX}px`;
	headFollower1.style.top = `${h1followerY}px`;

	headFollower2.style.left = `${h2followerX}px`;
	headFollower2.style.top = `${h2followerY}px`;

	headFollower3.style.left = `${h3followerX}px`;
	headFollower3.style.top = `${h3followerY}px`;

	requestAnimationFrame(animate);
}

document.addEventListener('mousemove', (e) => {
	mouseX = e.clientX;
	mouseY = e.clientY;
});

animate();
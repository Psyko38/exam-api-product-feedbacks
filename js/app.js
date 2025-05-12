let wrappers = document.querySelector(".feedback-wrapper");
const mainBody = document.querySelector(".feedback-page");
const SSearchType = document.querySelector("#filter-sort");
const SSearchPage = document.querySelector("#filter-page");
const NumberSug = document.querySelector("#feedback-counter");

const API = "http://51.38.232.174:3002/v1";

const urlParams = new URLSearchParams(window.location.search);
const SearchType = urlParams.get("sort");
const SearchPage = urlParams.get("page");

SSearchType.value = SearchType;
SSearchPage.value = SearchPage;

document.addEventListener("DOMContentLoaded", async () => {
	const data = await Get(`?page=0&pageSize=${SearchPage}&sort=${SearchType}`);
	print(data);
});

async function Get(parms) {
	const Q = await fetch(`${API}/feedbacks${parms}`);
	const data = await Q.json();
	return data;
}

function print(data) {
	wrappers.remove();
	wrappers = document.createElement("section");
	wrappers.className = "feedback-wrapper";
	mainBody.appendChild(wrappers);
	NumberSug.innerText = data.length;
	for (let i = 0; i < data.length; i++) {
		Creat(
			data[i].votes,
			data[i].title,
			data[i].description,
			data[i].category,
			data[i].comments
		);
	}
}

function Creat(vote, name, desk, type, msg) {
	const mainDiv = document.createElement("div");
	mainDiv.className = "feedback-item";

	const feedback_item_votes = document.createElement("div");
	feedback_item_votes.className = "feedback-item-votes";

	const svg1 = document.createElement("svg");
	svg1.setAttribute("viewBox", "0 0 24 24");

	const path1 = document.createElement("path");
	path1.setAttribute(
		"d",
		"M7.41,15.41L12,10.83L16.59,15.41L18,14L12,8L6,14L7.41,15.41Z"
	);
	path1.setAttribute("style", "fill: currentcolor");

	const span1 = document.createElement("span");
	span1.className = "text-regular-3";
	span1.innerText = vote;

	svg1.appendChild(path1);
	feedback_item_votes.appendChild(svg1);
	feedback_item_votes.appendChild(span1);
	mainDiv.appendChild(feedback_item_votes);

	const feedback_item_text = document.createElement("div");
	feedback_item_text.className = "feedback-item-text";

	const h31 = document.createElement("h3");
	h31.className = "heading-3";
	h31.innerText = name;

	const p1 = document.createElement("p");
	p1.innerText = desk;

	const div1 = document.createElement("div");
	div1.className = "feedback-chip text-regular-3";
	div1.innerText = type;

	feedback_item_text.appendChild(h31);
	feedback_item_text.appendChild(p1);
	feedback_item_text.appendChild(div1);

	mainDiv.appendChild(feedback_item_text);

	const feedback_item_comments = document.createElement("div");
	feedback_item_comments.className = "feedback-item-comments";

	const svg2 = document.createElement("svg");
	svg2.className = "grey-lighten-1-text";
	svg2.setAttribute("viewBox", "0 0 24 24");

	const path2 = document.createElement("path");
	path2.setAttribute("style", "fill: currentcolor");
	path2.setAttribute(
		"d",
		"M12,3C17.5,3 22,6.58 22,11C22,15.42 17.5,19 12,19C10.76,19 9.57,18.82 8.47,18.5C5.55,21 2,21 2,21C4.33,18.67 4.7,17.1 4.75,16.5C3.05,15.07 2,13.13 2,11C2,6.58 6.5,3 12,3Z"
	);

	const span2 = document.createElement("span");
	span2.className = "bold";
	span2.innerText = msg;

	if (msg == 0) {
		feedback_item_comments.style.opacity = 0.5;
	}

	svg2.appendChild(path2);
	feedback_item_comments.appendChild(svg2);
	feedback_item_comments.appendChild(span2);
	mainDiv.appendChild(feedback_item_comments);

	wrappers.appendChild(mainDiv);
}

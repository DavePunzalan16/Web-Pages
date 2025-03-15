let products = [
	{ id: 1, name: "Wireless Headphones" },
	{ id: 2, name: "Smartwatch" },
	{ id: 3, name: "Bluetooth Speaker" }
];
let favorites = [];
function displayProducts() {
	const productList = document.getElementById("product-list");
	productList.innerHTML = ""; 
	products.forEach(product => {

		const productDiv = document.createElement("div");
		productDiv.classList.add("product");

		const productName = document.createElement("span");
		productName.textContent = product.name;

		const favButton = document.createElement("button");
		favButton.textContent = "Favorite";
		favButton.addEventListener("click", () => {
			productDiv.classList.toggle("favorite"); 
			toggleFavorite(product); 
		});

		const removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.addEventListener("click", () => {
			productDiv.remove(); 
			products = products.filter(p => p.id !== product.id); 
		});
		productDiv.appendChild(productName);
		productDiv.appendChild(favButton);
		productDiv.appendChild(removeButton);
		productList.appendChild(productDiv);
	});
}

function toggleFavorite(product) {
	if (favorites.includes(product)) {
		favorites = favorites.filter(fav => fav.id !== product.id);
	} else {
		favorites.push(product);
	}
	displayFavorites();
}
function displayFavorites() {
	const favoriteList = document.getElementById("favorite-list");
	favoriteList.innerHTML = ""; 
	favorites.forEach(fav => {
		const favDiv = document.createElement("div");
		favDiv.textContent = fav.name;
		favoriteList.appendChild(favDiv);
	});
}

function clearFavorites() {
	if (confirm("Are you sure you want to clear all favorites?")) {
		favorites = [];
		displayFavorites();

		const productElements = document.querySelectorAll('.product.favorite');
		productElements.forEach(productElement => {
			productElement.classList.remove('favorite');
		});
	}
}

document.getElementById("add-device").addEventListener("click", () => {
	const deviceInput = document.getElementById("device-input");
	const deviceName = deviceInput.value.trim();
	if (deviceName) {
		const newProduct = { id: Date.now(), name: deviceName };
		products.push(newProduct);
		displayProducts();
		deviceInput.value = ""; 
	}
});

document.getElementById("clear-favorites").addEventListener("click", clearFavorites);

displayProducts();

document.querySelector(".search-button").addEventListener("click", () => {
	const searchInput = document.querySelector(".search-input").value.trim().toLowerCase();
	const sections = document.querySelectorAll("section");

	sections.forEach(section => {
		if (searchInput && !section.id.toLowerCase().includes(searchInput)) {
			section.style.display = "none";
		} else {
			section.style.display = "block";
		}
	});
});

document.querySelector(".search-input").addEventListener("input", () => {
	if (!document.querySelector(".search-input").value.trim()) {
		const sections = document.querySelectorAll("section");
		sections.forEach(section => {
			section.style.display = "block";
		});
	}
});

document.querySelector(".search-input").addEventListener("keypress", (e) => {
	if (e.key === "Enter") {
		document.querySelector(".search-button").click();
	}
});


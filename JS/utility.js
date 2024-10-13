// Fetch Any Url and give Data;
const fetchData = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}


// Display Card To Anywhere From Data;
const displayCard = (obj) => {
    const div = document.createElement('div');
    div.innerHTML = `
            <div class="border border-gray-300 rounded-xl p-4 space-y-1 max-w-64">
                <img class="w-60 h-40 object-cover rounded-lg" src="${obj.image}" alt="Demo Image">
                <h2 class="text-xl font-bold pt-2">${obj.pet_name ?? 'Not Available'}</h2>
                <p class="flex items-center gap-2 text-gray-500 font-semibold">
                    <i class="fa-solid fa-dog"></i>
                    Breed: ${obj.breed ?? 'Not Available'}
                </p>
                <p class="flex items-center gap-3 text-gray-500 font-semibold">
                    <i class="fa-regular fa-calendar-days"></i>
                    Birth: ${obj.date_of_birth?.slice(0, 4) ?? 'Not Available'}
                </p>
                <p class="flex items-center gap-1 text-gray-500 font-semibold">
                    <i class="fa-solid fa-venus-mars"></i>
                    Gender: ${obj.gender ?? 'Not Available'}
                </p>
                <p class="flex items-center gap-3 text-gray-500 font-semibold pb-2">
                    <i class="fa-solid fa-dollar-sign"></i>
                    Price: ${obj.price ? obj.price + '$' : 'Not Available'}
                </p>
                <hr class="">
                <div class="flex items-center justify-between pt-2">
                    <button onclick="liked('${obj.image}')" class="py-1 px-3 rounded-md border hover:text-skyC font-semibold border-skyC">
                        <i class="fa-solid fa-thumbs-up"></i>
                    </button>
                    <button onclick="timeOutModal(this)" 
                        class="py-1 px-3 rounded-md border text-skyC font-semibold border-skyC hover:bg-skyC hover:text-white disabled:bg-slate-500 disabled:text-gray-600">Adopt</button>
                    <button onclick="detailsModal(${obj.petId})"
                        class="py-1 px-3 rounded-md border text-skyC font-semibold border-skyC hover:bg-skyC hover:text-white">Details</button>
                </div>
            </div>
    `
    document.getElementById('card-section').appendChild(div);
}


// Lodging Spinner;
const loadSpinner = () => {
    cardSection.innerHTML = '';
    cardSection.classList.remove('grid');
    const div = document.createElement('div');
    div.classList.add('w-full')
    div.innerHTML = `<div id="spinner" class="h-10 w-10 mt-16 border-gray-200 border-4 border-t-4 border-t-black rounded-full my-5 mx-auto animate-spin"></div>`
    cardSection.appendChild(div);
}

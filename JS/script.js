const cardSection = document.getElementById('card-section');

// Create Category Button ;
const categoryBtnCreate = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/categories';
    const data = await fetchData(url);
    const categories = data.categories;
    categories.forEach((obj) => {
        const div = document.createElement('div');

        div.innerHTML = `
            <button onclick="showCategoryPage('${obj.category}', this)" class="btn h-14 w-40 border-sky-500 hover:border-skyC hover:bg-sky-100">
                <img class="max-h-10" src="${obj.category_icon}" alt="">
                <h3 class="text-lg font-bold">${obj.category}</h3>
            </button>
        `
        document.getElementById('category-div').appendChild(div);
    })
}


// Show All Card;
const showAllCard = async () => {
    const url = 'https://openapi.programming-hero.com/api/peddy/pets'
    const data = await fetchData(url);
    const obj = data.pets;

    loadSpinner();
    setTimeout(() => {
        cardSection.innerHTML = '';
        cardSection.classList.add('grid');
        obj.forEach((obj) => displayCard(obj));
    }, 1900)

    sortByPrice(data.pets);
}


// onPageLode Call Function;
categoryBtnCreate();
showAllCard()


// Category Option with Card Section;
const showCategoryPage = async (id, e) => {
    buttonActive(e);

    const url = `https://openapi.programming-hero.com/api/peddy/category/${id}`
    const res = await fetchData(url);
    const data = res.data;

    if (data.length) {
        sortByPrice(data)

        loadSpinner();
        setTimeout(() => {
            cardSection.innerHTML = '';
            cardSection.classList.add('grid');
            data.forEach((obj) => displayCard(obj));
        }, 1900)
    } else {
        loadSpinner();
        const div = document.createElement('div');
        cardSection.classList.remove('grid');
        div.innerHTML = `
                <div class="text-center mx-auto min-h-[500px] flex items-center justify-center flex-col gap-6">
                    <img class="mx-auto" src="./images/noData.png" alt="No Data Found Image">
                    <h2 class="text-3xl font-semibold">No Information Available</h2>
                    <p class="w-9/12 mx-auto">
                        It is a long established fact that a reader will be distracted by the readable content
                        of a page when looking at
                        its layout. The point of using Lorem Ipsum is that it has a.
                    </p>
                </div>
        `

        setTimeout(() => {
            cardSection.innerHTML = '';
            cardSection.appendChild(div);
        }, 1900)
    }
}


// Active Button Style;
const buttonActive = (e) => {
    const activeBtn = document.querySelectorAll('.activeBtn');
    activeBtn.forEach((a) => a.classList.remove('activeBtn'));
    e.classList.add('activeBtn');
}


// Sort By Price Functionality
const sortByPrice = (data) => {
    document.getElementById('sort-by-price').addEventListener('click', () => {
        data.sort((a, b) => b.price - a.price);

        loadSpinner();
        setTimeout(() => {
            cardSection.innerHTML = '';
            cardSection.classList.add('grid');
            data.forEach((obj) => displayCard(obj));
        }, 1900)
    })
}



// Make Details Modal;
const detailsModal = async (id) => {
    const url = `https://openapi.programming-hero.com/api/peddy/pet/${id}`;
    const data = await fetchData(url);
    const obj = data.petData;

    const detailsModalBtn = document.getElementById('details-modal')
    const div = document.createElement('div');

    detailsModalBtn.innerHTML = '';
    div.innerHTML = `
            <dialog id="modal1" class="modal">
                    <div class="modal-box w-11/12 md:max-w-3xl">
                        <!-- Modal Details Info -->
                        <div class="">
                            <div>
                                <img class="border rounded-lg mx-auto w-full object-cover" src="${obj.image}" alt="">
                            </div>
                            <h2 class="text-xl font-bold pt-2">${obj.pet_name ?? 'Not Available'}</h2>
                            <div class="flex gap-10 mb-4 mt-2">
                                <div>
                                    <p class="flex items-center gap-2 text-gray-500 font-semibold">
                                        <i class="fa-solid fa-dog"></i>
                                        Breed: ${obj?.breed ?? 'Not Available'}
                                    </p>
                                    <p class="flex items-center gap-3 text-gray-500 font-semibold">
                                        <i class="fa-regular fa-calendar-days"></i>
                                        Birth: ${obj.date_of_birth?.slice(0, 4) ?? 'Not Available'}
                                    </p>
                                    <p class="flex items-center gap-1 text-gray-500 font-semibold">
                                        <i class="fa-solid fa-venus-mars"></i>
                                        Gender: ${obj.gender ?? 'Not Available'}
                                    </p>
                                </div>

                                <div>
                                    <p class="flex items-center gap-3 text-gray-500 font-semibold pb-2">
                                        <i class="fa-solid fa-dollar-sign"></i>
                                        Price: ${obj.price ? obj.price + '$' : 'Not Available'}
                                    </p>
                                    <p class="flex items-center gap-1 text-gray-500 font-semibold">
                                        <i class="fa-solid fa-venus-mars"></i>
                                        Vaccinated status: ${obj.vaccinated_status ?? 'Not Available'}
                                    </p>
                                </div>
                            </div>
                            <hr class="">
                            <div>
                                <h2 class="text-xl font-bold pt-2">Details Information</h2>
                                <p class="text-skyC">
                                ${obj.pet_details ?? 'Not Available'}
                                </p>
                            </div>
                        </div>
                        <!-- Modal Close Button -->
                        <div class="modal-action block">
                            <form method="dialog">
                                <button
                                    class="btn w-full bg-sky-100 border-sky-500 hover:border-sky-500 text-lg">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
    `
    detailsModalBtn.appendChild(div);

    modal1.showModal();
}


// LIke Button Functionality;
const liked = (url) => {
    const likedSide = document.getElementById('liked-side');
    const div = document.createElement('div');
    div.innerHTML = `<img class="h-40 w-40 object-cover rounded-md border" src="${url}" alt="">`
    likedSide.appendChild(div);
}


// Adopt Button Modal;
function timeOutModal(e) {
    modalTimeOut.showModal();
    let i = 2;
    const modalCount = document.getElementById('modal-count')
    const intervalID = setInterval(() => {
        if (i > 0) modalCount.innerHTML = i;
        i--;
    }, 950)

    setTimeout(() => {
        clearInterval(intervalID);
        modalTimeOut.close()
    }, 2900);

    modalCount.innerHTML = 3;
    e.setAttribute("disabled", true);
    e.innerText = `Adopted.`
}

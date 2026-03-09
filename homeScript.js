
const allFilterBtn = document.getElementById('all-filter-btn');
const openFilterBtn = document.getElementById('open-filter-btn');
const closedFilterBtn = document.getElementById('closed-filter-btn');

const filterButtons = [allFilterBtn, openFilterBtn, closedFilterBtn];
// button style js
filterButtons.forEach(btn => {
  btn.addEventListener('click', (eliment) => {
    filterButtons.forEach(button => {
      button.classList.remove('bg-blue-700', 'text-white');
      button.classList.add('bg-gray-100', 'text-black');
    });
    eliment.target.classList.add('bg-blue-700', 'text-white');
    eliment.target.classList.remove('bg-gray-100', 'text-black');
  });
});

let allissues = [];
const btnAllFilter = async () => {
  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
  const data = await res.json();
  allissues = data.data;
  displayCard(allissues);
};
btnAllFilter();

document.getElementById("open-filter-btn").addEventListener("click", () => {
  const openBtn = allissues.filter((issue) => issue.status === "open")
  console.log(openBtn)
  displayCard(openBtn)
})

document.getElementById("closed-filter-btn").addEventListener("click", () => {
  const closedBtn = allissues.filter((open) => open.status === "closed")
  console.log(closedBtn)
  displayCard(closedBtn)

})

document.getElementById("all-filter-btn").addEventListener("click", () => {
  displayCard(allissues)

});

// card js
const card = () => {
  fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => displayCard(data.data))

};

// card display js
const displayCard = (data) => {
  const cardContainer = document.getElementById("card-container");
  document.getElementById("total-count").innerText = data.length;
  cardContainer.innerHTML = "";
  data.forEach(card => {
    const newCard = document.createElement("div");
    newCard.innerHTML = `
            <div onclick="modalName(${card.id})" class="max-w-sm rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden  h-[350px] space-y-2">
             <div   class="h-2 ${card.status == "open" ? "bg-green-500" : "bg-[#A855F7]"} w-full"></div>
             <div class="p-3">
                <div class="flex justify-between items-start mb-3">
                    <div
                    class=" ">
                    ${card.status == "open" ? `<img src="./assets/Open-Status.png" alt="">` : ` <img src="./assets/Closed- Status .png" alt="">`}
                   
                   
                    </div>
                    <span
                        class="text-[10px] font-bold text-red-500 bg-red-50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        ${card.priority}
                    </span>
                </div>

                <h3 class="text-gray-800 font-bold text-lg mb-2">
                    ${card.title}
                </h3>
                <p class="text-gray-500 text-sm leading-relaxed mb-3">
                    ${card.description}
                </p>

                <div class="flex gap-2 mb-6">
                    
                        ${card.labels.map(label => `
                         <span
                         class="bg-red-100 text-red-500 text-[11px] font-semibold px-3 py-1 rounded shadow-sm uppercase">
                            ${label}
                            
                              </span>
                            `)

        .join("")}
                    
                </div>

                <div class="pt-2 border-t border-gray-100">
                    <p class="text-gray-400 text-xs italic">
                        #${card.id} by <span class="text-gray-500 font-medium not-italic">${card.author}</span>
                    </p>
                    <p class="text-gray-400 text-[10px] mt-1">
                        ${card.updatedAt}
                    </p>
                </div>
            </div>
        </div>
   
   `;

    cardContainer.appendChild(newCard);
  });

};

// for modal function 
const modalName = async (id) => {
  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
  const data = await res.json()
  displayModal(data.data)
  document.getElementById("modalDetails").showModal();

};

const displayModal = (eliment) => {
  const modelTile = document.getElementById("modelTitle");
  modelTile.innerHTML = `
    <div class="bg-white rounded-xl w-full max-w-lg overflow-hidden border border-slate-100">
                    <div class="p-6">
                        <h2 class="text-2xl font-bold text-slate-800">${eliment.title}</h2>
                        <div class="flex gap-2 mt-2 items-center">
                            <span
                                class="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full">${eliment.status}</span>
                            <p class="text-sm text-slate-500">• ${eliment.status} by ${eliment.author} • ${eliment.updatedAt}</p>
                        </div>

                        <div class="flex gap-2 mt-4">
                           ${eliment.labels.map(label => `
                         <span
                         class="bg-red-100 text-red-500 text-[11px] font-semibold px-3 py-1 rounded shadow-sm uppercase">
                            ${label}
                            
                              </span>
                            `)

      .join("")}
                        </div>
                    </div>

                    <div class="px-6 pb-6">
                        <p class="text-slate-600 leading-relaxed">
                            ${eliment.description}
                        </p>
                    </div>

                    <div class="bg-slate-50 p-6 flex justify-between items-center">
                        <div>
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Assignee:</p>
                            <p class="font-bold text-slate-800">${eliment.assignee}</p>
                        </div>
                        <div class="text-right">
                            <p class="text-xs font-semibold text-slate-400 uppercase tracking-wider">Priority:</p>
                            <span class="px-4 py-1 bg-red-500 text-white text-xs font-bold rounded-full">${eliment.priority}</span>
                        </div>
                    </div>

                </div>
    
    
    `;

};

card();
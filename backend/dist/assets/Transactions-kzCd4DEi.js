import{t as a,i as s,g as o}from"./index-4wODdfHd.js";var n=a('<section class="p-2 border bg-slate-200 rounded-md"><header class="text-center text-bold text-2xl">Monthly Summary</header><div class="mt-5 ml-5 text-md"><p class=text-blue-800>Total Income: 200 </p><p class=text-red-800>Total Expenses: 180 ');const l=()=>((async()=>{const e=await fetch(`//${window.location.host}/api/transactions/totals`,{method:"GET",credentials:"include",mode:"cors"});if(!e.ok)throw new Error("failed to load user information");console.log(e.json())})(),n());var r=a('<main><div class="flex gap-2 flex-wrap sm:flex-nowrap sm:gap-5"><button class=btn>New</button><button class=btn>Filter</button></div><p>Monthly transactions, with edit and delete options</p><section class=my-5><ul><li>transactions date, amount, type and notes/desc');const i=()=>(()=>{var t=r(),e=t.firstChild;return s(t,o(l,{}),e),t})();export{i as default};

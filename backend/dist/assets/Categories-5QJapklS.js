import{p as $,v as W,i as g,c as h,g as B,F as J,k as w,e as K,t as b,E as P,G as Q,H as V,I as X}from"./index-GrT5OoDW.js";var Y=b('<main class="p-4 relative"><header class="flex items-center justify-between mb-4"><h1 class="text-2xl font-semibold text-gray-700">Manage Categories</h1><button class="btn bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">+ New Category</button></header><section class=overflow-x-auto>'),Z=b("<p>Loading categories..."),ee=b('<table class="min-w-full table-auto border-collapse shadow-lg"><thead class=bg-gray-100><tr><th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Name</th><th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Type</th><th class="px-4 py-2 border-b text-left text-sm font-medium text-gray-700">Actions</th></tr></thead><tbody>'),te=b('<tr class=hover:bg-gray-50><td class="px-4 py-2 text-sm text-gray-700"></td><td class="px-4 py-2 text-sm text-gray-700 capitalize"></td><td class="px-4 py-2 text-sm flex gap-2"><button class="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-xs">Edit</button><button class="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 text-xs">Delete'),le=b('<p>No categories found. Click "New Category" to add one.'),ae=b('<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white p-6 rounded-lg shadow-lg w-96"><h2 class="text-xl font-semibold">Add Category</h2><form><label class="block mt-2">Name:<input type=text class="border p-2 w-full"required></label><label class="block mt-2">Type:<select class="border p-2 w-full"><option value=income>Income</option><option value=expense>Expense</option></select></label><div class="mt-4 flex gap-2"><button type=submit class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button><button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel'),re=b('<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white p-6 rounded-lg shadow-lg w-96"><h2 class="text-xl font-semibold">Edit Category</h2><form><label class="block mt-2">Name:<input type=text class="border p-2 w-full"required></label><label class="block mt-2">Type:<select class="border p-2 w-full"><option value=income>Income</option><option value=expense>Expense</option></select></label><div class="mt-4 flex gap-2"><button type=submit class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Save</button><button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel'),ne=b('<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"><div class="bg-white p-6 rounded-lg shadow-lg w-96"><h2 class="text-xl font-semibold">Delete Category</h2><p>Are you sure you want to delete <strong></strong>?</p><div class="mt-4 flex gap-2"><button class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">Delete</button><button class="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel');const ie=()=>{const[T,O]=$([]),[j,N]=$(!0),[A,S]=$(!1),[F,E]=$(!1),[I,k]=$(!1),[p,_]=$(null),[l,u]=$({name:"",type:"income"}),v=async()=>{N(!0);try{const e=await P();O(e)}catch(e){console.error("Error fetching categories:",e)}finally{N(!1)}};W(()=>{v()});const q=async()=>{try{await Q(l().name,l().type),v(),S(!1),u({name:"",type:"income"})}catch(e){console.error("Error creating category:",e)}},M=async()=>{if(p())try{await V(p().category_id,l().name,l().type),v(),E(!1),_(null),u({name:"",type:"income"})}catch(e){console.error("Error updating category:",e)}},G=async()=>{if(p())try{await X(p().category_id),v(),k(!1),_(null)}catch(e){console.error("Error deleting category:",e)}},z=e=>e.toLowerCase().replace(/\b\w/g,C=>C.toUpperCase());return(()=>{var e=Y(),C=e.firstChild,H=C.firstChild,R=H.nextSibling,U=C.nextSibling;return R.$$click=()=>S(!0),g(U,(()=>{var x=h(()=>!!j());return()=>x()?Z():(()=>{var s=h(()=>T().length>0);return()=>s()?(()=>{var c=ee(),m=c.firstChild,i=m.nextSibling;return g(i,B(J,{get each(){return T()},children:t=>(()=>{var d=te(),o=d.firstChild,a=o.nextSibling,y=a.nextSibling,r=y.firstChild,f=r.nextSibling;return g(o,()=>t.category_name),g(a,()=>t.transaction_type),r.$$click=()=>{_(t),u({name:t.category_name,type:t.transaction_type}),E(!0)},f.$$click=()=>{_(t),k(!0)},d})()})),c})():le()})()})()),g(e,(()=>{var x=h(()=>!!A());return()=>x()&&(()=>{var s=ae(),c=s.firstChild,m=c.firstChild,i=m.nextSibling,t=i.firstChild,d=t.firstChild,o=d.nextSibling,a=t.nextSibling,y=a.firstChild,r=y.nextSibling,f=a.nextSibling,D=f.firstChild,L=D.nextSibling;return i.addEventListener("submit",n=>{n.preventDefault(),q()}),o.$$input=n=>u({...l(),name:z(n.currentTarget.value)}),r.addEventListener("change",n=>u({...l(),type:n.currentTarget.value})),L.$$click=()=>S(!1),w(()=>o.value=l().name),w(()=>r.value=l().type),s})()})(),null),g(e,(()=>{var x=h(()=>!!(F()&&p()));return()=>x()&&(()=>{var s=re(),c=s.firstChild,m=c.firstChild,i=m.nextSibling,t=i.firstChild,d=t.firstChild,o=d.nextSibling,a=t.nextSibling,y=a.firstChild,r=y.nextSibling,f=a.nextSibling,D=f.firstChild,L=D.nextSibling;return i.addEventListener("submit",n=>{n.preventDefault(),M()}),o.$$input=n=>u({...l(),name:z(n.currentTarget.value)}),r.addEventListener("change",n=>u({...l(),type:n.currentTarget.value})),L.$$click=()=>E(!1),w(()=>o.value=l().name),w(()=>r.value=l().type),s})()})(),null),g(e,(()=>{var x=h(()=>!!(I()&&p()));return()=>x()&&(()=>{var s=ne(),c=s.firstChild,m=c.firstChild,i=m.nextSibling,t=i.firstChild,d=t.nextSibling,o=i.nextSibling,a=o.firstChild,y=a.nextSibling;return g(d,()=>{var r;return(r=p())==null?void 0:r.category_name}),a.$$click=G,y.$$click=()=>k(!1),s})()})(),null),e})()};K(["click","input"]);export{ie as default};
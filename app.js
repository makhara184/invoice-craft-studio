let items = [
  { desc: "Operations Workflow Audit", qty: 1, price: 450 },
  { desc: "KPI Reporting Dashboard Setup", qty: 2, price: 225 },
];

document.getElementById("outDate").textContent = new Date().toLocaleDateString();

function render() {
  const sym = document.getElementById("currency").value;
  const taxPct = Number(document.getElementById("taxRate").value) || 0;
  document.getElementById("outBiz").textContent = document.getElementById("bizName").value;
  document.getElementById("outClient").textContent = document.getElementById("clientName").value;
  document.getElementById("outNo").textContent = document.getElementById("invNo").value;
  document.getElementById("outTaxPct").textContent = taxPct;

  const tbody = document.getElementById("outRows");
  tbody.innerHTML = "";
  let sub = 0;
  items.forEach((it, idx) => {
    const line = it.qty * it.price;
    sub += line;
    const tr = document.createElement("tr");
    tr.innerHTML = `<td></td><td class="num">${it.qty}</td><td class="num">${sym}${it.price.toFixed(2)}</td><td class="num">${sym}${line.toFixed(2)}</td><td class="no-print"><button class="rm">✕</button></td>`;
    tr.children[0].textContent = it.desc;
    tr.querySelector(".rm").onclick = () => { items.splice(idx, 1); render(); };
    tbody.appendChild(tr);
  });

  const tax = sub * (taxPct / 100);
  document.getElementById("outSub").textContent = `${sym}${sub.toFixed(2)}`;
  document.getElementById("outTax").textContent = `${sym}${tax.toFixed(2)}`;
  document.getElementById("outGrand").textContent = `${sym}${(sub + tax).toFixed(2)}`;
}

["bizName", "clientName", "invNo", "currency", "taxRate"].forEach((id) => {
  document.getElementById(id).addEventListener("input", render);
});

document.getElementById("itemForm").addEventListener("submit", (e) => {
  e.preventDefault();
  items.push({
    desc: document.getElementById("itemDesc").value.trim(),
    qty: Number(document.getElementById("itemQty").value),
    price: Number(document.getElementById("itemPrice").value),
  });
  e.target.reset();
  document.getElementById("itemQty").value = 1;
  render();
});

render();
